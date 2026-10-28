# EcoSoul API — Domain Driven Design Using Java | Sprint 4

API RESTful em **Spring Boot** que guarda os usuários da EcoSoul e as viagens de transporte público deles no **Oracle da FIAP**. É consumida pelo front-end React da pasta `../EcoSoul`.

## Modelo de dados

```text
T_ECO_USUARIO (1) ──────< (N) T_ECO_VIAGEM
  ID_USUARIO  PK               ID_VIAGEM        PK
  NM_USUARIO                   ID_USUARIO       FK -> T_ECO_USUARIO
  DS_EMAIL    UNIQUE           DS_ORIGEM
  DT_CADASTRO                  DS_DESTINO
                               TP_TRANSPORTE    CHECK (ONIBUS, METRO, TREM)
                               NR_DISTANCIA_KM  CHECK (> 0 e <= 500)
                               DT_VIAGEM
```

Um usuário pode ter várias viagens; cada viagem pertence a um usuário. Em Java, a classe `Viagem` tem um atributo `Usuario usuario` (associação).

## Tecnologias

| Ferramenta | Versão |
| --- | --- |
| Java (JDK) | 21 ou superior |
| Spring Boot | 4.1.2 |
| Maven | via Maven Wrapper (`mvnw`), não precisa instalar |
| Oracle JDBC (ojdbc17) | gerenciado pelo Spring Boot |
| IDE | IntelliJ IDEA ou VS Code |
| Deploy | Render (Docker) |

## Camadas

```text
src/main/java/br/com/fiap/ecosoul/
├── model/        Usuario, Viagem, TipoTransporte  -> entidades (tabelas T_ECO_USUARIO e T_ECO_VIAGEM)
├── connection/   ConnectionFactory                -> conexão JDBC com o Oracle
├── dao/          UsuarioDAO, ViagemDAO            -> CRUD em SQL
├── bo/           UsuarioBO, ViagemBO              -> validações e regras de negócio
├── resource/     UsuarioResource, ViagemResource  -> endpoints REST
├── exception/    ValidacaoException, RecursoNaoEncontradoException, ConflitoException,
│                 BancoDeDadosException, TratadorDeErros -> erros em JSON com status HTTP
└── config/       CorsFilter                       -> libera o acesso do front-end
```

Fluxo de uma requisição: **Resource → BO → DAO → ConnectionFactory → Oracle**.

## Endpoints

| Método | URI | Descrição | Corpo | Respostas |
| --- | --- | --- | --- | --- |
| GET | `/viagens` | Lista todas as viagens | — | 200, 500 |
| GET | `/viagens/{id}` | Busca uma viagem | — | 200, 400, 404, 500 |
| POST | `/viagens` | Cadastra uma viagem | Viagem sem `id` | 201, 400, 500 |
| PUT | `/viagens/{id}` | Atualiza uma viagem | Viagem sem `id` | 200, 400, 404, 500 |
| DELETE | `/viagens/{id}` | Exclui uma viagem | — | 204, 400, 404, 500 |
| GET | `/usuarios` | Lista todos os usuários | — | 200, 500 |
| GET | `/usuarios/{id}` | Busca um usuário | — | 200, 400, 404, 500 |
| GET | `/usuarios/{id}/viagens` | Lista as viagens de um usuário | — | 200, 400, 404, 500 |
| POST | `/usuarios` | Cadastra um usuário | `{ nome, email }` | 201, 400, 409, 500 |
| PUT | `/usuarios/{id}` | Atualiza um usuário | `{ nome, email }` | 200, 400, 404, 409, 500 |
| DELETE | `/usuarios/{id}` | Exclui um usuário sem viagens | — | 204, 400, 404, 409, 500 |

Exemplo de corpo de viagem:

```json
{
  "usuario": { "id": 1 },
  "origem": "Estação Sé",
  "destino": "FIAP Paulista",
  "transporte": "METRO",
  "distanciaKm": 4.5,
  "data": "2026-10-20"
}
```

Exemplo de erro:

```json
{ "status": 400, "erro": "Bad Request", "mensagem": "A data da viagem não pode estar no futuro." }
```

### Regras de negócio

**ViagemBO**
- O usuário é obrigatório e precisa existir.
- Origem e destino: obrigatórios, de 2 a 80 caracteres, e diferentes entre si.
- Transporte: `ONIBUS`, `METRO` ou `TREM`.
- Distância: maior que 0 e no máximo 500 km.
- Data: obrigatória e não pode estar no futuro.

**UsuarioBO**
- Nome de 3 a 100 caracteres e e-mail em formato válido.
- O e-mail não pode se repetir entre usuários (409).
- Um usuário que ainda tem viagens não pode ser excluído (409).

## Como rodar

1. No SQL Developer, conecte com seu usuário do Oracle FIAP e rode `sql/script.sql`.
2. Configure as variáveis de ambiente (a senha nunca vai no código):

   ```powershell
   # PowerShell
   $env:DB_USER = "rmXXXXXX"
   $env:DB_PASSWORD = "sua_senha"
   ```

   Também dá para guardar esses dados num arquivo `db.env` nesta pasta. Ele está no `.gitignore` e nunca vai para o GitHub.

   Opcional: `DB_URL` (padrão `jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL`).
3. Na pasta `EcoSoul-API`:

   ```bash
   ./mvnw spring-boot:run      # Windows: mvnw.cmd spring-boot:run
   ```

4. Acesse `http://localhost:8080/viagens` ou `http://localhost:8080/usuarios`.

No IntelliJ: **File → Open** na pasta `EcoSoul-API`, coloque as variáveis em **Run → Edit Configurations → Environment variables** e rode `EcoSoulApiApplication`.

## Deploy no Render

1. **New → Web Service**, conecte o repositório do GitHub.
2. **Root Directory:** `EcoSoul-API` · **Runtime:** Docker (usa o `Dockerfile` desta pasta).
3. Em **Environment**, cadastre `DB_USER` e `DB_PASSWORD`.
4. Depois do deploy, a URL fica parecida com `https://ecosoul-api.onrender.com`. Coloque essa URL na variável `VITE_API_URL` do front-end na Vercel.

No plano gratuito, o Render "dorme" depois de um tempo sem uso, e a primeira requisição pode levar uns 50 segundos.

## Links

| Item | Link |
| --- | --- |
| API publicada | **A PREENCHER** |
| Front-end (Vercel) | **A PREENCHER** |
| Repositório | [github.com/Giovanni0403/Challenge_SoulUp](https://github.com/Giovanni0403/Challenge_SoulUp) |
