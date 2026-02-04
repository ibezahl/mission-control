# 👨‍💻 Mission Control - Developer Guide

Guide for developers wanting to contribute or extend Mission Control.

## Project Architecture

```
┌─────────────────────────────────────────────────┐
│              Next.js 16 Frontend                │
│  (React, TypeScript, Tailwind, dnd-kit)        │
├─────────────────────────────────────────────────┤
│           Supabase JavaScript SDK               │
│  (Auth, Database, Realtime)                    │
├─────────────────────────────────────────────────┤
│              Supabase Backend                   │
│  (PostgreSQL, Auth, Realtime, Vector DB)      │
└─────────────────────────────────────────────────┘
```

## Code Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout (global styles)
│   ├── page.tsx           # Auth page
│   └── dashboard/
│       └── page.tsx       # Main kanban dashboard
│
├── components/            # Reusable React components
│   ├── AuthPage.tsx       # Sign up / login form
│   ├── KanbanBoard.tsx    # Main board logic
│   ├── Column.tsx         # Drop zone for tasks
│   ├── TaskCard.tsx       # Individual task item
│   └── TaskForm.tsx       # Add/edit task modal
│
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client initialization
│   ├── auth.ts           # Auth functions (sign up, sign in, etc.)
│   └── tasks.ts          # Task CRUD operations
│
└── types/                 # TypeScript type definitions
    └── index.ts          # Task, User, KanbanColumn types
```

## Key Technologies

### Frontend Stack
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS (cyberpunk theme)
- **dnd-kit**: Lightweight drag & drop library

### Backend Stack
- **Supabase**: Open-source Firebase alternative
  - PostgreSQL database
  - JWT authentication
  - Realtime subscriptions
  - Row-level security (RLS)

### Deployment
- **Vercel**: Next.js hosting platform

## Development Setup

### Prerequisites
- Node.js 18+ (check with `node --version`)
- Git
- Supabase account (free tier works)
- Code editor (VS Code recommended)

### Initial Setup

```bash
# Clone repo
git clone https://github.com/ibezahl/mission-control.git
cd mission-control

# Install dependencies
npm install

# Create .env.local
echo 'NEXT_PUBLIC_SUPABASE_URL=your_url' > .env.local
echo 'NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key' >> .env.local

# Start dev server
npm run dev
```

Visit http://localhost:3000

### Environment Variables

```env
# .env.local (NEVER commit this!)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

**Why NEXT_PUBLIC_?**
- These variables are exposed to browser (public)
- Safe because Supabase Anon Key has limited permissions
- Prefixed with `NEXT_PUBLIC_` in Next.js

## Common Development Tasks

### Adding a New Feature

1. **Create types** (if needed)
   ```typescript
   // src/types/index.ts
   export interface MyNewType {
     id: string;
     name: string;
   }
   ```

2. **Create database table** (if needed)
   ```sql
   -- Supabase SQL Editor
   CREATE TABLE my_table (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES users(id),
     name TEXT NOT NULL
   );
   ```

3. **Create library functions** (CRUD operations)
   ```typescript
   // src/lib/myfeature.ts
   export async function getMyItems(userId: string) {
     const { data, error } = await supabase
       .from('my_table')
       .select('*')
       .eq('user_id', userId);
     return { data, error };
   }
   ```

4. **Create component**
   ```typescript
   // src/components/MyFeature.tsx
   'use client'; // Required for interactivity
   import { getMyItems } from '@/lib/myfeature';
   
   export default function MyFeature() {
     // Component code
   }
   ```

5. **Add to dashboard or page**
   ```typescript
   // src/app/dashboard/page.tsx
   import MyFeature from '@/components/MyFeature';
   
   export default function Dashboard() {
     return (
       <div>
         {/* ... existing code ... */}
         <MyFeature />
       </div>
     );
   }
   ```

### Debugging

#### Browser Console
```javascript
// Check if Supabase is loaded
window.supabase  // Should be undefined (SDK on server)

// Check Network tab
// Look for requests to your supabase domain
```

#### Supabase Dashboard
```
1. Go to Supabase dashboard
2. Check "Database" → View tables
3. Check "Realtime" → See events
4. Check "Authentication" → See users
5. Check "Logs" → Query performance
```

#### VS Code Debugging
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/next",
      "runtimeArgs": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

## Best Practices

### TypeScript
- Always type function parameters and returns
- Use interfaces for objects
- Avoid `any` type

