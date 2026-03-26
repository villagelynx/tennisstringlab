(function () {
  const VISITOR_KEY = "tsl_visitor_id_v1";
  const SESSION_PREFIX = "tsl_visit_sent:";
  const TRACK_ENDPOINT = "/.netlify/functions/track-visit";
  const STATS_ENDPOINT = "/.netlify/functions/visit-stats";

  function createVisitorId() {
    return "visitor-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function getVisitorId() {
    try {
      const existing = localStorage.getItem(VISITOR_KEY);
      if (existing) return existing;
      const next = createVisitorId();
      localStorage.setItem(VISITOR_KEY, next);
      return next;
    } catch (error) {
      return createVisitorId();
    }
  }

  function getPathKey(pathname) {
    return SESSION_PREFIX + pathname;
  }

  function alreadyTracked(pathname) {
    try {
      return sessionStorage.getItem(getPathKey(pathname)) === "1";
    } catch (error) {
      return false;
    }
  }

  function markTracked(pathname) {
    try {
      sessionStorage.setItem(getPathKey(pathname), "1");
    } catch (error) {}
  }

  async function trackVisit() {
    if (!window.location || window.location.protocol === "file:") return;

    const path = window.location.pathname || "/";
    if (alreadyTracked(path)) return;

    markTracked(path);

    const payload = {
      visitorId: getVisitorId(),
      path,
      title: document.title || "",
      referrer: document.referrer || "",
      screen: window.screen ? `${window.screen.width}x${window.screen.height}` : ""
    };

    try {
      await fetch(TRACK_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        keepalive: true
      });
    } catch (error) {}
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-US").format(Number(value || 0));
  }

  async function loadPublicSiteStats() {
    const target = document.getElementById("publicSiteStats");
    if (!target || !window.location || window.location.protocol === "file:") return;

    try {
      const response = await fetch(STATS_ENDPOINT, { method: "GET" });
      if (!response.ok) {
        throw new Error("Stats request failed.");
      }
      const stats = await response.json();
      target.textContent = `${formatNumber(stats.uniqueVisitors)} visitors | ${formatNumber(stats.totalViews)} total views`;
      target.hidden = false;
    } catch (error) {
      target.hidden = true;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      trackVisit();
      loadPublicSiteStats();
    }, { once: true });
  } else {
    trackVisit();
    loadPublicSiteStats();
  }
})();
