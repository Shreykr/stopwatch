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
let lapToggle = 0;
let flag = 0;
let pauseOnLap = 0;

let time = null;
let ltime = null;

let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let [lhours, lminutes, lseconds, lmilliseconds] = [0, 0, 0, 0];

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

const displayLapTime = () => {
  let trow = document.createElement("tr");
  let tableDescription_1 = document.createElement("td");
  tableDescription_1.innerHTML = lapCount;
  let tableDescription_2 = document.createElement("td");
  tableDescription_2.innerHTML = `${lhrs} : ${lmin} : ${ls} : ${Math.round(
    lms / 10
  )}`;
  let tableDescription_3 = document.createElement("td");
  tableDescription_3.innerHTML = `${hrs} : ${min} : ${s} : ${Math.round(
    ms / 10
  )}`;
  trow.appendChild(tableDescription_1);
  trow.appendChild(tableDescription_2);
  trow.appendChild(tableDescription_3);
  tableBody.appendChild(trow);
};

const calculateTime = () => {
  if (lapCount === 1) {
    lmilliseconds += 4;
    if (lmilliseconds > 999) {
      lmilliseconds = 0;
      lseconds++;
    }
    if (lseconds === 60) {
      lminutes++;
      lseconds = 0;
    }
    if (lminutes === 60) {
      lhours++;
      lminutes = 0;
    }
  } else {
    if (flag === 0) {
      [lhours, lminutes, lseconds, lmilliseconds] = [0, 0, 0, 0];
      flag = 1;
    }
    lmilliseconds += 4;
    if (lmilliseconds > 999) {
      lmilliseconds = 0;
      lseconds++;
    }
    if (lseconds === 60) {
      lminutes++;
      lseconds = 0;
    }
    if (lminutes === 60) {
      lhours++;
      lminutes = 0;
    }
  }

  lms =
    lmilliseconds < 10
      ? `00${lmilliseconds}`
      : lmilliseconds < 100
      ? `0${lmilliseconds}`
      : lmilliseconds;

  ls = lseconds < 10 ? `0${lseconds}` : lseconds;

  lmin = lminutes < 10 ? `0${lminutes}` : lminutes;

  lhrs = lhours < 10 ? `0${lhours}` : lhours;
};

resetButton.addEventListener("click", function () {
  clearInterval(time);
  clearInterval(ltime);
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  [lhours, lminutes, lseconds, lmilliseconds] = [0, 0, 0, 0];
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
  flag = 0;
  pauseOnLap = 0;
});

pauseButton.addEventListener("click", function () {
  clearInterval(time);
  if (ltime && pauseOnLap === 0) {
    clearInterval(ltime);
    pauseOnLap = 1;
  }
  pauseButton.style.display = "none";
  startButton.style.display = "block";
  lapButton.style.display = "none";
});

startButton.addEventListener("click", function () {
  clearInterval(time);
  if (pauseOnLap === 1) {
    ltime = setInterval(calculateTime, 4);
    pauseOnLap = 0;
  }
  time = setInterval(setTime, 4);
  startButton.style.display = "none";
  pauseButton.style.display = "block";
  lapButton.style.display = "block";
});

lapButton.addEventListener("click", function () {
  lapCount = lapCount + 1;

  if (lapCount === 1) {
    lms = ms;
    lhrs = hrs;
    ls = s;
    lmin = min;
    displayLapTime();
    ltime = setInterval(calculateTime, 4);
  } else {
    flag = 0;
    clearInterval(ltime);
    displayLapTime();
    ltime = setInterval(calculateTime, 4);
  }

  lapContainer.style.display = "block";
});

buttonAnimationHandler();
