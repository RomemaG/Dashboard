import React from 'react';
import type { ProjectBarData } from './dashboardUtils';
import styles from './InterventionCard.module.css';

interface Props {
  data: ProjectBarData[];
}

export const InterventionCard: React.FC<Props> = ({ data }) => {
  const maxVal = Math.max(...data.flatMap((p) => [p.urgent, p.approaching]), 1);
  const scale  = (v: number) => Math.max(6, Math.round((v / maxVal) * 90));

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>משימות שדורשות תשומת לב</span>
        <div className={styles.pills}>
          <span className={`${styles.pill} ${styles.pillApproach}`}>⏳ תג''ב מתקרב</span>
          <span className={`${styles.pill} ${styles.pillUrgent}`}>⚠ בחריגה</span>
        </div>
      </div>

      <div className={styles.chartArea}>
        {data.map((proj) => (
          <div key={proj.id} className={styles.barGroup}>
            <div className={styles.bars}>
              {/* yellow = approaching, red = urgent */}
              <div className={`${styles.bar} ${styles.barYellow}`} style={{ height: scale(proj.approaching) }}>
                {proj.approaching > 0 && <span className={styles.barVal}>{proj.approaching}</span>}
              </div>
              <div className={`${styles.bar} ${styles.barRed}`} style={{ height: scale(proj.urgent) }}>
                {proj.urgent > 0 && <span className={styles.barVal}>{proj.urgent}</span>}
              </div>
            </div>
            <div className={styles.projectIcon}>
              <img src={proj.imgUrl} alt={proj.name} />
            </div>
            <span className={styles.barLabel}>{proj.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};