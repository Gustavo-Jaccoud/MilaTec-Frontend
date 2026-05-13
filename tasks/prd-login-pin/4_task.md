# Tarefa 4.0: Adaptar tela de login por e-mail

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>MEDIUM</complexity>

Reutilizar a tela existente `/auth/login` para remover senha e acoes fora de escopo, validar e-mail, solicitar PIN e navegar para a tela de PIN mantendo a identidade visual atual.

<requirements>
- Reutilizar `JS/src/app/(other)/auth/login/page.jsx`.
- Exibir apenas campo de e-mail e botao para solicitar PIN.
- Remover senha, lembrar de mim, cadastro e recuperacao de senha.
- Validar formato de e-mail antes de chamar o backend.
- Chamar `requestPin(email)` da camada criada na tarefa 3.0.
- Em sucesso, salvar e-mail pendente e navegar para `/auth/login-pin`.
- Exibir exatamente `Email nao cadastrado ou inativo` quando esta mensagem for retornada pelo backend.
- Exibir estado de carregamento e bloquear duplo submit.
- Manter logos, componentes do template e estilo visual atual.
- Garantir labels/nomes acessiveis e feedback de erro associado ao campo.
</requirements>

## Subtarefas

- [x] 4.1 Ler `prd.md`, `techspec.md` e revisar a implementacao atual de `/auth/login`.
- [x] 4.2 Remover campos e links fora de escopo mantendo layout, logos e componentes existentes.
- [x] 4.3 Implementar estado controlado de e-mail, validacao de formato e feedback acessivel antes do submit.
- [x] 4.4 Integrar `requestPin(email)` e tratar loading, sucesso e erro.
- [x] 4.5 Salvar e-mail pendente via `authSession` e navegar para `/auth/login-pin` em caso de sucesso.
- [x] 4.6 Garantir que usuario ja autenticado seja redirecionado conforme a estrategia definida com os route guards.
- [x] 4.7 Criar e executar testes unitarios de renderizacao, validacao local, loading e erro.
- [x] 4.8 Criar e executar teste de integracao da tela com `authApi` mockado e navegacao para PIN.

## Detalhes de Implementacao

Dependencias: depende da tarefa 3.0. Pode ser implementada antes do backend estar rodando, desde que use mocks de `authApi` nos testes.

Consulte em `techspec.md` as secoes "Frontend `LoginPage`", "Frontend API", "Frontend session", "Route guards" e "Abordagem de Testes".

## Criterios de Sucesso

- A tela `/auth/login` mostra somente e-mail e acao de solicitar PIN.
- E-mail invalido nao chama a API e mostra erro local claro.
- E-mail valido chama `requestPin` uma vez por submit.
- Durante loading, o botao fica desabilitado e a interface evita duplo envio.
- Sucesso salva o e-mail pendente e navega para `/auth/login-pin`.
- Erro de e-mail inexistente/inativo exibe exatamente `Email nao cadastrado ou inativo`.
- Testes unitarios e de integracao da tarefa passam.

## Testes da Tarefa

- [x] Testes de unidade: renderizacao sem senha, validacao de e-mail, estado loading, erro local e erro retornado pela API.
- [x] Testes de integracao: submit com `requestPin` mockado, persistencia do e-mail pendente e navegacao para `/auth/login-pin`.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `JS/src/app/(other)/auth/login/page.jsx`
- `JS/src/services/authApi.js`
- `JS/src/services/authSession.js`
- `JS/src/routes/router.jsx`
- `tasks/prd-login-pin/prd.md`
- `tasks/prd-login-pin/techspec.md`
