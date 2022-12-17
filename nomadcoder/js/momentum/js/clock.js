const clock = document.querySelector("#clock");

clock.innerText = "00:00";

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${min}:${sec}`;
}

getClock();
setInterval(getClock, 1000);
