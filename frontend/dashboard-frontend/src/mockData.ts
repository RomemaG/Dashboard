import type { Project, Task, GanttTask, ProjectGap } from './types';

// Today = 2026-03-01 (adjust dates relative to this for realistic תג"ב מתקרב demo)
const d = (offsetDays: number) => {
  const base = new Date('2026-03-01');
  base.setDate(base.getDate() + offsetDays);
  return base;
};

// ─── Tasks ────────────────────────────────────────────────────────────────

const novTasks: Task[] = [
  { id: 't1',  projectId: 'nov',    name: 'בדיקת מערכת',     targetDate: d(-3),  status: 'overdue'     }, // overdue
  { id: 't2',  projectId: 'nov',    name: 'תיעוד טכני',      targetDate: d(-1),  status: 'overdue'     }, // overdue
  { id: 't3',  projectId: 'nov',    name: 'אינטגרציה',       targetDate: d(1),   status: 'in-progress' }, // approaching (1 day)
  { id: 't4',  projectId: 'nov',    name: 'הדרכת משתמשים',   targetDate: d(10),  status: 'not-started' }, // on-track
];

const barakTasks: Task[] = [
  { id: 't5',  projectId: 'barak',  name: 'פיתוח מודול A',   targetDate: d(-5),  status: 'overdue'     }, // overdue
  { id: 't6',  projectId: 'barak',  name: 'QA סבב ראשון',    targetDate: d(2),   status: 'in-progress' }, // approaching (2 days)
  { id: 't7',  projectId: 'barak',  name: 'QA סבב שני',      targetDate: d(2),   status: 'not-started' }, // approaching
  { id: 't8',  projectId: 'barak',  name: 'השקה',            targetDate: d(14),  status: 'not-started' }, // on-track
];

const kosherTasks: Task[] = [
  { id: 't9',  projectId: 'kosher', name: 'ניתוח דרישות',    targetDate: d(-2),  status: 'overdue'     }, // overdue
  { id: 't10', projectId: 'kosher', name: 'אפיון',           targetDate: d(1),   status: 'in-progress' }, // approaching
  { id: 't11', projectId: 'kosher', name: 'פיתוח',           targetDate: d(20),  status: 'not-started' }, // on-track
];

const base23Tasks: Task[] = [
  { id: 't12', projectId: 'base23', name: 'הקמת סביבה',      targetDate: d(-1),  status: 'overdue'     }, // overdue
  { id: 't13', projectId: 'base23', name: 'בדיקות קבלה',     targetDate: d(2),   status: 'in-progress' }, // approaching
  { id: 't14', projectId: 'base23', name: 'העברה לייצור',    targetDate: d(8),   status: 'not-started' }, // on-track
  { id: 't15', projectId: 'base23', name: 'תיעוד',           targetDate: d(12),  status: 'not-started' }, // on-track
];

// ─── Projects ────────────────────────────────────────────────────────────

export const mockProjects: Project[] = [
  {
    id: 'nov',    name: 'נוב"ה',      totalTasks: 4,  tasks: novTasks,    progress: 20,  alert: 2,
    imgUrl: 'https://placehold.co/36x36/4f67e0/fff?text=נ',
  },
  {
    id: 'barak',  name: 'ברק',        totalTasks: 4,  tasks: barakTasks,  progress: 55,  alert: 1,
    imgUrl: 'https://placehold.co/36x36/e05a4f/fff?text=ב',
  },
  {
    id: 'kosher', name: 'כושר לחימה', totalTasks: 3,  tasks: kosherTasks, progress: 90,  alert: 1,
    imgUrl: 'https://placehold.co/36x36/2ecc71/fff?text=כ',
  },
  {
    id: 'base23', name: 'Base23',     totalTasks: 4,  tasks: base23Tasks, progress: 80,  alert: 1,
    imgUrl: 'https://placehold.co/36x36/f39c12/fff?text=B',
  },
];

// ─── Gantt tasks (milestones) ─────────────────────────────────────────────

export const mockGanttTasks: GanttTask[] = [
  { id: 'g1', projectId: 'barak',  name: 'השלמת בדיקות', isMilestone: true,  targetDate: d(0),  status: 'overdue'     },
  { id: 'g2', projectId: 'base23', name: 'השלמת בדיקות', isMilestone: true,  targetDate: d(7),  status: 'in-progress' },
  { id: 'g3', projectId: 'kosher', name: 'השלמת בדיקות', isMilestone: true,  targetDate: d(9),  status: 'in-progress' },
  { id: 'g4', projectId: 'nov',    name: 'השלמת בדיקות', isMilestone: true,  targetDate: d(29), status: 'not-started' },
  // non-milestone — should be filtered out
  { id: 'g5', projectId: 'barak',  name: 'ישיבת צוות',   isMilestone: false, targetDate: d(3),  status: 'not-started' },
];

// ─── Project gaps ─────────────────────────────────────────────────────────

export const mockProjectGaps: ProjectGap[] = [
  { id: 'gap1', projectId: 'nov',    description: 'עיכוב בהדרכות' },
  { id: 'gap2', projectId: 'barak',  description: 'בעיית תקציב' },
  { id: 'gap3', projectId: 'barak',  description: 'חוסר כח אדם' },
  { id: 'gap4', projectId: 'barak',  description: 'תלות חיצונית' },
  { id: 'gap5', projectId: 'kosher', description: 'דרישות לא ברורות' },
  { id: 'gap6', projectId: 'kosher', description: 'בעיית ממשק' },
  { id: 'gap7', projectId: 'base23', description: 'עיכוב סביבה' },
  { id: 'gap8', projectId: 'base23', description: 'בעיית רישוי' },
];