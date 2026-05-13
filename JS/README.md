# MilaTec Frontend

## Configuracao da API de autenticacao

O frontend usa `VITE_API_BASE_URL` como base das chamadas HTTP para o backend.
Em ambiente local, crie `JS/.env.local` com:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Endpoints usados pelo fluxo de login por e-mail e PIN:

- `POST /auth/request-pin` com corpo `{ "email": "usuario@empresa.com" }`
- `POST /auth/verify-pin` com corpo `{ "email": "usuario@empresa.com", "pin": "1234" }`

O token JWT e o e-mail pendente do fluxo de PIN sao armazenados em
`sessionStorage` pelas chaves `milatec:auth:accessToken` e
`milatec:auth:pendingEmail`. O fluxo novo nao deve salvar token em
`localStorage`.
