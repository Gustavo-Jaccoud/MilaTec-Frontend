/**
 * Maps raw project API response to a normalized structure
 * @param {object} raw - Raw API response
 * @returns {object} Normalized project details
 */
export function mapProject(raw) {
  const data = raw.data || raw;

  return {
    id: data.id,
    title: data['Projeto ID'] || data.Projeto || 'Projeto sem nome',
    projectName: data.Projeto || '-',
    productId: data.ID || '-',
    product: data['Projeto (from Orçamentos)'] ? data['Projeto (from Orçamentos)'][0] : (data.OrcamentoNome ? data.OrcamentoNome[0] : '-'),
    projectType: data['Tipo de orçamento'] ? data['Tipo de orçamento'][0] : data['Tipo de orçamento'] || '-',
    city: data['Cidade da obra'] ? data['Cidade da obra'][0] : '-',
    stage: data['Etapa do Projeto'] || '-',
    businessStage: data['Etapa do negócio'] ? data['Etapa do negócio'][0] : '-',
    quantity: data.Peso ? data.Peso[0] : data['Peso Total'] || 0,
    totalValue: data['Valor total (Projeto)'] || 0,
    weight: data['Peso do projeto (kg)'] || 0,
    maxPiece: data['Maior peça'] || 0,
    createdAt: data['Data de criação'] || '-',
    lastModified: data['Horário da última alteração'] || '-',
    createdBy: data['Criado por'] ? data['Criado por'].name : '-',
    budgets: data.Orçamentos || [],
    budgetNames: data.OrcamentoNome || [],
    deliveries: data.Entregas || [],
    // Deadline fields
    deadlineRevision02: data['Data prazo revisão 02'] || '-',
    deadlinePilotAdjustment: data['Data prazo ajuste de piloto'] || '-',
    deadlineExecutiveProject: data['Data prazo projeto executivo'] || '-',
    deadlineFollow: data['Data prazo follow'] || '-',
    deadlineApprovalProject: data['Data prazo projeto para aprovação'] || '-',
    deadlineBusinessClosing: data['Data prazo fechamento de negóco'] || '-',
    deadlineAnalysis: data['Data prazo análise'] || '-',
    deadlineBudget: data['Data prazo orçamento'] || '-',
    deadlineRevision01: data['Data prazo revisão 01'] || '-',
    deadlineProjectOp: data['Data prazo proj + op'] || '-',
    deadlineInfo: data['Data prazo info'] || '-',
    deadlineUpdate: data['Data prazo att'] || '-',
    deadlineFeedback: data['Data prazo feedback'] || '-',
    deadlineRevision03: data['Data prazo revisão 03'] || '-',
    deadlineProductionOrder: data['Data prazo ordem de produção'] || '-',
    deadlineSendAssemblers: data['Data prazo envio montadores'] || '-',
  };
}
