# Bind Clients

## Dependências

Para rodar esse projeto, faz-se necessário ter instalado em sua máquina algumas ferramentas, dentre elas, temos:

* [NodeJs](https://nodejs.org/en/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [PostgreSQL](https://www.postgresql.org/)
* [MySQL](https://www.mysql.com/)

> O Docker Compose inicia o PostgreSQL, MySQL e a aplicação.

## Instalação

Depois que todas as ferramentas tiverem sido instaladas, podemos então, baixar a aplicação para a nossa máquina através do comando:

```bash
$ git clone git@github.com:JerbesonViny/MercaFacil_BindClients.git
```

## Iniciando a aplicação

Partindo do pressuposto que você obteve o arquivo **docker-compose.yml**, fica muito simples dar start no servidor, basta executar o seguinte comando:

```bash
docker-compose up
```

> <div style="text-align: justify;">Observação: Muito provavelmente você visualizará em seu terminal alguns processos sendo executados e downloads sendo feitos. Isso ocorre pois muito possivelmente você ainda não contém as "imagens" docker que são necessárias para iniciar a aplicação, porém, o docker cuidará de fazer o download das mesmas, criar a imagem customizada do projeto e também iniciará os containers que possuem individualmente o PostgresSQL, MySQL e o app rodando.</div>

<br/>

Por fim, basta acessar a rota <a href="http://localhost:8000/docs">http://localhost:8000/docs</a> para ter acesso a documentação da API, podendo também testar a mesma através dessa documentação.

<div style="text-align: justify">

> **OBSERVAÇÃO**: Caso venha a acessar a rota anteriormente citada, o token obtido na rota /token deverá ser passado clicando primeiramente no botão **Authorize**, em seguida, cole no campo **Value** o token que foi retornado.
</div>

<br/>

<div style="display: flex; justify-content: center;">
<img style="height: 50px" src="https://drive.google.com/uc?export=view&id=1d2wzPbvOkiH47EfFbcBb-3yXCvxrpoOb"/>
</div>

<br/>

## Fluxo

O fluxo da aplicação pode ser entendido através dos passos descritos abaixo, ou a partir da imagem localizada ao fim desse tópico.

<div style="text-align: justify;">

### 1. O cliente faz uma requisição a API.

### 2. A aplicação que conta com alguns middlewares, nesse caso, o que estará atuando será o **RequiredToken** que verifica a presença do token (JWT - Json Web Token) que foi passado através do header Authorization (Bearer Token) e também a validade do mesmo.

### 3. Caso o token enviado esteja válido, o usuário poderá então desfrutar das funcionalidades. Porém, caso contrário, o mesmo terá o acesso negado e terá em sua tela a mensagem de erro informando-o que o mesmo passou um token inválido e/ou expirado.

### 4. Acionada a rota de criação de novos contatos, o usuário deverá passar um JSON (Javascript Object Notation) no corpo da requisição seguindo o modelo que foi estabelecido. Além disso, ainda tem-se a necessidade do envio do token novamente através do header a uthorization (O mesmo se repete nas outras rotas de contato).
</div>

> Modelo do corpo da requisição

```javascript
{
    "contacts": [
        {
            "name": "First Example Name",
            "cellphone": "55990123456789"
        },
        {
            "name": "Second Example Name",
            "cellphone": "55999876543210"
        }
    ]
}
```

<div style="text-align: justify;">

### 4.1. Nesse momento, uma verificação será feita para saber qual dos clientes está enviando os dados. Isso é feito pois um dos clientes (Macapá) possuí uma regra de negócio diferente onde uma máscara deve ser aplicada aos números de telefone e as letras dos nomes a eles associados devem ser transformados em maiúsculas.

### 4.2. Em seguida, após a máscara ser aplicada, os contatos serão salvos no banco e os ID's serão retornados.

### 5. Acionada a rota de listagem de contatos, o middleware **(RequiredToken)** será acionado novamente. Caso o acesso tenha sido fornecido, teremos o retorno de todos os contatos do cliente, seja ele Macapá ou Varejão.
</div>
<br/>

![Fluxo da aplicação](https://drive.google.com/uc?export=view&id=1RIzjPBVJCI44K8933UyqLGLgRrSCS7bL)
