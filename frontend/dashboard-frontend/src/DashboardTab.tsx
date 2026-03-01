import React, { useMemo } from 'react';
import { InterventionCard } from './InterventionCard';
import { OverallStatusCard } from './OverallStatusCard';
import { ProjectsInterventionCard } from './ProjectsInterventionCard';
import { MilestonesCard } from './MilestonesCard';
import {
    deriveProjectBars,
    deriveOverallStatus,
    deriveProjectIntervention,
    deriveMilestones,
} from './dashboardUtils';
import { mockProjects, mockGanttTasks, mockProjectGaps } from './mockData';
import styles from './DashboardTab.module.css';

/**
 * DashboardTab
 *
 * Replace the mock* imports real data sources (API hooks, context, etc.)
 * Everything else — including תג"ב מתקרב logic — is computed automatically in dashboardUtils.ts.
 */
export const DashboardTab: React.FC = () => {
    const now = useMemo(() => new Date(), []);

    const projectBars = useMemo(() => deriveProjectBars(mockProjects, now), [now]);
    const overallStatus = useMemo(() => deriveOverallStatus(mockProjects, now), [now]);
    const intervention = useMemo(() => deriveProjectIntervention(mockProjects, mockProjectGaps), []);
    const milestones = useMemo(() => deriveMilestones(mockGanttTasks, mockProjects, now), [now]);

    return (
        <div className={styles.dashboard}>
            <OverallStatusCard data={overallStatus} />
            <InterventionCard data={projectBars} />
            <MilestonesCard data={milestones} />
            <ProjectsInterventionCard data={intervention} />

        </div>
    );
};

export default DashboardTab;