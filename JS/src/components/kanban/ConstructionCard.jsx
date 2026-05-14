const ConstructionCard = ({ task: { title, budgetName, city, type } }) => {
  return (
    <div className="project-card-content">
      <h5 className="project-card-title">{title}</h5>

      <div className="project-card-field">
        <span className="project-card-label">Orçamentos</span>
        <span className="project-card-value">{budgetName}</span>
      </div>

      <div className="project-card-field">
        <span className="project-card-label">Tipo de orçamento</span>
        <span className="project-card-value">{type}</span>
      </div>

      <div className="project-card-field">
        <span className="project-card-label">Cidade da obra</span>
        <span className="project-card-value">{city}</span>
      </div>
    </div>
  );
};

export default ConstructionCard;
