# Tech Spec: Integração de API, Segurança e Testes

## Visão Geral

Este documento define as especificações técnicas para implementar a funcionalidade de integração de API no Docker Compose, autenticação JWT no frontend, segurança do banco de dados e testes unitários e de sobrecarga.

## Arquitetura

### Estrutura de Pastas

```
milatec/
├── docker-compose.yml (novo - unificado)
├── MilaTec-Frontend/
│   └── JS/
│       ├── src/
│       │   ├── services/
│       │   │   └── apiService.js (novo - wrapper de API com JWT)
│       │   ├── hooks/
│       │   │   └── useAuth.js (novo - hook de autenticação)
│       │   └── components/
│       │       └── guards/
│       │           └── ProtectedRoute.jsx (novo - guard de rota)
│       └── tests/
│           ├── unit/ (novo - testes unitários)
│           └── load/ (novo - scripts de load testing)
└── milatec-backend/
    ├── src/
    │   ├── auth/
    │   │   ├── guards/ (novo - guards de RBAC)
    │   │   └── decorators/ (novo - decorators de permissão)
    │   └── database/
    │       └── validators/ (novo - validadores de segurança)
    └── tests/ (novo - testes unitários)
```

## 1. Docker Compose Unificado

### 1.1 docker-compose.yml

**Localização**: Raiz do projeto `c:/milatec/docker-compose.yml`

**Estrutura**:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./MilaTec-Frontend/JS
      dockerfile: Dockerfile
    container_name: milatec-frontend
    ports:
      - "5173:5173"
    volumes:
      - ./MilaTec-Frontend/JS:/app
      - /app/node_modules
    environment:
      - VITE_API_BASE_URL=http://localhost:3000
    command: npm run dev
    depends_on:
      - backend
    networks:
      - milatec-network

  backend:
    build:
      context: ./milatec-backend
      dockerfile: Dockerfile
    container_name: milatec-backend
    ports:
      - "3000:3000"
    volumes:
      - ./milatec-backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_HOST=postgres
      - DATABASE_PORT=5432
      - DATABASE_NAME=milatec
      - DATABASE_USER=milatec_user
      - DATABASE_PASSWORD=milatec_password
      - JWT_SECRET=your_jwt_secret_here
      - JWT_EXPIRATION=1h
    command: npm run start:dev
    depends_on:
      - postgres
    networks:
      - milatec-network

  postgres:
    image: postgres:16-alpine
    container_name: milatec-postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=milatec
      - POSTGRES_USER=milatec_user
      - POSTGRES_PASSWORD=milatec_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U milatec_user -d milatec']
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - milatec-network

networks:
  milatec-network:
    driver: bridge

volumes:
  postgres_data:
```

### 1.2 Dockerfile Frontend

**Localização**: `c:/milatec/MilaTec-Frontend/JS/Dockerfile`

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### 1.3 Dockerfile Backend

**Localização**: `c:/milatec/milatec-backend/Dockerfile`

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
```

## 2. Integração de Autenticação no Frontend

### 2.1 apiService.js

