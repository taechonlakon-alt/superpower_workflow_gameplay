-- Run this SQL in your Supabase SQL Editor to setup the table:

create table public.leaderboard (
  id bigint generated always as identity primary key,
  cat_name text not null,
  score integer not null check (score >= 0 and score <= 100),
  badge text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.leaderboard enable row level security;

-- Policy: Allow public read
create policy "Allow public read access"
  on public.leaderboard for select
  using (true);

-- Policy: Allow public insert
create policy "Allow public insert access"
  on public.leaderboard for insert
  with check (true);
