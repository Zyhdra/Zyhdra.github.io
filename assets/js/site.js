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

// Grad: tap a print to hold it up close; arrows, keys, a swipe, or tapping either side of the photo move through the set.
const viewer = document.querySelector("[data-viewer]");
const shots = [...document.querySelectorAll(".table .shot")];
if (viewer && shots.length) {
  const print = viewer.querySelector("[data-viewer-print]");
  const img = viewer.querySelector(".viewer__img");
  const count = viewer.querySelector("[data-viewer-count]");
  const caption = viewer.querySelector("[data-viewer-caption]");
  const fullBtn = viewer.querySelector("[data-viewer-full]");
  const canFull = document.fullscreenEnabled;
  const html = document.documentElement;
  const wrap = (i) => (i + shots.length) % shots.length;
  // "Steven smiling under the arch" reads better on its own as "Smiling under the arch"
  const describe = (alt) => { const t = alt.replace(/^Steven /, ""); return t.charAt(0).toUpperCase() + t.slice(1) + "."; };
  let at = 0;
  let token = 0;
  let keepOpen = false;

  const paint = (i) => {
    const s = shots[i];
    img.src = s.dataset.full;
    img.width = s.dataset.w;
    img.height = s.dataset.h;
    img.alt = s.querySelector("img").alt;
    caption.textContent = describe(img.alt);
    count.textContent = i + 1;
    [i + 1, i - 1].forEach((n) => { new Image().src = shots[wrap(n)].dataset.full; });
  };
  // Slide the current print out, swap it once the next photo has loaded, then bring it back in
  const go = (i, dir) => {
    at = wrap(i);
    const mine = ++token;
    print.style.setProperty("--dx", `${dir * -24}px`);
    print.classList.add("is-leaving");
    const next = new Image();
    next.src = shots[at].dataset.full;
    const swap = () => {
      if (mine !== token) return;
      paint(at);
      print.style.setProperty("--dx", `${dir * 24}px`);
      requestAnimationFrame(() => print.classList.remove("is-leaving"));
    };
    Promise.all([next.decode().catch(() => {}), new Promise((r) => setTimeout(r, 180))]).then(swap);
  };
  const open = (i) => {
    at = i;
    paint(i);
    print.classList.remove("is-leaving");
    print.style.setProperty("--tilt", getComputedStyle(shots[i].closest(".print")).getPropertyValue("--t") || "0deg");
    html.classList.add("is-viewing");
    viewer.showModal();
    if (canFull) viewer.requestFullscreen().catch(() => {});
  };
  const close = () => viewer.close();

  shots.forEach((s, i) => s.addEventListener("click", () => open(i)));
  viewer.querySelector("[data-viewer-prev]").addEventListener("click", () => go(at - 1, -1));
  viewer.querySelector("[data-viewer-next]").addEventListener("click", () => go(at + 1, 1));
  viewer.querySelector("[data-viewer-close]").addEventListener("click", close);
  // Tapping the left or right part of the photo flips back or forward; tapping the empty table closes
  viewer.querySelector("[data-viewer-stage]").addEventListener("click", (e) => {
    if (!print.contains(e.target)) return close();
    const r = print.getBoundingClientRect();
    if (e.clientX < r.left + r.width / 2) go(at - 1, -1);
    else go(at + 1, 1);
  });
  viewer.addEventListener("close", () => {
    html.classList.remove("is-viewing");
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    shots[at].focus({ preventScroll: true });
  });
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && viewer.open && !keepOpen) close();
    keepOpen = false;
  });
  viewer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(at + 1, 1);
    if (e.key === "ArrowLeft") go(at - 1, -1);
  });
  // Nothing inside the viewer scrolls; the wheel flips photos instead
  let wheelAt = 0;
  viewer.addEventListener("wheel", (e) => {
    e.preventDefault();
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(d) < 12 || Date.now() - wheelAt < 450) return;
    wheelAt = Date.now();
    go(at + (d > 0 ? 1 : -1), d > 0 ? 1 : -1);
  }, { passive: false });
  viewer.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
  if (!canFull) fullBtn.hidden = true;
  fullBtn.addEventListener("click", () => {
    if (document.fullscreenElement) { keepOpen = true; document.exitFullscreen().catch(() => {}); }
    else viewer.requestFullscreen().catch(() => {});
  });
  let x0 = null;
  viewer.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) go(at + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    x0 = null;
  });
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
