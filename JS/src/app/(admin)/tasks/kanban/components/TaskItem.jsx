const TaskItem = ({
  task: { title, budgetName, budgetType, category, createdAt },
}) => {
  return (
    <div className="project-card-content">
      <h5 className="project-card-title">{title}</h5>

      <div className="project-card-field">
        <span className="project-card-label">Orçamentos</span>
        <span className="project-card-value">{budgetName}</span>
      </div>

      <div className="project-card-field">
        <span className="project-card-label">Tipo de orçamento</span>
        <span className="project-card-value">{budgetType}</span>
      </div>

      <div className="project-card-field">
        <span className="project-card-label">Categoria</span>
        <span className="project-card-value">{category}</span>
      </div>

      <div className="project-card-field">
        <span className="project-card-label">Data de criação</span>
        <span className="project-card-date">{createdAt}</span>
      </div>
    </div>
  );
};

export default TaskItem;
