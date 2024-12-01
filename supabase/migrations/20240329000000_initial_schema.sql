-- Enable Row Level Security
alter table public.clients enable row level security;
alter table public.properties enable row level security;
alter table public.developers enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.user_profiles enable row level security;

-- Create tables
create table public.user_profiles (
  id uuid references auth.users on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  role text check (role in ('admin', 'employee', 'sales_manager')),
  department text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table public.clients (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  email text,
  facebook_id text,
  status text not null,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  title_en text not null,
  description text,
  description_en text,
  type text not null,
  status text not null,
  price numeric not null,
  area numeric not null,
  location jsonb not null,
  features jsonb,
  media jsonb,
  owner jsonb,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.developers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  name_en text not null,
  description text,
  description_en text,
  logo_url text,
  website text,
  email text,
  phone text,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  developer_id uuid references public.developers(id),
  name text not null,
  name_en text not null,
  description text,
  description_en text,
  location jsonb not null,
  type text not null,
  status text not null,
  start_date date not null,
  completion_date date not null,
  total_units integer not null,
  price jsonb not null,
  features jsonb,
  media jsonb,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  title_en text not null,
  description text,
  description_en text,
  due_date timestamp with time zone not null,
  status text not null,
  priority text not null,
  assigned_to uuid references auth.users(id),
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create policies
create policy "Users can view their own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

create policy "Authenticated users can view clients"
  on public.clients for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert clients"
  on public.clients for insert
  with check (auth.role() = 'authenticated');

create policy "Users can update clients they created"
  on public.clients for update
  using (auth.uid() = created_by);

create policy "Authenticated users can view properties"
  on public.properties for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert properties"
  on public.properties for insert
  with check (auth.role() = 'authenticated');

create policy "Users can update properties they created"
  on public.properties for update
  using (auth.uid() = created_by);

-- Create indexes
create index idx_clients_status on public.clients(status);
create index idx_properties_type on public.properties(type);
create index idx_properties_status on public.properties(status);
create index idx_projects_developer on public.projects(developer_id);
create index idx_tasks_assigned_to on public.tasks(assigned_to);
create index idx_tasks_status on public.tasks(status);

-- Enable realtime
alter publication supabase_realtime add table clients;
alter publication supabase_realtime add table properties;
alter publication supabase_realtime add table developers;
alter publication supabase_realtime add table projects;
alter publication supabase_realtime add table tasks;