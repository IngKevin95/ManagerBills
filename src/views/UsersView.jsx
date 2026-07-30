import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createUser, deleteUser } from '../db';
import { Trash2 } from 'lucide-react';

export default function UsersView() {
  const { user, usersList, reloadUsers } = useAuth();
  const [name, setName] = useState('');
  const [role, setRole] = useState('Lector');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!name.trim()) return setError('El nombre no puede estar vacío');
    try {
      await createUser(name.trim(), role);
      await reloadUsers();
      setName('');
      setSuccess('Usuario creado exitosamente');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (id === user.id) {
      setError('No puedes eliminar tu propio usuario activo.');
      return;
    }
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await deleteUser(id);
        await reloadUsers();
        setSuccess('Usuario eliminado exitosamente');
        setError('');
      } catch (err) {
        setError('Error al eliminar usuario');
      }
    }
  };

  return (
    <div className="card animate-fade-in">
      <h2>Gestión de Usuarios</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Crea nuevos usuarios y asigna roles.</p>
      
      {error && <div style={{ color: 'var(--expense)', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>{error}</div>}
      {success && <div style={{ color: 'var(--income)', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>{success}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <h3>Usuarios Registrados</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 500 }}>{u.name}</td>
                  <td><span className={`badge ${u.role === 'Admin' ? 'badge-admin' : 'badge-lector'}`}>{u.role}</span></td>
                  <td>
                    {u.id !== user.id && (
                      <button className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => handleDelete(u.id)} title="Eliminar" aria-label={`Eliminar usuario ${u.name}`}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3>Crear Nuevo Usuario</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            <input 
              className="input-field" 
              type="text" 
              placeholder="Nombre de usuario" 
              aria-label="Nombre de usuario"
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
            <select className="select-field" value={role} onChange={e => setRole(e.target.value)} aria-label="Rol del usuario">
              <option value="Lector">Lector</option>
              <option value="Admin">Administrador</option>
            </select>
            <button className="btn" type="submit">Crear Usuario</button>
          </form>
        </div>
      </div>
    </div>
  );
}
