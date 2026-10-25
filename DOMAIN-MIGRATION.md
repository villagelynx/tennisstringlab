# Make TennisSetup the primary domain

Target: `https://tennissetup.com/`. Keep TennisStringLab as a redirecting alias.

## Prepared changes

- Change canonical, Open Graph, social image and structured-data URLs to TennisSetup.
- Keep all 46 sitemap entries and their existing last-modified dates; change the hostname only.
- Point robots.txt at the TennisSetup sitemap and preserve admin exclusions.
- Redirect HTTP/HTTPS TennisStringLab, its www hostname, and www.TennisSetup to the matching path on HTTPS TennisSetup with permanent redirects.
- Preserve relative navigation, query parameters, content, email addresses and analytics configuration.

## Hosting sequence — do before merging this PR

The live TennisSetup homepage currently redirects to TennisStringLab, while its inner pages return 404. Activating the reverse redirects first would create a redirect loop.

1. In the existing Netlify project serving TennisStringLab, inspect its production domain settings.
2. Assign tennissetup.com and www.tennissetup.com to this same project. If these are currently registrar forwarding domains, remove that forwarding and use the DNS records Netlify provides. Do not alter mail/DNS verification records.
3. Verify DNS and provision HTTPS for both TennisSetup hostnames.
4. Make tennissetup.com the primary domain. Keep tennisstringlab.com and www.tennisstringlab.com assigned as aliases.
5. Confirm https://tennissetup.com/ and /about.html return the actual site without redirecting back to TennisStringLab.
6. Merge and deploy this PR.
7. Verify the homepage, /about.html, /sitemap.xml and /robots.txt on the primary domain. Check old-domain inner-page redirects preserve both the path and query string. Confirm there is no redirect loop.
8. In the verified TennisSetup Search Console property, submit sitemap.xml and inspect the homepage. Retain the old property for migration monitoring. Use Google's Change of Address tool if applicable to an existing indexed-domain move.

## Validation

Local checks parse sitemap XML and Netlify TOML, verify all 46 sitemap URLs have matching self-canonical pages, validate embedded JSON-LD and confirm the six host-specific redirect rules target only the new primary hostname. Live domain/DNS/HTTPS checks remain required after the hosting changes.
