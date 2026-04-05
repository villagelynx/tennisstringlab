const shopSearchInput = document.getElementById("shopSearchInput");
const shopRegionSelect = document.getElementById("shopRegionSelect");
const shopList = document.getElementById("shopList");
const shopCount = document.getElementById("shopCount");
const shopContextBanner = document.getElementById("shopContextBanner");
const shopLocationButton = document.getElementById("shopLocationButton");

const SHOP_GEO_CACHE_KEY = "tsl-shop-browser-geo-v1";
const SHOP_GEO_CACHE_TTL_MS = 1000 * 60 * 60 * 6;
const NEARBY_DISTANCE_KM = 40;

const SHOPS = [
  { name: "Tennis Warehouse", city: "San Luis Obispo", state: "CA", country: "USA", region: "West Coast", latitude: 35.2828, longitude: -120.6596, website: "https://www.tennis-warehouse.com", notes: "Major tennis retailer with stringing support and string selection." },
  { name: "Belltown Tennis Shop", city: "Seattle", state: "WA", country: "USA", region: "West Coast", latitude: 47.6062, longitude: -122.3321, website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Seattle%2C+WA", notes: "Seattle-area independent tennis shop and restringing lead." },
  { name: "Avanti Sports", city: "Portland", state: "OR", country: "USA", region: "West Coast", latitude: 45.5152, longitude: -122.6784, website: "https://www.avantisports.com", notes: "Portland tennis and racquet sports retailer with restringing services." },
  { name: "Tennis Plaza", city: "Miami", state: "FL", country: "USA", region: "Southeast", latitude: 25.7617, longitude: -80.1918, website: "https://www.tennisplaza.com", notes: "Large tennis retailer with pro-shop style service." },
  { name: "RacquetGuys", city: "Toronto", state: "ON", country: "Canada", region: "Canada", latitude: 43.6532, longitude: -79.3832, website: "https://www.racquetguys.ca", notes: "Canadian tennis retailer with stringing and tennis setup help." },
  { name: "Merchant of Tennis", city: "Toronto", state: "ON", country: "Canada", region: "Canada", latitude: 43.6532, longitude: -79.3832, website: "https://www.merchantoftennis.com", notes: "Canadian pro-shop style retailer with string service." },
  { name: "Merchant of Tennis Oakville", city: "Oakville", state: "ON", country: "Canada", region: "Canada", latitude: 43.4675, longitude: -79.6877, website: "https://www.merchantoftennis.com", notes: "GTA-area Merchant of Tennis location with certified stringing and tennis gear support." },
  { name: "Tennisology", city: "Vaughan", state: "ON", country: "Canada", region: "Canada", latitude: 43.8361, longitude: -79.4985, website: "https://www.tennisology.ca", notes: "Vaughan and Toronto-area stringing specialist with pickup and drop-off support across the GTA." },
  { name: "Paragon Sports Tennis Shop", city: "New York", state: "NY", country: "USA", region: "Northeast", latitude: 40.7128, longitude: -74.006, website: "https://www.paragonsports.com", notes: "NYC tennis retail option with racquet service." },
  { name: "Midwest Sports", city: "Cincinnati", state: "OH", country: "USA", region: "Midwest", latitude: 39.1031, longitude: -84.512, website: "https://www.tennis-point.com", notes: "Large tennis retailer serving Midwest players." },
  { name: "Tennis Express", city: "Houston", state: "TX", country: "USA", region: "Southwest", latitude: 29.7604, longitude: -95.3698, website: "https://www.tennisexpress.com", notes: "Strong string and racquet setup retailer with service support." },
  { name: "PGA Tour Superstore Tennis", city: "Scottsdale", state: "AZ", country: "USA", region: "Southwest", latitude: 33.4942, longitude: -111.9261, website: "https://www.pgatoursuperstore.com", notes: "Big-box tennis stringing and grip service option." },
  { name: "Your Serve Tennis", city: "Chicago", state: "IL", country: "USA", region: "Midwest", latitude: 41.8781, longitude: -87.6298, website: "https://www.yelp.com/search?find_desc=tennis+shop&find_loc=Chicago%2C+IL", notes: "Chicago-area pro-shop lead for restringing and setup help." },
  { name: "Racquet Network", city: "Vancouver", state: "BC", country: "Canada", region: "Canada", latitude: 49.2827, longitude: -123.1207, website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Vancouver%2C+BC", notes: "Metro Vancouver tennis stringing lead." },
  { name: "K8 Strings", city: "Vancouver", state: "BC", country: "Canada", region: "Canada", latitude: 49.2827, longitude: -123.1207, website: "https://k8strings.com", notes: "Dedicated Vancouver racquet restringing shop with tour-level experience and racquet accessories." },
  { name: "T1 Sports", city: "Richmond", state: "BC", country: "Canada", region: "Canada", latitude: 49.1666, longitude: -123.1336, website: "https://t1sports.net", notes: "Greater Vancouver tennis specialty store in Richmond with racquets, strings, and customer support." },
  { name: "ProStringer.ca", city: "North Vancouver", state: "BC", country: "Canada", region: "Canada", latitude: 49.32, longitude: -123.0724, website: "https://prostringer.ca", notes: "North Vancouver stringing service offering tennis racquet restringing and custom setups." },
  { name: "TopSpin Tennis Shop", city: "Surrey", state: "BC", country: "Canada", region: "Canada", latitude: 49.1913, longitude: -122.849, website: "https://www.topspintennis.ca/", notes: "Surrey racquet sports shop offering tennis equipment, customization, and stringing service." },
  { name: "Tennis Hub", city: "Los Angeles", state: "CA", country: "USA", region: "West Coast", latitude: 34.0522, longitude: -118.2437, website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Los+Angeles%2C+CA", notes: "Los Angeles-area search lead for local tennis restringing." },
  { name: "Bay Area Racquet Shop", city: "San Jose", state: "CA", country: "USA", region: "West Coast", latitude: 37.3382, longitude: -121.8863, website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=San+Jose%2C+CA", notes: "South Bay pro-shop lead for stringing and grip work." },
  { name: "Match Point Tennis", city: "Atlanta", state: "GA", country: "USA", region: "Southeast", latitude: 33.749, longitude: -84.388, website: "https://www.yelp.com/search?find_desc=tennis+shop&find_loc=Atlanta%2C+GA", notes: "Atlanta-area tennis pro-shop search lead." },
  { name: "Austin Tennis Shop", city: "Austin", state: "TX", country: "USA", region: "Southwest", latitude: 30.2672, longitude: -97.7431, website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Austin%2C+TX", notes: "Austin search lead for restringing and setup support." },
  { name: "Denver Tennis Stringing", city: "Denver", state: "CO", country: "USA", region: "Southwest", latitude: 39.7392, longitude: -104.9903, website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Denver%2C+CO", notes: "Denver-area restringing search lead." },
  { name: "Philadelphia Racquet Sports", city: "Philadelphia", state: "PA", country: "USA", region: "Northeast", latitude: 39.9526, longitude: -75.1652, website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Philadelphia%2C+PA", notes: "Philadelphia metro search lead for tennis setup services." },
  { name: "Tenniszon", city: "Montreal", state: "QC", country: "Canada", region: "Canada", latitude: 45.5017, longitude: -73.5673, website: "https://tenniszon.com", notes: "Longtime Montreal tennis retailer and official stringer with deep racquet and string expertise." },
  { name: "Aforza Pro Shop", city: "Calgary", state: "AB", country: "Canada", region: "Canada", latitude: 51.0447, longitude: -114.0719, website: "https://www.aforza.ca/aforza-pro-shop/", notes: "Calgary tennis pro shop with stringing service, racquets, shoes, and string guidance." },
  { name: "Aforza Shop", city: "Calgary", state: "AB", country: "Canada", region: "Canada", latitude: 51.0447, longitude: -114.0719, website: "https://www.aforzashop.ca", notes: "Aforza's public tennis retail shop with string options and knowledgeable staff in Calgary." },
  { name: "Racquet Central", city: "Calgary", state: "AB", country: "Canada", region: "Canada", latitude: 51.0447, longitude: -114.0719, website: "http://www.racquetcentral.ca", notes: "Calgary racquet-sports specialty retailer known for professional stringing service." },
  { name: "Calgary Racquet Stringing", city: "Calgary", state: "AB", country: "Canada", region: "Canada", latitude: 51.0447, longitude: -114.0719, website: "https://calgaryracquetstringing.ca/tennis-racquet-stringing-calgary/", notes: "Calgary tennis stringing service with custom string, color, gauge, and tension options." },
  { name: "G-Fresh Stringing", city: "Edmonton", state: "AB", country: "Canada", region: "Canada", latitude: 53.5461, longitude: -113.4938, website: "https://www.gfreshstringing.com", notes: "North Edmonton tennis racquet stringing specialist offering custom setups and hybrid options." },
  { name: "Edmonton Squash Club Pro Shop", city: "Edmonton", state: "AB", country: "Canada", region: "Canada", latitude: 53.5461, longitude: -113.4938, website: "https://edmontonsquashclub.ca/pro-shop/", notes: "Edmonton pro shop with racquet restringing services and racquet-sport accessories." },
  { name: "Taylor Tennis Centre Pro Shop", city: "Winnipeg", state: "MB", country: "Canada", region: "Canada", latitude: 49.8951, longitude: -97.1384, website: "https://www.taylortenniscentre.ca/services", notes: "Winnipeg tennis centre pro shop with stringing support and tennis equipment." },
  { name: "Racquets Pro Shop & Stringing Centre", city: "Winnipeg", state: "MB", country: "Canada", region: "Canada", latitude: 49.8951, longitude: -97.1384, website: "https://www.racquetsproshop.ca", notes: "Long-running Winnipeg racquet retailer and stringing centre with tennis strings and service." }
];

const shopState = {
  requestedString: "",
  requestedBrand: "",
  visitorLocation: null,
  locationStatus: "idle"
};

if (shopSearchInput && shopRegionSelect && shopList && shopCount) {
  initializeShopFinder();
}

function initializeShopFinder() {
  readShopContextFromUrl();
  shopSearchInput.addEventListener("input", renderShops);
  shopRegionSelect.addEventListener("change", renderShops);

  if (shopLocationButton) {
    shopLocationButton.addEventListener("click", () => {
      requestVisitorLocation(true);
    });
  }

  renderShops();
  updateShopContextBanner();
  hydrateVisitorLocation();
}

function readShopContextFromUrl() {
  if (typeof window === "undefined" || !window.location) {
    return;
  }

  const params = new URLSearchParams(window.location.search || "");
  shopState.requestedString = String(params.get("string") || "").trim();
  shopState.requestedBrand = String(params.get("brand") || "").trim();
}

async function hydrateVisitorLocation() {
  const cachedLocation = readCachedVisitorLocation();
  if (cachedLocation) {
    shopState.visitorLocation = cachedLocation;
    shopState.locationStatus = "ready";
    updateShopContextBanner();
    renderShops();
    return;
  }

  if (!supportsBrowserGeolocation()) {
    shopState.locationStatus = "unsupported";
    updateShopContextBanner();
    return;
  }

  const permissionState = await getGeolocationPermissionState();

  if (permissionState === "denied") {
    shopState.locationStatus = "denied";
    updateShopContextBanner();
    return;
  }

  if (permissionState === "granted") {
    requestVisitorLocation(false);
    return;
  }

  shopState.locationStatus = "idle";
  updateShopContextBanner();
}

function supportsBrowserGeolocation() {
  if (typeof window === "undefined" || !window.location || typeof navigator === "undefined") {
    return false;
  }

  if (window.location.protocol === "file:") {
    return false;
  }

  if (typeof window.isSecureContext === "boolean" && !window.isSecureContext) {
    return false;
  }

  return typeof navigator.geolocation?.getCurrentPosition === "function";
}

async function getGeolocationPermissionState() {
  if (typeof navigator === "undefined" || !navigator.permissions || typeof navigator.permissions.query !== "function") {
    return "unknown";
  }

  try {
    const status = await navigator.permissions.query({ name: "geolocation" });
    return status.state;
  } catch {
    return "unknown";
  }
}

function requestVisitorLocation(forceFreshPosition) {
  if (!supportsBrowserGeolocation() || shopState.locationStatus === "loading") {
    return;
  }

  shopState.locationStatus = "loading";
  updateShopContextBanner();

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const visitorLocation = normalizeVisitorLocation({
        latitude: position?.coords?.latitude,
        longitude: position?.coords?.longitude
      });

      if (!visitorLocation) {
        shopState.locationStatus = "unavailable";
        updateShopContextBanner();
        return;
      }

      shopState.visitorLocation = visitorLocation;
      shopState.locationStatus = "ready";
      cacheVisitorLocation(visitorLocation);
      updateShopContextBanner();
      renderShops();
    },
    (error) => {
      shopState.locationStatus = error?.code === 1 ? "denied" : "unavailable";
      updateShopContextBanner();
    },
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: forceFreshPosition ? 0 : SHOP_GEO_CACHE_TTL_MS
    }
  );
}

function readCachedVisitorLocation() {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return null;
    }

    const raw = window.sessionStorage.getItem(SHOP_GEO_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    if (Number(parsed.expiresAt || 0) <= Date.now()) {
      window.sessionStorage.removeItem(SHOP_GEO_CACHE_KEY);
      return null;
    }

    return normalizeVisitorLocation(parsed.location);
  } catch {
    return null;
  }
}

function cacheVisitorLocation(location) {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return;
    }

    window.sessionStorage.setItem(SHOP_GEO_CACHE_KEY, JSON.stringify({
      expiresAt: Date.now() + SHOP_GEO_CACHE_TTL_MS,
      location
    }));
  } catch {}
}

function normalizeVisitorLocation(location) {
  if (!location || typeof location !== "object") {
    return null;
  }

  const latitude = Number(location.latitude);
  const longitude = Number(location.longitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return {
    latitude,
    longitude
  };
}

function renderShops() {
  const query = shopSearchInput.value.trim().toLowerCase();
  const region = shopRegionSelect.value;

  const filtered = SHOPS
    .filter((shop) => {
      const matchesRegion = region === "All" || shop.region === region;
      const haystack = `${shop.name} ${shop.city} ${shop.state} ${shop.country} ${shop.region} ${shop.notes}`.toLowerCase();
      return matchesRegion && (!query || haystack.includes(query));
    })
    .map((shop, index) => {
      const distanceKm = getDistanceKm(shop);
      return {
        ...shop,
        distanceKm,
        isNearYou: Number.isFinite(distanceKm) && distanceKm <= NEARBY_DISTANCE_KM,
        originalIndex: index
      };
    })
    .sort(compareShops);

  shopCount.textContent = `${filtered.length} shops`;

  if (filtered.length === 0) {
    shopList.innerHTML = `
      <article class="empty-state">
        No pro shops matched that search. Try a broader city or region.
      </article>
    `;
    return;
  }

  shopList.innerHTML = filtered.map((shop) => renderShopCard(shop)).join("");
}

function compareShops(left, right) {
  const leftDistance = Number.isFinite(left.distanceKm) ? left.distanceKm : Number.POSITIVE_INFINITY;
  const rightDistance = Number.isFinite(right.distanceKm) ? right.distanceKm : Number.POSITIVE_INFINITY;

  if (leftDistance !== rightDistance) {
    return leftDistance - rightDistance;
  }

  return left.originalIndex - right.originalIndex;
}

function getDistanceKm(shop) {
  if (!shopState.visitorLocation) {
    return null;
  }

  if (!Number.isFinite(shop.latitude) || !Number.isFinite(shop.longitude)) {
    return null;
  }

  return haversineDistanceKm(
    shopState.visitorLocation.latitude,
    shopState.visitorLocation.longitude,
    shop.latitude,
    shop.longitude
  );
}

function haversineDistanceKm(fromLatitude, fromLongitude, toLatitude, toLongitude) {
  const radiusKm = 6371;
  const latitudeDelta = toRadians(toLatitude - fromLatitude);
  const longitudeDelta = toRadians(toLongitude - fromLongitude);
  const startLatitude = toRadians(fromLatitude);
  const endLatitude = toRadians(toLatitude);

  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radiusKm * c;
}

function toRadians(value) {
  return value * (Math.PI / 180);
}

function renderShopCard(shop) {
  const distanceLabel = Number.isFinite(shop.distanceKm)
    ? (shop.isNearYou ? "Near you" : `${formatDistance(shop.distanceKm)} away`)
    : "";

  return `
    <article class="shop-card">
      <div class="shop-card-header">
        <h3>${escapeHtml(shop.name)}</h3>
        ${distanceLabel ? `<span class="shop-distance${shop.isNearYou ? " shop-distance-near" : ""}">${escapeHtml(distanceLabel)}</span>` : ""}
      </div>
      <p class="shop-meta">${escapeHtml(shop.city)}, ${escapeHtml(shop.state)} | ${escapeHtml(shop.region)}</p>
      <p class="summary-copy">${escapeHtml(shop.notes)}</p>
      <div class="shop-actions">
        <a class="shop-link" href="${escapeHtml(shop.website)}" target="_blank" rel="noopener noreferrer">Visit Shop</a>
      </div>
    </article>
  `;
}

function updateShopContextBanner() {
  if (!shopContextBanner) {
    return;
  }

  const requestedStringLabel = getRequestedStringLabel();
  let message = "Allow browser location to sort the string shop listing by the closest shops first.";

  if (requestedStringLabel && shopState.locationStatus === "ready") {
    message = `Looking for ${requestedStringLabel}? Showing the closest string shops to your current location first.`;
  } else if (requestedStringLabel && shopState.locationStatus === "loading") {
    message = `Looking for ${requestedStringLabel}? Checking your browser location now.`;
  } else if (requestedStringLabel && shopState.locationStatus === "denied") {
    message = `Looking for ${requestedStringLabel}? Location access is blocked in your browser, so allow it from the address bar or use search and region filters instead.`;
  } else if (requestedStringLabel) {
    message = `Looking for ${requestedStringLabel}? Allow browser location to move the nearest string shops to the top.`;
  } else if (shopState.locationStatus === "ready") {
    message = "Showing the closest string shops to your current location first.";
  } else if (shopState.locationStatus === "loading") {
    message = "Checking your browser location to sort the closest string shops first.";
  } else if (shopState.locationStatus === "denied") {
    message = "Location access is blocked in your browser. Allow it from the address bar, or use search and region filters to find the best local string shop.";
  } else if (shopState.locationStatus === "unsupported") {
    message = "Browser location is not available here. Make sure the site is loaded over HTTPS, or use search and region filters instead.";
  } else if (shopState.locationStatus === "unavailable") {
    message = "We could not read your browser location. You can still search by city or region.";
  }

  shopContextBanner.textContent = message;
  shopContextBanner.classList.remove("planner-hidden");
  updateLocationButton();
}

function updateLocationButton() {
  if (!shopLocationButton) {
    return;
  }

  let label = "Use My Location";
  let disabled = false;

  if (shopState.locationStatus === "loading") {
    label = "Locating...";
    disabled = true;
  } else if (shopState.locationStatus === "ready") {
    label = "Refresh My Location";
  } else if (shopState.locationStatus === "denied") {
    label = "Enable Location";
  } else if (shopState.locationStatus === "unsupported") {
    label = "Location Unavailable";
    disabled = true;
  } else if (shopState.locationStatus === "unavailable") {
    label = "Try My Location";
  }

  shopLocationButton.textContent = label;
  shopLocationButton.disabled = disabled;
}

function getRequestedStringLabel() {
  return shopState.requestedString || shopState.requestedBrand || "";
}

function formatDistance(distanceKm) {
  if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)} km`;
  }

  return `${Math.round(distanceKm)} km`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
