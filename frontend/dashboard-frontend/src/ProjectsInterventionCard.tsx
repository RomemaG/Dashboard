import React from 'react';
import type { ProjectInterventionData } from './dashboardUtils';
import styles from './ProjectsInterventionCard.module.css';

interface Props {
  data: ProjectInterventionData;
}

export const ProjectsInterventionCard: React.FC<Props> = ({ data }) => {
  const maxVal = Math.max(...data.projects.map((p) => p.gapCount), 1);
  const scale  = (v: number) => Math.max(6, Math.round((v / maxVal) * 80));

  return (
    <div className={styles.card}>
      <span className={styles.title}>פרויקטים שדורשים התערבות</span>

      <div className={styles.summaryBox}>
        <div className={styles.summaryText}>
          סה&quot;כ פערים בפרויקטים
          <strong>{data.summaryCount} פערים</strong>
        </div>
        <div className={styles.summaryArrow}>↗</div>
      </div>

      <div className={styles.chartArea}>
        {data.projects.map((proj) => (
          <div key={proj.id} className={styles.barGroup}>
            <div className={styles.bars}>
              <div className={styles.bar} style={{ height: scale(proj.gapCount) }}>
                <span className={styles.barVal}>{proj.gapCount}</span>
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