(function () {
  const STORAGE_KEY = "idhantFanClubWaitlist";

  function readStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function writeStorage(obj) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  }

  function normalizeEmail(email) {
    return String(email).trim().toLowerCase();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function formatPlace(n) {
    return n.toLocaleString("en-US");
  }

  function pseudoPlaceFromEmail(email) {
    let h = 0;
    for (let i = 0; i < email.length; i++) h = (h * 31 + email.charCodeAt(i)) >>> 0;
    const base = 2_050_000;
    const span = 899_999;
    return base + (h % span);
  }

  function renderBoard() {
    const list = document.getElementById("board-list");
    if (!list || !window.__LEADERBOARD__) return;

    list.innerHTML = "";
    window.__LEADERBOARD__.forEach((row) => {
      const li = document.createElement("li");
      li.className = "board-row" + (row.rank === 1 ? " board-row-top" : "");

      const rank = document.createElement("span");
      rank.className = "board-rank";
      rank.textContent = String(row.rank);

      const body = document.createElement("div");
      body.className = "board-body";

      const nameRow = document.createElement("div");
      nameRow.className = "board-name-row";

      const name = document.createElement("span");
      name.className = "board-name";
      name.textContent = row.name;

      nameRow.appendChild(name);

      if (row.rank === 1) {
        const badge = document.createElement("span");
        badge.className = "board-badge";
        badge.textContent = row.note || "#1 Fan";
        nameRow.appendChild(badge);
      }

      body.appendChild(nameRow);

      if (row.rank === 1) {
        const sub = document.createElement("p");
        sub.className = "board-sub";
        sub.textContent =
          "Olivia camped the drop, knew every reference, and still thanks the staff by name. The board starts with her.";
        body.appendChild(sub);
      }

      li.appendChild(rank);
      li.appendChild(body);
      list.appendChild(li);
    });
  }

  function bindForm() {
    const form = document.getElementById("waitlist-form");
    const msg = document.getElementById("form-message");
    if (!form || !msg) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      msg.textContent = "";

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      if (!(nameInput instanceof HTMLInputElement) || !(emailInput instanceof HTMLInputElement)) return;

      const name = nameInput.value.trim();
      const email = normalizeEmail(emailInput.value);

      if (!name) {
        msg.textContent = "Please add your name.";
        nameInput.focus();
        return;
      }
      if (!email || !isValidEmail(email)) {
        msg.textContent = "Please enter a valid email.";
        emailInput.focus();
        return;
      }

      const store = readStorage();
      const existing = store[email];
      const place = existing ? existing.place : pseudoPlaceFromEmail(email);

      store[email] = { name, place, at: existing ? existing.at : Date.now() };
      writeStorage(store);

      msg.textContent = existing
        ? `You are already on the list, ${name.split(" ")[0] || name}. Your place in line is #${formatPlace(place)}.`
        : `Welcome, ${name.split(" ")[0] || name}. You are on the list at position #${formatPlace(place)}. We will write to ${email}.`;

      if (!existing) {
        nameInput.value = "";
        emailInput.value = "";
      }
    });
  }

  renderBoard();
  bindForm();
})();
