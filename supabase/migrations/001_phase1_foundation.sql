create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  age_band text,
  city text,
  learning_language text not null default 'en-IN',
  weekly_goal smallint not null default 3,
  reminder_day smallint,
  streak_days integer not null default 0,
  consent_ai_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ventures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  idea text not null,
  context text,
  status text not null default 'active' check (status in ('active', 'completed', 'archived')),
  seed bigint not null default 100000000,
  current_module smallint not null default 1,
  current_lesson text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_state (
  venture_id uuid primary key references public.ventures(id) on delete cascade,
  cash_paise bigint not null default 100000000,
  monthly_burn_paise bigint not null default 8333300,
  runway_months numeric(5,2) not null default 12,
  customers integer not null default 0,
  leads integer not null default 0,
  churn_rate numeric(5,2) not null default 0.05,
  conversion_rate numeric(5,2) not null default 0.03,
  average_price_paise bigint not null default 60000,
  variable_cost_paise bigint not null default 18000,
  revenue_paise bigint not null default 0,
  morale smallint not null default 70,
  quality smallint not null default 60,
  evidence_quality smallint not null default 0,
  awareness smallint not null default 30,
  retention_rate numeric(5,2) not null default 0.80,
  valuation_paise bigint not null default 0,
  months_elapsed smallint not null default 0,
  weak_spot text,
  updated_at timestamptz not null default now()
);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  venture_id uuid not null references public.ventures(id) on delete cascade,
  lesson_id text not null,
  status text not null default 'locked',
  challenge_completed_at timestamptz,
  decision_at timestamptz,
  retry_at timestamptz,
  retrieval_score smallint,
  completed_at timestamptz,
  best_decision jsonb,
  review_due_at date,
  review_interval_days smallint default 7,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_user on public.profiles(id);
create index if not exists idx_ventures_user on public.ventures(user_id);
create index if not exists idx_progress_venture on public.progress(venture_id);

alter table public.profiles enable row level security;
alter table public.ventures enable row level security;
alter table public.company_state enable row level security;
alter table public.progress enable row level security;

create policy "profiles_are_private" on public.profiles
for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "ventures_are_private" on public.ventures
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "company_state_is_private" on public.company_state
for all using (exists (
  select 1 from public.ventures v where v.id = company_state.venture_id and v.user_id = auth.uid()
)) with check (exists (
  select 1 from public.ventures v where v.id = company_state.venture_id and v.user_id = auth.uid()
));

create policy "progress_is_private" on public.progress
for all using (exists (
  select 1 from public.ventures v where v.id = progress.venture_id and v.user_id = auth.uid()
)) with check (exists (
  select 1 from public.ventures v where v.id = progress.venture_id and v.user_id = auth.uid()
));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, city, learning_language)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)), null, 'en-IN')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger ventures_set_updated_at
before update on public.ventures
for each row execute function public.set_updated_at();

create trigger company_state_set_updated_at
before update on public.company_state
for each row execute function public.set_updated_at();

create trigger progress_set_updated_at
before update on public.progress
for each row execute function public.set_updated_at();
