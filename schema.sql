-- ============================================================
-- MENTOR ME v3 — Complete Database Schema
-- Run this entire file in Supabase SQL Editor
-- ============================================================

create extension if not exists "uuid-ossp";

create table public.organisations (
  id           uuid default uuid_generate_v4() primary key,
  name         text not null,
  industry     text,
  email        text not null,
  country      text default 'Ghana',
  city         text,
  website      text,
  about        text,
  logo_url     text,
  banner_color text default 'linear-gradient(135deg,oklch(36% 0.13 155),oklch(50% 0.12 190))',
  code         text unique not null,
  status       text default 'pending' check (status in ('pending','active','suspended','rejected')),
  owner_id     uuid,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create table public.profiles (
  id             uuid primary key,
  full_name      text not null default '',
  email          text not null default '',
  role           text not null default 'mentee' check (role in ('mentee','mentor','org_admin')),
  title          text default '',
  bio            text default '',
  avatar_url     text,
  gender         text default '' check (gender in ('','Male','Female','Non-binary','Prefer not to say')),
  country        text default '',
  city           text default '',
  org_id         uuid references public.organisations(id) on delete set null,
  is_admin       boolean default false,
  is_super_admin boolean default false,
  last_seen      timestamptz default now(),
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

alter table public.organisations
  add constraint fk_org_owner foreign key (owner_id) references public.profiles(id) on delete set null;

create table public.org_admins (
  id uuid default uuid_generate_v4() primary key,
  org_id uuid references public.organisations(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(org_id, user_id)
);

create table public.pairings (
  id uuid default uuid_generate_v4() primary key,
  mentor_id uuid references public.profiles(id) on delete cascade not null,
  mentee_id uuid references public.profiles(id) on delete cascade not null,
  org_id uuid references public.organisations(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(mentor_id, mentee_id)
);

create table public.sessions (
  id               uuid default uuid_generate_v4() primary key,
  title            text not null,
  description      text,
  mentor_id        uuid references public.profiles(id) on delete cascade not null,
  mentee_id        uuid references public.profiles(id) on delete cascade not null,
  org_id           uuid references public.organisations(id) on delete cascade not null,
  session_date     date not null,
  session_time     time not null,
  duration_minutes int default 60,
  type             text default 'video' check (type in ('video','in-person','phone')),
  status           text default 'upcoming' check (status in ('upcoming','completed','cancelled')),
  notes            text,
  mentor_notes     text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create table public.goals (
  id          uuid default uuid_generate_v4() primary key,
  title       text not null,
  description text,
  category    text default 'Personal Growth' check (category in ('Business','Community','Thought Leadership','Personal Growth','Personal')),
  owner_id    uuid references public.profiles(id) on delete cascade not null,
  mentor_id   uuid references public.profiles(id) on delete set null,
  org_id      uuid references public.organisations(id) on delete cascade not null,
  progress    int default 0 check (progress >= 0 and progress <= 100),
  due_date    date,
  status      text default 'active' check (status in ('active','completed','paused')),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table public.milestones (
  id          uuid default uuid_generate_v4() primary key,
  goal_id     uuid references public.goals(id) on delete cascade not null,
  title       text not null,
  completed   boolean default false,
  order_index int default 0,
  created_at  timestamptz default now()
);

create table public.messages (
  id           uuid default uuid_generate_v4() primary key,
  sender_id    uuid references public.profiles(id) on delete cascade not null,
  recipient_id uuid references public.profiles(id) on delete cascade not null,
  content      text not null,
  read         boolean default false,
  created_at   timestamptz default now()
);

create table public.resources (
  id             uuid default uuid_generate_v4() primary key,
  title          text not null,
  description    text,
  file_type      text default 'doc' check (file_type in ('doc','sheet','pdf','image','video','link','other')),
  file_url       text,
  file_path      text,
  file_size      text,
  uploader_id    uuid references public.profiles(id) on delete cascade not null,
  org_id         uuid references public.organisations(id) on delete cascade not null,
  tags           text[] default '{}',
  download_count int default 0,
  created_at     timestamptz default now()
);

create table public.resource_comments (
  id          uuid default uuid_generate_v4() primary key,
  resource_id uuid references public.resources(id) on delete cascade not null,
  author_id   uuid references public.profiles(id) on delete cascade not null,
  content     text not null,
  created_at  timestamptz default now()
);

create table public.quizzes (
  id          uuid default uuid_generate_v4() primary key,
  title       text not null,
  description text,
  mentor_id   uuid references public.profiles(id) on delete cascade not null,
  org_id      uuid references public.organisations(id) on delete cascade not null,
  total_marks int default 100,
  due_date    date,
  status      text default 'draft' check (status in ('draft','published','closed')),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table public.quiz_questions (
  id          uuid default uuid_generate_v4() primary key,
  quiz_id     uuid references public.quizzes(id) on delete cascade not null,
  question    text not null,
  type        text default 'text' check (type in ('text','multiple_choice')),
  options     jsonb,
  marks       int default 10,
  order_index int default 0,
  created_at  timestamptz default now()
);

create table public.quiz_assignments (
  id           uuid default uuid_generate_v4() primary key,
  quiz_id      uuid references public.quizzes(id) on delete cascade not null,
  mentee_id    uuid references public.profiles(id) on delete cascade not null,
  assigned_by  uuid references public.profiles(id) on delete cascade not null,
  status       text default 'assigned' check (status in ('assigned','submitted','graded')),
  score        int,
  feedback     text,
  submitted_at timestamptz,
  graded_at    timestamptz,
  created_at   timestamptz default now(),
  unique(quiz_id, mentee_id)
);

create table public.quiz_answers (
  id            uuid default uuid_generate_v4() primary key,
  assignment_id uuid references public.quiz_assignments(id) on delete cascade not null,
  question_id   uuid references public.quiz_questions(id) on delete cascade not null,
  answer        text,
  created_at    timestamptz default now(),
  unique(assignment_id, question_id)
);

create table public.announcements (
  id               uuid default uuid_generate_v4() primary key,
  title            text not null,
  content          text not null,
  author_id        uuid references public.profiles(id) on delete cascade not null,
  org_id           uuid references public.organisations(id) on delete cascade,
  is_platform_wide boolean default false,
  created_at       timestamptz default now()
);

create table public.notifications (
  id         uuid default uuid_generate_v4() primary key,
  user_id    uuid references public.profiles(id) on delete cascade not null,
  title      text not null,
  body       text not null,
  type       text default 'info' check (type in ('info','session','goal','quiz','resource','message','announcement')),
  read       boolean default false,
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles          enable row level security;
alter table public.organisations     enable row level security;
alter table public.org_admins        enable row level security;
alter table public.pairings          enable row level security;
alter table public.sessions          enable row level security;
alter table public.goals             enable row level security;
alter table public.milestones        enable row level security;
alter table public.messages          enable row level security;
alter table public.resources         enable row level security;
alter table public.resource_comments enable row level security;
alter table public.quizzes           enable row level security;
alter table public.quiz_questions    enable row level security;
alter table public.quiz_assignments  enable row level security;
alter table public.quiz_answers      enable row level security;
alter table public.announcements     enable row level security;
alter table public.notifications     enable row level security;

create policy "open" on public.profiles          for all using (true) with check (true);
create policy "open" on public.organisations     for all using (true) with check (true);
create policy "open" on public.org_admins        for all using (true) with check (true);
create policy "open" on public.pairings          for all using (true) with check (true);
create policy "open" on public.sessions          for all using (true) with check (true);
create policy "open" on public.goals             for all using (true) with check (true);
create policy "open" on public.milestones        for all using (true) with check (true);
create policy "open" on public.messages          for all using (true) with check (true);
create policy "open" on public.resources         for all using (true) with check (true);
create policy "open" on public.resource_comments for all using (true) with check (true);
create policy "open" on public.quizzes           for all using (true) with check (true);
create policy "open" on public.quiz_questions    for all using (true) with check (true);
create policy "open" on public.quiz_assignments  for all using (true) with check (true);
create policy "open" on public.quiz_answers      for all using (true) with check (true);
create policy "open" on public.announcements     for all using (true) with check (true);
create policy "open" on public.notifications     for all using (true) with check (true);

-- Storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('mentor-me-files','mentor-me-files',true,52428800,
  array['image/jpeg','image/png','image/gif','image/webp','application/pdf',
        'application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain','video/mp4'])
on conflict (id) do update set public=true, file_size_limit=52428800;

create policy "open_storage" on storage.objects for all using (true) with check (true);

-- Trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role','mentee')
  )
  on conflict (id) do update
    set full_name = coalesce(excluded.full_name, public.profiles.full_name),
        email     = excluded.email,
        role      = coalesce(excluded.role, public.profiles.role);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
