(function () {
  const storageKey = "tennisStringPlannerCustomPros";

  const proPlayerForm = document.getElementById("proPlayerForm");
  const playerNameInput = document.getElementById("playerNameInput");
  const playerTourSelect = document.getElementById("playerTourSelect");
  const playerStringSelect = document.getElementById("playerStringSelect");
  const playerTensionInput = document.getElementById("playerTensionInput");
  const playerRacketInput = document.getElementById("playerRacketInput");
  const playerNoteInput = document.getElementById("playerNoteInput");
  const proPlayerStatus = document.getElementById("proPlayerStatus");
  const proPlayerCount = document.getElementById("proPlayerCount");
  const proPlayerList = document.getElementById("proPlayerList");
  const missingPlayerCount = document.getElementById("missingPlayerCount");
  const missingPlayerList = document.getElementById("missingPlayerList");

  initializeProPlayerManager();

  function initializeProPlayerManager() {
    if (!proPlayerForm || !playerStringSelect || !proPlayerList) {
      return;
    }

    hydrateStringOptions();
    renderCustomProPlayers();
    renderMissingAssociations();

    proPlayerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveCustomProPlayer();
    });
  }

  function hydrateStringOptions() {
    const strings = Array.isArray(window.TENNIS_STRING_PLANNER_STRINGS)
      ? [...window.TENNIS_STRING_PLANNER_STRINGS].sort((a, b) => a.name.localeCompare(b.name))
      : [];

    playerStringSelect.innerHTML = strings
      .map((entry) => `<option value="${escapeHtml(entry.name)}">${escapeHtml(entry.name)}</option>`)
      .join("");
  }

  function saveCustomProPlayer() {
    const name = playerNameInput.value.trim();
    const tour = playerTourSelect.value;
    const stringName = playerStringSelect.value;
    const tension = playerTensionInput.value.trim();
    const racket = playerRacketInput ? playerRacketInput.value.trim() : "";
    const note = playerNoteInput.value.trim();

    if (!name || !tour || !stringName || !tension) {
      setProPlayerStatus("Please complete the player name, tour, string, and tension fields.");
      return;
    }

    const records = getCustomProPlayers();
    records.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      tour,
      stringName,
      tension,
      racket,
      note
    });

    setCustomProPlayers(records);
    proPlayerForm.reset();
    if (playerTourSelect) {
      playerTourSelect.value = "ATP";
    }
    setProPlayerStatus(`Saved ${name} for ${stringName}.`);
    renderCustomProPlayers();
    renderMissingAssociations();
  }

  function renderCustomProPlayers() {
    const records = getCustomProPlayers().sort((a, b) => a.name.localeCompare(b.name));
    proPlayerCount.textContent = `${records.length} saved players`;

    if (records.length === 0) {
      proPlayerList.innerHTML = `
        <article class="empty-state">
          No custom pro players saved yet. Add a player, assign a string, and save a tension note here.
        </article>
      `;
      return;
    }

    proPlayerList.innerHTML = records.map((record) => `
      <article class="shop-card">
        <h3>${escapeHtml(record.name)}</h3>
        <p class="shop-meta">${escapeHtml(record.tour)} | ${escapeHtml(record.stringName)}</p>
        <p class="summary-copy"><strong>Tension:</strong> ${escapeHtml(record.tension)}</p>
        <p class="summary-copy"><strong>Racket:</strong> ${record.racket ? escapeHtml(record.racket) : "Not added"}</p>
        <p class="summary-note">${record.note ? escapeHtml(record.note) : "No extra note added."}</p>
        <div class="shop-actions">
          <button class="secondary-button compact-button" type="button" data-delete-id="${record.id}">Delete</button>
        </div>
      </article>
    `).join("");

    proPlayerList.querySelectorAll("[data-delete-id]").forEach((button) => {
      button.addEventListener("click", () => {
        deleteCustomProPlayer(button.dataset.deleteId || "");
      });
    });
  }

  function renderMissingAssociations() {
    if (!missingPlayerList || !missingPlayerCount) {
      return;
    }

    const playerOptions = window.TENNIS_STRING_PLANNER_PLAYER_OPTIONS || { atp: [], wta: [] };
    const records = getCustomProPlayers();
    const catalog = Array.isArray(window.TENNIS_STRING_PLANNER_STRINGS) ? window.TENNIS_STRING_PLANNER_STRINGS : [];

    const associatedAtp = new Set(
      [
        ...catalog.flatMap((entry) => Array.isArray(entry.atpPlayers) ? entry.atpPlayers : []),
        ...records.filter((record) => record.tour === "ATP").map((record) => record.name)
      ].map(normalizeName)
    );

    const associatedWta = new Set(
      [
        ...catalog.flatMap((entry) => Array.isArray(entry.wtaPlayers) ? entry.wtaPlayers : []),
        ...records.filter((record) => record.tour === "WTA").map((record) => record.name)
      ].map(normalizeName)
    );

    const missingAtp = playerOptions.atp.filter((name) => !associatedAtp.has(normalizeName(name)));
    const missingWta = playerOptions.wta.filter((name) => !associatedWta.has(normalizeName(name)));
    const totalMissing = missingAtp.length + missingWta.length;

    missingPlayerCount.textContent = `${totalMissing} players missing`;

    if (totalMissing === 0) {
      missingPlayerList.innerHTML = `
        <article class="empty-state">
          Every ATP and WTA player in the current dropdown lists has a string association.
        </article>
      `;
      return;
    }

    missingPlayerList.innerHTML = `
      <article class="shop-card">
        <h3>ATP Players Missing Associations</h3>
        <p class="shop-meta">${missingAtp.length} players</p>
        <p class="summary-copy">${missingAtp.length > 0 ? missingAtp.map(escapeHtml).join(", ") : "None missing."}</p>
      </article>
      <article class="shop-card">
        <h3>WTA Players Missing Associations</h3>
        <p class="shop-meta">${missingWta.length} players</p>
        <p class="summary-copy">${missingWta.length > 0 ? missingWta.map(escapeHtml).join(", ") : "None missing."}</p>
      </article>
    `;
  }

  function deleteCustomProPlayer(id) {
    const records = getCustomProPlayers().filter((record) => record.id !== id);
    setCustomProPlayers(records);
    setProPlayerStatus("Deleted pro player record.");
    renderCustomProPlayers();
    renderMissingAssociations();
  }

  function getCustomProPlayers() {
    try {
      const raw = window.localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function setCustomProPlayers(records) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(records));
    } catch {
      setProPlayerStatus("Could not save to local storage.");
    }
  }

  function setProPlayerStatus(message) {
    if (proPlayerStatus) {
      proPlayerStatus.textContent = message;
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeName(value) {
    return String(value || "").trim().toLowerCase();
  }
})();
