# PRD: Login por E-mail e PIN

## Visao Geral

Esta funcionalidade substitui o login tradicional por senha por um fluxo de autenticacao em duas etapas baseado em e-mail e PIN numerico. O usuario informa o e-mail, o sistema verifica se existe um usuario ativo na base, envia um PIN de 4 digitos por e-mail e permite o acesso somente apos validacao correta do PIN.

O objetivo e aproveitar as telas e componentes ja existentes no template frontend (`/auth/login` e `/auth/login-pin`) e alinhar o backend NestJS para expor endpoints separados de solicitacao e validacao do PIN. A experiencia deve ser simples, responsiva e consistente com a identidade visual atual do template.

## Objetivos

- Reduzir friccao de login removendo senha, cadastro, recuperacao de senha e "lembrar de mim".
- Validar acesso apenas para e-mails existentes e ativos na base operacional.
- Enviar PIN numerico de 4 digitos por e-mail com validade de 2 minutos e 30 segundos.
- Bloquear ou invalidar a tentativa apos 3 PINs incorretos.
- Permitir reenvio do PIN com cooldown de 1 minuto.
- Armazenar o JWT em `sessionStorage` apos autenticacao bem-sucedida.
- Redirecionar usuario autenticado para `/dashboard`.
- Proteger rotas privadas do frontend contra acesso sem token valido.

Metricas de sucesso:

- Usuario consegue concluir o login com e-mail valido e PIN correto.
- Usuario nao consegue acessar `/dashboard` sem autenticacao.
- Usuario recebe mensagem clara quando e-mail nao existe ou esta inativo.
- Fluxo de PIN rejeita codigos expirados, incorretos e excesso de tentativas.

## Historias de Usuario

- Como usuario ativo da MilaTec, eu quero informar meu e-mail para receber um PIN e acessar o sistema sem senha.
- Como usuario ativo, eu quero digitar o PIN recebido no e-mail para concluir o login com seguranca.
- Como usuario que digitou um e-mail inexistente ou inativo, eu quero receber uma mensagem clara para entender por que nao avancei.
- Como usuario que nao recebeu o PIN, eu quero reenviar o codigo depois de aguardar o cooldown.
- Como usuario autenticado, eu quero ser redirecionado para o dashboard sem repetir o login durante a mesma sessao.
- Como usuario nao autenticado, eu nao devo conseguir acessar rotas internas do sistema.

## Funcionalidades Principais

### 1. Tela de e-mail

Reutilizar a pagina existente `src/app/(other)/auth/login/page.jsx` como base visual, removendo senha, lembrar de mim, cadastro e recuperacao de senha.

Requisitos funcionais:

1. A tela deve exibir apenas o campo de e-mail e o botao para solicitar PIN.
2. O campo de e-mail deve validar formato antes de enviar a requisicao.
3. Ao submeter e-mail valido, o frontend deve chamar endpoint especifico de solicitacao de PIN.
4. Se o backend retornar sucesso, o usuario deve ir para a tela de PIN.
5. Se o e-mail nao existir ou estiver inativo, deve exibir exatamente: `Email nao cadastrado ou inativo`.
6. A tela deve manter os logos e estilo atuais do template.

### 2. Tela de PIN

Reutilizar a pagina existente `src/app/(other)/auth/login-pin/page.jsx`, adaptando de 6 campos para 4 campos e substituindo qualquer texto de telefone por e-mail.

Requisitos funcionais:

7. A tela deve exibir 4 campos de entrada, cada um aceitando apenas um digito numerico.
8. O usuario deve poder colar um PIN de 4 digitos e preencher os campos automaticamente.
9. O usuario deve poder apagar e navegar entre campos de forma previsivel.
10. Ao preencher os 4 digitos, o usuario deve poder confirmar o PIN.
11. O frontend deve chamar endpoint especifico de validacao de PIN com e-mail e PIN.
12. Ao validar com sucesso, o JWT retornado deve ser salvo em `sessionStorage`.
13. Apos salvar o token, o usuario deve ser redirecionado para `/dashboard`.
14. Se o PIN estiver incorreto, expirado ou exceder tentativas, a tela deve exibir feedback claro.

