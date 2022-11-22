const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");
const mmtRight = document.querySelector(".mmt__right");
const mmtTodo = document.querySelector(".mmt__todo");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  localStorage.setItem("username", username);
  loginForm.classList.add(HIDDEN_CLASSNAME);
  mmtRight.classList.remove(HIDDEN_CLASSNAME);
  mmtTodo.classList.remove(HIDDEN_CLASSNAME);
  paintGreeting(username);
}

function paintGreeting(username) {
  greeting.innerText = `반가워, ${username}.`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  mmtRight.classList.add(HIDDEN_CLASSNAME);
  mmtTodo.classList.add(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  loginForm.classList.add(HIDDEN_CLASSNAME);
  mmtRight.classList.remove(HIDDEN_CLASSNAME);
  mmtTodo.classList.remove(HIDDEN_CLASSNAME);
  greeting.classList.remove(HIDDEN_CLASSNAME);
  paintGreeting(savedUsername);
}
//localStorage.removeItem(USERNAME_KEY);
