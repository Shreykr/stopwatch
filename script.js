let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let timer = document.getElementById("timer");

let time = null;

let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];

const setTime = () => {
  milliseconds += 4;
  if (milliseconds > 999) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }

  displayTime();
};

const displayTime = () => {
  let ms =
    milliseconds < 10
      ? `00${milliseconds}`
      : milliseconds < 100
      ? `0${milliseconds}`
      : milliseconds;

  let s = seconds < 10 ? `0${seconds}` : seconds;

  let min = minutes < 10 ? `0${minutes}` : minutes;

  let hrs = hours < 10 ? `0${hours}` : hours;

  timer.innerHTML = `${hrs} : ${min} : ${s} : ${ms}`;
};

resetButton.addEventListener("click", function () {
  clearInterval(time);
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  displayTime();
});

pauseButton.addEventListener("click", function () {
  clearInterval(time);
});

startButton.addEventListener("click", function () {
  clearInterval(time);
  time = setInterval(setTime, 4);
});

const buttonAnimationHandler = () => {
  let buttonState = document.querySelectorAll("button");
  console.log(buttonState);
  buttonState.forEach((button) => {
    button.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.8)";
    });
    button.addEventListener("mouseup", function () {
      this.style.transform = "scale(1)";
    });
    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
    button.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.8)";
    });
    button.addEventListener("touchend", function () {
      this.style.transform = "scale(1)";
    });
    button.addEventListener("touchmove", function () {
      this.style.transform = "scale(1)";
    });
  });
};

buttonAnimationHandler();
