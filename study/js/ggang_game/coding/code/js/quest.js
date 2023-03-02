// ( 47 ) quest.js 생성 : 퀘스트를 프로퍼티로 분리해 오브젝트로 만들기

// (47-1) 첫번째 퀘스트 오브젝트 생성
const levelQuest = {
  //(47-3) npc 위치 조절
  // (47-3-1) postionX 추가
  positionX: 4500,

  // (47-2) property로 분리할 요소 찾기
  // (47-2-1) class Npc 내 npcTalk 말풍선 멘트 텍스트 부분 복사해서 오브젝트로 이동
  idleMessage:
    "<p>큰일이야<br />사람들이 좀비로 변하고 있어.. <br /><span>대화 Enter</span></p>",

  // (47-2-4) class Npc 위치에서 오브젝트 내로 이동
  // ( 45 ) 퀘스트 내용을 만들어 모달에 추가.
  //      quest() {
  // (47-2-5) 오브젝트 내에 위치하기 위해서 key, value 형식으로 수정
  quest: (el) => {
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
    //     if (!this.questStart) {
    // (47-2-6) 모든 this : 클래스에서 빠져나왔기 때문에 this 사용 불가. 인스턴스 네임(npcOne)으로 변경
    if (!el.questStart) {
      messageState = message.start;
      el.questStart = true;
    } else if (el.questStart && !el.questEnd && hero.level < 5) {
      messageState = message.ing;
    } else if (el.questStart && !el.questEnd && hero.level >= 5) {
      messageState = message.suc;
      el.questEnd = true;

      // (46-3-4)퀘스트 완료 시 보상으로 heroUpgrade 호출
      hero.heroUpgrade(50000);
    } else if (el.questStart && el.questEnd) {
      messageState = message.end;
    }

    // (45-1) html에 적용했던 퀘스트 내용을 가져온다(html에서는 삭제)
    let text = "";
    text += '<figuer class="npc_img">';
    text += ' <img src="../../lib/images/npc.png" alt="npc" />';
    text += "</figuer>";
    text += "<p>";

    /* 46-2-3 기존 부분 주석처리
    text +=
      "마을에 몬스터가 출몰해 주민들을 좀비로 만들고 있어.. 몬스터 사냥해 주민을 구하고 <span>레벨을 5이상</span>으로 만들어 힘을 증명한다면 좀비왕을 물리칠 수 있도록 내 힘을 빌려줄께!!"; */
    // (46-2-4) messageState 를 화면에 출력
    text += messageState;
    text += "</p>";

    // (45-2) quest_talk을 찾아서 text 추가
    const modalInner = document.querySelector(
      ".quest_modal .inner_box .quest_talk"
    );
    modalInner.innerHTML = text;
  },
};

// (48) 두번째 퀘스트 추가
const levelQuestTwo = {
  positionX: 8500,
  idleMessage:
    "<p>곧 좀비왕이 부활하려고 해.. <br /><span>대화 Enter</span></p>",
  quest: (el) => {
    // (48-1) level 변수 추가해서 적용.
    const level = 7;
    const message = {
      start: `마을에 몬스터가 출몰해 주민들을 좀비로 만들고 있어.. 몬스터 사냥해 주민을 구하고 <span>레벨을 ${level}이상</span>으로 만들어 힘을 증명한다면 좀비왕을 물리칠 수 있도록 내 힘을 빌려줄께!!`,
      ing: "이런 아직 레벨을 달성하지 못했구나.",
      suc: "레벨을 달성했구나! 힘을 줄게!",
      end: "고마워! 행운을 빌어!",
    };

    let messageState = "";

    if (!el.questStart) {
      messageState = message.start;
      // (48-4) npcOne 인스턴스 네임을 NpcTwo로 변경
      el.questStart = true;
    } else if (el.questStart && !el.questEnd && hero.level < level) {
      messageState = message.ing;
    } else if (el.questStart && !el.questEnd && hero.level >= level) {
      messageState = message.suc;
      el.questEnd = true;

      hero.heroUpgrade(70000);
    } else if (el.questStart && el.questEnd) {
      messageState = message.end;
    }

    let text = "";
    text += '<figuer class="npc_img">';
    text += ' <img src="../../lib/images/npc.png" alt="npc" />';
    text += "</figuer>";
    text += "<p>";
    text += messageState;
    text += "</p>";

    const modalInner = document.querySelector(
      ".quest_modal .inner_box .quest_talk"
    );
    modalInner.innerHTML = text;
  },
};
