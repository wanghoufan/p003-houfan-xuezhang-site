/**
 * 第二批：详情页长文、链接名、首页数据正文（经历/兴趣/认证/专题/联系方式）的英文版。
 * 全部逐条对译 app/content.ts 的中文原文，不增功能、不改口径。
 */

export type ProjectDetailEn = {
  role: string;
  background: string;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
};

export const projectDetailEn: Record<string, ProjectDetailEn> = {
  "cny-us-rate-board": {
    role: "Sole design and development",
    background:
      "When buying foreign currency or just watching the rate, a single number says little about where today's price sits. This project puts the live price and the long-term range in one view to cut the cost of judging.",
    challenge:
      "Fit the current rate, the official midpoint and the relative position over the last 1, 2, 3 and 5 years into a small space while keeping the hierarchy of information clear.",
    solution:
      "Built around one information card: the current rate is the visual lead, with the official midpoint and historical range as support, so a glance is enough to read and compare.",
    outcome:
      "A working CNY/USD rate board, with the code public on GitHub — the first recorded piece of work in my AI-assisted programming practice.",
    tags: ["Exchange-rate data", "Information design", "Web app"],
  },
  "deepseek-balance-widget": {
    role: "Sole design and development",
    background:
      "Balance changes for API services are scattered across consoles and notifications, hard to keep an eye on day to day. This project moves the DeepSeek account status into a corner of the desktop, where the balance becomes something you can always see.",
    challenge:
      "Show balance, trend, top-ups and granted credit without interrupting the workflow, and cover several contexts at once: the full card, the mini capsule and the system tray.",
    solution:
      "A Windows desktop widget at its core, with full-card and mini-capsule modes, scheduled polling, low-balance and abnormal-drop alerts, drag to position, always-on-top, tray and start with Windows. The API key is stored locally encrypted with Windows DPAPI CurrentUser.",
    outcome:
      "A standalone self-contained Windows x64 single-file tool, with GitHub Actions continuously checking build and tests; the release needs no pre-installed .NET runtime on the target machine.",
    tags: ["Windows 11", ".NET 8", "WPF", "API monitoring"],
  },
  "deepseek-balance-mac": {
    role: "Sole design and development",
    background:
      "Same starting point as the Windows version: API balance and usage sit scattered in consoles, and they overrun if you do not watch them. This is an independent macOS implementation in its own repository.",
    challenge:
      "Build a floating window on macOS 12+: auto-hide at the screen edge, live in the menu bar, switch between a full card and a mini capsule; on the ChatGPT side also separate peak/off-peak, and each account's 5-hour and weekly quota with their own reset times.",
    solution:
      "Interface and polling built with Avalonia on .NET 8, showing DeepSeek balance, change magnitude and remaining ChatGPT Plus quota; supports start with login, drag to position, always-on-top and abnormal-state alerts; shipped as two zips for Apple Silicon and Intel — unzip, drag the .app into Applications, no .NET needed.",
    outcome:
      "Release v0.6.0 published with installers for both architectures. The Windows (WPF) side has been split into its own repository; this one covers macOS only.",
    tags: ["macOS desktop tool", "Avalonia / .NET 8", "Quota monitoring", "Menu bar resident"],
  },
  "prompt-manager": {
    role: "Sole design and development",
    background:
      "Prompts are scattered across chat logs, notes and local txt files and are nowhere to find when you need them; every role switch means pasting another wall of text; what machine A organised machine B cannot see; and there is no data on which ones you actually use.",
    challenge:
      "Several machines sharing one dataset needs second-level propagation; editing must save on blur without writing a version snapshot on every blur; search has to cover title, body, tags and notes while also jumping straight to a retrieval code — and the highlight must hold contrast in both the dark and the light theme.",
    solution:
      "Data lives in local SQLite; the search box debounces at 300ms, supports @code direct retrieval with hit counts, and colours the highlight through CSS variables per theme; manual copies and MCP retrievals share one counter; saving a body archives up to 10 versions for rollback; three theme modes follow the system with an inline first-paint script to stop flashing; and through MCP an agent such as WorkBuddy can take a card's body as its system prompt from a single 'retrieve <code>' line.",
    outcome:
      "Local web front end and MCP integration complete, with real-time multi-device sync over the LAN and Docker self-hosting; source public on GitHub. There is no public demo site; the site cover comes from the app's built-in read-only 'example library' view and contains no real usage data.",
    tags: ["Local web app", "SQLite", "MCP integration", "Prompt library"],
  },
  "nomad-seasons": {
    role: "Sole product design and development",
    background:
      "When a place to stay is shaped by season, felt climate, budget, connectivity and transport all at once, browsing city write-ups rarely gets you a decision. This project turns travel inspiration into an explainable decision path.",
    challenge:
      "Handle a 12-month switch, climate thresholds, budget and connectivity filters, domestic and overseas rankings, and a mixed comparison of 2–3 cities — all in one responsive interface, still reading like a travel magazine.",
    solution:
      "A month picker and a preference panel as the entry point refresh the domestic ranking live, with an 'include overseas cities' switch revealing a separate overseas board; city cards keep the reason it was recommended, evidence tags and a data snapshot, so the ranking stays understandable and comparable.",
    outcome:
      "A Chinese responsive tool for filtering and comparing long-stay cities, covering 12 domestic and 12 overseas cities with full 12-month data, accessible interaction and a live demo on Vercel.",
    tags: ["React", "Vite", "Data-driven decisions", "Digital nomad"],
  },
  "ai-storyboard-studio": {
    role: "Sole product design and development",
    background:
      "Moving a short drama from script to shooting means breaking scenes, shots and mood apart over and over. This project tries to connect script understanding with visual rehearsal, shortening the distance from words to pictures.",
    challenge:
      "Take theme, script content and style preference at once, keep the generated text storyboard and its pictures consistent, and output a shot plan that is clear, intuitive and easy to keep working from.",
    solution:
      "Given a theme, script and style, the system performs the text storyboard breakdown itself and generates a cinematic frame for every shot, producing a working area of image-and-text organised by shot.",
    outcome:
      "An AI storyboard tool built for the short-video workflow, helping creators turn a script into a visual plan that can be understood, discussed and executed.",
    tags: ["AI creation", "Illustrated storyboard", "Short video", "Image generation"],
  },
  "50-haikou-cafes": {
    role: "Sole design and development",
    background:
      "Coffee shops spread across lanes and districts deserved a guide that works both for exploring the city and for coming back to again and again.",
    challenge:
      "Make location, opening hours, notes and photos for 50 shops easy to look up, while serving both map browsing and phone use.",
    solution:
      "A static site driven by structured shop data: district and distance filters, check-ins and favourites, random picks, shop detail pages and a full map overview.",
    outcome:
      "A city guide to 50 cafés across several districts of Haikou, with a responsive live site.",
    tags: ["Haikou", "City guide", "Maps", "Static site"],
  },
  "a-share-index-valuation-report": {
    role: "Sole design and development",
    background:
      "Valuation data for different indexes is scattered and measured differently, so comparing where each one stands today is slow.",
    challenge:
      "Present several valuation percentiles, price position and data freshness for both broad-based and dividend indexes on one page clearly — and state the limits of the data.",
    solution:
      "JSON-driven display combining valuation percentiles, latest close, historical drawdown, a radar chart and sparklines in a responsive page.",
    outcome:
      "A valuation summary report covering broad-based and dividend indexes with online reading, side-by-side comparison and data-freshness notes; the data is not investment advice.",
    tags: ["A-shares", "Valuation analysis", "Data visualisation", "HTML"],
  },
  "ai-resume-job-matcher": {
    role: "Sole design and development",
    background:
      "Resume experience, the target role and the next step usually live in different documents, which makes it hard to see which abilities are worth shoring up first.",
    challenge:
      "Let a person go from one resume and one job description to a clear, actionable match analysis.",
    solution:
      "Take a resume PDF and the target job description, combine them with the model the user selects and their own API key, rewire experience, abilities and opportunity, and return concrete next-step suggestions.",
    outcome:
      "An AI resume-and-job matcher you can try online, moving job preparation from vaguely editing a resume towards calibrating against a specific role.",
    tags: ["AI app", "Resume analysis", "Job-hunting tool", "Web app"],
  },
  "life-species-coze": {
    role: "Sole product design and development",
    background:
      "I wanted a light, shareable personality test. Most tests out there lean literary or mystical; here the animal cartoon gag is the point — the result should be something you forward to a friend and talk about.",
    challenge:
      "Organise 24 questions, 24 life species and 2 hidden secondary personalities into a stable, reproducible flow on the Coze platform, while making the result both keepable and spreadable.",
    solution:
      "Built the Life Species animal-cartoon universe, wrote the flow and prompts on Coze, designed 24 everyday-scenario questions with their species mapping, and added a trigger for the hidden secondary personalities; on the result side a Supabase backend specification plus 24 species assets, with a permanent result page that stays reachable and a species distribution gallery.",
    outcome:
      "A Chinese personality test bot that takes 3–5 minutes, published on the Coze platform with a live demo and shareable result pages; the delivery includes the Coze prompts, the Supabase backend specification and 24 species assets, with code open-sourced on GitHub.",
    tags: ["Coze", "AI bot", "Personality test", "Interactive product"],
  },
  "protein-calculator": {
    role: "Sole design and development",
    background:
      "People who train or watch their diet want a rough daily protein target and to know what a couple of chicken breasts, a few eggs or a carton of milk actually provide. Looking up composition tables is tedious, online tools want a sign-up and a network, and the cost of judging ends up bigger than the question.",
    challenge:
      "Fit all of this on a phone screen: the daily target (four target modes, each with a lower and an upper value), a protein ranking of 30 common foods, entry in mixed units of grams / millilitres / pieces / bottles, plus dark and light themes and Chinese-English bilingual — all of it working offline.",
    solution:
      "Enter body weight, pick a target mode and get the daily grams; the high-protein list is sorted by protein per 100g, '+' adds repeatedly, and the page totals this meal live, shows the remaining gap and draws a progress bar. Nutrition values and typical portions for preset foods can be overwritten to match the packet you hold, custom foods can be added and defaults restored; weight, coefficient, amounts and custom foods are stored on the device, so killing the app and reopening picks up where you left off, and damaged data falls back to defaults instead of crashing.",
    outcome:
      "An Android-only standalone app with Chinese-English bilingual support and theme following the system; the food data comes from the China Food Composition Tables platform of the NIN, China CDC (verified 2026-09), with the source and a disclaimer card kept in the app stating it is not a full ranking of the database. Source and running screenshots are public on GitHub.",
    tags: ["Android", "Expo / React Native", "Offline standalone", "Bilingual"],
  },
  "roll-position-calculator": {
    role: "Sole design and development",
    background:
      "Rolling a position means watching gain per step, leverage, size and asset change at the same time; in a spreadsheet every edit forces a full recalculation, no version of each simulation survives, and real fills never sit next to the assumptions.",
    challenge:
      "Under the constraint of one HTML file, zero dependencies and no network: keep text records in localStorage and screenshots in IndexedDB (original plus thumbnail), and handle the real-world cases where private mode refuses writes and a wide table becomes unreadable on a narrow screen.",
    solution:
      "Four inputs generate a 12-stage simulation table under the rule gain × previous leverage = 1 with assets doubling each stage; up to 100 local history snapshots with rollback and JSON import/export; a live-record ledger with profit/loss and total return, editable in place without producing duplicates; evidence screenshots accept click, drag and Ctrl+V, compressed with canvas to 1600 and 320; a 680px breakpoint turns the table into cards.",
    outcome:
      "Live and verified in production, with no known bugs open. Fees, funding rates, slippage and liquidation risk are not modelled, and nothing here is investment advice; all data stays in the local browser and is never uploaded.",
    tags: ["Single-file front end", "Zero dependencies", "Rolling-position simulation", "Local storage"],
  },
  "breakout-radar": {
    role: "Sole product design and development",
    background:
      "For altcoin breakouts most tools hand you a vague 'looks like it might pump'. This one does the opposite: with strict point-in-time alignment and no lookahead contamination, it lays the reasoning out in the open — failed samples included.",
    challenge:
      "Time alignment is non-negotiable: a lookback of 42 4H candles, MFE/MAE measured from the breakout close, the breakout candle excluded from the window; historical sample scope must stay frozen rather than widened to flatter the conclusion; exchange endpoints have to dodge CORS without exposing keys; and when the network fails the tool must degrade honestly instead of passing a snapshot off as live.",
    solution:
      "Rolling Breakout plus EMA, ATR, volume ratio, strength against BTC and funding rate classify each coin into a ten-state machine, then split into six independently scored layers: regime gate, setup, trigger, follow-through, risk and hard veto; 21 historical swing events form a sample mine with frozen success/failure sets for walk-forward testing; a similarity engine answers 'which past wave does this look like most'.",
    outcome:
      "Live on Vercel with 73 unit tests and a 21-event regression passing. It publishes no win rate, accuracy, fake-out probability or any return promise; backtest metrics appear only as evidence of research honesty. Market data comes from the public OKX / Binance endpoints and is not investment advice.",
    tags: ["Next.js 16", "Quant research", "Explainable signals", "Backtesting"],
  },
  "hongli-dixin-calc": {
    role: "Sole design and development",
    background:
      "Building a base position for IPO subscriptions spreads valuation, constituent weights, capital allocation, order sizes and position tracing across different places; one person can hardly compute it all and still check it properly. This tool threads it into one flow that runs on your own machine.",
    challenge:
      "Valuation and drawdown need dual-source verification: inner join on the same index, missing rate no worse than 0.5%, error no worse than 0.10%, and if any check fails it shows 'no data' rather than making a number up; market quotes follow a three-path, five-state contract (3-second timeout, 2 backoff retries, 72-hour staleness); the order plan must be freezable while still allowing manual confirmation and correction.",
    solution:
      "The server is Python standard library http.server plus a SQLite ledger; the front end is a single page; official constituents and weights use a three-tier cache; capital to order size comes from a four-lifecycle plan engine, with a four-state checklist on the phone to assist ordering; positions and cash are rebuilt from the ledger view, and manual price overrides never enter ledger pricing.",
    outcome:
      "A complete V1.3 loop, self-hosted on a Mac Mini with optional Docker. It plans, records and checks only: no broker interface, no automated trading; quotes serve capital estimation only, real orders follow the broker's book, and none of this is investment advice.",
    tags: ["Python standard library", "SQLite", "Dividend indexes", "IPO base position"],
  },
  video2obsidian: {
    role: "Sole design and development",
    background:
      "A pile of course and podcast videos on hand, and I wanted searchable notes — without uploading files to a cloud service or paying per minute of API. So the transcription runs on the machine itself.",
    challenge:
      "Existing notes must never be overwritten; a freshly copied video needs roughly 7 seconds to finish being written before it can be queued, or half a file gets sent to transcription; watcher state does not come back after a restart; long videos need end-to-end retry and preview, and every step has to show where it is stuck.",
    solution:
      "A staged pipeline, stage1–12: local transcription with mlx-whisper (pinned large-v3-turbo) plus ffmpeg audio extraction, with watchdog queueing files from the folder automatically; a vocabulary area of 'wrong → right' can be re-run; output is split into Markdown sections, mirrored into Obsidian when a vault path is configured and left in the data directory when it is not; the task list reports progress as discovered → transcribed → organised → drafted → filed.",
    outcome:
      "The pinned release is tagged v1.0-mac. It needs only an Apple Silicon Mac, Python 3.12 and ffmpeg, and no API key of any kind; the Windows version is developed separately in the same repository and is not released.",
    tags: ["macOS desktop tool", "Local transcription", "Obsidian", "Offline, no API cost"],
  },
  "family-insurance-dashboard": {
    role: "Sole design and development",
    background:
      "Family policies live across contracts from different insurers and years; answering 'who is under-covered, which one renews soon, what is the total premium this year' means digging through them one by one.",
    challenge:
      "Hold one boundary: ID numbers and contract attachments stay on the device forever, and everything works fully offline; once cloud sync is switched on, changes made while offline must not be lost; and a single-file page still has to avoid the white flash when the theme changes.",
    solution:
      "One native HTML / CSS / JavaScript file, zero dependencies and no build: policy fields in localStorage, contract attachments in IndexedDB; renewal reminders through desktop notifications, premium trends year over year; optional Supabase sync with a per-record write queue and outbox replay, guarded by INITIAL_SESSION to stop refresh loops; backups encrypted with WebCrypto, exportable as an Excel template and JSON.",
    outcome:
      "MVP complete and accepted, self-hostable with nginx / Docker. All built-in sample data is de-identified (sample policyholder A / B, sample policy numbers); real policies stay in the local browser and are never uploaded.",
    tags: ["Single-file front end", "Works offline", "De-identified data", "Household finance"],
  },
  "bar-games": {
    role: "Sole product design and development",
    background:
      "A party dies in silence most often at the start, and questions crossing a line is the other risk. This PWA makes 'agree on headcount, relationships, limits and landmines first' the very first step, then hands prompting and turns to the program.",
    challenge:
      "The whole round's questions must be pre-generated before it starts so play continues offline; an API key may only live on the device, encrypted and forwarded through a same-origin proxy, and custom providers must block private addresses against SSRF; the game engine and the game packs have to stay decoupled so players can add their own.",
    solution:
      "Truth or dare, who is most likely, never have I ever and more mixed together; the question bank can be purely local or backed by DeepSeek / OpenAI-compatible generation; custom game packs, random naming and grouping, 8 drinking-rule libraries; intensity adjustable mid-round and a summary generated at the end.",
    outcome:
      "A mobile PWA complete, with a Capacitor Android shell alongside. V1 deliberately ships no accounts, payments, cloud sync, multiplayer rooms or data export — a free offline tool.",
    tags: ["Mobile PWA", "Next.js 16", "Works offline", "Party games"],
  },
  "party-night": {
    role: "Sole product design and development",
    background:
      "The same group of friends, party after party, and the questions get awkward. This tool turns games, turns and limits into a mobile PWA that keeps going offline, so nobody has to explain rules at the start.",
    challenge:
      "The whole deck must generate offline and play on without network; AI-generated questions have to be validated before they reach the screen; keys stay on the device; the game must be switchable mid-round while still letting players add their own game packs.",
    solution:
      "Truth or dare, who is most likely, never have I ever and AI improvisation mixed together, plus either/or and spin the bottle as standalone games with mid-round switching; question bank local or via DeepSeek / OpenAI-compatible generation; keys sealed with AES-GCM in IndexedDB; engine and game pack decoupled, with AI output validated through Zod; random naming and grouping plus 8 drinking-rule libraries.",
    outcome:
      "V1 complete, deployed live, with a Capacitor Android shell as well. No accounts, payments or cloud sync; data stays on the device.",
    tags: ["Mobile PWA", "Next.js 16", "Capacitor", "Works offline"],
  },
  "place-journal": {
    role: "Sole product design and development",
    background:
      "Photos pile up, but looking back through 'which places have I been' has no structure. This journal turns each entry into something with a place, tags and a way to search it.",
    challenge:
      "The AI provider has to be swappable (three adapters — OpenRouter, DeepSeek, OpenCode — with a 12-second fallback); simultaneous edits from several devices need conflict arbitration; and a shared snapshot must never carry private content out.",
    solution:
      "A photo plus a spoken note, with AI extracting place and tags; review by place, timeline or tag, with natural-language place search; sharing in three forms — single card, list, map — with private fields withheld by default; data is written locally to IndexedDB first, then synced to Supabase through an outbox, with an Expo Android shell alongside.",
    outcome:
      "The PWA is live and accepted. Cloud sync, maps and AI each need your own key; without them it still works as a purely local journal.",
    tags: ["PWA", "React 18 + Vite", "Supabase sync", "Local first"],
  },
  nightrec: {
    role: "Sole design and development",
    background:
      "What I wanted to keep was the whole sound of that night, not a scattered tracklist. So recording starts from 'a set', not from 'a track'.",
    challenge:
      "A long recording must survive stepping away and still count as the same set; the recognition API has to be throttled and deduplicated or a single night blows up the request quota; AI clean-up can only ever be a conservative beta, and any failure must leave the original recording intact.",
    solution:
      "Kotlin with a Jetpack Compose interface, Media3 for recording, Room for sets; continuous, deduplicated track identification through AudD, one progress bar for the whole night with markers to jump back and listen, WorkManager keeping the background task alive; unidentified segments are kept as unknown and can be retried.",
    outcome:
      "An Android app complete (minSdk 29) with real-device verification screenshots in the repository. AI clean-up is beta, identification depends on a shared AudD quota, and wired headphones prevent identification; no signed release was published, and both source and verification records are public in the repo.",
    tags: ["Android", "Kotlin / Compose", "Media3", "Live documentation"],
  },
  "talent-showroom": {
    role: "Sole design and development",
    background:
      "Going to a rehearsal or a show with a phone, there is often no network, and hunting for a chart on Douyin on the spot is miserable. The whole point of this library is: play and practise with no network at all.",
    challenge:
      "Offline is a hard requirement: downloads must resume and retry, actions must queue and sync once the network returns; and score PDFs have to open from inside the package rather than depend on an online service.",
    solution:
      "Guitar and vocal libraries kept separate with key and capo recorded; a practice player with looping and tempo change; one tap to download everything locally; batch categorisation backed by an offline action queue; dance music cut out of videos, with Douyin links accepted; plus a 'tonight's setlist' and a performance mode. React 19 + Vite front end, node:sqlite back end, packaged with Capacitor 8, PDF.js bundled inside the APK.",
    outcome:
      "Both web and Android forms complete; the public service is not deployed. The guitar module was frozen on 2026-10-03.",
    tags: ["Capacitor", "Offline first", "Repertoire management", "Practice tool"],
  },
  "stretch-routine": {
    role: "Sole design and development",
    background:
      "Staring at a countdown while stretching is awkward, and a phone set far away is unreadable. Hand the moves and the beat to a voice and you can close your eyes and finish the round.",
    challenge:
      "Timing must not lose its way when the user changes the system clock; start-up must not flash white; the whole movement library needs filtering by scenario and body part, and you must be able to compose your own routine.",
    solution:
      "59 movements filtered dynamically by scenario and body part; a routine editor with batch entry and training types; the follow-along page speaks moves and beats through TTS, with countdown background audio and Chinese-English bilingual; history statistics accumulate duration per type; all data in local SQLite. Timing moved to a hand-written Kotlin module reading elapsedRealtime and boot counts — measured on a real device, a ±1-day clock jump cost 4 seconds; start-up uses SplashScreen to stop the white flash and hides after the first frame.",
    outcome:
      "GitHub Release v1.2.0 published with the APK attached, ready to download and install. All audio is synthesised programmatically inside the project, with formal playback through the system TTS engine; Android only, and background hardening plus some statistics definitions remain on the open list.",
    tags: ["Android", "Expo / React Native", "Voice coaching", "Offline SQLite"],
  },
  "stretch-side-timer": {
    role: "Sole design and development",
    background:
      "In symmetrical stretching and myofascial release the hard part is remembering 'has this side had enough, should I switch'. Counting seconds breaks your focus, so hand it to a chime.",
    challenge:
      "Timing must stay accurate after the screen locks; and the Android launcher icon had to show an English name, which took a hand-written config plugin.",
    solution:
      "A segmented looping countdown that chimes when you switch sides and rolls straight into the next segment; a little animal companion animated through five emoji states; 4 themes, 8 switch chimes and 9 background sounds, Chinese-English following the system, history in AsyncStorage; lock-screen timing corrected back from an end timestamp.",
    outcome:
      "An Android APK complete and accepted on a real device (no iOS). Background audio uses CC BY 4.0 material credited to Incompetech; the installer is not published as a GitHub Release, and both source and on-device proof are public in the repository.",
    tags: ["Android", "Expo / React Native", "Stretching", "Switch reminder"],
  },
  "photo-library": {
    role: "Sole design and development",
    background:
      "Photos filed into folders are photos you never find again. This project turns them into a private gallery: the pictures are the lead, and tags plus facets pull 'the set I actually like' out at any time.",
    challenge:
      "Six facets must stack and show the live hit count; the filter state has to be encoded into the URL so someone else opening the link sees the same set; writes must land locally first and then reach the cloud in dependency order after sign-in, with deletions in reverse order.",
    solution:
      "Masonry and grid galleries with a lightbox; six facets — place, style, composition, year, orientation, favourites — with single and batch import, tag rename and delete; IndexedDB local-first with an outbox queue, syncing to a separate schema in my own Supabase after Google sign-in; filter state written into the URL for sharing; installable PWA, mobile-first with desktop extras.",
    outcome:
      "A working system complete and self-hosted with Docker; the site address is not public. Demo images come from Unsplash over the network and go blank offline; the export-data button is not implemented yet.",
    tags: ["React 19 + Vite", "PWA", "Faceted filtering", "Local first"],
  },
  "fill-light": {
    role: "Sole design and development",
    background:
      "One phone cannot be both the camera and the light; a torch is harsh and glaring, and a real fill light is expensive. Turning the spare phone into a lamp is the cheapest answer.",
    challenge:
      "The store package must request zero permissions, so the network permission stays in debug builds only; language preference writes have to be serialised or concurrent writes lose data; and the colour wheel texture has to be generated by script rather than placed by hand.",
    solution:
      "A full-screen fill canvas defaulting to warm white at constant brightness; 8 preset colours plus a custom HSV wheel; separate sliders for colour intensity and screen brightness; the control panel auto-hides after 5 seconds to stop mis-taps; state persisted locally, Chinese-English bilingual; built with Expo and React Native, entirely on-device.",
    outcome:
      "GitHub Release v2.1.0 published with app-release.apk attached, and release screenshots taken on a real device are in the repository. Android only; iOS is not implemented.",
    tags: ["Android", "Expo / React Native", "Fill light", "Offline standalone"],
  },
  "skill-system-map": {
    role: "Sole design and maintenance",
    background:
      "A lot of methods accumulated, but it was impossible to see what I can actually do or how the pieces connect. This map lays the reusable Skills out by capability domain, origin and flow, turning an inventory into a single glance.",
    challenge:
      "The counting rules must not drift: data merges the central registration file with my own installed list, deduplicated by name; skills bundled inside plugins, role flows and project-specific standards are not counted in the skill total; and the iteration heatmap counts only dated registry changes, which says nothing about quality or time invested.",
    solution:
      "Three areas on the page: continuous improvement through the change-registration heatmap and recent updates; a work-and-life flow map connecting the stages of personal management and project delivery, where clicking any stage jumps to the matching skill; and a capability inventory browsed by domain, filterable by the three origins — self-built, official upstream, community unverified — with search over name and purpose.",
    outcome:
      "Published on GitHub Pages, viewable without installing anything. The public snapshot registers 75 skills: 38 self-built, 24 official upstream, 13 community unverified, spanning personal management, travel services, requirement clarification, project collaboration, UI design, content creation, learning and knowledge management, data analysis, productivity automation, testing, deployment operations and skill governance.",
    tags: ["Static site", "GitHub Pages", "Capability inventory", "Skill governance"],
  },
  "orca-governance-template": {
    role: "Sole design and maintenance",
    background:
      "The system binds to neither Orca nor any particular client: move freely between Orca, Trae, Qoder, Codex, CodeArts Agent, opencode and Claude Code, while the rules, role cards, ledgers and acceptance standards stay one and the same.",
    challenge:
      "One rule change must reach every project: each project root's allocation table is a symlink to the master source, copying the real file is forbidden, and only when a link breaks across machines do you copy the file and record it in the handoff; template names are frozen, and version truth comes from the repository's Git history — the version marker file is only a pointer.",
    solution:
      "One system-wide order for reading the disk at start of work: shared rules → this role's card → the model table → current handoff → one-line experience, with the task goal last. Each round starts by auto-detecting the current client and only then choosing the dispatch channel: dispatch directly in-window where native subagents exist, otherwise call the channel CLI — the user fills in no configuration and assigns no roles. The user needs three commands only: phase one plan, phase two develop, change request.",
    outcome:
      "The distribution version is public on GitHub with bilingual navigation, role specifications, plan and acceptance templates and ledger validation scripts; model and channel policy is governed by that one table at the repository root, and the navigation deliberately does not restate model IDs so it cannot drift from the table.",
    tags: ["Multi-agent collaboration", "Governance template", "Client-agnostic", "Acceptance trail"],
  },
  "mahjong-quick-guide": {
    role: "Sole design and development",
    background:
      "Before a first game, people get stuck on the same handful of questions: can this hand win or not, why not, and what do sequence, triplet, pung, chow and kong actually mean. This project is not an encyclopedia of scoring patterns — it answers only the things that block you before you sit down, with real tile faces for every rule.",
    challenge:
      "It has to be readable by someone who has never played mahjong: every term is explained where it first appears, with no unexplained jargon left; the tile faces must be authentic and legible, and Hainan's four conditions — the pair is 2/5/8, your seat matches your flowers, winds or dragons form a triplet, and fan decides whether you can win off a discard — must each be spelled out. It also stays dependency-free and fully offline, openable by double-clicking.",
    solution:
      "A plain static site (index.html + app.js + app.css + i18n.js + data/*.js) with no framework, no build step and no external links; 'when can I win' and 'why can't I win' each get a page, with 8 real hands and a glossary shown as tile faces; two small tools sit alongside — a seat table and a big-screen table view; the UI is bilingual with a follow-system option, has light/dark/follow-system themes that never lose the page you are on, and installs as a PWA that keeps working offline, with SW_VERSION controlling the cache version and the page auto-refreshing once a new version takes over.",
    outcome:
      "The online version is published — add it to your phone's home screen and it opens like an app, even with no network. The rules cover Hainan mahjong only; it is not a hand-evaluation engine and shows 8 reviewed static hands; the rules come from public sources and local play and contain no betting, scoring or gambling features.",
    tags: ["Static site", "Installable PWA", "Bilingual", "Rule reference"],
  },
};

