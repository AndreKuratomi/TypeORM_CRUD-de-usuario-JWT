## TypeORM_CRUD-de-usuario-JWT

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Termos de uso](#termos-de-uso)
- [Referências](#referências)

<br>

# Descrição

<p><b>TypeORM_CRUD-de-usuario-JWT</b> é uma aplicação de gerenciamento de usuários com endpoints de pedem autenticação com token. Esta aplicação utiliza o ambiente de execução Node.js e o framework Express.js, além do ORM TypeORM e a plataforma Docker.</p>
<br>

# Instalação

<h5>0. Primeiramente, é necessário já ter instalado na própria máquina:</h5>

- <p> Um <b>editor de código</b>, conhecido também como <b>IDE</b>. Por exemplo, o <b>[Visual Studio Code (VSCode)](https://code.visualstudio.com/)</b>.</p>

- <p> Uma <b>ferramenta cliente de API REST</b>. Por exemplo, o <b>[Insomnia](https://insomnia.rest/download)</b> ou o <b>[Postman](https://www.postman.com/product/rest-client/)</b>.</p>

- <p> E versionar o diretório para receber o clone da aplicação:</p>

```
git init
```

<br>
<h5>1. Fazer o clone do reposítório <span style="text-decoration: underline">Users service</span> na sua máquina pelo terminal do computador ou pelo do IDE:</h5>

```
git clone git@gitlab.com:ABKURA/typeorm-crud-de-usuario-jwt.git
```

<p>Entrar na pasta criada:</p>

```
cd typeorm-crud-de-usuario-jwt
```

<p>Instalar as dependências:</p>

```
yarn
```

<p><b>Obs:</b> caso não tenha o gerenciador de pacotes <b>yarn</b> instalar desta maneira:</p>

```
npm install --global yarn
```

<p>E rodar a aplicação:</p>

```
code .
```

<br>

<h5>2. Feitas as instalações precisamos criar nosso arquivo de variáveis de ambiente, o <span style="text-decoration: underline">.env</span>:</h5>

```
touch .env
```

Dentro dele precisamos definir nossas duas variáveis de ambiente:

```
JWT_SECRET_KEY=chave_aleatória_secreta
JWT_EXPIRES_IN=tempo_de_vida_do_JWT (exemplos: 1000, "2 dias", "10h", "7d")
```

<b>Obs:</b> as informações contidas no arquivo <b>.env</b> não devem ser compartilhadas. O arquivo já consta no <b>.gitignore</b> para não ser subido no repositório.

# Utilização

<p>Antes de passarmos para o API Client precisamos rodar os containers do Docker</p>

```
docker-compose up --build
```

<p>Após isto precisamos rodar o script</p>

```
yarn run dev
```


<p>A aplicação rodará com o <b>localhost:3000</b>. Adicionar depois deste as rotas e suas terminações, ou <b>endpoints</b>, que veremos a seguir.</p>

<p>Após o CLI rodar de modo bem sucedido com o API Client aberto vamos utilizar as seguintes rotas:</p>

<h3>Rotas</h3>

<h4>Cadastro</h4>

Cadastro de usuários (Método POST): <b>/users</b> (ou localhost:3000/users)

Exemplo a ser colocado no body da requisição:

```
{
    "name": "André",
    "email": "andre@kenzie.com",
    "password": "123456",
    "isAdmin": true
}
```

E a resposta esperada:

```
Status: 201 CREATED
```

```
{
  "name": "André",
  "email": "andre@kenzie.com",
  "isAdmin": true,
  "id": "a24f59ac-2aa2-4de2-99e5-31c01be3ff5d",
  "createdOn": "2022-03-12T10:13:44.217Z",
  "updatedOn": "2022-03-12T10:13:44.217Z"
}
```

Caso seja registrado um usuário com email já registrado a resposta esperada deverá ser:

```
Status: 400 BAD REQUEST
```

```
{
    "message": "Email already registered!"
}
```

<h4>Login</h4>

Login do usuário recém cadastrado (Método POST): <b>/login</b> (ou localhost:3000/login)

Exemplo a ser colocado no body da requisição:

```
{
    "email": "andre@kenzie.com",
    "password": "123456"
}
```

E a resposta esperada:

```
Status: 200 OK
```

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyNGY1OWFjLTJhYTItNGRlMi05OWU1LTMxYzAxYmUzZmY1ZCIsImlhdCI6MTY0NzA2OTQ1NywiZXhwIjoxNjQ3MTU1ODU3fQ.rTJdCmBDhZC-0JN15VhRbHiZTovPTneRWAViD2eltYw"
}
```

<h4>Listagem de usuários(requer token):</h4>

Listagem dos usuários cadastrados (Método GET): <b>/users</b> (ou localhost:3000/users)



Exemplo a ser colocado no body da requisição:

```
(Requisição feita sem body)
```

Se o usuário do token for administrador ("isAdmin": true) a resposta esperada será:

```
Status: 200 OK
```

```
[
  {
    "name": "André",
    "email": "andre@kenzie.com",
    "isAdmin": true,
    "id": "a24f59ac-2aa2-4de2-99e5-31c01be3ff5d",
    "createdOn": "2022-03-12T10:13:44.217Z",
    "updatedOn": "2022-03-12T10:13:44.217Z"
  }
]
```

Se o usuário do token não for administrador ("isAdmin": false) a resposta esperada será:

```
Status: 401 UNAUTHORIZED
```

```
{
  "message": "This user is not an administrator!"
}
```


<h4>Listagem de usuário (requer token)</h4>

Listagem dos dados de um usuário (Método GET): <b>/users/profile</b> (ou localhost:3000/users/profile)

Exemplo a ser colocado no body da requisição:

```
(Requisição feita sem body)
```

E a resposta esperada:

```
Status: 200 OK
```

```
{
  "name": "André",
  "email": "andre@kenzie.com",
  "isAdmin": true,
  "id": "a24f59ac-2aa2-4de2-99e5-31c01be3ff5d",
  "createdOn": "2022-03-12T10:13:44.217Z",
  "updatedOn": "2022-03-12T10:13:44.217Z"
}
```


<h4>Atualização de usuário (requer token):</h4>

Atualização de dados do usuário cadastrado (Método PATCH): <b>/users/uuid**</b> (ou localhost:3000/users/uuid**)

\*\*preencher com o uuid do usuário anteriormente cadastrado.

Exemplo a ser colocado no body da requisição:

```
{
    "name": "André Reinaldo",
    "email": "dagomail@kenzie.com.br"
}
```
  
Caso o usuário do token seja o mesmo do id ou for administrador a resposta será:
  
```
{
  "name": "André Reinaldo",
  "email": "dagomail@kenzie.com.br",
  "isAdmin": true,
  "id": "a24f59ac-2aa2-4de2-99e5-31c01be3ff5d",
  "createdOn": "2022-03-12T10:13:44.217Z",
  "updatedOn": "2022-03-12T10:37:49.443Z"
}
``` 
  
Caso contrário a resposta será:

```
Status: 401 UNAUTHORIZED
```

```
{
  "message": "Non admins must delete only its own profiles!"
}
```

<h4>Deleção de usuário (requer token):</h4>

Deleção de usuário cadastrado (Método DELETE): <b>/users/uuid**</b> (ou localhost:3000/users/uuid**)

\*\*preencher com o uuid do usuário anteriormente cadastrado.

Exemplo a ser colocado no body da requisição:

```
{
    "name": "André Reinaldo",
    "email": "dagomail@kenzie.com.br"
}
```
  
Caso o usuário do token seja o mesmo do id ou for administrador a responsta será:

```
Status: 200 OK
```

```
{
  "message": "User deleted with success"
}
``` 

Caso contrário a resposta será:

```
Status: 401 UNAUTHORIZED
```

```
{
  "message": "Non admins must delete only its own profiles!"
}
```

# Termos de uso

<p>Esta aplicação atende a fins exclusivamente didáticos e não possui qualquer intuito comercial.</p>

# Referências

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/en/4x/api.html)
- [TypeORM](https://typeorm.io/#/)
- [Docker](https://docs.docker.com/)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Dotenv](https://www.npmjs.com/package/dotenv)
