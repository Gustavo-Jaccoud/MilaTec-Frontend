import { Link } from 'react-router-dom';
import { useAuth } from '@/context/useAuthContext';
import { fetchConstructions } from '@/services/constructionService';
import { mapConstructionsToKanban } from '@/utils/constructionKanbanMapper';
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import { useEffect, useMemo, useRef, useState } from 'react';
import ConstructionCard from '@/components/kanban/ConstructionCard';
import FunnelTable from '@/components/funnel/FunnelTable';
import ViewModeToggle from '@/components/funnel/ViewModeToggle';

const Obras = () => {
  const { accessToken } = useAuth();
  const [sections, setSections] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState('kanban');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasLoadedRef = useRef(false);

  const loadObras = async () => {
    if (!accessToken) {
      setError('Faça login para carregar o funil de obras.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const list = await fetchConstructions(accessToken);
      const arr = Array.isArray(list) ? list : [];
      const mapped = mapConstructionsToKanban(arr);
      setSections(mapped.sections);
      setTasks(mapped.tasks);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar obras');
      setSections([]);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadObras();
    }
  }, [accessToken]);

  const tableRows = useMemo(() => {
    const sectionTitleById = new Map(sections.map((section) => [section.id, section.title]));

    return tasks.map((task) => ({
      ...task,
      stage: sectionTitleById.get(task.sectionId) ?? 'Sem etapa',
      detailsPath: `/obras/${encodeURIComponent(task.id)}`
    }));
  }, [sections, tasks]);

  if (!accessToken) {
    return (
      <Alert variant="warning" className="mt-3">
        Faça login para carregar o funil de obras.
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Carregando…</span>
        </Spinner>
        <p className="mt-3 text-muted mb-0">Carregando obras…</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        <div className="mb-2">{error}</div>
        <Button variant="outline-danger" size="sm" type="button" onClick={loadObras}>
          Tentar novamente
        </Button>
      </Alert>
    );
  }

  const columnBody = (section) => (
    <>
      <div className="project-stage-header">
        <span
          className={`project-stage-pill ${
            section.color === 'success' ? 'project-stage-pill-success' : 'project-stage-pill-default'
          }`}
        >
          {section.title}
        </span>
      </div>

      <div className="tasklist project-stage-tasklist" id={section.id}>
        {tasks
          .filter((task) => task.sectionId === section.id)
          .map((task) => (
            <Card key={task.id} className="mb-2 obra-funnel-card">
              <Link
                to={`/obras/${encodeURIComponent(task.id)}`}
                className="text-decoration-none text-reset d-block obra-funnel-card-link"
              >
                <ConstructionCard task={task} />
              </Link>
            </Card>
          ))}
      </div>
    </>
  );

  return (
    <div className="project-funnel-page">
      <div className="project-funnel-toolbar">
        <ViewModeToggle value={viewMode} onChange={setViewMode} />
      </div>

      {viewMode === 'kanban' ? (
        <div className="kanban-board project-funnel-board">
          {sections.map((section) => (
            <div key={section.id} className="kanban-board-item project-stage-column">
              {columnBody(section)}
            </div>
          ))}
        </div>
      ) : (
        <Card className="mb-0">
          <Card.Body>
            <FunnelTable type="constructions" rows={tableRows} />
          </Card.Body>
        </Card>
      )}

      {!loading && sections.length === 0 && (
        <p className="text-muted mt-3 mb-0">Nenhuma obra encontrada.</p>
      )}
    </div>
  );
};

export default Obras;
