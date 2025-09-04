# Microservices Project with NestJS, PostgreSQL & MongoDB

This project is built using **NestJS Microservices Architecture**.  
It follows a modular design where each microservice is in the `apps` folder, and reusable code (DTOs, guards, modules) lives in the `libs/contracts` folder.

---

## 🚀 Features
- **API Gateway** – central entry point for all client requests
- **User Service** – authentication & user profile management (MongoDB)
- **Product Service** – product management (PostgreSQL + TypeORM)
- **Logging Service** – central log handling
- **Shared Contracts** – DTOs, Guards, Decorators, Database Modules

---

## 📂 Project Structure

project/
├── apps/
│ ├── api-gateway/ # Gateway for routing requests
│ │ └── src/
│ │ ├── logging/ # Logging integration inside gateway
│ │ ├── product/ # Product controller in gateway
│ │ ├── users/ # User controller in gateway
│ │ ├── api-gateway.* # Gateway core files
│ │ └── main.ts
│ │
│ ├── logging/ # Logging microservice
│ │ └── src/
│ │ ├── logging.* # Logging schema, controller, service
│ │ └── main.ts
│ │
│ ├── product/ # Product microservice
│ │ └── src/
│ │ ├── entity/ # Postgres entities
│ │ ├── product.* # Product controller, service, module
│ │ └── main.ts
│ │
│ └── users/ # User microservice
│ └── src/
│ ├── users.* # Users controller, service, module
│ └── main.ts
│
├── libs/
│ └── contracts/ # Shared contracts & utilities
│ └── src/
│ ├── logging/ # Logging patterns
│ ├── product/ # Product DTOs & patterns
│ ├── shared/ # JWT, Database modules, Multer, Roles
│ └── users/ # User DTOs & patterns
│
├── package.json
├── tsconfig.json
└── README.md

markdown
Copy code

---

## 🛠️ Tech Stack
- [NestJS](https://nestjs.com/) – Node.js Framework
- [PostgreSQL](https://www.postgresql.org/) + [TypeORM](https://typeorm.io/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [RabbitMQ/Redis (Future)] – Message broker
- [JWT](https://jwt.io/) – Authentication
- [Multer + Sharp] – File uploads
- Microservice Transport: **TCP**

---

## ⚙️ Installation

1. Clone the repository:
```bash
#For ssh 
git clone git@github.com:sivakumarrc32/Micro-Service-Project-With-TCP.git

#For HTTP 
git clone https://github.com/sivakumarrc32/Micro-Service-Project-With-TCP.git

cd Micro-Service-Project-With-TCP

Install dependencies:

```bash
npm install

Run microservices individually:

```bash
# API Gateway
nest start api-gateway -w

# Logging Service
nest start logging -w

# Product Service
nest start product -w

# Users Service
nest start users -w