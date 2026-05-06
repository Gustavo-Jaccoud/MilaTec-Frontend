import { KanbanProvider } from '@/context/useKanbanContext';
import Board from './components/Board';
import PageBreadcrumb from '@/components/PageBreadcrumb';

const KanbanPage = () => {
  return <>
      <PageBreadcrumb title='Funil de Projetos' />
      <KanbanProvider>
        <Board />
      </KanbanProvider>
    </>;
};
export default KanbanPage;