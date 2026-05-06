import dayjs from 'dayjs';

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

function formatCreatedAt(record) {
  const keys = ['Created', 'Created at', 'Criado em', 'Data de criação'];
  for (const k of keys) {
    if (record[k] != null && record[k] !== '') {
      const d = dayjs(record[k]);
      if (d.isValid()) return d.format('DD/MM/YYYY');
    }
  }
  return '—';
}

/**
 * @param {Array<{ id: string } & Record<string, unknown>>} projects
 * @returns {{ sections: Array<{ id: string, title: string, color: string }>, tasks: Array<{ id: string, sectionId: string, title: string, budgetName: string, budgetType: string, category: string, createdAt: string }> }}
 */
export function mapProjectsToKanban(projects) {
  if (!Array.isArray(projects) || projects.length === 0) {
    return { sections: [], tasks: [] };
  }

  const etapaLabels = projects.map((p) => {
    const s = toDisplayString(p[CAMPO_ETAPA]).trim();
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

  const tasks = projects.map((p) => {
    const etapaStr = toDisplayString(p[CAMPO_ETAPA]).trim();
    const sectionTitle = etapaStr || 'Sem etapa';
    const sectionId = titleToId.get(sectionTitle) ?? sections[0]?.id ?? 'stage-0';

    return {
      id: p.id,
      sectionId,
      title: toDisplayString(p.Projeto) || p.id,
      budgetName: toDisplayString(p.Orçamentos) || '—',
      budgetType: toDisplayString(p['Tipo de orçamento']) || '—',
      category: toDisplayString(p['Cidade da obra']) || '—',
      createdAt: formatCreatedAt(p)
    };
  });

  return { sections, tasks };
}
