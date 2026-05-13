# Tarefa 6.0: Proteger rotas privadas e ajustar logout

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>MEDIUM</complexity>

Implementar protecao de rotas administrativas no frontend usando o token em `sessionStorage`, redirecionar usuarios nao autenticados para `/auth/login`, redirecionar usuarios autenticados para `/dashboard` quando acessarem telas de login e ajustar logout para limpar a sessao.

<requirements>
- Rotas administrativas devem exigir token no `sessionStorage`.
- Usuario sem token deve ser redirecionado para `/auth/login`.
- Usuario autenticado que acessar telas de login deve ser redirecionado para `/dashboard`.
- Logout deve remover o token do `sessionStorage`.
- Preservar a estrutura atual de rotas e layouts quando possivel.
- Evitar acesso ao dashboard sem token.
- Garantir que a protecao nao quebre rotas publicas.
</requirements>

## Subtarefas

- [x] 6.1 Ler `prd.md`, `techspec.md` e revisar `JS/src/routes/index.jsx`, `JS/src/routes/router.jsx` e logout atual.
- [x] 6.2 Definir componentes/helper de guard alinhados ao padrao atual de roteamento.
- [x] 6.3 Proteger rotas administrativas usando `authSession.getToken()`.
- [x] 6.4 Redirecionar acesso sem token para `/auth/login`, preservando destino quando o padrao atual permitir.
- [x] 6.5 Redirecionar usuarios autenticados que acessarem `/auth/login` ou `/auth/login-pin` para `/dashboard`.
- [x] 6.6 Ajustar `/auth/logout` para limpar token e e-mail pendente via `authSession.clear()`.
- [x] 6.7 Criar e executar testes unitarios dos guards com e sem token.
- [x] 6.8 Criar e executar testes de integracao de navegacao cobrindo rotas privadas, rotas publicas e logout.

## Detalhes de Implementacao

Dependencias: depende da tarefa 3.0. Pode ser feita em paralelo com as tarefas 4.0 e 5.0, mas deve ser validada junto com elas.

Consulte em `techspec.md` as secoes "Frontend route guards", "React Router", "Protecao de rotas frontend", "Frontend session" e "Abordagem de Testes".

## Criterios de Sucesso

- `/dashboard` e rotas administrativas nao abrem sem token.
- Usuario sem token e enviado para `/auth/login`.
- Usuario com token nao permanece em `/auth/login` ou `/auth/login-pin`.
- Logout remove token e e-mail pendente e impede acesso posterior a rotas privadas.
- Rotas publicas continuam acessiveis.
- Testes unitarios e de integracao da tarefa passam.

## Testes da Tarefa

- [x] Testes de unidade: guard privado com token, guard privado sem token, guard publico com token e limpeza de sessao.
- [x] Testes de integracao: navegacao real/memoria para `/dashboard`, `/auth/login`, `/auth/login-pin` e `/auth/logout`.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `JS/src/routes/index.jsx`
- `JS/src/routes/router.jsx`
- `JS/src/app/(other)/auth/logout/page.jsx`
- `JS/src/services/authSession.js`
- `tasks/prd-login-pin/prd.md`
- `tasks/prd-login-pin/techspec.md`
