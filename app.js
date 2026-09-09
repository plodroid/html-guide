(() => {
  'use strict';

  const DATA = window.CODEBLOOM;
  if (!DATA) return;

  const STORAGE_KEY = 'codebloom-progress-v2';
  const THEME_KEY = 'codebloom-theme';
  const courseColors = {
    orange: '#e66a2c', blue: '#2997ff', yellow: '#d6a600', green: '#2aa56b',
    slate: '#65727e', indigo: '#5856d6', purple: '#9b59ff', black: '#1d1d1f'
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));

  let state = loadState();
  let activeFilter = 'all';
  let activeLabCourse = DATA.courses[0];
  let toastTimer;
  let openLessonInfo = null;

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        completed: Array.isArray(parsed.completed) ? parsed.completed : [],
        lastLesson: parsed.lastLesson || null
      };
    } catch {
      return { completed: [], lastLesson: null };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function allLessons() {
    return DATA.courses.flatMap(course => course.lessons.map((lesson, index) => ({ course, lesson, index })));
  }

  function completedSet() {
    return new Set(state.completed);
  }

  function courseProgress(course) {
    const completed = completedSet();
    const count = course.lessons.filter(lesson => completed.has(lesson.id)).length;
    return { count, total: course.lessons.length, percent: Math.round((count / course.lessons.length) * 100) };
  }

  function totalProgress() {
    const lessons = allLessons();
    const done = completedSet();
    const completedLessons = lessons.filter(item => done.has(item.lesson.id));
    const totalXp = lessons.reduce((sum, item) => sum + item.lesson.xp, 0);
    const xp = completedLessons.reduce((sum, item) => sum + item.lesson.xp, 0);
    const startedCourses = DATA.courses.filter(course => course.lessons.some(lesson => done.has(lesson.id))).length;
    return {
      done: completedLessons.length,
      total: lessons.length,
      percent: lessons.length ? Math.round((completedLessons.length / lessons.length) * 100) : 0,
      xp,
      totalXp,
      startedCourses
    };
  }

  function findNextLesson() {
    const done = completedSet();
    if (state.lastLesson) {
      const lastCourse = DATA.courses.find(course => course.lessons.some(lesson => lesson.id === state.lastLesson));
      if (lastCourse) {
        const nextIndex = lastCourse.lessons.findIndex(lesson => !done.has(lesson.id));
        if (nextIndex >= 0) return { course: lastCourse, lesson: lastCourse.lessons[nextIndex], index: nextIndex };
      }
    }
    for (const course of DATA.courses) {
      const index = course.lessons.findIndex(lesson => !done.has(lesson.id));
      if (index >= 0) return { course, lesson: course.lessons[index], index };
    }
    return { course: DATA.courses[0], lesson: DATA.courses[0].lessons[0], index: 0 };
  }

  function renderTracks() {
    const grid = $('#trackGrid');
    const courses = DATA.courses.filter(course => activeFilter === 'all' || course.category === activeFilter);
    grid.innerHTML = courses.map(course => {
      const p = courseProgress(course);
      const color = courseColors[course.color] || '#0071e3';
      const status = p.percent === 100 ? 'Completed' : p.count ? 'Continue' : 'Start';
      return `
        <article class="track-card reveal visible" tabindex="0" role="button" data-course="${escapeHTML(course.id)}" style="--course-color:${color}">
          <div class="track-top">
            <span class="track-icon">${escapeHTML(course.icon)}</span>
            <span class="track-status">${status}</span>
          </div>
          <h3>${escapeHTML(course.name)}</h3>
          <div class="tagline">${escapeHTML(course.tagline)}</div>
          <p>${escapeHTML(course.description)}</p>
          <div class="track-meta"><span>${course.lessons.length} beginner lessons</span><strong>${p.percent}%</strong></div>
          <div class="mini-track" style="--pct:${p.percent}%"><i></i></div>
        </article>`;
    }).join('');

    $$('.track-card', grid).forEach(card => {
      const open = () => openCourse(card.dataset.course);
      card.addEventListener('click', open);
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
      });
    });
  }

  function openCourse(courseId) {
    const course = DATA.courses.find(item => item.id === courseId);
    if (!course) return;
    const done = completedSet();
    let index = course.lessons.findIndex(lesson => !done.has(lesson.id));
    if (index < 0) index = 0;
    openLesson(course.id, index);
  }

  function renderProgress() {
    const total = totalProgress();
    const ring = $('#progressRing');
    ring.style.setProperty('--p', `${total.percent * 3.6}deg`);
    $('#progressPercent').textContent = `${total.percent}%`;
    $('#navXp').textContent = `${total.xp} XP`;

    $('#progressBigPercent').textContent = `${total.percent}%`;
    $('#progressBigBar').style.width = `${total.percent}%`;
    $('#progressXp').textContent = total.xp;
    $('#progressLessons').textContent = total.done;
    $('#progressCourses').textContent = total.startedCourses;

    $('#courseProgressList').innerHTML = DATA.courses.map(course => {
      const p = courseProgress(course);
      return `<div class="course-progress-item"><strong>${escapeHTML(course.name)}</strong><div class="tinybar"><i style="width:${p.percent}%"></i></div><span>${p.count}/${p.total}</span></div>`;
    }).join('');

    const next = findNextLesson();
    $('#continueBadge').textContent = next.course.name;
    $('#continueBadge').style.background = courseColors[next.course.color] || '#1d1d1f';
    $('#continueStep').textContent = `Lesson ${next.index + 1} of ${next.course.lessons.length} · ${next.lesson.minutes} min`;
    $('#continueLesson').textContent = next.lesson.title;
    $('#continueDescription').textContent = next.lesson.intro;
    $('#continueTitle').textContent = total.done === total.total ? 'You cleared the beginner path.' : (total.done ? 'Pick up where you left off.' : 'Your first mission is ready.');
  }

  function openLesson(courseId, index) {
    const course = DATA.courses.find(item => item.id === courseId);
    if (!course || !course.lessons[index]) return;
    const lesson = course.lessons[index];
    openLessonInfo = { course, index, lesson };
    state.lastLesson = lesson.id;
    saveState();

    $('#lessonLanguage').textContent = course.name;
    $('#lessonPosition').textContent = `Lesson ${index + 1} of ${course.lessons.length}`;
    $('#lessonProgressBar').style.width = `${((index + 1) / course.lessons.length) * 100}%`;
    $('#lessonSteps').innerHTML = [
      ['Understand', 'lesson-understand'],
      ['See it', 'lesson-example'],
      ['Try it', 'lesson-challenge']
    ].map((step, i) => `<button type="button" class="lesson-step-button ${i === 0 ? 'active' : ''}" data-scroll="${step[1]}"><span>${i + 1}</span>${step[0]}</button>`).join('');

    const isDone = completedSet().has(lesson.id);
    const nextLabel = index < course.lessons.length - 1 ? `Next lesson →` : `Finish ${course.name} →`;
    $('#lessonContent').innerHTML = `
      <section id="lesson-understand">
        <p class="lesson-kicker">${escapeHTML(course.name)} · ${lesson.minutes} min · ${lesson.xp} XP</p>
        <h2>${escapeHTML(lesson.title)}</h2>
        <p class="lesson-intro">${escapeHTML(lesson.intro)}</p>
        <div class="explain-grid">
          ${lesson.explain.map(item => `<article class="explain-card"><code>${escapeHTML(item[0])}</code><p>${escapeHTML(item[1])}</p></article>`).join('')}
        </div>
      </section>
      <section id="lesson-example">
        <div class="lesson-code-box">
          <div class="lesson-code-head"><span>${escapeHTML(course.filename)}</span><span>EXAMPLE</span></div>
          <pre><code>${escapeHTML(lesson.code)}</code></pre>
        </div>
        <div class="output-note"><strong>What happens:</strong> ${escapeHTML(lesson.output)}</div>
      </section>
      <section class="challenge-box" id="lesson-challenge">
        <h3>Your turn</h3>
        <p>${escapeHTML(lesson.challenge)}</p>
        <textarea class="challenge-editor" id="challengeEditor" spellcheck="false" aria-label="Your answer">${escapeHTML(lesson.starter)}</textarea>
        <div class="challenge-actions">
          <button class="hint-button" id="hintButton" type="button">Need a hint?</button>
          <button class="check-button" id="checkChallenge" type="button">${isDone ? 'Check again' : 'Check my code'}</button>
        </div>
        <div class="lesson-feedback ${isDone ? 'good' : ''}" id="lessonFeedback">${isDone ? '✓ You already completed this lesson.' : 'Your code stays on this device.'}</div>
      </section>
      <div class="next-row"><button class="next-lesson-button" id="nextLessonButton" type="button" ${isDone ? '' : 'hidden'}>${nextLabel}</button></div>`;

    $$('.lesson-step-button').forEach(button => button.addEventListener('click', () => {
      $$('.lesson-step-button').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      $(`#${button.dataset.scroll}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));

    $('#hintButton').addEventListener('click', () => {
      const feedback = $('#lessonFeedback');
      feedback.className = 'lesson-feedback';
      feedback.textContent = `Hint: ${lesson.hint}`;
    });
    $('#checkChallenge').addEventListener('click', checkCurrentChallenge);
    $('#challengeEditor').addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') checkCurrentChallenge();
    });
    $('#nextLessonButton').addEventListener('click', goToNextLesson);

    const dialog = $('#lessonDialog');
    if (!dialog.open) dialog.showModal();
    $('#lessonContent').scrollTop = 0;
    $('#lessonContent').focus({ preventScroll: true });
  }

  function normalizeCode(code) {
    return String(code).replace(/\r/g, '').replace(/[ \t]+/g, ' ').trim();
  }

  function checkCurrentChallenge() {
    if (!openLessonInfo) return;
    const { lesson } = openLessonInfo;
    const editor = $('#challengeEditor');
    const feedback = $('#lessonFeedback');
    const source = normalizeCode(editor.value);
    const missing = lesson.includes.filter(piece => !source.includes(normalizeCode(piece)));

    if (!missing.length) {
      const wasDone = completedSet().has(lesson.id);
      if (!wasDone) state.completed.push(lesson.id);
      saveState();
      feedback.className = 'lesson-feedback good';
      feedback.textContent = wasDone ? '✓ Yep — still correct.' : `✓ Nailed it. +${lesson.xp} XP`;
      $('#nextLessonButton').hidden = false;
      renderProgress();
      renderTracks();
      if (!wasDone) showToast(`Lesson complete · +${lesson.xp} XP`);
    } else {
      feedback.className = 'lesson-feedback bad';
      feedback.textContent = 'Not quite yet. Compare your code with the task, or open the hint. Bugs are part of coding.';
    }
  }

  function goToNextLesson() {
    if (!openLessonInfo) return;
    const { course, index } = openLessonInfo;
    if (index < course.lessons.length - 1) {
      openLesson(course.id, index + 1);
    } else {
      $('#lessonDialog').close();
      showToast(`${course.name} path complete — PEAK 🏁`);
    }
  }

  function renderReferenceFilters() {
    const select = $('#referenceLanguage');
    const languages = [...new Set(DATA.reference.map(item => item.language))];
    select.innerHTML = `<option value="all">All languages</option>${languages.map(name => `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join('')}`;
  }

  function renderReference() {
    const query = ($('#referenceSearch').value || '').trim().toLowerCase();
    const language = $('#referenceLanguage').value;
    const items = DATA.reference.filter(item => {
      const matchesLanguage = language === 'all' || item.language === language;
      const haystack = `${item.language} ${item.term} ${item.title} ${item.description} ${item.example}`.toLowerCase();
      return matchesLanguage && (!query || haystack.includes(query));
    });
    $('#referenceGrid').innerHTML = items.length ? items.map(item => `
      <article class="ref-card">
        <span class="ref-lang">${escapeHTML(item.language)}</span>
        <code>${escapeHTML(item.term)}</code>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
        <div class="ref-example">${escapeHTML(item.example)}</div>
      </article>`).join('') : `<div class="empty-state">No match yet. Try a simpler word like <strong>loop</strong>, <strong>image</strong>, or <strong>function</strong>.</div>`;
  }

  function renderLabTabs() {
    const holder = $('#labLanguageTabs');
    holder.innerHTML = DATA.courses.map((course, index) => `<button type="button" role="tab" aria-selected="${index === 0}" class="${index === 0 ? 'active' : ''}" data-lab="${course.id}">${escapeHTML(course.name)}</button>`).join('');
    $$('[data-lab]', holder).forEach(button => button.addEventListener('click', () => setLabCourse(button.dataset.lab)));
  }

  function setLabCourse(courseId) {
    const course = DATA.courses.find(item => item.id === courseId);
    if (!course) return;
    activeLabCourse = course;
    $$('[data-lab]').forEach(button => {
      const active = button.dataset.lab === course.id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    $('#labFilename').textContent = course.filename;
    $('#labHint').textContent = course.id === 'github' ? 'Try editing the Markdown.' : `Experiment with this ${course.name} example.`;
    $('#labEditor').value = course.lab;
    runLab();
  }

  function runLab() {
    const source = $('#labEditor').value;
    const preview = $('#webPreview');
    const output = $('#textOutput');
    const id = activeLabCourse.id;

    if (id === 'html') {
      $('#outputLabel').textContent = 'Preview';
      preview.hidden = false; output.hidden = true;
      preview.srcdoc = `<!doctype html><meta name="viewport" content="width=device-width"><style>body{font-family:system-ui;padding:28px;color:#1d1d1f}button{border:0;border-radius:10px;background:#1d1d1f;color:white;padding:9px 12px}</style>${source}`;
      return;
    }
    if (id === 'css') {
      $('#outputLabel').textContent = 'Preview';
      preview.hidden = false; output.hidden = true;
      preview.srcdoc = `<!doctype html><meta name="viewport" content="width=device-width"><style>${source}</style><main><h1>Hello, CSS!</h1><p>Change the styles and run again.</p><div class="card">I am a .card</div></main>`;
      return;
    }
    if (id === 'js') {
      $('#outputLabel').textContent = 'Preview';
      preview.hidden = false; output.hidden = true;
      preview.srcdoc = `<!doctype html><meta name="viewport" content="width=device-width"><style>body{font-family:system-ui;display:grid;place-items:center;min-height:100vh;margin:0}button{font:inherit;border:0;border-radius:12px;padding:12px 16px;background:#0071e3;color:#fff;font-weight:700}</style><button>Click me</button><script>try{${source.replace(/<\/script/gi, '<\\/script')}}catch(error){document.body.innerHTML='<pre style="color:#b42318;white-space:pre-wrap">'+error+'</pre>'}<\/script>`;
      return;
    }

    preview.hidden = true; output.hidden = false;
    $('#outputLabel').textContent = id === 'github' ? 'Markdown preview notes' : 'Guided output';
    output.textContent = guidedOutput(activeLabCourse, source);
  }

  function guidedOutput(course, source) {
    if (course.id === 'github') {
      const headings = (source.match(/^#{1,6}\s.+$/gm) || []).length;
      const bullets = (source.match(/^[-*]\s.+$/gm) || []).length;
      return `Markdown check\n──────────────\n${headings} heading(s)\n${bullets} list item(s)\n\nTip: GitHub renders README.md automatically on a repository page.`;
    }

    const notes = {
      python: 'Python is not executed by this static site. Use the lessons to learn the syntax, then run Python locally when you are ready.',
      c: 'C needs a compiler. This browser lab keeps things safe and setup-free while you learn the syntax.',
      cpp: 'C++ needs a compiler. The guided lessons explain each part before you move to a local toolchain.',
      csharp: 'C# normally runs with the .NET SDK. The beginner lab focuses on reading and editing correct C# syntax first.'
    };
    const lineCount = source.split('\n').length;
    const bracePairs = Math.min((source.match(/{/g) || []).length, (source.match(/}/g) || []).length);
    return `${course.name} guided lab\n────────────────────\n${lineCount} line(s) written\n${bracePairs} brace pair(s) detected\n\n${notes[course.id] || 'Use the course lessons for guided practice.'}\n\nWhen you install the language tools later, you can paste this code into a real compiler/interpreter.`;
  }

  function applyTheme(theme) {
    const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
    document.documentElement.dataset.theme = resolved;
    $('#themeToggle').textContent = resolved === 'dark' ? '☀' : '◐';
    $('#themeToggle').setAttribute('aria-label', resolved === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance');
  }

  function toggleTheme() {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function setupReveal() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      $$('.reveal').forEach(item => item.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -30px' });
    $$('.reveal').forEach(item => observer.observe(item));
  }

  function bindEvents() {
    $('#themeToggle').addEventListener('click', toggleTheme);
    $('#startButton').addEventListener('click', () => {
      const next = findNextLesson(); openLesson(next.course.id, next.index);
    });
    $('#continueCard').addEventListener('click', () => {
      const next = findNextLesson(); openLesson(next.course.id, next.index);
    });
    $('#githubStart').addEventListener('click', () => openCourse('github'));
    $('#progressButton').addEventListener('click', () => $('#progressDialog').showModal());
    $('#closeProgress').addEventListener('click', () => $('#progressDialog').close());
    $('#closeLesson').addEventListener('click', () => $('#lessonDialog').close());
    $('#progressDialog').addEventListener('click', event => { if (event.target === $('#progressDialog')) $('#progressDialog').close(); });
    $('#lessonDialog').addEventListener('click', event => { if (event.target === $('#lessonDialog')) $('#lessonDialog').close(); });

    $('#menuButton').addEventListener('click', () => {
      const menu = $('#mobileMenu');
      menu.hidden = !menu.hidden;
      $('#menuButton').setAttribute('aria-expanded', String(!menu.hidden));
    });
    $$('#mobileMenu a').forEach(link => link.addEventListener('click', () => {
      $('#mobileMenu').hidden = true;
      $('#menuButton').setAttribute('aria-expanded', 'false');
    }));

    $$('.filter-chip').forEach(button => button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      $$('.filter-chip').forEach(item => item.classList.toggle('active', item === button));
      renderTracks();
    }));

    $('#referenceSearch').addEventListener('input', renderReference);
    $('#referenceLanguage').addEventListener('change', renderReference);
    $('#labRun').addEventListener('click', runLab);
    $('#labReset').addEventListener('click', () => { $('#labEditor').value = activeLabCourse.lab; runLab(); showToast('Code Lab reset'); });
    $('#labEditor').addEventListener('keydown', event => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const editor = event.currentTarget;
        const start = editor.selectionStart, end = editor.selectionEnd;
        editor.value = editor.value.slice(0, start) + '  ' + editor.value.slice(end);
        editor.selectionStart = editor.selectionEnd = start + 2;
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') runLab();
    });

    $('#resetProgress').addEventListener('click', () => {
      if (!confirm('Reset every completed lesson and XP on this device?')) return;
      state = { completed: [], lastLesson: null };
      saveState(); renderProgress(); renderTracks(); showToast('Progress reset');
    });

    matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => {
      if ((localStorage.getItem(THEME_KEY) || 'system') === 'system') applyTheme('system');
    });
  }

  function init() {
    applyTheme(localStorage.getItem(THEME_KEY) || 'system');
    renderTracks();
    renderProgress();
    renderReferenceFilters();
    renderReference();
    renderLabTabs();
    setLabCourse('html');
    bindEvents();
    setupReveal();
  }

  init();
})();
