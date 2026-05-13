# Tarefa 3.0: Implementar o funil de projetos baseado no Figma com dados reais da API

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>HIGH</complexity>
<priority>HIGH</priority>

Implementar a tela do funil de projetos conforme o Figma, substituindo dados mockados por dados reais da API. A entrega deve incluir agrupamento por etapa do negocio, filtro de etapa, estados de carregamento/vazio/erro e navegacao pelo side menu dentro da area protegida.

Esta tarefa deve seguir red-green-refactor para as funcoes de agrupamento e filtro do funil, porque elas concentram a regra de exibicao do negocio.

<requirements>
- Ler `prd.md`, `techspec.md` e conferir o Figma antes de implementar a UI.
- Reutilizar componentes e padroes visuais existentes do template.
- Consumir dados via camada criada na tarefa 2.0.
- Agrupar projetos por `businessStage`.
- Implementar filtro de etapa do negocio.
- Exibir informacoes essenciais de projeto e orcamento.
- Criar estados de loading, vazio e erro.
- Registrar rota protegida para o funil em `appRoutes`.
- Ajustar o side menu para apontar para a rota do funil/projetos.
- Garantir responsividade conforme Figma.
</requirements>

## Subtarefas

- [ ] 3.1 Ler `prd.md`, `techspec.md`, inspecionar tela atual de `Projects` e revisar o frame do Figma.
- [ ] 3.2 Criar testes para agrupamento por etapa e filtro por etapa do negocio.
- [ ] 3.3 Implementar helpers de agrupamento e calculos de totais por etapa quando necessarios ao Figma.
- [ ] 3.4 Refatorar a tela atual de projetos para buscar dados reais via `projectApi`.
- [ ] 3.5 Implementar layout do funil conforme Figma, incluindo cards, colunas, contadores e hierarquia visual.
- [ ] 3.6 Implementar filtro de etapa do negocio e estado vazio por filtro.
- [ ] 3.7 Implementar estados de loading e erro sem quebrar o layout.
- [ ] 3.8 Ajustar rota e side menu para a navegacao do funil/projetos.
- [ ] 3.9 Criar testes de componente para renderizacao com dados, filtro, loading, vazio e erro.
- [ ] 3.10 Validar visualmente em desktop e mobile com Playwright ou navegador local.

## Detalhes de Implementacao

Dependencias: depende da tarefa 2.0. Usa o contrato da tarefa 1.0.

Consulte em `techspec.md` as secoes "Frontend", "Tela", "Pontos de Integracao" e "Riscos Conhecidos". O side menu nao e uma tarefa separada; ele faz parte da entrega de navegacao desta tela.

## Criterios de Sucesso

- A tela segue o Figma no layout principal, estados e responsividade.
- A tela usa dados reais da API em vez de `projectData` mockado.
- Projetos aparecem agrupados por etapa do negocio.
- Filtro de etapa altera os projetos exibidos sem perder relacao com orcamento.
- O side menu permite acessar a rota do funil/projetos.
- Usuario sem token continua bloqueado pelo guard existente.
- Testes de helpers e componentes passam.

## Testes da Tarefa

- [ ] Testes de unidade: agrupamento por etapa, totais e filtro.
- [ ] Testes de componente: renderizacao com dados, loading, erro, vazio e filtro.
- [ ] Teste de navegacao: item de menu aponta para rota protegida correta.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `JS/src/app/(admin)/apps/Projects/page.jsx`
- `JS/src/app/(admin)/apps/Projects/components/Projects.jsx`
- `JS/src/app/(admin)/apps/Projects/data.js`
- `JS/src/assets/data/menu-items.js`
- `JS/src/routes/index.jsx`
- `JS/src/routes/router.jsx`
- `JS/src/routes/guards.jsx`
- `JS/src/services/projectApi.js`
- `tasks/prd-funil-projetos/prd.md`
- `tasks/prd-funil-projetos/techspec.md`
