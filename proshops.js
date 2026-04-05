const shopSearchInput = document.getElementById("shopSearchInput");
const shopRegionSelect = document.getElementById("shopRegionSelect");
const shopLocationSelect = document.getElementById("shopLocationSelect");
const shopList = document.getElementById("shopList");
const shopCount = document.getElementById("shopCount");
const shopContextBanner = document.getElementById("shopContextBanner");
const shopLocationButton = document.getElementById("shopLocationButton");

const ALL_LOCATIONS_VALUE = "";
const BROWSER_LOCATION_VALUE = "__browser__";
const SHOP_GEO_CACHE_KEY = "tsl-shop-browser-geo-v1";
const SHOP_GEO_CACHE_TTL_MS = 1000 * 60 * 60 * 6;
const AUTO_FILTER_RADIUS_KM = 80;
const CLOSEST_FALLBACK_LIMIT = 8;
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

const MANUAL_LOCATION_OPTIONS = buildManualLocationOptions();
const MANUAL_LOCATION_MAP = new Map(MANUAL_LOCATION_OPTIONS.map((location) => [location.key, location]));

const shopState = {
  requestedString: "",
  requestedBrand: "",
  browserLocation: null,
  selectedLocationKey: ALL_LOCATIONS_VALUE,
  locationStatus: "idle",
  locationErrorCode: null,
  renderMode: "all",
  renderCount: 0
};

if (shopSearchInput && shopRegionSelect && shopLocationSelect && shopList && shopCount) {
  initializeShopFinder();
}

function initializeShopFinder() {
  readShopContextFromUrl();
  renderLocationSelect();

  shopSearchInput.addEventListener("input", renderShops);
  shopRegionSelect.addEventListener("change", renderShops);
  shopLocationSelect.addEventListener("change", handleLocationSelectionChange);

  if (shopLocationButton) {
    shopLocationButton.addEventListener("click", () => {
      requestVisitorLocation(true);
    });
  }

  renderShops();
  hydrateVisitorLocation();
}

function buildManualLocationOptions() {
  const uniqueLocations = new Map();

  SHOPS.forEach((shop) => {
    const key = `${shop.city}|${shop.state}`;
    if (uniqueLocations.has(key)) {
      return;
    }

    uniqueLocations.set(key, {
      key,
      label: `${shop.city}, ${shop.state}`,
      latitude: shop.latitude,
      longitude: shop.longitude
    });
  });

  return [...uniqueLocations.values()].sort((left, right) => left.label.localeCompare(right.label));
}

function renderLocationSelect() {
  if (!shopLocationSelect) {
    return;
  }

  const options = [
    `<option value="${ALL_LOCATIONS_VALUE}">All Locations</option>`
  ];

  if (shopState.browserLocation) {
    options.push(`<option value="${BROWSER_LOCATION_VALUE}">Nearby to You</option>`);
  }

  MANUAL_LOCATION_OPTIONS.forEach((location) => {
    options.push(`<option value="${escapeHtml(location.key)}">${escapeHtml(location.label)}</option>`);
  });

  shopLocationSelect.innerHTML = options.join("");

  const selectedValue = optionsContainValue(shopLocationSelect, shopState.selectedLocationKey)
    ? shopState.selectedLocationKey
    : ALL_LOCATIONS_VALUE;

  shopState.selectedLocationKey = selectedValue;
  shopLocationSelect.value = selectedValue;
  shopLocationSelect.title = "Choose a city to auto-filter nearby pro shops. Select All Locations to show the full shop database.";
  shopLocationSelect.setAttribute("aria-label", "Choose a city to auto-filter nearby pro shops");
}

function optionsContainValue(selectElement, value) {
  return [...selectElement.options].some((option) => option.value === value);
}

