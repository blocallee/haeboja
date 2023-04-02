window.onload = () => {
  const starBg = document.querySelector(".starBg");
  const title = document.querySelector(".title");
  const titleText = title.querySelectorAll("div");

  const evtScroll = function () {
    let scroll = this.scrollY;
    let star = -scroll / 3;
    let tit = scroll / 1.7;

    starBg.style.transform = `translateY(${star}px)`;
    title.style.transform = `translateY(${tit}px)`;
  };

  // 텍스트 모션
  for (let i = 0; i < titleText.length; i++) {
    let _text = titleText[i];

    TweenMax.from(_text, 1, {
      autoAlpha: 0,
      //scale: 0,
      //rotate: Math.random() * 180,
      delay: Math.random() * 1,
      ease: Power3.easeInOut,
    });
  }

  TweenMax.to(window, 2, {
    scrollTo: {
      y: ".bottom",
      autoKill: true,
    },
    delay: 1.7,
    ease: Power3.easeInOut,
  });

  // 하단 영역이 커짐
  TweenMax.from(".bottom", 2.5, {
    scale: 0.7,
    y: 100,
    delay: 2.2,
    ease: Power3.easeInOut,
  });

  window.addEventListener("scroll", evtScroll);
};
