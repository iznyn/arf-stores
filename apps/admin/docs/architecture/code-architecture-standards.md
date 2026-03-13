# Code Architecture Standards

Complete documentation of routing and component structure standards for the admin dashboard to ensure consistency and maintainability across the project.

## Overview

This document defines the architectural standards for our Next.js admin dashboard, focusing on the separation of concerns between routing and components, following atomic design principles with feature-based organization.

## Folder Structure Standards

### App Router Structure (`apps/admin/src/app/`)

The `app/` folder is **exclusively for Next.js App Router routing** and should only contain:

```
app/
├── layout.tsx              # Root layout component
├── page.tsx                # Dashboard/home page
├── globals.css             # Global styles
├── login/
│   └── page.tsx            # Login page route
├── [feature]/              # Feature-based route folders
│   └── page.tsx            # Feature page component
└── api/                    # API routes only
    └── [...]
```

**Rules for app/ folder:**
- ✅ **ALLOWED**: `layout.tsx`, `page.tsx`, `route.ts`, `globals.css`
- ❌ **FORBIDDEN**: Reusable components, business logic, utilities
- 📝 **PURPOSE**: Routing and page-level layout only

### Components Structure (`apps/admin/src/components/`)

All reusable components organized by atomic design and feature:

```
components/
├── atoms/                  # Basic UI elements (buttons, inputs, badges)
├── molecules/              # Feature-specific combinations of atoms
│   ├── [Feature]/
│   │   ├── [Feature]ListColumns.tsx    # Table column definitions
│   │   ├── [Component].tsx             # Feature molecules
│   │   └── (future components)
├── organisms/              # Complex components
│   ├── Layout/
│   │   ├── ClientLayout.tsx
│   │   └── LayoutWrapper.tsx
│   ├── [Feature]/
│   │   ├── [Component].tsx            # Feature organisms
│   │   └── (future components)
└── templates/              # Page templates (when needed)
```

## Atomic Design Principles

### Atoms
- **Definition**: Basic UI elements that cannot be broken down further
- **Examples**: Button, Input, Badge, Icon, Label
- **Location**: `components/atoms/`
- **Naming**: PascalCase, descriptive (e.g., `PrimaryButton.tsx`)

### Molecules
- **Definition**: Combinations of atoms that work together
- **Examples**: Table columns, form fields, search bars
- **Location**: `components/molecules/[Feature]/`
- **Naming**: Feature-specific, descriptive (e.g., `UserListColumns.tsx`)

### Organisms
- **Definition**: Complex components composed of molecules and atoms
- **Examples**: Forms, dialogs, layouts, data tables
- **Location**: `components/organisms/[Feature]/`
- **Naming**: Component-specific (e.g., `UserForm.tsx`, `DeleteUserDialog.tsx`)

### Templates
- **Definition**: Page-level layouts with placeholder content
- **Examples**: Dashboard template, settings template
- **Location**: `components/templates/`
- **Usage**: When multiple pages share the same layout structure

## Feature-Based Organization

### Folder Structure per Feature

Each feature gets its own folder within the appropriate atomic level:

```
components/
├── molecules/User/
│   ├── UserListColumns.tsx
│   ├── UserSearchBar.tsx
│   └── UserFilterPanel.tsx
└── organisms/User/
    ├── UserForm.tsx
    ├── DeleteUserDialog.tsx
    └── UserStatsCard.tsx
```

### Naming Conventions

**Table Columns:**
- Pattern: `[Feature][TableType]Columns.tsx`
- Examples: `UserListColumns.tsx`, `ProductArchiveColumns.tsx`
- Location: `components/molecules/[Feature]/`

**Dialogs:**
- Pattern: `[Action][Entity]Dialog.tsx`
- Examples: `DeleteUserDialog.tsx`, `EditProductDialog.tsx`
- Location: `components/organisms/[Feature]/`

**Forms:**
- Pattern: `[Entity]Form.tsx`
- Examples: `UserForm.tsx`, `ProductForm.tsx`
- Location: `components/organisms/[Feature]/`

## Import Standards

### Import Path Patterns

Use absolute imports with `@/` prefix:

```typescript
// Layout components
import { ClientLayout } from '@/components/organisms/Layout/ClientLayout'

// Feature components
import { UserListColumns } from '@/components/molecules/User/UserListColumns'
import { DeleteUserDialog } from '@/components/organisms/User/DeleteUserDialog'

// Reusable atoms
import { Button } from '@/components/atoms/Button'
```

### Import Order

1. Next.js/React imports
2. External library imports
3. Internal imports (from @/components, @/lib, @/hooks)
4. Type imports (if separate)

