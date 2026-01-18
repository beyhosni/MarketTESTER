import api from './api';

export interface Hypothesis {
    id: string;
    description: string;
    type: 'DESIRABILITY' | 'VIABILITY' | 'FEASIBILITY' | 'USABILITY';
    status: 'DRAFT' | 'TESTED' | 'VALIDATED' | 'INVALIDATED';
}

export const hypothesisService = {
    async getByProject(projectId: string) {
        const response = await api.get<Hypothesis[]>(`/hypotheses?projectId=${projectId}`);
        return response.data;
    },

    async create(hypothesis: Partial<Hypothesis>) {
        const response = await api.post<Hypothesis>('/hypotheses', hypothesis);
        return response.data;
    },

    async updateStatus(id: string, status: string) {
        const response = await api.patch<Hypothesis>(`/hypotheses/${id}/status`, status); // Body is just string? Enum...
        // Check controller: @RequestBody HypothesisStatus status. 
        // It expects "VALIDATED" (string with quotes if JSON, or just enum string).
        // Axios sends JSON matching the object.
        // So body should probably be simply the string IF the backend handles it as string/enum conversion directly on body.
        // Or maybe { status: "VALIDATED" } if I change backend.
        // Current backend: @RequestBody HypothesisStatus status.
        // So I should send just the string "VALIDATED" wrapped in quotes as JSON? 
        // JSON: "VALIDATED"
        return response.data;
    }
};
