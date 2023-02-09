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

// 24. 몬스터 배열 처리
// 24-1. 몬스터를 관리할 오브젝트 배열 추가
const allMonsterComProp = {
  arr: [],
};

// 13. 수리검 이동
const bulletComProp = {
  // 13-9. 수리검을 던졌는지 공통으로 체크하는 변수 추가
  launch: false,
  // 13-1. 생성된 모든 수리검을 관리할 배열
  // 수리검 배열. 공격 키를 누를 때 생성되는 수리검의 모든 인스턴스를 이 배열에 담을 것이다.
  arr: [],
};

// 17-1. 배경을 관리할 오브젝트 생성
const gameBackground = {
  gameBox: document.querySelector(".game"),
};

// 35. 게임 시작할 때 게임 스타트 추가와 몬스터를 소환.
// 35-1. 스테이지를 관리해줄 Object를 추가
const stageInfo = {
  stage: [],
  // 38-1. totalScore 변수 추가
  totalScore: 0,
  // 37. 스테이지 레벨별 몬스터 추가 및 레벨업 시 히어로 스탯 조정
  // 37-1. 몬스터 배열을 만들어 key,value로 추가
  monster: [
    { defaultMon: greenMon, bossMon: greenMonBoss },
    { defaultMon: yellowMon, bossMon: yellowMonBoss },
    { defaultMon: pinkMon, bossMon: pinkMonBoss },
  ],
};

// 11. 자주 사용하는 값 공통터리
const gameProp = {
  // 11-2. 화면의 넓이/높이 값 추가
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,

  // 30-3. game over 변수 추가
  gameOver: false,
};

// 10-6.움직임이 자연스럽지 않음(연속적인 키 눌림으로 딜레이 차이 발생)
const renderGame = () => {
  // 10-10
  hero.keyMotion();

  // 17-2. setGameBackground 호출
  setGameBackground();

  // 13-5. 히어로의 이동을 처리할 때처럼 렌더게임 함수에서 moveBullet 메서드를 호출해서 수리검이 이동하도록 적용.
  // 수리검 배열의 길이만큼 반복하는 반복문
  bulletComProp.arr.forEach((arr, i) => {
    // 13-6. 수리검의 이동을 담당하는 moveBullet 메서드 호출
    arr.moveBullet();
  });

  // 27-1. 몬스터 배열의 길이만큼 도는 반복문을 만들어서 moveMonster 메서드 호출
  allMonsterComProp.arr.forEach((arr, i) => {
    arr.moveMonster();
  });

  // 36-1-1.  호출: game.js 렌더게임 함수에서 계속 호출하면서 몬스터를 모두 사냥했는지 체크
  stageInfo.stage.clearCheck();

  // 10-8. requestAnimationFrame 이용해 renderGame 함수를 재귀호출
  // 초당 약 60프레임을 그리며 rednerGame 함수는 무한반복 된다.
  window.requestAnimationFrame(renderGame);
};

// 30. 게임 종료를 처리할 End game 함수 추가
const endGame = () => {
  // 30-4. end game 호출 시 gameOver 값 변경
  gameProp.gameOver = true;

  // 30-6. 강제로 키다운 이벤트 종료
  key.keyDown.left = false;
  key.keyDown.right = false;

  // 30-1. 호출 시 active 클래스 추가
  document.querySelector(".game_over").classList.add("active");
};

// 17. 배경 이미지에 페럴럭스 효과 적용 (renderGame에 적용)
// 패럴럭스 효과 적용 : 히어로가 이동한 만큼 배경도 이동되게 적용
const setGameBackground = () => {
  // 17-3. game엘리먼트에 히어로가 이동한 값을 적용
  // 캐릭터가 이동한 값을 패럴럭스 변수에 담는다.
  //    let parallaxValue = hero.movex;
  // 17-4. hero.movex에 -1을 곱해 배경은 음수, 히어로는 양수로 이동처리.
  //    let parallaxValue = hero.movex * -1;
  // 17-5. 히어로가 가운데로 왔을 때 배경이 이동하도록 적용.
  // 중간위치는 화면넓이/3, 여기에다 히어로가 이동한 값을 빼보자
  //    let parallaxValue = hero.movex - (gameProp.screenWidth / 3) * -1;
  // 17-6. 시작 시 parallaxValue가 0이 아닌 화면넓이/3 값이라 배경 왼쪽이 짤려있다.
  // 0을 적용하기 위해서 Math.min()을 사용하자. Math.min()은 가장 작은 값을 반황한다.
  // 0보다 크면 0을 적용하고 0보다 작다면 마이너스 값이 적용된다.
  let parallaxValue = Math.min(0, (hero.movex - gameProp.screenWidth / 3) * -1);
  gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
};

