# 🌱 Mentor Me

A full-featured mentorship platform connecting mentors and mentees across Africa. Built for organisations to manage their mentorship programmes end-to-end.

---

## ✨ Features

### For Mentors & Mentees (`/mentor`)
- Sign up using an organisation code
- Book and manage sessions
- Set goals with milestones and track progress
- Take and grade quizzes
- Direct messaging
- Share and download resources (files, PDFs, links)
- AI-powered assistant (Gemini)
- Notifications

### For Organisation Admins (`/org`)
- Register your organisation (pending approval)
- Manage members (mentors & mentees)
- Create mentor-mentee pairings
- Post announcements to all members
- Upload organisation logo and customise profile
- View and copy your organisation join code
- Add additional org admins

### For Platform Super Admins (`/admin`)
- Overview dashboard with platform-wide stats
- User activity analytics — online now, active today, active this month, dormant
- Gender breakdown, top countries, top cities
- Interactive map showing users by location and activity status
- Approve or reject organisation applications
- Suspend or restore organisations
- Manage all users and admin access

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (via CDN, no build step) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| File Storage | Supabase Storage |
| AI Assistant | Google Gemini 1.5 Flash |
| Map | Leaflet.js + OpenStreetMap |
| Hosting | Cloudflare Pages |
| Font | Plus Jakarta Sans |

---

## 🚀 Deployment

This is a **zero-build** app. No npm, no bundler, no build step needed.

### 1. Database Setup
- Create a new [Supabase](https://supabase.com) project
- Go to **SQL Editor** and run `schema.sql`
- Go to **Authentication → Users → Add user → Create new user**
  - Email: your admin email
  - Tick **Auto Confirm User**
- Run this to grant super admin access:
```sql
update public.profiles 
set is_super_admin=true, is_admin=true, role='mentor' 
where email='your-admin-email@example.com';
```

### 2. Configure the App
Open `index.html` and update these constants near the top:
```js
const SB_URL = "https://your-project.supabase.co";
const SB_KEY = "your-anon-public-key";
const GEMINI_KEY = "your-gemini-api-key";
const ADMIN_EMAIL = "your-admin-email@example.com";
const ADMIN_PASS = "your-admin-password";
```

### 3. Deploy to Cloudflare Pages
1. Push this repo to GitHub (just `index.html` and `_redirects`)
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your GitHub repo
4. Set:
   - **Framework preset**: None
   - **Build command**: *(empty)*
   - **Build output directory**: *(empty)*
5. Deploy

Your app will be live at `your-project.pages.dev`

---

## 🔗 URL Structure

| URL | Portal |
|---|---|
| `/mentor` | Mentor & Mentee login and app |
| `/org` | Organisation admin portal |
| `/admin` | Super admin portal (keep this secret) |

---

## 👤 User Registration Flow

1. An organisation admin registers their org at `/org`
2. Platform super admin approves the org at `/admin`
3. Admin shares the **organisation code** with members
4. Mentors and mentees sign up at `/mentor` using the code
5. Org admin creates pairings between mentors and mentees
6. Mentorship begins

### Registration fields collected
- Full name, email, password
- Title / area of expertise
- Gender (Male / Female / Prefer not to say)
- Country and city
- Short bio

---

## 📊 Admin Analytics

The admin dashboard tracks user activity using `last_seen` timestamps:

| Status | Definition |
|---|---|
| 🟢 Online now | Last seen less than 5 minutes ago |
| 🔵 Active today | Last seen within 24 hours |
| 🟡 Active this month | Last seen within 30 days |
| ⚫ Dormant | Not seen in over 30 days |

Analytics include gender breakdown, top countries, top cities, and a live map.

---

## 📁 File Structure

```
mentorme/
├── index.html      # Entire application (React, all screens)
├── _redirects      # Cloudflare Pages routing
├── schema.sql      # Complete Supabase database schema
└── README.md       # This file
```

---

## 🔐 Security Notes

- The `/admin` route is not linked anywhere in the app — keep the URL private
- All Supabase RLS policies are open for MVP — tighten before scaling to production
- Admin credentials are stored as constants in `index.html` — move to environment variables for production

---

## 🌍 Built for Africa

Mentor Me is designed with African organisations, NGOs, training programmes, and communities in mind. The platform supports organisations across multiple countries with location-aware analytics.

---

## 📄 License

MIT — free to use and modify.
