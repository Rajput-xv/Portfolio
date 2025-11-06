const { URL } = require('url');

module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'missing url' });

  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'vercel-og-fetcher/1.0' }, redirect: 'follow' });
    if (!r.ok) return res.status(502).json({ error: 'failed_fetch', status: r.status });

    const html = await r.text();

    // Try common selectors for preview images
    const ogMatch = html.match(/<meta[^>]+property=(?:\'|\")og:image(?:\'|\")[^>]*content=(?:\'|\")([^\'\"]+)(?:\'|\")[^>]*>/i)
                 || html.match(/<meta[^>]+content=(?:\'|\")([^\'\"]+)(?:\'|\")[^>]*property=(?:\'|\")og:image(?:\'|\")[^>]*>/i);
    const twMatch = html.match(/<meta[^>]+name=(?:\'|\")twitter:image(?:\'|\")[^>]*content=(?:\'|\")([^\'\"]+)(?:\'|\")[^>]*>/i);
    const linkMatch = html.match(/<link[^>]+rel=(?:\'|\")image_src(?:\'|\")[^>]*href=(?:\'|\")([^\'\"]+)(?:\'|\")[^>]*>/i);

    let image = (ogMatch && ogMatch[1]) || (twMatch && twMatch[1]) || (linkMatch && linkMatch[1]) || null;

    if (image) {
      try {
        // Normalize relative URLs against the page URL
        image = new URL(image, url).href;
      } catch (e) {
        // if normalization fails, leave image as-is
      }
    }

    // Cache result at Vercel edge for 24 hours (reduce scraping)
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
    return res.json({ image });
  } catch (err) {
    return res.status(500).json({ error: 'server_error' });
  }
};
