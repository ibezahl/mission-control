# 📋 Mission Control - Deployment Checklist

Use this checklist to ensure Mission Control is properly deployed and operational.

## Pre-Deployment (Local Testing)

- [ ] Clone repository: `git clone https://github.com/ibezahl/mission-control.git`
- [ ] Install dependencies: `npm install`
- [ ] Create `.env.local` with Supabase keys
- [ ] Run locally: `npm run dev`
- [ ] Test signup/login flow
- [ ] Test task creation
- [ ] Test drag & drop
- [ ] Test task edit/delete
- [ ] Test on mobile browser (Safari on iPhone)
- [ ] All styles render correctly (cyberpunk theme visible)

## Supabase Setup

- [ ] Create Supabase project
- [ ] Run all SQL from SETUP_GUIDE.md (tables + RLS)
- [ ] Run triggers from `supabase-triggers.sql`
- [ ] Enable Realtime on `tasks` table
- [ ] Verify Email Auth is enabled
- [ ] Copy API keys from Settings > API
- [ ] Test creating user account in Supabase Dashboard

## Vercel Deployment

- [ ] Push code to GitHub main branch
- [ ] Create Vercel project from GitHub repo
- [ ] Add environment variables:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Trigger initial deployment
- [ ] Wait for build to complete (should take 2-3 min)
- [ ] Get live URL from Vercel dashboard

## Post-Deployment Testing

- [ ] Open live URL in browser
- [ ] Test signup with new email
- [ ] Verify email confirmation (if needed)
- [ ] Login with new account
- [ ] Dashboard loads without errors
- [ ] Create task in each column
- [ ] Drag task between columns (realtime sync works)
- [ ] Edit task - changes persist
- [ ] Delete task - disappears
- [ ] Refresh page - tasks still there (persisted)
- [ ] Open in 2 browser tabs/windows - changes sync in real-time
- [ ] Test on mobile device:
  - [ ] Responsive layout works
  - [ ] Can scroll horizontally on iPhone
  - [ ] Touch drag & drop works
  - [ ] Buttons are tappable
  - [ ] Text is readable

## Monitoring

After deployment, monitor for:

- [ ] Check Vercel deployment logs for errors
- [ ] Monitor Supabase dashboard for database health
- [ ] Keep eye on Supabase usage/quota
- [ ] Monitor Vercel bandwidth usage

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Tasks not syncing in realtime | Verify Realtime is enabled on `tasks` table in Supabase |
| Signup fails | Check Email Auth is enabled in Supabase Dashboard |
| Page shows "Missing env vars" | Verify env variables are set in Vercel project settings |
| Drag & drop not working | Check browser compatibility, try Chrome or Safari |
| Tasks disappear on refresh | Verify RLS policies are correct (see SETUP_GUIDE.md) |
| 404 on `/dashboard` | Check that user authentication worked, should redirect if not logged in |

## Performance Tuning

- [ ] Test with 50+ tasks - ensure smooth performance
- [ ] Check page load time (should be <3 seconds)
- [ ] Monitor database query performance
- [ ] Consider adding pagination if many tasks

## Backup & Maintenance

- [ ] Enable daily backups in Supabase settings
- [ ] Document Supabase project credentials
- [ ] Set up monitoring alerts (optional)
- [ ] Plan disaster recovery process

## Success Criteria

✅ **Deployment is successful if:**

1. Users can sign up and login
2. Tasks persist in database
3. Realtime sync works (open 2 tabs, add task in one, see it appear in other)
4. All CRUD operations work (Create, Read, Update, Delete)
5. Mobile responsive design works on iPhone
6. No console errors in browser DevTools
7. Vercel shows "Production" deployment status
8. Supabase dashboard shows healthy status

---

**Once all items checked, Mission Control is live and operational!** 🎯

Get live URL from Vercel dashboard and share with users.
