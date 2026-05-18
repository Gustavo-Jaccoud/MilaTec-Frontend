import IconifyIcon from '@/components/wrappers/IconifyIcon';

/**
 * @param {{ details: import('@/utils/mapProjectDetails').ProjectDetails }} props
 */
const ProjectWorkRecordSection = ({ details }) => {
  return (
    <section className="project-details-section">
      <h2 className="project-details-section__title">Registro da Obra</h2>
      
      <div className="project-doc-placeholder">
        <IconifyIcon icon="tabler:file-off" className="project-doc-placeholder__icon" />
        <span className="project-doc-placeholder__text">Sem anexos</span>
      </div>
    </section>
  );
};

export default ProjectWorkRecordSection;
