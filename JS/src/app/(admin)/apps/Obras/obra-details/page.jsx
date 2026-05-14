import { useCallback, useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/useAuthContext';
import { fetchConstructionById } from '@/services/constructionService';
import { mapConstruction } from '@/utils/mapConstructionDetails';
import ConstructionDetailsHeader from '@/components/obras/ConstructionDetailsHeader';
import ConstructionInfoSection from '@/components/obras/ConstructionInfoSection';
import ConstructionFilesSection from '@/components/obras/ConstructionFilesSection';
import ConstructionProjectsSection from '@/components/obras/ConstructionProjectsSection';
import ConstructionDeliveriesSection from '@/components/obras/ConstructionDeliveriesSection';
import ConstructionRecordsSection from '@/components/obras/ConstructionRecordsSection';

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

  if (!accessToken) {
    return (
      <div className="obra-details-page">
        <Alert variant="warning" className="mt-2">
          Faça login para ver os detalhes da obra.
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="obra-details-page text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Carregando…</span>
        </Spinner>
        <p className="mt-3 text-muted mb-0">Carregando detalhes da obra…</p>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="obra-details-page">
        <Alert variant="danger" className="mt-2">
          {error ?? 'Não foi possível carregar a obra.'}
        </Alert>
      </div>
    );
  }

  return (
    <div className="obra-details-page obra-details-print">
      <ConstructionDetailsHeader title={details.title} />

      <div className="obra-details-main">
        <div className="obra-details-obra-row">
          <div className="obra-details-obra-row__info">
            <ConstructionInfoSection details={details} />
          </div>
          <div className="obra-details-obra-row__files">
            <ConstructionFilesSection />
          </div>
        </div>

        <ConstructionProjectsSection details={details} />

        <div className="obra-details-bottom-grid">
          <ConstructionDeliveriesSection details={details} />
          <ConstructionRecordsSection />
        </div>
      </div>
    </div>
  );
};

export default ObraDetailsPage;
