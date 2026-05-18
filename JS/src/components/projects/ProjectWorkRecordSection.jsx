import IconifyIcon from '@/components/wrappers/IconifyIcon';

/**
 * @param {{ details: import('@/utils/mapProjectDetails').ProjectDetails }} props
 */
const ProjectWorkRecordSection = ({ details }) => {
  return (
    <section className="details-section">
      <h2 className="details-section__title">Registro da Obra</h2>

      <div className="details-placeholder">
        <IconifyIcon icon="tabler:file-off" className="details-placeholder__icon" />
        <span className="details-placeholder__text">Sem anexos</span>
      </div>
    </section>
  );
};

export default ProjectWorkRecordSection;