function handleLocationSelectionChange() {
  const nextValue = shopLocationSelect.value;

  if (nextValue === BROWSER_LOCATION_VALUE && !shopState.browserLocation) {
    requestVisitorLocation(false);
    return;
  }

  shopState.selectedLocationKey = nextValue;
  renderLocationSelect();
  renderShops();
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
  const cachedLocation = readCachedBrowserLocation();
  if (cachedLocation) {
    shopState.browserLocation = cachedLocation;
    shopState.locationStatus = "ready";
    shopState.locationErrorCode = null;
    shopState.selectedLocationKey = BROWSER_LOCATION_VALUE;
    renderLocationSelect();
    renderShops();
    return;
  }

  if (!supportsBrowserGeolocation()) {
    shopState.locationStatus = "unsupported";
    shopState.locationErrorCode = null;
    updateShopContextBanner();
    return;
  }

  const permissionState = await getGeolocationPermissionState();

  if (permissionState === "denied") {
    shopState.locationStatus = "denied";
    shopState.locationErrorCode = 1;
    updateShopContextBanner();
    return;
  }

  if (permissionState === "granted") {
    requestVisitorLocation(false);
    return;
  }

  shopState.locationStatus = "idle";
  shopState.locationErrorCode = null;
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
  shopState.locationErrorCode = null;
  updateShopContextBanner();

  const attempts = [
    {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: forceFreshPosition ? 0 : SHOP_GEO_CACHE_TTL_MS
    },
    {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0
    }
  ];

  runGeolocationAttempt(attempts, 0);
}

function runGeolocationAttempt(attempts, index) {
  const options = attempts[index];
  if (!options) {
    shopState.locationStatus = "unavailable";
    updateShopContextBanner();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const browserLocation = normalizeBrowserLocation({
        latitude: position?.coords?.latitude,
        longitude: position?.coords?.longitude
      });

      if (!browserLocation) {
        shopState.locationStatus = "unavailable";
        shopState.locationErrorCode = 2;
        updateShopContextBanner();
        return;
      }

      shopState.browserLocation = browserLocation;
      shopState.locationStatus = "ready";
      shopState.locationErrorCode = null;
      shopState.selectedLocationKey = BROWSER_LOCATION_VALUE;
      cacheBrowserLocation(browserLocation);
      renderLocationSelect();
      renderShops();
    },
    (error) => {
      const errorCode = Number(error?.code || 0);

      if (errorCode === 3 && index < attempts.length - 1) {
        runGeolocationAttempt(attempts, index + 1);
        return;
      }

      shopState.locationErrorCode = errorCode || null;
      shopState.locationStatus = errorCode === 1 ? "denied" : "unavailable";
      updateShopContextBanner();
    },
    options
  );
}

function readCachedBrowserLocation() {
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

    return normalizeBrowserLocation(parsed.location);
  } catch {
    return null;
  }
}

