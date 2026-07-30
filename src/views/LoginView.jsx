import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginView() {
  const { usersList, registerAdmin, login } = useAuth();
  const [newAdminName, setNewAdminName] = useState('');

  if (usersList.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ maxWidth: '450px', marginTop: '10vh' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-main)', textAlign: 'center' }}>ManagerBills</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>Para empezar, crea el perfil de Administrador.</p>
          <form onSubmit={(e) => { e.preventDefault(); registerAdmin(newAdminName); }}>
            <input
              type="text"
              className="input-field"
              placeholder="Nombre del Admin"
              aria-label="Nombre del Admin"
              value={newAdminName}
              onChange={e => setNewAdminName(e.target.value)}
              required
            />
            <button type="submit" className="btn" style={{ width: '100%' }}>Crear Usuario</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '600px', marginTop: '10vh' }}>
      <div className="card">
        <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Seleccionar Perfil</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>¿Quién está utilizando la aplicación?</p>
        <div className="profiles-grid">
          {usersList.map(u => (
            <div 
              key={u.id} 
              className="profile-card" 
              role="button" 
              tabIndex={0} 
              onClick={() => login(u)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  login(u);
                }
              }}
            >
              <div className="profile-avatar">{u.name.charAt(0).toUpperCase()}</div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>{u.name}</strong>
                <span className={`badge ${u.role === 'Admin' ? 'badge-admin' : 'badge-lector'}`} style={{ marginTop: '0.5rem', display: 'inline-block' }}>{u.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
