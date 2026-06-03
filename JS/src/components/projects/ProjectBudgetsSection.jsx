import { Col, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

/**
 * @param {{ details: import('@/utils/mapProjectDetails').ProjectDetails }} props
 */
const ProjectBudgetsSection = ({ details }) => {
  return (
    <section className="details-section details-section--card">
      <h2 className="details-section__title">Orçamentos</h2>

      {details.budgetNames && details.budgetNames.length > 0 ? (
        <Row className="g-3">
          {details.budgetNames.map((budgetName, index) => (
            <Col xs={12} key={index}>
              <div className="details-budget-item">
                <IconifyIcon icon="tabler:file-text" className="details-budget-item__icon" />
                <span className="details-budget-item__name">{budgetName}</span>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="details-placeholder">
          <IconifyIcon icon="tabler:file-off" className="details-placeholder__icon" />
          <span className="details-placeholder__text">Sem orçamentos</span>
        </div>
      )}
    </section>
  );
};

export default ProjectBudgetsSection;
