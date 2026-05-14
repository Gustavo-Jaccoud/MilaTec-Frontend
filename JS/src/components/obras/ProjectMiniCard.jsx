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
    <div className={classNames('obra-details-project-mini-card', className)}>
      <h6 className="obra-details-project-mini-card__title">{title}</h6>
      <div className="obra-details-project-mini-card__grid">
        <div className="obra-details-field">
          <span className="obra-details-field__label">Etapa</span>
          <StatusBadge status={stage} />
        </div>
        <div className="obra-details-field">
          <span className="obra-details-field__label">Tipo de orçamento</span>
          <StatusBadge status={budgetType} />
        </div>
        <div className="obra-details-field">
          <span className="obra-details-field__label">Valor</span>
          <StatusBadge status={valueLabel} />
        </div>
        <div className="obra-details-field">
          <span className="obra-details-field__label">Quantidade</span>
          <span className="obra-details-field__plain">{quantityLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectMiniCard;
