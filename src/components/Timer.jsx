import styles from './Timer.module.css';

export default function Timer({ seconds }) {
  return (
    <div className={styles.timer}>
      <span className={styles.icon}>⏱</span>
      <span className={styles.value}>{seconds}s</span>
    </div>
  );
}
