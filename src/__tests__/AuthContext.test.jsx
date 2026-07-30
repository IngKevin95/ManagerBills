import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import * as db from '../db';
import { vi } from 'vitest';

vi.mock('../db', () => ({
  initDb: vi.fn(),
  getUsers: vi.fn(),
  createUser: vi.fn()
}));

const TestComponent = () => {
  const { user, usersList, loading, login, logout, registerAdmin } = useAuth();
  
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div data-testid="user">{user ? user.name : 'No User'}</div>
      <div data-testid="users-count">{usersList.length}</div>
      <button onClick={() => login({ id: 1, name: 'Alice' })}>Login</button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => registerAdmin('AdminName')}>Register</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes and loads users', async () => {
    db.getUsers.mockResolvedValue([{ id: 1, name: 'Bob' }]);
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for the effect
    const count = await screen.findByTestId('users-count');
    expect(count).toHaveTextContent('1');
    expect(screen.getByTestId('user')).toHaveTextContent('No User');
  });

  it('allows login and logout', async () => {
    db.getUsers.mockResolvedValue([]);
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await screen.findByTestId('users-count');
    
    act(() => {
      screen.getByText('Login').click();
    });
    
    expect(screen.getByTestId('user')).toHaveTextContent('Alice');

    act(() => {
      screen.getByText('Logout').click();
    });
    
    expect(screen.getByTestId('user')).toHaveTextContent('No User');
  });
});
