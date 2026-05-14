import AttachmentBox from './AttachmentBox';

const ConstructionRecordsSection = () => {
  return (
    <section className="obra-details-section">
      <h2 className="obra-details-section__title">Registros</h2>
      <h3 className="obra-details-subsection-title">Fotos da obra</h3>
      <AttachmentBox title="Galeria" emptyText="Sem anexos" />
    </section>
  );
};

export default ConstructionRecordsSection;
