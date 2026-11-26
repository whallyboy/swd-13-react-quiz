import styles from './ResultScreen.module.css';

export default function ResultScreen({ score, total, highscore, onRestart }) {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>Results</h1>
      <p className={styles.score}>
        You scored {score} out of {total * 10}
      </p>
      <p className={styles.highscore}>Highscore: {highscore}</p>
      <button className={styles.restartBtn} onClick={onRestart}>
        Play Again
      </button>
    </section>
  );
}
