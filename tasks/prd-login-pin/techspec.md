# Tech Spec: Login por E-mail e PIN

## Resumo Executivo

A funcionalidade sera implementada como evolucao do fluxo atual de autenticacao do backend, mantendo `POST /auth/login` por compatibilidade e adicionando endpoints explicitos para solicitar e validar PIN. O backend continua como fonte de verdade do fluxo: valida usuario ativo via Airtable, gera PIN numerico de 4 digitos, controla validade, tentativas e cooldown no cache em memoria, envia o PIN por e-mail e emite JWT com expiracao de 2 horas.

No frontend, as telas existentes do template em `/auth/login` e `/auth/login-pin` serao reutilizadas. A primeira passa a solicitar apenas e-mail; a segunda passa a validar PIN de 4 digitos, reenviar codigo apos cooldown e salvar o JWT em `sessionStorage`. As rotas administrativas passam a ser protegidas por um guard de roteamento no React Router.

## Arquitetura do Sistema

### Visao Geral dos Componentes

- **Backend `AuthController`**: adiciona `POST /auth/request-pin` e `POST /auth/verify-pin`; mantem `POST /auth/login` como endpoint legado.
- **Backend `AuthService`**: centraliza normalizacao de e-mail, validacao de usuario ativo, geracao de PIN, controle de cache, tentativas, cooldown, auditoria e emissao de JWT.
- **Backend DTOs de auth**: cria contratos dedicados para solicitar PIN e validar PIN; mantem `LoginDto` para compatibilidade.
- **Backend `AuthModule`**: altera `JwtModule` para `expiresIn: 7200`.
- **Backend `EmailService` e template HBS**: enviam PIN numerico e atualizam o texto de validade para 2 minutos e 30 segundos.
- **Backend auditoria**: reutiliza `AUTH_LOGIN_SUCCESS` e `AUTH_LOGIN_FAILED`, conforme decisao do produto.
- **Frontend `authApi`**: cria cliente HTTP usando `VITE_API_BASE_URL`, `fetch` nativo e tratamento padronizado de erro.
- **Frontend `authSession`**: encapsula chaves de `sessionStorage` para token e e-mail pendente.
- **Frontend `LoginPage`**: reutiliza a pagina atual e remove senha, lembrar de mim, cadastro e recuperacao.
- **Frontend `LoginPinPage`**: reutiliza a pagina atual, reduz PIN para 4 campos numericos e implementa colagem, foco, validacao, cooldown e reenvio.
- **Frontend route guards**: protege `appRoutes`, redireciona nao autenticados para `/auth/login` e autenticados nas telas de login para `/dashboard`.
- **Documentacao `.md`**: documenta `VITE_API_BASE_URL`, endpoints e comportamento esperado em README ou documento operacional do frontend.

Fluxo de dados:

1. Frontend envia e-mail para `POST /auth/request-pin`.
2. Backend valida usuario ativo no Airtable, grava PIN/cooldown no cache e envia e-mail.
3. Frontend navega para `/auth/login-pin`, preservando o e-mail pendente em `sessionStorage`.
4. Frontend envia e-mail + PIN para `POST /auth/verify-pin`.
5. Backend valida cache/tentativas, emite JWT e registra auditoria.
6. Frontend salva JWT em `sessionStorage` e redireciona para `/dashboard`.

## Design de Implementacao

### Interfaces Principais

Backend DTOs:

```ts
export class RequestPinDto {
  @IsEmail()
  email!: string;
}

export class VerifyPinDto {
  @IsEmail()
  email!: string;

  @Matches(/^\d{4}$/)
  pin!: string;
}
```

Frontend API:

```js
export async function requestPin(email) {
  return authFetch('/auth/request-pin', { email });
}

export async function verifyPin(email, pin) {
  return authFetch('/auth/verify-pin', { email, pin });
}
```

Frontend session:

```js
export const authSession = {
  getToken: () => sessionStorage.getItem('milatec:accessToken'),
  setToken: token => sessionStorage.setItem('milatec:accessToken', token),
  clear: () => sessionStorage.removeItem('milatec:accessToken'),
};
```

### Modelos de Dados

Cache de PIN:

```ts
type PinCacheEntry = {
  pin: string;
  attempts: number;
  expiresAt: number;
};
```

Chaves de cache:

- `auth:pin:{emailNormalizado}`: dados do PIN atual, TTL de 150 segundos.
- `auth:pin:cooldown:{emailNormalizado}`: bloqueio de reenvio, TTL de 60 segundos.
- `auth:pin:exhausted:{emailNormalizado}`: marca tentativas esgotadas ate nova solicitacao ou fim da validade.

Constantes:

- `PIN_LENGTH = 4`
- `PIN_TTL_MS = 150000`
- `RESEND_COOLDOWN_MS = 60000`
- `MAX_PIN_ATTEMPTS = 3`
- `JWT_TTL_SECONDS = 7200`

Mensagens de erro:

