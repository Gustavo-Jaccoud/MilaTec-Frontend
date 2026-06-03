import classNames from 'classnames';
import StatusBadge from './StatusBadge';

/**
 * @param {{
 *   title: string
 *   stage: string
 *   budgetType: string
 *   valueLabel: string
 *   quantityLabel?: string
 *   className?: string
 * }} props
 */
const ProjectMiniCard = ({ title, stage, budgetType, valueLabel, quantityLabel = '-', className }) => {
  return (
    <div className={classNames('details-project-mini-card', className)}>
      <h6 className="details-project-mini-card__title">{title}</h6>
      <div className="details-project-mini-card__grid">
        <div className="details-field">
          <span className="details-field__label">Etapa</span>
          <StatusBadge status={stage} badgeClass="details-status-badge" />
        </div>
        <div className="details-field">
          <span className="details-field__label">Tipo de orçamento</span>
          <StatusBadge status={budgetType} badgeClass="details-status-badge" />
        </div>
        <div className="details-field">
          <span className="details-field__label">Valor</span>
          <StatusBadge status={valueLabel} badgeClass="details-status-badge" />
        </div>
        <div className="details-field">
          <span className="details-field__label">Quantidade</span>
          <span className="details-field__plain">{quantityLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectMiniCard;
