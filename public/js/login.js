function revealPassword() {
  const inputPassword = document.querySelector('.password');
  const hideEyeIcon = document.querySelector(".eye-icon");

  hideEyeIcon.addEventListener('click', () => {
    if(inputPassword.type === "password") {
      inputPassword.setAttribute("type", "text");
    } else if (inputPassword.type === "text") {
      inputPassword.setAttribute("type", "password");
    }
  });
}

revealPassword();
