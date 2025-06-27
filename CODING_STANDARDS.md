
# Coding Standards & Best Practices

## Project Overview
This document establishes coding standards, best practices, and quality guidelines for maintaining a consistent, reliable, and maintainable codebase.

## 1. Implementation Best Practices

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   └── [ComponentName].tsx
├── pages/              # Route-based page components
├── layouts/            # Layout wrapper components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── data/               # Static data and constants
└── lib/                # External library configurations
```

### File Organization Rules
- **One component per file**: Each React component should have its own file
- **Descriptive naming**: Use PascalCase for components, camelCase for functions
- **Index files**: Use index.ts files to create clean import paths
- **Co-location**: Keep related files close together

### Component Architecture
- **Small, focused components**: Aim for components under 100 lines
- **Single responsibility**: Each component should have one clear purpose
- **Props interface**: Always define TypeScript interfaces for props
- **Composition over inheritance**: Use component composition patterns

### Import Organization
```typescript
// 1. React and external libraries
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 3. Custom components and hooks
import CustomComponent from '@/components/CustomComponent';
import { useCustomHook } from '@/hooks/useCustomHook';

// 4. Utils and types
import { cn } from '@/lib/utils';
import type { CustomType } from '@/types';
```

## 2. Writing Functions Best Practices

### Function Structure
```typescript
// ✅ Good: Clear function with proper typing
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// ❌ Bad: Unclear function without types
const calc = (stuff) => {
  return stuff.map(x => x.a * x.b).reduce((a, b) => a + b);
};
```

### Naming Conventions
- **Functions**: Use descriptive verbs (`calculateTotal`, `handleSubmit`, `validateEmail`)
- **Variables**: Use descriptive nouns (`userEmail`, `totalPrice`, `isLoading`)
- **Constants**: Use UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRY_COUNT`)
- **Types/Interfaces**: Use PascalCase (`UserProfile`, `ApiResponse`)

### Function Guidelines
- **Pure functions**: Prefer functions without side effects
- **Single responsibility**: One function should do one thing well
- **Early returns**: Use early returns to reduce nesting
- **Error handling**: Handle errors gracefully with proper types

### React Component Patterns
```typescript
// ✅ Good: Well-structured component
interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
}

const UserCard = ({ user, onEdit }: UserCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="p-4">
      <h3>{user.name}</h3>
      {isExpanded && <p>{user.bio}</p>}
      <Button onClick={handleToggleExpand}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </Button>
    </Card>
  );
};
```

### State Management
- **useState**: For simple local state
- **useEffect**: For side effects and lifecycle events
- **Custom hooks**: For reusable stateful logic
- **React Query**: For server state management

## 3. Testing Best Practices

### Testing Philosophy
- **Test behavior, not implementation**: Focus on what the user experiences
- **Test pyramid**: More unit tests, fewer integration tests, minimal e2e tests
- **Fail fast**: Tests should fail quickly and provide clear error messages

### What to Test
- **User interactions**: Button clicks, form submissions, navigation
- **API integration**: Data fetching, error handling, loading states
- **Edge cases**: Empty states, error states, boundary conditions
- **Accessibility**: Screen reader compatibility, keyboard navigation

### Testing Patterns
```typescript
// Example test structure (conceptual)
describe('UserCard Component', () => {
  it('should display user information correctly', () => {
    // Arrange: Set up test data
    // Act: Render component or trigger action
    // Assert: Verify expected outcome
  });
  
  it('should handle expand/collapse functionality', () => {
    // Test user interactions
  });
  
  it('should handle loading and error states', () => {
    // Test different states
  });
});
```

### Manual Testing Checklist
- [ ] Component renders without errors
- [ ] All interactive elements work as expected
- [ ] Responsive design works on different screen sizes
- [ ] Loading states display appropriately
- [ ] Error states are handled gracefully
- [ ] Accessibility features work (keyboard navigation, screen readers)

## 4. Code Quality Standards

### TypeScript Usage
- **Strict mode**: Always use strict TypeScript configuration
- **Explicit types**: Define interfaces for props, API responses, and complex objects
- **No any**: Avoid using `any` type; use proper typing or `unknown`

### Performance Considerations
- **Lazy loading**: Use React.lazy for code splitting
- **Memoization**: Use React.memo, useMemo, useCallback appropriately
- **Bundle size**: Monitor and optimize bundle size
- **Image optimization**: Optimize images and use appropriate formats

### Security Best Practices
- **Input validation**: Validate all user inputs
- **XSS prevention**: Properly escape user-generated content
- **API security**: Use proper authentication and authorization
- **Environment variables**: Keep sensitive data in environment variables

## 5. Git and Version Control

### Commit Messages
```
feat: add user profile component
fix: resolve navigation bug on mobile
docs: update API documentation
refactor: simplify authentication logic
```

### Branch Naming
- `feature/user-profile-page`
- `fix/navigation-mobile-bug`
- `refactor/auth-logic`

## 6. Documentation Standards

### Component Documentation
```typescript
/**
 * UserCard - Displays user information in a card format
 * 
 * @param user - User object containing name, email, bio
 * @param onEdit - Callback function when edit button is clicked
 * @param isExpanded - Optional prop to control initial expanded state
 */
```

### README Requirements
- Clear project description
- Installation instructions
- Usage examples
- API documentation
- Contributing guidelines

---

*This document should be reviewed and updated regularly as the project evolves.*
