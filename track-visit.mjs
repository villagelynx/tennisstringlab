function normalizePath(path) {
  const source = String(path || "/").trim();
  if (!source) return "/";
  return source.startsWith("/") ? source : `/${source}`;
}

function normalizeEventName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function buildCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
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
    visitRpc: String(process.env.SUPABASE_VISIT_RPC || "record_visit").trim(),
    toolEventRpc: String(process.env.SUPABASE_TOOL_EVENT_RPC || "record_tool_event").trim()
  };
}

function buildSupabaseHeaders(key) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json"
  };
}

async function callSupabaseRpc(functionName, payload, config) {
  const response = await fetch(`${config.url}/rest/v1/rpc/${functionName}`, {
    method: "POST",
    headers: buildSupabaseHeaders(config.key),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase RPC ${functionName} failed: ${details || response.status}`);
  }

  return response;
}

function buildEventMetadata(body) {
  const metadata = {};
  const reservedKeys = new Set([
    "visitorId",
    "path",
    "title",
    "referrer",
    "screen",
    "eventName",
    "eventLabel",
    "eventCategory"
  ]);

  Object.entries(body || {}).forEach(([key, value]) => {
    if (!reservedKeys.has(key) && value !== undefined) {
      metadata[key] = value;
    }
  });

  return metadata;
}

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: buildCorsHeaders()
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: buildCorsHeaders()
    });
  }

  try {
    const body = await request.json();
    const visitorId = String(body?.visitorId || "").trim();
    const path = normalizePath(body?.path);
    const title = String(body?.title || "").trim();
    const referrer = String(body?.referrer || "").trim();
    const screen = String(body?.screen || "").trim();
    const eventName = normalizeEventName(body?.eventName);
    const eventLabel = String(body?.eventLabel || eventName || "").trim();
    const eventCategory = String(body?.eventCategory || "").trim();

    if (!visitorId) {
      return new Response(JSON.stringify({ error: "Missing visitorId" }), {
        status: 400,
        headers: buildCorsHeaders()
      });
    }

    const config = getSupabaseConfig();

    if (eventName) {
      const metadata = buildEventMetadata(body);
      await callSupabaseRpc(
        config.toolEventRpc,
        {
          p_visitor_id: visitorId,
          p_path: path,
          p_event_name: eventName,
          p_event_label: eventLabel || null,
          p_event_category: eventCategory || null,
          p_metadata: metadata
        },
        config
      );

      return new Response(JSON.stringify({
        ok: true,
        eventName,
        label: eventLabel
      }), {
        status: 200,
        headers: buildCorsHeaders()
      });
    }

    await callSupabaseRpc(
      config.visitRpc,
      {
        p_visitor_id: visitorId,
        p_path: path,
        p_title: title || null,
        p_referrer: referrer || null,
        p_screen: screen || null
      },
      config
    );

    return new Response(JSON.stringify({
      ok: true,
      path
    }), {
      status: 200,
      headers: buildCorsHeaders()
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "Tracking failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: buildCorsHeaders()
    });
  }
};