### 3. Reenvio de PIN

Requisitos funcionais:

15. A tela de PIN deve oferecer acao para reenviar o PIN.
16. O reenvio so deve ficar disponivel apos cooldown de 1 minuto.
17. Durante o cooldown, a interface deve indicar que o usuario precisa aguardar.
18. Reenviar PIN deve invalidar ou substituir o PIN anterior, conforme regra definida no backend.

### 4. Backend de autenticacao por PIN

O backend deve evoluir o fluxo atual de `POST /auth/login` para endpoints separados.

Requisitos funcionais:

19. Deve existir um endpoint para solicitar PIN por e-mail.
20. Deve existir um endpoint para validar PIN e emitir JWT.
21. O PIN deve conter exatamente 4 digitos numericos.
22. O PIN deve expirar em 2 minutos e 30 segundos.
23. O backend deve permitir no maximo 3 tentativas invalidas por solicitacao de PIN.
24. O backend deve aplicar cooldown de 1 minuto para reenvio.
25. O backend deve retornar erro quando o e-mail nao existir ou usuario estiver inativo.
26. O backend deve preservar auditoria de sucesso e falha de login.
27. O JWT deve manter os dados necessarios para guards, auditoria e dashboard.

### 5. Protecao de rotas frontend

Requisitos funcionais:

28. Rotas administrativas devem exigir token no `sessionStorage`.
29. Usuario sem token deve ser redirecionado para `/auth/login`.
30. Usuario autenticado que acessar telas de login deve ser redirecionado para `/dashboard`.
31. O logout deve remover o token do `sessionStorage`.

## Experiencia do Usuario

Fluxo principal:

1. Usuario acessa `/auth/login`.
2. Informa e-mail.
3. Sistema valida e envia PIN.
4. Usuario e direcionado para `/auth/login-pin`.
5. Usuario informa PIN de 4 digitos.
6. Sistema valida, salva token e redireciona para `/dashboard`.

Estados esperados:

- Carregando ao solicitar PIN.
- Carregando ao validar PIN.
- Erro de e-mail nao cadastrado ou inativo.
- Erro de PIN invalido.
- Erro de PIN expirado.
- Erro por excesso de tentativas.
- Cooldown visivel no reenvio.

Requisitos de acessibilidade:

- Campos devem ter labels ou nomes acessiveis.
- Feedback de erro deve ser associado aos campos relevantes.
- Fluxo de PIN deve funcionar por teclado.
- Botoes devem indicar estado desabilitado durante carregamento ou cooldown.

## Restricoes Tecnicas de Alto Nivel

- Reutilizar paginas de auth existentes antes de criar novas telas.
- Reutilizar componentes do template frontend, especialmente React Bootstrap e componentes internos.
- Manter identidade visual atual do template.
- Backend deve continuar em NestJS e preservar padroes documentados em `documentos/techspec-codebase.md`.
- A fonte operacional de usuarios continua sendo Airtable.
- O token autenticado deve ser armazenado no `sessionStorage`.
- O PRD cobre frontend e backend.
- O backend deve manter eventos de auditoria para solicitacao, falha e sucesso de login quando aplicavel.

## Fora de Escopo

- Cadastro de novos usuarios.
- Login por senha.
- Recuperacao de senha.
- Lembrar de mim.
- Persistencia de sessao em `localStorage`.
- Autenticacao por telefone ou SMS.
- Alteracao da identidade visual principal do template.
- Criacao de dashboard novo.
- Regras avancadas de permissao por perfil alem da protecao de rotas pos-login.

## Questoes em Aberto

- Definir nomes finais dos endpoints separados na Tech Spec.
- Definir se o reenvio invalida imediatamente o PIN anterior ou apenas substitui o valor em cache.
- Definir a mensagem exata para PIN expirado, PIN invalido e excesso de tentativas.
- Definir se a expiracao do JWT atual do backend permanece em 1 hora.
