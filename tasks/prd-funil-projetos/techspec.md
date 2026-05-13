# Tech Spec: Funil de Projetos

## Resumo Executivo

A entrega sera implementada em frontend e backend. O backend NestJS deve garantir um contrato de projetos adequado ao funil, incluindo `OrcamentoId` e `Etapa do negocio`, alem de endpoint/filtro para etapa quando necessario. O frontend Vite/React deve criar um servico de projetos autenticado, transformar os dados recebidos em um modelo de UI e renderizar o funil conforme Figma dentro das rotas administrativas protegidas.

O side menu entra como parte da integracao da tela: a rota do funil deve ficar acessivel pelo menu existente e continuar protegida por `RequireAuth`.

## Arquitetura do Sistema

### Componentes Envolvidos

- **Backend `ProjectController`**: expor ou ajustar endpoints de projetos e filtro por etapa.
- **Backend `ProjectService`**: montar consultas Airtable com campos de projeto, orcamento e etapa do negocio.
- **Backend `AirtableService`**: continuar como adaptador da fonte operacional.
- **Frontend `projectApi`**: cliente HTTP autenticado para projetos.
- **Frontend `projectMappers`**: normalizacao de campos Airtable para o modelo do funil.
- **Frontend `Projects/FunnelPage`**: tela do funil conforme Figma.
- **Frontend menu e rotas**: registrar rota protegida e item no side menu.
- **Testes**: cobrir contrato backend, servico frontend, rota protegida e filtro.

Fluxo de dados:

1. Usuario autenticado acessa a rota do funil.
2. `RequireAuth` valida token em `sessionStorage`.
3. Tela chama `projectApi` com `Authorization: Bearer <token>`.
4. Backend valida JWT/roles e consulta Airtable.
5. Frontend normaliza campos e agrupa projetos por etapa do negocio.
6. Filtro de etapa restringe os cards exibidos e preserva relacao com `OrcamentoId`.

## Design de Implementacao

### Backend

Endpoints atuais:

- `GET /project`
- `GET /project/:id`
- `GET /project/construction/:id`

Endpoint/filtro recomendado:

```http
GET /project?businessStage=<etapa>
```

Quando `businessStage` estiver presente, `ProjectService.getAll` deve incluir filtro por `{Etapa do negocio}` junto ao filtro de empresa do usuario comum. Para admin, remover apenas o filtro de empresa, preservando o filtro de etapa quando informado.

Campos minimos para o funil:

- `Projeto`
- `ProjetoId`
- `OrcamentoId`
- `Orcamentos`
- `Tipo de orcamento`
- `Cidade da obra`
- `Etapa do negocio`
- `Etapa do Projeto`
- `Quantidade`
- `Valor total (Projeto)`
- `Produto`

Regra de filtro:

- Usuario comum: `AND({EmpresaId}="...", {Etapa do negocio}="<businessStage>")` quando houver etapa.
- Admin: `{Etapa do negocio}="<businessStage>"` quando houver etapa.
- Sem etapa: manter comportamento atual de listagem por empresa/admin.

### Frontend

Servico sugerido:

```js
export async function getProjects({ businessStage } = {}) {
  const params = new URLSearchParams();
  if (businessStage) params.set('businessStage', businessStage);
  return projectFetch(`/project${params.size ? `?${params}` : ''}`);
}
```

Modelo normalizado:

```js
{
  id,
  projectId,
  name,
  budgetId,
  budgetName,
  budgetType,
  city,
  businessStage,
  projectStage,
  quantity,
  totalValue,
  product,
}
```

Tela:

- Criar ou substituir a tela atual de projetos mockados em `JS/src/app/(admin)/apps/Projects`.
- Renderizar colunas/etapas a partir dos dados retornados.
- Usar estado local para filtro de etapa.
- Manter estados de loading, empty e error.
- Ajustar side menu/rotas para o caminho definido da tela.

## Pontos de Integracao

- **Auth frontend**: usar `authSession.getToken()`.
- **Roteamento**: `RequireAuth` ja protege `appRoutes`.
- **Backend auth**: `@Roles(UserRole.ADMIN, UserRole.USER)` deve continuar nos endpoints de projetos.
- **Airtable**: campos de `Projetos` e `Orcamentos` devem ser consultados conforme documentado em `milatec-backend/documentos/techspec-codebase.md`.
- **Figma**: detalhes visuais devem ser aplicados na tarefa de UI a partir do design fornecido.

## Abordagem de Testes

### Testes de Unidade

Backend:

- `ProjectService.getAll` monta filtro correto para usuario comum sem etapa.
- `ProjectService.getAll` monta `AND` com empresa e etapa para usuario comum.
- `ProjectService.getAll` preserva filtro de etapa para admin.
- `ProjectController` repassa query de etapa ao service.

Frontend:

- `projectApi` envia token e query string de etapa.
- Mapper normaliza campos acentuados do Airtable.
- Funil agrupa projetos por `businessStage`.
- Filtro altera a lista exibida.

### Testes de Integracao

- Backend/Supertest deve retornar 401 sem token para `/project`.
- Backend/Supertest deve retornar dados esperados com token valido/mocks.
- Frontend route guard deve redirecionar sem token.
- Frontend deve renderizar dados mockados da API e aplicar filtro.

### Testes E2E/Manual Assistido

- Abrir rota sem token e validar redirecionamento.
- Autenticar ou injetar token valido no ambiente local.
- Abrir funil pelo side menu.
- Confirmar que os dados aparecem agrupados por etapa.
- Aplicar filtro por etapa e confirmar que os projetos exibidos possuem a etapa e `OrcamentoId` esperados.

## Sequenciamento

1. Ajustar contrato backend e testes da API.
2. Criar cliente/mappers frontend e testes.
3. Implementar tela do funil conforme Figma, incluindo rota e side menu.
4. Validar fluxo completo com testes de integracao, build e verificacao visual.

## Riscos Conhecidos

- O Figma pode conter nomes de etapas ou estados que nao batem exatamente com Airtable.
- Campos com acentos podem exigir mapeamento cuidadoso no frontend.
- A API atual retorna campos diferentes entre listagem geral e listagem por orcamento.
- Filtro por etapa no frontend pode mascarar erro de contrato se o backend tambem precisar filtrar.
- Ambiente local depende de token e variaveis do backend para teste completo.

## Arquivos Relevantes

Backend:

- `../milatec-backend/src/project/project.controller.ts`
- `../milatec-backend/src/project/project.service.ts`
- `../milatec-backend/src/airtable/query.airtable.ts`
- `../milatec-backend/src/auth/guards/auth.guard.ts`
- `../milatec-backend/src/auth/decorators/roles.decorator.ts`
- `../milatec-backend/documentos/techspec-codebase.md`

Frontend:

- `JS/src/app/(admin)/apps/Projects/page.jsx`
- `JS/src/app/(admin)/apps/Projects/components/Projects.jsx`
- `JS/src/app/(admin)/apps/Projects/data.js`
- `JS/src/assets/data/menu-items.js`
- `JS/src/routes/index.jsx`
- `JS/src/routes/router.jsx`
- `JS/src/routes/guards.jsx`
- `JS/src/services/authSession.js`
