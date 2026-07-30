import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginView from '../views/LoginView';
import { useAuth } from '../context/AuthContext';
import { vi } from 'vitest';

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn()
}));

describe('LoginView', () => {
  it('renders admin creation form when no users exist', () => {
    const registerAdmin = vi.fn();
    useAuth.mockReturnValue({
      usersList: [],
      registerAdmin,
      login: vi.fn()
    });

    render(<LoginView />);

    expect(screen.getByText('Para empezar, crea el perfil de Administrador.')).toBeInTheDocument();
    
    const input = screen.getByPlaceholderText('Nombre del Admin');
    const button = screen.getByText('Crear Usuario');
    
    fireEvent.change(input, { target: { value: 'SuperAdmin' } });
    fireEvent.click(button);
    
    expect(registerAdmin).toHaveBeenCalledWith('SuperAdmin');
  });

  it('renders user list when users exist', () => {
    const login = vi.fn();
    useAuth.mockReturnValue({
      usersList: [
        { id: 1, name: 'John Doe', role: 'Admin' },
        { id: 2, name: 'Jane Smith', role: 'Lector' }
      ],
      registerAdmin: vi.fn(),
      login
    });

    render(<LoginView />);

    expect(screen.getByText('Seleccionar Perfil')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    const johnProfile = screen.getByText('John Doe').closest('.profile-card');
    fireEvent.click(johnProfile);
    
    expect(login).toHaveBeenCalledWith({ id: 1, name: 'John Doe', role: 'Admin' });
  });
});
