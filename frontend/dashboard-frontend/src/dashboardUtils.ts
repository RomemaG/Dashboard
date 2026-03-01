import type { Project, Task, GanttTask, ProjectGap, StatusType } from './types';
import { getTaskStatusType } from './types';

// ─── Types consumed by each card ─────────────────────────────────────────

export interface ProjectBarData {
  id: string;
  name: string;
  imgUrl: string;
  urgent: number;
  approaching: number;
}

export interface OverallStatusData {
  total: number;
  urgent: number;
  approaching: number;
  onTrack: number;
}

export interface ProjectInterventionData {
  summaryCount: number;
  projects: { id: string; name: string; imgUrl: string; gapCount: number }[];
}

export interface MilestoneRow {
  id: string;
  date: string;
  projectName: string;
  projectImgUrl: string;
  taskName: string;
  /** "בחריגה" for overdue, "XX%" otherwise */
  statusLabel: string;
  statusType: StatusType;
}

// ─── Helpers ─────────────────────────────────────────────────────────────

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;

// ─── Card 1: per-project urgent / approaching task counts ────────────────

export function deriveProjectBars(projects: Project[], now = new Date()): ProjectBarData[] {
  return projects.map((p) => {
    let urgent = 0, approaching = 0;
    p.tasks.forEach((t) => {
      const s = getTaskStatusType(t, now);
      if (s === 'urgent')           urgent++;
      else if (s === 'approaching') approaching++;
    });
    return { id: p.id, name: p.name, imgUrl: p.imgUrl, urgent, approaching };
  });
}

// ─── Card 2: project-level status using the `alert` field ────────────────
//   urgent     = project.alert > 0  (tasks already past deadline)
//   approaching = no alerts but at least one task within 2 days
//   on-track   = everything fine

export function deriveOverallStatus(projects: Project[], now = new Date()): OverallStatusData {
  let urgent = 0, approaching = 0, onTrack = 0;

  projects.forEach((p) => {
    if (p.alert > 0) {
      urgent++;
    } else {
      const hasApproaching = p.tasks.some((t) => getTaskStatusType(t, now) === 'approaching');
      if (hasApproaching) approaching++;
      else                onTrack++;
    }
  });

  return { total: projects.length, urgent, approaching, onTrack };
}

// ─── Card 3: projects with gaps sorted by gap count ──────────────────────

export function deriveProjectIntervention(
  projects: Project[],
  gaps: ProjectGap[]
): ProjectInterventionData {
  const gapMap: Record<string, number> = {};
  gaps.forEach((g) => { gapMap[g.projectId] = (gapMap[g.projectId] ?? 0) + 1; });

  const enriched = projects
    .map((p) => ({ id: p.id, name: p.name, imgUrl: p.imgUrl, gapCount: gapMap[p.id] ?? 0 }))
    .filter((p) => p.gapCount > 0)
    .sort((a, b) => b.gapCount - a.gapCount);

  return { summaryCount: gaps.length, projects: enriched };
}

// ─── Card 4: milestone gantt tasks within current month ──────────────────

export function deriveMilestones(
  ganttTasks: GanttTask[],
  projects: Project[],
  now = new Date()
): MilestoneRow[] {
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]));
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  return ganttTasks
    .filter((g) => g.isMilestone && g.targetDate <= endOfMonth)
    .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())
    .map((g) => {
      const project    = projectMap[g.projectId];
      const statusType = getTaskStatusType(g, now);
      const statusLabel = statusType === 'urgent' ? 'בחריגה' : `${project?.progress ?? 0}%`;

      return {
        id: g.id,
        date: fmt(g.targetDate),
        projectName:   project?.name   ?? g.projectId,
        projectImgUrl: project?.imgUrl ?? '',
        taskName: g.name,
        statusLabel,
        statusType,
      };
    });
}