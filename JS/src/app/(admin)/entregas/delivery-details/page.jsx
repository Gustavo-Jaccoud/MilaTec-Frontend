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

const HIGHLIGHT_FIELDS = [
  { label: 'Etapa da entrega', key: 'Etapa da entrega' },
  { label: 'Data de entrega', key: 'Data de entrega', format: formatDate },
  { label: 'Transporte', key: 'Transporte' },
  { label: 'Cidade da obra', key: 'Cidade da obra' },
];

const INFO_GROUPS = [
  {
    title: 'Informações da Entrega',
    description: 'Dados principais que identificam a entrega.',
    fields: [
      { label: 'Entrega', key: 'Entregas' },
      { label: 'Etapa da entrega', key: 'Etapa da entrega', asBadge: true },
      { label: 'Data de entrega', key: 'Data de entrega', format: formatDate, asBadge: false },
      { label: 'Pedido produzido', key: 'Pedido produzido', format: formatBoolean, asBadge: false },
      { label: 'Transporte', key: 'Transporte' },
    ],
  },
  {
    title: 'Pedido e Logística',
    description: 'Quantidades, pesos e localização da entrega.',
    fields: [
      { label: 'Pedido Compusa Mila', key: 'Pedido Compusa Mila', asBadge: false },
      { label: 'Pedido Compusa Milatec', key: 'Pedido Compusa Milatec', asBadge: false },
      { label: 'Quantidade', key: 'Quantidade', format: (value) => formatNumber(value), asBadge: false },
      { label: 'Peso do pedido', key: 'Peso do pedido (kg)', format: (value) => formatNumber(value, 'kg'), asBadge: false },
      { label: 'Maior peça', key: 'Maior peça (mm)', format: (value) => formatNumber(value, 'mm'), asBadge: false },
      { label: 'Cidade da obra', key: 'Cidade da obra', asBadge: false },
      { label: 'Cidade da obra (orçamento)', key: 'Cidade da obra (from Orçamentos)', asBadge: false },
    ],
  },
  {
    title: 'Orçamento e Empresa',
    description: 'Vínculos com orçamento, empresa e endereço de entrega.',
    wide: true,
    fields: [
      { label: 'Tipo de orçamento', key: 'Tipo de orçamento (from Orçamentos)', format: formatText, asBadge: false },
      { label: 'Orçamentos', key: 'Orçamentos', format: formatText, asBadge: false },
      { label: 'Orçamento ID', key: 'OrcamentoId', format: formatText, asBadge: false },
      { label: 'Empresa ID', key: 'EmpresaId', format: formatText, asBadge: false },
      { label: 'Empresa (orçamento)', key: 'Empresa (from Orçamentos)', format: formatText, asBadge: false },
      {
        label: 'Endereço de entrega',
        key: 'Endereço de entrega (from Orçamentos)',
        format: formatLinks,
        asBadge: false,
        colProps: { xs: 12 },
      },
    ],
  },
  {
    title: 'Controle',
    description: 'Rastreabilidade de criação e alteração do registro.',
    wide: true,
    fields: [
      { label: 'ID interno', key: 'ID', format: (value) => formatNumber(value), asBadge: false },
      { label: 'Record ID', key: 'id', asBadge: false },
      { label: 'Entrega ID', key: 'EntragaId', asBadge: false },
      { label: 'Horário de criação', key: 'Horário de criação', format: formatDateTime, asBadge: false },
      { label: 'Última modificação', key: 'Última modificação', format: formatDateTime, asBadge: false },
      { label: 'Criado por', key: 'Criado por', format: formatUser, asBadge: false },
      { label: 'Alterado por último', key: 'Alterado por último', format: formatUser, asBadge: false },
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

      <div className="details-main details-main--cards">
        <div className="details-highlight-grid" aria-label="Resumo rápido da entrega">
          {HIGHLIGHT_FIELDS.map((field) => (
            <div className="details-highlight-card" key={field.key}>
              <span className="details-highlight-card__label">{field.label}</span>
              <span className="details-highlight-card__value">
                {getFieldValue(field)}
              </span>
            </div>
          ))}
        </div>

        <DetailsSection title="Informações da Entrega" className="details-section--card">
          <div className="details-info-groups">
            {INFO_GROUPS.map((group) => (
              <div
                className={`details-info-group${group.wide ? ' details-info-group--wide' : ''}`}
                key={group.title}
              >
                <div className="details-info-group__header">
                  <h3 className="details-info-group__title">{group.title}</h3>
                  <p className="details-info-group__description">{group.description}</p>
                </div>
                <InfoGrid gap="g-3">
                  {group.fields.map((field) => (
                    <InfoField
                      key={field.key}
                      label={field.label}
                      value={getFieldValue(field)}
                      asBadge={field.asBadge !== false}
                      colProps={field.colProps ?? { xs: 12, md: group.fields.length > 1 ? 6 : 12 }}
                    />
                  ))}
                </InfoGrid>
              </div>
            ))}
          </div>
        </DetailsSection>
      </div>
    </DetailsPage>
  );
};

export default DeliveryDetailsPage;
