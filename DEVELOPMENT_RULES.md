
# Development Rules & Best Practices

## Code Organization Rules

### 1. File Structure
- **Pages**: Large route components in `/src/pages/`
- **Components**: Reusable UI components in `/src/components/`
- **Hooks**: Custom hooks in `/src/hooks/`
- **Utils**: Helper functions in `/src/utils/`
- **Types**: TypeScript definitions in `/src/types/` (if needed)

### 2. Component Size Limits
- **Maximum 50 lines per component** - refactor if larger
- **Single responsibility** - each component does one thing well
- **Extract hooks** when components get complex

### 3. Import Organization
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import { useQuery } from '@tanstack/react-query';

// 3. Internal imports
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

// 4. Type imports (if needed)
import type { ContentIdea } from '@/hooks/useContentIdeas';
```

## Authentication Rules

### 1. Route Protection
```typescript
// Always wrap protected routes with AuthGuard
<Route path="/content-library" element={
  <AuthGuard>
    <ContentLibrary />
  </AuthGuard>
} />
```

### 2. User State Checks
```typescript
// Check both user and loading state
if (loading) return <LoadingSpinner />;
if (!user) return <Navigate to="/auth" />;
```

### 3. Auth State Management
```typescript
// Always use both session and user
const [user, setUser] = useState<User | null>(null);
const [session, setSession] = useState<Session | null>(null);

// Set up listener before getting session
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    }
  );

  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);
```

## Database Interaction Rules

### 1. Always Use RLS
- Enable RLS on all user-specific tables
- Create policies for each operation (SELECT, INSERT, UPDATE, DELETE)
- Test policies thoroughly

### 2. Query Patterns
```typescript
// Good: Let React Query handle errors
const { data, error } = useQuery({
  queryKey: ['content-ideas'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('content_ideas')
      .select('*');
    if (error) throw error; // React Query will catch this
    return data;
  },
});

// Bad: Swallowing errors
const { data, error } = await supabase.from('content_ideas').select('*');
if (error) {
  console.log(error); // Don't do this
  return [];
}
```

### 3. Mutation Patterns
```typescript
const mutation = useMutation({
  mutationFn: async (params) => {
    const { error } = await supabase
      .from('user_favorites')
      .insert(params);
    if (error) throw error;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user-favorites'] });
    toast.success('Added to favorites!');
  },
  onError: (error) => {
    toast.error('Failed to add favorite: ' + error.message);
  },
});
```

## UI/UX Rules

### 1. Loading States
```typescript
// Always show loading states
if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
}
```

### 2. Error Handling
```typescript
// Use toast for user feedback
import { toast } from 'sonner';

// Success
toast.success('Content saved successfully!');

// Error
toast.error('Failed to save content');

// Info
toast.info('Upload in progress...');
```

### 3. Form Validation
```typescript
// Always validate on both client and server
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!email || !password) {
    toast.error('Please fill in all fields');
    return;
  }
  
  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return;
  }
  
  // Proceed with submission
};
```

## File Upload Rules

### 1. File Validation
```typescript
// Always validate file types
const validateFile = (file: File, expectedType: 'image' | 'video') => {
  const isValidType = expectedType === 'image' 
    ? file.type.startsWith('image/') 
    : file.type.startsWith('video/');
    
  if (!isValidType) {
    toast.error(`Please select a ${expectedType} file`);
    return false;
  }
  
  return true;
};
```

### 2. Progress Tracking
```typescript
// Always show upload progress
const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

// Simulate progress (replace with real progress in production)
let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  setUploadProgress(prev => ({ ...prev, [fileName]: progress }));
  if (progress >= 100) {
    clearInterval(interval);
    toast.success('Upload complete!');
  }
}, 200);
```

### 3. File Organization
```typescript
// Organize files by user ID
const uploadPath = `${user.id}/${fileName}`;

