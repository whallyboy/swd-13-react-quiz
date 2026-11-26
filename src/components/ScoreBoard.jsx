import styles from './ScoreBoard.module.css';

export default function ScoreBoard({ score, total }) {
  return (
    <div className={styles.board}>
      Score: {score} / {total}
    </div>
  );
}
