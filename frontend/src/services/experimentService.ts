import api from './api';

export interface Experiment {
    id: string;
    name: string;
    description: string;
    status: 'PLANNED' | 'IN_PROGRESS' | 'DONE';
    startDate?: string;
    endDate?: string;
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
    }
};
