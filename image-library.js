const IMAGE_LIBRARY_STORAGE_PREFIX = "tennisStringPlannerImage:";
const imageLibraryGrid = document.getElementById("imageLibraryGrid");
const imageLibraryStatus = document.getElementById("imageLibraryStatus");
const imageLibraryCount = document.getElementById("imageLibraryCount");
const imageLibrarySearch = document.getElementById("imageLibrarySearch");
const DEFAULT_VISIBLE_SLOTS = 24;

let allStringSlots = [];
let filteredStringSlots = [];
let activePasteSlotIndex = -1;

initializeImageLibrary();

function initializeImageLibrary() {
  if (!imageLibraryGrid || !window.TENNIS_STRING_PLANNER_STRINGS) {
    return;
  }

  allStringSlots = [...window.TENNIS_STRING_PLANNER_STRINGS]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => ({
      name: entry.name,
      brand: entry.brand,
      type: entry.type,
      fileHint: `${slugifyName(entry.name)}.jpg`
    }));

  filteredStringSlots = getFilteredSlots("");
  renderImageLibrary();

  if (imageLibrarySearch) {
    imageLibrarySearch.addEventListener("input", () => {
      filteredStringSlots = getFilteredSlots(imageLibrarySearch.value.trim().toLowerCase());
      renderImageLibrary();
    });
  }

  document.addEventListener("paste", handleImagePaste);
}

function getFilteredSlots(query) {
  if (!query) {
    return allStringSlots.slice(0, DEFAULT_VISIBLE_SLOTS);
  }

  return allStringSlots.filter((slot) =>
    slot.name.toLowerCase().includes(query) ||
    slot.brand.toLowerCase().includes(query)
  );
}

function renderImageLibrary() {
  imageLibraryGrid.innerHTML = filteredStringSlots.map((slot, index) => renderSlotCard(slot, index)).join("");
  filteredStringSlots.forEach((slot, index) => attachSlotEvents(slot, index));
  imageLibraryCount.textContent = `${filteredStringSlots.length} strings shown`;
}

function renderSlotCard(slot, index) {
  const storedImage = getStoredImage(slot.name);
  const previewMarkup = storedImage
    ? `<img src="${storedImage}" alt="${slot.name} preview" class="image-slot-preview">`
    : `<div class="image-slot-placeholder">Drop, Paste, or Double-Click</div>`;
  const selectedClass = activePasteSlotIndex === index ? " is-selected" : "";

  return `
    <article class="image-slot-card${selectedClass}" id="image-slot-card-${index}" data-index="${index}" tabindex="0">
      <div class="image-slot-header">
        <div>
          <h3>${slot.name}</h3>
          <p class="latin-name">${slot.brand} | ${slot.type}</p>
          <p class="image-slot-file">Suggested file: ${slot.fileHint}</p>
        </div>
      </div>
      <div class="image-dropzone" id="image-dropzone-${index}" tabindex="0" contenteditable="true" spellcheck="false" role="button" aria-label="Photo slot for ${slot.name}">
        ${previewMarkup}
      </div>
      <input class="image-slot-input" id="image-slot-input-${index}" type="file" accept="image/*">
      <div class="image-slot-actions">
        <button class="secondary-button compact-button" type="button" data-action="clear" data-index="${index}">Clear</button>
      </div>
    </article>
  `;
}

