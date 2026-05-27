import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Obras from '@/app/(admin)/apps/Obras/components/Obras';
import Board from '@/app/(admin)/tasks/kanban/components/Board';
import { AuthProvider } from '@/context/useAuthContext';
import { KanbanProvider } from '@/context/useKanbanContext';
import { authSession } from '@/services/authSession';
import { fetchConstructions } from '@/services/constructionService';
import { fetchProjects } from '@/services/projectService';

vi.mock('@/services/constructionService', () => ({
  fetchConstructions: vi.fn()
}));

vi.mock('@/services/projectService', () => ({
  fetchProjects: vi.fn()
}));

const renderWithAuth = (ui) => {
  authSession.setToken('jwt');

  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
};

describe('funnel view mode switch', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('starts obras in kanban and switches to table with mapped stage', async () => {
    fetchConstructions.mockResolvedValue([
      {
        id: 'obra-1',
        ['Etapa do neg\u00f3cio']: 'Negociacao',
        ['Or\u00e7amentos']: 'Obra Alpha',
        ['Tipo de or\u00e7amento']: 'Industrial',
        'Cidade da obra': 'Fortaleza'
      }
    ]);

    const user = userEvent.setup();
    renderWithAuth(<Obras />);

    expect(await screen.findAllByText('Obra Alpha')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /kanban/i })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: /tabela/i }));

    expect(screen.getByRole('columnheader', { name: 'Etapa' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Negociacao' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver detalhes/i })).toHaveAttribute('href', '/obras/obra-1');
  });

  it('starts projetos in kanban and switches to table with mapped stage', async () => {
    fetchProjects.mockResolvedValue([
      {
        id: 'project-1',
        Projeto: 'Projeto Beta',
        ['Etapa do neg\u00f3cio']: 'Proposta',
        OrcamentoNome: 'Orcamento Beta',
        ['Tipo de or\u00e7amento']: 'Residencial',
        'Cidade da obra': 'Sobral',
        Created: '2026-05-27T10:00:00.000Z'
      }
    ]);

    const user = userEvent.setup();
    renderWithAuth(
      <KanbanProvider funnelVariant="projects-api">
        <Board />
      </KanbanProvider>
    );

    expect(await screen.findByText('Projeto Beta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /kanban/i })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: /tabela/i }));

    expect(screen.getByRole('columnheader', { name: 'Etapa' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Proposta' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver detalhes/i })).toHaveAttribute('href', '/project/project-1');
  });
});
