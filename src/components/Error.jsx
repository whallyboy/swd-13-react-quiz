import styles from './Error.module.css';
export default function Error({ message, onRetry }) {
  return (
    <div className={styles.error}>
      <p>{message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}
