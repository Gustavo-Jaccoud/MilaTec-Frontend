import { Col, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

/**
 * @param {{ details: import('@/utils/mapProjectDetails').ProjectDetails }} props
 */
const ProjectDocumentationSection = ({ details }) => {
  return (
    <section className="project-details-section">
      <h2 className="project-details-section__title">Documentação</h2>
      
      <Row className="g-3">
        <Col xs={12} md={4}>
          <div className="project-doc-subsection">
            <h3 className="project-doc-subsection__title">Pré-Projeto</h3>
            <div className="project-doc-subsection__content">
              <div className="project-doc-placeholder">
                <IconifyIcon icon="tabler:file-off" className="project-doc-placeholder__icon" />
                <span className="project-doc-placeholder__text">Sem anexos</span>
              </div>
            </div>
          </div>
        </Col>
        
        <Col xs={12} md={4}>
          <div className="project-doc-subsection">
            <h3 className="project-doc-subsection__title">Projeto para aprovação</h3>
            <div className="project-doc-subsection__content">
              <div className="project-doc-placeholder">
                <IconifyIcon icon="tabler:file-off" className="project-doc-placeholder__icon" />
                <span className="project-doc-placeholder__text">Sem anexos</span>
              </div>
            </div>
          </div>
        </Col>
        
        <Col xs={12} md={4}>
          <div className="project-doc-subsection">
            <h3 className="project-doc-subsection__title">Projeto executivo</h3>
            <div className="project-doc-subsection__content">
              <div className="project-doc-placeholder">
                <IconifyIcon icon="tabler:file-off" className="project-doc-placeholder__icon" />
                <span className="project-doc-placeholder__text">Sem anexos</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ProjectDocumentationSection;
