# Microservices Project with NestJS, PostgreSQL & MongoDB

This project is built using **NestJS Microservices Architecture**.  
It follows a modular design where each microservice is in the `apps` folder, and reusable code (DTOs, guards, modules) lives in the `libs/contracts` folder.

---

## 🚀 Features
- **API Gateway** – central entry point for all client requests
- **Logging Service** –user authentication like signup and login (mongoDB)
- **User Service** – user profile management (MongoDB)
- **Product Service** – product management (PostgreSQL + TypeORM)
- **Shared Contracts** – DTOs, Guards, Decorators, Database Modules

---

## 🛠️ Tech Stack
- [NestJS](https://nestjs.com/) – Node.js Framework
- [PostgreSQL](https://www.postgresql.org/) + [TypeORM](https://typeorm.io/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) – Authentication
- [Multer + Sharp] – File uploads
- Microservice Transport: **TCP**

---

## ⚙️ Installatio
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