# HTML Guide

A beginner-first interactive course for learning HTML by actually writing it.

The site is designed to feel closer to an Apple product/learning experience than a generic gamified dashboard: editorial typography, lots of whitespace, restrained motion, mostly solid surfaces, and Liquid Glass reserved for controls where the material actually makes sense.

## Learning loop

Each mission keeps the same simple rhythm:

1. Learn one small idea.
2. See a tiny real example.
3. Change real code yourself.
4. Get immediate validation and an optional hint.
5. Unlock the next step only after the code satisfies the task.

The curriculum currently contains 19 main missions across HTML, CSS, and JavaScript, plus a final build.

## Progress

Course completion is calculated from the XP value of curriculum missions the learner has actually completed:

```text
completed curriculum XP / total curriculum XP = course progress %
```

Side activities can award **bonus XP** for levels and feedback, but bonus XP does not increase the course-completion percentage. This keeps the progress meter honest.

Progress, nickname, streaks, achievements, and activity state are stored locally in the browser with `localStorage`. The site does **not** track visitor IP addresses.

## Liquid Glass

The interface uses a restrained Liquid Glass system adapted from the supplied reference template:

- SVG distortion/displacement filters
- layered translucent material
- specular edge highlights
- compressed/stretched press states
- a glass lens thumb for course progress
- glass mainly on navigation, segmented controls, transient UI, and compact controls

Content areas themselves remain mostly solid so the material does not overwhelm the learning experience.

The effect degrades gracefully where advanced SVG/backdrop filter combinations are not supported.

## Features

- locked/unlocked mission progression
- real code validators
- HTML, CSS and JavaScript worlds
- boss missions and a final build
- XP and levels
- XP-weighted course progress
- daily learning goal and streak
- practice arena with combos
- Quickfire recognition practice
- achievement milestones
- hidden playground challenge
- editable HTML/CSS playground with live preview
- responsive mobile layout
- reduced-motion support

## Structure

```text
html-guide/
├─ index.html
├─ style.css
├─ base.css
├─ components.css
├─ dialogs.css
├─ script.js
├─ curriculum.js
├─ progress.js
├─ activities.js
├─ app.js
└─ README.md
```

The files are intentionally split into understandable pieces instead of one enormous generated stylesheet or script.

There is deliberately **no framework, npm dependency, package manager, build step, backend, or GitHub Actions workflow**. It is plain static HTML/CSS/JavaScript.

## Run locally

Open `index.html` in a browser or serve the folder with any basic static-file server.

## GitHub Pages

Publish directly from the repository branch in GitHub Pages settings. No custom Actions workflow is required or included.
