import { Col, Row } from 'react-bootstrap';
import StatusBadge from '@/components/obras/StatusBadge';

/**
 * @param {{ details: import('@/utils/mapProjectDetails').ProjectDetails }} props
 */
const ProjectInfoSection = ({ details }) => {
  const formatDate = (dateString) => {
    if (!dateString || dateString === '-') return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return '-';
    }
  };

  const formatCurrency = (value) => {
    if (value === 0 || !value) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <section className="project-details-section">
      <h2 className="project-details-section__title">Informações do Projeto</h2>
      <Row className="g-3 g-lg-4">
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Projeto</span>
            <StatusBadge status={details.projectName} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Produto</span>
            <StatusBadge status={details.product} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Tipo de Projeto</span>
            <StatusBadge status={details.projectType} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Cidade da obra (orçamento)</span>
            <StatusBadge status={details.city} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Etapa do Projeto</span>
            <StatusBadge status={details.stage} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Etapa do Negócio</span>
            <StatusBadge status={details.businessStage} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Quantidade</span>
            <StatusBadge status={String(details.quantity)} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Peso do projeto (kg)</span>
            <StatusBadge status={String(details.weight)} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Maior peça</span>
            <StatusBadge status={String(details.maxPiece)} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Valor Total do Projeto</span>
            <StatusBadge status={formatCurrency(details.totalValue)} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Data de criação</span>
            <StatusBadge status={formatDate(details.createdAt)} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Criado por</span>
            <StatusBadge status={details.createdBy} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="project-details-field">
            <span className="project-details-field__label">Última alteração</span>
            <StatusBadge status={formatDate(details.lastModified)} />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ProjectInfoSection;
