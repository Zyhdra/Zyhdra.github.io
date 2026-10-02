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

// Light / dark mode. The head script already applied the saved or system choice.
const modeBtn = document.querySelector(".mode");
const root = document.documentElement;
const syncMode = () => {
  const dark = root.dataset.mode === "dark";
  modeBtn?.setAttribute("aria-pressed", String(dark));
};
modeBtn?.addEventListener("click", () => {
  root.dataset.mode = root.dataset.mode === "dark" ? "light" : "dark";
  try { localStorage.setItem("sk-mode", root.dataset.mode); } catch {}
  syncMode();
});
// Follow the system setting until the visitor picks one themselves.
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  let saved = null;
  try { saved = localStorage.getItem("sk-mode"); } catch {}
  if (!saved) { root.dataset.mode = e.matches ? "dark" : "light"; syncMode(); }
});
syncMode();
