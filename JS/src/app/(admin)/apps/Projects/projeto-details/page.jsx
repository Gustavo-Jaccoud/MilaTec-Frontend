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
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Col, Row } from 'react-bootstrap';

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
      currency: 'BRL'
    }).format(value);
  };

  const PROJECT_INFO_FIELDS = [
    { label: 'Projeto', key: 'projectName' },
    { label: 'Produto', key: 'product' },
    { label: 'Tipo de Projeto', key: 'projectType' },
    { label: 'Cidade da obra (orçamento)', key: 'city' },
    { label: 'Etapa do Projeto', key: 'stage' },
    { label: 'Etapa do Negócio', key: 'businessStage' },
    { label: 'Quantidade', key: 'quantity', format: (v) => String(v) },
    { label: 'Peso do projeto (kg)', key: 'weight', format: (v) => String(v) },
    { label: 'Maior peça', key: 'maxPiece', format: (v) => String(v) },
    { label: 'Valor Total do Projeto', key: 'totalValue', format: formatCurrency },
    { label: 'Data de criação', key: 'createdAt', format: formatDate },
    { label: 'Criado por', key: 'createdBy' },
    { label: 'Última alteração', key: 'lastModified', format: formatDate },
  ];

  const DOCUMENTATION_SECTIONS = [
    { title: 'Pré-Projeto' },
    { title: 'Projeto para aprovação' },
    { title: 'Projeto executivo' },
  ];

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

      <div className="details-main">
        <DetailsSection title="Informações do Projeto">
          <InfoGrid>
            {PROJECT_INFO_FIELDS.map((field) => (
              <InfoField
                key={field.key}
                label={field.label}
                value={field.format ? field.format(details[field.key]) : details[field.key]}
              />
            ))}
          </InfoGrid>
        </DetailsSection>

        <DetailsSection title="Documentação">
          <Row className="g-3">
            {DOCUMENTATION_SECTIONS.map((section, index) => (
              <Col xs={12} md={4} key={index}>
                <div className="details-doc-subsection">
                  <h3 className="details-doc-subsection__title">{section.title}</h3>
                  <div className="details-doc-subsection__content">
                    <div className="details-placeholder">
                      <IconifyIcon icon="tabler:file-off" className="details-placeholder__icon" />
                      <span className="details-placeholder__text">Sem anexos</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </DetailsSection>

        <ProjectBudgetsSection details={details} />
        <ProjectWorkRecordSection details={details} />
      </div>
    </DetailsPage>
  );
};

export default ProjectDetailsPage;
