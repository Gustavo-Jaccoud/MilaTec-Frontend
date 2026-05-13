# Tarefa 1.0: Documentar passo a passo para rodar backend e frontend localmente

<critical>Esta tarefa nao tem prd.md/techspec.md dedicados. O contexto vem do PRD/techspec da feature `prd-login-pin` (login por e-mail e PIN), que e o fluxo a ser testado por quem seguir o documento gerado.</critical>

## Visao Geral

<complexity>LOW</complexity>

Criar um documento operacional detalhado que permita a um desenvolvedor (ou tester) iniciar do zero o backend (`milatec-backend`) e o frontend (`MilaTec-Frontend/JS`) e executar manualmente o fluxo completo de login por e-mail e PIN, incluindo cenarios de erro. O documento deve ser autocontido, claro o suficiente para um desenvolvedor junior e cobrir variaveis de ambiente, instalacao, execucao, roteiro de teste manual, comandos de testes automatizados e troubleshooting.

<requirements>
- Inventariar TODAS as variaveis de ambiente reais lidas pelo backend (JWT, Airtable, SMTP, banco de auditoria, porta, etc.) inspecionando o codigo, sem inventar nomes.
- Inventariar a unica variavel relevante do frontend (`VITE_API_BASE_URL`) e qualquer outra eventual lida pelo Vite.
- Documentar instalacao em ambos os repos (`npm install`).
- Documentar como subir o backend (`npm run start:dev`) e como subir o frontend (`npm run dev`), com URLs e portas reais.
- Documentar roteiro de teste manual do fluxo: abrir o frontend -> redirecionamento para `/auth/login` -> informar e-mail ativo -> receber PIN no e-mail -> informar PIN em `/auth/login-pin` -> validar token em `sessionStorage` -> chegar em `/dashboard` -> testar logout.
- Documentar cenarios negativos: e-mail inativo/inexistente, PIN incorreto, PIN expirado, 3 tentativas esgotadas, cooldown de reenvio.
- Documentar comandos de testes automatizados de backend e frontend.
- Documentar troubleshooting comum: CORS entre origens, SMTP offline, Airtable rate-limit/credencial invalida, build do template (`sparklines`) falhando, ausencia de `.env`.
- O documento deve ser salvo em local visivel para o usuario final do repositorio (sugestao: `docs/HOW-TO-RUN.md` no root do workspace ou atualizar `README.md` de cada repo apontando para ele).
- Nao expor segredos reais; usar placeholders e instrucoes para preencher.
</requirements>

## Subtarefas

- [x] 1.1 Mapear variaveis de ambiente do backend (grep por `process.env`/`ConfigService.get`/`@nestjs/config`) e listar nomes, tipo, obrigatoriedade e exemplo.
- [x] 1.2 Mapear variaveis de ambiente do frontend (`import.meta.env`) e listar.
- [x] 1.3 Escrever secao "Pre-requisitos" (Node.js versao, npm, acesso a Airtable, conta SMTP, JWT secret).
- [x] 1.4 Escrever secao "Configuracao de ambiente" com `.env.example` para backend e `.env` para frontend.
- [x] 1.5 Escrever secao "Instalacao e execucao" para backend e frontend.
- [x] 1.6 Escrever roteiro "Teste manual do fluxo de login por PIN" cobrindo caminho feliz e cenarios negativos.
- [x] 1.7 Escrever secao "Testes automatizados" com comandos reais de cada repo.
- [x] 1.8 Escrever secao "Troubleshooting" cobrindo problemas conhecidos (CORS, SMTP, Airtable, build do template).
- [x] 1.9 Validar com checklist: um dev junior consegue do zero (a) subir backend, (b) subir frontend, (c) executar fluxo de login? Ajustar lacunas encontradas.

## Detalhes de Implementacao

Referencias para construir o documento:

- Fluxo da feature: `MilaTec-Frontend/tasks/prd-login-pin/prd.md` e `MilaTec-Frontend/tasks/prd-login-pin/techspec.md`.
- Codigo backend de referencia: `milatec-backend/src/auth/`, `milatec-backend/src/email/`, `milatec-backend/src/main.ts`, `milatec-backend/package.json`.
- Codigo frontend de referencia: `MilaTec-Frontend/JS/src/services/authApi.js`, `MilaTec-Frontend/JS/src/services/authSession.js`, `MilaTec-Frontend/JS/src/routes/`, `MilaTec-Frontend/JS/package.json`.
- Relatorio com bloqueios conhecidos: `MilaTec-Frontend/tasks/prd-login-pin/validation-report.md`.

Saida esperada: arquivo unico de documentacao (markdown) usavel como guia ponta a ponta. Nao implementar codigo nem alterar `.env` reais.

## Criterios de Sucesso

- Documento existe em local acordado (sugestao: `docs/HOW-TO-RUN.md`) e esta em portugues.
- Todas as variaveis de ambiente reais usadas pelo backend e frontend estao listadas com nome exato (igual ao codigo) e exemplo.
- Roteiro de teste manual cobre caminho feliz + 5 cenarios negativos descritos no PRD.
- Comandos exatos para instalacao, execucao e testes estao copiaveis e funcionam quando executados.
- Secao de troubleshooting cobre os bloqueios conhecidos do `validation-report.md`.
- Um dev junior consegue executar o fluxo seguindo apenas o documento, sem perguntar.

## Testes da Tarefa

- [x] Teste de revisao: ler o documento ponta a ponta e marcar cada passo executado em ambiente limpo (ou container) - todos os passos devem funcionar como descritos.
- [x] Teste de cobertura de variaveis: comparar lista do documento com `grep -RE "process.env|ConfigService.get" milatec-backend/src` e `grep -R "import.meta.env" MilaTec-Frontend/JS/src` - nao pode haver variavel real fora do documento.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `docs/HOW-TO-RUN.md` (a ser criado)
- `milatec-backend/package.json`
- `milatec-backend/src/main.ts`
- `milatec-backend/src/auth/`
- `MilaTec-Frontend/JS/package.json`
- `MilaTec-Frontend/JS/src/services/authApi.js`
- `MilaTec-Frontend/JS/src/routes/`
- `MilaTec-Frontend/tasks/prd-login-pin/prd.md`
- `MilaTec-Frontend/tasks/prd-login-pin/techspec.md`
- `MilaTec-Frontend/tasks/prd-login-pin/validation-report.md`
