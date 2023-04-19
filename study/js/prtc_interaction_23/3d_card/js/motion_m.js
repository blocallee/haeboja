let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let isMobile = false;

const mobileChk = function () {
  const mobileKeyWords = new Array(
    'Android',
    'iPhone',
    'iPad',
    'BlackBerry',
    'Windows CE',
    'SAMSUNG',
    'LG',
    'MOT',
    'SonyEricsson'
  );
  for (let info in mobileKeyWords) {
    if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
      return true;
    }
  }
  return false;
};

window.onload = function () {
  const wrap = document.querySelector('.contentWrap');

  const loopMobile = function () {
    mx += (x - mx) * 0.1;
    my += (y - my) * 0.1;

    wrap.style.transform =
      'translate3d(-50%, -50%, 0) rotateX(' +
      (my - 50) +
      'deg) rotateY(' +
      mx +
      'deg)';

    window.requestAnimationFrame(loopMobile);
  };

  const loop = function () {
    mx += (x - mx) * 0.1;
    my += (y - my) * 0.1;
    //가속도 설정. 뒤의 값을 변경하면 가속도 값 변경

    wrap.style.transform =
      'translate3d(-50%, -50%, 0) rotateX(' +
      my / 10 +
      'deg) rotateY(' +
      -mx / 10 +
      'deg)';
    //마우스 위치에 따른 대상의 움직임 위치 셋팅

    window.requestAnimationFrame(loop);
    //반복 실행
  };

  isMobile = mobileChk();

  if (isMobile) {
    window.addEventListener('deviceorientation', function (e) {
      //디바이스가 움직임 감지될때 실행
      x = e.gamma;
      y = e.beta;
    });
    loopMobile();
  } else {
    //pc면 실행
    window.addEventListener('mousemove', function (e) {
      x = e.clientX - window.innerWidth / 2;
      y = e.clientY - window.innerHeight / 2;
      //마우스 위치값을 화면의 정가운데가 0,0이 되도록 맞춤
    });
    loop();
  }
};