// 1. window에 이벤트를 추가하고 관리.
const windowEvent = () => {
  // 6. 키보드 이벤트인 keydown과 keyup을 윈도우 함수에 추가해서
  // 사용자가 누른 키를 감지한다.
  // keyup: 키를 똈을 때 감지.
  // keydown: 키 눌렀을 때 감지.
  window.addEventListener("keydown", (e) => {
    /* 7-3. 사용자가 누른 key code 값을 key value object에서 value 값을 찾아보자.
      - console.log(key.keyValue[e.which]);
    */
    /* 7-5. 사용자가 누른 key value인 left, right를
      - key down object에 key값으로 넣어주고
      - value는 불리언(true)값 적용.
      -  key.keyDown[key.keyValue[e.which]] = true;		
    */
    // 30-5. 키이벤트로 이동해서 키눌림을 체크하는 부분에 조건문 작성하여 게임 오버시 키이벤트 종료
    if (!gameProp.gameOver) {
      key.keyDown[key.keyValue[e.which]] = true;
    }

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

  // 16. gameProp 오브젝트 넓이, 높이를 현재 화면의 넓이, 높이로 수정
  window.addEventListener("resize", (e) => {
    gameProp.screenWidth = window.innerWidth;
    gameProp.screenHeight = window.innerHeight;
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

// 20-1. 몬스터 인스턴스 생성 // 24-2. 대량의 몬스터를 담을 배열을 추가했기 때문에 제거
//    let monster;

// 2. 프로그램 실행에 필요한 함수나 메소드를 호출
const init = () => {
  // 8-1. init 함수에서 인스턴스 생성
  // 인스턴스를 생성하면서 히어로의 클래스명을 넘겨준다.
  hero = new Hero(".hero");

  // 35-3. Stage 클래스 인스턴스 생성
  stageInfo.stage = new Stage();

  // 20-1.
  //    monster = new Monster();
  // 22-6. 첫번째 인자값으로 (몬스터 위치, 몬스터 체력) 넘겨줌
  //    monster = new Monster(500, 9000);
  /* 24-2-1. 생성한 몬스터 인스턴스를 몬스터 공통 배열에 담기
	  -   allMonsterComProp.arr[0] = new Monster(700, 6000);
		-   allMonsterComProp.arr[1] = new Monster(1500, 400);
	*/
  /* 33-2. 인스턴스 생성할 때 핑크몬 오브젝트 넘겨주기.
		- 기존 new Monster(생성 위치, 체력)
		- 변경 new Monster(Object, 생성 위치) -> 생성위치 = 화면 넓이 + 생성하고 싶은 위치	
	  -    allMonsterComProp.arr[0] = new Monster(pinkMon, gameProp.screenWidth +  700);
    -    allMonsterComProp.arr[1] = new Monster(yellowMon,gameProp.screenWidth + 1400);
    -    allMonsterComProp.arr[2] = new Monster(greenMon, gameProp.screenWidth + 2100);
	*/
  /* 34-2. 반복문을 사용하여 일반 몬스터 대량 소환 및 보스몹 소환!
	    -  i를 곱해서 몬스터끼리의 간격 설정
  for (let i = 0; i <= 10; i++) {
    if (i === 10) {
      allMonsterComProp.arr[i] = new Monster(
        greenMonBoss,
        gameProp.screenWidth + 600 * i
      );
    } else {
      allMonsterComProp.arr[i] = new Monster(
        greenMon,
        gameProp.screenWidth + 700 * i
      );
    }
  }
  */
  // 35-7-1. 몬스터 소환 반복문 잘라내서 클래스 Stage callMonster 메서드로 이동

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
