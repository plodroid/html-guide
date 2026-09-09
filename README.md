# CodeBloom

A beginner-first coding website for ages **8–14**. It assumes the learner knows absolutely nothing about programming vocabulary yet.

The project is a static site built with plain HTML, CSS, and JavaScript so it can be hosted directly with **GitHub Pages**. There is **no GitHub Actions workflow**, build step, npm dependency, framework, backend, or account system.

## Courses

- HTML
- CSS
- JavaScript
- Python
- C
- C++
- C#
- GitHub basics

Every lesson introduces one idea at a time, explains every symbol or concept it introduces, shows a real example, then gives the learner a small code-editing challenge with a hint and local progress tracking.

The searchable beginner reference covers important tags, CSS properties, programming structures, functions/methods, collections, and GitHub concepts. It is intentionally a beginner reference rather than an attempt to dump entire language standard libraries on a child.

## Learning design

The course uses a simple loop:

1. **Understand it** — plain-language explanation with no assumed vocabulary.
2. **See it** — a tiny real example and a description of the result.
3. **Try it** — edit code immediately and check the answer.
4. **Build it** — finish each path with concepts that combine into small projects.

Progress and XP are stored only in `localStorage` on the learner's device.

## Code Lab

HTML, CSS, and JavaScript run live inside sandboxed browser previews.

Python, C, C++, and C# are presented as guided browser exercises because a plain GitHub Pages site cannot safely provide native compilers/interpreters without adding a remote service or large runtime dependency. The lessons prepare learners to move to local tools later.

## Design system

The interface follows the spirit of Apple's Human Interface Guidelines and current Liquid Glass guidance:

- content remains the focus
- strong information hierarchy
- restrained use of translucent glass on navigation and controls
- predictable action placement
- generous spacing and readable typography
- adaptive layouts across desktop, tablet, and phone sizes
- light and dark appearance
- reduced-motion support
- keyboard and focus-friendly interactions

It uses the system font stack instead of redistributing Apple font files.

## Files used by the current site

```text
html-guide/
├─ index.html
├─ style.css
├─ curriculum.js
├─ app.js
└─ README.md
```

Older files from the previous HTML-only version can be removed once this redesign is accepted.

## Run locally

Open `index.html` directly, or serve the repository folder using any basic local static server.

## Publish with GitHub Pages — no Actions

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch you want to publish (normally `main`) and `/ (root)`.
5. Save.

GitHub Pages can publish this site directly because all files are static.
