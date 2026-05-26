import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/useAuthContext';
import { fetchDeliveryById } from '@/services/deliveryService';
import DetailsPage from '@/components/details/DetailsPage';
import DetailsHeader from '@/components/details/DetailsHeader';
import DetailsSection from '@/components/details/DetailsSection';
import InfoGrid from '@/components/details/InfoGrid';
import InfoField from '@/components/details/InfoField';

const isBlank = (value) => value === null || value === undefined || value === '';

const formatText = (value) => {
  if (Array.isArray(value)) {
    return value.length ? value.map(formatText).join(', ') : '-';
  }

  if (isBlank(value)) return '-';

  return String(value);
};

const formatUser = (value) => {
  if (isBlank(value)) return '-';
  if (typeof value !== 'object') return formatText(value);

  const name = value.name || value.email || value.id;
  const email = value.email && value.email !== name ? ` (${value.email})` : '';

  return name ? `${name}${email}` : '-';
};

const formatDate = (value) => {
  if (isBlank(value)) return '-';

  try {
    const textValue = String(value);
    const dateOnlyMatch = textValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const date = dateOnlyMatch
      ? new Date(Number(dateOnlyMatch[1]), Number(dateOnlyMatch[2]) - 1, Number(dateOnlyMatch[3]))
      : new Date(textValue);

    if (Number.isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('pt-BR');
  } catch {
    return '-';
  }
};

const formatDateTime = (value) => {
  if (isBlank(value)) return '-';

  try {
    const date = new Date(String(value));
    if (Number.isNaN(date.getTime())) return '-';

    return date.toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  } catch {
    return '-';
  }
};

const formatNumber = (value, suffix = '') => {
  if (isBlank(value)) return '-';

  const number = Number(value);
  if (Number.isNaN(number)) return formatText(value);

  const formattedNumber = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
  }).format(number);

  return suffix ? `${formattedNumber} ${suffix}` : formattedNumber;
};

const formatBoolean = (value) => {
  if (isBlank(value)) return '-';

  return value ? 'Sim' : 'Não';
};

const getSafeExternalLink = (value) => {
  try {
    const url = new URL(String(value));

    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
};

const formatLinks = (value) => {
  const links = Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);

  if (!links.length) return '-';

  return (
    <>
      {links.map((link, index) => {
        const safeLink = getSafeExternalLink(link);

        return (
          <span className="details-status-badge details-status-badge--link" key={`${link}-${index}`}>
            {safeLink ? (
              <a href={safeLink} target="_blank" rel="noreferrer">
                {links.length > 1 ? `Abrir endereço ${index + 1}` : 'Abrir endereço'}
              </a>
            ) : (
              formatText(link)
            )}
            {index < links.length - 1 ? ', ' : ''}
          </span>
        );
      })}
    </>
  );
};

const DELIVERY_SECTIONS = [
  {
    title: 'Informações da Entrega',
    fields: [
      { label: 'Entrega', key: 'Entregas' },
      { label: 'Etapa da entrega', key: 'Etapa da entrega', asBadge: true },
      { label: 'Data de entrega', key: 'Data de entrega', format: formatDate },
      { label: 'Pedido produzido', key: 'Pedido produzido', format: formatBoolean },
      { label: 'Transporte', key: 'Transporte' },
    ],
  },
  {
    title: 'Pedido e Logística',
    fields: [
      { label: 'Pedido Compusa Mila', key: 'Pedido Compusa Mila' },
      { label: 'Pedido Compusa Milatec', key: 'Pedido Compusa Milatec' },
      { label: 'Quantidade', key: 'Quantidade', format: (value) => formatNumber(value) },
      { label: 'Peso do pedido', key: 'Peso do pedido (kg)', format: (value) => formatNumber(value, 'kg') },
      { label: 'Maior peça', key: 'Maior peça (mm)', format: (value) => formatNumber(value, 'mm') },
      { label: 'Cidade da obra', key: 'Cidade da obra' },
      { label: 'Cidade da obra (orçamento)', key: 'Cidade da obra (from Orçamentos)' },
    ],
  },
  {
    title: 'Orçamento e Empresa',
    fields: [
      { label: 'Tipo de orçamento', key: 'Tipo de orçamento (from Orçamentos)', format: formatText },
      { label: 'Orçamentos', key: 'Orçamentos', format: formatText },
      { label: 'Orçamento ID', key: 'OrcamentoId', format: formatText },
      { label: 'Empresa ID', key: 'EmpresaId', format: formatText },
      { label: 'Empresa (orçamento)', key: 'Empresa (from Orçamentos)', format: formatText },
      {
        label: 'Endereço de entrega',
        key: 'Endereço de entrega (from Orçamentos)',
        format: formatLinks,
        colProps: { xs: 12 },
      },
    ],
  },
  {
    title: 'Controle',
    fields: [
      { label: 'ID interno', key: 'ID', format: (value) => formatNumber(value) },
      { label: 'Record ID', key: 'id' },
      { label: 'Entrega ID', key: 'EntragaId' },
      { label: 'Horário de criação', key: 'Horário de criação', format: formatDateTime },
      { label: 'Última modificação', key: 'Última modificação', format: formatDateTime },
      { label: 'Criado por', key: 'Criado por', format: formatUser },
      { label: 'Alterado por último', key: 'Alterado por último', format: formatUser },
    ],
  },
];

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

  const getFieldValue = (field) => {
    const value = details[field.key];

    return field.format ? field.format(value) : formatText(value);
  };

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
        {DELIVERY_SECTIONS.map((section) => (
          <DetailsSection key={section.title} title={section.title}>
            <InfoGrid>
              {section.fields.map((field) => (
                <InfoField
                  key={field.key}
                  label={field.label}
                  value={getFieldValue(field)}
                  asBadge={field.asBadge !== false}
                  colProps={field.colProps}
                />
              ))}
            </InfoGrid>
          </DetailsSection>
        ))}
      </div>
    </DetailsPage>
  );
};

export default DeliveryDetailsPage;
