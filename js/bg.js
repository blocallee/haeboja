const images = [
  "kimg01.jpeg",
  "kimg02.jpeg",
  "kimg03.jpeg",
  "kimg04.jpeg",
  "kimg05.jpeg",
  //"kimg06.jpeg",
];

const mmt = document.querySelector(".mmt");
const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgContainer = document.createElement("div");
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;
bgContainer.classList.add("mmt__bg");
mmt.appendChild(bgContainer);
bgContainer.appendChild(bgImage);
