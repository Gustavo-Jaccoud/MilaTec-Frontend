# Tarefa 1.0: Implementar solicitacao de PIN no backend

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>HIGH</complexity>

Adicionar o endpoint backend responsavel por receber o e-mail do usuario, validar se ele existe e esta ativo na base operacional, gerar um PIN numerico de 4 digitos, controlar validade/cooldown em cache e enviar o codigo por e-mail.

Esta tarefa deve seguir red-green-refactor para as regras centrais de `AuthService.requestPin`, porque concentra regras de negocio, integracao com cache, usuario, e-mail e auditoria.

<requirements>
- Criar contrato dedicado para solicitacao de PIN com validacao de e-mail.
- Expor `POST /auth/request-pin`.
- Validar usuario existente e ativo via fonte operacional atual.
- Retornar erro de e-mail inexistente/inativo com a mensagem definida pelo produto.
- Gerar PIN com exatamente 4 digitos numericos.
- Salvar PIN em cache com TTL de 150 segundos.
- Aplicar cooldown de 60 segundos para reenvio.
- Enviar o PIN por e-mail e propagar falhas de envio para o fluxo de auth.
- Atualizar template/texto de e-mail para validade de 2 minutos e 30 segundos.
- Nao registrar PIN, JWT ou dados sensiveis em logs/auditoria.
</requirements>

## Subtarefas

- [x] 1.1 Ler `prd.md`, `techspec.md` e inspecionar os padroes atuais de `AuthController`, `AuthService`, cache, `EmailService` e auditoria.
- [x] 1.2 Criar `RequestPinDto` e constantes compartilhadas de PIN (`PIN_LENGTH`, `PIN_TTL_MS`, `RESEND_COOLDOWN_MS`, `MAX_PIN_ATTEMPTS`).
- [x] 1.3 Implementar normalizacao de e-mail e helpers de chave de cache para `auth:pin:{email}` e `auth:pin:cooldown:{email}`.
- [x] 1.4 Implementar `AuthService.requestPin` validando usuario ativo, cooldown, geracao de PIN numerico, gravacao em cache e resposta com `expiresInSeconds` e `resendAvailableInSeconds`.
- [x] 1.5 Ajustar `EmailService` para sinalizar falhas de envio ao `AuthService` e atualizar o template HBS com PIN de 4 digitos e validade de 2 minutos e 30 segundos.
- [x] 1.6 Adicionar `POST /auth/request-pin` no `AuthController` com validacao local do DTO.
- [x] 1.7 Registrar auditoria/logs nos caminhos de falha relevantes sem expor dados sensiveis.
- [x] 1.8 Criar e executar testes unitarios de `AuthService.requestPin` e do comportamento de erro do `EmailService`.
- [x] 1.9 Criar e executar testes de integracao/Supertest para sucesso, e-mail inexistente/inativo, cooldown ativo e falha de envio de e-mail.

## Detalhes de Implementacao

Dependencias: primeira tarefa do backend. A tarefa 2.0 depende dos contratos e constantes criados aqui.

Consulte em `techspec.md` as secoes "Backend DTOs", "Cache de PIN", "`POST /auth/request-pin`", "Pontos de Integracao", "Monitoramento e Observabilidade" e "Riscos Conhecidos".

## Criterios de Sucesso

- `POST /auth/request-pin` retorna 200 com `message`, `expiresInSeconds: 150` e `resendAvailableInSeconds: 60` para usuario ativo.
- E-mail inexistente ou inativo retorna erro com a mensagem esperada pelo produto.
- Nova solicitacao durante cooldown retorna 429 com mensagem de aguardo.
- O PIN salvo contem 4 digitos numericos e expira em 150 segundos.
- Falha real de envio de e-mail nao deve ser tratada como sucesso.
- Testes unitarios e de integracao da tarefa passam.

## Testes da Tarefa

- [x] Testes de unidade: usuario inexistente/inativo, cooldown ativo, geracao numerica de 4 digitos, cache com TTL correto, chamada ao servico de e-mail e propagacao de falha.
- [x] Testes de integracao: contratos HTTP de `POST /auth/request-pin` com mocks de `UserService`, `EmailService`, cache e auditoria.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `../milatec-backend/src/auth/auth.controller.ts`
- `../milatec-backend/src/auth/auth.service.ts`
- `../milatec-backend/src/auth/dtos/request-pin.dto.ts`
- `../milatec-backend/src/email/email.service.ts`
- `../milatec-backend/src/email/templates/CodeEmailTemplate.hbs`
- `../milatec-backend/src/audit/audit.types.ts`
- `tasks/prd-login-pin/prd.md`
- `tasks/prd-login-pin/techspec.md`
