create table if not exists public.visits (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor_id text not null,
  path text not null,
  title text,
  referrer text,
  screen text
);

create index if not exists visits_created_at_idx on public.visits (created_at desc);
create index if not exists visits_path_idx on public.visits (path);
create index if not exists visits_visitor_id_idx on public.visits (visitor_id);

create table if not exists public.tool_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor_id text not null,
  path text not null,
  event_name text not null,
  event_label text,
  event_category text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists tool_events_created_at_idx on public.tool_events (created_at desc);
create index if not exists tool_events_name_idx on public.tool_events (event_name);
create index if not exists tool_events_visitor_id_idx on public.tool_events (visitor_id);

create or replace function public.record_visit(
  p_visitor_id text,
  p_path text,
  p_title text default null,
  p_referrer text default null,
  p_screen text default null
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_id bigint;
begin
  insert into public.visits (visitor_id, path, title, referrer, screen)
  values (p_visitor_id, p_path, p_title, p_referrer, p_screen)
  returning id into inserted_id;

  return inserted_id;
end;
$$;

create or replace function public.record_tool_event(
  p_visitor_id text,
  p_path text,
  p_event_name text,
  p_event_label text default null,
  p_event_category text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_id bigint;
begin
  insert into public.tool_events (
    visitor_id,
    path,
    event_name,
    event_label,
    event_category,
    metadata
  )
  values (
    p_visitor_id,
    p_path,
    p_event_name,
    p_event_label,
    p_event_category,
    coalesce(p_metadata, '{}'::jsonb)
  )
  returning id into inserted_id;

  return inserted_id;
end;
$$;

create or replace function public.get_visit_stats()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with top_pages as (
    select
      path,
      coalesce(nullif(max(title), ''), path) as title,
      count(*)::int as views,
      count(distinct visitor_id)::int as "uniqueVisitors"
    from public.visits
    group by path
    order by count(*) desc, path asc
    limit 12
  ),
  top_events as (
    select
      event_name as name,
      coalesce(nullif(max(event_label), ''), event_name) as label,
      coalesce(nullif(max(event_category), ''), '') as category,
      count(*)::int as count,
      count(distinct visitor_id)::int as "uniqueVisitors"
    from public.tool_events
    group by event_name
    order by count(*) desc, event_name asc
    limit 12
  )
  select jsonb_build_object(
    'totalViews', coalesce((select count(*)::int from public.visits), 0),
    'uniqueVisitors', coalesce((select count(distinct visitor_id)::int from public.visits), 0),
    'todayViews', coalesce((
      select count(*)::int
      from public.visits
      where created_at >= date_trunc('day', now())
    ), 0),
    'todayUniqueVisitors', coalesce((
      select count(distinct visitor_id)::int
      from public.visits
      where created_at >= date_trunc('day', now())
    ), 0),
    'lastVisitAt', coalesce((select max(created_at) from public.visits), null),
    'topPages', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'path', path,
          'title', title,
          'views', views,
          'uniqueVisitors', "uniqueVisitors"
        )
      )
      from top_pages
    ), '[]'::jsonb),
    'topEvents', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'name', name,
          'label', label,
          'category', category,
          'count', count,
          'uniqueVisitors', "uniqueVisitors"
        )
      )
      from top_events
    ), '[]'::jsonb)
  );
$$;
