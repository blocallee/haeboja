class Hero {
  // 2. 넘겨받은 class명을 el로 받아준다.
  constructor(el) {
    // 3. 넘어온 클래스명으로 검색해 변수에 담는다.
    this.el = document.querySelector(el);

    // 9. 캐릭터 이동에 필요한 변수 추가.(초기화까지)
    // 9-1. 이동거리 movex, 이동속도 speed
    this.movex = 0;
    this.speed = 11;

    // 15. 수리검 방향 바꾸기
    // 15-1. 히어로가 보고 있는 방향을 알 수 있는 변수 추가
    this.direction = "right";
  }
  // 1. 키를 눌렀을 때 히어로의 움직임을 변경
  keyMotion() {
    // 4. key down 오브젝트를 사용해 키 눌림을 체크.
    if (key.keyDown["left"]) {
      // 15-2. 키를 눌렀을 때 히어로 방향 변수 업데이트
      this.direction = "left";

      // 4.(2) key down 오브젝트를 사용해 키 눌림을 체크.
      this.el.classList.add("run");
      // 5. left를 누를 경우 반대편으로 뛰게 flip 클래스 추가
      this.el.classList.add("flip");

      // 9-2. 'left'키가 눌릴 때 마이너스값으로 왼쪽으로 이동
      //    this.movex = this.movex - this.speed;
      // 19-1. 히어로가 왼쪽 화면을 끝을 넘어가는 문제 수정
      // 이동거리가 0보다 작거나 같다면 0으로 적용하고 그렇지 않다면 기존 코드로 적용.
      this.movex = this.movex <= 0 ? 0 : this.movex - this.speed;
    } else if (key.keyDown["right"]) {
      // 15-2-1. 키를 눌렀을 때 히어로 방향 변수 업데이트
      this.direction = "right";

      this.el.classList.add("run");

      // 5-1. 댜시 right를 누를 경우 flip 클래스 제거
      this.el.classList.remove("flip");

      // 9-3. 'right'키가 눌리면 양수값으로 오른쪽으로 이동
      this.movex = this.movex + this.speed;
    }

    // 7. X 키를 눌렀을 경우 'attack' 클래스 추가
    if (key.keyDown["attack"]) {
      // 13-10. launch가 false일 때만 인스턴스 생성하게 조건문 추가
      if (!bulletComProp.launch) {
        this.el.classList.add("attack");

        // 12-3. 공격 키를 눌렀을 때 수리검 클래스를 생성
        // new Bullet();
        // 13-2. 공격 키를 누를 때마다 push 메서드를 사용해서
        // 수리검의 모든 인스턴스를 배열에 추가
        bulletComProp.arr.push(new Bullet());

        // 13-11. launch 값을 true로 변경.
        bulletComProp.launch = true;
      }
    }

    // 6. left와 right 키 모두 뗐을 때 대기 동작이 나오게 적용
    if (!key.keyDown["left"] && !key.keyDown["right"]) {
      this.el.classList.remove("run");
    }

    // 8. X 키를 뗐을 경우 'attack' 클래스 제거
    if (!key.keyDown["attack"]) {
      this.el.classList.remove("attack");

      // 13-12. 공격 키를 뗐을 때 launch 값을 false로 변경
      bulletComProp.launch = false;
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
  // 12-11. 수리검이 히어로 손에 위치하기 위한 새로운 메서드 추가
  size() {
    // 12-12. 히어로 엘리먼트 넓이와 높이 리턴한다.
    return {
      // 12-13. offsetWidth와 offsetHeight 사용 (getBoundingClientRect를 사용하도 되지만!)
      width: this.el.offsetWidth,
      height: this.el.offsetHeight,
    };
  }
}

/*
 * 수리검
 */
// 12. 수리검 클래스 만들기
class Bullet {
  // 12-1. 생성자 추가
  constructor() {
    // 12-4. 수리검 엘레먼트를 추가 할 부모 노드를 찾는다.
    // 부모 노드는 게임 엘레먼트이다.
    this.parentNode = document.querySelector(".game");
    // 12-5. 수리검 엘레먼트 생성하고 클래스면 추가.
    this.el = document.createElement("div");
    this.el.className = "hero_bullet";
    // 12-8. 수리검 좌표(x,y)담을 변수 선언
    this.x = 0;
    this.y = 0;

    // 13-3. 수리검의 스피드, 거리 변수 추가
    this.speed = 30;
    this.distance = 0;

    // 15-5. 수리검의 방향을 알 수 있는 변수 추가
    this.bulletDirection = "right";

    // 12-6. Init 메서드 호출
    this.init();
  }
  // 12-2. init 메서드 추가
  init() {
    // 15-5-1. 수리검을 생성할 때 히어로의 방향을 체크해서 수리검의 방향 정하기
    // 히어로 방향이 left 라면 left 적용, 아니라면 right 적용
    this.bulletDirection = hero.direction === "left" ? "left" : "right";

    // 12-9. 추가한 x,y 변수에 히어로의 위치 넣기
    //    this.x = hero.position().left;
    //    this.y = hero.position().bottom ;
    // 12-13 size로 구한 width와 height을 left에는 width 더하고 bottom에는 height 빼는 등 손 위치만큼 계산해준다.
    //    this.x = hero.position().left + hero.size().width / 2;
    // 17-7. 수리검이 히어로가 이동한만큼의 위치에서 생성되게 적용
    // 히어로의 position().left가 아닌 히어로가 이동한만큼의 값을 더하고
    //    this.x = hero.movex + hero.size().width / 2;
    // 19. 왼쪽으로 수리검 던질 때 캐릭터 뒤에서 생성되는 문제 수정
    this.x =
      this.bulletDirection === "right"
        ? hero.movex + hero.size().width / 2
        : (hero.movex = hero.size().width / 2);
    this.y = hero.position().bottom - hero.size().height / 2;

    // 13-13. 수리검의 x좌표를 distance 값에 넣어준다. (즉, 히어로의 위치값을 넣어주는 것)
    this.distance = this.x;

    // 12-10. 생성한 Bullet 엘리먼트에 x,y값 적용
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    // 12.7. 부모 노드에 생성한 태그를 자식 태그로 붙이기
    this.parentNode.appendChild(this.el);
  }
  // 13-4. 수리검의 이동을 담당할 moveBullet 메서드 생성
  moveBullet() {
    // 15-4. 수리검 이미지 수정
    // 15-4-1. rotate 를 담을 변수 추가
    let setRotate = "";

    // 15-3. 히어로가 보고있는 방향으로 수리검 이동
    // (13-7 코드 주석 처리)
    // 15-5-2. 기존에 히어로 방향으로 수리검 방향을 결정했던 코드(15-3번)를
    // 수리검을 생성할 때의 방향을 체크하는 코드로 수정
    //if (hero.direction === "left") {
    if (this.bulletDirection === "left") {
      this.distance -= this.speed;

      // 15-4-2.
      setRotate = "rotate(180deg)";
    } else {
      this.distance += this.speed;
    }
    // 13-7. 먼저 수리검이 이동할 거리 distance 변수에
    // 수리검의 스피드를 더해준다. (수리검의 거리는 계속해서 30씩 증가)
    //this.distance += this.speed;

    // 13-8. this.distance 값을 수리검 엘리먼트에 적용하면 수리검이 이동한다.
    // 15-4-3. setRotate 속성 적용
    this.el.style.transform = `translate(${this.distance}px, ${this.y}px) ${setRotate}`;

    // 14-02. moveBullet 위치하여 수리검 이동할 때마다 호출
    this.crashBullet();
  }

  // 14. 히어로의 위치를 알아내는 position 메서드 그대로 복붙해서 적용
  // this.el 변수이기 떄문에 따로 수정할 필요는 없다.
  // 상속을 활용한다면 같은 메서드를 두 번 작성할 필요는 없다.
  position() {
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
      bottom:
        gameProp.screenHeight -
        this.el.getBoundingClientRect().top -
        this.el.getBoundingClientRect().height,
    };
  }

  // 14-01. 수리검 화면 벗어남과 충돌 체크 처리할 crachBullet 메서드 작성
  // 이 메서드는 수리검이 이동할 때마다 호출하며
  // 화면이 벗어났는지 충돌했는지 체크
  crashBullet() {
    // 14-03. 수리검 왼쪽 위치가 스크린의 넓이보다 크다면
    // 수리검의 오른ㄴ쪽 위치가 0보다 작다면(화면 왼쪽을 벗어나면~!)
    // 두 조건을 만족한다면 수리검 엘리먼트 삭제
    if (
      this.position().left > gameProp.screenWidth ||
      this.position().right < 0
    ) {
      // 14.04. 수리검 엘리먼트를 삭제
      this.el.remove();
    }
  }
}
