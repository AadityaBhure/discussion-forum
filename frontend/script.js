// ===== API Base URL =====
const API = "http://localhost:5000";

// ===== Token Helpers =====
function getToken() {
  return localStorage.getItem("token");
}
function setToken(token) {
  localStorage.setItem("token", token);
}
function clearToken() {
  localStorage.removeItem("token");
}

// ===== Validate Token (Fix JWT Malformed Case) =====
function isValidToken() {
  const token = getToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return !!payload.username;
  } catch {
    return false;
  }
}

// If token invalid → remove it immediately
if (!isValidToken()) clearToken();

// ===== Page Routing Logic =====
const path = location.pathname.toLowerCase();
const isChat = path.endsWith("index.html") || path === "/" || path === "";
const isLogin = path.endsWith("login.html");
const isSignup = path.endsWith("signup.html");

if (isChat && !isValidToken()) {
  location.href = "login.html";
}
if ((isLogin || isSignup) && isValidToken()) {
  location.href = "index.html";
}

// ===== API Wrapper =====
async function api(path, options = {}) {
  const headers = options.headers || {};
  headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token) headers["Authorization"] = token;

  const res = await fetch(API + path, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Unknown error");
  return data;
}

// ===== Signup =====
async function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) return alert("Enter all fields");

  try {
    await api("/signup", { method: "POST", body: JSON.stringify({ username, password }) });
    alert("Signup successful! Now login.");
    location.href = "login.html";
  } catch (e) {
    alert(e.message);
  }
}

// ===== Login =====
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) return alert("Enter all fields");

  try {
    const res = await api("/login", { method: "POST", body: JSON.stringify({ username, password }) });
    setToken(res.token);
    location.href = "index.html";
  } catch (e) {
    alert(e.message);
  }
}

// ===== Logout =====
function logout() {
  clearToken();
  location.href = "login.html";
}

// ===== Chat Logic =====
const chatBox = document.getElementById("chat-box");
const msgInput = document.getElementById("msg");

// Show username in UI
const whoami = document.getElementById("whoami");
if (whoami && isValidToken()) {
  whoami.textContent = JSON.parse(atob(getToken().split(".")[1])).username;
}

async function loadMessages(scroll = false) {
  try {
    const messages = await api("/messages");
    chatBox.innerHTML = messages
      .map(m => `<div class="msg"><b>${m.username}:</b> ${m.text}</div>`)
      .join("");
    if (scroll) chatBox.scrollTop = chatBox.scrollHeight;
  } catch {}
}

async function postMessage() {
  const text = msgInput.value.trim();
  if (!text) return;

  try {
    await api("/post", { method: "POST", body: JSON.stringify({ text }) });
    msgInput.value = "";
    loadMessages(true);
  } catch (e) {
    alert(e.message);
  }
}

// Send on Enter
if (msgInput) {
  msgInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      postMessage();
    }
  });
}

// Auto-refresh chat
if (chatBox) {
  loadMessages(true);
  setInterval(loadMessages, 1200);
}

// Expose globally to buttons
window.signup = signup;
window.login = login;
window.logout = logout;
window.postMessage = postMessage;
