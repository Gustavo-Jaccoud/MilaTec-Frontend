# Tarefa 2.0: Implementar validacao de PIN e emissao de JWT no backend

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>HIGH</complexity>

Adicionar o endpoint backend que valida e-mail e PIN, controla PIN expirado, PIN invalido e tentativas esgotadas, emite JWT com 2 horas de validade e mantem compatibilidade com o endpoint legado `POST /auth/login`.

Esta tarefa deve seguir red-green-refactor para `AuthService.verifyPin`, porque a regra de tentativas, expiracao e limpeza de cache e critica para seguranca do login.

<requirements>
- Criar contrato dedicado para validacao de PIN com e-mail valido e PIN de 4 digitos.
- Expor `POST /auth/verify-pin`.
- Validar PIN correto, PIN invalido, PIN expirado e tentativas esgotadas.
- Permitir no maximo 3 tentativas invalidas por solicitacao.
- Remover ou invalidar o PIN apos autenticacao bem-sucedida.
- Emitir JWT com os campos necessarios para guards, auditoria e dashboard.
- Configurar expiracao do JWT para 2 horas.
- Preservar `POST /auth/login` como compatibilidade, delegando para a mesma logica de PIN quando aplicavel.
- Registrar `AUTH_LOGIN_SUCCESS` apenas quando JWT for emitido.
- Registrar `AUTH_LOGIN_FAILED` para falhas relevantes sem expor PIN ou token.
</requirements>

## Subtarefas

- [x] 2.1 Revisar a implementacao da tarefa 1.0 e confirmar contratos de cache, DTOs, mensagens e auditoria.
- [x] 2.2 Criar `VerifyPinDto` validando e-mail e PIN com regex de 4 digitos numericos.
- [x] 2.3 Implementar `AuthService.verifyPin` para buscar cache, validar expiracao, conferir PIN, incrementar tentativas e bloquear apos a terceira tentativa invalida.
- [x] 2.4 Garantir limpeza do PIN/cooldown relevante apos sucesso e preservacao das regras de tentativas esgotadas.
- [x] 2.5 Emitir JWT preservando payload esperado (`name`, `email`, `role`, `idEmpresa` e campos ja usados pelo sistema).
- [x] 2.6 Atualizar `AuthModule`/configuracao JWT para expiracao de 7200 segundos.
- [x] 2.7 Adicionar `POST /auth/verify-pin` no `AuthController` com validacao local do DTO.
- [x] 2.8 Manter `POST /auth/login` disponivel e delegando para solicitacao ou validacao de PIN conforme presenca de codigo legado.
- [x] 2.9 Criar e executar testes unitarios de `verifyPin`, emissao de JWT e compatibilidade do login legado.
- [x] 2.10 Criar e executar testes de integracao/Supertest para `verify-pin` e `login` legado.

## Detalhes de Implementacao

Dependencias: depende da tarefa 1.0. A tarefa 5.0 depende deste contrato para validar o login no frontend sem mocks.

Consulte em `techspec.md` as secoes "Backend DTOs", "`POST /auth/verify-pin`", "`POST /auth/login`", "JWT", "Abordagem de Testes", "Monitoramento e Observabilidade" e "Consideracoes Tecnicas".

## Criterios de Sucesso

- `POST /auth/verify-pin` retorna `{ "accessToken": "<jwt>" }` para PIN correto e usuario valido.
- PIN invalido retorna erro claro e incrementa tentativa sem emitir JWT.
- PIN expirado retorna erro claro e nao emite JWT.
- Terceira tentativa invalida bloqueia a solicitacao conforme regra de negocio.
- Sucesso remove o PIN atual para impedir reutilizacao.
- `POST /auth/login` continua respondendo sem quebrar clientes existentes.
- Eventos de auditoria de sucesso e falha sao emitidos nos caminhos definidos.
- Testes unitarios e de integracao da tarefa passam.

## Testes da Tarefa

- [x] Testes de unidade: PIN correto, PIN expirado, PIN invalido, terceira tentativa, limpeza de cache apos sucesso, payload JWT e auditoria.
- [x] Testes de integracao: contratos HTTP de `POST /auth/verify-pin` e `POST /auth/login` com mocks de usuario, cache, JWT, e-mail e auditoria.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `../milatec-backend/src/auth/auth.controller.ts`
- `../milatec-backend/src/auth/auth.service.ts`
- `../milatec-backend/src/auth/auth.module.ts`
- `../milatec-backend/src/auth/dtos/login.dto.ts`
- `../milatec-backend/src/auth/dtos/verify-pin.dto.ts`
- `../milatec-backend/src/audit/audit.types.ts`
- `tasks/prd-login-pin/prd.md`
- `tasks/prd-login-pin/techspec.md`
