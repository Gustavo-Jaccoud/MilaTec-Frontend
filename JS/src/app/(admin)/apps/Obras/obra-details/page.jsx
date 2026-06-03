import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/useAuthContext';
import { fetchConstructionById } from '@/services/constructionService';
import { mapConstruction } from '@/utils/mapConstructionDetails';
import DetailsPage from '@/components/details/DetailsPage';
import DetailsHeader from '@/components/details/DetailsHeader';
import DetailsSection from '@/components/details/DetailsSection';
import InfoGrid from '@/components/details/InfoGrid';
import InfoField from '@/components/details/InfoField';
import AttachmentCard from '@/components/details/AttachmentCard';
import ConstructionProjectsSection from '@/components/obras/ConstructionProjectsSection';
import ConstructionDeliveriesSection from '@/components/obras/ConstructionDeliveriesSection';
import ConstructionRecordsSection from '@/components/obras/ConstructionRecordsSection';
import { Col } from 'react-bootstrap';

const FILE_ITEMS = [
  { key: 'proposal', title: 'Proposta comercial (anexo)' },
  { key: 'art', title: 'ART' },
  { key: 'memorial', title: 'Memorial de cálculo' },
  { key: 'contract', title: 'Contrato (anexo)' }
];

const HIGHLIGHT_FIELDS = [
  { label: 'Etapa atual', key: 'businessStage' },
  { label: 'Cidade', key: 'cityDisplay' },
  { label: 'Empresa', key: 'companyDisplay' },
  { label: 'Quantidade', key: 'quantity', format: (v) => String(v) }
];

const INFO_GROUPS = [
  {
    title: 'Resumo da obra',
    description: 'Informações que identificam a obra e o escopo principal.',
    fields: [
      { label: 'Produto', key: 'productLabel' },
      { label: 'Tipo de orçamento', key: 'budgetType', format: (v) => (v && v.length ? v.join(', ') : '-') },
      { label: 'Quantidade', key: 'quantity', format: (v) => String(v) }
    ]
  },
  {
    title: 'Comercial',
    description: 'Origem da oportunidade e relacionamento com o cliente.',
    fields: [
      { label: 'Empresa', key: 'companyDisplay' },
      { label: 'Canal de vendas', key: 'salesChannel' },
      { label: 'Data de criação', key: 'createdAtLabel' }
    ]
  },
  {
    title: 'Operação',
    description: 'Status e responsáveis pela evolução da obra.',
    fields: [
      { label: 'Etapa', key: 'businessStage' },
      { label: 'Estado', key: 'stateDisplay', asBadge: false },
      { label: 'Equipe de instalação', key: 'installationTeam' }
    ]
  },
  {
    title: 'Localização',
    description: 'Dados usados para logística e acompanhamento em campo.',
    fields: [
      { label: 'Cidade da obra', key: 'cityDisplay', asBadge: false }
    ]
  }
];

const ObraDetailsPage = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!accessToken || !id) {
      setError(!accessToken ? 'Faça login para ver os detalhes da obra.' : 'Obra inválida.');
      setLoading(false);
      setDetails(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const raw = await fetchConstructionById(accessToken, id);
      setDetails(mapConstruction(raw));
    } catch (e) {
      setDetails(null);
      setError(e instanceof Error ? e.message : 'Erro ao carregar a obra');
    } finally {
      setLoading(false);
    }
  }, [accessToken, id]);

  useEffect(() => {
    load();
  }, [load]);

  if (!details) {
    return (
      <DetailsPage
        loading={loading}
        error={error}
        onLoad={load}
        loadingMessage="Carregando detalhes da obra…"
        authMessage="Faça login para ver os detalhes da obra."
        errorMessage={error ?? 'Não foi possível carregar a obra.'}
      />
    );
  }

  return (
    <DetailsPage
      loading={loading}
      error={error}
      onLoad={load}
      loadingMessage="Carregando detalhes da obra…"
      authMessage="Faça login para ver os detalhes da obra."
      errorMessage={error ?? 'Não foi possível carregar a obra.'}
      className="details-print"
    >
      <DetailsHeader title={details.title} kicker="OBRAS" subtitle="Acompanhe suas obras!" />

      <div className="details-main details-main--obra">
        <div className="details-highlight-grid" aria-label="Resumo rápido da obra">
          {HIGHLIGHT_FIELDS.map((field) => (
            <div className="details-highlight-card" key={field.key}>
              <span className="details-highlight-card__label">{field.label}</span>
              <span className="details-highlight-card__value">
                {field.format ? field.format(details[field.key]) : details[field.key]}
              </span>
            </div>
          ))}
        </div>

        <div className="details-obra-row">
          <div className="details-obra-row__info">
            <DetailsSection title="Informações da obra" className="details-section--card">
              <div className="details-info-groups">
                {INFO_GROUPS.map((group) => (
                  <div className="details-info-group" key={group.title}>
                    <div className="details-info-group__header">
                      <h3 className="details-info-group__title">{group.title}</h3>
                      <p className="details-info-group__description">{group.description}</p>
                    </div>
                    <InfoGrid gap="g-3">
                      {group.fields.map((field) => (
                        <InfoField
                          key={field.key}
                          label={field.label}
                          value={field.format ? field.format(details[field.key]) : details[field.key]}
                          asBadge={field.asBadge !== false}
                          colProps={{ xs: 12, md: group.fields.length > 1 ? 6 : 12 }}
                        />
                      ))}
                    </InfoGrid>
                  </div>
                ))}

                <div className="details-info-group details-info-group--wide">
                  <div className="details-info-group__header">
                    <h3 className="details-info-group__title">Contato</h3>
                    <p className="details-info-group__description">Responsáveis vinculados ao orçamento.</p>
                  </div>
                  <InfoGrid gap="g-3">
                    <Col xs={12}>
                      <div className="details-field">
                        <span className="details-field__label">Contato de orçamento</span>
                        <div className="details-contact-placeholder">Sem contatos</div>
                      </div>
                    </Col>
                  </InfoGrid>
                </div>
              </div>
            </DetailsSection>
          </div>

          <div className="details-obra-row__files">
            <DetailsSection title="Arquivos da obra" className="details-section--card details-section--files">
              <p className="details-section__description">
                Documentos principais para conferência comercial, técnica e contratual.
              </p>
              <div className="details-attachments details-attachments--stacked">
                {FILE_ITEMS.map((item) => (
                  <AttachmentCard key={item.key} title={item.title} />
                ))}
              </div>
            </DetailsSection>
          </div>
        </div>

        <ConstructionProjectsSection details={details} />

        <div className="details-bottom-grid">
          <ConstructionDeliveriesSection details={details} />
          <ConstructionRecordsSection />
        </div>
      </div>
    </DetailsPage>
  );
};

export default ObraDetailsPage;

