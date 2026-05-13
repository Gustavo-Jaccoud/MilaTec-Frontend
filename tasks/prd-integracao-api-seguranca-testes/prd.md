# PRD: Integração de API, Segurança e Testes

## Visão Geral

Esta funcionalidade visa unificar a execução do sistema MilaTec através do Docker Compose, integrar o frontend com o backend de forma segura, reforçar a segurança do banco de dados e implementar uma suite completa de testes para garantir a confiabilidade do sistema.

O objetivo central é facilitar o desenvolvimento e deployment local, garantir que a autenticação e autorização funcionem corretamente em toda a aplicação, eliminar vulnerabilidades de segurança no frontend e backend, e estabelecer uma cultura de testes com cobertura unitária e de sobrecarga.

## Objetivos

- Unificar frontend e backend em um único docker-compose.yml para facilitar desenvolvimento e deployment
- Integrar endpoints do backend no frontend com autenticação JWT automática
- Implementar verificação de permissões baseada em roles para proteger funcionalidades
- Auditar e reforçar a segurança do banco de dados contra vulnerabilidades comuns
- Eliminar falhas de segurança no código frontend e backend
- Criar testes unitários para todos os endpoints principais
- Implementar testes de sobrecarga para validar performance sob carga

Métricas de sucesso:

- `docker-compose up` inicia frontend e backend sem erros
- Frontend consome APIs backend com token JWT automático
- Usuários só acessam funcionalidades permitidas pelo seu role
- Banco de dados validado contra SQL injection e outras vulnerabilidades
- Testes unitários com coverage mínimo de 80% em endpoints críticos
- Testes de sobrecarga documentam thresholds de performance

## Histórias de Usuário

- Como desenvolvedor, eu quero executar todo o sistema com um comando para facilitar desenvolvimento
- Como desenvolvedor, eu quero que o frontend inclua automaticamente o token JWT nas requisições ao backend
- Como usuário comum, eu quero acessar apenas funcionalidades permitidas ao meu role
- Como usuário admin, eu quero ter acesso a todas as funcionalidades administrativas
- Como gestor de segurança, eu quero garantir que o banco de dados está protegido contra ataques
- Como desenvolvedor, eu quero testes unitários para validar cada endpoint
- Como gestor de qualidade, eu quero testes de sobrecarga para garantir performance

## Funcionalidades Principais

### 1. Docker Compose Unificado

Requisitos funcionais:

1. Criar ou atualizar docker-compose.yml na raiz do projeto
2. Incluir serviço do frontend (Vite/React) com hot reload
3. Incluir serviço do backend (NestJS) com hot reload
4. Configurar rede compartilhada entre serviços
5. Configurar volumes para persistência de dados
6. Definir variáveis de ambiente para desenvolvimento
7. Validar que ambos serviços iniciam corretamente
8. Documentar comandos para build, up, down e logs

### 2. Integração de Autenticação no Frontend

Requisitos funcionais:

9. Criar serviço de API no frontend (axios ou fetch wrapper)
10. Implementar interceptor para incluir token JWT de sessionStorage em todas as requisições
11. Implementar interceptor para tratar erros 401/403 e redirecionar para login
12. Criar guards de rota para verificar presença de token em rotas protegidas
13. Implementar verificação de roles do token JWT
14. Criar componente HOC ou hook para verificar permissões por funcionalidade
15. Documentar como usar o serviço de API e guards nas páginas

### 3. Segurança do Banco de Dados

Requisitos funcionais:

16. Auditar estrutura atual do banco de dados e identificar vulnerabilidades
17. Implementar validações de entrada em todos os endpoints do backend
18. Remover dados sensíveis (senhas, tokens, etc) de respostas de API
19. Implementar sanitização de queries para evitar SQL injection
20. Configurar RBAC (Role-Based Access Control) no backend
21. Implementar rate limiting em endpoints sensíveis
22. Validar que dados sensíveis são criptografados no banco
23. Documentar medidas de segurança implementadas

### 4. Testes Unitários para Endpoints

Requisitos funcionais:

24. Criar testes unitários para todos os endpoints de autenticação
25. Criar testes unitários para endpoints de negócio principais
26. Implementar mocks para dependências externas (Airtable, etc)
27. Configurar Jest ou Vitest para execução de testes
28. Definir coverage mínimo de 80% para endpoints críticos
29. Criar fixtures de dados para testes consistentes
30. Documentar como executar testes e interpretar resultados

### 5. Testes de Sobrecarga (Load Testing)

Requisitos funcionais:

31. Escolher ferramenta de load testing (k6, Artillery ou similar)
32. Criar scripts de teste para endpoints principais (login, projetos, etc)
33. Definir thresholds de performance (tempo de resposta < 500ms, taxa de erro < 1%)
34. Configurar cenários de teste (usuarios simultâneos, ramp-up, etc)
35. Executar testes de sobrecarga em ambiente de desenvolvimento
36. Documentar resultados e identificar gargalos
37. Criar relatório de performance com recomendações

## Experiência do Desenvolvedor

Fluxo principal:

1. Desenvolvedor executa `docker-compose up` na raiz do projeto
2. Frontend e backend iniciam automaticamente
3. Desenvolvedor acessa frontend em http://localhost
4. Frontend faz requisições ao backend com token JWT automático
5. Permissões são verificadas automaticamente
6. Desenvolvedor executa `npm test` para rodar testes unitários
7. Desenvolvedor executa `npm run load-test` para testes de sobrecarga

## Restrições Técnicas de Alto Nível

- Docker Compose deve funcionar em Windows, Mac e Linux
- Frontend deve continuar usando Vite
- Backend deve continuar usando NestJS
- Token JWT deve continuar em sessionStorage
- Testes devem usar frameworks compatíveis com o projeto atual
- Ferramenta de load testing deve ser open-source
- Não deve quebrar funcionalidades existentes

## Fora de Escopo

- Migração para cloud providers (AWS, GCP, Azure)
- Implementação de CI/CD pipelines
- Monitoramento em produção (Prometheus, Grafana)
- Testes E2E automatizados (Cypress, Playwright)
- Refatoração completa da arquitetura
- Alteração do fluxo de autenticação existente

## Questões em Aberto

- Confirmar qual ferramenta de load testing usar (k6 ou Artillery)
- Definir endpoints críticos que devem ter coverage de 80%
- Confirmar se RBAC deve ser implementado via guards ou decorators no backend
- Definir thresholds específicos de performance por endpoint
- Confirmar se docker-compose deve incluir banco de dados ou usar externo

## Atribuições

- **Responsável**: Hugo Machado
- **Data de entrega**: Terça-feira, 13 de maio de 2026
- **Prioridade**: HIGH
