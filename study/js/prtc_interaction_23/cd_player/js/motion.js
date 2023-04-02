class Slide {
  constructor() {
    this.prev_button = document.getElementById("prevBtn");
    this.next_button = document.getElementById("nextBtn");
    this.album = document.querySelectorAll(".album");
    this.contWrap = document.getElementById("contWrap");
    this.diskInner = document.querySelector(".disk_inner");
    this.pointBtnAll = document.querySelectorAll(".pointWrap li");
    this.pageNumDefault = 0;
    this.pageNum = 0;
    console.log("next0 " + this.pageNum);
    this.totalNumDefault = this.album.length;
    this.totalNum = this.album.length;
    this.bgArray = new Array(
      ["#0272a4", "#f6a564"],
      ["#b6bfc8", "#36595b"],
      ["#e58e82", "#6f569f"]
    );
    this.m_start_x = 0;
    this.m_end_y = 0;
    this.m_type = null;
    this.m_touch = null;
    console.log(this.totalNum);
    this.windowEvent();
  }

  windowEvent() {
    this.pageChangeFunc(this.pageNumDefault);

    console.log(this.pointBtnAll.length);

    this.prev_button.addEventListener("click", function () {
      console.log("prev 클릭");
      if (this.pageNum > 0) {
        this.pageNum--;
      } else {
        this.pageNum = this.totalNum - 1;
        console.log("prev " + this.pageNum);
      }
      this.pageChangeFunc(this.pageNum);
    });

    this.next_button.addEventListener("click", function () {
      console.log("next 클릭");
      console.log("next0 " + this.pageNum);
      if (this.pageNum < this.totalNum - 1) {
        this.pageNum++;
        console.log("next1 " + this.pageNum);
      } else {
        this.pageNum = 0;
      }
      console.log("next2 " + this.pageNum);
      this.pageChangeFunc(this.pageNum);
    });

    for (let i = 0; i < this.pointBtnAll.length; i++) {
      (function (idx) {
        this.pointBtnAll[idx].onclick = function () {
          this.pageNum = idx;
          this.pageChangeFunc(this.pageNum);
        };
      })();
    }

    if (this.mobileChk()) {
      this.contWrap.addEventListener("touchstart", touchFunc, false);
      // this.contWrap.addEventListener('touchmove', touchFunc, false);
      this.contWrap.addEventListener("touchend", touchFunc, false);
    }
  }

  touchFunc(evt) {
    switch (evt.type) {
      case "touchstart":
        this.m_touch = "mousedown";
        this.m_touch = evt.changedTouches[0];
        this.m_start_x = touch.clientX;
        this.m_end_y = 0;
        break;
      case "touchend":
        this.m_touch = "mouseup";
        this.m_touch = evt.changedTouches[0];
        this.m_start_x = touch.clientX;
    }
  }

  pageChangeFunc(page) {
    this.contWrap.style.background = `linear-gradient(120deg, ${this.bgArray[page][0]}, ${this.bgArray[page][1]})`;
    for (let i = 0; i < this.totalNumDefault; i++) {
      if (page === i) {
        console.log("active 추가ㅣ");
        this.album[i].classList.add("active");
        this.pointBtnAll[i].classList.add("active");
      } else {
        console.log("active 제거");
        this.album[i].classList.remove("active");
        this.pointBtnAll[i].classList.remove("active");
      }
    }
    this.diskInner[page].style.background = this.bgArray[page][0];
  }

  mobileChk() {
    const mobileKeyWord = new Array(
      "Android",
      "iPhone",
      "iPad",
      "BlackBerry",
      "Windows CE",
      "SAMSUNG",
      "LG",
      "MOT",
      "SonyEricsson"
    );

    for (let into in mobileKeyWord) {
      if (navigator.userAgent.match(mobileKeyWord[into] != null)) {
        return true;
      }
    }
    return false;
  }
}

window.onload = () => {
  const slide = new Slide();
};
