const nextBtn = document.getElementById("nextBtn"); //NEXT BUTTON
const emailInput = document.getElementById("emailInput"); // EMAIL INPUT
const passwordInput = document.getElementById("passwordInput"); //PASSOWRD INPUT

const newPasswordInput = document.getElementById("newPassword"); //NEW PASSOWRD INPUT
const confirmPassword = document.getElementById("confirmPassword"); //CONFIRM PASSOWRD
const resetBtn = document.getElementById("resetBtn"); //RESET BUTTON
const passwordmatch = document.getElementById("passwordmatch");

nextBtn.addEventListener("click", () => {
  const emailValue = document.getElementById("email").value.trim(); //GET EMAIL
  if (!emailValue) {
    alert("Please enter your email.");
    return;
  }
  // HIDE EMAIL
  emailInput.classList.add("hidden");
  passwordInput.classList.remove("hidden");
});
//CHECK IF PASSWORD MATCH
function checkPassword() {
  const pass1 = newPasswordInput.value.trim();
  const pass2 = confirmPassword.value.trim();

  if (!pass1 || !pass2) {
    resetBtn.disabled = true;
    resetBtn.classList.add("opacity-40", "cursor-not-allowed");
    passwordmatch.textContent = "";
    return;
  }
  if (pass1 === pass2) {
    passwordmatch.textContent = "Password Match!!";
    passwordmatch.className = "text-xs text-green-400 mb-4";
    resetBtn.disabled = false;
    resetBtn.classList.remove("opacity-40", "cursor-not-allowed");
  } else {
    passwordmatch.textContent = "Password do not Match!!";
    passwordmatch.className = "text-xs text-red-400 mb-4";
    resetBtn.disabled = true;
    resetBtn.classList.add("opacity-40", "cursor-not-allowed");
  }
}
// CHECK PASSWORD
newPasswordInput.addEventListener("input", checkPassword);
confirmPassword.addEventListener("input", checkPassword);

document.getElementById("resetForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Password have successfully been Reset!!");
  window.location.href = "login.html"; //REDIRECT TO LOGIN PAGE
});