function cacheBrowserLocation(location) {
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

function normalizeBrowserLocation(location) {
  if (!location || typeof location !== "object") {
    return null;
  }

  const latitude = Number(location.latitude);
  const longitude = Number(location.longitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return {
    label: "your current location",
    latitude,
    longitude
  };
}

function getActiveLocation() {
  if (shopState.selectedLocationKey === BROWSER_LOCATION_VALUE) {
    return shopState.browserLocation;
  }

  return MANUAL_LOCATION_MAP.get(shopState.selectedLocationKey) || null;
}

function getActiveLocationSource() {
  if (shopState.selectedLocationKey === BROWSER_LOCATION_VALUE && shopState.browserLocation) {
    return "browser";
  }

  if (MANUAL_LOCATION_MAP.has(shopState.selectedLocationKey)) {
    return "manual";
  }

  return "";
}

function getActiveLocationLabel() {
  const activeLocation = getActiveLocation();
  if (!activeLocation) {
    return "";
  }

  return activeLocation.label || "your current location";
}

function renderShops() {
  const query = shopSearchInput.value.trim().toLowerCase();
  const region = shopRegionSelect.value;
  const hasExplicitFilters = Boolean(query) || region !== "All";

  const ranked = SHOPS
    .filter((shop) => {
      const matchesRegion = region === "All" || shop.region === region;
      const haystack = `${shop.name} ${shop.city} ${shop.state} ${shop.country} ${shop.region} ${shop.notes}`.toLowerCase();
      return matchesRegion && (!query || haystack.includes(query));
    })
    .map((shop, index) => ({
      ...shop,
      distanceKm: getDistanceKm(shop),
      originalIndex: index
    }))
    .sort(compareShops);

  const locationFiltered = applyLocationFilter(ranked, hasExplicitFilters);
  const visibleShops = locationFiltered.shops;

  shopState.renderMode = locationFiltered.mode;
  shopState.renderCount = visibleShops.length;
  shopCount.textContent = buildShopCountLabel(visibleShops.length, locationFiltered.mode);

  if (visibleShops.length === 0) {
    shopList.innerHTML = `
      <article class="empty-state">
        ${escapeHtml(buildEmptyStateMessage())}
      </article>
    `;
    updateShopContextBanner();
    return;
  }

  shopList.innerHTML = visibleShops.map((shop) => renderShopCard(shop)).join("");
  updateShopContextBanner();
}

function applyLocationFilter(shops, hasExplicitFilters) {
  const activeLocation = getActiveLocation();
  if (!activeLocation) {
    return {
      shops,
      mode: "all"
    };
  }

  const nearbyShops = shops.filter((shop) => Number.isFinite(shop.distanceKm) && shop.distanceKm <= AUTO_FILTER_RADIUS_KM);
  if (nearbyShops.length > 0) {
    return {
      shops: nearbyShops,
      mode: "nearby"
    };
  }

  if (!hasExplicitFilters) {
    const closestShops = shops.filter((shop) => Number.isFinite(shop.distanceKm)).slice(0, CLOSEST_FALLBACK_LIMIT);
    if (closestShops.length > 0) {
      return {
        shops: closestShops,
        mode: "closest"
      };
    }
  }

  return {
    shops: [],
    mode: "nearby-empty"
  };
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
  const activeLocation = getActiveLocation();
  if (!activeLocation) {
    return null;
  }

  if (!Number.isFinite(shop.latitude) || !Number.isFinite(shop.longitude)) {
    return null;
  }

  return haversineDistanceKm(
    activeLocation.latitude,
    activeLocation.longitude,
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
  const isNearYou = Number.isFinite(shop.distanceKm) && shop.distanceKm <= NEARBY_DISTANCE_KM;
  const distanceLabel = Number.isFinite(shop.distanceKm)
    ? (isNearYou ? "Near you" : `${formatDistance(shop.distanceKm)} away`)
    : "";

  return `
    <article class="shop-card">
      <div class="shop-card-header">
        <h3>${escapeHtml(shop.name)}</h3>
        ${distanceLabel ? `<span class="shop-distance${isNearYou ? " shop-distance-near" : ""}">${escapeHtml(distanceLabel)}</span>` : ""}
      </div>
      <p class="shop-meta">${escapeHtml(shop.city)}, ${escapeHtml(shop.state)} | ${escapeHtml(shop.region)}</p>
      <p class="summary-copy">${escapeHtml(shop.notes)}</p>
      <div class="shop-actions">
        <a class="shop-link" href="${escapeHtml(shop.website)}" target="_blank" rel="noopener noreferrer">Visit Shop</a>
      </div>
    </article>
  `;
}

function buildShopCountLabel(count, mode) {
  if (mode === "nearby" || mode === "nearby-empty") {
    return `${count} nearby shops`;
  }

  if (mode === "closest") {
    return `${count} closest shops`;
  }

  return `${count} shops`;
}

function buildEmptyStateMessage() {
  const activeLocationSource = getActiveLocationSource();

  if (activeLocationSource === "manual") {
    return `No nearby pro shops matched that search near ${getActiveLocationLabel()}. Choose another city or switch back to All Locations.`;
  }

  if (activeLocationSource === "browser") {
    return "No nearby pro shops matched that search near your current location. Choose a city from the menu or switch back to All Locations.";
  }

  return "No pro shops matched that search. Try a broader city or region.";
}

function updateShopContextBanner() {
  if (!shopContextBanner) {
    return;
  }

  const requestedPrefix = getRequestedStringLabel()
    ? `For ${getRequestedStringLabel()}, `
    : "";
  const activeLocationSource = getActiveLocationSource();
  const activeLocationLabel = getActiveLocationLabel();
  let message = `${requestedPrefix}use My Location or choose a city from the location menu to auto-filter nearby string shops.`;

  if (activeLocationSource === "manual" && shopState.renderMode === "nearby") {
    message = `${requestedPrefix}showing nearby string shops around ${activeLocationLabel}. Switch the city menu or choose All Locations to browse the full shop database.`;
  } else if (activeLocationSource === "manual" && shopState.renderMode === "closest") {
    message = `${requestedPrefix}no shops landed inside the nearby radius for ${activeLocationLabel}, so showing the closest available pro shops instead.`;
  } else if (activeLocationSource === "browser" && shopState.renderMode === "nearby") {
    message = `${requestedPrefix}showing nearby string shops around your current location. Choose a city from the menu or switch to All Locations to browse every shop.`;
  } else if (activeLocationSource === "browser" && shopState.renderMode === "closest") {
    message = `${requestedPrefix}no shops landed inside the nearby radius for your current location, so showing the closest available pro shops instead.`;
  } else if (shopState.locationStatus === "loading") {
    message = `${requestedPrefix}checking your browser location now. This can take a few seconds. If it fails, use the city menu as a backup.`;
  } else if (shopState.locationStatus === "denied") {
    message = `${requestedPrefix}location access is blocked in your browser. Allow it from the address bar, or use the city menu to auto-filter nearby shops without browser permissions.`;
  } else if (shopState.locationStatus === "unsupported") {
    message = `${requestedPrefix}browser location is not available here. Make sure the site is loaded over HTTPS, or choose a city from the menu instead.`;
  } else if (shopState.locationStatus === "unavailable") {
    message = `${requestedPrefix}${getUnavailableLocationMessage()} Choose a city from the menu if you want nearby shops right away.`;
  }

  shopContextBanner.textContent = capitalizeFirstLetter(message);
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
  } else if (shopState.selectedLocationKey === BROWSER_LOCATION_VALUE && shopState.locationStatus === "ready") {
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
  shopLocationButton.title = getLocationButtonTooltip(label);
  shopLocationButton.setAttribute("aria-label", getLocationButtonTooltip(label));
}

function getLocationButtonTooltip(label) {
  if (label === "Refresh My Location") {
    return "Use your browser location again and refresh the nearby pro shop filter.";
  }

  if (label === "Enable Location") {
    return "Your browser is blocking location for this site. Allow location in your browser settings, or choose a city from the menu as a backup.";
  }

  if (label === "Try My Location") {
    return "Retry browser location. If it still fails, choose a city from the menu to filter nearby shops.";
  }

  if (label === "Location Unavailable") {
    return "Browser location is not available here. Use the city menu to filter nearby shops instead.";
  }

  if (label === "Locating...") {
    return "The site is checking your browser location now.";
  }

  return "Use your browser location to auto-filter nearby pro shops. If location is blocked, choose a city from the menu instead.";
}

function getRequestedStringLabel() {
  return shopState.requestedString || shopState.requestedBrand || "";
}

function getUnavailableLocationMessage() {
  if (shopState.locationErrorCode === 2) {
    return "Your browser could not determine a location. Try again, turn off any VPN, or use search and region filters.";
  }

  if (shopState.locationErrorCode === 3) {
    return "Location lookup timed out. Try My Location again, or use the city menu if your device is slow to respond.";
  }

  return "We could not read your browser location.";
}

function formatDistance(distanceKm) {
  if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)} km`;
  }

  return `${Math.round(distanceKm)} km`;
}

function capitalizeFirstLetter(value) {
  const text = String(value || "");
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
