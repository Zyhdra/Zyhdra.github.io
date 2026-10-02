// Small interactions only; every page works without this file.

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// The subject tilts toward the pointer and the giant word drifts the other way.
const stage = document.querySelector(".stage");
if (stage && !reduce && matchMedia("(pointer: fine)").matches) {
  const big = stage.querySelector(".big");
  const subject = stage.querySelector(".subject");
  stage.addEventListener("pointermove", (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    subject.style.setProperty("--rx", `${x * 10}deg`);
    subject.style.setProperty("--ry", `${-y * 8}deg`);
    big.style.setProperty("--px", `${-x * 36}px`);
  });
  stage.addEventListener("pointerleave", () => {
    subject.style.setProperty("--rx", "0deg");
    subject.style.setProperty("--ry", "0deg");
    big.style.setProperty("--px", "0px");
  });
}

// Projects: switch the Inductiv phone between screens.
const screen = document.getElementById("phone-screen");
if (screen) {
  const shots = screen.querySelectorAll("img[data-screen]");
  const pills = document.querySelectorAll(".screen-picker button");
  const show = (name) => {
    shots.forEach((img) => img.classList.toggle("is-on", img.dataset.screen === name));
    pills.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.go === name)));
  };
  document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => show(b.dataset.go)));
}

// Personal: only one piano clip plays at a time.
const clips = document.querySelectorAll(".clip video");
clips.forEach((v) => v.addEventListener("play", () => clips.forEach((o) => o !== v && o.pause())));

// Personal: the dog deck. Tap the top card (or Next) to send it to the back.
const deck = document.querySelector("[data-deck]");
if (deck) {
  const order = [...deck.querySelectorAll(".deck__card")];
  const count = deck.querySelector("[data-deck-count]");
  const tilt = [-2.5, 3, -4, 1.5, 4.5, -1, 2.5, -3.5, 0.5];
  order.forEach((c, i) => c.style.setProperty("--r", `${tilt[i % tilt.length]}deg`));
  let seen = 1;
  const layout = () => {
    order.forEach((c, depth) => {
      c.style.setProperty("--d", Math.min(depth, 3));
      c.classList.toggle("is-top", depth === 0);
      c.classList.toggle("is-hidden", depth > 2);
      // A card still flying off keeps its place on top until it lands at the back.
      if (!c.classList.contains("is-flung")) c.style.zIndex = order.length - depth;
    });
  };
  const next = () => {
    const top = order.shift();
    order.push(top);
    seen = (seen % order.length) + 1;
    count.textContent = seen;
    if (!reduce) {
      top.classList.add("is-flung");
      top.style.zIndex = order.length + 1;
      setTimeout(() => {
        top.classList.remove("is-flung");
        layout();
      }, 400);
    }
    layout();
  };
  deck.querySelector("[data-deck-next]").addEventListener("click", next);
  deck.querySelector(".deck__cards").addEventListener("click", (e) => {
    if (e.target.closest(".is-top")) next();
  });
  layout();
}

// Temporary color picker, used to choose a palette. Delete once one is picked.
const THEMES = [
  ["cobalt", "Cobalt", "#f3f1ee", "#2546a8"],
  ["navy-maroon", "Navy & Maroon", "#f4f1ef", "#1b3a7a"],
  ["electric", "Electric Blue", "#fafafa", "#2541ff"],
  ["sky", "Sky", "#edf3fa", "#2f7de1"],
  ["royal-stone", "Royal & Stone", "#e9e4dc", "#233d9b"],
  ["powder", "Powder & Navy", "#dfe8f3", "#1d3c78"],
  ["petrol", "Petrol Blue", "#f0f4f3", "#1f6f99"],
  ["blush", "Blue on Blush", "#f6ecea", "#2b4cc4"],
  ["denim", "Denim", "#e6e9ee", "#3a5f9f"],
  ["midnight", "Midnight", "#0d1b33", "#4f8cff"],
  ["maroon", "Texas State Maroon", "#f4efec", "#7a1f2b", 1],
  ["gold", "Stole Gold & Navy", "#f3f0ea", "#a8741a", 1],
  ["forest", "Forest Green", "#eef1ec", "#2f5d3a", 1],
  ["orange", "Vipers Orange", "#f6f2ee", "#d9541e", 1],
  ["terracotta", "Terracotta", "#f3ece6", "#b5542f", 1],
  ["plum", "Plum", "#f4eff4", "#5b2a6e", 1],
  ["crimson", "Crimson", "#f7f3f2", "#b3123a", 1],
  ["olive", "Olive", "#efefe6", "#5e6b2f", 1],
  ["charcoal", "Charcoal & Red", "#f2f2f0", "#1f1f1f", 1],
  ["espresso", "Espresso", "#241912", "#e0a46a", 1],
];
const picker = document.createElement("div");
picker.className = "picker";
picker.innerHTML = `<span class="picker__name"></span><div class="picker__row"></div><div class="picker__row"></div>`;
const nameEl = picker.querySelector(".picker__name");
const [rowBlue, rowOther] = picker.querySelectorAll(".picker__row");
const row = picker;
const setTheme = (id) => {
  document.documentElement.dataset.theme = id;
  try { localStorage.setItem("sk-theme", id); } catch {}
  const t = THEMES.find((x) => x[0] === id) || THEMES[0];
  nameEl.textContent = `Colors: ${t[1]}`;
  row.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === id)));
};
THEMES.forEach(([id, name, a, b, other]) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.dataset.id = id;
  btn.title = name;
  btn.setAttribute("aria-label", name);
  btn.style.setProperty("--a", a);
  btn.style.setProperty("--b", b);
  btn.addEventListener("click", () => setTheme(id));
  (other ? rowOther : rowBlue).appendChild(btn);
});
document.body.appendChild(picker);
setTheme(document.documentElement.dataset.theme || "maroon");
