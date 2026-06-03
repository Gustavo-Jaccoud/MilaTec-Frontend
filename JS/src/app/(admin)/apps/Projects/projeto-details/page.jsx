import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/useAuthContext';
import { fetchProjectById } from '@/services/projectService';
import { mapProject } from '@/utils/mapProjectDetails';
import DetailsPage from '@/components/details/DetailsPage';
import DetailsHeader from '@/components/details/DetailsHeader';
import DetailsSection from '@/components/details/DetailsSection';
import InfoGrid from '@/components/details/InfoGrid';
import InfoField from '@/components/details/InfoField';
import AttachmentCard from '@/components/details/AttachmentCard';
import ProjectBudgetsSection from '@/components/projects/ProjectBudgetsSection';
import ProjectWorkRecordSection from '@/components/projects/ProjectWorkRecordSection';

const formatDate = (dateString) => {
  if (!dateString || dateString === '-') return '-';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return '-';
  }
};

const formatCurrency = (value) => {
  if (value === 0 || !value) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const HIGHLIGHT_FIELDS = [
  { label: 'Etapa do projeto', key: 'stage' },
  { label: 'Cidade', key: 'city' },
  { label: 'Quantidade', key: 'quantity', format: (v) => String(v) },
  { label: 'Valor total', key: 'totalValue', format: formatCurrency },
];

const INFO_GROUPS = [
  {
    title: 'Resumo do projeto',
    description: 'Dados que identificam o projeto e o escopo principal.',
    fields: [
      { label: 'Projeto', key: 'projectName' },
      { label: 'Produto', key: 'product' },
      { label: 'Tipo de projeto', key: 'projectType' },
    ],
  },
  {
    title: 'Comercial',
    description: 'Origem da oportunidade e contexto do negócio.',
    fields: [
      { label: 'Etapa do negócio', key: 'businessStage' },
      { label: 'Cidade da obra (orçamento)', key: 'city', asBadge: false },
      { label: 'Valor total do projeto', key: 'totalValue', format: formatCurrency },
    ],
  },
  {
    title: 'Produção',
    description: 'Métricas de fabricação e logística do projeto.',
    fields: [
      { label: 'Quantidade', key: 'quantity', format: (v) => String(v) },
      { label: 'Peso do projeto (kg)', key: 'weight', format: (v) => String(v) },
      { label: 'Maior peça', key: 'maxPiece', format: (v) => String(v) },
    ],
  },
  {
    title: 'Controle',
    description: 'Rastreabilidade de criação e alteração.',
    fields: [
      { label: 'Data de criação', key: 'createdAt', format: formatDate, asBadge: false },
      { label: 'Criado por', key: 'createdBy', asBadge: false },
      { label: 'Última alteração', key: 'lastModified', format: formatDate, asBadge: false },
    ],
  },
];

const DOC_ITEMS = [
  { key: 'preProject', title: 'Pré-Projeto' },
  { key: 'approvalProject', title: 'Projeto para aprovação' },
  { key: 'executiveProject', title: 'Projeto executivo' },
];

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!accessToken || !id) {
      setError(!accessToken ? 'Faça login para ver os detalhes do projeto.' : 'Projeto inválido.');
      setLoading(false);
      setDetails(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const raw = await fetchProjectById(accessToken, id);
      setDetails(mapProject(raw));
    } catch (e) {
      setDetails(null);
      setError(e instanceof Error ? e.message : 'Erro ao carregar o projeto');
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
        loadingMessage="Carregando detalhes do projeto…"
        authMessage="Faça login para ver os detalhes do projeto."
        errorMessage={error ?? 'Não foi possível carregar o projeto.'}
      />
    );
  }

  return (
    <DetailsPage
      loading={loading}
      error={error}
      onLoad={load}
      loadingMessage="Carregando detalhes do projeto…"
      authMessage="Faça login para ver os detalhes do projeto."
      errorMessage={error ?? 'Não foi possível carregar o projeto.'}
      className="details-print"
    >
      <DetailsHeader title={details.title} kicker="PROJETOS" subtitle="Acompanhe seus projetos!" />

      <div className="details-main details-main--cards">
        <div className="details-highlight-grid" aria-label="Resumo rápido do projeto">
          {HIGHLIGHT_FIELDS.map((field) => (
            <div className="details-highlight-card" key={field.key}>
              <span className="details-highlight-card__label">{field.label}</span>
              <span className="details-highlight-card__value">
                {field.format ? field.format(details[field.key]) : details[field.key]}
              </span>
            </div>
          ))}
        </div>

        <div className="details-content-row">
          <div className="details-content-row__main">
            <DetailsSection title="Informações do Projeto" className="details-section--card">
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
              </div>
            </DetailsSection>
          </div>

          <div className="details-content-row__side">
            <DetailsSection title="Documentação" className="details-section--card details-section--files">
              <p className="details-section__description">
                Anexos de pré-projeto, aprovação e executivo.
              </p>
              <div className="details-attachments details-attachments--stacked">
                {DOC_ITEMS.map((item) => (
                  <AttachmentCard key={item.key} title={item.title} />
                ))}
              </div>
            </DetailsSection>
          </div>
        </div>

        <div className="details-bottom-grid">
          <ProjectBudgetsSection details={details} />
          <ProjectWorkRecordSection details={details} />
        </div>
      </div>
    </DetailsPage>
  );
};

export default ProjectDetailsPage;
