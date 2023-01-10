class Hero {
  // 2. 넘겨받은 class명을 el로 받아준다.
  constructor(el) {
    // 3. 넘어온 클래스명으로 검색해 변수에 담는다.
    this.el = document.querySelector(el);

    // 9. 캐릭터 이동에 필요한 변수 추가.(초기화까지)
    // 9-1. 이동거리 movex, 이동속도 speed
    this.movex = 0;
    this.speed = 16;
  }
  // 1. 키를 눌렀을 때 히어로의 움직임을 변경
  keyMotion() {
    // 4. key down 오브젝트를 사용해 키 눌림을 체크.
    if (key.keyDown["left"]) {
      this.el.classList.add("run");
      // 5. left를 누를 경우 반대편으로 뛰게 flip 클래스 추가
      this.el.classList.add("flip");

      // 9-2. 'left'키가 눌릴 때 마이너스값으로 왼쪽으로 이동
      this.movex = this.movex - this.speed;
    } else if (key.keyDown["right"]) {
      this.el.classList.add("run");

      // 5-1. 댜시 right를 누를 경우 flip 클래스 제거
      this.el.classList.remove("flip");

      // 9-3. 'right'키가 눌리면 양수값으로 오른쪽으로 이동
      this.movex = this.movex + this.speed;
    }

    // 7. X 키를 눌렀을 경우 'attack' 클래스 추가
    if (key.keyDown["attack"]) {
      this.el.classList.add("attack");
    }

    // 6. left와 right 키 모두 뗐을 때 대기 동작이 나오게 적용
    if (!key.keyDown["left"] && !key.keyDown["right"]) {
      this.el.classList.remove("run");
    }

    // 8. X 키를 뗐을 경우 'attack' 클래스 제거
    if (!key.keyDown["attack"]) {
      this.el.classList.remove("attack");
    }

    // 10. 히어로 element에 movex값을 대입해서 히어로가 움직이도록 해보자
    this.el.parentNode.style.transform = `translateX(${this.movex}px)`;
  }

  // 11. 히어로의 위치를 알아내는 position 메서드 추가
  position() {
    // 11-1. position함수를 호출 시 return 값 적용.
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      // 11-2. 화면 아래를 기준으로 top값을 구하기
      // 화면높이 - 히어로의 탑값
      // top: window.innerHeight - this.el.getBoundingClientRect().top,
      // 11-4. 자주 사용하는 값 공통처리 (gameProp)
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,

      // 11-3. 화면 아래를 기준으로 bottom값 구하기
      // 화면높이 - 히어로의 탑값 - 히어로의 높이
      // bottom: window.innerHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
      // 11-4-1. 자주 사용하는 값 공통처리 (gameProp)
      bottom:
        gameProp.screenHeight -
        this.el.getBoundingClientRect().top -
        this.el.getBoundingClientRect().height,
    };
  }
}
