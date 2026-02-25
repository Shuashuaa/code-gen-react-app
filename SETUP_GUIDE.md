# Step-by-Step Guide: Creating a User Feature from Scratch

This guide shows you how to create a complete feature using JSONPlaceholder's Users API, starting from an empty project with only `stamps/*` and `plopfile.mjs`.

## Prerequisites

- Node.js installed
- Project initialized with the plop templates in `stamps/` folder
- `plopfile.mjs` configured

## Step 1: Install Dependencies

```bash
npm install
```

Make sure you have these key dependencies:
- `wretch` - HTTP client
- `swr` - Data fetching hooks
- `zod` - Schema validation
- `plop` - Code generator
- `inflection` - Pluralization helper

## Step 2: Create the API Service

Create `src/services/api.ts`:

```typescript
import wretch from "wretch";

export const api = wretch("https://jsonplaceholder.typicode.com")
  .options({ credentials: "include" })
  .errorType("json");
```

This sets up the base API client pointing to JSONPlaceholder.

## Step 3: Generate the User Feature with Plop

Run the plop generator:

```bash
npm run plop
```

When prompted:
- **Resource name**: Enter `User`

This automatically creates:
- `src/features/user/user.schema.ts` - Zod schemas
- `src/features/user/user.service.ts` - API service methods
- `src/features/user/useUser.ts` - SWR hooks
- `src/features/user/index.ts` - Barrel exports

## Step 4: Customize the User Schema

Edit `src/features/user/user.schema.ts` to match JSONPlaceholder's user structure:

```typescript
import { z } from "zod";

const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: z.object({
    lat: z.string(),
    lng: z.string(),
  }),
});

const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: AddressSchema,
  phone: z.string(),
  website: z.string(),
  company: CompanySchema,
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema.omit({ 
  id: true,
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
```

## Step 5: Verify the Generated Service

The generated `src/features/user/user.service.ts` should already work with JSONPlaceholder:

```typescript
import { api } from "@/services/api";
import { z } from "zod";
import { 
    UserSchema, 
    type User,
    type CreateUserInput,
    type UpdateUserInput 
} from "./user.schema";

export const userService = {
    getById: async (id: string): Promise<User> => {
        const data = await api.url(`/users/${id}`).get().json();
        return UserSchema.parse(data);
    },

    getAll: async (): Promise<User[]> => {
        const data = await api.url("/users").get().json();
        return z.array(UserSchema).parse(data);
    },

    create: async (payload: CreateUserInput): Promise<User> => {
        const data = await api.url("/users").post(payload).json();
        return UserSchema.parse(data);
    },

    update: async (id: string, payload: UpdateUserInput): Promise<User> => {
        const data = await api.url(`/users/${id}`).patch(payload).json();
        return UserSchema.parse(data);
    },

    delete: async (id: string): Promise<void> => {
        await api.url(`/users/${id}`).delete().res();
    }
};
```

## Step 6: Verify the Generated Hooks

The generated `src/features/user/useUser.ts` provides these hooks:

```typescript
import useSWR from "swr";
import { userService } from "./user.service";

// Hook for a single user
export const useUser = (id: string | null) => {
  return useSWR(
    id ? ["user", id] : null, 
    () => userService.getById(id!),
    { revalidateOnFocus: false }
  );
};

// Hook for the full list
export const useUsers = () => {
  return useSWR(
    "users-list", 
    () => userService.getAll(),
    { revalidateOnFocus: false }
  );
};
```

Available hooks:
- `useUser(id)` - Fetch single user
- `useUsers()` - Fetch all users
- `useUpdateUser(id)` - Update user mutation (if using full template)
- `useDeleteUser()` - Delete user mutation (if using full template)

## Step 7: Create a Component to Display Users

Create `src/components/UserList.tsx`:

```typescript
import { useUsers } from "@/features/user";

export const UserList = () => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <div>📡 Loading users...</div>;
  if (error) return <div>❌ Error: {error.message}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Directory</h2>
      <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ padding: "8px" }}>ID</th>
            <th style={{ padding: "8px" }}>Name</th>
            <th style={{ padding: "8px" }}>Email</th>
            <th style={{ padding: "8px" }}>Website</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: "8px", textAlign: "center" }}>{user.id}</td>
              <td style={{ padding: "8px" }}>{user.name}</td>
              <td style={{ padding: "8px" }}>{user.email}</td>
              <td style={{ padding: "8px" }}>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

## Step 8: Update App.tsx

Replace the default `src/App.tsx` content:

```typescript
import { UserList } from "./components/UserList";

function App() {
  return (
    <div>
      <h1>My App</h1>
      <UserList />
    </div>
  );
}

export default App;
```

## Step 9: Run the Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173` (or the port shown in terminal).

You should see a table displaying 10 users from JSONPlaceholder!

## What You Get

Your generated feature includes:

✅ Type-safe API calls with Zod validation  
✅ Automatic data fetching with SWR  
✅ CRUD operations (Create, Read, Update, Delete)  
✅ Optimistic updates and cache management  
✅ Error handling and loading states  
✅ Pluralized API endpoints automatically  

## Bonus: Using Individual User Hook

To fetch a single user:

```typescript
import { useUser } from "@/features/user";

export const UserDetail = ({ userId }: { userId: string }) => {
  const { data: user, error, isLoading } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company.name}</p>
    </div>
  );
};
```

## Summary

1. Install dependencies
2. Create `src/services/api.ts` with base URL
3. Run `npm run plop` and enter "User"
4. Customize the schema to match JSONPlaceholder structure
5. Create a component using the generated hooks
6. Import and use the component in App.tsx
7. Run `npm run dev`

That's it! The plop generator handles all the boilerplate, and you just wire up the UI.
