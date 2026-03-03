// =======================
// AUTH MODULE
// =======================

// Safe localStorage access
function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error("Storage error:", err);
  }
}

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.error("Storage error:", err);
    return null;
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Storage error:", err);
  }
}

// =======================
// LOGIN
// =======================
export function loginUser(email) {
  if (!email || typeof email !== "string") return;

  safeSet("loggedIn", "true");
  safeSet("userEmail", email.trim());
}

// =======================
// LOGOUT
// =======================
export function logoutUser() {
  safeRemove("loggedIn");
  safeRemove("userEmail");

  // Always redirect safely to login page
  if (window.location.pathname.includes("/pages/")) {
    window.location.href = "login.html";
  } else {
    window.location.href = "pages/login.html";
  }
}

// =======================
// CHECK LOGIN
// =======================
export function isLoggedIn() {
  return safeGet("loggedIn") === "true";
}

// =======================
// Get's used Email, for paul
// =======================
export function getUserEmail() {
  return safeGet("userEmail") || "";
}