```typescript
import React from 'react'
import { NextPage } from 'next'
import { Badge, Button } from '@arfcodes/ui'
import { UserListColumns } from '@/components/molecules/User/UserListColumns'
import { CreateUser } from '@/lib/actions/users'
import type { User } from '@/types/user'
```

## File Organization Standards

### When to Create Subfolders

Create subfolders when a feature has **3+ components** of the same type:

```
components/organisms/User/
├── Tables/                  # Multiple table components
│   ├── UserListTable.tsx
│   └── UserArchiveTable.tsx
├── Forms/                   # Multiple form components
│   ├── UserForm.tsx
│   └── UserEditForm.tsx
└── Dialogs/                 # Multiple dialog components
    ├── DeleteUserDialog.tsx
    └── UserStatusDialog.tsx
```

### File Naming Rules

- **Components**: PascalCase (e.g., `UserForm.tsx`)
- **Utilities**: camelCase (e.g., `userUtils.ts`)
- **Types**: PascalCase with `.types.ts` suffix (e.g., `User.types.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `USER_CONSTANTS.ts`)

## Component Standards

### Component Structure

```typescript
'use client'  // Only if using client-side features

import React from 'react'
import { Button } from '@/components/atoms/Button'

interface ComponentProps {
  // Props interface
}

export function ComponentName({ prop }: ComponentProps) {
  // Component logic
  
  return (
    // JSX
  )
}
```

### Export Standards

- **Default export**: For main component exports
- **Named exports**: For utilities, types, constants
- **Index files**: Use only when re-exporting multiple components

## Routing Standards

### Page Component Structure

```typescript
// app/users/page.tsx
import React from 'react'
import { UserListColumns } from '@/components/molecules/User/UserListColumns'
import { DataTable } from '@/components/molecules/DataTable'

export default function UsersPage() {
  return (
    <div>
      {/* Page content */}
    </div>
  )
}
```

### Route Organization

- **Static routes**: `app/users/page.tsx`
- **Dynamic routes**: `app/users/[id]/page.tsx`
- **Nested routes**: `app/users/[id]/edit/page.tsx`
- **API routes**: `app/api/users/route.ts`

## Development Guidelines

### Adding New Features

1. **Create route**: Add page.tsx in appropriate app/ folder
2. **Create components**: Add to components/[atomic-level]/[Feature]/
3. **Update imports**: Use absolute paths
4. **Follow naming**: Use established conventions

### Refactoring Existing Code

1. **Identify components**: Find reusable components in app/ folder
2. **Categorize**: Determine atomic level (atom, molecule, organism)
3. **Move**: Place in appropriate components/ folder
4. **Update imports**: Fix all import references
5. **Test**: Verify functionality remains intact

## Quality Standards

### Code Review Checklist

- [ ] Components are in correct atomic level folder
- [ ] Naming follows established conventions
- [ ] Imports use absolute paths with @/
- [ ] No business logic in app/ folder
- [ ] Feature components are properly grouped
- [ ] File structure is scalable and maintainable

### Documentation Requirements

- **Complex components**: Add JSDoc comments
- **Feature folders**: Add README.md for complex features
- **API changes**: Update relevant documentation

## Common Patterns

### Table Pattern

```typescript
// components/molecules/User/UserListColumns.tsx
export const userListColumns: ColumnDef<User>[] = [
  // Column definitions
]

// app/users/page.tsx
import { userListColumns } from '@/components/molecules/User/UserListColumns'
```

### Form Pattern

```typescript
// components/organisms/User/UserForm.tsx
export function UserForm({ user, onSubmit }: UserFormProps) {
  // Form logic
}

// app/users/new/page.tsx
import { UserForm } from '@/components/organisms/User/UserForm'
```

### Dialog Pattern

```typescript
// components/organisms/User/DeleteUserDialog.tsx
export function DeleteUserDialog({ userId }: DeleteUserDialogProps) {
  // Dialog logic
}

// app/users/page.tsx
import { DeleteUserDialog } from '@/components/organisms/User/DeleteUserDialog'
```

## Migration Guide

### From Old Structure

1. **Identify**: Find components in app/ folder
2. **Categorize**: Determine atomic level and feature
3. **Move**: Relocate to appropriate components/ folder
4. **Rename**: Update to follow naming conventions
5. **Update**: Fix all import paths
6. **Test**: Verify everything works

### Example Migration

```typescript
// Before: app/users/columns.tsx
export const columns = [...]

// After: components/molecules/User/UserListColumns.tsx
export const userListColumns: ColumnDef<User>[] = [...]
```

This architecture ensures:
- **Clear separation** of routing and components
- **Scalable organization** as features grow
- **Consistent naming** across the codebase
- **Easy maintenance** and onboarding
- **Reusable components** following atomic design
