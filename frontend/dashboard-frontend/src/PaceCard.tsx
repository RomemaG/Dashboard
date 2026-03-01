// //שונה בעדכון

// import React, { useState } from 'react';
// import type { PaceData } from './types';
// import styles from './PaceCard.module.css';

// interface Props {
//   data: PaceData;
// }

// const ICONS: Record<string, string> = {
//   check: '✅',
//   work:  '🔄',
//   alert: '⚠️',
//   trend: '📈',
// };

// export const PaceCard: React.FC<Props> = ({ data }) => {
//   const [view, setView] = useState<'weekly' | 'monthly'>(data.view);

//   return (
//     <div className={styles.card}>
//       <div className={styles.header}>
//         <div className={styles.title}>מדדי קצב</div>
//         <div className={styles.viewToggle}>
//           <button
//             className={`${styles.toggleBtn} ${view === 'weekly' ? styles.toggleBtnActive : ''}`}
//             onClick={() => setView('weekly')}
//           >
//             שבועי
//           </button>
//           <button
//             className={`${styles.toggleBtn} ${view === 'monthly' ? styles.toggleBtnActive : ''}`}
//             onClick={() => setView('monthly')}
//           >
//             חודשי
//           </button>
//         </div>
//       </div>

//       <div className={styles.metrics}>
//         {data.metrics.map((m, i) => (
//           <div key={i} className={styles.metricRow}>
//             <div className={styles.metricLeft}>
//               <div className={`${styles.metricIcon} ${styles[`icon${m.icon.charAt(0).toUpperCase()}${m.icon.slice(1)}`]}`}>
//                 {ICONS[m.icon]}
//               </div>
//               <span className={styles.metricLabel}>{m.label}</span>
//             </div>

//             {m.trend ? (
//               <div className={styles.trendBadge}>
//                 ↓ {m.trend.label}
//               </div>
//             ) : (
//               <span className={`${styles.metricValue} ${m.status === 'urgent' ? styles.metricValueUrgent : ''}`}>
//                 {m.value}
//               </span>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
export {};