# Tennis String Lab

Static web app scaffold for ranking tennis strings by play style, string traits, player level, and racket fit.

Files:
- `index.html` main planner
- `app.js` string database and ranking logic
- `styles.css` shared styling
- `proshops.html` and `proshops.js` pro shop finder
- `images.html` and `image-library.js` local image manager

Run:
1. Open `index.html` in a browser.
2. Use the left-side filters to rank string fits.
3. Open `proshops.html` to browse shops and stringing stores.
4. Open `images.html` to add local browser-saved string images.

Analytics backend:
- Netlify Functions are still used as the serverless layer.
- Supabase now stores page visits and tool-usage events.
- Run `supabase-analytics.sql` inside your Supabase SQL editor before deploying analytics.
- Add these Netlify environment variables:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Optional override variables if you rename the SQL functions:
  - `SUPABASE_VISIT_RPC`
  - `SUPABASE_TOOL_EVENT_RPC`
  - `SUPABASE_STATS_RPC`
