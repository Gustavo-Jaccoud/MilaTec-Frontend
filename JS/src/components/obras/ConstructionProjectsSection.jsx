import ProjectMiniCard from './ProjectMiniCard';
import { formatBRL, formatKg } from './obraDetailsFormat';

const MOCK_PROJECT_CARDS = [
  {
    id: 'mock-1',
    title: 'Sala de reunião — 1658',
    stage: 'Orçamento',
    budgetType: 'Steel frame',
    valueLabel: formatBRL(0),
    quantityLabel: '-'
  },
  {
    id: 'mock-2',
    title: 'Bicicletário',
    stage: 'Projeto executivo',
    budgetType: 'Solar',
    valueLabel: formatBRL(0),
    quantityLabel: '-'
  },
  {
    id: 'mock-3',
    title: 'Casa de gás',
    stage: 'Concluído',
    budgetType: 'Laje',
    valueLabel: formatBRL(0),
    quantityLabel: '-'
  }
];

const SUMMARY_ITEMS = [
  { label: 'Valor total', key: 'totalValue', format: formatBRL },
  { label: 'Quantidade total', key: 'totalQty', format: (value) => (Number.isFinite(value) ? value : 0) },
  { label: 'Peso total', key: 'totalWeight', format: formatKg }
];

/**
 * @param {{ details: import('@/utils/mapConstructionDetails').ConstructionDetails }} props
 */
const ConstructionProjectsSection = ({ details }) => {
  return (
    <section className="details-section details-section--card">
      <div className="details-section__header">
        <div>
          <h2 className="details-section__title">Projetos</h2>
          <p className="details-section__description">
            Visão consolidada dos projetos vinculados a esta obra.
          </p>
        </div>
      </div>

      <div className="details-metric-grid details-metric-grid--three mb-3">
        {SUMMARY_ITEMS.map((item) => (
          <div className="details-metric-card" key={item.key}>
            <span className="details-metric-card__label">{item.label}</span>
            <strong className="details-metric-card__value">
              {item.format(details.projectsSummary[item.key])}
            </strong>
          </div>
        ))}
      </div>

      <div className="details-inline-note mb-3">
        Cards de exemplo até existir endpoint de projetos por obra.
      </div>

      <div className="details-project-cards-row">
        {MOCK_PROJECT_CARDS.map((card) => (
          <ProjectMiniCard
            key={card.id}
            title={card.title}
            stage={card.stage}
            budgetType={card.budgetType}
            valueLabel={card.valueLabel}
            quantityLabel={card.quantityLabel}
          />
        ))}
      </div>
    </section>
  );
};

export default ConstructionProjectsSection;
