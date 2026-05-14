/**
 * @param {number} value
 * @returns {string}
 */
export function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    Number.isFinite(value) ? value : 0
  );
}

/**
 * @param {number} value
 * @param {number} [fractionDigits=2]
 * @returns {string}
 */
export function formatKg(value, fractionDigits = 2) {
  if (!Number.isFinite(value)) return '-';
  return `${value.toLocaleString('pt-BR', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  })} kg`;
}
