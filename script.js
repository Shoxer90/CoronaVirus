let arrCountry = [];
let inputDate = null;
let container = document.querySelector(".container");
let arrBlock = ["country", "currentConfirmed", "currentDeaths"];
getCountries();
async function getCountries() {
  let response = await fetch("https://covid19.mathdro.id/api/countries");
  let data = await response.json();
  for (let prop of data.countries) {
    arrCountry.push(prop.name);
  }
  //for block name head
  if (inputDate !== null && arrBlock.length === 3) {
    arrBlock.push(`searchingDayConfirm`);
    arrBlock.push(`searchingDayDeaths`);
  }
  for (let i = 0; i < arrBlock.length; i++) {
    const div = document.createElement("div");
    div.className = `${arrBlock[i]}`;
    div.innerHTML = `${arrBlock[i]}`;
    container.append(div);
    //for whole countries information j<arrCountry.length 195rows
    for (let j = 0; j < 11; j++) {
      if (i === 0) {
        let div = document.createElement("div");
        div.innerHTML = `${arrCountry[j]}`;
        document.querySelector(`.${arrBlock[i]}`).append(div);
      }
      if (i === 1) {
        let response = await fetch(
          `https://covid19.mathdro.id/api/countries/${arrCountry[j]}`
        );
        let data = await response.json();
        let div = document.createElement("div");
        div.innerHTML = `${data.confirmed.value}`;
        document.querySelector(`.${arrBlock[i]}`).append(div);
      }
      if (i === 2) {
        let response = await fetch(
          `https://covid19.mathdro.id/api/countries/${arrCountry[j]}`
        );
        let data = await response.json();
        let div = document.createElement("div");
        div.innerHTML = `${data.deaths.value}`;
        document.querySelector(`.${arrBlock[i]}`).append(div);
      }

      if (i === 3 && inputDate !== null) {
        let div = document.createElement("div");
        div.innerHTML = `${basicConfirm[j]}`;
        document.querySelector(`.${arrBlock[i]}`).append(div);
      }
      if (i === 4 && inputDate !== null) {
        let div = document.createElement("div");
        div.innerHTML = `${basicDeaths[j]}`;
        document.querySelector(`.${arrBlock[i]}`).append(div);
      }
    }
  }
  basicConfirm = [];
  basicDeaths = [];
}

let basicConfirm = [];
let basicDeaths = [];
async function untilCurrentDay() {
  let response = await fetch(
    `https://covid19.mathdro.id/api/daily/${inputDate}`
  );
  let obj = await response.json();
  arrCountry.forEach((item) => {
    let arrConfirm = 0;
    let arrDeaths = 0;
    for (let prop of obj) {
      if (prop.countryRegion === item) {
        arrConfirm += +prop.confirmed;
        arrDeaths += +prop.deaths;
      }
    }
    basicConfirm.push(arrConfirm);
    basicDeaths.push(arrDeaths);
  });
}

function dateRecover() {
  inputDate = document.body
    .querySelector("#datepicker")
    .value.replaceAll("/", "-");
  container.innerHTML = "";
  untilCurrentDay();
  getCountries();
}
