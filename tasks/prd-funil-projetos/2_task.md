# Tarefa 2.0: Criar camada frontend de integracao com API protegida de projetos

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se voce nao ler esses arquivos sua tarefa sera invalidada</critical>

## Visao Geral

<complexity>MEDIUM</complexity>
<priority>HIGH</priority>

Criar a camada de frontend responsavel por consumir a API protegida de projetos, enviando token JWT, tratando erros e normalizando os campos do Airtable para um modelo estavel usado pelo funil.

<requirements>
- Ler `prd.md` e `techspec.md`.
- Criar servico dedicado para chamadas de projetos.
- Usar `VITE_API_BASE_URL` de forma consistente com os servicos existentes.
- Enviar `Authorization: Bearer <token>` em chamadas protegidas.
- Implementar chamada de listagem geral de projetos.
- Implementar chamada com filtro opcional de etapa do negocio.
- Normalizar campos acentuados e nomes vindos do Airtable.
- Tratar erros de API com mensagens uteis para a UI.
- Cobrir o servico e os mappers com testes.
</requirements>

## Subtarefas

- [ ] 2.1 Ler `prd.md`, `techspec.md`, `authSession`, `authApi` e testes de servicos existentes.
- [ ] 2.2 Criar `projectApi` com helper de fetch autenticado para `/project`.
- [ ] 2.3 Implementar suporte a query string de etapa do negocio.
- [ ] 2.4 Criar mapper para normalizar campos do Airtable em um modelo de projeto do funil.
- [ ] 2.5 Padronizar estados de erro para 401/403, erro de rede e erro de contrato.
- [ ] 2.6 Criar testes unitarios do `projectApi` cobrindo token, URL, query string e erros.
- [ ] 2.7 Criar testes unitarios do mapper cobrindo campos com acentos, arrays e valores ausentes.

## Detalhes de Implementacao

Dependencias: depende da tarefa 1.0 para contrato final da API. Pode ser iniciada em paralelo se forem usados mocks alinhados a `techspec.md`.

Consulte em `techspec.md` as secoes "Frontend", "Modelo normalizado" e "Abordagem de Testes".

## Criterios de Sucesso

- O frontend possui um ponto unico para consumir projetos.
- Todas as chamadas de projetos enviam token quando disponivel.
- O filtro de etapa e refletido corretamente na URL.
- A UI recebe um modelo sem depender de nomes brutos do Airtable.
- Testes do servico e mapper passam.

## Testes da Tarefa

- [ ] Testes de unidade: `projectApi` com token, sem token, filtro por etapa e erros HTTP.
- [ ] Testes de unidade: mapper de projeto com payload completo, payload parcial e campos ausentes.
- [ ] Testes de integracao leve: componente consumidor usando mock do servico quando aplicavel.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERA-LA FINALIZADA</critical>

## Arquivos relevantes

- `JS/src/services/authSession.js`
- `JS/src/services/authApi.js`
- `JS/src/services/projectApi.js`
- `JS/src/services/projectApi.test.js`
- `JS/src/app/(admin)/apps/Projects/page.jsx`
- `tasks/prd-funil-projetos/prd.md`
- `tasks/prd-funil-projetos/techspec.md`
