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
import { Col, Row } from 'react-bootstrap';

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

  const FILE_ITEMS = [
    { key: 'proposal', title: 'Proposta comercial (anexo)' },
    { key: 'art', title: 'ART' },
    { key: 'memorial', title: 'Memorial de cálculo' },
    { key: 'contract', title: 'Contrato (anexo)' }
  ];

  const OBRA_INFO_FIELDS = [
    { label: 'Cidade da obra', key: 'cityDisplay' },
    { label: 'Quantidade', key: 'quantity', format: (v) => String(v) },
    { label: 'Empresa', key: 'companyDisplay' },
    { label: 'Tipo de orçamento', key: 'budgetType', format: (v) => v && v.length ? v.join(', ') : '-' },
    { label: 'Etapa', key: 'businessStage' },
    { label: 'Estado', key: 'stateDisplay', asBadge: false },
    { label: 'Data de criação', key: 'createdAtLabel' },
    { label: 'Canal de vendas', key: 'salesChannel' },
    { label: 'Equipe de instalação', key: 'installationTeam' },
    { label: 'Produto', key: 'productLabel' },
  ];

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

      <div className="details-main">
        <div className="details-obra-row">
          <div className="details-obra-row__info">
            <DetailsSection title="Obra">
              <InfoGrid>
                {OBRA_INFO_FIELDS.map((field) => (
                  <InfoField
                    key={field.key}
                    label={field.label}
                    value={field.format ? field.format(details[field.key]) : details[field.key]}
                    asBadge={field.asBadge !== false}
                  />
                ))}
                <Col xs={12}>
                  <div className="details-field">
                    <span className="details-field__label">Contato de orçamento</span>
                    <div className="details-contact-placeholder">Sem contatos</div>
                  </div>
                </Col>
              </InfoGrid>
            </DetailsSection>
          </div>

          <div className="details-obra-row__files">
            <DetailsSection title="Arquivos" className="details-section--files">
              <div className="details-attachments">
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

