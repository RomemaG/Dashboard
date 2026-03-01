import React from 'react';
import type { OverallStatusData } from './dashboardUtils';
import styles from './OverallStatusCard.module.css';

interface Props {
  data: OverallStatusData;
}

const R  = 55;
const CX = 70;
const CY = 70;
const CIRC = 2 * Math.PI * R;
const GAP  = 3; // gap in px between segments

export const OverallStatusCard: React.FC<Props> = ({ data }) => {
  const { total, urgent, approaching, onTrack } = data;

  // Build segments — skip zero-value ones
  const segments = [
    { value: onTrack,     color: '#2ecc71', label: 'עומד בזמנים' },
    { value: approaching, color: '#ffb300', label: 'תג"ב מתקרב'  },
    { value: urgent,      color: '#ef5350', label: 'בחריגה'       },
  ].filter((s) => s.value > 0);

  // Convert to arc lengths with small gaps
  const gapArc = total > 0 ? (GAP / (2 * Math.PI * R)) * CIRC : 0;
  let offset = 0;
  const arcs = segments.map((s) => {
    const arc = (s.value / total) * CIRC - gapArc;
    const seg = { ...s, arc: Math.max(arc, 0), offset };
    offset += (s.value / total) * CIRC;
    return seg;
  });

  return (
    <div className={styles.card}>
      <span className={styles.title}>סטטוס פרויקט כללי</span>

      <div className={styles.donutWrap}>
        <svg className={styles.svg} viewBox="0 0 140 140">
          {/* track */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f0f2f8" strokeWidth="16" />
          {/* segments */}
          {arcs.map((seg, i) => (
            <circle
              key={i}
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth="16"
              strokeDasharray={`${seg.arc} ${CIRC}`}
              strokeDashoffset={-seg.offset}
              strokeLinecap="butt"
              style={{ transition: 'stroke-dasharray 0.7s ease' }}
            />
          ))}
        </svg>
        <div className={styles.center}>
          <span className={styles.centerNum}>{total}</span>
          <span className={styles.centerLabel}>פרויקטים</span>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.statGreen}`}>
          <span className={`${styles.dot} ${styles.dotGreen}`} />
          עומד בזמנים {onTrack}
        </div>
        <div className={`${styles.stat} ${styles.statYellow}`}>
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          תג&quot;ב מתקרב {approaching}
        </div>
        <div className={`${styles.stat} ${styles.statRed}`}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          בחריגה {urgent}
        </div>
      </div>
    </div>
  );
};