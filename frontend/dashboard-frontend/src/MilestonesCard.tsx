import React from 'react';
import type { MilestoneRow } from './dashboardUtils';
import type { StatusType } from './types';
import styles from './MilestonesCard.module.css';

interface Props {
  data: MilestoneRow[];
}

const STATUS_CLASS: Record<StatusType, string> = {
  urgent:      styles.urgent,
  approaching: styles.approaching,
  'on-track':  styles.onTrack,
};

export const MilestonesCard: React.FC<Props> = ({ data }) => (
  <div className={styles.card}>
    <div className={styles.title}>אבני דרך בחודש הקרוב</div>
    <div className={styles.list}>
      {data.map((m, i) => (
        <React.Fragment key={m.id}>
          <div className={styles.row}>
            {/* name + task (rightmost in RTL) */}
            <div className={styles.nameBlock}>
              <span className={styles.projectName}>{m.projectName}</span>
              <span className={styles.taskName}>{m.taskName}</span>
            </div>

            {/* project image */}
            <div className={styles.imgBox}>
              <img src={m.projectImgUrl} alt={m.projectName} />
            </div>

            {/* date + status (leftmost in RTL) */}
            <div className={styles.metaBlock}>
              <span className={styles.date}>
                <span className={styles.dateDiamond}>◆</span>
                {m.date}
              </span>
              <span className={`${styles.statusLabel} ${STATUS_CLASS[m.statusType]}`}>
                {m.statusLabel}
              </span>
            </div>
          </div>
          {i < data.length - 1 && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  </div>
);