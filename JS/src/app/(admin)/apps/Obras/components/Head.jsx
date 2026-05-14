import PageBreadcrumb from '@/components/PageBreadcrumb';

const Head = () => {
  return (
    <>
      <PageBreadcrumb title="Obras" />
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="mb-0">Funil de Obras</h4>
          <p className="text-muted mb-0">Acompanhe suas obras por etapa</p>
        </div>
      </div>
    </>
  );
};

export default Head;
