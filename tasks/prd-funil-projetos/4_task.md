# Tarefa 4.0: Testar retorno de dados, protecao de rota e filtro etapa-orcamento ponta a ponta

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>HIGH</complexity>
<priority>HIGH</priority>

Validar a funcionalidade completa do funil de projetos, cobrindo backend, frontend e fluxo integrado. A tarefa deve provar que a API retorna os dados corretos, a rota esta protegida e o filtro de etapa do negocio respeita a relacao com o orcamento.

<requirements>
- Ler `prd.md`, `techspec.md` e os artefatos das tarefas 1.0, 2.0 e 3.0.
- Executar testes backend relacionados a projetos e auth guard.
- Executar testes frontend relacionados a servico, rota, menu e funil.
- Validar 401 sem token para API e rota frontend.
- Validar retorno de dados com token valido.
- Validar filtro por etapa do negocio relacionado a `OrcamentoId`.
- Executar build ou comando equivalente do frontend.
- Registrar evidencias de teste e qualquer limitacao ambiental.
</requirements>

## Subtarefas

- [ ] 4.1 Ler `prd.md`, `techspec.md` e revisar criterios de sucesso das tarefas anteriores.
- [ ] 4.2 Executar testes unitarios e de integracao do backend para `ProjectController` e `ProjectService`.
- [ ] 4.3 Executar teste direto da API para confirmar 401 em `/project` sem token.
- [ ] 4.4 Executar teste direto da API com token valido ou mock para confirmar payload e filtro por etapa.
- [ ] 4.5 Executar testes frontend de `projectApi`, mappers, guards, menu e componentes do funil.
- [ ] 4.6 Executar validacao visual com Playwright para rota sem token, rota autenticada, filtro e responsividade.
- [ ] 4.7 Executar build do frontend e, se aplicavel, build/test do backend.
- [ ] 4.8 Documentar resultados, comandos executados e qualquer bloqueio por ambiente externo.

## Detalhes de Implementacao

Dependencias: depende das tarefas 1.0, 2.0 e 3.0.

Consulte em `techspec.md` as secoes "Abordagem de Testes", "Testes E2E/Manual Assistido" e "Riscos Conhecidos".

## Criterios de Sucesso

- API protegida retorna 401 sem token.
- API autenticada retorna projetos com campos do funil.
- Filtro de etapa retorna somente projetos da etapa solicitada e com `OrcamentoId` consistente.
- Rota frontend do funil redireciona para login sem token.
- Rota frontend autenticada renderiza dados reais ou mocks integrados equivalentes.
- Side menu navega corretamente para o funil/projetos.
- Build e testes relevantes passam ou possuem bloqueio documentado.

## Testes da Tarefa

- [ ] Testes de unidade: backend service/controller e frontend service/helpers.
- [ ] Testes de integracao: API protegida, filtro por etapa e route guard.
- [ ] Testes E2E/manual assistido: navegacao pelo menu, carregamento do funil e aplicacao do filtro.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `../milatec-backend/src/project/project.controller.ts`
- `../milatec-backend/src/project/project.service.ts`
- `../milatec-backend/test/app.e2e-spec.ts`
- `JS/src/services/projectApi.js`
- `JS/src/routes/guards.jsx`
- `JS/src/routes/guards.test.jsx`
- `JS/src/assets/data/menu-items.js`
- `JS/src/app/(admin)/apps/Projects/page.jsx`
- `tasks/prd-funil-projetos/prd.md`
- `tasks/prd-funil-projetos/techspec.md`
