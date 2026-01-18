# MarketTESTER 🚀

**MarketTESTER** is a B2B SaaS platform designed to help entrepreneurs and companies **validate their business ideas** before writing a single line of code. It provides a structured framework to define hypotheses, run experiments (interviews, landing pages, etc.), and score the "readiness" of a project based on real evidence.

## 🌟 Key Features
- **Dashboard**: Real-time project statistics (Active Hypotheses, Validation Score).
- **Hypothesis Management**: Define risky assumptions (Desirability, Viability, Feasibility).
- **Experiments**: Create and track validation experiments (Interviews, Surveys, etc.).
- **Validation & Scoring**: Log evidence (proofs) to officially validate or invalidate hypotheses.
- **Tenant Isolation**: Multi-tenant architecture (Data isolation per user/workspace).

---

## 🛠️ Technology Stack Architecture

```mermaid
graph TD
    subgraph Client [🎨 Frontend (Client Side)]
        direction TB
        React[React 18]
        TS[TypeScript]
        Vite[Vite Bundler]
        Store[Zustand Store]
        UI[Lucide Icons / CSS]
        
        React --> TS
        React --> Store
        React --> UI
        React --> Vite
    end

    subgraph Server [🛡️ Backend (Server Side)]
        direction TB
        SB[Spring Boot 3.2]
        Java[Java 17]
        Security[Spring Security + JWT]
        Docs[OpenAPI / Swagger]
        
        SB --> Java
        SB --> Security
        SB --> Docs
    end

    subgraph Infrastructure [💾 Data & Infra]
        direction TB
        PG[(PostgreSQL)]
        Flyway[Flyway Migrations]
        Docker[Docker Compose]
    end

    Client <-->|REST API / JSON| Server
    Server <-->|JPA / Hibnerate| PG
    Flyway -->|Schema Versioning| PG
    Docker -.->|Orchestrates| Client
    Docker -.->|Orchestrates| Server
    Docker -.->|Orchestrates| PG
```

### Detailed Tech Stack

#### Frontend 🎨
- **Core**: React 18, TypeScript, Vite
- **State**: Zustand
- **Networking**: Axios
- **Routing**: React Router DOM v6
- **Styling**: CSS Modules, Custom Design System

#### Backend 🛡️
- **Core**: Java 17, Spring Boot 3.2
- **Data**: Spring Data JPA, Hibernate, PostgreSQL
- **Security**: Spring Security, JWT (Stateless)
- **Documentation**: SpringDoc OpenAPI (Swagger UI)
- **Tools**: Lombok, MapStruct, Flyway

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+**
- **Node.js 18+**
- **Docker** & **Docker Compose**

### 1. Start the Database (and Backend optionally)
```bash
cd infra
docker-compose up -d
```
*Note: This starts PostgreSQL on port 5432 and the Backend on 8080.*

### 2. Run Backend (Development Mode)
```bash
cd backend
mvn spring-boot:run
```
- **API URL**: `http://localhost:8080/api`
- **Swagger Documentation**: `http://localhost:8080/swagger-ui/index.html`

### 3. Run Frontend (Development Mode)
```bash
cd frontend
npm install
npm run dev
```
- **App URL**: `http://localhost:5173`

---

## 🧪 Testing
- **Backend**: `mvn test` (Unit & Integration tests)
- **Frontend**: (Coming soon: Vitest)

---

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
