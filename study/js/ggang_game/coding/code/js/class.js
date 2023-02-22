// 43. Npc 클래스 추가
class Npc {
  //constructor() {
  // (47-1-2) 넘어온 퀘스트 오브젝트 프로퍼티(levelQuest)를 받는다
  constructor(property) {
    // (47-1-3) property 변수 생성 : 넘어온 프로퍼티값 담기
    this.property = property;
    // (43-1) 클래스에 인스턴스를 생성할 때 npc를 화면에 추가
    this.parentNode = document.querySelector(".game");
    this.el = document.createElement("div");
    this.el.className = "npc_box";
    // (43-6-5) hero와 npc가 충돌했을 때를 체크할 변수 추가
    this.npcCrash = false;

    // (44) 히어로와 npc가 충돌했을 때 사용자가 엔터키를 누르면 모달창이 나타나도록
    //(44-1) 모달창 체크 변수 선언
    this.talkOn = false;
    //(44-2) 모달 el를 담을 변수
    this.modal = document.querySelector(".quest_modal");

    // (46-2) 퀘스트 시작, 종료를 체크할 변수 선언!
    this.questStart = false;
    this.questEnd = false;

    this.init();
  }

  init() {
    // (43-2) html에 작성한 요소를 js로 가져와서 변수에 할당연산자로 담기
    let npcTalk = "";
    npcTalk += '  <div class="talk_box">';
    /*  quest 내용 (47-2-1) 위치로 이동
    npcTalk += "<p>큰일이야<br />사람들이 좀비로 변하고 있어.. <br /><span>대화 Enter</span></p>"; */
    // (47-2-2) quest.js levelQuest 오브젝트에서 property 적용
    npcTalk += this.property.idleMessage;
    npcTalk += "  </div>";
    npcTalk += '  <div class="npc"></div>';
    npcTalk += "</div>";
    // (43-3) npc_box에 npcTalk 변수에 있는 모든 요소들을 담고
    this.el.innerHTML = npcTalk;

    // (47-3-2) npc를 초기화할 때 위치 잡아주기
    this.el.style.left = this.property.positionX + "px";

    // (43-4) parent Node 인 .game에 npc_box 엘리먼트를 추가
    this.parentNode.appendChild(this.el);
  }

  // (43-6) 충돌기능 : npc 와 히어로의 충돌했을 때만 대화 가능)
  // (43-6-1) Npc의 위치 알기 : position 메서드 추가(hero 클래스 11번꺼 복붙)
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

  // (43-6-2) 충돌메서드 추가
  crash() {
    // (43-6-3) 충돌 조건문
    if (
      hero.position().right > this.position().left &&
      hero.position().left < this.position().right
    ) {
      // (43-6-6) npcCrash변수를 npc와 hero가 충돌 시 true로 변경
      this.npcCrash = true;
    } else {
      this.npcCrash = false;
    }
  }

  //(44-3) talk 메서드 추가 : 모달 show/hide
  talk() {
    //(44-3-1) 조건문 : 대화창 열려있지 않고, 충돌했을 때
    if (!this.talkOn && this.npcCrash) {
      this.talkOn = true;
      // (45-3) 모달이 열릴 때 quest() 호출
      //     this.quest();
      // (47-2-7) 기존 quest() 호출하던 부분 수정
      this.property.quest();
      this.modal.classList.add("active");
    } else if (this.talkOn) {
      this.talkOn = false;
      this.modal.classList.remove("active");
    }
  }

  /* (47-2-3) quest() 메서드(퀘스트 내용)를 quest.js로 분리하기
    // ( 45 ) 퀘스트 내용을 만들어 모달에 추가.
    quest() {
      // (46-1) 메세지 오브젝트 만들기 : 선언
      const message = {
        // (46-1-1) 퀘스트 시작
        start:
          "마을에 몬스터가 출몰해 주민들을 좀비로 만들고 있어.. 몬스터 사냥해 주민을 구하고 <span>레벨을 5이상</span>으로 만들어 힘을 증명한다면 좀비왕을 물리칠 수 있도록 내 힘을 빌려줄께!!",
        // (46-1-2) 퀘스트 진행중 : npc에게 말 한 번 이상 걸었고 조건 불충족.
        ing: "이런 아직 레벨을 달성하지 못했구나.",
        // (46-1-3) 퀘스트 성공 : npc에게 말 한 번 이상 걸었고 조건 충족.
        suc: "레벨을 달성했구나! 힘을 줄게!",
        // (46-1-4) 퀘스트 완료 : 퀘스트 완료 후에 다시 npc에게 말을 걸었을 때
        end: "고마워! 행운을 빌어!",
      };

      // (46-2-1) 퀘스트 진행 상태에 따른 메세지를 담을 변수 선언
      let messageState = "";

      // (46-2-2) 퀘스트 진행 상황에 맞는 메세지가 출력되도록 조건문 작성
      if (!this.questStart) {
        messageState = message.start;
        this.questStart = true;
      } else if (this.questStart && !this.questEnd && hero.level < 5) {
        messageState = message.ing;
      } else if (this.questStart && !this.questEnd && hero.level >= 5) {
        messageState = message.suc;
        this.questEnd = true;

        // (46-3-4)퀘스트 완료 시 보상으로 heroUpgrade 호출
        hero.heroUpgrade(50000);
      } else if (this.questStart && this.questEnd) {
        messageState = message.end;
      }

      // (45-1) html에 적용했던 퀘스트 내용을 가져온다(html에서는 삭제)
      let text = "";
      text += '<figuer class="npc_img">';
      text += ' <img src="../../lib/images/npc.png" alt="npc" />';
      text += "</figuer>";
      text += "<p>";

      // 46-2-3 기존 부분 주석처리
      //      text += "마을에 몬스터가 출몰해 주민들을 좀비로 만들고 있어.. 몬스터 사냥해 주민을 구하고 <span>레벨을 5이상</span>으로 만들어 힘을 증명한다면 좀비왕을 물리칠 수 있도록 내 힘을 빌려줄께!!";
      // (46-2-4) messageState 를 화면에 출력
      text += messageState;
      text += "</p>";

      // (45-2) quest_talk을 찾아서 text 추가
      const modalInner = document.querySelector(
        ".quest_modal .inner_box .quest_talk"
      );
      modalInner.innerHTML = text;
    }
  */
}

