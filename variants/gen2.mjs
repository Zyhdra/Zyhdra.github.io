// Round 3: recolors of the three favorites + six new interactive layouts.
import { readFileSync, writeFileSync } from "node:fs";

const here = (f) => new URL(f, import.meta.url);

// ── Recolors: swap the :root palette (and title) of a generated favorite ──
const recolor = (src, file, title, vars) => {
  let html = readFileSync(here(src), "utf8");
  html = html.replace(/:root \{[^}]*\}/, `:root { ${vars} }`).replace(/<title>[^<]*<\/title>/, `<title>${title} · Steven Kertes</title>`);
  writeFileSync(here(file), html);
};
recolor("f-behind-maroon.html", "f2-behind-saffron.html", "Name Behind · Ink & Saffron",
  "--bg: #eef0f3; --fg: #111827; --soft: #4b5563; --accent: #e0a100;");
recolor("f-behind-maroon.html", "f3-behind-nightteal.html", "Name Behind · Night Teal",
  "--bg: #0e2a2f; --fg: #eaf4f2; --soft: #a9c4c0; --accent: #ff8a65;");
recolor("l-index-orange.html", "l2-index-cobalt.html", "Big Index · Mono & Cobalt",
  "--bg: #fafafa; --fg: #0b0b0b; --soft: #5c5c5c; --accent: #2541ff; --blue: #2541ff; --line: #dedede; --dim: #c4c4c4;");
recolor("l-index-orange.html", "l3-index-burgundy.html", "Big Index · Burgundy & Blush",
  "--bg: #f7ecec; --fg: #3a0e18; --soft: #7a4a55; --accent: #b3123a; --blue: #b3123a; --line: #e6cfd2; --dim: #d9b8bd;");
recolor("m-card-lavender.html", "m2-card-mint.html", "Business Card · Mint & Forest",
  "--bg: #e3f0e9; --fg: #12352a; --soft: #4a6a5e; --accent: #1f8a5b; --card: #fbfdfc; --shadow: 18 53 42;");
recolor("m-card-lavender.html", "m3-card-steel.html", "Business Card · Steel & Rust",
  "--bg: #e3e7ee; --fg: #14233f; --soft: #4d5a73; --accent: #c4572a; --card: #fff; --shadow: 20 35 63;");

// ── New layouts ──
const ALT = "Steven at Texas State in his graduation stole, holding a Herald-Zeitung front page about his esports career";
const LEDE = "Engineer and founder. I build software end to end, from the first conversation with a user to the shipped app, and I'm looking for full-time roles in software, AI, solutions, and product engineering.";
const WHERE = "New Braunfels, TX · Austin &amp; San Antonio · Open to relocation &amp; remote";
const SCHOOL = "Texas State University · B.S. Computer Science, Minor in Mathematics";
const NAV = `<a href="#" aria-current="page">About</a><a href="#">Experience</a><a href="#">Projects</a><a href="#">Personal</a>`;
const ARROW = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7M8 7h9v9"/></svg>`;
const LINKS = ["Email me", "LinkedIn", "GitHub", "Inductiv"].map((t) => `<a href="#">${t} ${ARROW}</a>`).join("");
const IMG = {
  portrait: `../assets/img/me/portrait.jpg`,
  wide: `../assets/img/me/grad-full.jpg`,
  card: `../assets/img/personal/rl-player-card.jpg`,
  award: `../assets/img/personal/rl-sportsmanship.jpg`,
  phone: `../assets/img/inductiv/inductiv-schedule.png`,
  meow: `../assets/img/meownvelope/logo.png`,
};

const page = (title, vars, css, body, js = "") => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} · Steven Kertes</title>
<link rel="stylesheet" href="shared.css">
<style>
  :root { ${vars} }
  img { display: block; max-width: 100%; }
