const prizes = [
  { text: "10%", color: "hsl(197 30% 43%)" },
  { text: "20%", color: "hsl(173 58% 39%)" },
  { text: "30%", color: "hsl(43 74% 66%)" },
  { text: "40%", color: "hsl(27 87% 67%)" },
  { text: "50%", color: "hsl(12 76% 61%)" },
  { text: "60%", color: "hsl(350 60% 52%)" },
  { text: "70%", color: "hsl(91 43% 54%)" },
  { text: "80%", color: "hsl(140 36% 74%)" },
];

const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");

const prizeSlice = 360 / prizes.length;
const prizeOffset = Math.floor(180 / prizes.length);

const spinClass = "is-spinning";
const spinnerStyles = window.getComputedStyle(spinner);

let rotation = 0;

const createPrizeNodes = () => {
  prizes.forEach(({ text }, i) => {
    const rotation = prizeSlice * i * -1 - prizeOffset;

    spinner.insertAdjacentHTML(
      "beforeend",
      `<li class="prize" style="--rotate: ${rotation}deg">
        <span class="text">${text}</span>
      </li>`
    );
  });
};

const createConicGradient = () => {
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from -90deg,
      ${prizes
        .map(
          ({ color }, i) =>
            `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`
        )
        .reverse()}
    );`
  );
};

const setupWheel = () => {
  createConicGradient();
  createPrizeNodes();
};

const onTriggerClick = () => {
  trigger.disabled = true;

  const randomSectorIndex = Math.floor(Math.random() * prizes.length);

  rotation = 360 * 5 + prizeSlice * randomSectorIndex + prizeOffset;

  wheel.classList.add(spinClass);
  spinner.style.setProperty("--rotate", rotation);
};

const onAnimationClose = () => {
  wheel.classList.remove(spinClass);

  const actualStop = rotation % 360;
  spinner.style.setProperty("--rotate", actualStop);
  trigger.disabled = false;
};

trigger.addEventListener("click", onTriggerClick);

spinner.addEventListener("transitionend", onAnimationClose);

setupWheel();
