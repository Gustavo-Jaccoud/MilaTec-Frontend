import { useCallback, useEffect, useState } from 'react';

import { Alert, Spinner } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

import { useAuth } from '@/context/useAuthContext';

import { fetchProjectById } from '@/services/projectService';

import { mapProject } from '@/utils/mapProjectDetails';

import ProjectDetailsHeader from '@/components/projects/ProjectDetailsHeader';

import ProjectInfoSection from '@/components/projects/ProjectInfoSection';

import ProjectDocumentationSection from '@/components/projects/ProjectDocumentationSection';

import ProjectBudgetsSection from '@/components/projects/ProjectBudgetsSection';

import ProjectWorkRecordSection from '@/components/projects/ProjectWorkRecordSection';



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



  if (!accessToken) {

    return (

      <div className="project-details-page">

        <Alert variant="warning" className="mt-2">

          Faça login para ver os detalhes do projeto.

        </Alert>

      </div>

    );

  }



  if (loading) {

    return (

      <div className="project-details-page text-center py-5">

        <Spinner animation="border" role="status" variant="primary">

          <span className="visually-hidden">Carregando…</span>

        </Spinner>

        <p className="mt-3 text-muted mb-0">Carregando detalhes do projeto…</p>

      </div>

    );

  }



  if (error || !details) {

    return (

      <div className="project-details-page">

        <Alert variant="danger" className="mt-2">

          {error ?? 'Não foi possível carregar o projeto.'}

        </Alert>

      </div>

    );

  }



  return (

    <div className="project-details-page project-details-print">

      <ProjectDetailsHeader title={details.title} />



      <div className="project-details-main">

        <ProjectInfoSection details={details} />

        <ProjectDocumentationSection details={details} />

        <ProjectBudgetsSection details={details} />

        <ProjectWorkRecordSection details={details} />

      </div>

    </div>

  );

};



export default ProjectDetailsPage;
