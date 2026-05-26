import AttachmentBox from './AttachmentBox';

const ConstructionRecordsSection = () => {
  return (
    <section className="details-section details-section--card">
      <div className="details-section__header">
        <div>
          <h2 className="details-section__title">Registros</h2>
          <p className="details-section__description">
            Evidências de acompanhamento da execução em campo.
          </p>
        </div>
      </div>

      <div className="details-records-panel">
        <h3 className="details-subsection-title">Fotos da obra</h3>
        <AttachmentBox title="Galeria" emptyText="Sem anexos" />
      </div>
    </section>
  );
};

export default ConstructionRecordsSection;
