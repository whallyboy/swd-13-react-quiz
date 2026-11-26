import styles from './StartScreen.module.css';

export default function StartScreen({ category, setCategory, difficulty, setDifficulty, count, setCount, categories, difficulties, questionCounts, onStart }) {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>Quiz Time!</h1>
      <p className={styles.subtitle}>Test your knowledge</p>
      <div className={styles.field}>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="any">Any</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label>Difficulty</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {difficulties.map((d) => (
            <option key={d} value={d}>{d === 'any' ? 'Any' : d}</option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label>Number of questions</label>
        <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
          {questionCounts.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      <button className={styles.startBtn} onClick={onStart}>
        Start Quiz
      </button>
    </section>
  );
}
