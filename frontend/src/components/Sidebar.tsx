import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, flask-conical as FlaskConical, LogOut } from 'lucide-react';
import clsx from 'clsx'; // Assuming clsx is installed or I should use template literals if not found.
// Wait, I installed clsx? I put 'axios zustand react-router-dom lucide-react' in command 86.
// I did NOT install clsx or tailwind-merge. I should use standard template literals or install them.
// I'll stick to template literals to avoid missing deps issues since I'm not 100% sure I installed clsx.
// Actually, I can just use simple string concat.

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Expires', path: '/experiments', icon: FlaskConical },
    ];

    return (
        <aside style={{
            width: '250px',
            backgroundColor: 'var(--color-surface)',
            borderRight: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--spacing-4)'
        }}>
            <div style={{ marginBottom: 'var(--spacing-8)', paddingLeft: 'var(--spacing-2)' }}>
                <h1 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    MarketTESTER
                </h1>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: 'var(--spacing-3)',
                                borderRadius: 'var(--radius-md)',
                                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                backgroundColor: isActive ? '#eff6ff' : 'transparent', // Light blue for active
                                fontWeight: isActive ? 500 : 400,
                                transition: 'background-color 0.2s'
                            }}
                        >
                            <Icon size={20} style={{ marginRight: 'var(--spacing-3)' }} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <button style={{
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--spacing-3)',
                color: 'var(--color-text-muted)',
                marginTop: 'auto'
            }}>
                <LogOut size={20} style={{ marginRight: 'var(--spacing-3)' }} />
                Logout
            </button>
        </aside>
    );
}