function attachSlotEvents(slot, index) {
  const card = document.getElementById(`image-slot-card-${index}`);
  const dropzone = document.getElementById(`image-dropzone-${index}`);
  const input = document.getElementById(`image-slot-input-${index}`);
  const clearButton = document.querySelector(`[data-action="clear"][data-index="${index}"]`);

  if (card) {
    ["click", "focusin"].forEach((eventName) => {
      card.addEventListener(eventName, () => setActivePasteSlot(index));
    });
  }

  if (input) {
    input.addEventListener("change", async (event) => {
      const file = event.currentTarget.files && event.currentTarget.files[0];
      if (!file) {
        return;
      }
      await saveImageFromFile(slot.name, file);
      updateSlotPreview(slot, index);
    });
  }

  if (dropzone) {
    ["click", "focus"].forEach((eventName) => {
      dropzone.addEventListener(eventName, () => setActivePasteSlot(index));
    });

    dropzone.addEventListener("contextmenu", () => {
      setActivePasteSlot(index);
      dropzone.focus();
    });

    dropzone.addEventListener("dblclick", () => {
      if (input) {
        input.click();
      }
    });

    dropzone.addEventListener("beforeinput", (event) => {
      if (event.inputType !== "insertFromPaste") {
        event.preventDefault();
      }
    });

    dropzone.addEventListener("paste", async (event) => {
      const didSave = await trySavePastedImage(event, index);
      if (didSave) {
        event.preventDefault();
      }
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropzone.classList.add("dragging");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropzone.classList.remove("dragging");
      });
    });

    dropzone.addEventListener("drop", async (event) => {
      const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
      if (!file) {
        return;
      }
      await saveImageFromFile(slot.name, file);
      updateSlotPreview(slot, index);
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      clearStoredImage(slot.name);
      updateSlotPreview(slot, index);
    });
  }
}

async function handleImagePaste(event) {
  const target = event.target;
  const isDropzoneTarget = target instanceof HTMLElement && target.classList.contains("image-dropzone");

  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable && !isDropzoneTarget)
  ) {
    return;
  }

  if (activePasteSlotIndex < 0 || activePasteSlotIndex >= filteredStringSlots.length) {
    return;
  }

  const didSave = await trySavePastedImage(event, activePasteSlotIndex);
  if (didSave) {
    event.preventDefault();
  }
}

async function trySavePastedImage(event, index) {
  const items = event.clipboardData && event.clipboardData.items;
  if (!items) {
    return false;
  }

  const imageItem = Array.from(items).find((item) => item.type && item.type.startsWith("image/"));
  if (!imageItem) {
    return false;
  }

  const file = imageItem.getAsFile();
  if (!file) {
    return false;
  }

  const slot = filteredStringSlots[index];
  if (!slot) {
    return false;
  }

  await saveImageFromFile(slot.name, file);
  updateSlotPreview(slot, index);
  return true;
}

async function saveImageFromFile(name, file) {
  const dataUrl = await readFileAsDataUrl(file);
  try {
    window.localStorage.setItem(getImageKey(name), dataUrl);
    setStatus(`Saved image for ${name}.`);
  } catch {
    setStatus("Image could not be saved. Browser storage may be full.");
  }
}

function updateSlotPreview(slot, index) {
  const dropzone = document.getElementById(`image-dropzone-${index}`);
  const input = document.getElementById(`image-slot-input-${index}`);
  const storedImage = getStoredImage(slot.name);

  if (!dropzone) {
    return;
  }

  dropzone.innerHTML = storedImage
    ? `<img src="${storedImage}" alt="${slot.name} preview" class="image-slot-preview">`
    : `<div class="image-slot-placeholder">Drop, Paste, or Double-Click</div>`;

  if (input) {
    input.value = "";
  }
}

function getStoredImage(name) {
  try {
    return window.localStorage.getItem(getImageKey(name)) || "";
  } catch {
    return "";
  }
}

function clearStoredImage(name) {
  try {
    window.localStorage.removeItem(getImageKey(name));
    setStatus(`Cleared image for ${name}.`);
  } catch {
    setStatus("Could not clear that image.");
  }
}

function getImageKey(name) {
  return `${IMAGE_LIBRARY_STORAGE_PREFIX}${slugifyName(name)}`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function setStatus(message) {
  if (imageLibraryStatus) {
    imageLibraryStatus.textContent = message;
  }
}

function setActivePasteSlot(index) {
  activePasteSlotIndex = index;
  document.querySelectorAll(".image-slot-card").forEach((card) => {
    card.classList.toggle("is-selected", Number(card.dataset.index) === index);
  });

  const slot = filteredStringSlots[index];
  if (slot) {
    setStatus(`Selected ${slot.name}. You can drop, choose, or paste an image here.`);
  }
}