// 35-2. stage 클래스 추가
class Stage {
  constructor() {
    //(36-6) 레벨 변수 추가하여 스테이지 단계 적용.
    this.level = 0;
    // 36-2-1. 모든 몬스터가 0일 때 문제를 해결하기 위한 flag 추가
    this.isStart = false;

    /* (42-1-2) (stage class) 필요없는 코드 정리 (주석)
        // 35-2-2. 인스턴스 생성 시 stageStart 메서드 호출
        this.stageStart();
    */
  }

  /* (42-1-2) (stage class) 필요없는 코드 정리 (주석)
    // 35-2-1. stageStart 메서드 추가
    stageStart() {
      // 36-5. start와 clear 의 문구 겹침 문제 setTimeout으로 해결
      setTimeout(() => {
        // 36-2-2. 스테이지가 시작할 때 true
        this.isStart = true;

        // 35-4-2. stageGuide 메서드 호출
        //  -   this.stageGuide();
        // 36-3. 문구변경을 위한 stageGuide 메서드 변경(start,clear)
        this.stageGuide(`START LEVEL${this.level + 1}`);

        // 35-8. callMonster 메서드 호출
        this.callMonster();
      }, 2000);
    }
  */

  // 35-4. 게임 시작할 때 Start Level 텍스트가 나타나도록 적용
  /* 35-4-1. 텍스트를 처리할 스테이지 가이드 메서드 생성
		-     stageGuide(){
	*/
  // 36-3-1. 호출할 때 넘어온 매개변수를 받아서 처리할 수 있게 수정
  stageGuide(text) {
    // 35-5. textBox 만들어서 부모노드에 추가하기
    this.parentNode = document.querySelector(".game_app");
    this.textBox = document.createElement("div");
    this.textBox.className = "stage_box";

    // -  (35-4)   this.textNode = document.createTextNode('START LEVEL1');
    // 36-3-2. 호출할 때 넘어온 매개변수를 받아서 처리할 수 있게 수정
    this.textNode = document.createTextNode(text);

    this.textBox.appendChild(this.textNode);
    this.parentNode.appendChild(this.textBox);

    // 35-6. 텍스트박스가 나타났다 일정 시간 뒤에 사라지게 적용
    setTimeout(() => this.textBox.remove(), 1500);
  }

  // 35-7. 몬스터 소환 메서드 추가
  callMonster() {
    for (let i = 0; i <= 10; i++) {
      if (i === 10) {
        /* 35-7 에서 작성
	      allMonsterComProp.arr[i] = new Monster(greenMonBoss, hero.movex + gameProp.screenWidth + 600 * i);
				*/
        // 37-2. stageInfo에서 추가한 key,value값 적용
        allMonsterComProp.arr[i] = new Monster(
          stageInfo.monster[this.level].bossMon,
          hero.movex + gameProp.screenWidth + 600 * i
        );
      } else {
        /* 35-7 에서 작성
					allMonsterComProp.arr[i] = new Monster(greenMon,gameProp.screenWidth + 700 * i);
				*/
        // 37-2-1. stageInfo에서 추가한 key,value값 적용
        allMonsterComProp.arr[i] = new Monster(
          stageInfo.monster[this.level].defaultMon,
          hero.movex + gameProp.screenWidth + 700 * i
        );
      }
    }
  }

