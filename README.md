# 🪨📄✂️ RPS Arena — Rock, Paper, Scissors

A fast, accessible Rock, Paper, Scissors game built during a group hackathon. Pick your match length, play against the computer, and race to the target score.

**Repository:** [github.com/DonielM/Project-X](https://github.com/DonielM/Project-X)
**Live Site:** [github.com/DonielM/Project-X](github.com/DonielM/Project-X) <!-- TODO: confirm/update once deployed to GitHub Pages -->

---

## Contents

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
- [Tablet / Mobile View](#tablet--mobile-view)
- [Future Features](#future-features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Testing](#testing)
- [Credits](#credits)

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
- Fully responsive across desktop, tablet, and mobile.

### Scope

Core features prioritised for the hackathon deadline:

- Player vs. computer gameplay (Rock/Paper/Scissors)
- Live scoreboard (wins / ties / losses)
- Selectable match length (Best of 5 / Best of 9)
- Round and match-end feedback
- Dark/light theme toggle
- Sound effects with on/off toggle
- Reset control
- Responsive layout
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
- ℹ️ About page with project background and team credits

---

## Tablet / Mobile View

<!-- TODO: Add real screenshots, e.g.:
| Desktop | Tablet | Mobile |
|---|---|---|
| ![desktop](assets/images/screenshot-desktop.png) | ![tablet](assets/images/screenshot-tablet.png) | ![mobile](assets/images/screenshot-mobile.png) |
-->

The layout is fully responsive via CSS media queries:

- **≤ 650px** — navigation stacks vertically, move buttons go full-width in a single column, wordmark and headings scale down, footer content stacks.
- **≤ 400px** — score grid collapses to a single column and result text shrinks further for small phone screens.

---

## Future Features

- 🦎🖖 Expand from classic RPS to full **Rock, Paper, Scissors, Lizard, Spock** (the site is already titled "RPSLS Arena" — this would close the gap between name and gameplay)
- 🧑‍🤝‍🧑 Player vs. player (local or online) mode
- 🏅 Win-streak tracking and a persistent leaderboard
- 🎞️ Animated move reveals / countdown before each round
- ⌨️ Keyboard shortcuts for choosing a move
- 📴 Offline support / installable PWA

---

## Technologies Used

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

## Deployment

This project is deployed using **GitHub Pages**:

1. Push all project files (`index.html`, `about.html`, `assets/`) to the `main` branch of the GitHub repository.
2. In the repository, go to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Under **Branch**, choose `main` and the `/ (root)` folder, then click **Save**.
5. GitHub will build and publish the site — the live URL appears at the top of the Pages settings once deployment finishes (usually within a minute or two).
6. Revisit **Settings > Pages** after any future push to confirm the deployment succeeded.

**To run locally:**

1. Clone the repository: `git clone https://github.com/CIMarko/BC_project_1.git`
2. Open `index.html` directly in a browser, or serve the folder with a local server (e.g. the VS Code "Live Server" extension) for the most accurate experience.

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

## Credits

### Media References

- Icons: [Font Awesome](https://fontawesome.com/)
- Sound effects: sourced from [Mixkit Sound Effects](https://mixkit.co/free-sound-effects/), used under Mixkit's free sound-effect license. Stored in `assets/audio/`:
  | File | Sound | Mixkit Category |
  |---|---|---|
  | `choice.mp3` | "Select click" | Interface Sounds |
  | `player-win.mp3` | "Quick win video game notification" | Game/Win Sounds |
  | `computer-win.mp3` | "Wrong answer fail notification" | Game/Lose Sounds |
  | `draw.mp3` | "Confirmation tone" | Notification Sounds |
  | `match-win.mp3` | "Game level completed" | Game Sounds |
- Team photos: supplied by each team member

### Acknowledgements

- Thanks to our hackathon organisers and mentors for guidance and feedback.
- Built collaboratively by:
  - **Krishna Khokhar** — [GitHub](https://github.com/Krishna2414)
  - **Doniel** — [GitHub](https://github.com/DonielM)
  - **Agustus** — [GitHub](https://github.com/Agustus)

---

_Built for fun. Play fair. 🎮_
