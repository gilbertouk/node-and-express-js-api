# Node.js and Express.js API

**This API was built following this tutorial video:** [Video Link](https://www.youtube.com/watch?v=yD7X1qJA5nA)

## Overview

A RESTful API built with Node.js, Express.js, and TypeScript, featuring modern software architecture patterns and comprehensive testing coverage.

## Features

- 🚀 TypeScript for type safety
- 🗄️ MySQL Database with Prisma ORM
- 🔐 Auth0 JWT authentication
- 📝 Enhanced logging with Winston
- ✅ Input validation
- 📄 Offset and Cursor based pagination
- 🏗️ Repository, Ports and Adapters, Entities and DTOs patterns
- 🧪 Automated Unit and Integration testing with Jest
- 🐳 Docker containerization
- 📊 Code coverage reporting

## Architecture

This project follows clean architecture principles with:

- **Repository Pattern**: Implemented with mixins in [`src/data/repositories/`](src/data/repositories/)
- **DTOs**: Type definitions in [`src/dto.d.ts`](src/dto.d.ts)
- **Dependency Injection**: Modular repository composition
- **Error Handling**: Centralized error management
- **Logging**: Structured logging with rotation

## Project Structure

```
src/
├── config.ts              # Application configuration
├── dto.d.ts               # Data Transfer Object types
├── data/
│   └── repositories/      # Repository pattern implementation
├── logs/                  # Application logs
└── prisma/
    ├── schema.prisma      # Database schema
    ├── seed.ts           # Database seeding
    └── migrations/       # Database migrations
```

## Getting Started

### Prerequisites

- Node.js (22 or higher)
- MySQL database
- Docker (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
4. Configure your database connection in `.env`
5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
6. Seed the database:
   ```bash
   npx prisma db seed
   ```

### Running the Application

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm start
```

**With Docker:**

```bash
docker-compose up
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## API Testing

Use the included HTTP file for API testing:

```bash
# Open api-test.http in VS Code with REST Client extension
```

## Development Steps Completed

1. ✅ Scaffold project and configure environment
2. ✅ Build modular routes with error handling
3. ✅ MySQL Database with Prisma ORM
4. ✅ Auth0 JWT authentication
5. ✅ Enhanced logging and input validation
6. ✅ Offset and Cursor based pagination
7. ✅ Repository, Ports and Adapters, Entities and DTOs patterns
8. ✅ Automated Unit and Integration testing
9. ✅ Dockerization for deployment

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
