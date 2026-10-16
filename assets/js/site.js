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

// Grad: lay the photos into even rows, scroll them sideways, tap one for full screen.
const gallery = document.querySelector("[data-gallery]");
const viewer = document.querySelector("[data-viewer]");
const collage = document.querySelector("[data-collage]");
if (gallery && viewer && collage) {
  const shots = [...gallery.querySelectorAll(".shot")];
  const ratio = (s) => { const [w, h] = s.style.getPropertyValue("--ar").split("/").map(Number); return w / h; };
  let rowsNow = 0;
  const lay = () => {
    const rows = parseInt(getComputedStyle(collage).getPropertyValue("--rows"), 10) || 3;
    // Fill the visible height on desktop; phones size the strip in CSS
    if (getComputedStyle(collage).flexDirection === "row") {
      collage.style.setProperty("--collage-h", `${Math.max(420, innerHeight - collage.getBoundingClientRect().top - 24 - scrollY)}px`);
    }
    if (rows === rowsNow) return;
    rowsNow = rows;
    // Each photo goes to whichever row is shortest so far, so the rows end close together
    const lines = Array.from({ length: rows }, () => ({ el: Object.assign(document.createElement("div"), { className: "collage__row" }), w: 0 }));
    // Step through the set seven at a time so look-alike frames from the same spot don't stack together
    const spread = shots.map((s, i) => [s, (i * 7) % shots.length]).sort((a, b) => a[1] - b[1]).map(([s]) => s);
    spread.forEach((s) => {
      const line = lines.reduce((m, l) => (l.w < m.w ? l : m));
      line.el.append(s);
      line.w += ratio(s);
    });
    gallery.replaceChildren(...lines.map((l) => l.el));
    gallery.classList.add("is-laid");
  };
  lay();
  addEventListener("resize", lay);

  // A mouse wheel scrolls the collage sideways until it reaches an end, then the page scrolls as usual
  const scroller = () => (getComputedStyle(collage).flexDirection === "row" ? collage : gallery);
  collage.addEventListener("wheel", (e) => {
    const el = scroller();
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const max = el.scrollWidth - el.clientWidth;
    if ((e.deltaY > 0 && el.scrollLeft < max - 1) || (e.deltaY < 0 && el.scrollLeft > 0)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  const img = viewer.querySelector(".viewer__img");
  const count = viewer.querySelector("[data-viewer-count]");
  const fullBtn = viewer.querySelector("[data-viewer-full]");
  const canFull = document.fullscreenEnabled;
  let at = 0;
  const show = (i) => {
    at = (i + shots.length) % shots.length;
    const s = shots[at];
    img.classList.add("is-loading");
    img.onload = () => img.classList.remove("is-loading");
    img.src = s.dataset.full;
    img.width = s.dataset.w;
    img.height = s.dataset.h;
    img.alt = s.querySelector("img").alt;
    count.textContent = at + 1;
    // Warm the neighbours so the next tap is instant
    [at + 1, at - 1].forEach((n) => { new Image().src = shots[(n + shots.length) % shots.length].dataset.full; });
  };
  const close = () => viewer.close();
  shots.forEach((s, i) => s.addEventListener("click", () => {
    show(i);
    viewer.showModal();
    // Go truly full screen where the browser allows it; iPhone Safari doesn't, and the viewer already fills the screen there
    if (canFull) viewer.requestFullscreen().catch(() => {});
  }));
  viewer.querySelector("[data-viewer-prev]").addEventListener("click", () => show(at - 1));
  viewer.querySelector("[data-viewer-next]").addEventListener("click", () => show(at + 1));
  viewer.querySelector("[data-viewer-close]").addEventListener("click", close);
  viewer.addEventListener("close", () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    shots[at].focus({ preventScroll: true });
  });
  // Leaving full screen with Esc also closes the viewer, so one key press gets you back to the collage
  let keepOpen = false;
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && viewer.open && !keepOpen) close();
    keepOpen = false;
  });
  viewer.addEventListener("click", (e) => { if (e.target === viewer) close(); });
  viewer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(at + 1);
    if (e.key === "ArrowLeft") show(at - 1);
  });
  // The corner button toggles full screen while the viewer stays open
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
    if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
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
