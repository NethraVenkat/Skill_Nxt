-- Demo seed for local development.
insert into auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
values (
  '11111111-1111-4111-8111-111111111111',
  'demo@venturecraft.app',
  'demo_password_placeholder',
  now(),
  now(),
  now()
)
on conflict (id) do nothing;

insert into public.profiles (id, display_name, city, learning_language, weekly_goal, streak_days)
values (
  '11111111-1111-4111-8111-111111111111',
  'Demo Founder',
  'Bengaluru',
  'en-IN',
  3,
  3
)
on conflict (id) do nothing;

insert into public.ventures (id, user_id, name, idea, context, status, seed, current_module)
values (
  '22222222-2222-4222-8222-222222222222',
  '11111111-1111-4111-8111-111111111111',
  'Aarambh Labs',
  'A local, low-cost laundry pickup for students.',
  'Bengaluru students need a reliable pickup and drop service that fits hostel life.',
  'active',
  100000000,
  1
)
on conflict (id) do nothing;

insert into public.company_state (venture_id, cash_paise, monthly_burn_paise, runway_months, customers, leads, churn_rate, conversion_rate, average_price_paise, variable_cost_paise, revenue_paise, morale, quality, evidence_quality, awareness, retention_rate, valuation_paise, months_elapsed)
values (
  '22222222-2222-4222-8222-222222222222',
  92000000,
  8333300,
  11.4,
  12,
  8,
  0.05,
  0.34,
  69900,
  27500,
  245000,
  77,
  61,
  32,
  53,
  0.82,
  14500000,
  2
)
on conflict (venture_id) do nothing;
