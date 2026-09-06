(() => {
  'use strict';
  const files = ['curriculum.js', 'progress.js', 'activities.js', 'app.js'];
  let index = 0;

  function loadNext() {
    if (index >= files.length) return;
    const script = document.createElement('script');
    script.src = files[index++];
    script.async = false;
    script.onload = loadNext;
    script.onerror = () => console.error(`Could not load ${script.src}`);
    document.head.appendChild(script);
  }

  loadNext();
})();
