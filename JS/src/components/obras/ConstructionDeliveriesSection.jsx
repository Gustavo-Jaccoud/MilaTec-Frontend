import StatusBadge from './StatusBadge';
import AttachmentBox from './AttachmentBox';
import { formatBRL } from './obraDetailsFormat';

const DEADLINE_ROWS = [
  { label: 'Prazo orçamento', key: 'budget' },
  { label: 'Prazo análise', key: 'analysis' },
  { label: 'Prazo follow', key: 'follow' },
  { label: 'Prazo feedback', key: 'feedback' },
  { label: 'Prazo info', key: 'info' },
  { label: 'Prazo atualização', key: 'att' },
  { label: 'Prazo proj/op', key: 'projOp' }
];

/**
 * @param {{ details: import('@/utils/mapConstructionDetails').ConstructionDetails }} props
 */
const ConstructionDeliveriesSection = ({ details }) => {
  const d = details.deliveries;
  const deliveryMetrics = [
    { label: 'Quantidade entregue', value: String(d.delivered) },
    { label: 'Quantidade faltante', value: String(d.remaining) },
    { label: 'Valor entregue', value: formatBRL(d.deliveredValue) },
    { label: 'Valor restante', value: formatBRL(d.remainingValue) },
    { label: 'Etapa do negócio', value: details.businessStage },
    { label: 'Endereço da entrega', value: '-' }
  ];

  return (
    <section className="details-section details-section--card">
      <div className="details-section__header">
        <div>
          <h2 className="details-section__title">Entregas</h2>
          <p className="details-section__description">
            Acompanhamento do que já foi entregue, do saldo e dos prazos críticos.
          </p>
        </div>
      </div>

      <div className="details-delivery-layout">
        <aside className="details-delivery-panel">
          <div className="details-field">
            <span className="details-field__label">Resumo</span>
            <div className="details-select-like">Sem projetos</div>
          </div>
          <AttachmentBox title="Pedido de compra (anexo)" />
        </aside>

        <div className="details-delivery-content">
          <div className="details-metric-grid details-metric-grid--two mb-3">
            {deliveryMetrics.map((metric) => (
              <div className="details-field details-metric-card" key={metric.label}>
                <span className="details-field__label">{metric.label}</span>
                <StatusBadge status={metric.value} badgeClass="details-status-badge" />
              </div>
            ))}
          </div>

          <div className="details-deadlines-card">
            <h3 className="details-subsection-title">Datas importantes</h3>
            <div className="details-deadline-grid">
              {DEADLINE_ROWS.map((row) => (
                <div className="details-field details-field--compact" key={row.key}>
                  <span className="details-field__label">{row.label}</span>
                  <StatusBadge status={details.deadlines[row.key]} badgeClass="details-status-badge" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionDeliveriesSection;