```typescript
// ✅ Good
export async function getTask(id: string): Promise<Task | null> {
  // ...
}

// ❌ Bad
export async function getTask(id: any): any {
  // ...
}
```

### React Components
- Use `'use client'` for interactive components
- Lift state up when needed
- Memoize expensive computations

```typescript
// ✅ Good
'use client';
import { useState, useCallback } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(c => c + 1), []);
  // ...
}
```

### Error Handling
- Always handle Supabase errors
- Show user-friendly messages
- Log errors for debugging

```typescript
// ✅ Good
try {
  const { data, error } = await createTask(...);
  if (error) {
    console.error('Task creation failed:', error);
    throw new Error('Failed to create task');
  }
  return data;
} catch (err) {
  console.error('Unexpected error:', err);
  throw err;
}
```

### Styling
- Use Tailwind classes (no inline styles)
- Follow cyberpunk color scheme
- Ensure responsive design

```tsx
// ✅ Good
<button className="bg-cyber-border text-cyber-bg px-4 py-2 hover:bg-cyber-accent">
  Click me
</button>

// ❌ Bad
<button style={{backgroundColor: '#00ff00', color: '#000000'}}>
  Click me
</button>
```

## Testing

### Manual Testing Checklist
```
Auth:
- [ ] Sign up works
- [ ] Confirmation email received
- [ ] Login works
- [ ] Logout works
- [ ] Can't access dashboard without login

Board:
- [ ] All 6 columns visible
- [ ] Can add task to each column
- [ ] Can drag between columns
- [ ] Can edit task
- [ ] Can delete task
- [ ] Realtime sync works (2 tabs)

Mobile:
- [ ] Responsive on iPhone
- [ ] Touch drag works
- [ ] Can scroll horizontally
- [ ] Buttons tappable
```

### Automated Testing (Future)

```bash
# Setup Jest (not yet in project)
npm install --save-dev jest @testing-library/react

# Write tests
// __tests__/TaskCard.test.tsx
import { render, screen } from '@testing-library/react';
import TaskCard from '@/components/TaskCard';

test('renders task title', () => {
  const task = { /* mock */ };
  render(<TaskCard task={task} />);
  expect(screen.getByText('Task Title')).toBeInTheDocument();
});
```

## Performance Optimization

### Current Metrics
- FCP (First Contentful Paint): ~1.5s
- LCP (Largest Contentful Paint): ~2s
- CLS (Cumulative Layout Shift): <0.1

### Areas for Improvement
1. **Code splitting** - Split components dynamically
2. **Image optimization** - Use Next.js Image component
3. **Database indexing** - Add indexes to frequently queried columns
4. **Caching** - Cache user data in React Context
5. **Pagination** - Load tasks incrementally

Example code splitting:
```typescript
import dynamic from 'next/dynamic';

const TaskForm = dynamic(() => import('@/components/TaskForm'), {
  loading: () => <p>Loading form...</p>,
});
```

## Database Migrations

### Adding a New Field

```sql
-- 1. Add column to table
ALTER TABLE tasks ADD COLUMN priority TEXT DEFAULT 'medium';

-- 2. Update RLS policies (if needed)
ALTER POLICY "Users can read own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

-- 3. Create index for new column (if frequently queried)
CREATE INDEX tasks_priority_idx ON tasks(priority);

-- 4. Update TypeScript types
// src/types/index.ts
export interface Task {
  // ...
  priority: 'low' | 'medium' | 'high';
}

-- 5. Update components to use new field
// src/components/TaskCard.tsx
<span className="text-xs">{task.priority}</span>
```

## Deployment

### Vercel Deployment
```bash
# Vercel CLI
npm install -g vercel
vercel   # Follow prompts
```

### Environment Variables
Set in Vercel Project Settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Custom Domain
1. In Vercel: Add domain
2. Update DNS at your registrar
3. Wait 24-48 hours for DNS propagation

## Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **dnd-kit Docs**: https://docs.dndkit.com/
- **Tailwind Docs**: https://tailwindcss.com/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs/

## Getting Help

- **GitHub Issues**: https://github.com/ibezahl/mission-control/issues
- **Supabase Discord**: https://discord.supabase.com
- **Next.js Discord**: https://discord.gg/nextjs
- **Stack Overflow**: Tag with `nextjs`, `supabase`, `react`

---

**Happy coding!** 🚀
