
# API Reference - Content Creation App

## Custom Hooks

### `useAuth()`
Authentication management hook.

**Returns:**
```typescript
{
  user: User | null;           // Current authenticated user
  session: Session | null;     // Current session
  loading: boolean;           // Loading state
  signIn: (email: string, password: string) => Promise<{error?: string}>;
  signUp: (email: string, password: string) => Promise<{error?: string}>;
  signOut: () => Promise<void>;
}
```

### `useContentIdeas()`
Fetches all content ideas from the database.

**Returns:**
```typescript
{
  data: ContentIdea[];        // Array of content ideas
  isLoading: boolean;         // Loading state
  error: Error | null;        // Error state
}
```

### `useUserFavorites()`
Fetches current user's favorite content IDs.

**Returns:**
```typescript
{
  data: number[];             // Array of content IDs
  isLoading: boolean;         // Loading state
  error: Error | null;        // Error state
}
```

### `useToggleFavorite()`
Mutation hook for adding/removing favorites.

**Returns:**
```typescript
{
  mutate: (params: {contentId: number, isFavorite: boolean}) => void;
  isLoading: boolean;         // Mutation loading state
  error: Error | null;        // Mutation error state
}
```

## Type Definitions

### `ContentIdea`
```typescript
type ContentIdea = {
  id: number;
  title: string;
  description: string;
  category: string;
  target_audience: string[];
  formats: string[];
  difficulty: string;
  engagement: string;
  thumbnail: string | null;
  features: string[];
  setup_planning_photo: string[];
  setup_planning_video: string[];
  production_tips_photo: string[];
  production_tips_video: string[];
  upload_track_photo: string[];
  upload_track_video: string[];
  requirements: RequirementItem[];
  created_at: string;
}
```

### `RequirementItem`
```typescript
type RequirementItem = {
  name: string;
  duration: string;
  type: 'intro' | 'main' | 'explanation' | 'outro' | 'challenge' | 'connection';
  completed: boolean;
  description: string;
}
```

## Component Props

### `ContentCard`
```typescript
interface ContentCardProps {
  idea: ContentIdea;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}
```

### `ContentGrid`
```typescript
interface ContentGridProps {
  ideas: ContentIdea[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}
```

### `ContentGuide`
```typescript
interface ContentGuideProps {
  open: boolean;
  onClose: () => void;
  contentId: number;
  contentData: ContentIdea;
}
```

### `AuthGuard`
```typescript
interface AuthGuardProps {
  children: React.ReactNode;
}
```

## Supabase Queries

### Content Ideas
```sql
-- Get all content ideas
SELECT * FROM content_ideas ORDER BY created_at ASC;

-- Get content by category
SELECT * FROM content_ideas WHERE category = 'back-to-school';
```

### User Favorites
```sql
-- Get user's favorites
SELECT content_id FROM user_favorites WHERE user_id = auth.uid();

-- Add favorite
INSERT INTO user_favorites (user_id, content_id) VALUES (auth.uid(), $1);

-- Remove favorite
DELETE FROM user_favorites WHERE user_id = auth.uid() AND content_id = $1;
```

### User Progress
```sql
-- Get user's progress for specific content
SELECT * FROM user_content_progress 
WHERE user_id = auth.uid() AND content_id = $1;

-- Update progress
UPDATE user_content_progress 
SET upload_progress = $1, uploaded_files = $2, updated_at = NOW()
WHERE user_id = auth.uid() AND content_id = $3;
```

## File Upload Flow

### 1. File Selection
```typescript
const handleFileUpload = (requirementName: string) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = selectedFormat === 'photo' ? 'image/*' : 'video/*';
  input.onchange = handleFileChange;
  input.click();
};
```

### 2. Progress Tracking
```typescript
// Update progress state
setUploadProgress(prev => ({ 
  ...prev, 
  [requirementName]: progressPercentage 
}));

// Store file metadata
setUploadedFiles(prev => ({ 
  ...prev, 
  [requirementName]: file 
}));
```

### 3. Editor Handoff
```typescript
// Prepare data for editor
const uploadedFilesList = Object.entries(uploadedFiles).map(([name, file]) => ({
  name: file.name,
  size: file.size,
  type: file.type,
  url: URL.createObjectURL(file),
  requirement: name
}));

// Store in session for editor
sessionStorage.setItem('uploadedFiles', JSON.stringify(uploadedFilesList));
sessionStorage.setItem('selectedTemplate', contentId.toString());
sessionStorage.setItem('contentFormat', selectedFormat);
```

## Error Handling Patterns

### Authentication Errors
```typescript
const { error } = await signIn(email, password);
if (error) {
  toast.error(error);
} else {
  toast.success('Welcome back!');
  navigate('/content-library');
}
```

### File Upload Errors
```typescript
if (!file.type.startsWith('video/')) {
  toast.error('Please select a video file');
  return;
}

// Success case
toast.success(`${file.name} uploaded successfully!`);
```

### Database Query Errors
```typescript
const { data, error } = await supabase
  .from('content_ideas')
  .select('*');

if (error) throw error; // Let React Query handle the error
return data;
```
