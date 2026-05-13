# PRD: Funil de Projetos

## Visao Geral

Esta funcionalidade adiciona ao MilaTec um funil de projetos baseado no Figma, consumindo dados reais da API protegida. O funil deve exibir projetos agrupados pela etapa do negocio vinculada ao orcamento, permitindo filtrar por etapa e validar se os dados retornados estao coerentes com os campos vindos do Airtable.

O escopo tambem inclui a navegacao pelo side menu para que o usuario autenticado acesse o funil de projetos de forma consistente com o layout administrativo existente.

## Objetivos

- Implementar o funil de projetos conforme o layout definido no Figma.
- Integrar o frontend com a API de projetos usando token JWT salvo na sessao.
- Garantir que a rota frontend do funil esteja protegida contra acesso sem autenticacao.
- Garantir que a API backend retorne projetos com os campos necessarios ao funil.
- Permitir filtro por etapa do negocio relacionando projeto ao orcamento.
- Validar o retorno dos dados e os cenarios de rota protegida com testes.

Metricas de sucesso:

- Usuario autenticado acessa o funil pelo side menu.
- Usuario sem token e redirecionado para `/auth/login`.
- Funil carrega projetos reais da API.
- Filtro por etapa do negocio altera corretamente os projetos exibidos.
- Relacao entre etapa do negocio e orcamento e validada por testes.

## Historias de Usuario

- Como usuario autenticado da MilaTec, eu quero visualizar os projetos em um funil por etapa para acompanhar o andamento dos negocios.
- Como usuario autenticado, eu quero filtrar o funil por etapa do negocio para analisar somente os projetos relevantes.
- Como usuario autenticado, eu quero acessar o funil pelo side menu para navegar sem conhecer a URL.
- Como usuario sem autenticacao, eu nao devo conseguir acessar o funil nem consumir a API de projetos.
- Como gestor, eu quero confiar que a etapa exibida no funil esta relacionada ao orcamento correto.

## Funcionalidades Principais

### 1. Contrato de dados da API

Requisitos funcionais:

1. A API deve expor projetos com identificadores de projeto e orcamento.
2. A API deve expor `Etapa do negocio` para alimentar agrupamento e filtro.
3. A API deve manter protecao por role para usuario comum e admin.
4. O backend deve preservar o filtro de empresa para usuarios comuns.
5. O backend deve permitir filtrar projetos por etapa do negocio relacionada ao orcamento quando solicitado.
6. O retorno deve ser padronizado no `ApiResponse` ja usado no projeto.

### 2. Integracao frontend

Requisitos funcionais:

7. O frontend deve centralizar chamadas de projetos em um servico dedicado.
8. As chamadas devem enviar `Authorization: Bearer <token>`.
9. Erros 401/403 devem limpar ou invalidar o estado autenticado quando aplicavel.
10. O servico deve normalizar os campos retornados pelo Airtable para nomes usados pela UI.
11. A integracao deve cobrir listagem geral e filtro por etapa.

### 3. Funil de projetos

Requisitos funcionais:

12. A tela deve seguir o Figma fornecido para layout, hierarquia visual, estados e responsividade.
13. O funil deve agrupar projetos por etapa do negocio.
14. Cada item deve exibir informacoes essenciais do projeto e orcamento.
15. A tela deve ter estados de carregamento, vazio e erro.
16. A tela deve oferecer filtro de etapa do negocio.
17. A navegacao pelo side menu deve apontar para a rota protegida do funil.

### 4. Validacao ponta a ponta

Requisitos funcionais:

18. Testes devem confirmar que a API retorna os dados esperados.
19. Testes devem confirmar que a rota frontend esta protegida.
20. Testes devem confirmar que o filtro de etapa do negocio respeita a relacao com o orcamento.
21. Build e testes relevantes devem passar antes de considerar a funcionalidade pronta.

## Experiencia do Usuario

Fluxo principal:

1. Usuario autenticado acessa o sistema.
2. Usuario abre o funil pelo side menu.
3. Frontend chama a API protegida de projetos.
4. Sistema exibe projetos agrupados por etapa do negocio.
5. Usuario seleciona uma etapa e ve o funil filtrado.

Estados esperados:

- Carregando enquanto a API responde.
- Vazio quando nao houver projetos para a etapa selecionada.
- Erro quando a API falhar.
- Redirecionamento para login quando nao houver token.

## Restricoes Tecnicas de Alto Nivel

- Reutilizar os padroes atuais de React, Vite, React Bootstrap e roteamento.
- Reutilizar `authSession` e `RequireAuth` ja existentes.
- Evitar dependencia nova sem necessidade clara.
- Backend deve manter NestJS Controller -> Service -> AirtableService.
- Airtable continua sendo a fonte de dados para orcamentos e projetos.
- A documentacao de codebase do backend deve ser considerada para filtros e campos.

## Fora de Escopo

- Criacao ou edicao de projetos.
- Drag and drop entre etapas.
- Alteracao de dados no Airtable.
- Permissoes novas alem das roles existentes.
- Reestruturacao completa do menu administrativo.
- Implementacao de dashboard financeiro fora do funil.

## Questoes em Aberto

- Confirmar no Figma a URL/frame definitivo do funil e do side menu.
- Confirmar nomes finais das etapas do negocio no Airtable.
- Confirmar se o filtro por etapa deve ser aplicado no backend, no frontend, ou nos dois para performance e consistencia.
- Confirmar se o menu deve substituir o item atual `Projetos` ou adicionar uma entrada especifica de `Funil de Projetos`.
