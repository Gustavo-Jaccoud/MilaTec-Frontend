import { KanbanProvider } from '@/context/useKanbanContext';
import { useLocation } from 'react-router-dom';
import Board from './components/Board';
import PageBreadcrumb from '@/components/PageBreadcrumb';

const KanbanPage = () => {
  const { pathname } = useLocation();
  const funnelVariant = pathname.includes('funil-projetos') ? 'projects-api' : 'none';

  let breadcrumbTitle = 'Funil';
  if (pathname.includes('funil-projetos')) breadcrumbTitle = 'Funil de Projetos';
  else if (pathname.includes('funil-obras')) breadcrumbTitle = 'Funil de Obras';
  else if (pathname.includes('programacao-entregas')) breadcrumbTitle = 'Programação de Entregas';
  else if (pathname.includes('tasks/kanban')) breadcrumbTitle = 'Kanban';

  return (
    <>
      <PageBreadcrumb title={breadcrumbTitle} />
      <KanbanProvider funnelVariant={funnelVariant}>
        <Board />
      </KanbanProvider>
    </>
  );
};

export default KanbanPage;
