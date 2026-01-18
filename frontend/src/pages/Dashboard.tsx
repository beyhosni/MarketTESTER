export default function Dashboard() {
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
                    <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Active Experiments</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: 'var(--spacing-2)' }}>3</p>
                </div>

                <div style={{
                    padding: 'var(--spacing-6)',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--color-border)'
                }}>
                    <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Total Validations</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: 'var(--spacing-2)' }}>128</p>
                </div>
            </div>
        </div>
    );
}
