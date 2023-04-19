let windowWidth, windowHeight;

window.onload = function () {
  const _card = document.querySelectorAll('.cardItem');
  const _btnRandom = document.getElementById('btnRandom');
  const _btnReset = document.getElementById('btnReset');

  const cardRandom = function () {
    _card.forEach(function (item, i) {
      TweenMax.to(item, 1, {
        top: Math.random() * windowHeight,
        left: Math.random() * windowWidth,
        rotation: Math.random() * 100,
        ease: Power4.easeInOut,
        delay: i * 0.1,
      });
    });
  };

  const cardSetting = function () {
    _card.forEach(function (item, i) {
      TweenMax.to(item, 1, {
        top: windowHeight / 2 - i * 40,
        left: windowWidth / 2 + (i * 40 - 200),
        rotation: 0,
        ease: Power3.easeInOut,
        delay: i * 0.2,
      });
    });
  };

  const resize = function () {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    cardSetting();
  };

  resize();

  _btnRandom.addEventListener('click', cardRandom);
  _btnReset.addEventListener('click', cardSetting);
  window.addEventListener('resize', resize);
};
