
# Content Creation App - Schema & Code Documentation

## Database Schema

### Tables Overview

#### 1. `content_ideas` (Public - Read-only for all users)
Stores all content templates and guides.

```sql
- id: SERIAL PRIMARY KEY
- title: TEXT NOT NULL
- description: TEXT NOT NULL  
- category: TEXT NOT NULL (e.g., 'back-to-school', 'skill-mastery')
- target_audience: TEXT[] (e.g., ['premium', 'growth'])
- formats: TEXT[] (e.g., ['photo', 'reel', 'story'])
- difficulty: TEXT ('easy', 'medium', 'hard')
- engagement: TEXT ('low', 'medium', 'high')
- thumbnail: TEXT (image URL)
- features: TEXT[] (special features like 'Interactive Riddle')
- setup_planning_photo: TEXT[] (photo setup instructions)
- setup_planning_video: TEXT[] (video setup instructions)
- production_tips_photo: TEXT[] (photo production tips)
- production_tips_video: TEXT[] (video production tips)
- upload_track_photo: TEXT[] (photo upload guidelines)
- upload_track_video: TEXT[] (video upload guidelines)
- requirements: JSONB (structured requirements with name, duration, type, description)
- created_at: TIMESTAMP WITH TIME ZONE
```

**RLS Policy**: Public read access - anyone can view content ideas.

#### 2. `user_content_progress` (User-specific with RLS)
Tracks individual user progress on content creation.

```sql
- id: UUID PRIMARY KEY
- user_id: UUID REFERENCES auth.users(id)
- content_id: INTEGER REFERENCES content_ideas(id)
- selected_format: TEXT ('photo' or 'video')
- upload_progress: JSONB (tracks completion percentage per requirement)
- uploaded_files: JSONB (stores file metadata)
- draft_data: JSONB (saves work in progress)
- status: TEXT DEFAULT 'not-started'
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE
```

**RLS Policy**: Users can only access their own progress records.

#### 3. `user_favorites` (User-specific with RLS)
Tracks which content ideas users have favorited.

```sql
- id: UUID PRIMARY KEY
- user_id: UUID REFERENCES auth.users(id)
- content_id: INTEGER REFERENCES content_ideas(id)
- created_at: TIMESTAMP WITH TIME ZONE
```

**RLS Policy**: Users can only access their own favorites.

### Storage

#### `content-uploads` Bucket
- **Purpose**: Store user-uploaded video/photo files
- **Public**: Yes (for easy access)
- **Structure**: Files organized by user ID in folders
- **RLS Policies**: Users can only upload/view files in their own folders

## Code Architecture

### Authentication System

#### Core Hook: `useAuth`
- Manages user session state
- Handles sign in/up/out operations
- Provides loading states
- Uses Supabase auth with email/password

#### Authentication Flow
1. Unauthenticated users see landing page (`/`)
2. Auth page (`/auth`) handles login/signup
3. `AuthGuard` component protects authenticated routes
4. Successful auth redirects to `/content-library`

### Data Layer

#### Content Management
- `useContentIdeas()`: Fetches all content templates
- `useUserFavorites()`: Manages user's favorite content
- `useToggleFavorite()`: Adds/removes favorites

#### File Upload System
- Files uploaded to Supabase Storage
- Progress tracking with visual indicators
- File validation (video/image types)
- Session storage for editor handoff

### Component Structure

#### Main Pages
- `/` - Landing page with auth link
- `/auth` - Login/signup forms
- `/content-library` - Main content browsing (protected)
- `/editor` - Content editing workspace (protected)

#### Key Components

**ContentLibrary**
- Displays content grid with search/filter
- Tabs for different categories
- Integrates favorites system

**ContentCard** 
- Shows content preview with metadata
- Favorite toggle functionality
- Opens ContentGuide modal

**ContentGuide**
- Modal with detailed content instructions
- Format selector (photo/video)
- File upload requirements
- Progress tracking
- Transitions to editor when ready

**AuthGuard**
- Protects routes requiring authentication
- Shows loading state during auth check
- Redirects to /auth if not authenticated

## Business Rules & Constraints

### Authentication Rules
1. **Required for all content interaction**: Users must be authenticated to view detailed guides, upload files, or save progress
2. **Email verification**: Optional but recommended for production
3. **Session persistence**: Uses localStorage for session management

### Content Access Rules
1. **Public content discovery**: Anyone can browse content ideas
2. **Private progress tracking**: Each user's progress is isolated
3. **File ownership**: Users can only access files they uploaded

### Upload Rules
1. **File types**: Videos and images only
2. **File organization**: Stored in user-specific folders
3. **Progress requirements**: All requirements must be completed before editor access
4. **Session handoff**: Files passed to editor via sessionStorage

### Data Validation
1. **Required fields**: All content template fields are mandatory
2. **Array fields**: Target audience, formats, features stored as PostgreSQL arrays
3. **JSON requirements**: Requirements field uses structured JSONB format
4. **Foreign keys**: Proper relationships between users, content, and progress

## Development Guidelines

### Adding New Content
1. Insert into `content_ideas` table with all required fields
2. Ensure requirements JSON follows the established structure
3. Add appropriate RLS policies if needed

### Extending User Features
1. Always check authentication state before data operations
2. Use RLS policies to ensure data isolation
3. Update TypeScript types when adding new fields

### File Handling
1. Use Supabase Storage for all file operations
2. Organize files by user ID for security
3. Implement proper error handling for upload failures

### State Management
1. Use React Query for server state
2. Session/localStorage for temporary data
3. Supabase real-time subscriptions for live updates (if needed)

## Security Considerations

### Row Level Security (RLS)
- All user-specific tables have RLS enabled
- Policies enforce user isolation
- Content ideas remain publicly readable

### File Security
- Users can only access their own uploaded files
- Storage policies prevent cross-user access
- Public bucket with user-folder isolation

### Authentication Security
- Supabase handles password hashing/validation
- JWT tokens for session management
- Email verification available for production

## Performance Optimizations

### Database
- Indexes on foreign keys (user_id, content_id)
- JSONB for flexible but queryable data
- Proper relationships to avoid N+1 queries

### Frontend
- React Query for caching and background updates
- Lazy loading for content images
- Optimistic updates for favorites

### File Handling
- Direct upload to Supabase Storage
- Progress indicators for user feedback
- File size validation before upload

## Deployment Checklist

### Supabase Configuration
- [ ] Run all migrations
- [ ] Verify RLS policies are active
- [ ] Test authentication flows
- [ ] Configure storage bucket permissions
- [ ] Set up proper redirect URLs

### Frontend Configuration
- [ ] Update Supabase client configuration
- [ ] Test all protected routes
- [ ] Verify file upload functionality
- [ ] Test cross-browser compatibility

### Production Considerations
- [ ] Enable email verification
- [ ] Set up proper error monitoring
- [ ] Configure backup strategies
- [ ] Monitor performance metrics