**Localização**: `c:/milatec/MilaTec-Frontend/JS/src/services/apiService.js`

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir token JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros 401/403
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('jwt_token');
      window.location.href = '/auth/login';
    }
    if (error.response?.status === 403) {
      window.location.href = '/unauthorized';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 2.2 useAuth Hook

**Localização**: `c:/milatec/MilaTec-Frontend/JS/src/hooks/useAuth.js`

```javascript
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('jwt_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
        setRole(payload.role);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token:', error);
        sessionStorage.removeItem('jwt_token');
      }
    }
  }, []);

  const hasPermission = (requiredRole) => {
    if (!role) return false;
    const roleHierarchy = {
      'admin': 3,
      'manager': 2,
      'user': 1
    };
    return roleHierarchy[role] >= roleHierarchy[requiredRole];
  };

  return { isAuthenticated, user, role, hasPermission };
};
```

### 2.3 ProtectedRoute Component

**Localização**: `c:/milatec/MilaTec-Frontend/JS/src/components/guards/ProtectedRoute.jsx`

```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && !hasPermission(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

## 3. Segurança do Banco de Dados

### 3.1 Validadores de Entrada

**Localização**: `c:/milatec/milatec-backend/src/database/validators/`

**Exemplo de validator**:

```typescript
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
```

### 3.2 RBAC Guards no Backend

**Localização**: `c:/milatec/milatec-backend/src/auth/guards/role.guard.ts`

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    const roleHierarchy = {
      'admin': 3,
      'manager': 2,
      'user': 1
    };

    return requiredRoles.some(role => 
      roleHierarchy[user.role] >= roleHierarchy[role]
    );
  }
}
```

### 3.3 Decorator de Roles

**Localização**: `c:/milatec/milatec-backend/src/auth/decorators/roles.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

## 4. Testes Unitários

### 4.1 Testes de Autenticação

**Localização**: `c:/milatec/milatec-backend/tests/auth/auth.service.test.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should request PIN successfully', async () => {
    const result = await service.requestPin({ email: 'test@example.com' });
    expect(result).toHaveProperty('message', 'PIN sent successfully');
  });

  it('should verify PIN correctly', async () => {
    const result = await service.verifyPin({ 
      email: 'test@example.com', 
      pin: '1234' 
    });
    expect(result).toHaveProperty('token');
  });
});
```

### 4.2 Testes de Endpoints de Negócio

**Localização**: `c:/milatec/milatec-backend/tests/projects/projects.controller.test.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from '../src/projects/projects.controller';
import { ProjectsService } from '../src/projects/projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ProjectsService],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should return projects array', async () => {
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
  });
});
```

## 5. Testes de Sobrecarga

### 5.1 Script k6 para Login

**Localização**: `c:/milatec/MilaTec-Frontend/JS/tests/load/login-test.js`

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 users
    { duration: '1m', target: 10 },   // Stay at 10 users
    { duration: '20s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
  },
};

export default function () {
  const payload = JSON.stringify({
    email: 'test@example.com',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post('http://localhost:3000/auth/request-pin', payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

### 5.2 Script k6 para Projetos

**Localização**: `c:/milatec/MilaTec-Frontend/JS/tests/load/projects-test.js`

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up to 20 users
    { duration: '2m', target: 20 },   // Stay at 20 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests < 1s
    http_req_failed: ['rate<0.02'],    // Error rate < 2%
  },
};

const token = __ENV.TOKEN || 'test_token';

export default function () {
  const params = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const res = http.get('http://localhost:3000/projects', params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'has projects array': (r) => JSON.parse(r.body).data instanceof Array,
  });

  sleep(1);
}
```

## Comandos Úteis

### Docker Compose
```bash
# Iniciar todos os serviços
docker-compose up

# Iniciar em background
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f

# Reconstruir containers
docker-compose up --build
```

### Testes Unitários
```bash
# Backend
cd milatec-backend
npm test

# Frontend
cd MilaTec-Frontend/JS
npm run test:ui
```

### Testes de Sobrecarga
```bash
# Instalar k6 (se necessário)
# Linux/Mac: brew install k6
# Windows: choco install k6

# Executar teste de login
k6 run MilaTec-Frontend/JS/tests/load/login-test.js

# Executar teste de projetos (com token)
TOKEN=your_token_here k6 run MilaTec-Frontend/JS/tests/load/projects-test.js
```

## Dependências

### Frontend
- `axios` (já existe)
- `react-router-dom` (já existe)

### Backend
- `@nestjs/common` (já existe)
- `@nestjs/jwt` (já existe)
- `class-validator` (já existe)
- `class-transformer` (já existe)

### Testes
- `@nestjs/testing` (já existe)
- `jest` (já existe)
- `vitest` (já existe no frontend)
- `k6` (nova dependência para load testing)

## Considerações de Segurança

1. **Token JWT**: Armazenado em sessionStorage (não localStorage)
2. **HTTPS**: Recomendado para produção
3. **Rate Limiting**: Implementar no backend
4. **Sanitização**: Validar todas as entradas
5. **Criptografia**: Senhas criptografadas no banco
6. **Logs**: Não logar dados sensíveis
7. **CORS**: Configurar origens permitidas
8. **Env Vars**: Usar variáveis de ambiente para secrets

## Critérios de Aceite

- [ ] `docker-compose up` inicia frontend e backend sem erros
- [ ] Frontend inclui token JWT em todas as requisições ao backend
- [ ] Usuários sem token são redirecionados para login
- [ ] Usuários com role incorreto recebem 403
- [ ] Banco de dados validado contra SQL injection
- [ ] Testes unitários com coverage >= 80% em endpoints críticos
- [ ] Testes de sobrecarga executados e documentados
- [ ] Documentação atualizada com comandos úteis
