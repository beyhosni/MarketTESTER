import api from './api';

export interface DashboardDto {
    projectId: string;
    hypothesisCount: number;
    validatedHypothesisCount: number;
    validationReadinessScore: number;
}

export const dashboardService = {
    async getStats(projectId: string) {
        const response = await api.get<DashboardDto>(`/projects/${projectId}/dashboard`);
        return response.data;
    },

    // Quick helper to get first available project since we didn't implement project selector yet
    async getUserProjects() {
        const response = await api.get<any[]>('/projects');
        return response.data;
    }
};
