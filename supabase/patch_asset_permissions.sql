-- 1. Allow clients to insert asset records for their own projects
create policy "Clients can insert assets for their projects"
on public.assets for insert
with check (
  exists (
    select 1 from public.projects
    where projects.id = assets.project_id
    and projects.client_id = auth.uid()
  )
);

-- 2. Storage Policies (Run this in the SQL editor)
-- Note: This assumes your bucket is named 'assets'
-- These policies go into the 'storage' schema

-- Allow authenticated users to upload to the 'assets' bucket
create policy "Allow authenticated uploads"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'assets' );

-- Allow public viewing (if bucket is public or for signed URLs)
create policy "Allow public viewing"
on storage.objects for select
to public
using ( bucket_id = 'assets' );
