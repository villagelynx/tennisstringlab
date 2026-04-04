function buildHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json"
  };
}

function getSupabaseConfig() {
  const url = String(process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "");
  const key = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  return {
    url,
    key,
    statsRpc: String(process.env.SUPABASE_STATS_RPC || "get_visit_stats").trim()
  };
}

function buildSupabaseHeaders(key) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json"
  };
}

function defaultStats() {
  return {
    totalViews: 0,
    uniqueVisitors: 0,
    todayViews: 0,
    todayUniqueVisitors: 0,
    lastVisitAt: "",
    topPages: [],
    topEvents: []
  };
}

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: buildHeaders()
    });
  }

  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: buildHeaders()
    });
  }

  try {
    const config = getSupabaseConfig();
    const response = await fetch(`${config.url}/rest/v1/rpc/${config.statsRpc}`, {
      method: "POST",
      headers: buildSupabaseHeaders(config.key),
      body: "{}"
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Supabase RPC ${config.statsRpc} failed: ${details || response.status}`);
    }

    const payload = await response.json();
    const stats = payload && typeof payload === "object" ? payload : defaultStats();

    return new Response(JSON.stringify({
      ...defaultStats(),
      ...stats,
      topPages: Array.isArray(stats.topPages) ? stats.topPages : [],
      topEvents: Array.isArray(stats.topEvents) ? stats.topEvents : []
    }), {
      status: 200,
      headers: buildHeaders()
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "Could not load stats",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: buildHeaders()
    });
  }
};
