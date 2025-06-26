# Projeto Backend - API Node.js com MySQL, JWT e Cache

## Descrição

Este projeto é uma API RESTful desenvolvida em Node.js, que gerencia recursos de **clientes**, **produtos** e **usuários**. Utiliza banco de dados MySQL para persistência, autenticação via JWT e um sistema de cache em memória para otimizar performance. Também inclui uma suíte de testes para garantir a qualidade das funcionalidades.

---

## Funcionalidades

- CRUD completo para **Clientes**, **Produtos** e **Usuários**
- Autenticação via JSON Web Tokens (JWT)
- Sistema de cache com tempo de vida (TTL) para otimizar consultas ao banco
- Logout com blacklist de tokens JWT para segurança
- Validação básica de dados
- Suíte de testes automatizados (com Jest/Supertest)
- Logs informativos de cache e operações

---

## Tecnologias

- Node.js
- Express.js
- MySQL
- JSON Web Token (JWT)
- node-cache
- Jest / Supertest (para testes)
- dotenv (para variáveis de ambiente)

---

## Estrutura do Projeto

```
projeto-backend/
│
├── app.js                   # Entrada da aplicação
├── .env                     # Variáveis de ambiente (não incluído no git)
├── package.json             # Configurações e dependências do projeto
├── README.md                # Documentação do projeto
│
├── configs/                 # Configurações do banco e ambiente
│   └── db.js
│
├── controllers/             # Controladores das rotas (lógica de requisição)
│   ├── clientes.controller.js
│   ├── produtos.controller.js
│   └── usuarios.controller.js
│
├── middlewares/             # Middlewares (ex: autenticação JWT)
│   └── autenticar.js
│
├── models/                  # Modelos / consultas ao banco (separação opcional)
│
├── routes/                  # Definição das rotas da API
│   ├── clientes.routes.js
│   ├── produtos.routes.js
│   └── usuarios.routes.js
│
├── services/                # Lógica de negócio e integração com banco/cache
│   ├── clientes.service.js
│   ├── produtos.service.js
│   ├── usuarios.service.js
│   └── cache.js
│
├── tests/                   # Testes automatizados
│   ├── clientes.test.js
│   ├── produtos.test.js
│   └── usuarios.test.js
│
└── utils/                   # Utilitários (opcional)
```

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/projeto-backend.git
```

2. Entre na pasta do projeto:

```bash
cd projeto-backend
```

3. Instale as dependências:

```bash
npm install
```

4. Configure as variáveis de ambiente no arquivo `.env` (baseado no `.env.example`):

```
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
```

5. Configure o banco MySQL e crie as tabelas conforme scripts SQL fornecidos (ou via migrations).

---

## Uso

Para iniciar a aplicação em modo de desenvolvimento com recarga automática:

```bash
npm run dev
```

Para iniciar normalmente:

```bash
npm start
```

---

## Endpoints

- **Clientes**:  
  `GET /api/clientes` - Listar todos  
  `GET /api/clientes/:id` - Buscar por ID  
  `POST /api/clientes` - Criar novo  
  `PUT /api/clientes/:id` - Atualizar  
  `DELETE /api/clientes/:id` - Deletar  

- **Produtos**:  
  `GET /api/produtos` - Listar todos (com indicação cache ou DB)  
  `GET /api/produtos/:id` - Buscar por ID  
  `POST /api/produtos` - Criar novo  
  `PUT /api/produtos/:id` - Atualizar  
  `DELETE /api/produtos/:id` - Deletar  

- **Usuários**:  
  `GET /api/usuarios` - Listar todos  
  `POST /api/usuarios` - Criar novo  
  `DELETE /api/usuarios/:id` - Deletar  
  `POST /api/logout` - Logout (invalida token JWT)  

- **Autenticação**:  
  `POST /api/login` - Login e geração de token JWT  

---

## Testes

Para rodar a suíte de testes:

```bash
npm test
```

Inclui testes para rotas válidas e inválidas, e verifica autenticação e cache.

---

## Logs e Cache

A aplicação registra no console quando os dados são servidos via cache ou diretamente do banco, facilitando a visualização do funcionamento do sistema de cache.

---

## Considerações Finais

Este projeto foi desenvolvido para fins acadêmicos e como entrega de trabalho integrador, demonstrando boas práticas em API RESTful, segurança e testes.

---

Se quiser, posso te ajudar a criar um arquivo `.env.example` e um `.gitignore` para o projeto! Quer?