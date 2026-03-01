// ─── Core domain types (as used in the app) ───────────────────────────────

export type TaskStatus = 'completed' | 'in-progress' | 'not-started' | 'overdue';

export interface Project {
  id: string;
  name: string;
  totalTasks: number;
  tasks: Task[];
  progress: number;       // 0–100
  alert: number;          // count of tasks not meeting their deadline
  imgUrl: string;
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  targetDate: Date;
  status: TaskStatus;
}

export interface GanttTask {
  id: string;
  projectId: string;
  name: string;
  isMilestone: boolean;
  targetDate: Date;
  status: TaskStatus;
}

export interface ProjectGap {
  id: string;
  projectId: string;
  description: string;
}

// ─── Derived / UI types ───────────────────────────────────────────────────

export type StatusType = 'urgent' | 'approaching' | 'on-track';

/**
 * תג"ב מתקרב  = targetDate is within 2 days from now (but not yet overdue)
 * בחריגה      = task is overdue (status === 'overdue' OR targetDate is in the past)
 */
export function getTaskStatusType(task: Task | GanttTask, now = new Date()): StatusType {
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUntil = (task.targetDate.getTime() - now.getTime()) / msPerDay;

  if (task.status === 'overdue' || daysUntil < 0) return 'urgent';
  if (daysUntil <= 2) return 'approaching';
  return 'on-track';
}