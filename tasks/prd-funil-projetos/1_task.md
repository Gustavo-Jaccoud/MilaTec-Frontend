# Tarefa 1.0: Validar contrato da API de projetos e filtro por etapa do negocio vinculada ao orcamento

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>HIGH</complexity>
<priority>HIGH</priority>

Ajustar e validar a API backend de projetos para entregar os campos necessarios ao funil, preservando autenticacao, roles e filtro por empresa. A tarefa tambem deve permitir filtrar projetos por etapa do negocio relacionada ao orcamento, sem quebrar os endpoints existentes.

Esta tarefa deve seguir red-green-refactor para as regras de filtro em `ProjectService`, porque combina regra de negocio, seguranca por tenant e contrato consumido pelo frontend.

<requirements>
- Ler `prd.md`, `techspec.md` e a documentacao de codebase do backend.
- Validar campos retornados por `GET /project` para o funil.
- Incluir `Projeto`, `ProjetoId`, `Etapa do Projeto`, `Quantidade`, `Valor total (Projeto)` e `Produto` quando forem necessarios ao funil.
- Preservar `OrcamentoId`, `Orcamentos`, `Tipo de orcamento`, `Cidade da obra` e `Etapa do negocio`.
- Aceitar filtro opcional de etapa do negocio em `GET /project`.
- Relacionar filtro de etapa com o orcamento via `OrcamentoId` e campos vindos do Airtable.
- Manter filtro de empresa para `USER` e remover apenas esse filtro para `ADMIN`.
- Manter protecao por roles nos endpoints de projeto.
- Retornar respostas no formato `ApiResponse` existente.
</requirements>

## Subtarefas

- [ ] 1.1 Ler `prd.md`, `techspec.md`, `../milatec-backend/documentos/techspec-codebase.md` e inspecionar `ProjectController`, `ProjectService`, `QueryAirtable` e guards.
- [ ] 1.2 Escrever testes unitarios para o filtro atual de empresa, filtro por etapa para `USER` e filtro por etapa para `ADMIN`.
- [ ] 1.3 Ajustar `ProjectController.getAll` para receber query opcional de etapa do negocio.
- [ ] 1.4 Ajustar `ProjectService.getAll` para montar formula Airtable correta com empresa e etapa.
- [ ] 1.5 Revisar os campos retornados por listagem geral para atender ao funil sem quebrar consumidores existentes.
- [ ] 1.6 Criar testes de integracao/Supertest para rota protegida sem token, token valido e filtro por etapa.
- [ ] 1.7 Executar testes backend relacionados e corrigir regressões.

## Detalhes de Implementacao

Dependencias: primeira tarefa da funcionalidade. As tarefas frontend dependem do contrato definido aqui.

Consulte em `techspec.md` as secoes "Backend", "Pontos de Integracao", "Abordagem de Testes" e "Riscos Conhecidos".

## Criterios de Sucesso

- `GET /project` continua protegido por JWT e roles.
- Requisicao sem token retorna 401.
- Requisicao autenticada retorna campos suficientes para o funil.
- `GET /project?businessStage=<etapa>` filtra projetos pela etapa do negocio.
- Usuario comum continua limitado pela empresa.
- Admin pode ver dados sem filtro de empresa, mantendo filtro de etapa quando informado.
- Testes unitarios e de integracao da tarefa passam.

## Testes da Tarefa

- [ ] Testes de unidade: montagem de formula Airtable para usuario comum/admin, com e sem etapa.
- [ ] Testes de integracao: contratos HTTP de `/project`, protecao sem token e filtro por etapa com mocks de dados.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `../milatec-backend/src/project/project.controller.ts`
- `../milatec-backend/src/project/project.service.ts`
- `../milatec-backend/src/airtable/query.airtable.ts`
- `../milatec-backend/src/auth/guards/auth.guard.ts`
- `../milatec-backend/src/auth/decorators/roles.decorator.ts`
- `../milatec-backend/documentos/techspec-codebase.md`
- `tasks/prd-funil-projetos/prd.md`
- `tasks/prd-funil-projetos/techspec.md`
