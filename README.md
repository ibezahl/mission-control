# 🎯 Mission Control - Cyberpunk Kanban Task Manager

A brutalist, cyberpunk-themed Kanban board for mission management. Built with Next.js 16, TypeScript, Supabase, and dnd-kit.

## Tech Stack

- **Frontend**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS (dark mode, cyberpunk aesthetic)
- **Backend**: Supabase (Authentication + Realtime Database)
- **Drag & Drop**: dnd-kit
- **Deployment**: Vercel

## Features

✅ **Supabase Authentication** - Email/password signup & login
✅ **Real-time Kanban Board** - Live sync with Supabase Realtime
✅ **Drag & Drop** - Move tasks between columns seamlessly
✅ **Mobile Responsive** - Works on iPhone and all devices
✅ **Dark Mode Cyberpunk UI** - High-contrast brutalist design
✅ **CRUD Operations** - Add, edit, delete tasks
✅ **Task Organization** - 6 curated columns for mission management

## Kanban Columns

1. **Top Priorities** - Critical immediate tasks
2. **Job Search Pipe** - Career/job hunt activities
3. **Intelligence & Monitoring** - Research & observation tasks
4. **Tonight's Mission** - Today's tactical objectives
5. **Family & Personal** - Personal & family matters
6. **Done** - Completed tasks

## Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/ibezahl/mission-control.git
cd mission-control
npm install
```

### 2. Set Up Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  column TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX tasks_user_id_idx ON tasks(user_id);
CREATE INDEX tasks_column_idx ON tasks(column);

-- Enable Realtime on tasks table
ALTER TABLE tasks REPLICA IDENTITY FULL;
```

3. Go to **Realtime** settings and enable replication for the `tasks` table
4. Go to **Settings > API** and copy your:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Configure Environment

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment to Vercel

1. Push code to GitHub:

```bash
git add .
git commit -m "Initial Mission Control setup"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## Usage

### Create an Account

1. Click **[SIGN UP]** on the login page
2. Enter email & password
3. Verify email (check inbox)

### Sign In

1. Enter credentials on login page
2. Click **[SIGN IN]**

### Manage Tasks

- **Add Task**: Click **[+ NEW TASK]** button
- **Edit Task**: Click **[EDIT]** on any task card
- **Delete Task**: Click **[DELETE]** on any task card
- **Move Task**: Drag & drop to any column
- **Logout**: Click **LOGOUT** in top-right

## UI Design

- **Color Scheme**: Neon green (#00ff00), Magenta (#ff00ff), Cyan (#00ffff)
- **Typography**: Monospace font (Courier New)
- **Borders**: Sharp 2px borders, cyberpunk aesthetic
- **Shadows**: Neon glow effects on hover
- **Layout**: Grid-based responsive design

## Known Issues & Future Enhancements

### Future Features

- [ ] Task priority levels
- [ ] Due dates & reminders
- [ ] Collaborative editing (multiple users)
- [ ] Task templates & recurring tasks
- [ ] Search & filter functionality
- [ ] Local KANBAN.md export
- [ ] Dark mode toggle (currently always dark)
- [ ] Custom column creation
- [ ] Task history & activity log
- [ ] Keyboard shortcuts

### Mobile Improvements

- [ ] Touch-optimized drag & drop
- [ ] Bottom sheet modal for task creation
- [ ] Swipe gestures for navigation

## Contributing

Feel free to fork, submit issues, and send pull requests!

## License

MIT

---

**Built with 🔥 for maximum mission control**
