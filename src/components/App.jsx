import { useReducer, useEffect } from 'react';
import StartScreen from './StartScreen.jsx';
import Question from './Question.jsx';
import ProgressBar from './ProgressBar.jsx';
import Timer from './Timer.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import ResultScreen from './ResultScreen.jsx';
import Loading from './Loading.jsx';
import Error from './Error.jsx';
import { useLocalStorageState } from '../hooks/useLocalStorageState.js';
import styles from './App.module.css';

const initialState = {
  status: 'idle',
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: 15,
  highscore: 0,
  categories: [],
  error: null,
};

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function reducer(state, action) {
  switch (action.type) {
    case 'categoriesReceived':
      return { ...state, categories: action.payload };
    case 'start':
      return { ...state, status: 'loading', questions: [], index: 0, answer: null, points: 0, error: null };
    case 'dataReceived':
      return { ...state, status: 'active', questions: action.payload, secondsRemaining: 15 };
    case 'dataFailed':
      return { ...state, status: 'error', error: action.payload };
    case 'newAnswer': {
      if (state.answer !== null) return state;
      const current = state.questions[state.index];
      const isCorrect = action.payload === current.correct;
      return { ...state, answer: action.payload, points: isCorrect ? state.points + 10 : state.points };
    }
    case 'nextQuestion': {
      const isLast = state.index === state.questions.length - 1;
      if (isLast) return { ...state, status: 'finished', highscore: Math.max(state.highscore, state.points) };
      return { ...state, index: state.index + 1, answer: null, secondsRemaining: 15 };
    }
    case 'finish':
      return { ...state, status: 'finished', highscore: Math.max(state.highscore, state.points) };
    case 'restart':
      return { ...initialState, highscore: state.highscore, categories: state.categories };
    case 'tick': {
      if (state.secondsRemaining <= 1) {
        const isLast = state.index === state.questions.length - 1;
        if (isLast) return { ...state, status: 'finished', highscore: Math.max(state.highscore, state.points) };
        return { ...state, index: state.index + 1, answer: null, secondsRemaining: 15 };
      }
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    }
    default:
      return state;
  }
}

export default function App() {
  const [storedHighscore, setStoredHighscore] = useLocalStorageState('highscore', 0);
  const [category, setCategory] = useLocalStorageState('category', 'any');
  const [difficulty, setDifficulty] = useLocalStorageState('difficulty', 'any');
  const [count, setCount] = useLocalStorageState('count', 10);

  const [state, dispatch] = useReducer(reducer, { ...initialState, highscore: storedHighscore });

  const { status, questions, index, answer, points, secondsRemaining, highscore, categories, error } = state;

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://opentdb.com/api_category.php', { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => dispatch({ type: 'categoriesReceived', payload: d.trivia_categories || [] }))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setStoredHighscore(state.highscore);
  }, [state.highscore, setStoredHighscore]);

  useEffect(() => {
    if (status !== 'active') return;
    const id = setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => clearInterval(id);
  }, [status, index]);

  async function handleStart() {
    dispatch({ type: 'start' });
    try {
      const params = new URLSearchParams({ amount: String(count), type: 'multiple' });
      if (category !== 'any') params.set('category', category);
      if (difficulty !== 'any') params.set('difficulty', difficulty);
      const res = await fetch(`https://opentdb.com/api.php?${params}`);
      const data = await res.json();
      if (data.response_code !== 0) {
        const messages = { 1: 'No results', 2: 'Invalid parameter', 3: 'Token not found', 4: 'Token empty' };
        throw new Error(messages[data.response_code] || 'API error');
      }
      const qs = data.results.map((q, i) => ({
        id: i,
        question: decodeHtml(q.question),
        correct: decodeHtml(q.correct_answer),
        answers: shuffle([q.correct_answer, ...q.incorrect_answers].map(decodeHtml)),
        category: q.category,
        difficulty: q.difficulty,
      }));
      dispatch({ type: 'dataReceived', payload: qs });
    } catch (e) {
      dispatch({ type: 'dataFailed', payload: e.message || 'Failed to load' });
    }
  }

  const maxPoints = questions.length * 10;
  const progress = questions.length ? index / questions.length : 0;
  const current = questions[index];

  if (status === 'idle' || status === 'loading') {
    if (status === 'loading') return <div className={styles.app}><Loading /></div>;
    return (
      <div className={styles.app}>
        <StartScreen
          category={category}
          setCategory={setCategory}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          count={count}
          setCount={setCount}
          categories={categories}
          difficulties={['any', 'easy', 'medium', 'hard']}
          questionCounts={[5, 10, 15]}
          onStart={handleStart}
        />
      </div>
    );
  }

  if (status === 'error') {
    return <div className={styles.app}><Error message={error} onRetry={() => dispatch({ type: 'restart' })} /></div>;
  }

  if (status === 'finished') {
    return (
      <div className={styles.app}>
        <ResultScreen score={points} total={questions.length} highscore={highscore} onRestart={() => dispatch({ type: 'restart' })} />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Quiz Time!</h1>
        <ScoreBoard score={points} total={maxPoints} />
      </header>
      <ProgressBar current={index + 1} total={questions.length} />
      <Timer seconds={secondsRemaining} />
      <Question
        question={current?.question}
        answers={current?.answers ?? []}
        correct={current?.correct}
        answer={answer}
        onAnswer={(a) => dispatch({ type: 'newAnswer', payload: a })}
        onNext={() => dispatch({ type: 'nextQuestion' })}
        showNext={answer !== null}
      />
      <p>Progress: {Math.round(progress * 100)}%</p>
    </div>
  );
}