- E-mail inexistente ou inativo: `Email não cadastrado ou inativo`
- PIN invalido: `PIN inválido`
- PIN expirado: `PIN expirado`
- Tentativas esgotadas: `Tentativas esgotadas`
- Cooldown ativo: `Aguarde 1 minuto para reenviar o PIN`

### Endpoints de API

`POST /auth/request-pin`

Request:

```json
{ "email": "usuario@empresa.com" }
```

Resposta 200:

```json
{
  "message": "PIN enviado para o e-mail.",
  "expiresInSeconds": 150,
  "resendAvailableInSeconds": 60
}
```

Erros:

- 401 com `Email não cadastrado ou inativo`
- 429 com `Aguarde 1 minuto para reenviar o PIN`
- 500 generico se o envio de e-mail falhar

`POST /auth/verify-pin`

Request:

```json
{ "email": "usuario@empresa.com", "pin": "1234" }
```

Resposta 200:

```json
{ "accessToken": "<jwt>" }
```

Erros:

- 401 com `PIN inválido`
- 401 com `PIN expirado`
- 429 com `Tentativas esgotadas`

`POST /auth/login`

Permanece disponivel. A implementacao deve delegar para a mesma logica de PIN:

- Sem `code`: solicita PIN.
- Com `code`: valida como PIN legado.
- O frontend novo nao deve usar este endpoint.

## Pontos de Integracao

- **Airtable**: `UserService.getUser(email)` continua verificando existencia e status ativo do contato.
- **SMTP/Mailer**: `EmailService.sendEmail(to, pin)` deve enviar o PIN e sinalizar erro para o `AuthService` quando o envio falhar.
- **JWT**: payload preserva `name`, `email`, `role` e `idEmpresa`, pois guards, auditoria e filtros dependem desses campos.
- **React Router**: usa `Navigate`, `useLocation` e `useNavigate` para proteger rotas e preservar destino quando aplicavel.
- **Vite env**: `VITE_API_BASE_URL` define a URL do backend. Deve ser documentado em `.md`, com exemplo local `http://localhost:3000`.
- **CORS**: se frontend e backend estiverem em origens diferentes, configurar CORS no backend por ambiente e documentar a origem permitida.

## Abordagem de Testes

### Testes Unidade

Backend:

- `AuthService.requestPin`: usuario inexistente/inativo, cooldown ativo, geracao numerica de 4 digitos, cache com TTL correto e envio de e-mail.
- `AuthService.verifyPin`: PIN correto, PIN expirado, PIN invalido, terceira tentativa, cache removido apos sucesso e auditoria.
- `AuthController`: contratos dos tres endpoints de auth.

Frontend:

- `authApi`: montagem de URL, parse de sucesso e propagacao de mensagens de erro.
- `authSession`: leitura, escrita e limpeza do token.
- `LoginPage`: validacao de e-mail, loading, erro de e-mail e navegacao para PIN.
- `LoginPinPage`: digitacao numerica, colagem de 4 digitos, reenvio bloqueado por cooldown e validacao de erro.
- Route guards: acesso com token, sem token e redirecionamento de autenticado fora de telas de login.

### Testes de Integracao

- Backend com mocks de `UserService`, `EmailService`, `Cache` e `AuditService`.
- Contratos HTTP com Supertest para `POST /auth/request-pin`, `POST /auth/verify-pin` e `POST /auth/login`.
- Validar que `AUTH_LOGIN_SUCCESS` e `AUTH_LOGIN_FAILED` sao emitidos nos caminhos relevantes.

### Testes de E2E

- Usar Playwright MCP para validar o fluxo frontend/backend em ambiente local:
  1. Acessar `/auth/login`.
  2. Enviar e-mail ativo.
  3. Confirmar navegacao para `/auth/login-pin`.
  4. Validar feedback de PIN invalido.
  5. Validar login com PIN correto via mock/controlador de teste ou ambiente preparado.
  6. Confirmar token no `sessionStorage` e redirecionamento para `/dashboard`.
  7. Limpar token e confirmar bloqueio de `/dashboard`.

## Sequenciamento de Desenvolvimento

### Ordem de Construcao

1. Backend DTOs e constantes de auth, porque definem contratos e regras compartilhadas.
2. Backend `AuthService` com `requestPin` e `verifyPin`, mantendo `login` como compatibilidade.
3. Backend controller, JWT de 2 horas, template de e-mail e testes unitarios/integração.
4. Frontend `authApi`, `authSession` e documentacao de `VITE_API_BASE_URL`.
5. Frontend `LoginPage` e `LoginPinPage`, reaproveitando React Bootstrap e componentes existentes.
6. Route guards em `src/routes/router.jsx` e ajuste de logout.
7. Testes manuais/E2E com Playwright MCP e validacao de build.

### Dependencias Tecnicas

- Backend precisa de `JWT_SECRET`, variaveis SMTP e acesso Airtable.
- Frontend precisa de `VITE_API_BASE_URL` documentado e configurado.
- Ambiente local pode exigir CORS no backend.
- Cache em memoria nao e compartilhado entre instancias; isso e aceito para este escopo.

