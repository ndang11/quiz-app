import React from "react";
import styles from "./LandingCard.module.css";

export function LandingCard({ onStart, loading }) {
  return (
    <main className={styles.box}>
      <div className={styles.glow} aria-hidden="true" />
      <section className={styles.cardBox}>
        <div className={styles.hero}>
          <div className={styles.robot} aria-hidden="true"><span className={styles.antenna}></span><span className={styles.robotHead}><span className={styles.eye}></span><span className={styles.eye}></span><span className={styles.thought}>...</span></span></div>
          <p className={styles.eyebrow}>KNOWLEDGE CHALLENGE</p>
          <h1>Think fast.<br /><span>Answer smarter.</span></h1>
          <p className={styles.subtitle}>
            Test your knowledge with a quick-fire True or False challenge designed
            to keep you thinking on your feet.
          </p>
        </div>
        <div className={styles.stats}>
          <div><strong>10</strong><span>Questions</span></div>
          <div><strong>15s</strong><span>Per question</span></div>
          <div><strong>2</strong><span>Answer choices</span></div>
        </div>
        <div className={styles.bottomRow}>
          <div className={styles.rules}>
            <p className={styles.rulesTitle}>How it works</p>
            <p>Choose True or False before the timer runs out. Unanswered questions score zero.</p>
          </div>
          <button className={styles.btn} onClick={onStart} disabled={loading}>
            {loading ? "Loading quiz..." : <>Start quiz <span aria-hidden="true">→</span></>}
          </button>
        </div>
      </section>
      <p className={styles.footerNote}>A new challenge every time</p>
    </main>
  );
}
