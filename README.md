# MarketTESTER 🚀

**MarketTESTER** is a B2B SaaS platform designed to help entrepreneurs and companies **validate their business ideas** before writing a single line of code. It provides a structured framework to define hypotheses, run experiments (interviews, landing pages, etc.), and score the "readiness" of a project based on real evidence.

## 🌟 Key Features
- **Dashboard**: Real-time project statistics (Active Hypotheses, Validation Score).
- **Hypothesis Management**: Define risky assumptions (Desirability, Viability, Feasibility).
- **Experiments**: Create and track validation experiments (Interviews, Surveys, etc.).
- **Validation & Scoring**: Log evidence (proofs) to officially validate or invalidate hypotheses.
- **Tenant Isolation**: Multi-tenant architecture (Data isolation per user/workspace).

---

## 🛠️ Technology Stack

### Backend 🛡️
- **Language**: Java 17
- **Framework**: Spring Boot 3.2
- **Database**: PostgreSQL (with Flyway for migrations)
- **Security**: Spring Security + JWT (Stateless Authentication)
- **Documentation**: OpenAPI 3 (Swagger UI)
- **Tools**: Lombok, MapStruct

### Frontend 🎨
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Routing**: React Router DOM (v6)
- **Styling**: CSS Modules / Custom Design System (Premium Look)
- **Icons**: Lucide-React
- **HTTP Client**: Axios (with Interceptors)

### Infrastructure 🏗️
- **Docker Compose**: Orchestrates Backend + Database.

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+**
- **Node.js 18+**
- **Docker** & **Docker Compose**
- **Maven** (optional if using mvnw)

### 1. Start the Database (and Backend optionally)
```bash
cd infra
docker-compose up -d
```
*Note: This starts PostgreSQL on port 5432 and the Backend on 8080.*

### 2. Run Backend (Development Mode)
If you prefer running the backend locally (e.g., for debugging):
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

## 📚 API Documentation
The backend exposes a fully interactive Swagger UI documentation.
1. Start the backend.
2. Visit: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

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
