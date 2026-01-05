-- Allow clients to delete their own projects
create policy "Clients can delete own projects"
on public.projects for delete
using ( auth.uid() = client_id );
