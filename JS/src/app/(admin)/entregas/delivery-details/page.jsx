import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/useAuthContext';
import { fetchDeliveryById } from '@/services/deliveryService';
import DetailsPage from '@/components/details/DetailsPage';
import DetailsHeader from '@/components/details/DetailsHeader';
import DetailsSection from '@/components/details/DetailsSection';
import InfoGrid from '@/components/details/InfoGrid';
import InfoField from '@/components/details/InfoField';

const DeliveryDetailsPage = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!accessToken || !id) {
      setError(!accessToken ? 'Faça login para ver os detalhes da entrega.' : 'Entrega inválida.');
      setLoading(false);
      setDetails(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDeliveryById(accessToken, id);
      setDetails(data);
    } catch (e) {
      setDetails(null);
      setError(e instanceof Error ? e.message : 'Erro ao carregar a entrega');
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

  const DELIVERY_INFO_FIELDS = [
    { label: 'Entrega', key: 'Entregas' },
    { label: 'Data de entrega', key: 'Data de entrega', format: formatDate },
    { label: 'Pedido produzido', key: 'Pedido produzido', format: (v) => (v ? 'Sim' : 'Não') },
    { label: 'Cidade da obra', key: 'Cidade da obra (from Orçamentos)' },
  ];

  if (!details) {
    return (
      <DetailsPage
        loading={loading}
        error={error}
        onLoad={load}
        loadingMessage="Carregando detalhes da entrega…"
        authMessage="Faça login para ver os detalhes da entrega."
        errorMessage={error ?? 'Não foi possível carregar a entrega.'}
      />
    );
  }

  return (
    <DetailsPage
      loading={loading}
      error={error}
      onLoad={load}
      loadingMessage="Carregando detalhes da entrega…"
      authMessage="Faça login para ver os detalhes da entrega."
      errorMessage={error ?? 'Não foi possível carregar a entrega.'}
      className="details-print"
    >
      <DetailsHeader title={details['Entregas'] || 'Entrega'} kicker="ENTREGAS" subtitle="Acompanhe suas entregas!" />

      <div className="details-main">
        <DetailsSection title="Informações da Entrega">
          <InfoGrid>
            {DELIVERY_INFO_FIELDS.map((field) => (
              <InfoField
                key={field.key}
                label={field.label}
                value={field.format ? field.format(details[field.key]) : details[field.key]}
              />
            ))}
          </InfoGrid>
        </DetailsSection>
      </div>
    </DetailsPage>
  );
};

export default DeliveryDetailsPage;
