import AttachmentBox from './AttachmentBox';

const FILE_ITEMS = [
  { key: 'proposal', title: 'Proposta comercial (anexo)' },
  { key: 'art', title: 'ART' },
  { key: 'memorial', title: 'Memorial de cálculo' },
  { key: 'contract', title: 'Contrato (anexo)' }
];

const ConstructionFilesSection = () => {
  return (
    <section className="obra-details-section obra-details-section--files">
      <h2 className="obra-details-section__title">Arquivos</h2>
      <div className="obra-details-files-grid">
        {FILE_ITEMS.map((item) => (
          <AttachmentBox key={item.key} title={item.title} />
        ))}
      </div>
    </section>
  );
};

export default ConstructionFilesSection;
