// Generates ten home-page variants (layout x palette) into this folder.
import { writeFileSync } from "node:fs";

const ALT = "Steven at Texas State in his graduation stole, holding a Herald-Zeitung front page about his esports career";
const LEDE = "Engineer and founder. I build software end to end, from the first conversation with a user to the shipped app, and I'm looking for full-time roles in software, AI, solutions, and product engineering.";
const SCHOOL = "Texas State University · B.S. Computer Science, Minor in Mathematics";
const WHERE = "New Braunfels, TX · Austin &amp; San Antonio · Open to relocation &amp; remote";
const NAV = `<a href="#" aria-current="page">About</a><a href="#">Experience</a><a href="#">Projects</a><a href="#">Personal</a>`;
const ARROW = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7M8 7h9v9"/></svg>`;
const LINKS = ["Email me", "LinkedIn", "GitHub", "Inductiv"].map((t) => `<a href="#">${t} ${ARROW}</a>`).join("");
const PORTRAIT = `<img src="../assets/img/me/portrait.jpg" alt="${ALT}" width="1000" height="1250">`;
const WIDE = `<img src="../assets/img/me/grad-full.jpg" alt="${ALT}" width="2400" height="1600">`;
const FACE = `<img src="../assets/img/me/face.jpg" alt="Steven Kertes" width="480" height="480">`;

const page = (title, vars, css, body) => `<!doctype html>
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
</body>
</html>
`;

