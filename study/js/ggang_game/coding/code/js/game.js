// 7. 키 이벤트로 감지된 키값은 숫자이기 때문에
// 어떤 키가 눌렸지는 직관적으로 알 수 있는 함수 추가
// 7-1. 키오브젝트 만들기
const key = {
  // 7-4. key down 이벤트에서 키눌림을 편하게 체크할 수 있도록 key down 오브젝트 추가
  keyDown: {},
  // 7-2. 필요한 key 코드값만 key value object를 만들어 추가.
  keyValue: {
    37: "left",
    39: "right",
    // 9. 공격 key인 'x' 추가 후
    // class.js keyMotion 메서드에 조건문으로 attack 클래스 추가/제거
    88: "attack",
  },
};

// 11. 자주 사용하는 값 공통터리
const gameProp = {
  // 11-2. 화면의 넓이/높이 값 추가
  screenWidth: window.innerWidth,
  screenHeight: window.innderHeight,
};

// 10-6.움직임이 자연스럽지 않음(연속적인 키 눌림으로 딜레이 차이 발생)
const renderGame = () => {
  // 10-10
  hero.keyMotion();

  // 10-8. requestAnimationFrame 이용해 renderGame 함수를 재귀호출
  // 초당 약 60프레임을 그리며 rednerGame 함수는 무한반복 된다.
  window.requestAnimationFrame(renderGame);
};

// 1. window에 이벤트를 추가하고 관리.
const windowEvent = () => {
  // 6. 키보드 이벤트인 keydown과 keyup을 윈도우 함수에 추가해서
  // 사용자가 누른 키를 감지한다.
  // keyup: 키를 똈을 때 감지.
  // keydown: 키 눌렀을 때 감지.
  window.addEventListener("keydown", (e) => {
    // 7-3. 사용자가 누른 key code 값을 key value object에서 value 값을 찾아보자.
    // console.log(key.keyValue[e.which]);

    // 7-5. 사용자가 누른 key value인 left, right를
    // key down object에 key값으로 넣어주고
    // value는 불리언(true)값 적용.
    key.keyDown[key.keyValue[e.which]] = true;

    // 8-2. key를 누를 때 히어로 인스턴스에 keyMotion 메소드를 호출해서 히어로의 움직임을 변경.
    // 10-9. 키 이벤트에 작성한 키모션 메소드 삭제하고 렌더게임함수에서 호출
    // hero.keyMotion();

    // 7-6. 로그를 찍어보자
    // console.log(key.keyDown);
  });
  window.addEventListener("keyup", (e) => {
    // 7-7. 키를 뗐을 때 key Down object의 value값을 false로 적용
    key.keyDown[key.keyValue[e.which]] = false;
    // 8-2-1, 10-9-1
    //hero.keyMotion();
  });
};

// 10. 이미지 사전 로드
const loadImg = () => {
  // 10-1. 미리 로드되어야 할 백그라운드 이미지를 배열에 담는다
  const preLoadImgSrc = [
    "../../lib/images/ninja_run.png",
    "../../lib/images/ninja_attack.png",
  ];

  // 10-2. 배열에 있는 이미지 length만큼 반복하는 반복문 추가
  // 이미지 로드 함수를 실행하면 페이지가 로드될 때 배열에 담긴 모든 이미지가 미리 로드된다.
  preLoadImgSrc.forEach((arr) => {
    // 10-3. 이미지 객체 인스턴스를 생성해서(image태그)
    const img = new Image();
    // 10-4. Img src 속성에 이미지 배열에 있는 이미지 주소를 추가.
    img.src = arr;
  });
};
// 8. class.js 에서 Hero 클래스를 만든 후 인스턴스 생성
let hero;

// 2. 프로그램 실행에 필요한 함수나 메소드를 호출
const init = () => {
  // 8-1. init 함수에서 인스턴스 생성
  // 인스턴스를 생성하면서 히어로의 클래스명을 넘겨준다.
  hero = new Hero(".hero");
  // 10-5. 이미지 로드 함수는 프로그램 시작을 위해 호출되는 함수이기 때문에 init함수에서 호출
  loadImg();
  // 3.함수 취지에 맞게 windowEvent 함수를 호출
  windowEvent();

  //10-7. renderGame 도 게임 실행에 필요한 함수이기 때문에 init함수에서 호출
  renderGame();
};

// 4. 모든 요소 로드 후에 게임이 실행될 수 있게
// 5. onload 이벤트 사용하여 init 함수를 실행하도록 하자.
window.onload = () => {
  init();
};
