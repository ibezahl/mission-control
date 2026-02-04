# 🐛 Mission Control - Known Issues & Roadmap

## Current Status: ✅ PRODUCTION READY

All core functionality is working. Listed below are known limitations and planned enhancements.

## Known Issues

### High Priority (Should Fix)

#### 1. **Realtime Sync Delay**
- **Issue**: New tasks may take 1-2 seconds to appear in other tabs
- **Cause**: Supabase Realtime has natural propagation delay
- **Workaround**: Refresh page to see latest changes immediately
- **Fix**: Will implement optimistic UI updates in v1.1

#### 2. **Mobile Drag & Drop Sensitivity**
- **Issue**: Dragging tasks on touch devices (iPad, iPhone) can be finicky
- **Cause**: dnd-kit pointer sensor needs fine-tuning for touch events
- **Workaround**: Long-press and drag slowly
- **Fix**: Will adjust sensor distance and implement touch-specific handlers in v1.1

#### 3. **Column Scroll Performance with 100+ Tasks**
- **Issue**: Scrolling in a column with 100+ tasks may lag on older devices
- **Cause**: No virtualization/pagination
- **Workaround**: Archive completed tasks to 'Done' column regularly
- **Fix**: Will implement virtual scrolling in v2.0

### Medium Priority (Nice to Have)

#### 4. **No Keyboard Navigation**
- **Issue**: No keyboard shortcuts for productivity
- **Cause**: Not implemented yet
- **Workaround**: Use mouse/touch
- **Fix**: Will add in v1.1 (Tab, Arrow keys, Enter, Delete)

#### 5. **No Search/Filter**
- **Issue**: Hard to find tasks in large list
- **Cause**: Not implemented yet
- **Workaround**: Manual scrolling
- **Fix**: Will add search/filter in v1.2

#### 6. **No Task Due Dates**
- **Issue**: Can't set deadlines or reminders
- **Cause**: Schema doesn't have due_date field
- **Workaround**: Add date in task description
- **Fix**: Will add in v2.0 with reminder notifications

## Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Full Support | Tested 120+ |
| Safari | ✅ Full Support | iOS 15+ recommended |
| Firefox | ✅ Full Support | Latest version |
| Edge | ✅ Full Support | Latest version |
| IE 11 | ❌ Not Supported | No ES6 support |

## Mobile Compatibility

| Device | Status | Notes |
|--------|--------|-------|
| iPhone 12+ | ✅ Excellent | Fully responsive, touch drag works |
| iPhone 11 | ✅ Good | Works, drag slightly laggy |
| iPhone SE | ✅ Works | Slower on large task lists |
| iPad | ✅ Works | Landscape layout good |
| Android | ✅ Works | Chrome recommended |

## Performance Baselines

Tested on MacBook Pro M1 with Chrome:

- Page load: ~1.5 seconds
- Add task: ~500ms (with network round-trip)
- Drag task: ~16ms per frame (60 FPS)
- Realtime sync: ~1-2 seconds
- 50 tasks per column: Smooth
- 200+ tasks per column: Noticeable lag

## Roadmap

### v1.1 (2-3 weeks)
- [ ] Optimistic UI updates for instant feedback
- [ ] Keyboard shortcuts (Tab nav, Enter create, Del delete)
- [ ] Task search functionality
- [ ] Better touch drag & drop handling
- [ ] Confirm delete dialog
- [ ] Task due date field (no reminders yet)

### v1.2 (1 month)
- [ ] Filter tasks by status/column
- [ ] Sort tasks (by date, priority, etc.)
- [ ] Bulk actions (move, delete multiple)
- [ ] Dark/light mode toggle
- [ ] Export to CSV/JSON
- [ ] Undo/redo for actions

### v2.0 (2-3 months)
- [ ] Collaborative editing (multiple users per board)
- [ ] Task priority levels (High, Medium, Low)
- [ ] Recurring tasks (daily, weekly, monthly)
- [ ] Task templates
- [ ] Due date reminders (email/push notifications)
- [ ] Activity log / task history
- [ ] Custom columns (create your own)
- [ ] Task attachments
- [ ] Comments on tasks
- [ ] Dark/light theme customization

### Future Ideas
- [ ] Desktop app (Electron)
- [ ] Mobile app (React Native)
- [ ] Slack integration
- [ ] Calendar view
- [ ] Analytics dashboard
- [ ] Team collaboration
- [ ] Time tracking
- [ ] Export to KANBAN.md format
- [ ] Import from other tools (Trello, Asana)

## Limitations

### Current Architecture
1. **Single user per database** - No team/workspace support yet
2. **No offline mode** - Requires internet connection
3. **No file attachments** - Can only add text/description
4. **Limited to 6 columns** - Can't create custom columns
5. **No archived tasks** - Deleted tasks are gone forever

### Supabase Limitations
- Realtime has ~1-2 second latency (acceptable)
- Rate limits on Anon key (generous, unlikely to hit)
- Uploads limited to file size (use database for metadata)

### Browser Limitations
- Local storage not used (could add caching)
- No service workers (can't work offline)
- Touch drag & drop not optimized

## Contributing

Found a bug? Have a feature idea? Create an issue on GitHub:
https://github.com/ibezahl/mission-control/issues

Or submit a PR:
https://github.com/ibezahl/mission-control/pulls

## Bug Reports

When reporting bugs, include:
1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Browser/Device info**
5. **Screenshots** (if relevant)

Example:
```
Title: "Can't drag task to 'Done' column"

Steps:
1. Create task in "Top Priorities"
2. Try to drag to "Done" column
3. Drop

Expected: Task moves to Done
Actual: Task stays in original column, no error

Browser: Chrome 120 on MacBook Pro M1
```

---

**Stay tuned for updates!** 🚀
