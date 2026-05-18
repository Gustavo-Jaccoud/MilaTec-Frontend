import { Col, Row } from 'react-bootstrap';
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

  return (
    <section className="details-section">
      <h2 className="details-section__title">Entregas</h2>
      <Row className="g-4">
        <Col xs={12} lg={5}>
          <div className="details-field mb-3">
            <span className="details-field__label">Resumo</span>
            <div className="details-select-like">Sem projetos</div>
          </div>
          <AttachmentBox title="Pedido de compra (anexo)" />
        </Col>
        <Col xs={12} lg={7}>
          <Row className="g-3 mb-3">
            <Col xs={12} sm={6}>
              <div className="details-field">
                <span className="details-field__label">Quantidade entregue</span>
                <StatusBadge status={String(d.delivered)} badgeClass="details-status-badge" />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="details-field">
                <span className="details-field__label">Quantidade faltante</span>
                <StatusBadge status={String(d.remaining)} badgeClass="details-status-badge" />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="details-field">
                <span className="details-field__label">Valor entregue</span>
                <StatusBadge status={formatBRL(d.deliveredValue)} badgeClass="details-status-badge" />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="details-field">
                <span className="details-field__label">Valor restante</span>
                <StatusBadge status={formatBRL(d.remainingValue)} badgeClass="details-status-badge" />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="details-field">
                <span className="details-field__label">Etapa (negócio)</span>
                <StatusBadge status={details.businessStage} badgeClass="details-status-badge" />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="details-field">
                <span className="details-field__label">Endereço da entrega</span>
                <span className="details-field__plain">-</span>
              </div>
            </Col>
          </Row>
          <h3 className="details-subsection-title">Datas importantes</h3>
          <Row className="g-2">
            {DEADLINE_ROWS.map((row) => (
              <Col xs={12} sm={6} key={row.key}>
                <div className="details-field details-field--compact">
                  <span className="details-field__label">{row.label}</span>
                  <StatusBadge status={details.deadlines[row.key]} badgeClass="details-status-badge" />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default ConstructionDeliveriesSection;
