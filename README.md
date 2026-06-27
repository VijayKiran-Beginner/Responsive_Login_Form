# 🔐 Vijay Kiran | Portfolio Auth UI

A responsive, animated **Login & Registration** gateway page that matches the dark-teal design of Vijay Kiran's developer portfolio. On successful login it automatically redirects to the live portfolio — works both locally in VS Code and on GitHub Pages without any manual URL switching.

🔗 **Login Page (Live):** `https://vijaykiran-beginner.github.io/Responsive_Login_Form/`
🔗 **Portfolio (Live):** `https://vijaykiran-beginner.github.io/Personal-Portfolio-Website/`

---

## 🗂️ Project Structure

```
Desktop/
  ApexPlanet/                          ← parent folder (NOT a Git repo)
    │
    ├── responsive_login/              ← THIS repo
    │     index.html                   ← Login + Register UI
    │     script.js                    ← Auth logic, validation, redirect
    │     styles.css                   ← All styling & animations
    │     README.md
    │
    └── portfolio/                     ← Separate repo (Personal-Portfolio-Website)
          images/
          index.html
          script.js
          style.css
          README.md
```

> `ApexPlanet/` is just a local container folder — it is **not** a Git repo and should never be made into one. Each project inside it is its own independent repo with its own GitHub Pages deployment.

---

## 🔄 Smart Redirect — Local & GitHub Pages

The script auto-detects the environment so you never need to change URLs manually:

```js
const isLocal = hostname === 'localhost'      // VS Code Live Server
             || hostname === '127.0.0.1'
             || protocol === 'file:';         // Opened directly in browser

if (isLocal) {
  // Sibling folder — one level up from responsive_login/ into portfolio/
  window.location.href = '../portfolio/index.html';
} else {
  // Already-deployed portfolio on GitHub Pages
  window.location.href = 'https://vijaykiran-beginner.github.io/Personal-Portfolio-Website/';
}
```

| Environment | Redirects to |
|---|---|
| VS Code Live Server | `../portfolio/index.html` |
| File opened directly in browser | `../portfolio/index.html` |
| GitHub Pages | `https://vijaykiran-beginner.github.io/Personal-Portfolio-Website/` |

---

## 🚀 Git Commands

### A — Push `responsive_login` to GitHub for the first time

Open VS Code terminal and run these **one by one**:

```bash
# Step 1 — go into the login project folder
cd Desktop/ApexPlanet/responsive_login

# Step 2 — initialise Git (only ever needed once)
git init

# Step 3 — stage all files
git add .

# Step 4 — first commit
git commit -m "Initial commit: Portfolio auth login page"

# Step 5 — set branch name to main
git branch -M main

# Step 6 — link to your GitHub repo
#           First create an empty repo named responsive_login on github.com
#           then paste its URL below
git remote add origin https://github.com/VijayKiran-Beginner/responsive_login.git

# Step 7 — push
git push -u origin main
```

---

### B — Enable GitHub Pages for `responsive_login`

1. Go to `https://github.com/VijayKiran-Beginner/responsive_login`
2. **Settings → Pages** (left sidebar)
3. Source → `main` branch → `/ (root)` → **Save**
4. Wait ~60 seconds → live at:

```
https://vijaykiran-beginner.github.io/responsive_login/
```

---

### C — Push future changes to `responsive_login`

```bash
cd Desktop/ApexPlanet/responsive_login

git add .
git commit -m "describe what you changed"
git push
```

GitHub Pages updates automatically within ~60 seconds of each push.

---

### D — Push future changes to `portfolio`

```bash
cd Desktop/ApexPlanet/portfolio

git add .
git commit -m "describe what you changed"
git push
```

> If `git push` ever says *"no upstream branch"*, run `git push -u origin main` once, then use `git push` normally from then on.

---

### E — Full end-to-end test

```
1. Open https://vijaykiran-beginner.github.io/Responsive_Login_Form/
2. Click "Create one" → register with any email + password
3. Switch to Sign In → enter the same credentials
4. Redirect overlay animates
5. Land on https://vijaykiran-beginner.github.io/Personal-Portfolio-Website/ ✅
```

---

## ✨ Features

### UI & Design
- Dark theme (`#121212` bg · `#00e0c7` teal) matching the portfolio exactly
- Animated radial glow blobs — mirrors the portfolio hero gradient
- Floating teal particles drifting upward continuously
- Pulsing avatar icon + mini typing effect cycling through Vijay's roles
- Smooth **slide-and-fade** panel transitions with a clipping viewport (no ghost text)
- Buttons stay perfectly centred during loading — no lateral drift

### Forms & Validation
- Real-time validation — errors on blur, clear as you correct them
- Email format · min name 2 chars · min password 8 chars · confirm match
- Duplicate email guard (live check on blur)
- Terms & conditions checkbox required to submit
- `.is-valid` / `.is-invalid` Bootstrap-style states on every input

### Password Strength Meter
- 4-level: **Weak → Fair → Good → Strong**
- Scored on: length ≥ 8, uppercase, digit, special character
- Pure CSS `data-level` attribute — no inline style conflicts on reset

### Authentication (in-memory for this session)
| Scenario | Result |
|---|---|
| Email not registered | Red email field · "No account found…" |
| Wrong password | Red password field · "Incorrect password…" |
| Correct credentials | Green fields + toast + redirect overlay → portfolio |

> This is a frontend-only demo. Data lives in browser memory and clears on refresh. For production, replace the `userStore` array with real API calls and backend password hashing (bcrypt / Argon2).

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Design tokens, animations, responsive layout |
| Vanilla JavaScript (ES6+) | Auth logic, validation, panel transitions, typing effect |
| Bootstrap 5.3 | Grid system, utility classes |
| Bootstrap Icons 1.11 | Input & eye-toggle icons |
| Font Awesome 6.5 | Brand icons, button icons |
| Google Fonts — Poppins | Typography (matches portfolio) |

---

## 🎨 Design Tokens

```css
--bg:         #121212   /* Page background          */
--bg-2:       #1a1a1a   /* Input surface            */
--bg-card:    #1e1e1e   /* Card surface             */
--accent:     #00e0c7   /* Teal — primary accent    */
--accent-h:   #00c4ad   /* Teal hover               */
--text:       #f5f5f5   /* Primary text             */
--text-muted: #b0b0b0   /* Secondary text           */
--danger:     #ff5c5c   /* Validation error         */
```

---

## 📫 Author

**Vijay Kiran Kommoju**
Frontend Developer · Java Developer · DSA Solver · Spring Boot Enthusiast

- GitHub: [@VijayKiran-Beginner](https://github.com/VijayKiran-Beginner)
- LinkedIn: [vijay-kiran-kommoju](https://www.linkedin.com/in/vijay-kiran-kommoju/)
- Email: vijaykirankommoju.cse@gmail.com
- Location: Kakinada, AP, India — 533002

---

## 📄 License

Open source — free to use for personal portfolio inspiration. Please give credit if you reuse significant parts of the design.

---

<p align="center">Made with ❤️ by Vijay Kiran</p>