const variants = [
  {
    file: "e-bento-sage.html", title: "Bento Sage",
    vars: "--bg: #e8ede8; --fg: #1d2722; --soft: #4d5c53; --accent: #557a5c; --tile: #f6f8f6; --rule: #cfd8d0;",
    css: `
  .grid { min-height: 100svh; padding: clamp(12px, 2vw, 24px); display: grid; gap: clamp(10px, 1.2vw, 16px);
    grid-template-columns: 1.2fr 1fr 1fr; grid-template-rows: auto 1fr 1fr; }
  .tile { background: var(--tile); border-radius: 18px; padding: clamp(20px, 2.4vw, 32px); }
  .top { grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; }
  .top nav { display: flex; gap: 24px; } .top nav a { color: var(--soft); } .top nav a[aria-current] { color: var(--accent); }
  .name { grid-row: 2 / 4; display: flex; flex-direction: column; justify-content: space-between; }
  .name h1 { font-weight: 750; font-size: clamp(3rem, 6vw, 5.5rem); line-height: 0.95; letter-spacing: -0.035em; }
  .name p { color: var(--soft); max-width: 34ch; font-size: 1.15rem; }
  .photo { grid-row: 2 / 4; padding: 0; overflow: hidden; } .photo img { width: 100%; height: 100%; object-fit: cover; }
  .meta { background: var(--accent); color: #f1f5f1; display: grid; align-content: end; gap: 6px; }
  .links { display: grid; align-content: end; } .links a { display: flex; justify-content: space-between; padding: 12px 0; border-top: 1px solid var(--rule); font-weight: 600; }
  .links a:hover { color: var(--accent); }
  @media (max-width: 860px) { .top { flex-wrap: wrap; gap: 10px; } .top nav { gap: 14px; flex-wrap: wrap; } .grid { grid-template-columns: 1fr; grid-template-rows: auto; } .name, .photo { grid-row: auto; } .photo { aspect-ratio: 4/5; } }`,
    body: `<div class="grid">
  <div class="tile top rise"><strong>Steven Kertes</strong><nav class="label">${NAV}</nav></div>
  <div class="tile name rise d1"><h1>Steven<br>Kertes</h1><p>${LEDE}</p></div>
  <div class="tile photo rise d2">${PORTRAIT}</div>
  <div class="tile meta label rise d3"><span>Class of Dec 2026</span><span>${SCHOOL}</span><span>${WHERE}</span></div>
  <div class="tile links rise d4">${LINKS}</div>
</div>`,
  },
  {
    file: "f-behind-maroon.html", title: "Name Behind",
    vars: "--bg: #f4f1ef; --fg: #1b2540; --soft: #545b70; --accent: #7a1f2b;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; padding: 0 clamp(16px, 4vw, 64px); overflow: hidden; }
  header { display: flex; justify-content: space-between; padding: 24px 0; } header nav { display: flex; gap: 26px; } nav a[aria-current] { color: var(--accent); }
  .stage { position: relative; display: grid; place-items: center; }
  .stage h1 { position: absolute; top: 4%; left: 50%; translate: -50% 0; white-space: nowrap; font-family: "League Gothic"; font-weight: 400; text-transform: uppercase;
    font-size: clamp(8rem, 23vw, 24rem); line-height: 0.8; color: var(--accent); letter-spacing: 0.01em; }
  .stage figure { position: relative; margin: 0; width: min(340px, 64vw); aspect-ratio: 4/5; margin-top: 6vw; box-shadow: 0 40px 60px -30px rgb(0 0 0 / .45); }
  .stage figure img { width: 100%; height: 100%; object-fit: cover; }
  .bottom { display: grid; grid-template-columns: 1fr auto; gap: 24px 48px; align-items: end; padding: 32px 0 36px; }
  .bottom p { max-width: 44ch; color: var(--soft); } .bottom .label { color: var(--accent); margin-top: 12px; }
  .links { display: flex; gap: 22px; flex-wrap: wrap; } .links a { display: inline-flex; gap: 6px; align-items: center; font-weight: 600; }
  @media (max-width: 760px) { .bottom { grid-template-columns: 1fr; } }`,
    body: `<div class="wrap">
  <header class="rise"><strong>Steven Kertes</strong><nav class="label">${NAV}</nav></header>
  <div class="stage"><h1 class="rise">Kertes</h1><figure class="rise d2">${PORTRAIT}</figure></div>
  <div class="bottom rise d3"><div><p>${LEDE}</p><p class="label">${WHERE}</p></div><div class="links">${LINKS}</div></div>
</div>`,
  },
  {
    file: "g-sidebar-teal.html", title: "Sidebar Teal",
    vars: "--bg: #eef5f5; --fg: #0f2e36; --soft: #48636a; --accent: #12808d; --side: #0f2e36;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-columns: minmax(260px, 340px) 1fr; }
  aside { background: var(--side); color: #e7f2f3; padding: 32px; display: flex; flex-direction: column; gap: 28px; }
  aside .face { width: 112px; height: 112px; border-radius: 50%; overflow: hidden; } aside .face img { width: 100%; height: 100%; object-fit: cover; }
  aside h1 { font-size: 1.9rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; } aside .label { color: #8fd3db; }
  aside nav { display: grid; gap: 4px; } aside nav a { padding: 8px 12px; border-radius: 8px; color: #b9d4d8; } aside nav a[aria-current] { background: rgb(255 255 255 / .1); color: #fff; }
  aside .links { margin-top: auto; display: grid; gap: 10px; } aside .links a { display: flex; justify-content: space-between; color: #e7f2f3; }
  main { padding: clamp(32px, 7vw, 120px); display: grid; align-content: center; gap: 28px; }
  main .big { font-size: clamp(2rem, 3.6vw, 3.4rem); line-height: 1.15; letter-spacing: -0.02em; font-weight: 550; max-width: 22ch; }
  main .big em { font-style: normal; color: var(--accent); }
  main .meta { color: var(--soft); display: grid; gap: 4px; }
  main .now { display: flex; gap: 16px; align-items: center; padding: 18px 22px; border-radius: 14px; background: #fff; max-width: 34rem; box-shadow: 0 1px 2px rgb(15 46 54 / .08); }
  main .now b { color: var(--accent); }
  @media (max-width: 820px) { .wrap { grid-template-columns: 1fr; } }`,
    body: `<div class="wrap">
  <aside class="rise"><div class="face">${FACE}</div><div><h1>Steven Kertes</h1><p class="label">Class of Dec 2026</p></div><nav class="label">${NAV}</nav><div class="links">${LINKS}</div></aside>
  <main><p class="big rise d1">I build software <em>end to end</em>, from the first conversation with a user to the shipped app.</p>
  <p class="rise d2" style="max-width:52ch;color:var(--soft)">Engineer and founder, looking for full-time roles in software, AI, solutions, and product engineering after I graduate in December.</p>
  <div class="meta label rise d3"><span>${SCHOOL}</span><span>${WHERE}</span></div>
  <div class="now rise d4"><span>Currently building</span> <b>Inductiv</b> <span style="color:var(--soft)">· clinical tracking for nurse anesthesia programs</span></div></main>
</div>`,
  },
  {
    file: "h-magazine-gold.html", title: "Magazine Cover",
    vars: "--bg: #0f2342; --fg: #f4f1ea; --soft: #d4dbe7; --accent: #e3b65b;",
    css: `
  .cover { position: relative; min-height: 100svh; overflow: hidden; display: grid; grid-template-rows: auto auto 1fr auto; padding: clamp(16px, 3vw, 44px); }
  .cover > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 38% 30%; z-index: -2; }
  .cover::before { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgb(15 35 66 / .92) 0%, rgb(15 35 66 / .55) 45%, rgb(15 35 66 / .1) 75%), linear-gradient(0deg, rgb(15 35 66 / .85), transparent 40%); }
  header { display: flex; justify-content: space-between; } header nav { display: flex; gap: 24px; } nav a { color: var(--soft); } nav a[aria-current] { color: var(--accent); }
  h1 { font-family: "League Gothic"; font-weight: 400; text-transform: uppercase; font-size: clamp(6rem, 16vw, 14rem); line-height: 0.82; margin-top: 2vh; letter-spacing: 0.01em; }
  h1 span { color: var(--accent); }
  .lines { align-self: end; display: grid; gap: 18px; max-width: 30rem; }
  .lines .hl { font-size: 1.35rem; line-height: 1.35; font-weight: 600; } .lines .hl b { color: var(--accent); font-weight: 600; }
  .foot { display: flex; justify-content: space-between; align-items: end; gap: 20px; flex-wrap: wrap; margin-top: 32px; padding-top: 18px; border-top: 1px solid rgb(244 241 234 / .25); }
  .foot .links { display: flex; gap: 22px; flex-wrap: wrap; } .foot .links a { display: inline-flex; gap: 6px; font-weight: 600; } .foot .label { color: var(--soft); }`,
    body: `<div class="cover">${WIDE}
  <header class="label rise"><span>Class of Dec 2026</span><nav>${NAV}</nav></header>
  <h1 class="rise d1">Steven<br><span>Kertes</span></h1>
  <div class="lines rise d2"><p class="hl"><b>Engineer &amp; founder.</b> Building Inductiv, a clinical tracking platform for nurse anesthesia programs.</p><p style="color:var(--soft)">${LEDE}</p></div>
  <div class="foot rise d3"><div class="links">${LINKS}</div><span class="label">${WHERE}</span></div>
</div>`,
  },
  {
    file: "i-frontpage-ink.html", title: "Front Page",
    vars: "--bg: #f7f6f2; --fg: #111; --soft: #444; --accent: #c8102e; --rule: #111;",
    css: `
  .paper { max-width: 1240px; margin: 0 auto; padding: 20px clamp(16px, 3vw, 40px) 40px; }
  .flag { display: flex; justify-content: space-between; border-bottom: 1px solid var(--rule); padding-bottom: 8px; }
  .mast { text-align: center; padding: 18px 0 12px; border-bottom: 4px double var(--rule); }
  .mast h1 { font-family: "League Gothic"; font-weight: 400; text-transform: uppercase; font-size: clamp(4rem, 11vw, 9rem); line-height: 0.9; letter-spacing: 0.02em; }
  .mast nav { display: flex; justify-content: center; gap: 28px; margin-top: 10px; } nav a[aria-current] { color: var(--accent); }
  .cols { display: grid; grid-template-columns: 1.1fr 1fr 0.9fr; gap: 0 28px; padding-top: 22px; }
  .cols > * { padding-right: 28px; border-right: 1px solid #bbb; } .cols > *:last-child { border: 0; padding: 0; }
  .head { font-family: "League Gothic"; text-transform: uppercase; font-size: clamp(2.4rem, 4vw, 3.6rem); line-height: 0.95; margin: 10px 0 12px; }
  .kick { color: var(--accent); }
  figure { margin: 0; } figure img { width: 100%; aspect-ratio: 4/5; object-fit: cover; filter: grayscale(.15) contrast(1.05); }
  figcaption { font-size: .85rem; color: var(--soft); margin-top: 6px; font-style: italic; }
  .body { color: var(--soft); columns: 1; }
  .links { display: grid; } .links a { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ccc; font-weight: 600; } .links a:hover { color: var(--accent); }
  @media (max-width: 860px) { .cols { grid-template-columns: 1fr; } .cols > * { border: 0; padding: 0 0 20px; } }`,
    body: `<div class="paper">
  <div class="flag label rise"><span>New Braunfels, Texas</span><span>Edition: Class of December 2026</span></div>
  <div class="mast rise d1"><h1>The Steven Kertes</h1><nav class="label">${NAV}</nav></div>
  <div class="cols">
    <article class="rise d2"><p class="label kick">Engineering · Startups</p><h2 class="head">Local founder builds clinical platform for nurse anesthesia programs</h2><p class="body">${LEDE} His startup, Inductiv, is in beta with two programs in Texas.</p></article>
    <figure class="rise d3">${PORTRAIT}<figcaption>Kertes at Texas State, holding the Herald-Zeitung story on his esports career.</figcaption></figure>
    <aside class="rise d4"><p class="label kick">Reach him</p><div class="links" style="margin-top:8px">${LINKS}</div><p class="label" style="margin-top:20px;color:var(--soft)">${SCHOOL}</p><p class="label" style="margin-top:8px;color:var(--soft)">${WHERE}</p></aside>
  </div>
</div>`,
  },
  {
    file: "j-inline-coral.html", title: "Inline Photo",
    vars: "--bg: #f4f4f2; --fg: #1f1f1f; --soft: #5a5a57; --accent: #e2583e;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; padding: 0 clamp(16px, 5vw, 80px); }
  header { display: flex; justify-content: space-between; padding: 26px 0; } header nav { display: flex; gap: 26px; } nav a[aria-current] { color: var(--accent); }
  h1 { align-self: center; font-weight: 650; font-size: clamp(2.6rem, 6.4vw, 6.2rem); line-height: 1.04; letter-spacing: -0.04em; max-width: 16ch; overflow-wrap: anywhere; }
  @media (max-width: 600px) { header { flex-wrap: wrap; gap: 10px; } header nav { gap: 14px; flex-wrap: wrap; } }
  h1 .pic { display: inline-block; width: 1.9em; height: 0.92em; border-radius: 999px; overflow: hidden; vertical-align: -0.1em; transition: width .6s cubic-bezier(.16,1,.3,1); }
  h1 .pic:hover { width: 2.6em; } h1 .pic img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 40%; }
  h1 em { font-style: normal; color: var(--accent); }
  .bottom { display: grid; grid-template-columns: 1.2fr 1fr auto; gap: 24px 48px; padding: 28px 0 36px; border-top: 1px solid #d9d9d5; align-items: start; }
  .bottom p { color: var(--soft); } .links { display: flex; gap: 20px; flex-wrap: wrap; } .links a { display: inline-flex; gap: 6px; font-weight: 600; } .links a:hover { color: var(--accent); }
  @media (max-width: 860px) { .bottom { grid-template-columns: 1fr; } }`,
    body: `<div class="wrap">
  <header class="rise"><strong>Steven Kertes</strong><nav class="label">${NAV}</nav></header>
  <h1 class="rise d1">Hi, I'm Steven <span class="pic">${FACE}</span>. I build software <em>end to end</em> and I'm graduating in December.</h1>
  <div class="bottom rise d2"><p>Engineer and founder of Inductiv. Looking for full-time roles in software, AI, solutions, and product engineering.</p><p class="label" style="color:var(--soft)">${SCHOOL}<br>${WHERE}</p><div class="links">${LINKS}</div></div>
</div>`,
  },
  {
    file: "k-band-plum.html", title: "Photo Band",
    vars: "--bg: #f6f2f6; --fg: #2a1630; --soft: #64506a; --accent: #b8862b;",
    css: `
  .band { position: relative; height: 56svh; min-height: 360px; overflow: hidden; }
  .band img { width: 100%; height: 100%; object-fit: cover; object-position: 40% 32%; }
  .band header { position: absolute; inset: 0 0 auto; display: flex; justify-content: space-between; padding: 24px clamp(16px, 5vw, 80px); color: #fff; background: linear-gradient(rgb(0 0 0 / .45), transparent); }
  .band nav { display: flex; gap: 24px; } .band nav a[aria-current] { color: var(--accent); }
  .info { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 32px 56px; padding: 40px clamp(16px, 5vw, 80px) 48px; }
  h1 { font-weight: 750; font-size: clamp(3rem, 6vw, 5.4rem); line-height: 0.92; letter-spacing: -0.04em; margin-top: -0.95em; background: var(--bg); padding: 14px 20px 0 0; display: inline-block; position: relative; }
  h1 span { color: var(--accent); }
  .col p { color: var(--soft); } .col .label { color: var(--accent); margin-bottom: 10px; }
  .links { display: grid; } .links a { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid #e2d6e3; font-weight: 600; }
  @media (max-width: 860px) { .info { grid-template-columns: 1fr; } }`,
    body: `<div class="band">${WIDE}<header class="label rise"><strong>Steven Kertes</strong><nav>${NAV}</nav></header></div>
<div class="info">
  <div class="rise d1"><h1>Steven<br>Kertes<span>.</span></h1></div>
  <div class="col rise d2"><p class="label">About</p><p>${LEDE}</p></div>
  <div class="col rise d3"><p class="label">${WHERE}</p><div class="links">${LINKS}</div></div>
</div>`,
  },
  {
    file: "l-index-orange.html", title: "Big Index",
    vars: "--bg: #eef1f6; --fg: #172036; --soft: #556078; --accent: #ff6a2b; --blue: #2b4bd6; --line: #cfd6e3; --dim: #b3bccd;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; padding: 0 clamp(16px, 5vw, 80px); position: relative; }
  header { display: flex; justify-content: space-between; align-items: center; padding: 24px 0; gap: 16px; flex-wrap: wrap; }
  header p { color: var(--soft); max-width: 46ch; }
  .index { align-self: center; display: grid; }
  .index a { position: relative; display: flex; align-items: baseline; justify-content: space-between; gap: 24px; border-top: 1px solid var(--line); padding: 6px 0;
    font-family: "League Gothic"; font-weight: 400; text-transform: uppercase; font-size: clamp(3.4rem, 9vw, 8rem); line-height: 1; transition: color .3s, padding .5s cubic-bezier(.16,1,.3,1); }
  .index a:last-child { border-bottom: 1px solid var(--line); }
  .index a small { font-family: "Archivo"; font-size: .9rem; text-transform: none; color: var(--soft); font-weight: 500; }
  .index a:hover { color: var(--blue); padding-left: 18px; } .index:has(a:hover) a:not(:hover) { color: var(--dim); }
  .peek { position: fixed; width: 240px; aspect-ratio: 4/5; right: 9vw; top: 50%; translate: 0 -50%; rotate: 4deg; border-radius: 6px; overflow: hidden; pointer-events: none; opacity: 0; scale: .9; transition: opacity .4s, scale .5s cubic-bezier(.16,1,.3,1); box-shadow: 0 30px 50px -20px rgb(0 0 0 / .4); }
  .peek img { width: 100%; height: 100%; object-fit: cover; }
  .index:has(a:first-child:hover) ~ .peek, .wrap:has(.who:hover) .peek { opacity: 1; scale: 1; }
  .who { font-weight: 700; } .who span { color: var(--accent); }
  footer { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding: 22px 0; color: var(--soft); }
  footer .links { display: flex; gap: 20px; } footer .links a { display: inline-flex; gap: 6px; font-weight: 600; color: var(--fg); } footer .links a:hover { color: var(--accent); }`,
    body: `<div class="wrap">
  <header class="rise"><span class="who">Steven Kertes<span>.</span></span><p>${LEDE}</p></header>
  <nav class="index rise d1"><a href="#">About <small>Who I am · hover me</small></a><a href="#">Experience <small>Inductiv, The Launch Box, BotStacks, Comal ISD</small></a><a href="#">Projects <small>Inductiv · Meownvelope</small></a><a href="#">Personal <small>Piano, Rocket League, nine dogs</small></a></nav>
  <div class="peek">${PORTRAIT}</div>
  <footer class="label rise d2"><span>${WHERE}</span><div class="links">${LINKS}</div></footer>
</div>`,
  },
  {
    file: "m-card-lavender.html", title: "Business Card",
    vars: "--bg: #e9e8f5; --fg: #1c1a33; --soft: #59567a; --accent: #5a4fcf; --card: #fff; --shadow: 28 26 51;",
    css: `
  .wrap { min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; padding: 0 clamp(16px, 4vw, 64px); }
  header { display: flex; justify-content: center; padding: 26px 0; } header nav { display: flex; gap: 28px; } nav a[aria-current] { color: var(--accent); }
  .stage { display: grid; place-items: center; perspective: 1600px; padding: 24px 0; }
  .card { width: min(640px, 92vw); aspect-ratio: 1.75; position: relative; transform-style: preserve-3d; transition: transform .9s cubic-bezier(.16,1,.3,1); cursor: pointer; }
  .card:hover, .card:focus-within { transform: rotateY(180deg); }
  .face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 18px; overflow: hidden; background: var(--card); box-shadow: 0 30px 60px -25px rgb(var(--shadow) / .45); display: grid; grid-template-columns: 0.8fr 1fr; }
  .face img { width: 100%; height: 100%; object-fit: cover; object-position: 40% 25%; }
  .face .txt { padding: clamp(18px, 3vw, 34px); display: flex; flex-direction: column; justify-content: space-between; }
  .face h1 { font-size: clamp(1.8rem, 3.6vw, 2.8rem); font-weight: 750; letter-spacing: -0.03em; line-height: 1; } .face .label { color: var(--accent); }
  .back { transform: rotateY(180deg); background: var(--accent); color: #fff; grid-template-columns: 1fr; padding: clamp(18px, 3vw, 34px); align-content: space-between; }
  .back .links { display: grid; } .back .links a { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgb(255 255 255 / .3); font-weight: 600; }
  .hint { text-align: center; color: var(--soft); padding-bottom: 28px; }
  .about { max-width: 44ch; margin: 0 auto 8px; text-align: center; color: var(--soft); }`,
    body: `<div class="wrap">
  <header class="rise"><nav class="label">${NAV}</nav></header>
  <div class="stage"><div class="card rise d1" tabindex="0">
    <div class="face">${PORTRAIT}<div class="txt"><div><h1>Steven Kertes</h1><p class="label" style="margin-top:10px">Engineer · Founder of Inductiv</p></div><p style="color:var(--soft);font-size:.95rem">${SCHOOL}<br>${WHERE}</p></div></div>
    <div class="face back"><p class="label">Get in touch</p><div class="links">${LINKS}</div></div>
  </div></div>
  <div><p class="about rise d2">${LEDE}</p><p class="hint label rise d3">Hover the card to flip it</p></div>
</div>`,
  },
  {
    file: "n-sticky-rose.html", title: "Sticky Photo",
    vars: "--bg: #f5eeec; --fg: #2c2a22; --soft: #625d50; --accent: #a65a4a; --olive: #5e6b3a;",
    css: `
  .wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: 100svh; }
  .pic { position: sticky; top: 0; height: 100svh; } .pic img { width: 100%; height: 100%; object-fit: cover; object-position: 40% 30%; }
  .txt { padding: clamp(24px, 5vw, 80px); display: flex; flex-direction: column; gap: 56px; }
  header { display: flex; justify-content: space-between; } header nav { display: flex; gap: 22px; } nav a[aria-current] { color: var(--accent); }
  h1 { font-weight: 300; font-size: clamp(3rem, 6vw, 5.6rem); line-height: 0.95; letter-spacing: -0.04em; } h1 b { font-weight: 750; display: block; }
  .lede { font-size: 1.25rem; line-height: 1.5; max-width: 34ch; }
  .facts { display: grid; grid-template-columns: auto 1fr; gap: 10px 24px; padding: 20px 0; border-block: 1px solid #ddd0cb; }
  .facts dt { color: var(--accent); } .facts dd { margin: 0; color: var(--soft); }
  .links { display: flex; gap: 12px; flex-wrap: wrap; } .links a { display: inline-flex; gap: 8px; align-items: center; padding: 11px 18px; border-radius: 999px; background: var(--olive); color: #f5eeec; font-weight: 600; }
  .links a:first-child { background: var(--accent); }
  @media (max-width: 820px) { .wrap { grid-template-columns: 1fr; } .pic { position: relative; height: 60svh; } }`,
    body: `<div class="wrap">
  <div class="pic">${PORTRAIT}</div>
  <div class="txt">
    <header class="label rise"><strong>SK</strong><nav>${NAV}</nav></header>
    <h1 class="rise d1">Hello, I'm <b>Steven Kertes.</b></h1>
    <p class="lede rise d2">${LEDE}</p>
    <dl class="facts label rise d3"><dt>School</dt><dd>Texas State · B.S. Computer Science, Math minor</dd><dt>Graduating</dt><dd>December 2026</dd><dt>Based in</dt><dd>New Braunfels, TX</dd><dt>Open to</dt><dd>Austin, San Antonio, relocation, remote</dd><dt>Building</dt><dd>Inductiv</dd></dl>
    <div class="links rise d4">${LINKS}</div>
  </div>
</div>`,
  },
];

for (const v of variants) writeFileSync(new URL(v.file, import.meta.url), page(v.title, v.vars, v.css, v.body));
console.log(variants.map((v) => v.file).join("\n"));
