/**
 * VIJAY KIRAN — Portfolio Auth UI  |  script.js
 *
 * Flow:
 *  1. Register → saves { name, email, password } to in-memory userStore
 *  2. Login    → checks email exists, then checks password
 *                correct → redirect overlay → open portfolio HTML
 *                email not found → "No account found"
 *                wrong password  → "Incorrect password"
 */

/* ─────────────────────────────────────────────────────────────
   § 0. USER STORE (in-memory)
───────────────────────────────────────────────────────────── */
const userStore = [];

function findUser(email) {
  return userStore.find(u => u.email === email.trim().toLowerCase());
}
function registerUser(name, email, password) {
  if (findUser(email)) return false;
  userStore.push({ name: name.trim(), email: email.trim().toLowerCase(), password });
  return true;
}

/* ─────────────────────────────────────────────────────────────
   § 1. DOM REFS
───────────────────────────────────────────────────────────── */
const loginPanel    = document.getElementById('loginPanel');
const registerPanel = document.getElementById('registerPanel');
const loginForm     = document.getElementById('loginForm');
const registerForm  = document.getElementById('registerForm');

const goToRegister   = document.getElementById('goToRegister');
const goToLogin      = document.getElementById('goToLogin');

const loginEmail    = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const regName       = document.getElementById('regName');
const regEmail      = document.getElementById('regEmail');
const regPassword   = document.getElementById('regPassword');
const regConfirm    = document.getElementById('regConfirm');
const agreeTerms    = document.getElementById('agreeTerms');
const strengthBar   = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');

document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ─────────────────────────────────────────────────────────────
   § 2. MINI TYPING EFFECT (card brand header)
   Cycles through Vijay's roles — same as portfolio hero
───────────────────────────────────────────────────────────── */
const cardTypedEl = document.getElementById('cardTyped');
const roles = [
  'Frontend Developer',
  'DSA Problem Solver',
  'Java Developer',
  'Spring Boot Enthusiast'
];
let rIdx = 0, cIdx = 0, deleting = false;

function typeCard() {
  const word = roles[rIdx];
  cardTypedEl.textContent = deleting
    ? word.substring(0, cIdx - 1)
    : word.substring(0, cIdx + 1);

  deleting ? cIdx-- : cIdx++;

  let speed = deleting ? 55 : 100;
  if (!deleting && cIdx === word.length)  { speed = 1600; deleting = true; }
  else if (deleting && cIdx === 0)         { deleting = false; rIdx = (rIdx + 1) % roles.length; speed = 380; }

  setTimeout(typeCard, speed);
}
document.addEventListener('DOMContentLoaded', typeCard);

/* ─────────────────────────────────────────────────────────────
   § 3. PANEL TOGGLE (slide-and-fade)
───────────────────────────────────────────────────────────── */
function switchPanel(from, to) {
  // 1. Slide the current panel out to the left
  from.classList.remove('vk-panel--active');
  from.classList.add('vk-panel--exit-left');
  from.setAttribute('aria-hidden', 'true');

  // 2. Reset the incoming panel to its off-screen-right starting position
  //    without any transition so it jumps there instantly
  to.style.transition = 'none';
  to.classList.remove('vk-panel--active', 'vk-panel--exit-left');
  // Position it absolute so it doesn't push card height yet
  to.style.position  = 'absolute';
  to.style.opacity   = '0';
  to.style.transform = 'translateX(36px)';

  // 3. Force the browser to register that starting state
  void to.offsetWidth;

  // 4. Re-enable transitions and animate to the visible state
  to.style.transition = '';
  to.style.opacity    = '';
  to.style.transform  = '';

  // 5. After animation completes (320 ms matches CSS):
  //    - active panel becomes in-flow (position:relative → sets card height)
  //    - exiting panel is tucked back to absolute so it takes no space
  const DURATION = 340; // slight buffer over the 0.32s CSS transition
  setTimeout(() => {
    // Clean up exiting panel
    from.classList.remove('vk-panel--exit-left');
    from.style.position  = '';  // back to CSS default (absolute)
    from.style.opacity   = '';
    from.style.transform = '';

    // Promote incoming panel to in-flow active
    to.style.position  = '';
    to.style.opacity   = '';
    to.style.transform = '';
    to.classList.add('vk-panel--active');
    to.setAttribute('aria-hidden', 'false');
    to.scrollTop = 0;
  }, DURATION);
}

goToRegister.addEventListener('click', () => switchPanel(loginPanel, registerPanel));
goToLogin.addEventListener('click',    () => switchPanel(registerPanel, loginPanel));

/* ─────────────────────────────────────────────────────────────
   § 4. EYE TOGGLE
───────────────────────────────────────────────────────────── */
document.querySelectorAll('.vk-eye').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const icon  = btn.querySelector('i');
    if (!input) return;

    const hiding = input.type === 'password';
    input.type   = hiding ? 'text' : 'password';

    icon.style.opacity = '0';
    setTimeout(() => {
      icon.className     = hiding ? 'bi bi-eye-slash' : 'bi bi-eye';
      icon.style.opacity = '1';
    }, 80);
    btn.setAttribute('aria-label', hiding ? 'Hide password' : 'Show password');
  });
});

