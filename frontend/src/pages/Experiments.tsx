import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { experimentService, Experiment } from '../services/experimentService';
import { Plus, FlaskConical } from 'lucide-react';

export default function Experiments() {
    const navigate = useNavigate();
    const [experiments, setExperiments] = useState<Experiment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadExperiments();
    }, []);

    const loadExperiments = async () => {
        try {
            const data = await experimentService.getAll();
            setExperiments(data);
        } catch (error) {
            console.error('Failed to load experiments', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: 'var(--spacing-6)' }}>Loading experiments...</div>;

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-6)'
            }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Experiments</h1>
                <button
                    onClick={() => navigate('/experiments/new')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: 'var(--spacing-2) var(--spacing-4)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}>
                    <Plus size={18} />
                    New Experiment
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--spacing-6)'
            }}>
                {experiments.length === 0 ? (
                    <div style={{
                        gridColumn: '1/-1',
                        textAlign: 'center',
                        padding: 'var(--spacing-8)',
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px border-dashed var(--color-border)'
                    }}>
                        <p style={{ color: 'var(--color-text-muted)' }}>No experiments found.</p>
                    </div>
                ) : (
                    experiments.map(exp => (
                        <div key={exp.id} style={{
                            padding: 'var(--spacing-6)',
                            backgroundColor: 'var(--color-surface)',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-sm)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
                                <h3 style={{ fontWeight: 600 }}>{exp.name}</h3>
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '2px 8px',
                                    borderRadius: '9999px',
                                    backgroundColor: exp.status === 'DONE' ? '#dcfce7' : '#eff6ff',
                                    color: exp.status === 'DONE' ? '#166534' : '#1e40af',
                                    fontWeight: 500
                                }}>
                                    {exp.status}
                                </span>
                            </div>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '0.875rem',
                                flex: 1,
                                marginBottom: 'var(--spacing-4)'
                            }}>
                                {exp.description || 'No description provided.'}
                            </p>
                            <button
                                onClick={() => navigate(`/experiments/${exp.id}/validate`)}
                                style={{
                                    alignSelf: 'flex-start',
                                    color: 'var(--color-primary)',
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                }}>
                                Validate / View Details →
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
