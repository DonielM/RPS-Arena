# 🪨📄✂️ RPS Arena — Rock, Paper, Scissors

A fast, accessible Rock, Paper, Scissors game built during a group hackathon. Pick your match length, play against the computer, and race to the target score.

**Repository:** [github.com/CIMarko/BC_project_1](https://github.com/CIMarko/BC_project_1)
**Live Site:** [https://cimarko.github.io/BC_project_1/](https://cimarko.github.io/BC_project_1/) <!-- TODO: confirm/update once deployed to GitHub Pages -->

---

## Contents

- [Description](#description)
- [Game Rules](#game-rules)
- [Game Modes](#game-modes)
- [UX](#ux)
  - [User Stories](#user-stories)
  - [Strategy](#strategy)
  - [Scope](#scope)
  - [Structure](#structure)
  - [Skeleton (Wireframes)](#skeleton-wireframes)
  - [Surface](#surface)
- [Design](#design)
  - [Typography](#typography)
  - [Colour Scheme](#colour-scheme)
  - [Imagery](#imagery)
- [Website Features](#website-features)
- [Accessibility](#accessibility)
- [Tablet / Mobile View](#tablet--mobile-view)
- [Screenshots](#screenshots)
- [Future Features](#future-features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Testing](#testing)
- [Credits](#credits)
- [License](#license)

---

## Description

RPS Arena is a browser-based Rock, Paper, Scissors game where you play against the computer. Choose a match length, click your move, and watch the score update live with clear win/lose/tie feedback until someone reaches the target score. Built collaboratively during a group hackathon to practise HTML, CSS, and JavaScript as a team, with a focus on responsive layout, theming, and accessible interaction patterns.

---

## Game Rules

Classic three-way Rock, Paper, Scissors rules apply to every round:

- 🪨 **Rock** beats ✂️ **Scissors**
- ✂️ **Scissors** beats 📄 **Paper**
- 📄 **Paper** beats 🪨 **Rock**
- Matching picks (e.g. Rock vs. Rock) result in a **tie** — no score change for either side

---

## Game Modes

Choose a match length from the dropdown before (or during) play:

| Mode          | Target to win       | Description   |
| ------------- | ------------------- | ------------- |
| **Best of 5** | First to **3** wins | Shorter match |
| **Best of 9** | First to **5** wins | Longer match  |

- Ties do **not** count toward the match target — only wins or losses end a match.
- The chosen match length is remembered across sessions via `localStorage` (`rps-match-target`).
- Changing the match length mid-session resets the current score to start a fresh match.
- Once a player reaches the target, the move buttons disable and a match-end message is shown; click **Reset** to play again.

---

## UX

### User Stories

- As a player, I want to choose Rock, Paper, or Scissors with a single click so I can play quickly.
- As a player, I want to see the result of each round immediately so I know whether I won, lost, or tied.
- As a player, I want to choose a match length (Best of 5 or Best of 9) so I can control how long a game lasts.
- As a player, I want my score to persist if I refresh the page, so I don't lose progress accidentally.
- As a player, I want to switch between dark and light mode so the site is comfortable to use in any environment.
- As a player, I want to turn sound effects on or off so I can play quietly if needed.
- As a returning player, I want a "Reset" option so I can start a fresh match at any time.
- As a visitor, I want an About page describing the project and the team who built it.

### Strategy

**Purpose:** Deliver a lightweight, no-login browser game that's easy to pick up and demonstrates solid front-end fundamentals (semantic HTML, custom CSS theming, and vanilla JS state management).

**Primary audience:** Site visitors and hackathon reviewers looking for a quick, polished, accessible game.

**Goals:**

- Immediate playability — no instructions needed.
- Clear feedback after every round and at match end.
- Fully responsive and accessible across desktop, tablet, and mobile.

### Scope

Core features prioritised for the hackathon deadline:

- Player vs. computer gameplay (Rock/Paper/Scissors)
- Live scoreboard (wins / ties / losses)
- Selectable match length (Best of 5 / Best of 9)
- Round and match-end feedback
- Dark/light theme toggle
- Sound effects with on/off toggle
- Reset control
- Responsive, accessible layout
- About page with team info

### Structure

| Page         | Purpose                                                         |
| ------------ | --------------------------------------------------------------- |
| `index.html` | The game itself — score, move buttons, round result, reset      |
| `about.html` | Project overview, feature list, hackathon summary, team credits |

Shared assets live under `assets/` (`css/`, `JavaScript/`, `images/`, `audio/`).

### Skeleton (Wireframes)

<!-- TODO: Add wireframe images/links here, e.g.:
![Homepage wireframe](assets/images/wireframe-home.png)
-->

Wireframes were sketched before build to plan the layout of the score panel, move buttons, and result area across breakpoints. _(Add wireframe images/links here.)_

### Surface

Visual direction: a dark-first, high-contrast game UI with a bold three-colour wordmark (Rock / Paper / Scissors), pill-shaped nav controls, and card-style sections with soft rounded corners — softened further by a light theme alternative.

---

## Design

### Typography

System font stack for fast loading and native feel on every device:

```css
--font-ui: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

### Colour Scheme

Defined as CSS custom properties, with separate dark/light theme overrides driven by `data-theme` on `<html>`:

| Variable                             | Dark theme            | Light theme           | Use                                |
| ------------------------------------ | --------------------- | --------------------- | ---------------------------------- |
| `--body-background` / `--background` | `#0f172a`             | `#f8fafc` / `#dddddd` | Page & card backgrounds            |
| `--text` / `--bone`                  | `#f8fafc` / `#f3eee2` | `#0f172a`             | Primary text                       |
| `--ink-2`                            | `#16265a`             | —                     | "Rock" button                      |
| `--sun`                              | `#ffc94a`             | —                     | "Paper" button, wordmark accent    |
| `--fluo`                             | `#ff3c8c`             | —                     | "Scissors" button, wordmark accent |
| `--border-color`                     | `#444`                | `#cccccc`             | Card/section borders               |

### Imagery

- Team headshots on the About page (`assets/images/`)
- Font Awesome GitHub icons linking to each contributor's profile
- Emoji used throughout for lightweight, dependency-free iconography (🌙 ☀️ 🔊 🔇 🔄 🎮)

---

## Website Features

- 🎮 Play Rock, Paper, or Scissors against the computer
- 🎲 Computer makes a random choice each round
- 📊 Live player, tie, and computer score tracking
- ✅ Clear win / lose / draw feedback after every round
- 🏆 Configurable match length — **Best of 5** (first to 3 wins) or **Best of 9** (first to 5 wins)
- 💾 Score and match-length settings persist via `localStorage`
- 🌗 Dark and light mode toggle
- 🔊 Sound effects with an on/off control
- 🔄 One-click reset for a new match
- 📱 Fully responsive layout for desktop, tablet, and mobile
- ♿ Accessible markup — semantic landmarks, `aria-live` result region, keyboard-operable controls
- ℹ️ About page with project background and team credits

---

## Accessibility

This project follows several accessibility best practices:

- Semantic landmark elements (`<header>`, `<main>`, `<footer>`, `<nav>`) and a clear heading hierarchy for screen-reader navigation.
- `aria-labelledby` on each game section, pointing to its heading, so assistive tech announces each section's purpose.
- `aria-live="polite"` on the round-result region so score/result updates are announced automatically without stealing focus.
- `aria-pressed` state on the theme toggle to communicate current mode to screen readers.
- Descriptive `aria-label` / `title` attributes on the theme and sound toggle buttons (e.g. "Switch to light mode", "Mute sound effects"), updated dynamically as state changes.
- Visible `:focus-visible` outlines on all interactive elements for keyboard users.
- All interactive controls are native `<button>` / `<a>` elements, preserving normal tab order and keyboard operability — no custom widgets that break native semantics.
- Responsive typography and layout so text stays legible without horizontal scrolling on small screens.
- Colour palette designed with contrast in mind across both dark and light themes.

_(Recommended follow-up: run a Lighthouse Accessibility audit and/or an axe DevTools scan and record the actual scores — see [Testing](#testing).)_

---

## Tablet / Mobile View

The layout is fully responsive via CSS media queries:

- **≤ 650px** — navigation stacks vertically, move buttons go full-width in a single column, wordmark and headings scale down, footer content stacks.
- **≤ 400px** — score grid collapses to a single column and result text shrinks further for small phone screens.

See [Screenshots](#screenshots) for visuals across breakpoints once captured.

---

## Screenshots

<!-- TODO: Replace with real screenshots once captured, e.g.:
![Desktop — game screen (dark mode)](assets/images/screenshot-desktop-dark.png)
![Desktop — game screen (light mode)](assets/images/screenshot-desktop-light.png)
![Mobile — game screen](assets/images/screenshot-mobile.png)
![About page](assets/images/screenshot-about.png)
-->

Screenshots are pending. Suggested set to capture and add to `assets/images/`:

| File                           | Suggested content                         |
| ------------------------------ | ----------------------------------------- |
| `screenshot-desktop-dark.png`  | Game screen, desktop width, dark theme    |
| `screenshot-desktop-light.png` | Game screen, desktop width, light theme   |
| `screenshot-tablet.png`        | Game screen at tablet breakpoint          |
| `screenshot-mobile.png`        | Game screen at mobile breakpoint (≤400px) |
| `screenshot-about.png`         | About page with team section              |

---

## Future Features

- 🧑‍🤝‍🧑 Player vs. player (local or online) mode
- 🏅 Win-streak tracking and a persistent leaderboard
- 🎞️ Animated move reveals / countdown before each round
- ⌨️ Keyboard shortcuts for choosing a move
- 📴 Offline support / installable PWA

---

## Technology Stack

**Languages**

- HTML5
- CSS3 (custom properties, Flexbox, Grid, media queries)
- JavaScript (ES6+, vanilla — no framework)

**Frameworks & Libraries**

- [Font Awesome](https://fontawesome.com/) — GitHub icons on the About page (loaded via CDN kit)

**Programs & Tools**

- Git & GitHub — version control
- GitHub Pages — deployment/hosting
- VS Code — development environment
- Browser DevTools — debugging and responsive testing
- [W3C HTML Validator](https://validator.w3.org/) — HTML validation
- [W3C CSS (Jigsaw) Validator](https://jigsaw.w3.org/css-validator/) — CSS validation
- JavaScript linter (e.g. JSHint) — JS validation
- Lighthouse — performance, accessibility, and SEO audits
- Online whiteboard tool — project planning and README structuring

---

## Installation

No build tools, package managers, or dependencies are required — this is a static HTML/CSS/JavaScript site.

1. Clone the repository:
   ```bash
   git clone https://github.com/DonielM/Project-X.git
   cd Project-X
   ```
2. That's it — there's nothing to install. Open `index.html` in a browser (see [Running the Project](#running-the-project) below).

## Running the Project

There is no build step. Use any one of the following to run it locally:

- **Quickest:** double-click `index.html` (or right-click → Open With → your browser).
- **VS Code Live Server:** open the project folder in VS Code, install the "Live Server" extension, then click "Go Live" — serves the site with auto-reload, recommended for development.
- **Python's built-in server:**
  ```bash
  python3 -m http.server
  ```
  then visit `http://localhost:8000` in your browser.

To deploy the live version, see [Deployment](#deployment).

---

## Deployment

This project is deployed using **GitHub Pages**:

1. Push all project files (`index.html`, `about.html`, `assets/`) to the `main` branch of the GitHub repository.
2. In the repository, go to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Under **Branch**, choose `main` and the `/ (root)` folder, then click **Save**.
5. GitHub will build and publish the site — the live URL appears at the top of the Pages settings once deployment finishes (usually within a minute or two).
6. Revisit **Settings > Pages** after any future push to confirm the deployment succeeded.

---

## Testing

### Validation

| Tool                       | File(s)                       | Result                                                            |
| -------------------------- | ----------------------------- | ----------------------------------------------------------------- |
| W3C HTML Validator         | `index.html`, `about.html`    | _(Add pass/fail + screenshot)_                                    |
| W3C CSS (Jigsaw) Validator | `assets/css/style.css`        | _(Add pass/fail + screenshot)_                                    |
| JS Validator/Linter        | `assets/JavaScript/script.js` | _(Add pass/fail + screenshot)_                                    |
| Lighthouse Audit           | All pages                     | _(Add Performance / Accessibility / Best Practices / SEO scores)_ |

### Manual Testing

- ✅ Each move button (Rock/Paper/Scissors) produces a correct win/lose/tie result against every possible computer move
- ✅ Score updates correctly and persists after a page refresh
- ✅ Switching match length resets the score
- ✅ Match ends and disables move buttons once a player reaches the target score
- ✅ Reset button clears score, result text, and re-enables move buttons
- ✅ Theme toggle switches and persists dark/light mode
- ✅ Sound toggle mutes/unmutes and persists across reloads
- ✅ Layout verified at desktop, tablet, and mobile breakpoints
- ✅ Keyboard focus states visible on all interactive controls
- ✅ Screen reader announces round result via the `aria-live` region

---

## Credits

### Media References

- Icons: [Font Awesome](https://fontawesome.com/)
- Sound effects: sourced from [Mixkit Sound Effects](https://mixkit.co/free-sound-effects/), used under Mixkit's free sound-effect license. Stored in `assets/audio/`:

  | File               | Sound                               | Mixkit Category     |
  | ------------------ | ----------------------------------- | ------------------- |
  | `choice.mp3`       | "Select click"                      | Interface Sounds    |
  | `player-win.mp3`   | "Quick win video game notification" | Game/Win Sounds     |
  | `computer-win.mp3` | "Wrong answer fail notification"    | Game/Lose Sounds    |
  | `draw.mp3`         | "Confirmation tone"                 | Notification Sounds |
  | `match-win.mp3`    | "Game level completed"              | Game Sounds         |

- Team photos: supplied by each team member

### Acknowledgements

- Thanks to our hackathon organisers and mentors for guidance and feedback.
- Built collaboratively by:
  - **Krishna Khokhar** — [GitHub](https://github.com/Krishna2414)
  - **Doniel** — [GitHub](https://github.com/DonielM)
  - **Agustus** — [GitHub](https://github.com/Agustus)

---

## License

This project is licensed under the **MIT License** (suggested as a common permissive default for hackathon/portfolio projects) — see the `LICENSE` file for details, or update this section if a different license applies.

---

_Built for fun. Play fair. 🎮_
