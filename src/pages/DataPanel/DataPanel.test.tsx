import { render, screen, waitFor } from '@testing-library/react';
import { DataPanel } from './DataPanel.component';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock useFetch hook
const mockUseFetch = vi.fn();
vi.mock('../../hooks', () => ({
  useFetch: (args: any) => mockUseFetch(args)
}));

describe('DataPanel Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render charts when data is provided correctly', async () => {
    // Mocking the normalized response from useFetch
    // Since useFetch does `json.data || json`, if backend returns { success: true, data: { ... } }
    // useFetch returns the object inside `data`.
    mockUseFetch.mockReturnValue({
      data: {
        pilotStatusData: [
          { name: 'Filiado', value: 10 },
          { name: 'Pendente', value: 5 }
        ],
        paymentStatusData: [
          { name: 'Em dia', value: 8 },
          { name: 'Pendente', value: 2 }
        ]
      },
      loading: false,
      error: null
    });

    render(
      <MemoryRouter>
        <DataPanel />
      </MemoryRouter>
    );

    // Verify if chart titles are present
    expect(screen.getByText('Status dos Pilotos')).toBeInTheDocument();
    expect(screen.getByText('Situação Financeira')).toBeInTheDocument();

    // The charts are rendered via PieChartComponent. 
    // In DataPanel.component.tsx, if pilotStatusData.length > 0, it renders PieChartComponent.
    // If our theory is correct, DataPanel is looking for statsResponse.data.pilotStatusData,
    // but statsResponse IS already the data object.
    
    // We expect the charts to be visible (not "Sem dados")
    await waitFor(() => {
      expect(screen.queryByText('Sem dados de pilotos')).not.toBeInTheDocument();
      expect(screen.queryByText('Sem dados de filiados')).not.toBeInTheDocument();
    });
  });

  it('should show empty state when data is empty or structured incorrectly', async () => {
    // If the data is empty, it should show "Sem dados"
    mockUseFetch.mockReturnValue({
      data: [],
      loading: false,
      error: null
    });

    render(
      <MemoryRouter>
        <DataPanel />
      </MemoryRouter>
    );

    expect(screen.getByText('Sem dados de pilotos')).toBeInTheDocument();
    expect(screen.getByText('Sem dados de filiados')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null
    });

    render(
      <MemoryRouter>
        <DataPanel />
      </MemoryRouter>
    );

    expect(screen.getByText('Compilando estatísticas…')).toBeInTheDocument();
  });
});
