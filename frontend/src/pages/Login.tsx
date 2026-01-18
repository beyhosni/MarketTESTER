import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../services/authService';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        try {
            await authService.login({ email, password });
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login failed', err);
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: 'var(--color-background)'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: 'var(--spacing-8)',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <h1 style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)', color: 'var(--color-primary)' }}>
                    MarketTESTER
                </h1>

                {error && (
                    <div style={{
                        padding: 'var(--spacing-3)',
                        marginBottom: 'var(--spacing-4)',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: '0.875rem' }}>Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-2)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                fontSize: '1rem'
                            }}
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: '0.875rem' }}>Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-2)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                fontSize: '1rem'
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: 'var(--spacing-2)',
                            padding: 'var(--spacing-2)',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 500,
                            transition: 'background-color 0.2s',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
