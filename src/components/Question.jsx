import { useEffect } from 'react';
import styles from './Question.module.css';

export default function Question({ question, answers, correct, answer, onAnswer, onNext, showNext }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key >= '1' && e.key <= '4') {
        const idx = Number(e.key) - 1;
        if (answers[idx] && answer === null) onAnswer(answers[idx]);
      } else if (e.key === 'Enter' && showNext) {
        onNext();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [answers, answer, onAnswer, onNext, showNext]);

  function cls(a) {
    if (answer === null) return styles.answerBtn;
    if (a === correct) return styles.answerBtn + ' ' + styles.correct;
    if (a === answer) return styles.answerBtn + ' ' + styles.incorrect;
    return styles.answerBtn + ' ' + styles.dimmed;
  }
  return (
    <section className={styles.card}>
      <h2 className={styles.text}>{question}</h2>
      <div className={styles.answers}>
        {answers.map((a, i) => (
          <button
            key={a}
            className={cls(a)}
            onClick={() => answer === null && onAnswer(a)}
            disabled={answer !== null}
            aria-pressed={answer === a}
          >
            {i + 1}. {a}
          </button>
        ))}
      </div>
      <div aria-live="polite" className={styles.live}>
        {answer !== null ? (answer === correct ? 'Correct!' : 'Incorrect') : ''}
      </div>
      {showNext && (
        <button className={styles.nextBtn} onClick={onNext}>
          Next
        </button>
      )}
    </section>
  );
}
