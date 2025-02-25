const url_currency =
  "https://openexchangerates.org/api/currencies.json?prettyprint=true&show_alternative=false&show_inactive=false";
const url_converter =
  "https://2025-02-24.currency-api.pages.dev/v1/currencies/";

const get_list = document.querySelector("#from-country");
const to_list = document.querySelector("#to-country");

async function get_converter(from, to) {
  let cost = "";
  try {
    const res = await fetch(`${url_converter}${from}.json`);
    const data = await res.json();
    cost = data[from][to];
  } catch (error) {
    console.log(error);
  }
  return cost;
}


async function get_countries() {
  try {
    const res = await fetch(url_currency);
    const data = await res.json();

    for (let [key] of Object.entries(data)) {
      const option1 = document.createElement("option");
      option1.value = key.toLowerCase();
      option1.textContent = `${key}`;

      const option2 = document.createElement("option");
      option2.value = key.toLowerCase();
      option2.textContent = `${key}`;

      to_list.appendChild(option1);
      get_list.appendChild(option2);


    }
  } catch (error) {
    console.log(error);
  }
}
get_countries();

async function get_location() {
  try {
    // const proxy = "https://cors-anywhere.herokuapp.com/";
    const res = await fetch("https://api.allorigins.win/raw?url=https://ipapi.co/json/");
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error);
    
  }
}

async function get_currencyfull(country) {
  let fullname = ""
  try {
    const res = await fetch(url_currency)
    const data = await res.json()
    fullname = data[country.toUpperCase()]    
  } catch (error) {
    console.log(error);
  }
  return fullname
}


window.onload = () => {
  const toSelect = document.getElementById("to-country").value;

  get_location().then(data => {
    const img1 = document.getElementById("imgForm")

    const fromSelect = document.getElementById("from-country");
    fromSelect.value = data["currency"].toLowerCase();

    img1.src = `https://hatscripts.github.io/circle-flags/flags/${data["country_code"].toLowerCase()}.svg`
  
    get_currencyfull(data["currency"].toLowerCase()).then(rez => {
      document.getElementById("from-para").textContent = rez
    })
  })


  const img2 = document.getElementById("imgTo")
  img2.src = `https://hatscripts.github.io/circle-flags/flags/${toSelect.substring(0, 2)}.svg`

  get_currencyfull(toSelect).then(rez => {
    document.getElementById("to-para").textContent = rez
  })
  
};


function from_changer(){
  const fromNum = parseFloat(document.getElementById("from-input").value);
  const fromSelect = document.getElementById("from-country").value;
  const toSelect = document.getElementById("to-country").value;
  const toNumber = document.getElementById("to-input");
  const img1 = document.getElementById("imgForm")
  const img2 = document.getElementById("imgTo")

  img1.src = `https://hatscripts.github.io/circle-flags/flags/${fromSelect.substring(0, 2)}.svg`
  img2.src = `https://hatscripts.github.io/circle-flags/flags/${toSelect.substring(0, 2)}.svg`

  if (fromNum === 0 || toNumber === 0 ) {
    return
  }

  get_currencyfull(fromSelect).then(rez => {
    document.getElementById("from-para").textContent = rez
  })

  get_converter(fromSelect, toSelect).then(result => {
    if (!result) {
      console.log("Error getting the results , please contact support")
      return
    }
    const rez = fromNum * result;
    document.getElementById("p-ex").textContent = `1 ${fromSelect} = ${result} ${toSelect}`
    document.getElementById("p-ex").style.visibility = "visible";


    if (typeof result != 'number' || isNaN(result)) {
      console.error('Error: Result is not a valid number:', result);
      return;
    }
    toNumber.value = rez;
    toNumber.textContent = rez;
  });

}
function swaper(){
  let oldest = document.getElementById("from-country").value
  let oldnum = parseFloat(document.getElementById("from-input").value)
  document.getElementById("from-country").value = document.getElementById("to-country").value
  document.getElementById("to-country").value = oldest
  document.getElementById("from-input").value = document.getElementById("to-input").value
  document.getElementById("to-input").value = oldnum; 
  from_changer()
}
function to_changer(){
  const fromNum = parseFloat(document.getElementById("from-input").value);
  const fromSelect = document.getElementById("from-country").value;
  const toSelect = document.getElementById("to-country").value;
  const toNumber = document.getElementById("to-input");
  const img2 = document.getElementById("imgTo")
  img2.src = `https://hatscripts.github.io/circle-flags/flags/${toSelect.substring(0, 2)}.svg`

  if (fromNum === 0 || toNumber === 0 ) {
    return
  }

  get_currencyfull(toSelect).then(rez => {
    document.getElementById("to-para").textContent = rez
  })
  
  get_converter(toSelect, fromSelect).then(result => {
    if (!result) {
      console.log("Error getting the results , please contact support")
      return
    }
    const rez = fromNum * result;
    if (typeof result != 'number' || isNaN(result)) {
      console.error('Error: Result is not a valid number:', result);
      return;
    }

    document.getElementById("p-ex").textContent = `1 ${fromSelect} = ${result} ${toSelect}`;
    document.getElementById("p-ex").style.visibility = "visible";
    toNumber.value = rez;
    toNumber.textContent = rez;
  });
}

const fromNumElement = document.getElementById("from-input");
const fromSelectElement = document.getElementById("from-country");
const toSelectElement = document.getElementById("to-country");
const toNumberElement = document.getElementById("to-input");
const switcher = document.getElementById("switcher")

fromNumElement.addEventListener('change', from_changer);
fromNumElement.addEventListener('keyup', from_changer);
fromSelectElement.addEventListener('change', from_changer);

toSelectElement.addEventListener('change', to_changer);
toNumberElement.addEventListener('keyup', to_changer);
toNumberElement.addEventListener('change', to_changer);

switcher.addEventListener("click", swaper)