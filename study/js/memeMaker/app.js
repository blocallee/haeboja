const fileSelector = document.getElementById("drawing-file-select");
const fileName = document.getElementById("drawing-file-name");
const colorName = document.querySelector(".palette-area__color-text");
const btnSave = document.getElementById("btn-img-save");
const addTextInput = document.getElementById("drawing-text");
const fileUpload = document.getElementById("drawing-file");
const btnModeEraser = document.getElementById("drawing-mode-eraser");
const btnModeReset = document.getElementById("drawing-mode-reset");
const btnMode = document.getElementById("drawing-mode");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color-range");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

const colors = [
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#a29bfe",
  "#ffeaa7",
  "#fab1a0",
  "#ff7675",
  "#fd79a8",
  "#000",
];

function onMove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(e) {
  ctx.lineWidth = e.target.value;
}

function onColorChange(e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
  colorName.innerText = e.target.value;
}

function onColorClick(e) {
  const colorValue = e.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
  colorName.innerText = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    btnMode.innerText = "채우기";
  } else {
    isFilling = true;
    btnMode.innerText = "그리기";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function onResetClick() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  fileSelector.innerText = "이미지 고르기";
  fileName.innerText = "선택된 파일 없어요";
}

function onEraserClick(e) {
  ctx.strokeStyle = "#fff";
  isFilling = false;
  btnMode.innerText = "채우기";
}

function onFileChange(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const fileValue = file.name;
  console.dir(fileValue);
  const image = new Image(file);
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileName.innerText = fileValue;
    fileUpload.value = null;
    fileSelector.innerText = "다시 고르기";
  };
}

function onDoubleClick(e) {
  const text = addTextInput.value;

  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "30px serif";
    ctx.fillText(text, e.offsetX, e.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "MyDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
btnMode.addEventListener("click", onModeClick);
btnModeReset.addEventListener("click", onResetClick);
btnModeEraser.addEventListener("click", onEraserClick);

fileUpload.addEventListener("change", onFileChange);

btnSave.addEventListener("click", onSaveClick);
