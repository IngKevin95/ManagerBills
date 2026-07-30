import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import UsersView from './views/UsersView';
import Layout from './components/Layout';

function AppContent() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <p style={{ color: 'var(--text-muted)' }}>Cargando sistema...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardView />} />
        <Route 
          path="/users" 
          element={user.role === 'Admin' ? <UsersView /> : <Navigate to="/" replace />} 
        />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return <AppContent />;
}
