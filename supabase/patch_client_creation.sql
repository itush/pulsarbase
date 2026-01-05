-- Allow clients to create their own projects
create policy "Clients can insert own projects"
on public.projects for insert
with check ( auth.uid() = client_id );
