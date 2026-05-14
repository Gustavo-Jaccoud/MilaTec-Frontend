import { Col, Row } from 'react-bootstrap';
import StatusBadge from './StatusBadge';

/**
 * @param {{ details: import('@/utils/mapConstructionDetails').ConstructionDetails }} props
 */
const ConstructionInfoSection = ({ details }) => {
  const budgetLabel =
    details.budgetType && details.budgetType.length ? details.budgetType.join(', ') : '-';

  return (
    <section className="obra-details-section">
      <h2 className="obra-details-section__title">Obra</h2>
      <Row className="g-3 g-lg-4">
        <Col xs={12} md={6} lg={4}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Cidade da obra</span>
            <StatusBadge status={details.cityDisplay} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Quantidade</span>
            <StatusBadge status={String(details.quantity)} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Empresa</span>
            <StatusBadge status={details.companyDisplay} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Tipo de orçamento</span>
            <StatusBadge status={budgetLabel} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Etapa</span>
            <StatusBadge status={details.businessStage} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Estado</span>
            <span className="obra-details-field__plain">{details.stateDisplay}</span>
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Data de criação</span>
            <StatusBadge status={details.createdAtLabel} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Canal de vendas</span>
            <StatusBadge status={details.salesChannel} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Equipe de instalação</span>
            <StatusBadge status={details.installationTeam} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Produto</span>
            <StatusBadge status={details.productLabel} />
          </div>
        </Col>
        <Col xs={12}>
          <div className="obra-details-field">
            <span className="obra-details-field__label">Contato de orçamento</span>
            <div className="obra-details-contact-placeholder">Sem contatos</div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ConstructionInfoSection;