## Monitoramento e Observabilidade

Nao ha infraestrutura Prometheus/Grafana implementada no repositorio atual. A observabilidade desta entrega deve usar a auditoria existente e logs aplicacionais:

- Registrar `AUTH_LOGIN_FAILED` para e-mail inativo/inexistente, PIN invalido, PIN expirado, tentativas esgotadas e falha inesperada.
- Registrar `AUTH_LOGIN_SUCCESS` apenas quando o JWT for emitido.
- Incluir `route`, `statusCode`, `actorEmail`, `actorRole` e `actorTenantId` quando disponiveis.
- Evitar gravar PIN, JWT ou headers sensiveis em logs ou metadata.
- Logar falhas de envio de e-mail com contexto minimo, sem expor credenciais.

## Consideracoes Tecnicas

### Decisoes Principais

- **Cache em memoria**: atende a decisao do produto e evita nova infraestrutura. O trade-off e perda de PIN em restart e incompatibilidade com multiplas instancias sem sticky session.
- **Endpoints separados**: simplificam o frontend e tornam os estados de solicitacao/validacao mais claros.
- **`POST /auth/login` mantido**: reduz risco para clientes existentes enquanto o frontend migra para os novos endpoints.
- **Retorno `accessToken` somente**: preserva o contrato atual de sucesso.
- **Auditoria com eventos existentes**: evita alterar `AuditEventType` e mantem consistencia com o backend atual.
- **`fetch` nativo no frontend**: nao adiciona dependencia nova, ja suficiente para dois endpoints.
- **Validacao local ao controller**: usar `ValidationPipe` nos endpoints de auth para evitar impacto global em rotas existentes.
- **PIN anterior substituido no reenvio**: sobrescrever a chave `auth:pin:{email}` invalida imediatamente o valor anterior.

### Riscos Conhecidos

- **Enumeracao de e-mail**: a mensagem `Email não cadastrado ou inativo` confirma existencia/status. Esse comportamento foi definido pelo produto.
- **Cache local**: restart do backend ou balanceamento entre instancias pode invalidar PINs. Mitigacao futura: Redis.
- **`EmailService` atual engole erro**: precisa passar falhas ao `AuthService` para evitar resposta de sucesso sem envio real.
- **Sem `ValidationPipe` global**: DTOs atuais nao sao garantidos globalmente. Mitigacao desta entrega: pipe nos endpoints de auth.
- **CORS pode bloquear chamadas locais**: documentar e configurar se houver origens diferentes.
- **Arquivos do frontend apresentam textos com encoding inconsistente**: ao editar, preservar o padrao do projeto e validar visualmente.

### Conformidade com Padroes

- Backend segue `milatec-backend/.windsurf/rules/techspec-codebase.md`.
- Mantem arquitetura NestJS Controller -> Service -> Provider.
- Mantem Airtable como fonte operacional de usuarios.
- Mantem PostgreSQL apenas para auditoria.
- Mantem fluxo de auth por e-mail, cache e JWT, agora com PIN numerico.
- Mantem regras de negocio fora dos controllers.
- Nao cria roles novas nem altera guards backend.
- Atualiza documentacao quando mudar fluxo de autenticacao, rotas, env vars e convencoes.

### Arquivos relevantes e dependentes

Backend:

- `milatec-backend/src/auth/auth.controller.ts`
- `milatec-backend/src/auth/auth.service.ts`
- `milatec-backend/src/auth/auth.module.ts`
- `milatec-backend/src/auth/dtos/login.dto.ts`
- `milatec-backend/src/auth/dtos/request-pin.dto.ts`
- `milatec-backend/src/auth/dtos/verify-pin.dto.ts`
- `milatec-backend/src/email/email.service.ts`
- `milatec-backend/src/email/templates/CodeEmailTemplate.hbs`
- `milatec-backend/src/audit/audit.types.ts`
- `milatec-backend/src/main.ts`
- `milatec-backend/documentos/techspec-codebase.md`

Frontend:

- `MilaTec-Frontend/JS/src/app/(other)/auth/login/page.jsx`
- `MilaTec-Frontend/JS/src/app/(other)/auth/login-pin/page.jsx`
- `MilaTec-Frontend/JS/src/app/(other)/auth/logout/page.jsx`
- `MilaTec-Frontend/JS/src/routes/index.jsx`
- `MilaTec-Frontend/JS/src/routes/router.jsx`
- `MilaTec-Frontend/JS/src/services/authApi.js`
- `MilaTec-Frontend/JS/src/services/authSession.js`
- `MilaTec-Frontend/JS/src/context/constants.js`
- `MilaTec-Frontend/JS/README.md`

Artefatos da funcionalidade:

- `MilaTec-Frontend/tasks/prd-login-pin/prd.md`
- `MilaTec-Frontend/tasks/prd-login-pin/techspec.md`