/* ─────────────────────────────────────────────────────────────
   § 5. VALIDATION HELPERS
───────────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setValidity(input, isValid, message = '') {
  const fb = document.getElementById(input.getAttribute('aria-describedby'));
  input.classList.toggle('is-valid',   isValid);
  input.classList.toggle('is-invalid', !isValid);
  if (fb) {
    fb.textContent = isValid ? '' : message;
    fb.className   = isValid ? 'vk-feedback ok' : 'vk-feedback';
  }
}

function clearValidity(input) {
  input.classList.remove('is-valid', 'is-invalid');
  const fb = document.getElementById(input.getAttribute('aria-describedby'));
  if (fb) { fb.textContent = ''; fb.className = 'vk-feedback'; }
}

function clearFormValidity(form) {
  form.querySelectorAll('.vk-input').forEach(clearValidity);
  form.querySelectorAll('.vk-feedback').forEach(fb => {
    fb.textContent = '';
    fb.className   = 'vk-feedback';
  });
}

/* ─────────────────────────────────────────────────────────────
   § 6. REGISTER VALIDATORS
───────────────────────────────────────────────────────────── */
function vRegName() {
  const v = regName.value.trim();
  if (!v)           return setValidity(regName, false, 'Full name is required.');
  if (v.length < 2) return setValidity(regName, false, 'Name must be at least 2 characters.');
  setValidity(regName, true);
}
function vRegEmail() {
  const v = regEmail.value.trim();
  if (!v)                return setValidity(regEmail, false, 'Email is required.');
  if (!EMAIL_RE.test(v)) return setValidity(regEmail, false, 'Enter a valid email address.');
  if (findUser(v))       return setValidity(regEmail, false, 'This email is already registered.');
  setValidity(regEmail, true);
}
function vRegPassword() {
  const v = regPassword.value;
  if (!v)           return setValidity(regPassword, false, 'Password is required.');
  if (v.length < 8) return setValidity(regPassword, false, 'Password must be at least 8 characters.');
  setValidity(regPassword, true);
  if (regConfirm.value) vRegConfirm();
}
function vRegConfirm() {
  const v = regConfirm.value;
  if (!v)                      return setValidity(regConfirm, false, 'Please confirm your password.');
  if (v !== regPassword.value) return setValidity(regConfirm, false, "Passwords don't match.");
  setValidity(regConfirm, true);
}
function vTerms() {
  const fb = document.getElementById('termsFb');
  if (!agreeTerms.checked) { fb.textContent = 'You must agree to the terms.'; return false; }
  fb.textContent = '';
  return true;
}

// Blur / live listeners
regName.addEventListener('blur', vRegName);
regEmail.addEventListener('blur', vRegEmail);
regPassword.addEventListener('blur', vRegPassword);
regConfirm.addEventListener('blur', vRegConfirm);
agreeTerms.addEventListener('change', vTerms);

regName.addEventListener('input',     () => { if (regName.classList.contains('is-invalid'))     vRegName(); });
regEmail.addEventListener('input',    () => { if (regEmail.classList.contains('is-invalid'))    vRegEmail(); });
regPassword.addEventListener('input', () => {
  updateStrength(regPassword.value);
  if (regPassword.classList.contains('is-invalid')) vRegPassword();
  if (regConfirm.value && regConfirm.classList.contains('is-invalid')) vRegConfirm();
});
regConfirm.addEventListener('input',  () => { if (regConfirm.classList.contains('is-invalid')) vRegConfirm(); });

/* ─────────────────────────────────────────────────────────────
   § 7. PASSWORD STRENGTH METER
───────────────────────────────────────────────────────────── */
const S_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const S_COLORS = ['', '#ff5c5c', '#fbbf24', '#60a5fa', '#00e0c7'];

function scorePassword(p) {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8)          s++;
  if (/[A-Z]/.test(p))        s++;
  if (/[0-9]/.test(p))        s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

function updateStrength(pwd) {
  const level = scorePassword(pwd);
  if (!pwd || level === 0) {
    strengthBar.removeAttribute('data-level');
    strengthBar.setAttribute('aria-valuenow', 0);
    strengthLabel.textContent = '';
    strengthLabel.style.color = '';
    return;
  }
  strengthBar.setAttribute('data-level', level);
  strengthBar.setAttribute('aria-valuenow', level);
  strengthLabel.textContent = S_LABELS[level];
  strengthLabel.style.color = S_COLORS[level];
}

/* ─────────────────────────────────────────────────────────────
   § 8. TOAST
───────────────────────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  document.querySelectorAll('.vk-toast').forEach(t => t.remove());
  const icon  = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';
  const toast = document.createElement('div');
  toast.className = `vk-toast vk-toast--${type}`;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${msg}`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/* ─────────────────────────────────────────────────────────────
   § 9. BUTTON LOADING STATE
───────────────────────────────────────────────────────────── */
function setLoading(btn, on) {
  btn.disabled = on;
  btn.querySelector('.vk-btn-text').style.opacity  = on ? '0' : '1';
  btn.querySelector('.vk-btn-spinner').classList.toggle('d-none', !on);
}

