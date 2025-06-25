# Project Setup Instructions

This is a simple test project for a portfolio viewer like debank or zapper. 

## Prerequisites

Make sure you have PNPM installed on your system.

## Installation

1. Install dependencies in both backend and frontend directories:
   ```bash
   # In backend directory
   pnpm install
   
   # In frontend directory
   pnpm install
   ```

## Environment Configuration

### Frontend Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```env
NEXT_PUBLIC_WALLET_CONNECT_ID=
API_ENDPOINT=http://localhost:8080
```

### Backend Environment Variables

Add the following variables to the existing `.env` file in the backend directory:

```env
ALCHEMY_KEY=YourAlchemyKey
JWT_SECRET=ExtraSecretPassword
```

## Running the Application

After completing the setup, you can run both services:

```bash
# In both backend and frontend directories
pnpm run dev
```

## Additional Information

### Type Generation

The frontend should have typing based on the Zod/OpenAPI API generated automatically. If you need to regenerate the types, run:

```bash
# In frontend directory
pnpm run openapi-ts
```

### Database

A small SQLite database is committed in the backend repository for simplicity. No additional database setup is required.