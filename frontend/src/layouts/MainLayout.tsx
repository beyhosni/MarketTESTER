import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
    return (
        <div className="layout-container">
            <Sidebar />
            <main className="main-content">
                <header style={{
                    marginBottom: 'var(--spacing-6)',
                    paddingBottom: 'var(--spacing-4)',
                    borderBottom: '1px solid var(--color-border)'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Welcome back</h2>
                </header>
                <Outlet />
            </main>
        </div>
    );
}
