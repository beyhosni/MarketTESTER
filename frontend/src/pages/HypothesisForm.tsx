import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hypothesisService } from '../services/hypothesisService';
import { dashboardService } from '../services/dashboardService';

export default function HypothesisForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [projectId, setProjectId] = useState<string>('');
    const [formData, setFormData] = useState({
        description: '',
        type: 'DESIRABILITY',
        status: 'DRAFT'
    });

    useEffect(() => {
        // Mock project selection
        dashboardService.getUserProjects().then(projects => {
            if (projects.length > 0) setProjectId(projects[0].id);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await hypothesisService.create({
                ...formData,
                // We need to pass the project relation. The backend DTO expects 'project' entity or project_id?
                // Looking at backend entity: it has many-to-one project.
                // Looking at Controller: it takes @RequestBody Hypothesis.
                // Hypothesis entity has 'private Project project'.
                // If we send JSON { project: { id: "..." } }, it should work if Jackson deserializes it.
                project: { id: projectId }
            } as any);
            navigate('/hypotheses');
        } catch (error) {
            console.error('Failed to create hypothesis', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: 'var(--spacing-6)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                New Hypothesis
            </h1>

            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--color-border)'
            }}>
                <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontWeight: 500 }}>Description</label>
                    <textarea
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-2)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            fontFamily: 'inherit'
                        }}
                        placeholder="We believe that..."
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontWeight: 500 }}>Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-2)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)'
                        }}
                    >
                        <option value="DESIRABILITY">Desirability (Do they want it?)</option>
                        <option value="VIABILITY">Viability (Should we build it?)</option>
                        <option value="FEASIBILITY">Feasibility (Can we build it?)</option>
                        <option value="USABILITY">Usability (Can they use it?)</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-2)' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/hypotheses')}
                        style={{
                            padding: 'var(--spacing-2) var(--spacing-4)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'white'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !projectId}
                        style={{
                            padding: 'var(--spacing-2) var(--spacing-4)',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            fontWeight: 500,
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Creating...' : 'Create Hypothesis'}
                    </button>
                </div>
            </form>
        </div>
    );
}
