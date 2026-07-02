-- Website inquiries: contact, quote requests, and career applications.
-- Run this in Supabase Dashboard → SQL Editor (or via `supabase db push` if using the CLI).

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('contact', 'quote', 'career')),
  name text not null check (char_length(name) <= 200),
  email text not null check (char_length(email) <= 320),
  phone text check (phone is null or char_length(phone) <= 40),
  subject text check (subject is null or char_length(subject) <= 300),
  message text not null check (char_length(message) <= 10000),
  payload jsonb not null default '{}'::jsonb check (pg_column_size(payload) <= 16384),
  status text not null default 'new' check (status in ('new', 'read', 'archived'))
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_type_idx on public.inquiries (type);
create index if not exists inquiries_status_idx on public.inquiries (status);

alter table public.inquiries enable row level security;

-- Public website can INSERT only (anon key). No SELECT/UPDATE for anon or authenticated via API.
-- Staff view submissions in Supabase Dashboard (service role bypasses RLS).
drop policy if exists "anon_insert_inquiries" on public.inquiries;
create policy "anon_insert_inquiries"
  on public.inquiries
  for insert
  to anon
  with check (
    type in ('contact', 'quote', 'career')
    and char_length(trim(name)) between 1 and 200
    and char_length(trim(email)) between 4 and 320
    and char_length(trim(message)) between 1 and 10000
    and (phone is null or char_length(trim(phone)) <= 40)
    and (subject is null or char_length(trim(subject)) <= 300)
    and pg_column_size(payload) <= 16384
  );

-- Remove overly broad authenticated policies if they exist from an earlier migration run.
drop policy if exists "authenticated_select_inquiries" on public.inquiries;
drop policy if exists "authenticated_update_inquiries" on public.inquiries;

comment on table public.inquiries is 'Contact, quote, and career form submissions from prodsec.ca';
