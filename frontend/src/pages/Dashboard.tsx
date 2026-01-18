import { useEffect, useState } from 'react';
import { dashboardService, DashboardDto } from '../services/dashboardService';

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                // TODO: Properly handle project selection. For now, we try to get a project ID.
                // In a real app, we'd list projects or have a selectedProjectId in the store.
                const projects = await dashboardService.getUserProjects();
                if (projects && projects.length > 0) {
                    const firstProject = projects[0];
                    const data = await dashboardService.getStats(firstProject.id);
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to load dashboard stats', error);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) {
        return <div style={{ padding: 'var(--spacing-6)' }}>Loading dashboard...</div>;
    }

    if (!stats) {
        return (
            <div style={{ padding: 'var(--spacing-6)' }}>
                <h3>No projects found</h3>
                <p>Please create a project to see statistics.</p>
                {/* Button to create project would go here */}
            </div>
        );
    }

    return (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--spacing-6)'
            }}>
                <div style={{
                    padding: 'var(--spacing-6)',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--color-border)'
                }}>
                    <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Active Hypotheses</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: 'var(--spacing-2)' }}>{stats.hypothesisCount}</p>
                </div>

                <div style={{
                    padding: 'var(--spacing-6)',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--color-border)'
                }}>
                    <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Validated</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: 'var(--spacing-2)' }}>{stats.validatedHypothesisCount}</p>
                </div>

                <div style={{
                    padding: 'var(--spacing-6)',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--color-border)'
                }}>
                    <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Readiness Score</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: 'var(--spacing-2)', color: stats.validationReadinessScore > 70 ? 'green' : 'orange' }}>
                        {stats.validationReadinessScore}%
                    </p>
                </div>
            </div>
        </div>
    );
}
