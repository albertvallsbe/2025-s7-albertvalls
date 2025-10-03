# 🎓 2025-S7 Pràctica Acadèmica / 2025-S7 Academic Practice

🎬 Movieis 🎬

![Imatge de la card](./src/assets/images/welcome.png)
![Imatge de la card](./src/assets/images/login.png)
![Imatge de la card](./src/assets/images/cards.png)
![Imatge de la card](./src/assets/images/aside-preview.png)
![Imatge de la card](./src/assets/images/detail-top.png)
![Imatge de la card](./src/assets/images/detail-down.png)

## 📚 Índex / Table of Contents

1. [Sobre el projecte / About](#1-sobre-el-projecte--about)
2. [Funcionalitats / Features](#2-funcionalitats--features)
3. [Tecnologia / Tech Stack](#3-tecnologia--tech-stack)
4. [Demo en línia / Live Demo](#4-demo-en-línia--live-demo)
5. [Repositori front / Front repository](#5-repositori-front--front-repository)
6. [Repositori backend / Backend repository](#6-repositori-back--back-repository)
7. [Instal·lació / Installation](#7-instal·lació--installation)

## 1. Sobre el projecte / About

**CAT:**

Aquest projecte, `Movieis`, consisteix en una aplicació web amb arquitectura de `frontend i backend`.
La part de frontend està desenvolupada amb `React i TypeScript sobre Vite`, i permet als usuaris explorar pel·lícules a través d’una interfície interactiva i accessible, així com gestionar la comunicació amb l’API de The Movie Database (TMDB).
La part de backend s’ha creat amb `Node.js, Express i PostgreSQL`, gestionant l’autenticació d’usuaris.

A la pantalla principal després de fer `login`, l’usuari pot veure un llistat de pel·lícules provinents de l’API. Cada targeta de pel·lícula enllaça a un `detall complet` amb informació estesa (sinopsi, gènere, any, valoració). Els usuaris registrats poden `crear un compte i iniciar sessió`.

S’ha treballat amb una estructura modular de components al frontend, gestió d’estat amb Redux Toolkit i estils SCSS amb variables globals i metodologia BEM. El backend implementa models i rutes REST amb Sequelize, validacions i middleware per a la seguretat i la gestió d’errors. Aquesta combinació assegura escalabilitat, mantenibilitat i una experiència d’usuari clara i fiable.

**EN:**

This project, `Movieis`, is a web application with a `frontend and backend` architecture.
The frontend is built with `React and TypeScript on Vite` and allows users to explore movies through an interactive and accessible interface, as well as handle communication with the The Movie Database (TMDB) API.
The backend is developed with `Node.js, Express, and PostgreSQL`, managing user authentication.

On the main screen, after `logging` in, the user can view a list of movies fetched from the API. Each movie card links to a `detailed view` with extended information (synopsis, genre, year, rating). Registered users can `create an account and sign in`.

The frontend uses a modular component structure, state management with Redux Toolkit, and SCSS styles with global variables and the BEM methodology. The backend implements models and REST routes with Sequelize, validations, and middleware for security and error handling. This combination ensures scalability, maintainability, and a clear and reliable user experience.

## 2. Funcionalitats / Features

- ✅ **React**
- ✅ **TypeScript → JavaScript**
- ✅ **Redux**
- ✅ **Vite**
- ✅ **SASS**
- ✅ **Testing**

## 3. Tecnologia / Tech Stack

- **React (18.2)**
- **Vite**
- **JavaScript (ES6+)**
- **TypeScript**
- **Redux**
- **Jest**
- **SASS**
- **CSS**
- **Jest**
- **Git & GitHub**

## 4. Demo en línia / Live Demo

**Live:** 👉 https://movieis-albertvalls.netlify.app/home

User: `guest@gmail.com`
Password: `guest2025`

**CAT:**
Visita la demo en línia per veure l’aplicació en funcionament.

**EN:**
Check out the live demo to see the application in action.

## 5. Repositori front / Front repository

**Github:** 👉 https://github.com/albertvallsbe/2025-s7-f-movieis

## 6. Repositori backend / Backend repository

**Github:** 👉 https://github.com/albertvallsbe/2025-s7-b-movieis

## 7. Instal·lació / Installation

**CAT:**

_Segueix aquests passos per clonar el projecte i fer servir el compilador Vite per obrir el projecte en mode developer en local._

**EN:**

_Follow these steps to clone the project and use the Vite compiler to open the project in local developer mode._

**Requeriments / Prerequisites**

- Node.js

### 1) Clonar el repositori / Clone the repository

```bash
git clone https://github.com/albertvallsbe/2025-s7-f-movieis.git
```

### 2) Entrar al directori del projecte / Navigate into the project directory

```
cd 2025-s7-f-movieis
```

### 3) Instal·lar dependències / Install dependencies

```
npm i
```

### 4) Executar el compilador de Vite per a desenvolupament / Run Vite compiler in developer mode

```
npm run dev
```

### 6) Obre el live Server de Vite / Open the Live Server of Vite

```
http://localhost:5173
```
