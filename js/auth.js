// =======================
// AUTH MODULE
// =======================

export function loginUser(email) {
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userEmail", email);
}

export function logoutUser() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");
  window.location.href = "../pages/login.html";
}

export function isLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}

export function getUserEmail() {
  return localStorage.getItem("userEmail");
}
