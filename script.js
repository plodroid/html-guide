(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const STORAGE_KEY = 'htmlQuestStateV2';

  const worlds = {
    html: {
      number: 'WORLD 1',
      title: 'HTML Foundations',
      description: 'Build the skeleton of the web from absolute zero.',
      icon: '<>',
      unlock: () => true,
      missions: [
        {
          id: 'html-0', title: 'Meet your first tag', time: '2 min', xp: 40, icon: '1',
          intro: 'HTML tells the browser what each piece of a page is. You are about to make the most important heading on a page.',
          conceptTitle: 'A tag wraps content',
          explanation: 'Most HTML elements have an opening tag, some content, and a closing tag. The slash in the closing tag means “this element ends here.”',
          example: '<h1>Hello, web!</h1>',
          task: 'Create an <h1> that says “Hello, web!”',
          starter: '<p>Hello, web!</p>',
          hint: 'Change both p tags into h1 tags. Keep the text in the middle.',
          validate: code => /<h1\b[^>]*>\s*Hello,\s*web!\s*<\/h1>/i.test(code)
        },
        {
          id: 'html-1', title: 'Say more with text', time: '3 min', xp: 45, icon: '2',
          intro: 'Headings give a page structure. Paragraphs carry the normal text underneath them.',
          conceptTitle: 'Use headings for structure, paragraphs for copy',
          explanation: 'Use <h1> for the main heading, then <p> for normal paragraphs. <strong> marks text as important and browsers usually show it bold.',
          example: '<h1>My page</h1>\n<p>I am learning <strong>HTML</strong>.</p>',
          task: 'Add a paragraph that contains the word HTML inside a <strong> tag.',
          starter: '<h1>My page</h1>\n<p>I am learning HTML.</p>',
          hint: 'Wrap only the word HTML like this: <strong>HTML</strong>.',
          validate: code => /<p\b[^>]*>[\s\S]*<strong\b[^>]*>\s*HTML\s*<\/strong>[\s\S]*<\/p>/i.test(code)
        },
        {
          id: 'html-2', title: 'Make a real link', time: '3 min', xp: 50, icon: '3',
          intro: 'Links are what made the web the web. The <a> element becomes useful when you give it a destination.',
          conceptTitle: 'Attributes add information',
          explanation: 'The href attribute tells a link where to go. Attributes live inside the opening tag and normally use name="value".',
          example: '<a href="https://example.com">Visit example</a>',
          task: 'Make the text “Open site” link to https://example.com.',
          starter: '<a>Open site</a>',
          hint: 'Add href="https://example.com" inside the opening <a> tag.',
          validate: code => /<a\b[^>]*href=["']https:\/\/example\.com\/?["'][^>]*>\s*Open site\s*<\/a>/i.test(code)
        },
        {
          id: 'html-3', title: 'Nest a card', time: '4 min', xp: 55, icon: '4',
          intro: 'Real pages are built from elements inside other elements. That relationship is called nesting.',
          conceptTitle: 'Parents contain children',
          explanation: 'A <div> is a generic container. Put related elements inside it, indent them, and the structure becomes much easier to read.',
          example: '<div class="card">\n  <h2>Headphones</h2>\n  <p>Wireless audio.</p>\n  <button>View</button>\n</div>',
          task: 'Put the h2, p and button inside one <div class="card">.',
          starter: '<h2>Headphones</h2>\n<p>Wireless audio.</p>\n<button>View</button>',
          hint: 'Add <div class="card"> before the h2 and </div> after the button.',
          validate: code => /<div\b[^>]*class=["'][^"']*\bcard\b[^"']*["'][^>]*>[\s\S]*<h2\b[\s\S]*<p\b[\s\S]*<button\b[\s\S]*<\/div>/i.test(code)
        },
        {
          id: 'html-4', title: 'Name things cleanly', time: '4 min', xp: 60, icon: '5',
          intro: 'CSS and JavaScript need a reliable way to find elements. Classes and IDs give elements names.',
          conceptTitle: 'Class = reusable. ID = unique.',
          explanation: 'Use class when many elements can share a style. Use id for one specific element. CSS finds .card with a dot and #search with a hash.',
          example: '<div class="card">...</div>\n<input id="search" type="text">',
          task: 'Give both buttons the class “action” and give only the first button the id “primary”.',
          starter: '<button>Save</button>\n<button>Cancel</button>',
          hint: 'First button: class="action" id="primary". Second button: class="action".',
          validate: code => {
            const doc = parseHTML(code); const buttons = [...doc.querySelectorAll('button')];
            return buttons.length >= 2 && buttons[0].classList.contains('action') && buttons[1].classList.contains('action') && buttons[0].id === 'primary';
          }
        },
        {
          id: 'html-5', title: 'Images that make sense', time: '4 min', xp: 65, icon: '6',
          intro: 'Images use attributes instead of a closing tag. One attribute points to the image; another explains it.',
          conceptTitle: 'src loads it. alt explains it.',
          explanation: 'The src attribute tells the browser which image to load. alt is useful text for screen readers and for cases where the image cannot load.',
          example: '<img src="cat.jpg" alt="Orange cat sleeping">',
          task: 'Give the image a source called avatar.png and useful alt text: “Profile picture”.',
          starter: '<img>',
          hint: 'You need two attributes: src="avatar.png" and alt="Profile picture".',
          validate: code => {
            const img = parseHTML(code).querySelector('img');
            return !!img && img.getAttribute('src') === 'avatar.png' && img.getAttribute('alt')?.trim().toLowerCase() === 'profile picture';
          }
        },
        {
          id: 'html-6', title: 'Build a form', time: '5 min', xp: 70, icon: '7',
          intro: 'Forms let people give information to a website: names, emails, searches, settings and much more.',
          conceptTitle: 'Use the right element for the job',
          explanation: 'A <label> names an input. <input> collects a value. A submit <button> lets the user send the form. Native HTML gives you lots of behavior for free.',
          example: '<form>\n  <label>Email <input type="email"></label>\n  <button type="submit">Join</button>\n</form>',
          task: 'Create a form with an email input and a submit button.',
          starter: '<form>\n  <!-- add the controls here -->\n</form>',
          hint: 'Inside the form, add <input type="email"> and <button type="submit">Join</button>.',
          validate: code => {
            const doc = parseHTML(code); const form = doc.querySelector('form');
            return !!form?.querySelector('input[type="email"]') && !!form.querySelector('button[type="submit"]');
          }
        },
        {
          id: 'html-7', title: 'HTML Boss: real structure', time: '7 min', xp: 120, icon: '★', boss: true,
          intro: 'Boss time. No tiny isolated tag now — build the meaningful skeleton of a real page.',
          conceptTitle: 'Semantic HTML describes purpose',
          explanation: '<header>, <nav>, <main>, <section> and <footer> tell browsers and assistive technology what each region means. Use them when they fit instead of endless anonymous divs.',
          example: '<header>...</header>\n<main>\n  <section>...</section>\n</main>\n<footer>...</footer>',
          task: 'Create a page skeleton containing header, nav, main, one section and footer. Put an h1 inside main.',
          starter: '<!-- Build the page skeleton -->\n',
          hint: 'Start with <header><nav>Menu</nav></header>, then <main><section><h1>...</h1></section></main>, then <footer>...</footer>.',
          validate: code => {
            const doc = parseHTML(code);
            return !!doc.querySelector('header nav') && !!doc.querySelector('main section h1') && !!doc.querySelector('footer');
          }
        }
      ]
    },
    css: {
      number: 'WORLD 2', title: 'CSS Styling', description: 'Turn plain structure into thoughtful interface design.', icon: '#',
      unlock: () => worldComplete('html'),
      missions: [
        { id:'css-0', title:'Your first style', time:'3 min', xp:50, icon:'1', intro:'CSS changes how HTML looks without changing what the HTML means.', conceptTitle:'Selector → property → value', explanation:'A selector chooses something. Inside braces, properties describe what changes and values say what to change it to.', example:'h1 {\n  color: royalblue;\n}', task:'Make the h1 color royalblue.', starter:'h1 {\n  color: black;\n}', hint:'Change black to royalblue.', validate:code=>/h1\s*\{[\s\S]*color\s*:\s*royalblue\s*;?[\s\S]*\}/i.test(code) },
        { id:'css-1', title:'Space is design', time:'4 min', xp:55, icon:'2', intro:'Good UI is often more about spacing than decoration.', conceptTitle:'Padding lives inside the box', explanation:'padding creates breathing room inside an element. border-radius rounds its corners.', example:'.card {\n  padding: 24px;\n  border-radius: 20px;\n}', task:'Give .card 24px padding and a 20px border radius.', starter:'.card {\n  padding: 0;\n}', hint:'Add padding: 24px; and border-radius: 20px; inside the same braces.', validate:code=>/\.card\s*\{[\s\S]*padding\s*:\s*24px[\s\S]*border-radius\s*:\s*20px/i.test(code) },
        { id:'css-2', title:'Flex the layout', time:'5 min', xp:65, icon:'3', intro:'Flexbox is one of the most useful layout systems on the web.', conceptTitle:'display:flex lines children up', explanation:'display:flex turns an element into a flex container. gap adds consistent space between its children.', example:'.actions {\n  display: flex;\n  gap: 12px;\n}', task:'Turn .actions into flex and give its items a 12px gap.', starter:'.actions {\n\n}', hint:'Add display: flex; then gap: 12px;', validate:code=>/\.actions\s*\{[\s\S]*display\s*:\s*flex[\s\S]*gap\s*:\s*12px/i.test(code) },
        { id:'css-3', title:'Make it respond', time:'5 min', xp:70, icon:'4', intro:'Interaction should feel responsive, not static.', conceptTitle:'Pseudo-classes describe states', explanation:':hover applies styles when a pointer is over an element. transition smooths the change instead of snapping instantly.', example:'.button { transition: transform .2s; }\n.button:hover { transform: scale(1.04); }', task:'On hover, scale .button to 1.04.', starter:'.button:hover {\n\n}', hint:'Add transform: scale(1.04);', validate:code=>/\.button:hover\s*\{[\s\S]*transform\s*:\s*scale\(1\.04\)/i.test(code) },
        { id:'css-4', title:'Fit every screen', time:'6 min', xp:80, icon:'5', intro:'Responsive design adapts instead of assuming everyone owns your exact monitor.', conceptTitle:'Media queries add conditional styles', explanation:'@media lets CSS apply only when a condition is true, such as when a screen becomes narrow.', example:'@media (max-width: 700px) {\n  .grid { grid-template-columns: 1fr; }\n}', task:'At 700px or below, make .grid use one column.', starter:'@media (max-width: 700px) {\n  .grid {\n  }\n}', hint:'Inside .grid add grid-template-columns: 1fr;', validate:code=>/@media\s*\([^)]*max-width\s*:\s*700px[^)]*\)[\s\S]*\.grid\s*\{[\s\S]*grid-template-columns\s*:\s*1fr/i.test(code) },
        { id:'css-5', title:'CSS Boss: card system', time:'8 min', xp:130, icon:'★', boss:true, intro:'Build a tiny reusable design system instead of randomly styling each thing.', conceptTitle:'Consistency beats decoration', explanation:'Great interface design reuses spacing, radius, typography and interaction patterns. A small consistent system usually looks more professional than twenty effects.', example:'.card { padding:24px; border-radius:20px; }\n.card:hover { transform:translateY(-2px); }', task:'Style .card with 24px padding, 20px radius, white background, and a hover translateY(-2px).', starter:'.card {\n\n}\n\n.card:hover {\n\n}', hint:'Use padding, border-radius, background in the first rule and transform: translateY(-2px) in the hover rule.', validate:code=>/\.card\s*\{[\s\S]*padding\s*:\s*24px[\s\S]*border-radius\s*:\s*20px[\s\S]*background\s*:\s*(white|#fff(?:fff)?)[\s\S]*\}[\s\S]*\.card:hover\s*\{[\s\S]*translateY\(-2px\)/i.test(code) }
      ]
    },
    js: {
      number:'WORLD 3', title:'JavaScript Motion', description:'Make the page react, remember and do things.', icon:'{ }',
      unlock: () => worldComplete('css'),
      missions: [
        { id:'js-0', title:'Store a value', time:'3 min', xp:50, icon:'1', intro:'JavaScript adds behavior. Variables let your code remember a value.', conceptTitle:'const names a value', explanation:'Use const when you do not plan to reassign the variable. Text values are strings and go inside quotes.', example:'const name = "Alex";', task:'Create a const called name with the value "Learner".', starter:'// write the variable\n', hint:'const name = "Learner";', validate:code=>/const\s+name\s*=\s*["']Learner["']\s*;?/i.test(code) },
        { id:'js-1', title:'Make a function', time:'4 min', xp:60, icon:'2', intro:'Functions package instructions so you can run them whenever you need.', conceptTitle:'A function is reusable behavior', explanation:'Define it once, then call it by writing its name followed by parentheses.', example:'function greet() {\n  console.log("Hello!");\n}\ngreet();', task:'Create a function named greet.', starter:'function () {\n  console.log("Hello!");\n}', hint:'Put greet between the word function and the parentheses.', validate:code=>/function\s+greet\s*\(\s*\)/i.test(code) },
        { id:'js-2', title:'Find an element', time:'4 min', xp:65, icon:'3', intro:'JavaScript can find HTML elements and then change or listen to them.', conceptTitle:'querySelector uses CSS selectors', explanation:'document.querySelector(".card") finds the first element matching .card, just like CSS.', example:'const button = document.querySelector("button");', task:'Create a const called button that selects #save.', starter:'const button = document.querySelector("");', hint:'Put #save inside the quotes.', validate:code=>/const\s+button\s*=\s*document\.querySelector\(\s*["']#save["']\s*\)/i.test(code) },
        { id:'js-3', title:'Listen for a click', time:'5 min', xp:75, icon:'4', intro:'Events are things that happen: clicks, typing, scrolling, submitting and more.', conceptTitle:'Event listeners wait for something to happen', explanation:'addEventListener("click", ...) lets you run code when an element is clicked.', example:'button.addEventListener("click", () => {\n  console.log("Clicked!");\n});', task:'Add a click event listener to button.', starter:'button.addEventListener("", () => {\n  console.log("Clicked!");\n});', hint:'Replace the empty string with "click".', validate:code=>/button\.addEventListener\(\s*["']click["']/i.test(code) },
        { id:'js-4', title:'Toggle a class', time:'5 min', xp:80, icon:'5', intro:'A clean way to create UI behavior is letting JavaScript toggle classes while CSS controls the look.', conceptTitle:'classList connects behavior to styling', explanation:'classList.toggle adds a class if it is missing and removes it if it already exists.', example:'document.body.classList.toggle("dark");', task:'Toggle the class dark on document.body.', starter:'document.body.classList.("dark");', hint:'The missing method is toggle.', validate:code=>/document\.body\.classList\.toggle\(\s*["']dark["']\s*\)/i.test(code) },
        { id:'js-5', title:'JavaScript Boss: theme button', time:'8 min', xp:140, icon:'★', boss:true, intro:'Connect the full chain: find an element, listen for interaction, change the page.', conceptTitle:'Small pieces become a feature', explanation:'Most interface code is just a sequence: select something → listen for an event → update state or classes.', example:'const theme = document.querySelector("#theme");\ntheme.addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});', task:'Select #theme into a const called theme, listen for click, then toggle dark on body.', starter:'// build the theme button logic\n', hint:'You need querySelector("#theme"), addEventListener("click", ...), and document.body.classList.toggle("dark").', validate:code=>/const\s+theme\s*=\s*document\.querySelector\(\s*["']#theme["']\s*\)[\s\S]*theme\.addEventListener\(\s*["']click["'][\s\S]*document\.body\.classList\.toggle\(\s*["']dark["']/i.test(code) }
      ]
    }
  };

  const finalMission = {
    id:'final-build', title:'Final Boss: Zero → Website', time:'15–30 min', xp:500,
    intro:'This one is intentionally open. Build a small landing page from scratch using the HTML ideas you unlocked.',
    conceptTitle:'You do not need to memorize everything',
    explanation:'A real developer combines small known pieces, tests them, fixes mistakes, and looks things up when needed. That is exactly what this challenge asks you to do.',
    example:'<!-- Your structure, your words, your page. -->',
    task:'Build a page with header, main, h1, a link, an image with non-empty alt text, a form, and footer.',
    starter:'<!doctype html>\n<html>\n  <body>\n    \n  </body>\n</html>',
    hint:'Build the structure first: header → main → footer. Then add h1, a, img and form inside main.',
    validate: code => {
      const doc = parseHTML(code);
      const img = doc.querySelector('img');
      return !!doc.querySelector('header') && !!doc.querySelector('main h1') && !!doc.querySelector('main a[href]') && !!img?.getAttribute('alt')?.trim() && !!doc.querySelector('form') && !!doc.querySelector('footer');
    }
  };

  const pins = [
    { id:'first-steps', icon:'◆', title:'First Steps', desc:'Complete your first mission.', condition: () => state.completed.length >= 1 },
    { id:'tag-tamer', icon:'<>', title:'Tag Tamer', desc:'Complete 3 HTML missions.', condition: () => completedInWorld('html') >= 3 },
    { id:'html-hero', icon:'★', title:'HTML Hero', desc:'Beat the HTML boss.', condition: () => state.completed.includes('html-7') },
    { id:'combo-three', icon:'⚡', title:'Hot Streak', desc:'Reach a x3 Quickfire combo.', condition: () => state.bestQuickfireCombo >= 3 },
    { id:'secret-tag', icon:'?', title:'Source Sleuth', desc:'Discover the secret playground quest.', condition: () => !!state.secretFound },
    { id:'web-builder', icon:'⌘', title:'Web Builder', desc:'Beat the final build.', condition: () => state.completed.includes('final-build') }
  ];

  const arenaChallenges = [
    { id:'arena-h1', title:'Give the page a real heading', instruction:'Change the code so the page contains an <h1> that says “Hello, web!”', starter:'<p>Hello, web!</p>', hint:'The p is the wrong element. Change it to h1.', validate:code=>/<h1\b[^>]*>\s*Hello,\s*web!\s*<\/h1>/i.test(code) },
    { id:'arena-link', title:'Fix the broken link', instruction:'Make “Docs” link to https://developer.mozilla.org.', starter:'<a>Docs</a>', hint:'The anchor is missing its href attribute.', validate:code=>/<a\b[^>]*href=["']https:\/\/developer\.mozilla\.org\/?["'][^>]*>\s*Docs\s*<\/a>/i.test(code) },
    { id:'arena-class', title:'Make the cards reusable', instruction:'Give both divs the class “card”.', starter:'<div>One</div>\n<div>Two</div>', hint:'Add class="card" inside both opening div tags.', validate:code=>{ const ds=[...parseHTML(code).querySelectorAll('div.card')]; return ds.length>=2; } },
    { id:'arena-form', title:'Use the right input', instruction:'Turn the input into an email input.', starter:'<label>Email <input type="text"></label>', hint:'Change type="text" to type="email".', validate:code=>!!parseHTML(code).querySelector('input[type="email"]') }
  ];

  const quizQuestions = [
    { q:'Which tag is normally the main page heading?', options:['<h1>','<head>','<p>','<title>'], answer:0, why:'<h1> represents the highest-level content heading.' },
    { q:'Which attribute tells a link where to go?', options:['src','href','alt','class'], answer:1, why:'href stores the link destination.' },
    { q:'What does the slash mean in </p>?', options:['Make it bold','Start a tag','End the element','Add a class'], answer:2, why:'The slash marks a closing tag.' },
    { q:'Which attribute should describe an image?', options:['href','alt','type','id'], answer:1, why:'alt provides a useful text alternative for the image.' },
    { q:'Which one is usually reusable?', options:['class','id','doctype','title'], answer:0, why:'Classes are designed to be shared by multiple elements.' },
    { q:'What is nesting?', options:['Deleting HTML','Putting elements inside elements','Making text bold','Opening DevTools'], answer:1, why:'Nesting creates parent/child structure.' },
    { q:'Which element collects user information?', options:['<input>','<strong>','<footer>','<img>'], answer:0, why:'input is built for collecting values.' },
    { q:'Where does visible page content normally live?', options:['<head>','<meta>','<body>','<!doctype>'], answer:2, why:'The body contains the document content shown to visitors.' }
  ];

  const defaultState = {
    name:'Learner', xp:0, completed:[], arenaCompleted:[], pins:[], streak:1,
    lastVisit:'', todayDate:'', todayCount:0, dailyRewardDate:'',
    bestQuickfireCombo:1, secretFound:false
  };

  let state = loadState();
  let currentWorld = 'html';
  let currentMission = null;
  let currentMissionWorld = null;
  let currentMissionIndex = -1;
  let arenaIndex = 0;
  let arenaCombo = 1;
  let qfScore = 0;
  let qfCombo = 1;
  let qfCurrent = null;
  let qfAnswered = false;
  let qfXpThisSession = 0;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return { ...defaultState, ...(saved || {}), completed:[...(saved?.completed || [])], arenaCompleted:[...(saved?.arenaCompleted || [])], pins:[...(saved?.pins || [])] };
    } catch { return { ...defaultState }; }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

  function todayString(date = new Date()) {
    const y = date.getFullYear(); const m = String(date.getMonth()+1).padStart(2,'0'); const d = String(date.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  }

  function dayDiff(a, b) {
    const [ay,am,ad] = a.split('-').map(Number); const [by,bm,bd] = b.split('-').map(Number);
    return Math.round((Date.UTC(by,bm-1,bd)-Date.UTC(ay,am-1,ad))/86400000);
  }

  function updateVisit() {
    const today = todayString();
    if (!state.lastVisit) state.streak = 1;
    else if (state.lastVisit !== today) {
      const diff = dayDiff(state.lastVisit, today);
      state.streak = diff === 1 ? Math.max(1,state.streak+1) : 1;
    }
    if (state.todayDate !== today) { state.todayDate = today; state.todayCount = 0; }
    state.lastVisit = today;
    saveState();
  }

  function parseHTML(code) { return new DOMParser().parseFromString(code, 'text/html'); }
  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
  function completedInWorld(key) { return worlds[key].missions.filter(m => state.completed.includes(m.id)).length; }
  function worldComplete(key) { return completedInWorld(key) === worlds[key].missions.length; }
  function levelForXp(xp=state.xp) { return Math.floor(xp / 150) + 1; }
  function xpInLevel(xp=state.xp) { return xp % 150; }
  function titleForLevel(level) {
    if (level >= 12) return 'Web Crafter';
    if (level >= 8) return 'Code Explorer';
    if (level >= 5) return 'Tag Tamer';
    if (level >= 3) return 'Page Builder';
    return 'First Steps';
  }

  function addXp(amount, reason='XP earned') {
    const before = levelForXp();
    state.xp += amount;
    const after = levelForXp();
    saveState();
    updateHUD();
    showToast(`+${amount} XP · ${reason}`);
    if (after > before) showLevelUp(after);
  }

  function showLevelUp(level) {
    const box = $('#levelUp');
    $('#levelUpText').textContent = `Level ${level} · ${titleForLevel(level)}`;
    box.classList.add('show');
    setTimeout(() => box.classList.remove('show'), 2200);
    confetti(26);
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function confetti(count=18) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layer = $('#confettiLayer');
    const colors = ['#0071e3','#8b5cf6','#ff7a00','#34c759','#ff375f'];
    for (let i=0;i<count;i++) {
      const piece = document.createElement('i');
      piece.className = 'confetti-piece';
      piece.style.left = `${8 + Math.random()*84}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random()*.18}s`;
      piece.style.setProperty('--drift', `${-90 + Math.random()*180}px`);
      layer.appendChild(piece);
      setTimeout(() => piece.remove(), 1700);
    }
  }

  function firstIncompleteMission(worldKey='html') {
    const world = worlds[worldKey];
    const index = world.missions.findIndex(m => !state.completed.includes(m.id));
    return { worldKey, index: index === -1 ? world.missions.length-1 : index, mission: index === -1 ? world.missions.at(-1) : world.missions[index] };
  }

  function nextOverallMission() {
    for (const key of ['html','css','js']) {
      if (!worlds[key].unlock()) continue;
      const found = worlds[key].missions.findIndex(m => !state.completed.includes(m.id));
      if (found !== -1) return { worldKey:key, index:found, mission:worlds[key].missions[found] };
    }
    return { worldKey:'html', index:worlds.html.missions.length-1, mission:worlds.html.missions.at(-1) };
  }

  function updateHUD() {
    const level = levelForXp();
    const xpPart = xpInLevel();
    const pinCount = state.pins.length;
    const completedCount = state.completed.filter(id => id !== 'final-build').length;
    const name = (state.name || 'Learner').trim() || 'Learner';
    const initial = name[0]?.toUpperCase() || 'L';
    $('#navStreak').textContent = state.streak;
    $('#navXp').textContent = state.xp;
    $('#profileAvatar').textContent = initial;
    $('#heroGreeting').textContent = `Ready, ${name}?`;
    $('#heroLevel').textContent = `Lv. ${level}`;
    $('#heroXpBar').style.width = `${(xpPart/150)*100}%`;
    $('#heroXpText').textContent = `${xpPart} / 150 XP`;
    $('#heroMissions').textContent = completedCount;
    $('#heroStreak').textContent = state.streak;
    $('#heroPins').textContent = pinCount;
    $('#dailyMissionProgress').textContent = Math.min(state.todayCount,2);
    const nextPin = pins.find(p => !state.pins.includes(p.id));
    $('#heroNextReward').textContent = nextPin ? `Next: ${nextPin.title} pin` : 'All core pins unlocked';

    const next = nextOverallMission();
    $('#nextMissionTitle').textContent = next.mission.title;
    $('#nextMissionMeta').textContent = `${next.mission.time} · +${next.mission.xp} XP`;
    $('#continueButton').innerHTML = `${completedCount ? 'Continue learning' : 'Start mission 1'} <span aria-hidden="true">→</span>`;

    $('#bigAvatar').textContent = initial;
    $('#profileNameDisplay').textContent = name;
    $('#profileLevelText').textContent = `Level ${level} · ${titleForLevel(level)}`;
    $('#profileXp').textContent = state.xp;
    $('#profileCompleted').textContent = completedCount;
    $('#profileStreak').textContent = state.streak;
    $('#profilePins').textContent = pinCount;
    $('#profileNameInput').value = name;

    const htmlDone = worldComplete('html');
    const finalDone = state.completed.includes('final-build');
    const finalButton = $('#finalBossButton');
    finalButton.disabled = !htmlDone;
    finalButton.textContent = finalDone ? 'Final boss complete ✓' : htmlDone ? 'Start the final build →' : 'Locked — finish HTML first';
    $('#bossLock').textContent = finalDone ? '✓' : htmlDone ? '⚡' : '🔒';

    renderRewards();
    if (currentWorld) renderWorld(currentWorld);
  }

  function renderWorld(key) {
    currentWorld = key;
    const world = worlds[key];
    const unlocked = world.unlock();
    $('#worldNumber').textContent = world.number;
    $('#worldTitle').textContent = unlocked ? world.title : `${world.title} · Locked`;
    $('#worldDescription').textContent = unlocked ? world.description : key === 'css' ? 'Beat the HTML boss to unlock this world.' : 'Beat the CSS boss to unlock this world.';
    const count = completedInWorld(key);
    const pct = Math.round((count/world.missions.length)*100);
    $('#worldProgressPercent').textContent = `${pct}%`;
    $('#worldProgressRing').style.setProperty('--progress', `${pct}%`);

    const path = $('#questPath');
    path.innerHTML = '';
    world.missions.forEach((mission,index) => {
      const done = state.completed.includes(mission.id);
      const previousDone = index === 0 || state.completed.includes(world.missions[index-1].id);
      const available = unlocked && (done || previousDone);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `quest-node ${mission.boss ? 'boss ' : ''}${done ? 'completed' : available ? 'available' : 'locked'}`;
      button.disabled = !available;
      button.innerHTML = `<span class="quest-orb">${done ? '✓' : available ? escapeHTML(mission.icon) : '🔒'}</span><strong>${escapeHTML(mission.title)}</strong><small>${done ? 'Completed' : available ? `${mission.time} · +${mission.xp} XP` : 'Locked'}</small>`;
      if (available) button.addEventListener('click', () => openMission(key,index));
      path.appendChild(button);
    });
  }

  function renderRewards() {
    const shelf = $('#rewardShelf');
    if (!shelf) return;
    shelf.innerHTML = '';
    pins.forEach(pin => {
      const unlocked = state.pins.includes(pin.id);
      const card = document.createElement('article');
      card.className = `reward-card ${unlocked ? '' : 'locked'}`;
      card.innerHTML = `${unlocked ? '' : '<span class="reward-lock">🔒</span>'}<div class="reward-icon">${escapeHTML(pin.icon)}</div><strong>${escapeHTML(pin.title)}</strong><small>${escapeHTML(pin.desc)}</small>`;
      shelf.appendChild(card);
    });
  }

  function checkPinUnlocks(show=true) {
    const newly = [];
    for (const pin of pins) {
      if (!state.pins.includes(pin.id) && pin.condition()) {
        state.pins.push(pin.id);
        newly.push(pin);
      }
    }
    if (newly.length) {
      saveState();
      renderRewards();
      updateHUD();
      if (show) showReward(newly[0]);
    }
  }

  function showReward(pin) {
    $('#rewardBigIcon').textContent = pin.icon;
    $('#rewardTitle').textContent = pin.title;
    $('#rewardDescription').textContent = pin.desc;
    $('#rewardDialog').showModal();
    confetti(32);
  }

  function syntaxExample(code) {
    return escapeHTML(code)
      .replace(/(&lt;\/?)([a-z0-9-]+)/gi,'$1<span class="tag">$2</span>')
      .replace(/\b([a-z-]+)=(&quot;.*?&quot;)/gi,'<span class="attr">$1</span>=<span class="string">$2</span>');
  }

  function openMission(worldKey, index, customMission=null) {
    const world = worlds[worldKey];
    const mission = customMission || world.missions[index];
    if (!mission) return;
    currentMission = mission;
    currentMissionWorld = worldKey;
    currentMissionIndex = index;
    const total = customMission ? 1 : world.missions.length;
    const displayIndex = customMission ? 1 : index+1;
    $('#missionXpPill').textContent = `+${mission.xp} XP`;
    $('#missionProgressBar').style.width = `${(displayIndex/total)*100}%`;
    $('#missionIntro').innerHTML = `<span class="mission-count">${customMission ? 'FINAL BOSS' : `${world.number} · MISSION ${displayIndex}/${total}`}</span><h2>${escapeHTML(mission.title)}</h2><p>${escapeHTML(mission.intro)}</p>`;
    $('#missionLesson').innerHTML = `<div class="learn-card"><span>THE IDEA</span><h3>${escapeHTML(mission.conceptTitle)}</h3><p>${escapeHTML(mission.explanation)}</p></div><pre class="learn-code"><code>${syntaxExample(mission.example)}</code></pre>`;
    $('#missionTask').innerHTML = `<div class="mission-task-head"><span>YOUR TURN</span><h3>${escapeHTML(mission.task)}</h3><p>Change the code below. You can try as many times as you want.</p></div><div class="mission-editor-wrap"><div class="panel-bar"><span>${worldKey === 'css' ? 'style.css' : worldKey === 'js' ? 'script.js' : 'index.html'}</span><span>Editable</span></div><textarea id="missionEditor" spellcheck="false" aria-label="Mission code editor">${escapeHTML(mission.starter)}</textarea></div><div class="mission-feedback" id="missionFeedback" aria-live="polite">Nothing is submitted until you press Check answer.</div>`;
    $('#missionCheck').textContent = state.completed.includes(mission.id) ? 'Completed · Continue' : 'Check answer';
    $('#missionCheck').dataset.done = state.completed.includes(mission.id) ? 'true' : 'false';
    $('#missionDialog').showModal();
    setTimeout(() => $('#missionEditor')?.focus(), 120);
  }

  function completeMission(mission) {
    const firstTime = !state.completed.includes(mission.id);
    if (!firstTime) return false;
    state.completed.push(mission.id);
    state.todayCount += 1;
    saveState();
    addXp(mission.xp, 'Mission complete');
    confetti(mission.boss ? 34 : 18);
    if (state.todayCount >= 2 && state.dailyRewardDate !== todayString()) {
      state.dailyRewardDate = todayString();
      saveState();
      setTimeout(() => addXp(50,'Daily quest complete'), 500);
    }
    checkPinUnlocks(true);
    return true;
  }

  function proceedAfterMission() {
    $('#missionDialog').close();
    if (currentMission?.id === 'final-build') { updateHUD(); return; }
    const world = worlds[currentMissionWorld];
    const nextIndex = currentMissionIndex + 1;
    updateHUD();
    if (nextIndex < world.missions.length) setTimeout(() => openMission(currentMissionWorld,nextIndex), 180);
    else if (currentMissionWorld === 'html') { renderWorld('html'); showToast('HTML world complete · CSS unlocked'); }
    else if (currentMissionWorld === 'css') { renderWorld('css'); showToast('CSS world complete · JavaScript unlocked'); }
  }

  function setupMissionDialog() {
    $('#closeMission').addEventListener('click', () => $('#missionDialog').close());
    $('#missionHint').addEventListener('click', () => {
      const feedback = $('#missionFeedback');
      if (!feedback || !currentMission) return;
      feedback.textContent = `Hint: ${currentMission.hint}`;
      feedback.className = 'mission-feedback';
    });
    $('#missionCheck').addEventListener('click', () => {
      if (!currentMission) return;
      if ($('#missionCheck').dataset.done === 'true') { proceedAfterMission(); return; }
      const code = $('#missionEditor')?.value || '';
      const feedback = $('#missionFeedback');
      let good = false;
      try { good = !!currentMission.validate(code); } catch { good = false; }
      if (good) {
        feedback.textContent = 'Perfect. You used the concept correctly. ✓';
        feedback.className = 'mission-feedback good';
        completeMission(currentMission);
        $('#missionCheck').dataset.done = 'true';
        $('#missionCheck').textContent = currentMission.id === 'final-build' ? 'Finish' : 'Continue →';
      } else {
        feedback.textContent = 'Not quite yet. Compare your code with the task — your progress is safe.';
        feedback.className = 'mission-feedback bad';
      }
    });
  }

  function renderArena() {
    const challenge = arenaChallenges[arenaIndex];
    $('#arenaTitle').textContent = challenge.title;
    $('#arenaInstruction').textContent = challenge.instruction;
    $('#arenaCode').value = challenge.starter;
    $('#arenaFeedback').className = 'arena-feedback';
    $('#arenaFeedback').querySelector('p').textContent = 'Make your change, then check it.';
    updateArenaPreview();
  }

  function updateArenaPreview() {
    const code = $('#arenaCode').value;
    $('#arenaPreview').srcdoc = `<!doctype html><html><head><style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding:28px;color:#1d1d1f}button,input{font:inherit}a{color:#0071e3}.card{padding:12px;margin:8px 0;border:1px solid #ddd;border-radius:12px}</style></head><body>${code}</body></html>`;
  }

  function setupArena() {
    $('#arenaCode').addEventListener('input', updateArenaPreview);
    $('#arenaReset').addEventListener('click', renderArena);
    $('#arenaHint').addEventListener('click', () => showToast(arenaChallenges[arenaIndex].hint));
    $('#checkArena').addEventListener('click', checkArena);
    $('#arenaCode').addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); checkArena(); }
      if (e.key === 'Tab') { e.preventDefault(); const t=e.currentTarget,s=t.selectionStart,en=t.selectionEnd;t.value=t.value.slice(0,s)+'  '+t.value.slice(en);t.selectionStart=t.selectionEnd=s+2;updateArenaPreview(); }
    });
    renderArena();
  }

  function checkArena() {
    const challenge = arenaChallenges[arenaIndex];
    const code = $('#arenaCode').value;
    const feedback = $('#arenaFeedback');
    if (challenge.validate(code)) {
      feedback.className = 'arena-feedback success';
      feedback.querySelector('p').textContent = `Correct — x${arenaCombo} combo. Loading the next challenge…`;
      if (!state.arenaCompleted.includes(challenge.id)) {
        state.arenaCompleted.push(challenge.id); saveState(); addXp(20 * arenaCombo,'Arena clear');
      }
      arenaCombo = Math.min(5,arenaCombo+1);
      $('#comboValue').textContent = `x${arenaCombo}`;
      confetti(12);
      setTimeout(() => { arenaIndex=(arenaIndex+1)%arenaChallenges.length; renderArena(); }, 950);
    } else {
      arenaCombo = 1; $('#comboValue').textContent = 'x1';
      feedback.className = 'arena-feedback error';
      feedback.querySelector('p').textContent = 'Close, but the requirement is not true yet. Try the hint if you are stuck.';
    }
  }

  function newQuizQuestion() {
    qfAnswered = false;
    let next;
    do { next = quizQuestions[Math.floor(Math.random()*quizQuestions.length)]; } while (next === qfCurrent && quizQuestions.length > 1);
    qfCurrent = next;
    $('#quizCounter').textContent = `Question ${qfScore+1}`;
    $('#quizQuestion').textContent = next.q;
    $('#quizResult').textContent = 'Pick an answer.';
    const options = $('#quizOptions'); options.innerHTML='';
    next.options.forEach((text,index) => {
      const btn=document.createElement('button'); btn.type='button'; btn.className='quiz-option'; btn.textContent=text;
      btn.addEventListener('click',()=>answerQuiz(index,btn)); options.appendChild(btn);
    });
  }

  function answerQuiz(index,button) {
    if (qfAnswered) return;
    qfAnswered=true;
    const buttons=$$('.quiz-option',$('#quizOptions'));
    buttons.forEach((b,i)=>{ b.disabled=true; if(i===qfCurrent.answer)b.classList.add('correct'); });
    if(index===qfCurrent.answer) {
      qfScore++; qfCombo=Math.min(9,qfCombo+1);
      button.classList.add('correct');
      $('#quizResult').textContent=`Correct. ${qfCurrent.why}`;
      if (qfXpThisSession < 40) { qfXpThisSession += 5; addXp(5,'Quickfire'); }
      state.bestQuickfireCombo=Math.max(state.bestQuickfireCombo,qfCombo); saveState(); checkPinUnlocks(true);
      if(qfCombo>=3) confetti(8);
    } else {
      qfCombo=1; button.classList.add('wrong');
      $('#quizResult').textContent=`Not this one. ${qfCurrent.why}`;
    }
    $('#qfScore').textContent=qfScore; $('#qfCombo').textContent=`x${qfCombo}`;
    setTimeout(newQuizQuestion,1400);
  }

  function setupQuickfire() { $('#newQuiz').addEventListener('click',newQuizQuestion); newQuizQuestion(); }

  function updatePlayground() {
    const html=$('#htmlEditor').value; const css=$('#cssEditor').value;
    $('#playgroundFrame').srcdoc=`<!doctype html><html><head><style>${css}</style></head><body>${html}</body></html>`;
    if (!state.secretFound && /<!--/.test(html)) {
      state.secretFound=true; saveState(); addXp(70,'Secret quest found'); checkPinUnlocks(true); confetti(30);
    }
  }

  function setupPlayground() {
    $$('.code-tab').forEach(tab=>tab.addEventListener('click',()=>{
      $$('.code-tab').forEach(t=>t.classList.toggle('active',t===tab));
      $$('.editor-area').forEach(e=>e.classList.toggle('active',e.dataset.editor===tab.dataset.codeTab));
    }));
    $('#htmlEditor').addEventListener('input',updatePlayground); $('#cssEditor').addEventListener('input',updatePlayground);
    [$('#htmlEditor'),$('#cssEditor')].forEach(editor=>editor.addEventListener('keydown',e=>{ if(e.key==='Tab'){e.preventDefault();const s=editor.selectionStart,en=editor.selectionEnd;editor.value=editor.value.slice(0,s)+'  '+editor.value.slice(en);editor.selectionStart=editor.selectionEnd=s+2;updatePlayground();} }));
    $('#formatPlayground').addEventListener('click',()=>{
      $('#htmlEditor').value='<main class="card">\n  <p class="tiny">My first page</p>\n  <h1>Hello, web!</h1>\n  <p>I can change this code myself.</p>\n  <button>Nice.</button>\n</main>';
      $('#cssEditor').value='body {\n  font-family: -apple-system, BlinkMacSystemFont, sans-serif;\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n  margin: 0;\n  background: #f5f5f7;\n}\n.card {\n  width: min(420px, 80%);\n  padding: 32px;\n  border-radius: 28px;\n  background: white;\n}\nbutton {\n  border: 0;\n  border-radius: 999px;\n  padding: 10px 16px;\n}';
      updatePlayground(); showToast('Playground reset');
    });
    const surprises=[
      {html:'<div class="poster"><span>BUILD 01</span><h1>Make weird things.</h1><p>The browser is your canvas.</p></div>',css:'body{margin:0;min-height:100vh;display:grid;place-items:center;background:#111;color:white;font-family:-apple-system,sans-serif}.poster{max-width:420px;padding:48px}.poster span{font-size:10px;letter-spacing:.2em;color:#888}.poster h1{font-size:58px;line-height:.9;letter-spacing:-.06em;margin:14px 0}.poster p{color:#aaa}'},
      {html:'<button class="pill">Hover me</button>',css:'body{min-height:100vh;margin:0;display:grid;place-items:center;font-family:-apple-system,sans-serif;background:#f5f5f7}.pill{border:0;border-radius:999px;padding:14px 22px;background:#0071e3;color:#fff;font-weight:700;transition:.2s}.pill:hover{transform:scale(1.08) rotate(-2deg)}'},
      {html:'<!-- secret found -->\n<h1>👀 You found it.</h1>\n<p>Comments are hidden from the page, but developers can read them in source.</p>',css:'body{font-family:-apple-system,sans-serif;padding:40px;background:#fff}h1{font-size:42px;letter-spacing:-.04em}p{max-width:500px;color:#6e6e73;line-height:1.5}'}
    ];
    $('#surpriseMe').addEventListener('click',()=>{const s=surprises[Math.floor(Math.random()*surprises.length)];$('#htmlEditor').value=s.html;$('#cssEditor').value=s.css;updatePlayground();showToast('New experiment loaded ✦');});
    updatePlayground();
  }

  function setupProfile() {
    $('#profileButton').addEventListener('click',()=>$('#profileDialog').showModal());
    $('#closeProfile').addEventListener('click',()=>$('#profileDialog').close());
    $('#saveProfile').addEventListener('click',()=>{state.name=$('#profileNameInput').value.trim()||'Learner';saveState();updateHUD();$('#profileDialog').close();showToast('Profile saved');});
    $('#resetProgress').addEventListener('click',()=>{
      if (!confirm('Reset all HTML Quest progress on this browser? This cannot be undone.')) return;
      state={...defaultState,lastVisit:todayString(),todayDate:todayString()};saveState();updateHUD();renderWorld('html');$('#profileDialog').close();showToast('Progress reset');
    });
  }

  function setupNavigation() {
    const menu=$('#mobileMenu'); const menuButton=$('#menuButton');
    menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-hidden',String(!open));});
    $$('a',menu).forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menu.setAttribute('aria-hidden','true');}));
    window.addEventListener('scroll',()=>{
      const max=document.documentElement.scrollHeight-innerHeight; const pct=max>0?(scrollY/max)*100:0; $('#pageProgress').style.width=`${pct}%`;
    },{passive:true});
    $$('.world-tab').forEach(tab=>tab.addEventListener('click',()=>{
      const key=tab.dataset.world;
      $$('.world-tab').forEach(t=>{const active=t===tab;t.classList.toggle('active',active);t.setAttribute('aria-selected',String(active));});
      renderWorld(key);
    }));
    const startNext=()=>{const next=nextOverallMission();openMission(next.worldKey,next.index);};
    $('#continueButton').addEventListener('click',startNext); $('#nextMissionPlay').addEventListener('click',startNext);
    $('#finalBossButton').addEventListener('click',()=>{if(worldComplete('html'))openMission('html',0,finalMission);});
    $('#claimReward').addEventListener('click',()=>$('#rewardDialog').close());
  }

  function setupReveal() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { $$('.reveal').forEach(el=>el.classList.add('visible')); return; }
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
    $$('.reveal').forEach(el=>observer.observe(el));
  }

  updateVisit();
  setupNavigation();
  setupMissionDialog();
  setupArena();
  setupQuickfire();
  setupPlayground();
  setupProfile();
  setupReveal();
  checkPinUnlocks(false);
  updateHUD();
  renderWorld('html');
})();