const { error } = await supabase.storage
  .from('content-uploads')
  .upload(uploadPath, file);
```

## Performance Rules

### 1. React Query Configuration
```typescript
// Always use object syntax for queries
const { data, isLoading } = useQuery({
  queryKey: ['content-ideas'],
  queryFn: fetchContentIdeas,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

### 2. Memoization
```typescript
// Memoize expensive calculations
const filteredContent = useMemo(() => 
  ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchTerm.toLowerCase())
  ), [ideas, searchTerm]
);

// Memoize callbacks
const handleToggleFavorite = useCallback((id: number) => {
  toggleFavorite.mutate({ contentId: id, isFavorite: favorites.includes(id) });
}, [favorites, toggleFavorite]);
```

### 3. Lazy Loading
```typescript
// Lazy load heavy components
const Editor = lazy(() => import('./pages/Editor'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Editor />
</Suspense>
```

## Security Rules

### 1. Never Expose Sensitive Data
```typescript
// Good: Use environment variables
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";

// Bad: Hardcoding secrets (never do this)
const SECRET_KEY = "super-secret-key"; // Don't do this!
```

### 2. Validate User Input
```typescript
// Always sanitize and validate
const sanitizeInput = (input: string) => {
  return input.trim().replace(/[<>]/g, '');
};

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### 3. RLS Policy Examples
```sql
-- Users can only see their own data
CREATE POLICY "Users can view their own progress" 
ON user_content_progress FOR SELECT 
USING (auth.uid() = user_id);

-- Users can only modify their own data
CREATE POLICY "Users can update their own progress" 
ON user_content_progress FOR UPDATE 
USING (auth.uid() = user_id);
```

## Testing Rules

### 1. Component Testing
```typescript
// Test key user interactions
test('should toggle favorite when heart is clicked', () => {
  const mockToggle = jest.fn();
  render(<ContentCard onToggleFavorite={mockToggle} />);
  
  fireEvent.click(screen.getByRole('button', { name: /favorite/i }));
  expect(mockToggle).toHaveBeenCalledWith(1);
});
```

### 2. Integration Testing
```typescript
// Test complete user flows
test('should allow user to upload file and proceed to editor', async () => {
  render(<ContentGuide />);
  
  // Upload file
  const fileInput = screen.getByLabelText(/upload/i);
  fireEvent.change(fileInput, { target: { files: [mockFile] } });
  
  // Wait for upload to complete
  await waitFor(() => {
    expect(screen.getByText(/upload complete/i)).toBeInTheDocument();
  });
  
  // Check if start creating button is enabled
  expect(screen.getByRole('button', { name: /start creating/i })).toBeEnabled();
});
```

### 3. Database Testing
```typescript
// Test RLS policies
test('should not allow user to access other user data', async () => {
  const { error } = await supabase
    .from('user_favorites')
    .select('*')
    .eq('user_id', 'other-user-id');
    
  expect(error).toBeTruthy();
});
```

## Deployment Rules

### 1. Environment Configuration
- Set up proper Supabase URL and keys
- Configure authentication redirect URLs
- Test all features in staging environment

### 2. Database Migrations
- Always run migrations in order
- Test migrations on staging data first
- Have rollback plan for each migration

### 3. File Storage Setup
- Configure storage buckets with proper permissions
- Test file upload/download flows
- Set up proper backup strategies

## Code Review Checklist

### Before Submitting
- [ ] All components under 50 lines
- [ ] Proper error handling implemented
- [ ] Loading states added
- [ ] TypeScript types defined
- [ ] RLS policies tested
- [ ] User feedback (toasts) implemented
- [ ] File validation added
- [ ] Authentication checks in place

### During Review
- [ ] Code follows established patterns
- [ ] No hardcoded secrets
- [ ] Proper query invalidation
- [ ] Error boundaries where needed
- [ ] Accessibility considerations
- [ ] Performance optimizations applied
- [ ] Security best practices followed
