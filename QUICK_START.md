# ⚡ Mission Control - Quick Start (5 Minutes)

## TL;DR - Get It Running NOW

### 1. Supabase Setup (3 min)

```
1. Go to https://supabase.com → New Project
2. In SQL Editor, paste & run EVERYTHING from SETUP_GUIDE.md (Step 2)
3. Also run everything from supabase-triggers.sql
4. Go to Realtime → Enable tasks table replication
5. Copy your URL and Anon Key from Settings > API
```

### 2. Local Dev (1 min)

```bash
git clone https://github.com/ibezahl/mission-control.git
cd mission-control
npm install

# Create .env.local with your Supabase keys:
echo 'NEXT_PUBLIC_SUPABASE_URL=your_url' > .env.local
echo 'NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key' >> .env.local

npm run dev
# Open http://localhost:3000
```

### 3. Deploy (1 min)

```bash
git add .
git commit -m "Add env config"
git push origin main
```

Then:
1. Go to vercel.com
2. Click "Import Project" → Select your GitHub repo
3. Add the same env variables
4. Click Deploy
5. Done! 🚀

---

## Commands

```bash
# Development
npm run dev          # Start local server
npm run build        # Build for production
npm start            # Run production build

# Testing
# (No separate test suite, manual testing recommended)
```

## What You Get

✅ Real-time Kanban board
✅ Drag & drop between columns
✅ Full authentication
✅ Mobile responsive
✅ Deployed on Vercel
✅ Data synced with Supabase

## File Structure

```
mission-control/
├── src/
│   ├── app/           # Next.js pages (auth, dashboard)
│   ├── components/    # React components (board, tasks, forms)
│   ├── lib/           # Helpers (auth, tasks, supabase)
│   └── types/         # TypeScript types
├── public/            # Static assets
├── .env.local         # Your Supabase keys (CREATE THIS!)
├── package.json       # Dependencies
└── README.md          # Full documentation
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Can't sign up" | Check email auth is enabled in Supabase |
| "Tasks not saving" | Run SQL from SETUP_GUIDE.md |
| "Realtime not working" | Enable tasks table in Supabase Realtime |
| "Page blank" | Check `.env.local` has correct keys |
| "Drag doesn't work" | Refresh browser, check console for errors |

---

## Next: Full Docs

For detailed instructions, see:
- **Setup**: `SETUP_GUIDE.md`
- **Testing**: `DEPLOYMENT_CHECKLIST.md`
- **Features**: `README.md`

---

**That's it. You're ready.** 🎯
