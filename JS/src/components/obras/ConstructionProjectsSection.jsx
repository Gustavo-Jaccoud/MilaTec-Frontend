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

/**
 * @param {{ details: import('@/utils/mapConstructionDetails').ConstructionDetails }} props
 */
const ConstructionProjectsSection = ({ details }) => {
  const { totalValue, totalQty, totalWeight } = details.projectsSummary;

  return (
    <section className="details-section">
      <h2 className="details-section__title">Projetos</h2>
      <div className="details-projects-summary mb-3">
        <span className="me-4">
          <strong>Valor total:</strong> {formatBRL(totalValue)}
        </span>
        <span className="me-4">
          <strong>Quantidade total:</strong> {Number.isFinite(totalQty) ? totalQty : 0}
        </span>
        <span>
          <strong>Peso total:</strong> {formatKg(totalWeight)}
        </span>
      </div>
      <p className="details-hint text-muted small mb-3">
        Cards de exemplo até existir endpoint de projetos por obra.
      </p>
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
