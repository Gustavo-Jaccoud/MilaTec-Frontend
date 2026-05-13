# Tarefa 3.0: Criar camada frontend de autenticacao e sessao

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>MEDIUM</complexity>

Criar a camada compartilhada do frontend para chamar os endpoints de PIN, padronizar tratamento de erro e encapsular o armazenamento de token e e-mail pendente no `sessionStorage`.

<requirements>
- Criar cliente HTTP usando `fetch` nativo.
- Usar `VITE_API_BASE_URL` como base da API.
- Implementar `requestPin(email)` chamando `/auth/request-pin`.
- Implementar `verifyPin(email, pin)` chamando `/auth/verify-pin`.
- Propagar mensagens de erro retornadas pelo backend para as telas.
- Encapsular token JWT em `sessionStorage`.
- Encapsular e-mail pendente para a tela de PIN em `sessionStorage`.
- Documentar `VITE_API_BASE_URL` e exemplo local no README ou documento operacional do frontend.
- Nao usar `localStorage` para token.
</requirements>

## Subtarefas

- [x] 3.1 Ler `prd.md`, `techspec.md` e inspecionar padroes atuais de servicos, constantes, rotas e armazenamento no frontend.
- [x] 3.2 Criar `JS/src/services/authApi.js` com `authFetch`, `requestPin` e `verifyPin`.
- [x] 3.3 Implementar parse padronizado de sucesso e erro, preservando a mensagem retornada pelo backend quando existir.
- [x] 3.4 Criar `JS/src/services/authSession.js` para token, e-mail pendente e limpeza da sessao.
- [x] 3.5 Garantir que as chaves de `sessionStorage` sejam estaveis e especificas da MilaTec.
- [x] 3.6 Documentar `VITE_API_BASE_URL`, endpoints usados e exemplo de configuracao local no README ou documento operacional.
- [x] 3.7 Criar e executar testes unitarios de `authApi` cobrindo URL, payload, sucesso e erros.
- [x] 3.8 Criar e executar testes unitarios de `authSession` cobrindo leitura, escrita, remocao e limpeza.
- [x] 3.9 Criar teste de integracao leve para garantir que a camada propaga mensagens usadas pelas telas.

## Detalhes de Implementacao

Dependencias: pode iniciar em paralelo com as tarefas 1.0 e 2.0 usando os contratos definidos na `techspec.md`. As tarefas 4.0, 5.0 e 6.0 dependem desta camada.

Consulte em `techspec.md` as secoes "Frontend API", "Frontend session", "Vite env", "Abordagem de Testes" e "Documentacao `.md`".

## Criterios de Sucesso

- `requestPin` envia `{ email }` para `/auth/request-pin`.
- `verifyPin` envia `{ email, pin }` para `/auth/verify-pin`.
- Erros como `Email nao cadastrado ou inativo`, `PIN invalido`, `PIN expirado`, `Tentativas esgotadas` e cooldown podem ser exibidos pelas telas.
- Token e e-mail pendente sao armazenados apenas em `sessionStorage`.
- Documentacao informa como configurar `VITE_API_BASE_URL`.
- Testes unitarios e de integracao da tarefa passam.

## Testes da Tarefa

- [x] Testes de unidade: montagem de URL, headers, body, parse de sucesso, parse de erro e funcoes de sessao.
- [x] Testes de integracao: fluxo request/verify com `fetch` mockado validando contrato e mensagens propagadas.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `JS/src/services/authApi.js`
- `JS/src/services/authSession.js`
- `JS/src/context/constants.js`
- `JS/README.md`
- `tasks/prd-login-pin/prd.md`
- `tasks/prd-login-pin/techspec.md`
