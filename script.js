(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const topbar = $('#topbar');
  const pageProgress = $('#pageProgress');
  const themeToggle = $('#themeToggle');
  const menuButton = $('#menuButton');
  const mobileMenu = $('#mobileMenu');
  const searchDialog = $('#searchDialog');
  const openSearch = $('#openSearch');
  const lessonSearch = $('#lessonSearch');
  const searchResults = $('#searchResults');
  const exampleDialog = $('#exampleDialog');
  const exampleFrame = $('#exampleFrame');
  const closeExample = $('#closeExample');
  const toast = $('#toast');

  /* ---------- Helpers ---------- */
  function showToast(message = 'Copied') {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 1500);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied');
    } catch {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      helper.remove();
      showToast('Copied');
    }
  }

  function escapeHtml(value) {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  /* ---------- Theme ---------- */
  const savedTheme = localStorage.getItem('html-guide-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.dataset.theme = 'dark';
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    if (isDark) {
      delete document.documentElement.dataset.theme;
      localStorage.setItem('html-guide-theme', 'light');
    } else {
      document.documentElement.dataset.theme = 'dark';
      localStorage.setItem('html-guide-theme', 'dark');
    }
  });

  /* ---------- Header ---------- */
  function updateScrollUI() {
    const scrollTop = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (scrollTop / max) * 100 : 0;
    topbar?.classList.toggle('scrolled', scrollTop > 10);
    if (pageProgress) pageProgress.style.width = `${percent}%`;
  }

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  menuButton?.addEventListener('click', () => {
    const open = menuButton.classList.toggle('open');
    mobileMenu?.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    mobileMenu?.setAttribute('aria-hidden', String(!open));
  });

  $$('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      menuButton?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
      mobileMenu?.setAttribute('aria-hidden', 'true');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    $$('.reveal').forEach(el => el.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.09, rootMargin: '0px 0px -30px' });

    $$('.reveal').forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index % 3, 2) * 55}ms`;
      revealObserver.observe(el);
    });
  }

  /* ---------- Active lesson ---------- */
  const lessonLinks = $$('.lesson-link');
  const lessons = $$('.lesson');
  if ('IntersectionObserver' in window && lessons.length) {
    const lessonObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      lessonLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
      });
    }, { threshold: [0.18, 0.4, 0.65], rootMargin: '-20% 0px -55%' });
    lessons.forEach(lesson => lessonObserver.observe(lesson));
  }

  /* ---------- Search ---------- */
  const searchableLessons = lessons.map(lesson => ({
    id: lesson.id,
    title: $('h3', lesson)?.textContent.trim() || lesson.id,
    kicker: $('.lesson-kicker', lesson)?.textContent.trim() || 'Lesson',
    terms: `${lesson.dataset.searchTitle || ''} ${lesson.textContent}`.toLowerCase()
  }));

  function renderSearch(query = '') {
    const clean = query.trim().toLowerCase();
    const results = clean
      ? searchableLessons.filter(item => item.terms.includes(clean)).slice(0, 8)
      : searchableLessons.slice(0, 6);

    if (!results.length) {
      searchResults.innerHTML = '<div class="search-empty">No lesson found. Try “class”, “forms”, or “CSS”.</div>';
      return;
    }

    searchResults.innerHTML = results.map((item, index) => `
      <a class="search-result${index === 0 ? ' active' : ''}" href="#${item.id}" data-search-result>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.kicker)}</small>
      </a>
    `).join('');

    $$('[data-search-result]', searchResults).forEach(result => {
      result.addEventListener('click', () => searchDialog.close());
    });
  }

  function showSearch() {
    renderSearch(lessonSearch?.value || '');
    if (!searchDialog.open) searchDialog.showModal();
    window.setTimeout(() => lessonSearch?.focus(), 20);
  }

  openSearch?.addEventListener('click', showSearch);
  lessonSearch?.addEventListener('input', event => renderSearch(event.target.value));

  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      showSearch();
    }
    if (event.key === 'Escape' && searchDialog?.open) searchDialog.close();
  });

  searchDialog?.addEventListener('click', event => {
    if (event.target === searchDialog) searchDialog.close();
  });

  /* ---------- Tiny lesson interactions ---------- */
  const anatomyTip = $('#anatomyTip');
  $$('.anatomy-part').forEach(part => {
    part.addEventListener('click', () => {
      if (anatomyTip) anatomyTip.textContent = part.dataset.tip || '';
    });
  });

  const tagDetail = $('#tagDetail');
  $$('.tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (!tagDetail) return;
      tagDetail.innerHTML = `<strong>${escapeHtml(chip.dataset.tag || '')}</strong><p>${escapeHtml(chip.dataset.description || '')}</p>`;
    });
  });

  $$('.copy-code').forEach(button => {
    button.addEventListener('click', () => {
      const code = button.closest('.code-card')?.querySelector('pre code')?.textContent || '';
      copyText(code);
    });
  });

  $$('.copy-prompt').forEach(button => {
    button.addEventListener('click', () => {
      const prompt = button.closest('.ai-prompt-card')?.querySelector('p')?.textContent.trim() || '';
      copyText(prompt);
    });
  });

  /* ---------- Run examples ---------- */
  function exampleDocument(html) {
    return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 42px; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color: #1d1d1f; background: #fff; }
  h1,h2 { letter-spacing: -.04em; }
  p { color: #6e6e73; line-height: 1.55; }
  button { border: 0; border-radius: 999px; padding: 10px 16px; background: #0071e3; color: white; font: inherit; cursor: pointer; }
  a { color: #0071e3; }
  .card { padding: 24px; border-radius: 20px; background: #f5f5f7; margin-bottom: 12px; }
  input,select { min-height: 42px; padding: 0 10px; border: 1px solid #d2d2d7; border-radius: 10px; }
  label { display:grid; gap:8px; max-width:360px; margin-bottom:16px; }
</style>
</head>
<body>${html}</body>
</html>`;
  }

  $$('.run-example').forEach(button => {
    button.addEventListener('click', () => {
      const code = button.closest('.code-card')?.querySelector('pre code')?.textContent || '';
      exampleFrame.srcdoc = exampleDocument(code);
      if (!exampleDialog.open) exampleDialog.showModal();
    });
  });

  closeExample?.addEventListener('click', () => exampleDialog.close());
  exampleDialog?.addEventListener('click', event => {
    if (event.target === exampleDialog) exampleDialog.close();
  });

  const helloButton = $('#helloButton');
  helloButton?.addEventListener('click', () => {
    helloButton.textContent = 'It worked ✨';
    helloButton.animate(
      [{ transform: 'scale(.96)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }],
      { duration: 360, easing: 'cubic-bezier(.22,1,.36,1)' }
    );
  });

  /* ---------- Playground ---------- */
  const htmlEditor = $('#htmlEditor');
  const cssEditor = $('#cssEditor');
  const htmlTab = $('#htmlTab');
  const cssTab = $('#cssTab');
  const lineNumbers = $('#lineNumbers');
  const livePreview = $('#livePreview');
  const resetPlayground = $('#resetPlayground');

  const starterHtml = htmlEditor?.value || '';
  const starterCss = cssEditor?.value || '';
  let activeEditor = htmlEditor;
  let previewRAF = 0;

  function updateLineNumbers() {
    if (!activeEditor || !lineNumbers) return;
    const count = activeEditor.value.split('\n').length;
    lineNumbers.textContent = Array.from({ length: count }, (_, i) => i + 1).join('\n');
  }

  function updatePreview() {
    window.cancelAnimationFrame(previewRAF);
    previewRAF = window.requestAnimationFrame(() => {
      if (!livePreview || !htmlEditor || !cssEditor) return;
      livePreview.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${cssEditor.value}</style></head><body>${htmlEditor.value}</body></html>`;
    });
  }

  function setEditor(type) {
    const htmlActive = type === 'html';
    htmlEditor?.classList.toggle('hidden', !htmlActive);
    cssEditor?.classList.toggle('hidden', htmlActive);
    htmlTab?.classList.toggle('active', htmlActive);
    cssTab?.classList.toggle('active', !htmlActive);
    htmlTab?.setAttribute('aria-selected', String(htmlActive));
    cssTab?.setAttribute('aria-selected', String(!htmlActive));
    activeEditor = htmlActive ? htmlEditor : cssEditor;
    updateLineNumbers();
    activeEditor?.focus();
  }

  htmlTab?.addEventListener('click', () => setEditor('html'));
  cssTab?.addEventListener('click', () => setEditor('css'));

  [htmlEditor, cssEditor].forEach(editor => {
    editor?.addEventListener('input', () => {
      updateLineNumbers();
      updatePreview();
    });
    editor?.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      event.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.value = `${editor.value.slice(0, start)}  ${editor.value.slice(end)}`;
      editor.selectionStart = editor.selectionEnd = start + 2;
      updateLineNumbers();
      updatePreview();
    });
  });

  resetPlayground?.addEventListener('click', () => {
    htmlEditor.value = starterHtml;
    cssEditor.value = starterCss;
    setEditor('html');
    updatePreview();
    showToast('Playground reset');
  });

  $$('.try-row button').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.insert;
      if (action === 'background') {
        cssEditor.value = cssEditor.value.replace('background: #f5f5f7;', 'background: #dff3ff;');
        setEditor('css');
      }
      if (action === 'radius') {
        cssEditor.value = cssEditor.value.replace('border-radius: 24px;', 'border-radius: 6px;');
        setEditor('css');
      }
      if (action === 'text') {
        htmlEditor.value = htmlEditor.value.replace("Hello, I'm learning HTML.", 'I changed this myself.');
        setEditor('html');
      }
      if (action === 'break') {
        htmlEditor.value = htmlEditor.value.replace('</h1>', '');
        setEditor('html');
      }
      updateLineNumbers();
      updatePreview();
    });
  });

  updateLineNumbers();
  updatePreview();

  /* ---------- Project checklist ---------- */
  const projectChecks = $$('#projectChecklist input[type="checkbox"]');
  const projectProgressBar = $('#projectProgressBar');
  const projectProgressText = $('#projectProgressText');

  try {
    const savedChecks = JSON.parse(localStorage.getItem('html-guide-project-checks') || '[]');
    projectChecks.forEach((checkbox, index) => {
      checkbox.checked = Boolean(savedChecks[index]);
    });
  } catch {
    // A broken localStorage value should never break the page.
  }

  function updateProjectProgress() {
    const complete = projectChecks.filter(check => check.checked).length;
    const percent = projectChecks.length ? Math.round((complete / projectChecks.length) * 100) : 0;
    if (projectProgressBar) projectProgressBar.style.width = `${percent}%`;
    if (projectProgressText) projectProgressText.textContent = `${percent}%`;
    localStorage.setItem('html-guide-project-checks', JSON.stringify(projectChecks.map(check => check.checked)));
    if (percent === 100) showToast('Project checklist complete ✨');
  }

  projectChecks.forEach(check => check.addEventListener('change', updateProjectProgress));
  updateProjectProgress();
})();
