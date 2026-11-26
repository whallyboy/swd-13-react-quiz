export const sampleQuestions = [
  {
    id: 1,
    category: 'React',
    difficulty: 'easy',
    question: 'Which hook is used to manage state in a functional component?',
    answers: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correct: 'useState',
  },
  {
    id: 2,
    category: 'React',
    difficulty: 'easy',
    question: 'What does JSX stand for?',
    answers: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
    correct: 'JavaScript XML',
  },
  {
    id: 3,
    category: 'JavaScript',
    difficulty: 'medium',
    question: 'Which keyword declares a block-scoped variable?',
    answers: ['var', 'let', 'const', 'both let and const'],
    correct: 'both let and const',
  },
  {
    id: 4,
    category: 'JavaScript',
    difficulty: 'medium',
    question: 'What is the result of typeof null?',
    answers: ['"null"', '"object"', '"undefined"', '"number"'],
    correct: '"object"',
  },
  {
    id: 5,
    category: 'CSS',
    difficulty: 'hard',
    question: 'Which property creates a flex container?',
    answers: ['display: flex', 'flex-direction: row', 'justify-content: center', 'align-items: center'],
    correct: 'display: flex',
  },
  {
    id: 6,
    category: 'CSS',
    difficulty: 'hard',
    question: 'What does the z-index property control?',
    answers: ['Stacking order', 'Zoom level', 'Z-axis rotation', 'Opacity'],
    correct: 'Stacking order',
  },
];

export const categories = ['All', 'React', 'JavaScript', 'CSS'];
export const difficulties = ['All', 'easy', 'medium', 'hard'];
export const questionCounts = [3, 5, 6];
