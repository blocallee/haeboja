window.onload = () => {
  const starBg = document.querySelector(".starBg");
  const title = document.querySelector(".title");
  const bttm = document.querySelector(".bottom");

  const evtScroll = function () {
    let scroll = this.scrollY;
    let star = -scroll / 3;
    let tit = scroll / 1.7;

    starBg.style.transform = `translateY(${star}px)`;
    title.style.transform = `translateY(${tit}px)`;
  };

  setTimeout(function () {
    window.scrollTo({
      top: bttm.offsetTop,
      begavior: "smooth",
    });
    bttm.scrollIntoView({
      begavior: "smooth",
    });
  }, 2000);

  window.addEventListener("scroll", evtScroll);
};
