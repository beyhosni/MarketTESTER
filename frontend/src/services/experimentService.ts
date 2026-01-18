import api from './api';

export interface Experiment {
    id: string;
    name: string;
    description: string;
    status: 'PLANNED' | 'IN_PROGRESS' | 'DONE';
    startDate?: string;
    endDate?: string;
    evidence?: Evidence[];
}

export interface Evidence {
    id?: string;
    type: 'INTERVIEW' | 'SURVEY' | 'DATA_ANALYSIS' | 'OTHER';
    summary: string;
    confidenceScore: number; // 0-100
    attachmentUrl?: string;
}

export const experimentService = {
    async getAll() {
        const response = await api.get<Experiment[]>('/experiments');
        return response.data;
    },

    async create(experiment: Partial<Experiment>) {
        const response = await api.post<Experiment>('/experiments', experiment);
        return response.data;
    },

    async getById(id: string) {
        const response = await api.get<Experiment>(`/experiments/${id}`);
        return response.data;
    },

    async addEvidence(experimentId: string, evidence: Evidence) {
        const response = await api.post<Evidence>(`/experiments/${experimentId}/evidence`, evidence);
        return response.data;
    }
};