/* ─────────────────────────────────────────────────────────────
   § 10. PORTFOLIO REDIRECT OVERLAY
   — Shows a branded loading bar, then opens portfolio.html
     (falls back to alert in hosted environments where
      same-origin redirect makes sense)
───────────────────────────────────────────────────────────── */
function redirectToPortfolio(userName) {
  // Build overlay
  const overlay = document.createElement('div');
  overlay.className = 'vk-redirect-overlay';
  overlay.innerHTML = `
    <div class="vk-redirect-logo">Vijay<span>.dev</span></div>
    <p class="vk-redirect-msg">Welcome, ${userName} — opening portfolio…</p>
    <div class="vk-redirect-bar-track">
      <div class="vk-redirect-bar"></div>
    </div>`;
  document.body.appendChild(overlay);

  // Fade in
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('show')));

  // After the loading bar finishes (1.8 s) → navigate
  setTimeout(() => {
    // ── Smart redirect: local VS Code  vs  GitHub Pages ──────────
    //
    //  Local structure (Desktop/ApexPlanet/):
    //    responsive_login/index.html   ← this file
    //    portfolio/index.html          ← sibling folder (one level up)
    //
    //  GitHub repos are separate:
    //    responsive_login  → github.com/VijayKiran-Beginner/responsive_login
    //    portfolio         → github.com/VijayKiran-Beginner/Personal-Portfolio-Website
    //                        live at: vijaykiran-beginner.github.io/Personal-Portfolio-Website/
    // ────────────────────────────────────────────────────────────────
    const isLocal = window.location.hostname === 'localhost'
                 || window.location.hostname === '127.0.0.1'
                 || window.location.protocol === 'file:';

    if (isLocal) {
      // VS Code Live Server or file:// — go up one level into sibling portfolio folder
      window.location.href = '../portfolio/index.html';
    } else {
      // GitHub Pages — exact live URL of your already-deployed portfolio
      window.location.href = 'https://vijaykiran-beginner.github.io/Personal-Portfolio-Website/';
    }
  }, 2000);
}

/* ─────────────────────────────────────────────────────────────
   § 11. LOGIN SUBMIT
───────────────────────────────────────────────────────────── */
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailVal = loginEmail.value.trim();
  const pwdVal   = loginPassword.value;
  let err = false;

  // Format checks
  if (!emailVal)                { setValidity(loginEmail, false, 'Email is required.');          err = true; }
  else if (!EMAIL_RE.test(emailVal)) { setValidity(loginEmail, false, 'Enter a valid email address.'); err = true; }

  if (!pwdVal)          { setValidity(loginPassword, false, 'Password is required.');            err = true; }
  else if (pwdVal.length < 8) { setValidity(loginPassword, false, 'Password must be at least 8 characters.'); err = true; }

  if (err) return;

  // Spinner
  const btn = loginForm.querySelector('button[type="submit"]');
  setLoading(btn, true);
  await delay(800);
  setLoading(btn, false);

  // Auth
  const user = findUser(emailVal);
  if (!user) {
    setValidity(loginEmail, false, 'No account found with this email. Please register first.');
    loginEmail.focus();
    return;
  }
  if (user.password !== pwdVal) {
    setValidity(loginPassword, false, 'Incorrect password. Please try again.');
    loginPassword.focus();
    return;
  }

  // ✅ Success — mark fields valid, show brief toast, then redirect
  setValidity(loginEmail,    true);
  setValidity(loginPassword, true);
  showToast(`Signed in as ${user.name} — redirecting…`, 'success');

  setTimeout(() => redirectToPortfolio(user.name), 1000);
});

/* ─────────────────────────────────────────────────────────────
   § 12. REGISTER SUBMIT
───────────────────────────────────────────────────────────── */
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  vRegName();
  vRegEmail();
  vRegPassword();
  vRegConfirm();
  const termsOk = vTerms();

  const allValid =
    regName.classList.contains('is-valid')     &&
    regEmail.classList.contains('is-valid')    &&
    regPassword.classList.contains('is-valid') &&
    regConfirm.classList.contains('is-valid')  &&
    termsOk;

  if (!allValid) return;

  const btn = registerForm.querySelector('button[type="submit"]');
  setLoading(btn, true);
  await delay(900);
  setLoading(btn, false);

  const saved = registerUser(regName.value, regEmail.value, regPassword.value);
  if (!saved) {
    setValidity(regEmail, false, 'This email is already registered.');
    return;
  }

  const name = regName.value.trim();
  showToast(`Account created! Welcome, ${name} 🎉`, 'success');

  registerForm.reset();
  clearFormValidity(registerForm);
  updateStrength('');
  agreeTerms.checked = false;

  // Take them to login after a moment
  setTimeout(() => switchPanel(registerPanel, loginPanel), 2200);
});

/* ─────────────────────────────────────────────────────────────
   § 13. UTILITY
───────────────────────────────────────────────────────────── */
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }