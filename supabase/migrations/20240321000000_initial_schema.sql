-- Create characters table
create table characters (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create feedback_options table
create table feedback_options (
  id uuid default gen_random_uuid() primary key,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create votes table
create table votes (
  id uuid default gen_random_uuid() primary key,
  character_id uuid references characters(id) on delete cascade,
  feedback_option_id uuid references feedback_options(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Ensure a vote is either for a character or feedback option, not both
  constraint vote_type_check check (
    (character_id is not null and feedback_option_id is null) or
    (character_id is null and feedback_option_id is not null)
  )
);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger update_characters_updated_at
  before update on characters
  for each row
  execute function update_updated_at_column();

create trigger update_feedback_options_updated_at
  before update on feedback_options
  for each row
  execute function update_updated_at_column();

-- Create RLS policies
alter table characters enable row level security;
alter table feedback_options enable row level security;
alter table votes enable row level security;

-- Allow public read access to characters and feedback options
create policy "Allow public read access to characters"
  on characters for select
  to public
  using (true);

create policy "Allow public read access to feedback options"
  on feedback_options for select
  to public
  using (true);

-- Allow public to create votes
create policy "Allow public to create votes"
  on votes for insert
  to public
  with check (true);

-- Allow public to read votes
create policy "Allow public to read votes"
  on votes for select
  to public
  using (true);

-- Create indexes for better performance
create index votes_character_id_idx on votes(character_id);
create index votes_feedback_option_id_idx on votes(feedback_option_id);
create index votes_created_at_idx on votes(created_at); 