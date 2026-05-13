# Tarefa 7.0: Validar fluxo completo com testes E2E e build

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>MEDIUM</complexity>

Executar a validacao final do fluxo de login por e-mail e PIN, cobrindo testes automatizados, build, verificacao E2E/manual com Playwright MCP quando o ambiente local permitir e registro de qualquer risco residual.

<requirements>
- Executar os testes unitarios e de integracao criados nas tarefas anteriores.
- Validar build do backend e frontend quando os scripts existirem.
- Validar fluxo frontend/backend em ambiente local ou registrar claramente o bloqueio.
- Verificar `/auth/login`, `/auth/login-pin`, `/dashboard` protegido e logout.
- Confirmar armazenamento do JWT em `sessionStorage`.
- Confirmar que usuario sem token nao acessa rotas administrativas.
- Validar feedback de e-mail invalido/inativo, PIN invalido, PIN expirado, tentativas esgotadas e cooldown quando possivel.
- Documentar comandos executados, resultados e riscos residuais.
</requirements>

## Subtarefas

- [x] 7.1 Ler `prd.md`, `techspec.md` e revisar os criterios de sucesso das tarefas 1.0 a 6.0.
- [x] 7.2 Identificar scripts reais de teste/build no backend e frontend.
- [x] 7.3 Executar testes unitarios e de integracao do backend.
- [x] 7.4 Executar testes unitarios e de integracao do frontend.
- [x] 7.5 Executar build/lint disponiveis sem alterar escopo funcional.
- [x] 7.6 Subir ambiente local necessario ou registrar variaveis/bloqueios quando nao for possivel.
- [x] 7.7 Validar com Playwright MCP o fluxo: `/auth/login` -> e-mail ativo -> `/auth/login-pin` -> PIN invalido -> PIN correto -> token em `sessionStorage` -> `/dashboard`.
- [x] 7.8 Validar bloqueio de `/dashboard` sem token e comportamento de `/auth/logout`.
- [x] 7.9 Registrar resultados, comandos executados, evidencias e riscos residuais em comentario da task ou documento operacional.

## Detalhes de Implementacao

Dependencias: depende da conclusao das tarefas 1.0 a 6.0. Esta tarefa e o portao final antes de considerar a funcionalidade pronta para uso.

Consulte em `techspec.md` as secoes "Abordagem de Testes", "Testes de E2E", "Sequenciamento de Desenvolvimento", "Dependencias Tecnicas" e "Riscos Conhecidos".

## Criterios de Sucesso

- Testes unitarios e de integracao relevantes passam ou tem bloqueio documentado com causa objetiva.
- Build/lint disponiveis passam ou tem falha documentada com causa objetiva.
- Fluxo principal de login funciona em ambiente local/preparado.
- Token e salvo em `sessionStorage` apos PIN correto.
- `/dashboard` fica bloqueado sem token.
- Logout limpa a sessao e impede acesso posterior a rotas privadas.
- Evidencias e riscos residuais ficam documentados.

## Testes da Tarefa

- [x] Testes de unidade: executar suites criadas nas tarefas 1.0 a 6.0 e corrigir falhas do escopo da feature.
- [x] Testes de integracao: executar contratos backend e testes de navegacao/frontend criados nas tarefas anteriores.
- [x] Testes E2E: validar fluxo completo com Playwright MCP ou registrar bloqueio de ambiente.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `../milatec-backend/package.json`
- `JS/package.json`
- `JS/README.md`
- `tasks/prd-login-pin/prd.md`
- `tasks/prd-login-pin/techspec.md`
- `tasks/prd-login-pin/tasks.md`
