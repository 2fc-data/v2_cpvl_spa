import { render, screen } from '@testing-library/react';
import { DashboardHome } from './Dashboard.component';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';

// Mock useAuth hook
const mockUseAuth = vi.fn();
vi.mock('@/context/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}));

// Mock useFetch hook (since StatusList uses it)
vi.mock('@/hooks', () => ({
  useFetch: () => ({ data: [], loading: false, error: null })
}));

describe('DashboardHome Component', () => {
  it('should render Admin View when user is admin', () => {
    mockUseAuth.mockReturnValue({
      profile: {
        user: { role: 'admin', firstName: 'Admin' },
        routes: [{ label: 'Pilotos', route: 'pilots' }],
      },
      isAdmin: true
    });

    render(
      <MemoryRouter>
        <DashboardHome />
      </MemoryRouter>
    );

    // For now, it just renders StatusList, so we expect "Visão Administrativa"
    expect(screen.getByText('Visão Administrativa')).toBeInTheDocument();
    expect(screen.getByText('Painel de Dados')).toBeInTheDocument();
  });

  it('should render Pilot View when user is pilot', () => {
    mockUseAuth.mockReturnValue({
      profile: {
        user: { role: 'piloto', firstName: 'Pilot' },
        pilotInfo: { firstName: 'Pilot', lastName: 'User' },
        routes: [{ label: 'Meus Dados', route: 'pilots/1' }],
      },
      isAdmin: false
    });

    render(
      <MemoryRouter>
        <DashboardHome />
      </MemoryRouter>
    );

    expect(screen.getByText('Bem-vindo, Pilot!')).toBeInTheDocument();
    expect(screen.getByText('Seu Status')).toBeInTheDocument();
  });
});
