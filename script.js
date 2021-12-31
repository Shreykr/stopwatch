let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let lapButton = document.getElementById("lap");
let lapContainer = document.getElementById("laps");
let tableBody = document.getElementById("table__body");
let timer = document.getElementById("timer");
let ms = null;
let s = null;
let min = null;
let hrs = null;
let lapCount = 0;
let lms = null;
let ls = null;
let lmin = null;
let lhrs = null;
let temp_ms = null;
let temp_s = null;
let temp_min = null;
let temp_hrs = null;

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
  ms =
    milliseconds < 10
      ? `00${milliseconds}`
      : milliseconds < 100
      ? `0${milliseconds}`
      : milliseconds;

  s = seconds < 10 ? `0${seconds}` : seconds;

  min = minutes < 10 ? `0${minutes}` : minutes;

  hrs = hours < 10 ? `0${hours}` : hours;

  timer.innerHTML = `${hrs} : ${min} : ${s} : ${ms}`;
};

const calculateTime = () => {
  lapCount = lapCount + 1;
  let lapTimeMilliseconds = null;
  let lapTimeSeconds = null;
  let lapTimeMinutes = null;
  let lapTimeHours = null;
  let flag = 1;

  if (lapCount === 1) {
    flag = 0;
    temp_hrs = hrs;
    temp_min = min;
    temp_s = s;
    temp_ms = ms;
    lapTimeMilliseconds = ms;
    lapTimeHours = hrs;
    lapTimeSeconds = s;
    lapTimeMinutes = min;
  } else {
    ms - temp_ms < 0
      ? (lapTimeMilliseconds = 1000 + (ms - temp_ms))
      : (lapTimeMilliseconds = ms - temp_ms);

    ms - temp_ms < 0 && min > temp_min
      ? (lapTimeSeconds = (min - temp_min) * 60 + (s - temp_s) - 1)
      : ms - temp_ms < 0
      ? (lapTimeSeconds = s - temp_s - 1)
      : s - temp_s < 0
      ? (lapTimeSeconds = 60 + (s - temp_s))
      : (lapTimeSeconds = s - temp_s);

    s - temp_s < 0 && hrs > temp_hrs
      ? (lapTimeMinutes = (hrs - temp_hrs) * 60 + (min - temp_min) - 1)
      : s - temp_s < 0
      ? (lapTimeMinutes = min - temp_min - 1)
      : min - temp_min < 0
      ? (lapTimeMinutes = 60 + (min - temp_min))
      : (lapTimeMinutes = min - temp_min);

    min - temp_min < 0
      ? (lapTimeHours = hrs - temp_hrs - 1)
      : (lapTimeHours = hrs - temp_hrs);
  }
  if (flag !== 0) {
    temp_hrs = hrs;
    temp_min = min;
    temp_s = s;
    temp_ms = ms;
    lms =
      lapTimeMilliseconds < 10
        ? `00${lapTimeMilliseconds}`
        : lapTimeMilliseconds < 100
        ? `0${lapTimeMilliseconds}`
        : lapTimeMilliseconds;

    ls = lapTimeSeconds < 10 ? `0${lapTimeSeconds}` : lapTimeSeconds;

    lmin = lapTimeMinutes < 10 ? `0${lapTimeMinutes}` : lapTimeMinutes;

    lhrs = lapTimeHours < 10 ? `0${lapTimeHours}` : lapTimeHours;
  } else {
    lms = lapTimeMilliseconds;
    ls = lapTimeSeconds;
    lmin = lapTimeMinutes;
    lhrs = lapTimeHours;
  }
};

resetButton.addEventListener("click", function () {
  clearInterval(time);
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  displayTime();
  pauseButton.style.display = "none";
  startButton.style.display = "block";
  lapButton.style.display = "none";
  lapContainer.style.display = "none";
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.lastChild);
  }
  lapCount = 0;
  lmin = 0;
  lhrs = 0;
  ls = 0;
  lms = 0;
});

pauseButton.addEventListener("click", function () {
  clearInterval(time);
  pauseButton.style.display = "none";
  startButton.style.display = "block";
  lapButton.style.display = "none";
});

startButton.addEventListener("click", function () {
  clearInterval(time);
  time = setInterval(setTime, 4);
  startButton.style.display = "none";
  pauseButton.style.display = "block";
  lapButton.style.display = "block";
});

lapButton.addEventListener("click", function () {
  lapContainer.style.display = "block";
  calculateTime();
  let trow = document.createElement("tr");
  trow.classList.add("gg");
  let tableDescription_1 = document.createElement("td");
  tableDescription_1.innerHTML = lapCount;
  let tableDescription_2 = document.createElement("td");
  tableDescription_2.innerHTML = `${lhrs} : ${lmin} : ${ls} : ${lms}`;
  let tableDescription_3 = document.createElement("td");
  tableDescription_3.innerHTML = `${hrs} : ${min} : ${s} : ${ms}`;
  trow.appendChild(tableDescription_1);
  trow.appendChild(tableDescription_2);
  trow.appendChild(tableDescription_3);
  tableBody.appendChild(trow);
});

const buttonAnimationHandler = () => {
  let buttonState = document.querySelectorAll("button");
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
