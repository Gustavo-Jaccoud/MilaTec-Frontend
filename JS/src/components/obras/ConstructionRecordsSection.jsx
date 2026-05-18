import AttachmentBox from './AttachmentBox';

const ConstructionRecordsSection = () => {
  return (
    <section className="details-section">
      <h2 className="details-section__title">Registros</h2>
      <h3 className="details-subsection-title">Fotos da obra</h3>
      <AttachmentBox title="Galeria" emptyText="Sem anexos" />
    </section>
  );
};

export default ConstructionRecordsSection;
