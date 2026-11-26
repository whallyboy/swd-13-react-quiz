import styles from './ProgressBar.module.css';

export default function ProgressBar({ current, total }) {
  const pct = total ? (current / total) * 100 : 0;
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: pct + '%' }} />
      </div>
      <span className={styles.label}>{current} / {total}</span>
    </div>
  );
}
