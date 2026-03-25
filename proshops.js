const shopSearchInput = document.getElementById("shopSearchInput");
const shopRegionSelect = document.getElementById("shopRegionSelect");
const shopList = document.getElementById("shopList");
const shopCount = document.getElementById("shopCount");

const SHOPS = [
  { name: "Tennis Warehouse", city: "San Luis Obispo", state: "CA", region: "West Coast", website: "https://www.tennis-warehouse.com", notes: "Major tennis retailer with stringing support and string selection." },
  { name: "Belltown Tennis Shop", city: "Seattle", state: "WA", region: "West Coast", website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Seattle%2C+WA", notes: "Seattle-area independent tennis shop and restringing lead." },
  { name: "Avanti Sports", city: "Portland", state: "OR", region: "West Coast", website: "https://www.avantisports.com", notes: "Portland tennis and racquet sports retailer with restringing services." },
  { name: "Tennis Plaza", city: "Miami", state: "FL", region: "Southeast", website: "https://www.tennisplaza.com", notes: "Large tennis retailer with pro-shop style service." },
  { name: "RacquetGuys", city: "Toronto", state: "ON", region: "Canada", website: "https://www.racquetguys.ca", notes: "Canadian tennis retailer with stringing and tennis setup help." },
  { name: "Merchant of Tennis", city: "Toronto", state: "ON", region: "Canada", website: "https://www.merchantoftennis.com", notes: "Canadian pro-shop style retailer with string service." },
  { name: "Merchant of Tennis Oakville", city: "Oakville", state: "ON", region: "Canada", website: "https://www.merchantoftennis.com", notes: "GTA-area Merchant of Tennis location with certified stringing and tennis gear support." },
  { name: "Tennisology", city: "Vaughan", state: "ON", region: "Canada", website: "https://www.tennisology.ca", notes: "Vaughan and Toronto-area stringing specialist with pickup and drop-off support across the GTA." },
  { name: "Paragon Sports Tennis Shop", city: "New York", state: "NY", region: "Northeast", website: "https://www.paragonsports.com", notes: "NYC tennis retail option with racquet service." },
  { name: "Midwest Sports", city: "Cincinnati", state: "OH", region: "Midwest", website: "https://www.tennis-point.com", notes: "Large tennis retailer serving Midwest players." },
  { name: "Tennis Express", city: "Houston", state: "TX", region: "Southwest", website: "https://www.tennisexpress.com", notes: "Strong string and racquet setup retailer with service support." },
  { name: "PGA Tour Superstore Tennis", city: "Scottsdale", state: "AZ", region: "Southwest", website: "https://www.pgatoursuperstore.com", notes: "Big-box tennis stringing and grip service option." },
  { name: "Your Serve Tennis", city: "Chicago", state: "IL", region: "Midwest", website: "https://www.yelp.com/search?find_desc=tennis+shop&find_loc=Chicago%2C+IL", notes: "Chicago-area pro-shop lead for restringing and setup help." },
  { name: "Racquet Network", city: "Vancouver", state: "BC", region: "Canada", website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Vancouver%2C+BC", notes: "Metro Vancouver tennis stringing lead." },
  { name: "K8 Strings", city: "Vancouver", state: "BC", region: "Canada", website: "https://k8strings.com", notes: "Dedicated Vancouver racquet restringing shop with tour-level experience and racquet accessories." },
  { name: "T1 Sports", city: "Richmond", state: "BC", region: "Canada", website: "https://t1sports.net", notes: "Greater Vancouver tennis specialty store in Richmond with racquets, strings, and customer support." },
  { name: "ProStringer.ca", city: "North Vancouver", state: "BC", region: "Canada", website: "https://prostringer.ca", notes: "North Vancouver stringing service offering tennis racquet restringing and custom setups." },
  { name: "TopSpin Tennis Shop", city: "Surrey", state: "BC", region: "Canada", website: "https://www.topspintennis.ca/", notes: "Surrey racquet sports shop offering tennis equipment, customization, and stringing service." },
  { name: "Tennis Hub", city: "Los Angeles", state: "CA", region: "West Coast", website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Los+Angeles%2C+CA", notes: "Los Angeles-area search lead for local tennis restringing." },
  { name: "Bay Area Racquet Shop", city: "San Jose", state: "CA", region: "West Coast", website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=San+Jose%2C+CA", notes: "South Bay pro-shop lead for stringing and grip work." },
  { name: "Match Point Tennis", city: "Atlanta", state: "GA", region: "Southeast", website: "https://www.yelp.com/search?find_desc=tennis+shop&find_loc=Atlanta%2C+GA", notes: "Atlanta-area tennis pro-shop search lead." },
  { name: "Austin Tennis Shop", city: "Austin", state: "TX", region: "Southwest", website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Austin%2C+TX", notes: "Austin search lead for restringing and setup support." },
  { name: "Denver Tennis Stringing", city: "Denver", state: "CO", region: "Southwest", website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Denver%2C+CO", notes: "Denver-area restringing search lead." },
  { name: "Philadelphia Racquet Sports", city: "Philadelphia", state: "PA", region: "Northeast", website: "https://www.yelp.com/search?find_desc=tennis+stringing&find_loc=Philadelphia%2C+PA", notes: "Philadelphia metro search lead for tennis setup services." },
  { name: "Tenniszon", city: "Montreal", state: "QC", region: "Canada", website: "https://tenniszon.com", notes: "Longtime Montreal tennis retailer and official stringer with deep racquet and string expertise." },
  { name: "Aforza Pro Shop", city: "Calgary", state: "AB", region: "Canada", website: "https://www.aforza.ca/aforza-pro-shop/", notes: "Calgary tennis pro shop with stringing service, racquets, shoes, and string guidance." },
  { name: "Aforza Shop", city: "Calgary", state: "AB", region: "Canada", website: "https://www.aforzashop.ca", notes: "Aforza's public tennis retail shop with string options and knowledgeable staff in Calgary." },
  { name: "Racquet Central", city: "Calgary", state: "AB", region: "Canada", website: "http://www.racquetcentral.ca", notes: "Calgary racquet-sports specialty retailer known for professional stringing service." },
  { name: "Calgary Racquet Stringing", city: "Calgary", state: "AB", region: "Canada", website: "https://calgaryracquetstringing.ca/tennis-racquet-stringing-calgary/", notes: "Calgary tennis stringing service with custom string, color, gauge, and tension options." },
  { name: "G-Fresh Stringing", city: "Edmonton", state: "AB", region: "Canada", website: "https://www.gfreshstringing.com", notes: "North Edmonton tennis racquet stringing specialist offering custom setups and hybrid options." },
  { name: "Edmonton Squash Club Pro Shop", city: "Edmonton", state: "AB", region: "Canada", website: "https://edmontonsquashclub.ca/pro-shop/", notes: "Edmonton pro shop with racquet restringing services and racquet-sport accessories." },
  { name: "Taylor Tennis Centre Pro Shop", city: "Winnipeg", state: "MB", region: "Canada", website: "https://www.taylortenniscentre.ca/services", notes: "Winnipeg tennis centre pro shop with stringing support and tennis equipment." },
  { name: "Racquets Pro Shop & Stringing Centre", city: "Winnipeg", state: "MB", region: "Canada", website: "https://www.racquetsproshop.ca", notes: "Long-running Winnipeg racquet retailer and stringing centre with tennis strings and service." }
];

if (shopSearchInput && shopRegionSelect && shopList && shopCount) {
  shopSearchInput.addEventListener("input", renderShops);
  shopRegionSelect.addEventListener("change", renderShops);
  renderShops();
}

function renderShops() {
  const query = shopSearchInput.value.trim().toLowerCase();
  const region = shopRegionSelect.value;

  const filtered = SHOPS.filter((shop) => {
    const matchesRegion = region === "All" || shop.region === region;
    const haystack = `${shop.name} ${shop.city} ${shop.state} ${shop.region}`.toLowerCase();
    return matchesRegion && (!query || haystack.includes(query));
  });

  shopCount.textContent = `${filtered.length} shops`;

  if (filtered.length === 0) {
    shopList.innerHTML = `
      <article class="empty-state">
        No pro shops matched that search. Try a broader city or region.
      </article>
    `;
    return;
  }

  shopList.innerHTML = filtered.map((shop) => `
    <article class="shop-card">
      <h3>${shop.name}</h3>
      <p class="shop-meta">${shop.city}, ${shop.state} | ${shop.region}</p>
      <p class="summary-copy">${shop.notes}</p>
      <div class="shop-actions">
        <a class="shop-link" href="${shop.website}" target="_blank" rel="noopener noreferrer">Visit Shop</a>
      </div>
    </article>
  `).join("");
}