  // 36-1. 모든몬스터를 사냥했는지 확인하는 메서드 생성
  clearCheck() {
    /* 36-2. 몬스터의 길이가 0과 같다면 모든 몬스터를 사냥했다는 뜻.
				- 하지만 이렇게만 작성화면 이 조건문은 무한반복이 된다.
				flag를 추가하여 해결할 수 있다.
				-    if(allMonsterComProp.arr.length === 0){
		*/

    /* (42-1-2) (stage class) 필요없는 코드 정리 (주석)
      // 36-2-3. 추가 한 isStart가 true일 경우에만 반복문 안으로 들어올 수 있게 수정.
      if (allMonsterComProp.arr.length === 0 && this.isStart) {
        // 36-2-4. isStart 를 false로 변경
        this.isStart = false;

        // 36-6-2. 모든 몬스터 샤냥 시 1씩 증가
        this.level++;

        // 37-3. 몬스터 정보 배열 길이 만큼 조건문 적용
        if (this.level < stageInfo.monster.length) {
          // 36-3-3. 모든 몬스터를 사냥했다면 stageGuide 메서드 호출, 텍스트 전달
          this.stageGuide("CLEAR");

          // 36-4. 모든 몬스터를 사냥했을 떼 stageStart 메서드를 다시 호출한다.
          //	-    코드 적용 후 몬스터의 위치가 히어로는 움직였지만 화면 기준으로 되어있기 때문.
          this.stageStart();

          // 37-5-1. heroUpgrade 메서드 호출. (스테이지가 끝날 때)
          hero.heroUpgrade();

          // 37-4. else 추가. All clear 문구 띄우기
        } else {
          this.stageGuide("ALL CLEAR!!");
        }
      }
    */

    // (42-1-3) 몬스터 위치값을 넣어뒀던 stageInfo의 callPosition 배열의 길이만큼 반복할 반복문
    stageInfo.callPosition.forEach((arr) => {
      /* (42-1-4) 조건문 (히어로가 이동한 위치와 몬스터 소환 위치를 비교)
					-    if(hero.movex >= arr){
			*/
      // (42-1-8) 히어로가 몬스터 소환 위치를 넘었고 현재 출현한 모든 몬스터를 사냥했을 때 다음 몬스터 나오게 수정
      if (hero.movex >= arr && allMonsterComProp.arr.length === 0) {
        //(42-2)  몬스터가 자연스럽게 나오게 수정
        this.stageGuide("곧 몬스터가 몰려옵니다!!");
        // (42-1-5) 호출한 몬스터는 배열에 가장 첫번째부터 순차적으로 배열에서 삭제.
        stageInfo.callPosition.shift();
        //(42-2-1) 몬스터가 1초 뒤에 나오도록 수정
        setTimeout(() => {
          // (42-1-6) 몬스터 소환
          this.callMonster();

          // (42-1-7) 스테이지 레벨 증가
          this.level++;
        }, 1000);
      }
    });
  } // clearCheck
}

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

    // 23. 히어로의 공격 데미지 변수 추가
    // 23-1. 히어로의 공격 데미지 변수 추가
    this.attackDamage = 10000;

    /* 28-1-1. 히어로의 hp 변수
		  - 히어로의 체력을 백분율로 계산할 값을 담을 변수 추가
		*/
    this.hpProgress = 0;
    // 28-1-2. 히어로의 기본 체력 변수
    this.hpValue = 100000;
    // 28-1-3. 히어로의 초기 체력을 넣어둘 변수
    this.defaultHpValue = this.hpValue;

    // 32-4. 공격 데미지를 담을 새 변수 추가
    this.realDamage = 0;

    // (39-2-1) 슬라이드스피드 변수 추가. 히어로가 좌우로 움직일 때처럼 필요
    this.slideSpeed = 14;

    // (39-3) 일정 시간 지나면 slide 클래스 제거
    // (39-3-1)슬라이드 시간 변수 추가
    this.slideMaxTime = 30;

    // (39-4) slideDown 변수 추가
    this.slideDown = false;

    // (40-3) 히어로의 레벨업을 위한 변수 추가
    this.level = 1;
    this.exp = 0;
    this.maxExp = 3000;

    // (40-5-1) progress 변수 선언
    this.expProgress = 0;
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

      /* 9-2. 'left'키가 눌릴 때 마이너스값으로 왼쪽으로 이동
        -    this.movex = this.movex - this.speed;
      */
      /* 19-1. 히어로가 왼쪽 화면을 끝을 넘어가는 문제 수정
        - 이동거리가 0보다 작거나 같다면 0으로 적용하고 그렇지 않다면 기존 코드로 적용. */
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

        /* 12-3. 공격 키를 눌렀을 때 수리검 클래스를 생성
          - new Bullet();
        */
        /* 13-2. 공격 키를 누를 때마다 push 메서드를 사용해서
          - 수리검의 모든 인스턴스를 배열에 추가 */
        bulletComProp.arr.push(new Bullet());

        // 13-11. launch 값을 true로 변경.
        bulletComProp.launch = true;
      }
    }

    // 39-1-1. 키가 눌렸는지 확인할 조건문이 필요
    if (key.keyDown["slide"]) {
      // (39-4-1) 조건문 만들기 :slideDown이 홀수 있을 때만 작동
      if (!this.slideDown) {
        this.el.classList.add("slide");
        /* (39-2-2) 방향에 따른 조건문 추가
					  - 히어로가 보고있는 방향이 오른쪽이라면 히어로의 movex값에 slideSpeed 더함 */
        if (this.direction === "right") {
          this.movex = this.movex + this.slideSpeed;
        } else {
          this.movez = this.movex - this.slideSpped;
        }

        // (39-3-2) 슬라이드 타임이 30보다 크다면 슬라이드 취소.
        if (this.slideTime > this.slideMaxTime) {
          this.el.classList.remove("slide");

          // (39-4-2) 슬라이드 삭제할 때 true로 변경
          this.slideDown = true;
        }

        // 39-3-3. 슬라이드 키를 누르면 slideTime을 1씩 증가
        this.slideTime += 1;
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

    // 39-1-2. 키 뗐을 때확인할 조건문이 필요
    if (!key.keyDown["slide"]) {
      this.el.classList.remove("slide");

      // 39-5. 키 뗄 때 slideDown, slideTime을 초기화
      this.slideDown = false;
      this.slideTime = 0;
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

      /* 11-2. 화면 아래를 기준으로 top값을 구하기
        - (화면높이 - 히어로의 탑값)
        - top: window.innerHeight - this.el.getBoundingClientRect().top,
      */
      // 11-4. 자주 사용하는 값 공통처리 (gameProp)
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,

      /* 11-3. 화면 아래를 기준으로 bottom값 구하기
        - (화면높이 - 히어로의 탑값 - 히어로의 높이)
        - bottom: window.innerHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height,
      */
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

  /* 28-2. 히어로의 체력관리 메서드 추가 (몬스터와 충돌 시 닳게 적용)
	  -    updateHp(){
	*/
  /* 28-6. 메서드 호출할 때 전달받은 인자값 추가
    -   updateHp(monsterDamage) {
  */
  // (41-1) updateHp 리팩토링 - 메서드명 변경
  minusHp(monsterDamage) {
    /* 28-6-1. 히어로 Hp에서 몬스터데미지 값을 뺀다
			-  Math.max 메서드를 사용해서 0 밑으로 내려가지 않게 적용. */
    this.hpValue = Math.max(0, this.hpValue - monsterDamage);

    /* 41-1-2. 로 옮김
      // 28-6-2. 백분율 구하기. 백분율 = 깍인HP / 디폴트HP * 100
      this.hpProgress = (this.hpValue / this.defaultHpValue) * 100;
      // 28-6-3. div.hp 안에 span 찾아서 hpProgress 값 대입
      const heroHpBox = document.querySelector(".state_box .hp span");
      heroHpBox.style.width = this.hpProgress + "%";
    */

    // 29-4. crash()메서드 호출. : 히어로의 체력이 깍일 때 충돌 모션이 나오게 적용
    this.crash();

    // 29-6. 히어로의 hp가 모두 닳았을 때 dead() 메서트 호출
    if (this.hpValue === 0) {
      this.dead();
    }

    // (41-1-4) renderHp() 호출
    this.renderHp();
  }

  // (41-1-5) 히어로 체력을 올려줄 메서드 추가
  plusHp(hp) {
    // (41-1-6) 넘어온 체력 hpValue에 적용
    this.hpValue = hp;
    // (41-1-7) 변경한 체력값을 업데이트
    this.renderHp();
  }

  // (41-1-1) renderHp() 메서드 추가
  renderHp() {
    // (41-1-2) 체력게이지 변경코드 옮기기
    this.hpProgress = Math.max(0, (this.hpValue / this.defaultHpValue) * 100);
    const heroHpBox = document.querySelector(".state_box .hp span");
    heroHpBox.style.width = this.hpProgress + "%";
  }

  // 29. 캐릭터 죽는 모션과 충돌 만들기
  // 29-1. 히어로의 충돌모션을 처리할 crash() 메서드 추가
  crash() {
    // 29-3. 추가한 css 모션 적용. 충돌했다면 히어로 엘리먼트에 hero.crash() 추가
    this.el.classList.add("crash");

    // 29-4-1. 충돌모션 후 원래 모습으로 돌아지 않는 문제 수정
    setTimeout(() => this.el.classList.remove("crash"), 400);
  }

  // 29-2. 캐릭터가 죽었을 때 모션을 처리할 dead() 메서드 추가
  dead() {
    // 29-5.히어로가 죽었을 때 모션 추가
    hero.el.classList.add("dead");

    // 30-2. endGame 함수 호출
    endGame();
  }

  // 32. 데미지 확률 변경
  /* 32-1. hitDamage()메서드 추가 
			몬스터와 충돌할 때마다 체크해서 확률 조정
	*/
  hitDamage() {
    /* 32-3. 히어로의 총 공격력에서 10% 빼기
			[[문제]] 공경력이 계속 감소! 이유는 10프로를 뺀 값을 다시 담고 있기 떄문. 별도의 변수가 필요하다.
					this.attackDamage = this.attackDamage - this.attackDamage * 0.1;
		*/
    /* 32-5. 새 변수에 담아주자.
     */
    this.realDamage =
      this.attackDamage - Math.round(Math.random() * this.attackDamage * 0.1);
  }

  /* 37-5. 스테이지 클리어 시 히어로 스탯 조정 (heroUpgrade 메서드 추가)
     -    heroUpgrade() {
  */
  // (46-3-1) 매개변수 받아서 적용되게 수정
  heroUpgrade(upDamage) {
    // 37-5-2. 속도 향상
    // this.speed += 1.3; // (40-6-1) 제거
    /* 37-5-3. 공격력 향상 || (40-6-2) 공격력 수정
       -    this.attackDamage += 5000;
    */
    // (46-3-2) 매개변수에 값이 없을 때 기본값 적용
    let damage = upDamage ?? 5000;
    // (46-3-3) 공력력 매개변수로 적용
    this.attackDamage += damage;
  }

  // (40-2) 히어로 경험치 반영할 메서드 추가. 넘어온 경험치 받기
  updateExp(exp) {
    // (40-3-1) 넘어온 경험치를 히어로의 경험치와 더하기
    this.exp += exp;

    // (40-5-2) 경험치의 백분율 구해서 expProgress변수에 적용
    this.expProgress = (this.exp / this.maxExp) * 100;

    // (40-5-3) 경험치 엘리먼트에 적용
    document.querySelector(".hero_state .exp span").style.width =
      this.expProgress + "%";

    // (40-4-1) 레벨업 조건 만들기
    if (this.exp >= this.maxExp) {
      this.levelUp();
    }
  }

  // (40-4) 히어로 레벨업 메서드 추가
  levelUp() {
    // (40-4-1) 호출 시 레벨 1씩 올리기
    this.level += 1;
    // (40-4-2) 레벨업을 했다면 경험치를 0으로 변경
    this.exp = 0;
    // (40-4-3) 레벨업을 했다면 난이도를 위해 MaxExp 변경
    this.maxExp = this.maxExp + this.level * 1000;

    // (40-4-4) html에 만들어준 levelup_box 붙이기 - 히어로의 레벨 conuter 처리
    document.querySelector(".level_box strong").innerText = this.level;

    // (40-4-5) 레벨업 알림 메세지
    const levelGuide = document.querySelector(".hero_box .level_up");
    levelGuide.classList.add("active");
    setTimeout(() => levelGuide.classList.remove("active"), 1000);

    // (40-5-4) 레벨업 후 게이지 0으로 적용
    this.updateExp(this.exp);

    // (40-6) 만들어뒀던 heroUpgrade 메서드 호출
    this.heroUpgrade();

    // (41-2) hero levelUp 메서드에서 plusHp() 메서드 호출
    this.plusHp(this.defaultHpValue);
  }
}

/*
 * 수리검
 */
// 12. 수리검 클래스 만들기
class Bullet {
  // 12-1. 생성자 추가
  constructor() {
    /* 12-4. 수리검 엘레먼트를 추가 할 부모 노드를 찾는다.
      - 부모 노드는 게임 엘레먼트이다. */
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
    /* 15-5-1. 수리검을 생성할 때 히어로의 방향을 체크해서 수리검의 방향 정하기
      - 히어로 방향이 left 라면 left 적용, 아니라면 right 적용 */
    this.bulletDirection = hero.direction === "left" ? "left" : "right";

    /* 12-9. 추가한 x,y 변수에 히어로의 위치 넣기
      -    this.x = hero.position().left;
      -    this.y = hero.position().bottom ;
    */
    /* 12-13 size로 구한 width와 height을 left에는 width 더하고 bottom에는 height 빼는 등 손 위치만큼 계산해준다.
      -    this.x = hero.position().left + hero.size().width / 2;
    */
    /* 17-7. 수리검이 히어로가 이동한만큼의 위치에서 생성되게 적용
      - 히어로의 position().left가 아닌 히어로가 이동한만큼의 값을 더하고
      -    this.x = hero.movex + hero.size().width / 2;
    */
    // 19. 왼쪽으로 수리검 던질 때 캐릭터 뒤에서 생성되는 문제 수정
    this.x =
      this.bulletDirection === "right"
        ? hero.movex + hero.size().width / 2
        : hero.movex - hero.size().width / 2;
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
    // 24-3. 몬스터 배열의 길이(몬스터의 수)만큼 반복하는 반복문 추가.
    for (let j = 0; j < allMonsterComProp.arr.length; j++) {
      // 21-2. 수리검 왼쪽 위치 값이 몬스터의 왼쪽 위치 값보다 크다면 (충돌). (수리검 오른쪽 위치값으로 해도 됨)
      //    f(this.position().left > monster.position().left){
      // 21-4. 수리검의 왼쪽 위치값이 몬스터의 왼쪽 위치값보다 크고
      // 수리검의 오른쪽 위치값이 몬스터의 오른쪽 위치값보다 작다면 수리검 삭제
      if (
        // 24-3-1. monster 변수 제거하고 배열로 적용
        // this.position().left > monster.position().left &&
        // this.position().right < monster.position().right
        this.position().left > allMonsterComProp.arr[j].position().left &&
        this.position().right < allMonsterComProp.arr[j].position().right
      ) {
        // 21-3. 수리검 삭제 // 21-5-4로 이동
        //    this.el.remove();

        // 21-5. 배열에서 수리검 인스턴스 삭제
        // 21-5-1. 먼저 수리검이 몬스터와 충돌했을 때 수리검 배열의 길이만큼 반복하는 반복문 추가
        for (let i = 0; i < bulletComProp.arr.length; i++) {
          // 21-5-2. 현재 충돌한 수리검을 찾는 조건문 필요
          // 수리검 배열에 i번째 인스턴스가 현재 충돌한 수리검 this와 같다면
          if (bulletComProp.arr[i] === this) {
            // 32-2. hitDamage() 메서드를 몬스터와 충돌할 때마다 호출
            hero.hitDamage();

            // 21-5-3. 배열 삭제
            bulletComProp.arr.splice(i, 1);

            // 21-5-4. 21-3에서 적용한 수리검 삭제 코드를 splice 아래로 이동
            this.el.remove();

            /* 31-2. damageView() 호출
							    this.damageView();
						*/
            // 31-4.[[중요]] 충돌한 몬스터의 인스턴스를 넘겨준다
            this.damageView(allMonsterComProp.arr[j]);

            // 23-2-1. 몬스터와 수리검이 충돌할 때 updateHp() 호출
            //    monster.updateHp();
            // 24-3-2. monster 변수 제거하고 배열로 적용
            //    allMonsterComProp.arr[j].updateHp();
            // 25-4. 몬스터 배열에서 인스턴스 삭제
            // 25-4-1. 충돌한 인덱스j를 넘겨 받아서 updateHp에서 배열 제거
            allMonsterComProp.arr[j].updateHp(j);
          }
        }
      }
    }

    // 14-03. 수리검 왼쪽 위치가 스크린의 넓이보다 크다면
    // 수리검의 오른ㄴ쪽 위치가 0보다 작다면(화면 왼쪽을 벗어나면~!)
    // 두 조건을 만족한다면 수리검 엘리먼트 삭제
    if (
      this.position().left > gameProp.screenWidth ||
      this.position().right < 0
    ) {
      // 14.04. 수리검 엘리먼트를 삭제
      //    this.el.remove();

      // 21-5-5. 21-5-1의 반복문과 동일
      for (let i = 0; i < bulletComProp.arr.length; i++) {
        if (bulletComProp.arr[i] === this) {
          bulletComProp.arr.splice(i, 1);

          // 21-5-4. 14.04에서 적용한 수리검 삭제 코드를 splice 아래로 이동
          this.el.remove();
        }
      }
    }
  }

  // 31. 데미지 시각화 처리 및 랜덤 위치
  /* 31-1. damageView 메서드 추가
		     damageView(){
	*/
  // 31-4-1. 전달받은 인자 받기
  damageView(monster) {
    /* 31-3. 데미지 엘리먼트를 호출할 부모 찾기.
			 현재 화면 크기를 기준으로 데미지의 위치를 지정하기 위해 .game_app 선택.			 
		*/
    this.parentNode = document.querySelector(".game_app");
    // 31-3-1. 데미지 담을 엘리먼트 추가
    this.textDamageNode = document.createElement("div");
    this.textDamageNode.className = "text_damage";

    /* 31-3-2. 히어로의 공격력을 담을 텍스트 넣기
        this.textDamage = document.createTextNode(hero.attackDamage);
    */
    // 32-7. attackDamge -> realDamage 변경
    this.textDamage = document.createTextNode(hero.realDamage);

    // 31-3-3. 텍스트 노드를 텍스트데미지 엘리먼트에 추가
    this.textDamageNode.appendChild(this.textDamage);
    // 31-3-4. 텍스트 엘리먼트를 부모노드에 추가
    this.parentNode.appendChild(this.textDamageNode);

    // 31-5. 0~100까지의 난수 만들기
    // 31-5-1. 변수 추가
    let textPosition = Math.random() * -100;

    /* 31-4-2. 변수 추가 : 충돌한 몬스터의 위치값을 담을 변수.
				  let damagex = monster.position().left;
		*/
    // 31-5-2. damagex에 textPosition 더하기
    let damagex = monster.position().left + textPosition;
    let damagey = monster.position().top;

    // 31-4-3. 텍스트 데미지 엘리먼트에 damagex, damagey값을 대입
    this.textDamageNode.style.transform = `translate(${damagex}px, ${-damagey}px)`;

    // 31-6. 쌓인 텍스트 데미지 엘리먼트를 제거
    setTimeout(() => this.textDamageNode.remove(), 500);
  }
}

// 20. 몬스터 클래스 추가
class Monster {
  /* 22-7. 인스턴스 생성할 때 넘어온 위치(positionX)와 체력(hp)을 Monster 클래스에서 처리
	  -  constructor(positionX, hp) {
	*/
  /* 33-3. 생성자의 첫번째 매개변수 변경
		- positionX -> property
		- hp -> positionX
	*/
  constructor(property, positionX) {
    this.parentNode = document.querySelector(".game");
    this.el = document.createElement("div");

    // this.el.className = "monster_box";
    // 33-3-1. 몬스터명 변경
    this.el.className = "monster_box " + property.name;

    this.elChildren = document.createElement("div");
    this.elChildren.className = "monster";
    // 22.몬스터 체력 만들기
    // 22-1. 몬스터 체력이 될 엘리먼트 생성
    this.hpNode = document.createElement("div");
    this.hpNode.className = "hp";

    /* 22-2. 몬스터 실제 체력
      -  this.hpValue = 1000;
    */
    /* 22-8. 기존 1000을 넣었던 hpValue에 인스터스 생성할 때 전달받은 hp 적용.
	    -  this.hpValue = hp;
		*/
    // 33-3-2. 몬스터 체력 변경
    this.hpValue = property.hpValue;

    // 26-4. 몬스터가 공격받으면 게이지가 줄어드는 기능 추가
    /* 26-4-1. 최초Hp를 담을 변수 추가
      - 이 변수는 최초Hp값 그대로 유지 
	    -   this.defaultHpValue = hp;
		*/
    // 33-3-3. 몬스터 기본 체력 변경
    this.defaultHpValue = property.hpValue;

    /* 22-3. textNode 를 만들어 hpValue 적용    // 26-1. progress로 디자인하기 위해 기존 텍스트노드 변수 제거 (span으로 변경)
      -     this.hpTextNode = document.createTextNode(this.hpValue);
    */
    // 26-2. Progress 디자인 할 span 추가
    this.hpInner = document.createElement("span");

    //?
    this.progress = 0;

    // 22-9. 인스턴스 생성할 때 전달받은 positionX 변수 추가
    this.positionX = positionX;

    // 27-2. 변수 moveX, speed 추가
    this.moveX = 0;
    // -   this.speed = 10;
    // 33-3-4. 몬스터 스피드 변경
    this.speed = property.speed;

    // 28. 히어로와 몬스터 충돌 시 에너지 관리
    /* 28-1. 히어로와 몬스터가 충돌했을 때 충돌 데미지
	    -   this.crashDamage = 100;
		*/
    // 33-3-5. 몬스터 충돌데미지 변경
    this.crashDamage = property.crashDamage;

    // 38-3. 몬스터가 죽었을 때  점수 적용
    // 38-3-1. monster 클래스 생성자에 score 변수 선언
    this.score = property.score;

    // (40-1-1) 경험치 변수 추가
    this.exp = property.exp;

    this.init();
  }

  init() {
    /* 22-4. 생성한 몬스터 체력을 화면에 추가
      - hp 엘리먼트에 텍스트 노드 추가
      -     this.hpNode.appendChild(this.hpTextNode);
    */
    // 26-3. 기존 textnode 추가해주는 부분 hpInner 로 변경
    this.hpNode.appendChild(this.hpInner);

    // 22-5. hpNode를 monster_box에 추가
    this.el.appendChild(this.hpNode);

    this.el.appendChild(this.elChildren);
    this.parentNode.appendChild(this.el);

    // 22-10. positionX값을 엘리먼트에 대입.
    this.el.style.left = this.positionX + "px";
  }

  // 21. 몬스터 위치를 알 수 있는 position 추가(기존 Hero, Bullet position 복사)
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
  // 23-2. 몬스터의 체력을 관리할 메서드 추가
  //    updateHp() {
  // 25-4-2. crashBullet에서 넘겨받은 index값 받기
  updateHp(index) {
    // 23-3. 기능 추가
    /* 23-3-1. 충돌이 일어나면 몬스터의 hpValue에서 히어로의 공격력을 빼준다.
      -    this.hpValue = this.hpValue - hero.attackDamage;
    */
    /* 23-3-3. Math.max 함수를 사용해서 두 개의 값 중 항상 큰 값이 나오도록 수정
	        this.hpValue = Math.max(0, this.hpValue - hero.attackDamage);
		*/
    /* 32-6. 				
				실제 공격력을 담은 변수는 attackDamage가 아닌 realDamage로 변경되었기 때문에
				몬스터에게 타격되는 데미지를 attackDamage가 아닌 realDamage로 변경해야한다.*/
    this.hpValue = Math.max(0, this.hpValue - hero.realDamage);

    // 26-4-3. 몬스터 게이지 백분율 구하기
    this.progress = (this.hpValue / this.defaultHpValue) * 100;

    // 26-4-5. 구한 백분율 값을 span에 적용
    this.el.children[0].children[0].style.width = this.progress + "%";
    /* 23-3-2. 변경된 몬스터의 체력을 hp 엘리먼트에 대입 //  26-4-4. 26-1 에서 관련 코드 삭제했기 때문에 제거
      -     this.el.children[0].innerText = this.hpValue;
    */

    // 25-2. 몬스터 체력이 0이 되면 호출 (조건문)
    if (this.hpValue === 0) {
      // 25-4-3으로 인해 수정
      //    this.dead();
      // 25-4-3. dead 메서드에 index 값 넘겨주가
      this.dead(index);
    }
  }
  // 25. 몬스터 체력이 0되면 사라지게 적용
  /* 25-1. dead 메서드 추가
    -    dead() {
  */
  // 25-4-4. 넘겨받음 index 받기
  dead(index) {
    // 25-3. 기능 추가
    // 25-3-1. dead 메서드가 호출되면 remove 클래스 추가.(몬스터가 사라지는 스타일 클래스)
    this.el.classList.add("remove");
    // 25-3-2. monster-box element 제거
    setTimeout(() => this.el.remove(), 200);

    // 25-4. 몬스터 배열에서 인스턴스 삭제. // 25-4-4 에서 받은 index 값 추가
    allMonsterComProp.arr.splice(index, 1);

    // 38-7. 몬스터가 죽었을 때 점수 올려야하니 dead 메서드에 적용.
    this.setScore();

    // (40-1-3) 몬스터의 경험치를 관리할 setExp 호출
    this.setExp();
  }
  // 27. 몬스터를 이동시켜줄 메서드 생성 // 27-1.은 game.js에서 반복문으로 메서드 호출
  moveMonster() {
    /* 27-3. 몬스터의 이동 경로 확인해서 값 구하기. 이동경로: 오른쪽에서 왼쪽으로 이동
		  -     this.moveX -= this.speed;
		*/
    /* 27-5. 몬스터가 왼쪽 화면 밖으로 나갔는지 판단하여 몬스터 위치를 변경
		  - (몬스터가 이동한 거리 + 몬스터 소환 위치 + 몬스터의 넓이) 가 0보다 작거나 같다면 (화면 왼쪽을 넘어갔다면)  
		  -     if(this.moveX + this.positionX + this.el.offsetWidth <=0){
		*/
    /* 27-8. 히어로가 이동할 경우 몬스터가 왼쪽 화면 밖으로 나갔어도 왼쪽으로 이동하는 문제 발생.
		  - 히어로가 이동했기 때문에 나타나는 문제로 히어로가 이동한 거리를 빼서 조건문을 수정하자.
		  -     if(this.moveX + this.positionX + this.el.offsetWidth - hero.movex <=0){
		*/
    /* 27-9. 몬스터가 히어로 왼쪽 위치를 지나게 되면 바로 사라지는 문제 수정.
		  - 처음 히어로는 화면 왼쪽 끝에 있었지만 이동하게 되면 화면을 기준으로 중간 위치로 이동했기 때문이다.
		  - 히어로가 화면 기준으로 이동한 거리를 조건문에 더해서 해결. (+ hero.position().left)
		  - (실제 히어로가 이동한 거리와 화면을 기준으로 이동한 거리를 헷갈리지 말자)*/
    if (
      this.moveX +
        this.positionX +
        this.el.offsetWidth +
        hero.position().left -
        hero.movex <=
      0
    ) {
      /* 27-5-1. 몬스터 이동한 거리에 캐릭터 이동한 거리값을 넣어
			  - 일단은 히어로가 이동한 만큼의 위치에서 나타나도록 적용.
			  -     this.moveX = hero.moveX
			*/
      /* 27-6. 처음 인라인스타일로 세팅한 left값때문에 몬스터의 위치가 히어로 앞쪽에서 나타나는 문제 수정.
			  - 히어로의 현재 위치에서 몬스터의 소환 위치값 빼기
			  -     this.moveX = hero.moveX - this.positionX;
			*/
      /* 27-7. moveX에서 스크린 넓이를 더해서 화면 오른쪽 끝에서 다시 나타나도록 적용.
			  - this.moveX = hero.movex - this.positionX + gameProp.screenWidth;
			*/
      /* 27-10. 몬스터가 다시 나타날 때 약간 늦게 나타나는 문제
			 - 이것도 히어로가 화면을 기준으로 이동했기 때문이다. 히어로가 화면 기준으로 이동한 거리를 빼자  */
      this.moveX =
        hero.movex -
        this.positionX +
        gameProp.screenWidth -
        hero.position().left;
    } else {
      // 27-5-2. 0보다 크다면 몬스터가 계속 왼쪽으로 이동하게 적용
      this.moveX -= this.speed;
    }

    // 27-4. 27-3에서 구한 값을 monsterBox에 대입하자
    this.el.style.transform = `translateX(${this.moveX}px)`;

    // 28-3-1. 몬스터가 이동할 때마다 충돌했는지 체크
    this.crash();
  }

  /* 28-3. 몬스터가 이동했을 때 히어로와 충돌했는지 체크할 메서드
	  -  crash() 메서드 호출 위치는 (28-3-1)
	*/
  crash() {
    // 28-4-1. 몬스터와 히어로의 여백으로 인해 화면에서 충돌하지 않았음에도 충돌 로그가 뜨는 것처럼 보이는 문제 수정
    let rightDiff = 30;
    let leftDiff = 90;
    /* 28-4. 충돌 조건문 : 몬스터가 히어로를 지나가지 않았다면.
			- (히어로 오른쪽 위치가 몬스터 왼쪽 위치보다 클 경우) && 
				(히어로의 왼쪽 위치가 몬스터 오른쪽 위치보다 작을 경우)
			- if(hero.position().right > this.position().left && hero.position().left > this.position().right){
		*/
    /* 28-4-2. 히어로 오른쪽 위치값에서 rightDiff를 
			- 히어로 왼쪽에서 leftDiff를 빼주어 여백으로 인한 문제 수정하여 충돌 적확도를 높힌다. */
    if (
      hero.position().right - rightDiff > this.position().left &&
      hero.position().left - leftDiff < this.position().right
    ) {
      /* 28-5. 몬스터와 히어로가 충돌했을 때 히어로 체력 관리하는 메서드 호출하고 충돌 데미지를 전달
        -   hero.updateHp(this.crashDamage);
      */
      // (41-1-3) 변경된 메서드명으로 수정
      hero.minusHp(this.crashDamage);
    }
  }

  // 38-4. 몬스터가 죽었을 때 점수를 반영해줄 메서드 생성(setScore)
  setScore() {
    // 38-5. 죽은 몬스터의 점수를 더한다.
    stageInfo.totalScore += this.score;
    // 38-6. score box에 현재 얻은 점수 반영
    document.querySelector(".score_box").innerText = stageInfo.tatalScore;
  }

  // (40-1-2) 몬스터의 경험치를 관리할 setExp 메서드 추가
  setExp() {
    // (40-2-2) 몬스터 죽었을 때 updateExp 메서드 호출해서 몬스터 경험치 넘기기
    hero.updateExp(this.exp);
  }
}
