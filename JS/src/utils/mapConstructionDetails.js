import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { toDisplayString } from '@/utils/constructionKanbanMapper';

dayjs.locale('pt-br');

const AIRTABLE_ID = /^rec[a-zA-Z0-9]+$/;

/**
 * @param {unknown} value
 * @param {number} [fallback=0]
 * @returns {number}
 */
export function safeNumber(value, fallback = 0) {
  if (value == null || value === '') return fallback;
  if (typeof value === 'object' && value !== null && 'specialValue' in value) {
    const sv = /** @type {{ specialValue?: string }} */ (value).specialValue;
    if (sv === 'NaN' || sv === 'Infinity' || sv === '-Infinity') return fallback;
    const parsed = Number(sv);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : fallback;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * @param {unknown} value
 * @returns {string | undefined} ISO-like string quando parseável
 */
export function safeDate(value) {
  if (value == null || value === '') return undefined;
  const s = typeof value === 'string' ? value : String(value);
  const d = dayjs(s);
  return d.isValid() ? d.toISOString() : undefined;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
export function formatDateLabel(value) {
  const iso = safeDate(value);
  if (!iso) return '-';
  return dayjs(iso).format('DD/MM/YYYY');
}

/**
 * @param {unknown} raw
 * @returns {string}
 */
function displayOrDash(raw) {
  const s = toDisplayString(raw).trim();
  return s || '-';
}

/**
 * @param {unknown} field
 * @returns {string[]}
 */
function stringArrayField(field) {
  if (!Array.isArray(field)) return [];
  return field.map((x) => toDisplayString(x).trim()).filter(Boolean);
}

/**
 * @param {Record<string, unknown>} raw
 * @returns {string}
 */
function mapCompanyDisplay(raw) {
  const v = raw['Empresa'];
  if (!Array.isArray(v) || v.length === 0) return '-';
  const parts = [];
  for (const item of v) {
    if (typeof item === 'string' && AIRTABLE_ID.test(item)) continue;
    const s = toDisplayString(item).trim();
    if (s && !AIRTABLE_ID.test(s)) parts.push(s);
  }
  return parts.length ? parts.join(', ') : '-';
}

/**
 * @typedef {Object} ConstructionDeadlines
 * @property {string} budget
 * @property {string} analysis
 * @property {string} follow
 * @property {string} feedback
 * @property {string} info
 * @property {string} att
 * @property {string} projOp
 */

/**
 * @typedef {Object} ConstructionDeliveries
 * @property {number} delivered
 * @property {number} remaining
 * @property {number} deliveredValue
 * @property {number} remainingValue
 */

/**
 * @typedef {Object} ConstructionProjectsSummary
 * @property {number} totalValue
 * @property {number} totalQty
 * @property {number} totalWeight
 */

/**
 * Modelo normalizado para a UI (sem chaves com acentos do payload bruto).
 *
 * @typedef {Object} ConstructionDetails
 * @property {string} id
 * @property {string} title
 * @property {string} businessStage
 * @property {number} quantity
 * @property {string[]} budgetType
 * @property {string} salesChannel
 * @property {string} installationTeam
 * @property {string} createdAtLabel
 * @property {string} cityDisplay
 * @property {string} stateDisplay
 * @property {string} companyDisplay
 * @property {string} productLabel
 * @property {ConstructionDeliveries} deliveries
 * @property {ConstructionDeadlines} deadlines
 * @property {ConstructionProjectsSummary} projectsSummary
 */

/**
 * @param {unknown} rawUnknown
 * @returns {ConstructionDetails}
 */
export function mapConstruction(rawUnknown) {
  const raw = /** @type {Record<string, unknown>} */ (
    rawUnknown && typeof rawUnknown === 'object' ? rawUnknown : {}
  );

  const id = toDisplayString(raw.id).trim() || '-';
  const title = displayOrDash(raw['Orçamentos']);

  const budgetArr = stringArrayField(raw['Tipo de orçamento']);
  const budgetType = budgetArr.length ? budgetArr : [];

  return {
    id,
    title,
    businessStage: displayOrDash(raw['Etapa do negócio']),
    quantity: safeNumber(raw['Quantidade'], 0),
    budgetType,
    salesChannel: displayOrDash(raw['Canal de vendas']),
    installationTeam: displayOrDash(raw['Equipe de instalação']),
    createdAtLabel: formatDateLabel(raw['Data de criação']),
    cityDisplay: displayOrDash(raw['Cidade da obra']),
    stateDisplay: displayOrDash(raw['Estado']),
    companyDisplay: mapCompanyDisplay(raw),
    productLabel: stringArrayField(raw['Produto']).join(', ') || '-',
    deliveries: {
      delivered: safeNumber(raw['Qtd entregue'], 0),
      remaining: safeNumber(raw['Qtde falta entregar'], 0),
      deliveredValue: safeNumber(raw['Valor entregue - soma'], 0),
      remainingValue: safeNumber(raw['Valor a entregar - soma'], 0)
    },
    deadlines: {
      budget: formatDateLabel(raw['Data prazo orçamento']),
      analysis: formatDateLabel(raw['Data prazo análise']),
      follow: formatDateLabel(raw['Data prazo follow']),
      feedback: formatDateLabel(raw['Data prazo feedback']),
      info: formatDateLabel(raw['Data prazo info']),
      att: formatDateLabel(raw['Data prazo att']),
      projOp: formatDateLabel(raw['Data prazo proj+op'])
    },
    projectsSummary: {
      totalValue: safeNumber(raw['Valor Total do Orçamento (Projetos)'], 0),
      totalQty: safeNumber(raw['Quantidade Total (Projetos)'], 0),
      totalWeight: safeNumber(raw['Peso Total (Projetos)'], 0)
    }
  };
}
