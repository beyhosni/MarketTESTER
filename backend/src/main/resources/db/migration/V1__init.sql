-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tenants
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users (Global but linked to tenant)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- OWNER, ADMIN, MEMBER
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_users_email_tenant UNIQUE (email, tenant_id)
);

CREATE INDEX idx_users_tenant ON users(tenant_id);

-- 3. Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_tenant ON projects(tenant_id);

-- 4. Hypotheses
CREATE TABLE hypotheses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    project_id UUID NOT NULL REFERENCES projects(id),
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- DESIRABILITY, VIABILITY, FEASIBILITY, USABILITY
    status VARCHAR(50) NOT NULL DEFAULT 'DRAFT', -- DRAFT, TESTED, VALIDATED, INVALIDATED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hypotheses_tenant ON hypotheses(tenant_id);
CREATE INDEX idx_hypotheses_project ON hypotheses(project_id);

-- 5. Experiments
CREATE TABLE experiments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    hypothesis_id UUID NOT NULL REFERENCES hypotheses(id),
    method VARCHAR(50) NOT NULL, -- INTERVIEW, SURVEY, LANDING_PAGE, ADS, PROTOTYPE
    status VARCHAR(50) NOT NULL DEFAULT 'PLANNED', -- PLANNED, IN_PROGRESS, DONE
    success_criteria_json TEXT, -- JSON structure for success criteria
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_experiments_tenant ON experiments(tenant_id);
CREATE INDEX idx_experiments_hypothesis ON experiments(hypothesis_id);

-- 6. Evidence
CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    experiment_id UUID NOT NULL REFERENCES experiments(id),
    type VARCHAR(50) NOT NULL, -- QUALITATIVE, QUANTITATIVE
    summary TEXT NOT NULL,
    confidence_score INTEGER CHECK (confidence_score BETWEEN 0 AND 100),
    attachment_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_evidence_tenant ON evidence(tenant_id);
CREATE INDEX idx_evidence_experiment ON evidence(experiment_id);

-- 7. Decisions
CREATE TABLE decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    hypothesis_id UUID NOT NULL REFERENCES hypotheses(id),
    result VARCHAR(50) NOT NULL, -- VALIDATED, INVALIDATED, PIVOT, ITERATE
    rationale TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_decisions_tenant ON decisions(tenant_id);
CREATE INDEX idx_decisions_hypothesis ON decisions(hypothesis_id);

-- 8. Metrics (Time-series)
CREATE TABLE metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    project_id UUID NOT NULL REFERENCES projects(id),
    key VARCHAR(100) NOT NULL, -- e.g. "mrr", "churn_rate"
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    value NUMERIC(19, 4) NOT NULL,
    dimensions_json TEXT, -- e.g. {"country": "fr"}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_metrics_tenant ON metrics(tenant_id);
CREATE INDEX idx_metrics_project_key_ts ON metrics(project_id, key, timestamp);
