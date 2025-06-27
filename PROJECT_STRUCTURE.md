
# Project Structure & Organization

## Overview
This document explains how the codebase is organized and the reasoning behind the structure.

## Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui library)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── ContentCard.tsx # Custom business components
│   ├── ContentGuide.tsx
│   └── SidebarNav.tsx
├── pages/              # Route-based page components
│   ├── Dashboard.tsx
│   ├── ContentLibrary.tsx
│   ├── ContentUpload.tsx
│   └── ...
├── layouts/            # Layout wrapper components
│   └── AppLayout.tsx
├── hooks/              # Custom React hooks
│   └── use-mobile.tsx
├── utils/              # Utility functions and helpers
│   ├── contentUtils.tsx
│   ├── codeQuality.ts
│   ├── testRunner.ts
│   └── codeCommands.ts
├── data/               # Static data and constants
│   └── contentIdeas.ts
└── lib/                # External library configurations
    └── utils.ts
```

## Component Organization

### UI Components (`/components/ui/`)
These are base components from the shadcn/ui library:
- **Purpose**: Provide consistent, accessible UI primitives
- **Examples**: Button, Card, Dialog, Input, etc.
- **Naming**: kebab-case file names, PascalCase component names
- **Usage**: Import and use as building blocks for custom components

### Custom Components (`/components/`)
Business-specific components that use UI components:
- **Purpose**: Implement specific application features
- **Examples**: ContentCard, SidebarNav, ContentGuide
- **Naming**: PascalCase for both files and components
- **Structure**: One component per file, with clear props interfaces

### Pages (`/pages/`)
Route-level components that represent full pages:
- **Purpose**: Top-level views that users navigate to
- **Examples**: Dashboard, ContentLibrary, Settings
- **Routing**: Connected to React Router in App.tsx
- **Structure**: Compose smaller components to build complete pages

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase.tsx | `ContentCard.tsx` |
| UI Components | kebab-case.tsx | `button.tsx` |
| Hooks | use-kebab-case.tsx | `use-mobile.tsx` |
| Utils | camelCase.ts | `contentUtils.ts` |
| Pages | PascalCase.tsx | `Dashboard.tsx` |
| Types | PascalCase.ts | `ContentTypes.ts` |

## Import Path Strategy

### Absolute Imports
Use `@/` prefix for clean imports:
```typescript
import { Button } from '@/components/ui/button';
import ContentCard from '@/components/ContentCard';
import { contentUtils } from '@/utils/contentUtils';
```

### Import Order
1. React and external libraries
2. UI components
3. Custom components
4. Hooks and utils
5. Types and constants

## Component Architecture Patterns

### Container vs Presentational
- **Container Components**: Handle state and logic (pages, complex components)
- **Presentational Components**: Focus on rendering UI (UI components, simple displays)

### Composition Pattern
```typescript
// Good: Flexible composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>

// Avoid: Rigid, hard-to-customize components
<CustomCardWithEverything title="Title" content="Content" />
```

### Props Interface Pattern
```typescript
interface ComponentProps {
  // Required props first
  title: string;
  items: Item[];
  
  // Optional props with defaults
  variant?: 'default' | 'compact';
  showHeader?: boolean;
  
  // Event handlers
  onItemClick?: (item: Item) => void;
  onClose?: () => void;
}
```

## State Management Strategy

### Local State (useState)
For component-specific state that doesn't need to be shared:
```typescript
const [isExpanded, setIsExpanded] = useState(false);
const [inputValue, setInputValue] = useState('');
```

### Server State (React Query)
For data fetching and server state management:
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['content', contentId],
  queryFn: () => fetchContent(contentId),
});
```

### Global State
Currently using props drilling and context where needed. Consider adding Zustand or Redux Toolkit for complex global state.

## Code Quality Tools Integration

### Automated Checking
Use the built-in code quality tools:
```javascript
// In browser console or development
codeTest(); // Runs automated quality checks
showCodeHelp(); // Shows available commands
```

### Manual Testing
Follow the testing guidelines in `CODING_STANDARDS.md` and use the test runner utility.

## Development Workflow

### Adding New Features
1. **Plan the structure**: Identify if you need new components, pages, or utils
2. **Create focused files**: One component per file, small and focused
3. **Follow naming conventions**: Use established patterns
4. **Add proper TypeScript types**: Define interfaces for props and data
5. **Test functionality**: Use manual testing guidelines
6. **Check code quality**: Run `codeTest()` to verify standards

### Refactoring Guidelines
- **When a file gets too large** (>100 lines): Break into smaller components
- **When logic is repeated**: Extract to utility functions or custom hooks
- **When props become complex**: Consider component composition
- **When state management gets complex**: Consider state management solutions

## Future Considerations

### Potential Additions
- **State Management**: Zustand or Redux Toolkit for complex global state
- **API Layer**: Dedicated API service layer with proper error handling
- **Testing Framework**: Jest and React Testing Library for automated tests
- **Storybook**: Component documentation and development environment

### Scalability Patterns
- **Feature-based organization**: Group related files by feature rather than type
- **Barrel exports**: Use index.ts files for cleaner imports
- **Lazy loading**: Implement code splitting for better performance
- **Design system**: Formalize component library with design tokens

---

This structure provides a solid foundation for maintaining and scaling the application while keeping code organized and maintainable.
