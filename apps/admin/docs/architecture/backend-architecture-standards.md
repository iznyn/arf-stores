# Backend Architecture Standards

Complete documentation of backend architecture standards for the admin dashboard to ensure consistency, maintainability, and scalability across server-side code.

## Overview

This document defines the architectural standards for our Next.js admin dashboard backend, focusing on Server Actions with a 1-function-1-file structure, type safety, and consistent patterns.

## Directory Structure Standards

### Core Backend Structure

```
lib/
├── actions/                    # Server Actions (1 function per file)
│   ├── auth/                  # Authentication actions
│   │   ├── signIn.ts
│   │   ├── signOut.ts
│   │   └── refreshToken.ts
│   ├── users/                 # User management actions
│   │   ├── getUsers.ts
│   │   ├── getUserById.ts
│   │   ├── createUser.ts
│   │   ├── updateUser.ts
│   │   ├── deleteUser.ts
│   │   └── toggleUserStatus.ts
│   ├── products/              # Product management actions
│   │   ├── getProducts.ts
│   │   ├── getProductById.ts
│   │   ├── createProduct.ts
│   │   ├── updateProduct.ts
│   │   └── deleteProduct.ts
│   ├── orders/                # Order management actions
│   │   ├── getOrders.ts
│   │   ├── getOrderById.ts
│   │   ├── createOrder.ts
│   │   ├── updateOrderStatus.ts
│   │   └── cancelOrder.ts
│   └── customers/             # Customer management actions
│       ├── getCustomers.ts
│       ├── getCustomerById.ts
│       ├── createCustomer.ts
│       └── updateCustomer.ts
├── services/                  # Business logic services
│   ├── email/
│   │   ├── sendWelcomeEmail.ts
│   │   └── sendOrderConfirmation.ts
│   ├── payment/
│   │   ├── processPayment.ts
│   │   └── refundPayment.ts
│   └── notification/
│       ├── pushNotification.ts
│       └── inAppNotification.ts
├── utils/                     # Utility functions
│   ├── validation/
│   │   ├── userSchema.ts
│   │   ├── productSchema.ts
│   │   └── orderSchema.ts
│   ├── formatting/
│   │   ├── currency.ts
│   │   ├── date.ts
│   │   └── phone.ts
│   └── helpers/
│       ├── hashPassword.ts
│       ├── generateSKU.ts
│       └── calculateTotals.ts
├── types/                     # TypeScript types
│   ├── actions/
│   │   ├── user.types.ts
│   │   ├── product.types.ts
│   │   └── order.types.ts
│   ├── database/
│   │   ├── user.types.ts
│   │   └── product.types.ts
│   └── api/
│       ├── response.types.ts
│       └── request.types.ts
├── config/                    # Configuration files
│   ├── database.ts
│   ├── auth.ts
│   └── constants.ts
└── middleware/                # Custom middleware
    ├── auth.ts
    └── rateLimit.ts
```

## Server Actions Standards

### File Structure Rules

**1 Function Per File:**
```
✅ GOOD:
lib/actions/users/
├── getUsers.ts          // Only contains getUsers function
├── getUserById.ts       // Only contains getUserById function
└── createUser.ts        // Only contains createUser function

❌ BAD:
lib/actions/users.ts     // Multiple functions in one file
```

**No Index Files:**
- No `index.ts` files in action folders
- Import directly from function files
- Explicit imports for better tree-shaking

### Function Naming Conventions

**Pattern:** `verb + Entity` with descriptive names
```typescript
✅ GOOD:
- getUsers()
- getUserById()
- createUser()
- updateUser()
- deleteUser()

❌ BAD:
- users()
- user()
- create()
- update()
```

### Function Structure Template

```typescript
// lib/actions/users/getUsers.ts
"use server";

import { prisma } from "@arfcodes/database";
import { User } from "@/types/actions/user.types";

export async function getUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name || '',
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString().split('T')[0],
    }));
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}
```

### Return Type Standards

**Query Functions (GET):**
```typescript
// Success: Return data
export async function getUsers(): Promise<User[]> { ... }

// Not found: Return null
export async function getUserById(id: string): Promise<User | null> { ... }
```

**Mutation Functions (POST, PUT, DELETE):**
```typescript
// Success/Error object
export async function createUser(formData: FormData): Promise<{ success?: boolean; error?: string; user?: User }> { ... }
```

### Error Handling Standards

**Consistent Error Pattern:**
```typescript
try {
  // Database operation
  const result = await prisma.user.create({ ... });
  
  // Revalidate cache if needed
  revalidatePath('/users');
  
  return { success: true, user: result };
} catch (error) {
  console.error('Failed to create user:', error);
  return { error: 'Failed to create user' };
}
```

## Import Standards

### Direct Function Imports

```typescript
// ✅ GOOD: Direct imports
import { getUsers } from "@/lib/actions/users/getUsers";
import { getUserById } from "@/lib/actions/users/getUserById";
import { createUser } from "@/lib/actions/users/createUser";

// ❌ BAD: Index file imports (not allowed)
import { getUsers, getUserById, createUser } from "@/lib/actions/users";
```

### Import Order

