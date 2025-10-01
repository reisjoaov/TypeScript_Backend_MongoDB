# Procedimento para iniciar
Para visualizar melhor este arquivo aperte ctrl + shit + v

# Objetivo

A API realiza as operações CRUD de um sistema de controle de cadastros de usuários e livros através de métodos HTTP.
O banco de dados utilizado no projeto é MongoDB, através do ODM Mongoose.

## Dependências para este projeto
As seguintes versões foram utilizadas neste projeto:

- node@24.5.0
- npm@11.5.1
- mongodb@6.20.0"
- mongoose@8.18.2"

## Instalação inicial do projeto
1. Os arquivos package.json e tsconfig.json já estão pré configurados, instale as dependências necessárias com o comando abaixo no terminal:

```bash
npm i
```

## Configurações

### Debugger

1. Rode o script de build para criar os arquivos de produção (o debugger precisa dele para rodar):

```bash
npm run build
```

### Variável de ambiente

1. É necessário configurar o arquivo de variáveis de  ambiente. Para isso renomeie o arquivo ".env-example" para ".env".

2. Substituia o campo "MONGO_DB_KEY" pela chave de conexão do seu banco de dados MongoDB e o atributo "appName" do campo DB_OPTIONS pelo nome do seu Cluster

```env
API_KEY=X
MONGO_DB_KEY=mongodb+srv://<SeuUsuario>:<SuaSenha>@cluster0.oc26dee.mongodb.net/
DATABASE=tsmongo
DB_OPTIONS=retryWrites=true&w=majority&appName=Cluster0
```


## Executando o código

1. Rode o script de dev para executar o servidor na porta http://localhost:3000

```bash
npm run dev
```

## Executando endpoints de usuários

Todos os endpoints são protegidos por uma senha de acesso. Para executá-los é necessário inserir as credenciais abaixo na aba de autorização do Postman:

```bash
Username: UsuarioValido
Password: SenhaValida
```

1. Consulta de todos usuários

O primeiro endpoint busca todos os produtos registrados em nosso banco de dados. Para isso fazer um request de método GET no endereço:

```bash
localhost:3000/api/usuarios/
```

2. Consulta de um usuário por Id

O segundo endpoint busca um único usuário baseado em seu id. Para isso fazer um request de método GET no endereço localhost:3000/api/usuarios/id. Exemplo:

```bash
localhost:3000/api/usuarios/123
```

3. Deleta usuário por Id

O terceiro endpoint apaga um único usuário baseado em seu id. Para isso fazer um request de método DELETE no endereço localhost:3000/api/produtos/id. Exemplo:

```bash
localhost:3000/api/usuarios/123
```

4. Atualiza usuário por Id

O quarto endpoint atualiza uma ou mais propriedades de um único usuário baseado em seu id. Para isso fazer um request de método PATCH no endereço localhost:3000/api/produtos/id. Exemplo:

```bash
localhost:3000/api/produtos/123
```

Para indicar quais propriedades serão alteradas é necessário informar no body da requisição, em formato RAW JSON. Segue exemplo para alterar as informações de preço e catergoria de um produto:

```bash
{
    "nome": "Pedro",
    "ativo": "false"
}
```

5. Cria usuário

O quinto endpoint cria um novo usuário e o adiciona ao banco de dados. Para isso fazer um request de método POST no endereço localhost:3000/api/usuarios/. Exemplo:

```bash
localhost:3000/api/usuarios
```

```bash
 {
    "nome": "Rafaela",
    "ativo": "true",
    "saldo": 250
 }
```

## Executando endpoints de livros

1. Consulta de todos livros

O primeiro endpoint busca todos os livros registrados em nosso banco de dados. Para isso fazer um request de método GET no endereço:

```bash
localhost:3000/api/livros/
```

2. Adicionar um autor ao livro

O segundo endpoint relaciona um usuário do banco dados como autor de um livro, também cadastro no banco de dados. Para isso fazer um request de método PATCH no endereço localhost:3000/api/usuarios/id. Exemplo:

É necessário informar no body da requisição, em formato RAW JSON o Id do usuário autor e o nome do livro. Segue exemplo:

```bash
{
    "userId": 123,
    "bookData": {
        "nome": "Codigo Limpo"
    }
}
```

3. Deleta um livro por Id

O terceiro endpoint apaga um único livro baseado em seu objectId gerado pelo MongoDB. Para isso fazer um request de método DELETE no endereço localhost:3000/api/produtos/id. Exemplo:

```bash
localhost:3000/api/livros/68c75a4de842eb959ec16f0d
```

4. Cria um livro

O quarto e último endpoint cria um novo livro e o adiciona ao banco de dados. Para isso fazer um request de método POST no endereço localhost:3000/api/livros/. Exemplo:

```bash
localhost:3000/api/livros/
```

```bash
 {
    "nome": "Codigo limpo"
 }
```