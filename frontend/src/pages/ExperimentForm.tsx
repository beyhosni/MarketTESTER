import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { experimentService } from '../services/experimentService';

export default function ExperimentForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'PLANNED'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await experimentService.create(formData as any);
            navigate('/experiments');
        } catch (error) {
            console.error('Failed to create experiment', error);
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
                New Experiment
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
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontWeight: 500 }}>Name</label>
                    <input
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-2)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)'
                        }}
                        placeholder="e.g., Pricing Page A/B Test"
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontWeight: 500 }}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-2)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            fontFamily: 'inherit'
                        }}
                        placeholder="Describe the hypothesis and methodology..."
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontWeight: 500 }}>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-2)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)'
                        }}
                    >
                        <option value="PLANNED">Planned</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>
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
                        disabled={loading}
                        style={{
                            padding: 'var(--spacing-2) var(--spacing-4)',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            fontWeight: 500,
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Creating...' : 'Create Experiment'}
                    </button>
                </div>
            </form>
        </div>
    );
}
