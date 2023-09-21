const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const submit = document.getElementById("submit");

const outDay = document.getElementById("out-day");
const outMonth = document.getElementById("out-month");
const outYear = document.getElementById("out-year");

const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();
const thisDay = today.getDate();

year.max = thisYear;

const monthDayesCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

submit.onclick = function (e) {
  // console.log(thisYear, typeof thisYear);
  // console.log(year.value, typeof year.value);

  let monthPenalt = 0;
  let yearPenalt = 0;

  if (!isValid(day.value, month.value, year.value)) {
    e.preventDefault();
    return;
  }

  const dayCalculation = thisDay - parseInt(day.value);
  if (dayCalculation < 0) monthPenalt = 1;
  outDay.innerText = `${
    dayCalculation >= 0
      ? dayCalculation
      : dayCalculation + monthDayesCount[thisMonth]
  }`;

  outMonth.innerText = `${thisMonth - parseInt(month.value) + 1 - monthPenalt}`;

  if (thisMonth - parseInt(month.value) + 1 < 0) {
    yearPenalt = 1;
    outMonth.innerText = `${
      thisMonth - parseInt(month.value) + 1 - monthPenalt + 12
    }`;
  }
  outYear.innerText = `${thisYear - parseInt(year.value) - yearPenalt}`;
  e.preventDefault();
};

//validation cheks

function isValid(day, month, year, valid) {
  let empty = true;
  let validDay = false;
  let validMonth = false;
  let validyear = false;

  const labels = document.querySelectorAll("label");
  const info = document.querySelectorAll(".info");

  labels.forEach((e) => e.classList.remove("error-color"));
  info.forEach((e) => e.classList.remove("error-color"));

  if (!day || !month || !year) {
    if (!day) {
      labels[0].classList.add("error-color");
      info[0].classList.add("error-color");
    }
    if (!month) {
      labels[1].classList.add("error-color");
      info[1].classList.add("error-color");
    }
    if (!year) {
      labels[2].classList.add("error-color");
      info[2].classList.add("error-color");
    }

    empty = true;
  } else empty = false;

  if (day && (day < 1 || day > 31)) {
    labels[0].classList.add("error-color");
    info[0].classList.add("error-color");
    info[0].innerText = "Must be a valid day";

    validDay = false;
  } else validDay = true;

  if (month && (month < 1 || month > 12)) {
    labels[1].classList.add("error-color");
    info[1].classList.add("error-color");
    info[1].innerText = "Must be a valid month";

    validMonth = false;
  } else validMonth = true;

  if (year && year > thisYear) {
    labels[2].classList.add("error-color");
    info[2].classList.add("error-color");
    info[2].innerText = "Must be in the past";

    validyear = false;
  } else validyear = true;

  return !empty && validDay && validMonth && validyear;
}
