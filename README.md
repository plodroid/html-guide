# HTML Quest

A beginner-first coding game for learning HTML by actually writing it.

HTML Quest keeps the clean, restrained feel of an Apple product page, then adds meaningful game progression underneath it: missions, real code challenges, XP, levels, streaks, unlockable worlds, collectible pins, Quickfire rounds, an arena, a playground, hidden quests, and a final build.

## What makes it a game

- Mission map with locked/unlocked progression
- 8 HTML missions ending in an HTML boss
- Unlockable CSS and JavaScript worlds
- Real code validators instead of “click next” lessons
- XP and levels
- One-time mission rewards
- Daily mission progress and streaks
- Challenge Arena with combo multipliers
- 60-second-style Quickfire questions
- Collectible achievement pins
- Hidden playground quest
- Final Boss that validates a real page structure
- Confetti and level-up feedback kept intentionally restrained
- Learner nickname/profile
- Progress stored locally in the browser

## Learning approach

Each mission follows the same loop:

1. Learn one small idea.
2. See a tiny real example.
3. Edit code yourself.
4. Get instant validation and a useful hint if needed.
5. Earn progression only when the code actually satisfies the task.

The course is written for anyone starting from zero. It does not assume prior coding knowledge or require AI-generated code to understand the lessons.

## Design

The interface is Apple-inspired rather than “generic game UI”:

- large editorial typography
- lots of whitespace
- mostly neutral surfaces
- restrained blue/purple accents
- liquid glass used mainly for navigation and transient controls
- smooth but subtle motion
- no giant neon gradients or cluttered HUD everywhere
- responsive mobile layout
- reduced-motion support

## Structure

```text
html-guide/
├─ index.html
├─ style.css
├─ script.js
└─ README.md
```

There is deliberately **no framework, package manager, build step, backend, or GitHub Actions workflow**. It is plain static HTML/CSS/JavaScript.

## Run locally

Open `index.html` in a browser.

## GitHub Pages

Publish directly from the repository branch in GitHub Pages settings. No custom Actions workflow is required or included.