${css}
</style>
</head>
<body>
${body}
${js ? `<script>${js}</script>` : ""}
</body>
</html>
`;

const pages = [
  {
    // Name behind, but the name is a slow marquee
    file: "o-marquee-navy.html", title: "Marquee",
    vars: "--bg: #e9edf4; --fg: #13213d; --soft: #4f5b74; --accent: #2b59c3; --warm: #c46a3a;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; overflow: hidden; }
  header { display: flex; justify-content: space-between; padding: 24px clamp(16px, 4vw, 64px); } header nav { display: flex; gap: 26px; } nav a[aria-current] { color: var(--accent); }
  .stage { position: relative; display: grid; place-items: center; }
  .track { position: absolute; top: 50%; translate: 0 -50%; display: flex; white-space: nowrap; animation: slide 38s linear infinite; }
  .track span { font-family: "League Gothic"; text-transform: uppercase; font-size: clamp(9rem, 26vw, 26rem); line-height: 0.8; padding-right: 0.25em; color: var(--accent); }
  .track span:nth-child(even) { color: transparent; -webkit-text-stroke: 2px var(--accent); }
  .stage:hover .track { animation-play-state: paused; }
  @keyframes slide { to { transform: translateX(-50%); } }
  .stage figure { position: relative; margin: 0; width: min(330px, 62vw); aspect-ratio: 4/5; border-radius: 6px; overflow: hidden; box-shadow: 0 40px 60px -30px rgb(0 0 0 / .45); transition: rotate .6s cubic-bezier(.16,1,.3,1); }
  .stage figure:hover { rotate: -2deg; } .stage figure img { width: 100%; height: 100%; object-fit: cover; }
  .bottom { display: grid; grid-template-columns: 1fr auto; gap: 20px 48px; padding: 28px clamp(16px, 4vw, 64px) 34px; align-items: end; }
  .bottom p { max-width: 46ch; color: var(--soft); } .bottom .label { color: var(--warm); margin-top: 10px; }
  .links { display: flex; gap: 22px; flex-wrap: wrap; } .links a { display: inline-flex; gap: 6px; font-weight: 600; } .links a:hover { color: var(--accent); }
  @media (max-width: 760px) { .bottom { grid-template-columns: 1fr; } header { flex-wrap: wrap; gap: 10px; } header nav { gap: 14px; flex-wrap: wrap; } }
  @media (prefers-reduced-motion: reduce) { .track { animation: none; } }`,
    body: `<div class="wrap">
  <header class="label rise"><strong>Steven Kertes</strong><nav>${NAV}</nav></header>
  <div class="stage"><div class="track" aria-hidden="true">${"<span>Steven</span><span>Kertes</span>".repeat(4)}</div>
    <figure class="rise d1"><img src="${IMG.portrait}" alt="${ALT}"></figure></div>
  <div class="bottom rise d2"><div><h1 class="sr-only">Steven Kertes</h1><p>${LEDE}</p><p class="label">${WHERE}</p></div><div class="links">${LINKS}</div></div>
</div>`,
  },
  {
    // Big index on the left, the picture on the right changes with the row you hover
    file: "p-index-preview.html", title: "Index + Preview",
    vars: "--bg: #f2f0ec; --fg: #1a1a1a; --soft: #5f5c57; --accent: #3355ff; --line: #d9d5ce;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-columns: 1.15fr 1fr; gap: 0 clamp(24px, 4vw, 64px); padding: 0 clamp(16px, 4vw, 64px); }
  header { grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: baseline; padding: 24px 0; gap: 16px; flex-wrap: wrap; }
  header b span { color: var(--accent); }
  .left { display: flex; flex-direction: column; justify-content: center; gap: 28px; }
  .left p { color: var(--soft); max-width: 44ch; }
  .rows a { display: grid; grid-template-columns: 1fr auto; align-items: baseline; border-top: 1px solid var(--line); padding: 4px 0;
    font-family: "League Gothic"; text-transform: uppercase; font-size: clamp(3.2rem, 7.4vw, 7rem); line-height: 1; transition: color .3s, padding .5s cubic-bezier(.16,1,.3,1); }
  .rows a:last-child { border-bottom: 1px solid var(--line); }
  .rows a small { font-family: "Archivo"; text-transform: none; font-size: .9rem; color: var(--soft); }
  .rows:has(a:hover) a:not(:hover) { color: #c2bdb4; } .rows a:hover, .rows a.on { padding-left: 14px; color: var(--accent); }
  .right { position: relative; align-self: center; height: min(72vh, 680px); border-radius: 10px; overflow: hidden; background: #1a1a1a; }
  .right img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; scale: 1.04; transition: opacity .5s, scale .8s cubic-bezier(.16,1,.3,1); }
  .right img.contain { object-fit: contain; padding: 8%; background: #1a1a1a; }
  .right img.on { opacity: 1; scale: 1; }
  .right figcaption { position: absolute; left: 16px; bottom: 14px; color: #fff; z-index: 2; text-shadow: 0 1px 8px rgb(0 0 0 / .6); }
  footer { grid-column: 1 / -1; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 14px; padding: 22px 0; color: var(--soft); }
  footer .links { display: flex; gap: 20px; flex-wrap: wrap; } footer .links a { display: inline-flex; gap: 6px; color: var(--fg); font-weight: 600; }
  @media (max-width: 860px) { .wrap { grid-template-columns: 1fr; } .right { height: 60vh; margin-top: 24px; } }`,
    body: `<div class="wrap">
  <header class="label rise"><b>Steven Kertes<span>.</span></b><span>Class of December 2026</span></header>
  <div class="left"><p class="rise">${LEDE}</p>
    <nav class="rows rise d1"><a href="#" data-k="0" class="on">About <small>Who I am</small></a><a href="#" data-k="1">Experience <small>4 roles</small></a><a href="#" data-k="2">Projects <small>Inductiv · Meownvelope</small></a><a href="#" data-k="3">Personal <small>Piano · Rocket League · dogs</small></a></nav></div>
  <figure class="right rise d2" style="margin:0">
    <img class="on" src="${IMG.portrait}" alt="${ALT}"><img class="contain" src="${IMG.phone}" alt="Inductiv app schedule screen"><img class="contain" src="${IMG.phone}" alt="Inductiv app"><img src="${IMG.card}" alt="Steven's Rocket League player card">
    <figcaption class="label" id="cap">That's me</figcaption></figure>
  <footer class="label rise d3"><span>${WHERE}</span><div class="links">${LINKS}</div></footer>
</div>`,
    js: `const caps=["That's me","Founder of Inductiv","Inductiv, my startup","Zyhdra, GC1 · Vipers"];const imgs=[...document.querySelectorAll(".right img")];document.querySelectorAll(".rows a").forEach(a=>a.addEventListener("mouseenter",()=>{const k=+a.dataset.k;imgs.forEach((im,i)=>im.classList.toggle("on",i===k));document.querySelectorAll(".rows a").forEach(x=>x.classList.toggle("on",x===a));document.getElementById("cap").textContent=caps[k];}));`,
  },
  {
    // A fan of cards; hover spreads them
    file: "q-deck-sky.html", title: "Card Deck",
    vars: "--bg: #e6eef7; --fg: #102542; --soft: #4b5f7a; --accent: #1e6fd9; --c2: #f0b429; --c3: #102542;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-columns: 1fr 1.1fr; align-items: center; gap: 32px; padding: 0 clamp(16px, 5vw, 80px); }
  header { position: absolute; top: 0; left: 0; right: 0; display: flex; justify-content: space-between; padding: 24px clamp(16px, 5vw, 80px); } header nav { display: flex; gap: 24px; } nav a[aria-current] { color: var(--accent); }
  h1 { font-weight: 750; font-size: clamp(3rem, 6.4vw, 6rem); line-height: 0.92; letter-spacing: -0.04em; } h1 span { color: var(--accent); }
  .txt p { color: var(--soft); max-width: 40ch; margin-top: 22px; } .txt .label { color: var(--accent); }
  .links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 28px; } .links a { display: inline-flex; gap: 8px; align-items: center; padding: 11px 18px; border-radius: 999px; background: var(--fg); color: var(--bg); font-weight: 600; transition: background .3s; } .links a:hover { background: var(--accent); }
  .deck { position: relative; height: min(70vh, 600px); display: grid; place-items: center; }
  .c { position: absolute; width: min(300px, 40vw); aspect-ratio: 4/5; border-radius: 16px; overflow: hidden; box-shadow: 0 30px 50px -24px rgb(16 37 66 / .5); transition: transform .8s cubic-bezier(.16,1,.3,1); background: #fff; }
  .c img { width: 100%; height: 100%; object-fit: cover; }
  .c.t { background: var(--c2); padding: 24px; display: flex; flex-direction: column; justify-content: space-between; color: var(--c3); }
  .c.t b { font-family: "League Gothic"; font-weight: 400; text-transform: uppercase; font-size: 3.2rem; line-height: .9; }
  .c1 { transform: rotate(-9deg) translateX(-40px); } .c2 { transform: rotate(6deg) translateX(36px); } .c3 { transform: rotate(-1deg); }
  .deck:hover .c1 { transform: rotate(-16deg) translate(-170px, 10px); } .deck:hover .c2 { transform: rotate(14deg) translate(170px, 10px); } .deck:hover .c3 { transform: rotate(0) translateY(-18px); }
  @media (max-width: 860px) { .wrap { grid-template-columns: 1fr; padding-top: 110px; } .deck:hover .c1 { transform: rotate(-12deg) translate(-70px); } .deck:hover .c2 { transform: rotate(10deg) translate(70px); } }`,
    body: `<header class="label rise"><strong>Steven Kertes</strong><nav>${NAV}</nav></header>
<div class="wrap">
  <div class="txt"><p class="label rise">Class of December 2026</p><h1 class="rise d1">Steven<br>Kertes<span>.</span></h1><p class="rise d2">${LEDE}</p><div class="links rise d3">${LINKS}</div></div>
  <div class="deck rise d2" tabindex="0" aria-label="Hover to fan out the cards">
    <div class="c c1"><img src="${IMG.card}" alt="Steven's Rocket League player card" style="object-position:22% 30%"></div>
    <div class="c c2 t"><span class="label">Founder</span><b>Building<br>Inductiv</b><span class="label">Clinical tracking for nurse anesthesia programs</span></div>
    <div class="c c3"><img src="${IMG.portrait}" alt="${ALT}"></div>
  </div>
</div>`,
  },
  {
    // The name is cut out of the photo
    file: "r-cutout-ink.html", title: "Photo Cutout",
    vars: "--bg: #f1efe9; --fg: #161616; --soft: #5b5850; --accent: #7a1f2b;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; padding: 0 clamp(16px, 4vw, 64px); }
  header { display: flex; justify-content: space-between; padding: 24px 0; } header nav { display: flex; gap: 26px; } nav a[aria-current] { color: var(--accent); }
  h1 { align-self: center; font-family: "League Gothic"; font-weight: 400; text-transform: uppercase; font-size: clamp(7rem, 24vw, 26rem); line-height: 0.82; letter-spacing: 0.005em;
    background: url(${IMG.wide}) 40% 38% / 120% auto; -webkit-background-clip: text; background-clip: text; color: transparent; transition: background-position 1.6s cubic-bezier(.16,1,.3,1); }
  h1:hover { background-position: 55% 30%; }
  .bottom { display: grid; grid-template-columns: 1.2fr 1fr auto; gap: 20px 48px; padding: 26px 0 34px; border-top: 1px solid #d7d2c6; }
  .bottom p { color: var(--soft); max-width: 44ch; } .bottom .label { color: var(--accent); }
  .links { display: flex; gap: 20px; flex-wrap: wrap; } .links a { display: inline-flex; gap: 6px; font-weight: 600; }
  @media (max-width: 860px) { .bottom { grid-template-columns: 1fr; } h1 { font-size: 34vw; } }`,
    body: `<div class="wrap">
  <header class="label rise"><strong>Steven Kertes</strong><nav>${NAV}</nav></header>
  <h1 class="rise d1">Steven<br>Kertes</h1>
  <div class="bottom rise d2"><p>${LEDE}</p><p class="label">${SCHOOL}<br>${WHERE}</p><div class="links">${LINKS}</div></div>
</div>`,
  },
  {
    // A conference badge on a lanyard that swings
    file: "s-badge-forest.html", title: "Lanyard Badge",
    vars: "--bg: #e7ece6; --fg: #17261d; --soft: #4f6155; --accent: #2f6b45; --strap: #2f6b45;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 32px; padding: 0 clamp(16px, 5vw, 80px); }
  header { position: absolute; top: 0; left: 0; right: 0; display: flex; justify-content: space-between; padding: 24px clamp(16px, 5vw, 80px); } header nav { display: flex; gap: 24px; } nav a[aria-current] { color: var(--accent); }
  .txt h1 { font-weight: 750; font-size: clamp(2.8rem, 5.6vw, 5.2rem); line-height: .95; letter-spacing: -0.04em; }
  .txt p { color: var(--soft); max-width: 42ch; margin-top: 22px; }
  .links { display: grid; margin-top: 28px; max-width: 26rem; } .links a { display: flex; justify-content: space-between; padding: 12px 0; border-top: 1px solid #c9d3ca; font-weight: 600; } .links a:hover { color: var(--accent); }
  .hang { justify-self: center; display: grid; justify-items: center; transform-origin: 50% 0; animation: swing 4.5s ease-in-out infinite; }
  .hang:hover { animation-duration: 1.4s; }
  @keyframes swing { 0%, 100% { rotate: -3deg; } 50% { rotate: 3deg; } }
  .strap { width: 34px; height: 16vh; background: repeating-linear-gradient(0deg, var(--strap) 0 14px, #3c8256 14px 16px); margin-top: 0; border-radius: 0 0 4px 4px; }
  .clip { width: 46px; height: 26px; border-radius: 6px; background: linear-gradient(#cfd6d1, #8e9a92); margin-top: -4px; }
  .badge { width: min(320px, 70vw); background: #fff; border-radius: 18px; padding: 18px; margin-top: -6px; box-shadow: 0 30px 50px -24px rgb(23 38 29 / .5); }
  .badge .hole { width: 56px; height: 10px; border-radius: 999px; background: var(--bg); margin: 0 auto 14px; }
  .badge img { width: 100%; aspect-ratio: 1; object-fit: cover; object-position: 45% 20%; border-radius: 10px; }
  .badge h2 { font-size: 1.7rem; font-weight: 750; letter-spacing: -0.02em; margin-top: 14px; }
  .badge .role { color: var(--accent); margin-top: 4px; } .badge .bar { margin-top: 16px; padding: 10px 12px; border-radius: 8px; background: var(--accent); color: #fff; display: flex; justify-content: space-between; }
  @media (max-width: 860px) { .wrap { grid-template-columns: 1fr; padding-top: 90px; } .hang { order: -1; } .strap { height: 12vh; margin-top: 0; } }
  @media (prefers-reduced-motion: reduce) { .hang { animation: none; } }`,
    body: `<header class="label rise"><strong>Steven Kertes</strong><nav>${NAV}</nav></header>
<div class="wrap">
  <div class="txt"><h1 class="rise">Hi, I'm Steven.</h1><p class="rise d1">${LEDE}</p><p class="label rise d2" style="color:var(--accent)">${WHERE}</p><div class="links rise d3">${LINKS}</div></div>
  <div class="hang rise d1"><div class="strap"></div><div class="clip"></div>
    <div class="badge"><div class="hole"></div><img src="${IMG.portrait}" alt="${ALT}"><h2>Steven Kertes</h2><p class="role label">Engineer · Founder</p><p style="color:var(--soft);font-size:.9rem;margin-top:6px">Texas State · CS + Math · Dec 2026</p><div class="bar label"><span>Inductiv</span><span>Hire me</span></div></div></div>
</div>`,
  },
  {
    // A stack of prints you click through
    file: "t-prints-rust.html", title: "Photo Stack",
    vars: "--bg: #efe9e4; --fg: #2a1d16; --soft: #6a574b; --accent: #b4532a; --navy: #1e3358;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-columns: 1.05fr 1fr; align-items: center; gap: 32px; padding: 0 clamp(16px, 5vw, 80px); }
  header { position: absolute; top: 0; left: 0; right: 0; display: flex; justify-content: space-between; padding: 24px clamp(16px, 5vw, 80px); } header nav { display: flex; gap: 24px; } nav a[aria-current] { color: var(--accent); }
  h1 { font-family: "League Gothic"; font-weight: 400; text-transform: uppercase; font-size: clamp(5rem, 11vw, 10rem); line-height: .84; color: var(--navy); } h1 span { color: var(--accent); }
  .txt p { color: var(--soft); max-width: 42ch; margin-top: 20px; }
  .links { display: flex; gap: 22px; flex-wrap: wrap; margin-top: 26px; } .links a { display: inline-flex; gap: 6px; font-weight: 600; border-bottom: 2px solid var(--accent); padding-bottom: 2px; }
  .stack { position: relative; height: min(72vh, 620px); cursor: pointer; }
  .print { position: absolute; left: 50%; top: 50%; width: min(330px, 70vw); background: #fff; padding: 12px 12px 46px; box-shadow: 0 24px 40px -22px rgb(42 29 22 / .55); translate: -50% -50%; transition: transform .7s cubic-bezier(.16,1,.3,1), z-index 0s .35s; }
  .print img { width: 100%; aspect-ratio: 4/5; object-fit: cover; }
  .print figcaption { position: absolute; left: 14px; bottom: 14px; color: var(--soft); }
  .hint { position: absolute; bottom: 0; width: 100%; text-align: center; color: var(--soft); }
  @media (max-width: 860px) { .wrap { grid-template-columns: 1fr; padding-top: 100px; } .stack { height: 520px; } }`,
    body: `<header class="label rise"><strong>Steven Kertes</strong><nav>${NAV}</nav></header>
<div class="wrap">
  <div class="txt"><p class="label rise" style="color:var(--accent);margin:0">Class of December 2026</p><h1 class="rise d1">Steven<br><span>Kertes</span></h1><p class="rise d2">${LEDE}</p><div class="links rise d3">${LINKS}</div></div>
  <div class="stack rise d2" id="stack" tabindex="0" aria-label="Click to shuffle photos">
    <figure class="print" style="margin:0"><img src="${IMG.award}" alt="Sportsmanship Award screen"><figcaption class="label">Sportsmanship Award</figcaption></figure>
    <figure class="print" style="margin:0"><img src="${IMG.card}" alt="Rocket League player card" style="object-position:22% 30%"><figcaption class="label">Zyhdra · GC1</figcaption></figure>
    <figure class="print" style="margin:0"><img src="${IMG.portrait}" alt="${ALT}"><figcaption class="label">Texas State, Class of '26</figcaption></figure>
    <p class="hint label">Click to shuffle</p>
  </div>
</div>`,
    js: `const st=document.getElementById("stack");let order=[...st.querySelectorAll(".print")];const tilt=[-7,5,-1];const lay=()=>order.forEach((p,i)=>{p.style.zIndex=i;p.style.transform="rotate("+tilt[i]+"deg) translate("+(i-1)*14+"px,"+(1-i)*6+"px)";});lay();const next=()=>{const top=order.pop();top.style.transform="rotate(14deg) translate(240px,-20px)";setTimeout(()=>{order.unshift(top);lay();},320);};st.addEventListener("click",next);st.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();next();}});`,
  },
];

for (const p of pages) writeFileSync(here(p.file), page(p.title, p.vars, p.css, p.body, p.js));
console.log("ok");