1. Next.js/Server imports
2. External libraries
3. Internal imports (prisma, types, utils)
4. Related functions (same folder)

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@arfcodes/database";
import { User } from "@/types/actions/user.types";
import { validateUserInput } from "@/lib/utils/validation/userSchema";
```

## Type Safety Standards

### Type Definitions

**Action Types:** `lib/types/actions/`
```typescript
// lib/types/actions/user.types.ts
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: string;
};
```

**Function Signatures:**
```typescript
// Strong typing for all parameters and returns
export async function createUser(input: CreateUserInput): Promise<CreateUserResult> { ... }
```

## Validation Standards

### Input Validation

**Zod Schemas:** `lib/utils/validation/`
```typescript
// lib/utils/validation/userSchema.ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["ADMIN", "STAFF", "SUPER_ADMIN"]),
});
```

**Validation in Actions:**
```typescript
export async function createUser(formData: FormData) {
  // Extract and validate
  const input = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    // ...
  };
  
  const validatedInput = createUserSchema.parse(input);
  
  // Proceed with database operation
}
```

## Database Standards

### Query Patterns

**Optimized Selects:**
```typescript
// Only select needed fields
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    name: true,
    email: true,
    role: true,
    isActive: true,
    createdAt: true,
  },
});
```

**Consistent Ordering:**
```typescript
// Standard ordering pattern
orderBy: {
  createdAt: 'desc', // or 'asc' consistently
}
```

### Transaction Handling

```typescript
// For complex operations
export async function createOrderWithItems(orderData: OrderData, items: OrderItem[]) {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({ data: orderData });
    
    for (const item of items) {
      await tx.orderItem.create({ data: { ...item, orderId: order.id } });
    }
    
    return order;
  });
}
```

## API Route Standards (When Needed)

### Structure for External Access

```
lib/api/
├── external/
│   ├── webhook/
│   │   ├── paymentWebhook.ts
│   │   └── shippingWebhook.ts
│   └── integration/
│       ├── syncCustomers.ts
│       └── exportProducts.ts
```

### Route Handler Template

```typescript
// app/api/webhook/payment/route.ts
import { handlePaymentWebhook } from "@/lib/api/external/webhook/paymentWebhook";

export async function POST(request: NextRequest) {
  try {
    const result = await handlePaymentWebhook(await request.json());
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
```

## Service Layer Standards

### Business Logic Separation

**Services:** `lib/services/`
```typescript
// lib/services/email/sendWelcomeEmail.ts
export async function sendWelcomeEmail(userEmail: string, userName: string) {
  // Email sending logic
  // External API calls
  // Logging
}
```

**Called from Actions:**
```typescript
// lib/actions/users/createUser.ts
import { sendWelcomeEmail } from "@/lib/services/email/sendWelcomeEmail";

export async function createUser(formData: FormData) {
  // ... create user logic
  
  // Send welcome email
  await sendWelcomeEmail(user.email, user.name);
  
  return { success: true, user };
}
```

## Security Standards

### Input Sanitization

```typescript
// Always validate and sanitize
const validatedInput = createUserSchema.parse(input);
```

### Authentication Checks

```typescript
// In protected actions
import { getCurrentUser } from "@/lib/auth";

export async function deleteUser(userId: string) {
  const currentUser = await getCurrentUser();
  
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }
  
  // Proceed with deletion
}
```

## Performance Standards

### Caching Strategy

```typescript
import { revalidatePath } from "next/cache";

// After mutations
revalidatePath('/users');
revalidatePath('/dashboard');
```

### Query Optimization

```typescript
// Use select for specific fields
// Use include for relations
// Use where for filtering
// Implement pagination for large datasets
```

## Testing Standards

### Unit Tests

```
lib/actions/users/
├── getUsers.ts
├── getUserById.ts
├── createUser.ts
└── __tests__/
    ├── getUsers.test.ts
    ├── getUserById.test.ts
    └── createUser.test.ts
```

### Test Structure

```typescript
// __tests__/createUser.test.ts
import { createUser } from '../createUser';
import { mockPrisma } from '@/test-utils/mockPrisma';

describe('createUser', () => {
  it('should create a user successfully', async () => {
    // Test implementation
  });
});
```

## Migration Guide

### From Current Structure

1. **Split action files**: Move each function to its own file
2. **Update imports**: Change to direct imports
3. **Add validation**: Implement Zod schemas
4. **Add types**: Create type definitions
5. **Add tests**: Create test files

### Example Migration

```typescript
// Before: lib/actions/users.ts (multiple functions)
export async function getUsers() { ... }
export async function getUserById() { ... }
export async function createUser() { ... }

// After: 
// lib/actions/users/getUsers.ts (only getUsers)
// lib/actions/users/getUserById.ts (only getUserById)
// lib/actions/users/createUser.ts (only createUser)
```

## Benefits of This Architecture

1. **Maintainability**: Easy to find and modify specific functions
2. **Scalability**: Clear organization for growing codebase
3. **Type Safety**: Comprehensive TypeScript coverage
4. **Testing**: Isolated functions are easy to test
5. **Performance**: Better tree-shaking and bundle optimization
6. **Collaboration**: Clear file ownership and reduced conflicts
7. **Debugging**: Easier to trace issues to specific functions
