![MarketTESTER Banner](/c:/Users/33656/.gemini/antigravity/brain/d8a720dd-e712-47b7-bde4-ccc8ea2ca4d1/markettester_banner.png)

<div align="center">

# MarketTESTER

**Validate your business ideas before writing code.**

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=java&logoColor=white)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[Request Demo](https://markettester.com) · [Report Bug](https://github.com/markettester/issues) · [Request Feature](https://github.com/markettester/issues)

</div>

---

## � About The Project

**MarketTESTER** is the ultimate B2B SaaS platform for entrepreneurs who want to stop guessing and start knowing. It provides a scientific framework to:
1.  **Define Hypotheses**: What needs to be true for your idea to work?
2.  **Run Experiments**: Interviews, Landing Pages, Ads.
3.  **Validate with Data**: Score your project's readiness based on real evidence.

> "Don't build it until you've sold it." — MarketTESTER Philosophy

---

## 🛠️ Tech Stack

We use the latest industry-standard technologies to ensure performance, scalability, and developer happiness.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | ![Java](https://img.shields.io/badge/-Java-brightgreen) **Spring Boot 3** | Robust REST API with secure stateless authentication (JWT). Data managed via JPA & Hibernate. |
| **Frontend** | ![React](https://img.shields.io/badge/-React-blue) **Vite + TS** | Blazing fast Single Page Application (SPA). State validation via Zod & Zustand. |
| **Database** | ![Postgres](https://img.shields.io/badge/-PostgreSQL-336791) | Reliable relational data storage, versioned with **Flyway**. |
| **Docs** | ![Swagger](https://img.shields.io/badge/-Swagger-85EA2D) **OpenAPI 3** | Interactive API documentation auto-generated from code. |
| **Infra** | ![Docker](https://img.shields.io/badge/-Docker-2496ED) | Full stack orchestration with a single command. |

---

## �️ Architecture

A clean separation of concerns ensures maintainability.

```mermaid
graph LR
    User((User)) -->|Browser| FE[React Frontend]
    FE -->|JSON/REST| API[Spring Boot API]
    API -->|JDBC| DB[(PostgreSQL)]
    API -->|Docs| Swagger[Swagger UI]
    
    style FE fill:#61DAFB,stroke:#333,stroke-width:2px,color:black
    style API fill:#6DB33F,stroke:#333,stroke-width:2px,color:white
    style DB fill:#336791,stroke:#333,stroke-width:2px,color:white
```

---

## ⚡ Getting Started

### 1️⃣ Clone & Infra
Start the database and backend services containerized.

```bash
git clone https://github.com/your-org/markettester.git
cd markettester/infra
docker-compose up -d
```

### 2️⃣ Backend (Local Dev)
If you want to debug the API source code:

```bash
cd ../backend
mvn spring-boot:run
```
_API runs on_ `http://localhost:8080/api`

### 3️⃣ Frontend (Local Dev)
Launch the UI with hot-reload.

```bash
cd ../frontend
npm install && npm run dev
```
_UI runs on_ `http://localhost:5173`

---

## � Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes
4.  Push to the Branch
5.  Open a Pull Request

---

<div align="center">
    <p>Built with ❤️ by the MarketTESTER Team</p>
</div>
