const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

// ------ 집 그리기
ctx.fillRect(100, 200, 50, 200);
ctx.fillRect(300, 200, 50, 200);
ctx.fillRect(200, 300, 50, 100);

ctx.moveTo(225, 100);
ctx.lineTo(350, 200);
ctx.lineTo(100, 200);
ctx.lineTo(225, 100);
ctx.fill();

// ------ 사람 그리기
ctx.fillRect(400, 200, 25, 150);
ctx.fillRect(650, 200, 25, 150);
ctx.fillRect(485, 200, 100, 300);

ctx.arc(530, 120, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "skyblue";
ctx.arc(520, 100, 10, 0, 1 * Math.PI);
ctx.arc(555, 100, 10, 0, 1 * Math.PI);
// ctx.arc(320, 100, 10, Math.PI, 0);
// ctx.arc(355, 100, 10, Math.PI, 0);
ctx.fill();
