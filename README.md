<h1 align="center">React + Plop Code Generator</h1>

<p align="center">
  <img src="public/plop+react.gif" alt="Plop + React" />
</p>

A modern React + TypeScript + Vite starter with powerful code generation using Plop.js. Generate REST API features, components, forms, tables, and custom hooks with a single command.

## Features

- ⚡ **Vite** - Lightning fast development
- ⚛️ **React 18** - Latest React features
- 📘 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Utility-first styling
- 🔄 **SWR** - Data fetching and caching
- 🌐 **Wretch** - HTTP client
- ✅ **Zod** - Schema validation
- 🎯 **React Hook Form** - Form management
- 🚀 **Plop.js** - Code generation

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Generate code
npm run plop
```

## Code Generators

### 1. Resource Generator
Creates a complete REST API feature with schema, service, and hooks.

```bash
npm run plop
# Select: Resource
# Enter: User
```

Generates:
- `src/features/user/user.schema.ts` - Zod validation schemas
- `src/features/user/user.service.ts` - API service methods
- `src/features/user/useUser.ts` - SWR hooks
- `src/features/user/index.ts` - Barrel exports

### 2. Table Generator
Creates a table component for displaying data.

```bash
npm run plop
# Select: Table
# Enter: User
```

Generates:
- `src/components/UserTable.tsx` - Table component with loading/error states

### 3. Form Generator
Creates a form component with validation.

```bash
npm run plop
# Select: Form
# Enter: User
```

Generates:
- `src/components/UserForm.tsx` - Form with react-hook-form + Zod validation

## Project Structure

```
root/
├── stamps/
│   ├── api-service/       # REST API templates
│   │   ├── hook.hbs
│   │   ├── schema.hbs
│   │   └── service.hbs
│   └── components/        # Component templates
│       ├── form.hbs
│       └── table.hbs
├── src/
│   ├── features/          # Generated API features
│   ├── components/        # Generated components
│   ├── hooks/             # Custom hooks
│   ├── services/
│   │   └── api.ts         # Wretch configuration
│   └── App.tsx
├── plopfile.mjs           # Plop configuration
└── package.json
```

## Documentation

- [Documentation.md](Documentation.md) - Complete step-by-step guide
- [CUSTOM_GENERATOR_GUIDE.md](CUSTOM_GENERATOR_GUIDE.md) - Create your own generators
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Setup instructions

## Example Usage

```tsx
import { useUsers } from '@/features/user'
import { UserTable } from '@/components/UserTable'

function App() {
  return (
    <div>
      <h1>Users</h1>
      <UserTable />
    </div>
  )
}
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Data Fetching**: SWR, Wretch
- **Validation**: Zod
- **Forms**: React Hook Form
- **Code Generation**: Plop.js

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run plop         # Run code generator
```

## License

MIT
