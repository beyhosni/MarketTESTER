import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experimentService, Experiment, Evidence } from '../services/experimentService';

export default function Validation() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [experiment, setExperiment] = useState<Experiment | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [evidenceData, setEvidenceData] = useState<Partial<Evidence>>({
        type: 'INTERVIEW',
        summary: '',
        confidenceScore: 50
    });

    useEffect(() => {
        if (id) {
            loadExperiment(id);
        }
    }, [id]);

    const loadExperiment = async (expId: string) => {
        try {
            const data = await experimentService.getById(expId);
            setExperiment(data);
        } catch (error) {
            console.error('Failed to load experiment', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !experiment) return;

        setSubmitting(true);
        try {
            await experimentService.addEvidence(id, evidenceData as Evidence);
            alert('Evidence added successfully!');
            navigate('/experiments'); // Or back to details
        } catch (error) {
            console.error('Failed to add evidence', error);
            alert('Failed to add evidence');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!experiment) return <div>Experiment not found</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 'var(--spacing-6)' }}>
                Validate: {experiment.name}
            </h1>

            <div style={{
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)'
            }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--spacing-4)' }}>Add Evidence</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontWeight: 500 }}>Type</label>
                        <select
                            value={evidenceData.type}
                            onChange={e => setEvidenceData(prev => ({ ...prev, type: e.target.value as any }))}
                            style={{ padding: 'var(--spacing-2)', width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                        >
                            <option value="INTERVIEW">User Interview</option>
                            <option value="SURVEY">Survey Result</option>
                            <option value="DATA_ANALYSIS">Data Analysis</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontWeight: 500 }}>Summary</label>
                        <textarea
                            value={evidenceData.summary}
                            onChange={e => setEvidenceData(prev => ({ ...prev, summary: e.target.value }))}
                            rows={4}
                            required
                            style={{ padding: 'var(--spacing-2)', width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                            placeholder="What did you learn?"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontWeight: 500 }}>Confidence Score (0-100)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={evidenceData.confidenceScore}
                            onChange={e => setEvidenceData(prev => ({ ...prev, confidenceScore: parseInt(e.target.value) }))}
                            style={{ padding: 'var(--spacing-2)', width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                        />
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            How much does this validate your hypothesis?
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-2)' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/experiments')}
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
                            disabled={submitting}
                            style={{
                                padding: 'var(--spacing-2) var(--spacing-4)',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                fontWeight: 500
                            }}
                        >
                            {submitting ? 'Submitting...' : 'Submit Evidence'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
