import { useKanbanContext } from '@/context/useKanbanContext';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Card } from 'react-bootstrap';
import TaskItem from './TaskItem';

const FILTERS = ['Etapa do negócio'];

const Board = () => {
  const { onDragEnd, sections, getAllTasksPerSection } = useKanbanContext();

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
    </div>
  );
};

export default Board;
