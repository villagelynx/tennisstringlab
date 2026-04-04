function buildHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json"
  };
}

function normalizeCoordinate(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeLocation(geo) {
  if (!geo || typeof geo !== "object") {
    return null;
  }

  return {
    city: String(geo.city || "").trim(),
    country: {
      code: String(geo.country?.code || "").trim(),
      name: String(geo.country?.name || "").trim()
    },
    latitude: normalizeCoordinate(geo.latitude),
    longitude: normalizeCoordinate(geo.longitude),
    postalCode: String(geo.postalCode || "").trim(),
    subdivision: {
      code: String(geo.subdivision?.code || "").trim(),
      name: String(geo.subdivision?.name || "").trim()
    },
    timezone: String(geo.timezone || "").trim()
  };
}

export default async (request, context) => {
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

  return new Response(JSON.stringify({
    ok: true,
    location: normalizeLocation(context?.geo)
  }), {
    status: 200,
    headers: buildHeaders()
  });
};
