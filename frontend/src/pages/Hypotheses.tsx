import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hypothesisService, Hypothesis } from '../services/hypothesisService';
import { dashboardService } from '../services/dashboardService';
import { Plus } from 'lucide-react';

export default function Hypotheses() {
    const navigate = useNavigate();
    const [hypotheses, setHypotheses] = useState<Hypothesis[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHypotheses();
    }, []);

    const loadHypotheses = async () => {
        try {
            // TODO: Real project handling
            const projects = await dashboardService.getUserProjects();
            if (projects.length > 0) {
                const data = await hypothesisService.getByProject(projects[0].id);
                setHypotheses(data);
            }
        } catch (error) {
            console.error('Failed to load hypotheses', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: 'var(--spacing-6)' }}>Loading hypotheses...</div>;

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-6)'
            }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Hypotheses</h1>
                <button
                    onClick={() => navigate('/hypotheses/new')}
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
                    New Hypothesis
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                {hypotheses.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: 'var(--spacing-8)',
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px dashed var(--color-border)'
                    }}>
                        <p style={{ color: 'var(--color-text-muted)' }}>No hypotheses found. Create one to get started!</p>
                    </div>
                ) : (
                    hypotheses.map(h => (
                        <div key={h.id} style={{
                            padding: 'var(--spacing-6)',
                            backgroundColor: 'var(--color-surface)',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-sm)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '2px 8px',
                                        borderRadius: '9999px',
                                        backgroundColor: '#f3f4f6',
                                        color: '#374151',
                                        fontWeight: 500
                                    }}>
                                        {h.type}
                                    </span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '2px 8px',
                                        borderRadius: '9999px',
                                        backgroundColor: h.status === 'VALIDATED' ? '#dcfce7' : h.status === 'INVALIDATED' ? '#fee2e2' : '#eff6ff',
                                        color: h.status === 'VALIDATED' ? '#166534' : h.status === 'INVALIDATED' ? '#991b1b' : '#1e40af',
                                        fontWeight: 500
                                    }}>
                                        {h.status}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 500 }}>{h.description}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
