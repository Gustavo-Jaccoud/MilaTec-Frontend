import { useKanbanContext } from '@/context/useKanbanContext';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';

const FILTERS = ['Etapa do negócio'];

const Board = () => {
  const {
    onDragEnd,
    sections,
    getAllTasksPerSection,
    loading,
    error,
    readOnly,
    needsAuth,
    refetchKanban,
    funnelVariant
  } = useKanbanContext();

  const columnBody = (section) => (
    <>
      <div className="project-stage-header">
        <span
          className={`project-stage-pill ${
            section.color === 'success'
              ? 'project-stage-pill-success'
              : 'project-stage-pill-default'
          }`}
        >
          {section.title}
        </span>
      </div>

      <div className="tasklist project-stage-tasklist" id={section.id}>
        {getAllTasksPerSection(section.id).map((task) => (
          <Card key={task.id} className="mb-2">
            <TaskItem task={task} />
          </Card>
        ))}
      </div>
    </>
  );

  if (needsAuth) {
    return (
      <div className="project-funnel-page">
        <header className="project-funnel-header">
          <h1 className="project-funnel-title">PROJETOS</h1>
          <p className="project-funnel-subtitle">Acompanhe seus projetos!</p>
        </header>
        <Alert variant="warning" className="mt-3">
          Faça login para carregar o funil de projetos.{' '}
          <Link to="/auth/login" className="alert-link fw-semibold">
            Ir para o login
          </Link>
        </Alert>
      </div>
    );
  }

  if (funnelVariant === 'none') {
    return (
      <div className="project-funnel-page">
        <header className="project-funnel-header">
          <h1 className="project-funnel-title">PROJETOS</h1>
          <p className="project-funnel-subtitle">Acompanhe seus projetos!</p>
        </header>
        <Alert variant="info" className="mt-3">
          A integração com a API está disponível em <strong>Funil de Projetos</strong> (menu Funil de
          Projetos).
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="project-funnel-page text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Carregando…</span>
        </Spinner>
        <p className="mt-3 text-muted mb-0">Carregando projetos…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-funnel-page">
        <Alert variant="danger" className="mt-3">
          <div className="mb-2">{error}</div>
          <Button variant="outline-danger" size="sm" type="button" onClick={refetchKanban}>
            Tentar novamente
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="project-funnel-page">
      <header className="project-funnel-header">
        <h1 className="project-funnel-title">PROJETOS</h1>
        <p className="project-funnel-subtitle">Acompanhe seus projetos!</p>
      </header>

      <div className="project-funnel-filters">
        {FILTERS.map((filterLabel) => (
          <button
            key={filterLabel}
            type="button"
            className="project-funnel-filter-pill"
          >
            {filterLabel}
          </button>
        ))}
      </div>

      {readOnly ? (
        <div className="kanban-board project-funnel-board">
          {sections.map((section) => (
            <div key={section.id} className="kanban-board-item project-stage-column">
              {columnBody(section)}
            </div>
          ))}
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban-board project-funnel-board">
            {sections.map((section) => (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="kanban-board-item project-stage-column"
                  >
                    <div className="project-stage-header">
                      <span
                        className={`project-stage-pill ${
                          section.color === 'success'
                            ? 'project-stage-pill-success'
                            : 'project-stage-pill-default'
                        }`}
                      >
                        {section.title}
                      </span>
                    </div>
                    <div className="tasklist project-stage-tasklist" id={section.id}>
                      {getAllTasksPerSection(section.id).map((task, idx) => (
                        <Draggable key={task.id} draggableId={task.id} index={idx}>
                          {(dragProvided) => (
                            <Card
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              className="mb-2"
                            >
                              <TaskItem task={task} />
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}

      {funnelVariant === 'projects-api' && !loading && sections.length === 0 && (
        <p className="text-muted mt-3 mb-0">Nenhum projeto encontrado.</p>
      )}
    </div>
  );
};

export default Board;
