# My Portfolio - Enterprise Monorepo

This project has been restructured into a modern, scalable enterprise monorepo architecture.

## 📁 Structure

- **`apps/`**
  - **`frontend/`**: React + Vite + Tailwind UI layer.
  - **`backend/`**: Node.js + Express + Mongoose API layer.
- **`database/`**
  - **`schemas/`**: Database models and validation.
  - **`seeders/`**: Initial data seeding scripts.
  - **`scripts/`**: Database diagnostics and maintenance.
- **`packages/`**
  - **`shared-types/`**: Shared TypeScript interfaces.
  - **`ui-core/`**: Reusable design system components.
  - **`eslint-preset/`**: Centralized linting rules.
- **`environments/`**: Environment variable templates for different stages.
- **`infrastructure/`**: Deployment configurations (Docker, Vercel, Redis).

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Copy `environments/.env.development` to the root or respective app folders if needed, and fill in your secrets.

3. **Run in Development**:
   ```bash
   npm run dev
   ```

## 🛠️ Key Features

- **Decoupled Architecture**: Frontend and Backend are strictly separated.
- **Type Safety**: TypeScript used throughout for robust development.
- **Monorepo Management**: Powered by NPM Workspaces and Turborepo ready.
- **Security-First**: Integrated Helmet, CORS, and rate limiting.
- **Scalable Features**: Dedicated folders for Admin Panel and User Dashboard.
