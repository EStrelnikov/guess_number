const minValue = document.querySelector("#minValue");
const maxValue = document.querySelector("#maxValue");
const changeRangeBtn = document.querySelector(".update_range");
const minValueText = document.querySelector(".value_min");
const maxValueText = document.querySelector(".value_max");
const userValue = document.querySelector(".user_value");
const tryBtn = document.querySelector(".try");
const message = document.querySelector(".message");
const hint = document.querySelector(".hint");
const confetti = document.querySelector(".confetti");
const attemptsCount = document.querySelector(".attempts_count");
const resetBtn = document.querySelector(".reset");

let attempts = 0;
let minValueRange = 1;
let maxValueRange = 100;
let numberRandom = getRandomNumber();
let win = false;

function preventDefaultKey(e) {
  if (e.key === "-" || e.key === "+" || e.key === "e") e.preventDefault();
}

function getRandomNumber() {
  return Number(
    (
      Math.random() * (Number(maxValue.value) - Number(minValue.value)) +
      Number(minValue.value)
    ).toFixed(1)
  );
}

function checkRange() {
  minValueRange = Number(Number(minValue.value).toFixed(1));
  maxValueRange = Number(Number(maxValue.value).toFixed(1));
  const validRange = checkValidRange(minValueRange, maxValueRange);
  if (validRange) {
    numberRandom = getRandomNumber();
    attempts = 0;
    attemptsCount.innerText = attempts;
    minValueText.innerText = minValueRange;
    maxValueText.innerText = maxValueRange;
    message.innerText = "";
    hint.innerText = "";
    confetti.style.display = "none";
  }
}

function checkValidRange(min, max) {
  if (!min || !max) {
    alert(`Введите корректный диапазон от 1 до 1000`);
    return false;
  }
  if (min < 0 || min >= max || max > 1000) {
    alert(
      "Введите корректный диапазон: min больше 0, min меньше max, min меньше 1000, max больше 1 и НЕ больше 1000"
    );
    return false;
  }
  return true;
}

minValue.addEventListener("keydown", (e) => preventDefaultKey(e));
maxValue.addEventListener("keydown", (e) => preventDefaultKey(e));
userValue.addEventListener("keydown", (e) => preventDefaultKey(e));

changeRangeBtn.addEventListener("click", () => {
  if (!win) checkRange();
});

tryBtn.addEventListener("click", () => {
  if (win) return;
  const value = Number(userValue.value);
  if (value < minValueRange || value > maxValueRange) {
    message.innerText = "Введите число в выбранном диапазоне!";
    hint.innerText = "";
  } else {
    attempts += 1;
    attemptsCount.innerText = attempts;
    if (value === numberRandom) {
      message.innerText = `Поздравялем! ВЫ отгадали число ${numberRandom}`;
      confetti.style.display = "flex";
      win = true;
      return;
    }
    if (numberRandom > value) {
      message.innerText = "Загаданное число больше";
    } else {
      message.innerText = "Загаданное число меньше";
    }
    if (attempts % 3 === 0) {
      hint.innerText = `Подсказка: Загаданное число ${
        numberRandom % 2 === 0
          ? "ЧЕТНОЕ"
          : "НЕЧЕТНОЕ, с одним знаком после запятой"
      }`;
    } else {
      hint.innerText = "";
    }
  }
});

resetBtn.addEventListener("click", (e) => {
  win = false;
  minValue.value = 1;
  maxValue.value = 100;
  checkRange();
});
