// Small interactions only; every page works without this file.

// Cover: the record spins while you hover it, or on click/tap.
const record = document.getElementById("record");
if (record) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let pinned = false;
  const set = (on) => {
    if (reduce.matches) return;
    // Let the slide-in finish before the spin takes over the transform.
    if (on && record.getAnimations().some((a) => a.animationName === "record-in" && a.playState === "running")) return;
    record.classList.toggle("is-spinning", on || pinned);
  };
  record.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && set(true));
  record.addEventListener("pointerleave", (e) => e.pointerType === "mouse" && set(false));
  record.addEventListener("click", () => {
    pinned = !pinned;
    set(pinned);
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
