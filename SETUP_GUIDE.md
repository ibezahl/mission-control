# 🚀 Mission Control - Complete Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: mission-control
   - **Database Password**: Choose strong password (save it)
   - **Region**: Pick closest to you
4. Wait for project to initialize (2-3 minutes)

## Step 2: Set Up Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste this entire SQL block:

```sql
-- Create users table (synced with auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  board_column TEXT NOT NULL CHECK (board_column IN ('top_priorities', 'job_search_pipe', 'intelligence_monitoring', 'tonights_mission', 'family_personal', 'done')),
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks(user_id);
CREATE INDEX IF NOT EXISTS tasks_board_column_idx ON tasks(board_column);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Enable Realtime on tasks table
ALTER TABLE tasks REPLICA IDENTITY FULL;
```

4. Click **"Run"** (or Ctrl+Enter)
5. You should see "✓ Success" messages

## Step 3: Enable Realtime

1. Go to **Realtime** section (left sidebar)
2. Click **Source** or **Replication** tab
3. Find `tasks` table and toggle it ON
4. Verify status shows "Replicating"

## Step 4: Get API Credentials

1. Go to **Settings** → **API** (left sidebar)
2. Under **Project API keys**, copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJhbG...`)

## Step 5: Clone & Configure App

```bash
# Clone the repository
git clone https://github.com/ibezahl/mission-control.git
cd mission-control

# Install dependencies
npm install
```

Create `.env.local` file in root directory:

```
NEXT_PUBLIC_SUPABASE_URL=https://your_project_id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace with your actual values from Step 4.

## Step 6: Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Create Test Account

1. Click **[SIGN UP]**
2. Enter email (e.g., `test@example.com`)
3. Enter password (min 6 chars)
4. Click **[SIGN UP]**
5. You should be redirected to dashboard

## Step 8: Deploy to Vercel

### Option A: Using GitHub (Recommended)

1. Push to GitHub:
```bash
git add .
git commit -m "Add .env.local with Supabase credentials"
git push
```

2. Go to [vercel.com](https://vercel.com)
3. Click **"Import Project"**
4. Select your GitHub repo (`ibezahl/mission-control`)
5. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = (from Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (from Supabase)
6. Click **Deploy**
7. Wait 2-3 minutes for build to complete
8. You'll get a live URL like `https://mission-control-xxx.vercel.app`

### Option B: Manual Vercel CLI

```bash
npm install -g vercel
vercel
# Follow the prompts, add env vars when asked
```

## Testing on Mobile (iPhone)

1. Get your deployed Vercel URL
2. On iPhone, open Safari and navigate to that URL
3. Test:
   - Sign up/login
   - Create a task
   - Drag tasks (should work with touch)
   - Rotate device (should adapt)

## Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Keys must NOT have quotes around them
- Restart dev server after changing env: `Ctrl+C` then `npm run dev`

### "Realtime not working"
- Go to Supabase dashboard → **Realtime** → verify `tasks` table is enabled
- Check browser console for errors (F12 → Console tab)
- Try refreshing page

### "Can't drag tasks"
- Ensure you're using a modern browser (Chrome, Safari, Firefox)
- Try refreshing the page
- Check that all npm packages installed correctly: `npm install`

### "Tasks not saving"
- Check Supabase **SQL Editor** → run this to verify table exists:
  ```sql
  SELECT * FROM tasks LIMIT 1;
  ```
- If table doesn't exist, run the SQL from Step 2 again
- Check browser console for API errors

### "Auth not working"
- Verify email signup is enabled in Supabase:
  - Go to **Authentication** → **Providers** → Email auth should be enabled
- Check that `.env.local` keys are correct
- Try signing up with a different email

## Database Schema Reference

### `users` table
```
id (UUID) - Primary key, linked to auth
email (TEXT) - User email
created_at (TIMESTAMP) - Account creation date
```

### `tasks` table
```
id (UUID) - Primary key
user_id (UUID) - Foreign key to users.id
title (TEXT) - Task title
description (TEXT) - Optional task description
column (TEXT) - Kanban column name
position (INTEGER) - Order within column
created_at (TIMESTAMP) - Creation date
updated_at (TIMESTAMP) - Last modified date
```

## API Endpoints Used

All requests go through Supabase client SDK (no REST calls needed):

- **Auth**: Supabase Auth API
- **Tasks**: Supabase PostgreSQL via JS client
- **Realtime**: Supabase Realtime subscriptions

## Security Notes

- All data is protected by Supabase Row Level Security (RLS)
- Users can only see/edit their own tasks
- Anon key is safe to expose (limited permissions)
- Passwords are hashed by Supabase

## Next Steps After Setup

1. **Customize columns** - Edit `src/types/index.ts` to add more columns
2. **Add task priorities** - Add `priority` field to tasks table
3. **Set up backups** - Enable Supabase backups in project settings
4. **Invite other users** - Share the live URL with others (they create their own account)

## Support

For issues with:
- **Supabase**: Check [Supabase docs](https://supabase.com/docs)
- **Next.js**: Check [Next.js docs](https://nextjs.org/docs)
- **dnd-kit**: Check [dnd-kit docs](https://docs.dndkit.com/)

---

**Good luck, operative! Mission Control is ready.** 🎯
