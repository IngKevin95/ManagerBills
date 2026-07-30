import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Moon, Sun, LayoutDashboard, Users } from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="header">
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.25rem', letterSpacing: '-0.5px' }}>ManagerBills</h1>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            {user?.role === 'Admin' && (
              <Link to="/users" className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}>
                <Users size={18} /> Usuarios
              </Link>
            )}
          </nav>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '1rem' }}>
            <span style={{ fontWeight: 600, lineHeight: 1 }}>{user?.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role}</span>
          </div>
          <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }} aria-label="Alternar tema">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem', borderRadius: '50%' }} title="Cerrar sesión">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="container" style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