/** 详情页与卡片上的链接按钮名。 */
export const linkLabelEn: Record<string, string> = {
  "查看 GitHub 项目": "View on GitHub",
  "打开在线体验": "Open the live site",
  "打开在线地图": "Open the live map",
  "下载最新版本": "Download the latest release",
  "下载安卓安装包": "Download the Android APK",
};

/** 首页数据正文（经历 / 兴趣 / 认证 / 专题 / 服务 / 名片）的英文版。 */
export const contentEn = {
  tags: ["Lifelong learner", "Avid reader", "AI apps and programming explorer"],
  motto: "Stay curious, keep building, turn hobbies into shipped work.",
  experiences: [
    {
      period: "2017.09–2021.06",
      title: "Studied at the National University of Defense Technology",
      description:
        "Built the underlying habits of solving problems, sustained effort and self-management through systematic study and collective life.",
    },
    {
      period: "2021.09–2025.12",
      title: "Worked inside the system",
      description:
        "Gathered experience in a real working environment and came to understand responsibility, collaboration and long-termism.",
    },
    {
      period: "2026.01–now",
      title: "Exploring on my own",
      description:
        "Reconnecting interest with action; currently focused on AI apps and programming, turning ideas into things people can actually use.",
    },
  ],
  interests: {
    咖啡: "Coffee",
    阅读: "Reading",
    吉他: "Guitar",
    "AI 编程": "AI coding",
    健身: "Strength training",
    篮球: "Basketball",
    抖舞: "Groove dance",
    滑雪: "Snowboarding",
    冲浪: "Surfing",
  } as Record<string, string>,
  milestones: [
    "Top-scoring student of Dedao's programme (900 points)",
    "National intermediate fitness coach certification",
    "DJI drone aerial-photography certification",
    "Class monitor of IELTS speaking teacher Yang Shuai's class",
    "Preparing for the IELTS exam",
    "Preparing for international fitness certifications (NSCA, ACE, NASM, ACSM)",
    "Preparing for the health-manager qualification",
    "Freestyle surfing and wake surfing, beginner",
    "Snowboarding, beginner",
  ],
  topics: {
    "健康与长寿": "Health and longevity",
    "定投投资与保险": "Regular investing and insurance",
    控糖饮食: "Low-glycaemic eating",
    孩子近视预防: "Preventing myopia in children",
  } as Record<string, string>,
  serviceTitle: "GPT top-up service",
};
