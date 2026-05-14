const CAMPO_ETAPA = 'Etapa do negócio';

/**
 * @param {unknown} value
 * @returns {string}
 */
export function toDisplayString(value) {
  if (value == null || value === '') return '';
  if (Array.isArray(value)) {
    return value
      .map((v) => toDisplayString(v))
      .filter(Boolean)
      .join(', ');
  }
  if (typeof value === 'object') {
    const o = value;
    if (o?.name != null) return toDisplayString(o.name);
    if (o?.url != null) return toDisplayString(o.url);
    return '';
  }
  return String(value);
}

/**
 * @param {Array<{ id: string } & Record<string, unknown>>} constructions
 * @returns {{ sections: Array<{ id: string, title: string, color: string }>, tasks: Array<{ id: string, sectionId: string, title: string, budgetName: string, city: string, type: string }> }}
 */
export function mapConstructionsToKanban(constructions) {
  if (!Array.isArray(constructions) || constructions.length === 0) {
    return { sections: [], tasks: [] };
  }

  const etapaLabels = constructions.map((c) => {
    const s = toDisplayString(c[CAMPO_ETAPA]).trim();
    return s || null;
  });

  const uniqueEtapas = [...new Set(etapaLabels.filter(Boolean))];
  uniqueEtapas.sort((a, b) => a.localeCompare(b, 'pt-BR'));

  const hasSemEtapa = etapaLabels.some((e) => e == null);

  const sections = uniqueEtapas.map((title, idx) => ({
    id: `stage-${idx}`,
    title,
    color: idx % 2 === 0 ? 'success' : 'default'
  }));

  if (hasSemEtapa) {
    sections.push({
      id: `stage-${sections.length}`,
      title: 'Sem etapa',
      color: 'default'
    });
  }

  const titleToId = new Map(sections.map((s) => [s.title, s.id]));

  const tasks = constructions.map((c) => {
    const etapaStr = toDisplayString(c[CAMPO_ETAPA]).trim();
    const sectionTitle = etapaStr || 'Sem etapa';
    const sectionId = titleToId.get(sectionTitle) ?? sections[0]?.id ?? 'stage-0';

    return {
      id: c.id,
      sectionId,
      title: toDisplayString(c['Orçamentos']) || c.id,
      budgetName: toDisplayString(c['Orçamentos']) || '—',
      city: toDisplayString(c['Cidade da obra']) || '—',
      type: toDisplayString(c['Tipo de orçamento']) || '—'
    };
  });

  return { sections, tasks };
}
