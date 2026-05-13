# Tarefa 5.0: Adaptar tela de PIN com validacao e reenvio

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>HIGH</complexity>

Reutilizar a tela existente `/auth/login-pin` para validar PIN de 4 digitos por e-mail, suportar digitacao por teclado, colagem, reenvio com cooldown e finalizar login salvando o JWT em `sessionStorage`.

Esta tarefa deve seguir red-green-refactor para a logica de campos de PIN e cooldown, porque ha muitos estados de interacao e regressao visual/comportamental.

<requirements>
- Reutilizar `JS/src/app/(other)/auth/login-pin/page.jsx`.
- Adaptar de 6 campos para 4 campos.
- Aceitar apenas um digito numerico por campo.
- Permitir colar PIN de 4 digitos e preencher todos os campos automaticamente.
- Permitir apagar e navegar entre campos de forma previsivel.
- Submeter PIN com e-mail pendente e 4 digitos.
- Chamar `verifyPin(email, pin)`.
- Salvar JWT retornado em `sessionStorage`.
- Redirecionar para `/dashboard` apos autenticacao bem-sucedida.
- Exibir feedback claro para PIN invalido, PIN expirado, tentativas esgotadas e erro inesperado.
- Implementar reenvio de PIN com cooldown de 60 segundos.
- Reenvio deve chamar `requestPin(email)` e substituir o fluxo anterior conforme regra do backend.
- Durante cooldown, indicar espera e desabilitar a acao de reenvio.
- Substituir textos de telefone por e-mail.
- Garantir acessibilidade e funcionamento por teclado.
</requirements>

## Subtarefas

- [x] 5.1 Ler `prd.md`, `techspec.md` e revisar a implementacao atual de `/auth/login-pin`.
- [x] 5.2 Ajustar UI de 6 para 4 campos numericos mantendo estilo e responsividade do template.
- [x] 5.3 Implementar manipuladores de digitacao, backspace, setas/foco e colagem de 4 digitos.
- [x] 5.4 Recuperar e-mail pendente do `authSession`; redirecionar para `/auth/login` se ele nao existir.
- [x] 5.5 Integrar `verifyPin(email, pin)` com loading, bloqueio de duplo submit e mensagens de erro.
- [x] 5.6 Em sucesso, salvar `accessToken` no `sessionStorage`, limpar e-mail pendente se apropriado e navegar para `/dashboard`.
- [x] 5.7 Implementar cooldown visual de reenvio por 60 segundos, incluindo estado desabilitado e contador.
- [x] 5.8 Integrar reenvio com `requestPin(email)` e reset controlado dos campos/erros quando aplicavel.
- [x] 5.9 Garantir labels/nomes acessiveis, erro associado ao grupo de campos e fluxo completo por teclado.
- [x] 5.10 Criar e executar testes unitarios da logica de PIN, colagem, foco, erros, sucesso e cooldown.
- [x] 5.11 Criar e executar teste de integracao da tela com `authApi` e `authSession` mockados.

## Detalhes de Implementacao

Dependencias: depende da tarefa 3.0 para API/sessao e da tarefa 2.0 para validacao real contra backend. Pode ser desenvolvida com mocks enquanto o backend finaliza.

Consulte em `techspec.md` as secoes "Frontend `LoginPinPage`", "Frontend API", "Frontend session", "`POST /auth/verify-pin`", "`POST /auth/request-pin`" e "Abordagem de Testes".

## Criterios de Sucesso

- A tela `/auth/login-pin` exibe 4 campos e nenhum texto de telefone.
- Cada campo aceita somente um digito numerico.
- Colar `1234` preenche os 4 campos corretamente.
- Backspace e navegacao por teclado funcionam sem prender o usuario.
- Submit envia e-mail e PIN para `verifyPin`.
- Sucesso salva o JWT no `sessionStorage` e redireciona para `/dashboard`.
- PIN invalido, expirado e tentativas esgotadas mostram feedback claro.
- Reenvio fica indisponivel por 60 segundos e chama `requestPin` quando liberado.
- Testes unitarios e de integracao da tarefa passam.

## Testes da Tarefa

- [x] Testes de unidade: digitacao numerica, bloqueio de caracteres invalidos, colagem, foco/backspace, loading, sucesso, erros e cooldown de reenvio.
- [x] Testes de integracao: fluxo completo da tela com e-mail pendente, `verifyPin`, `requestPin`, persistencia de token e navegacao.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `JS/src/app/(other)/auth/login-pin/page.jsx`
- `JS/src/services/authApi.js`
- `JS/src/services/authSession.js`
- `JS/src/routes/router.jsx`
- `tasks/prd-login-pin/prd.md`
- `tasks/prd-login-pin/techspec.md`
