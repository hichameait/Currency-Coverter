const url_currency =
  "https://openexchangerates.org/api/currencies.json?prettyprint=flase&show_alternative=false&show_inactive=false";
const url_converter =
  "https://2025-02-24.currency-api.pages.dev/v1/currencies/";
const url_flags = "https://flagsapi.com//flat/32.png";

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
      // const flag_emoji = String.fromCodePoint(
      //   ...[...key.substring(0, 2)].map((c) => c.charCodeAt(0) + 127397)
      // );

      // const option1 = document.createElement("option");
      const option1 = document.createElement("option");
      option1.value = key.toLowerCase();
      option1.textContent = `${key}`;
      // https://hatscripts.github.io/circle-flags/flags/${key.substring(0, 2)}.svg
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
function name(params) {
  
}
get_countries();

// get_converter("MAD", "USD");

function changer(){
  const fromNum = parseFloat(document.getElementById("from-input").value);
  const fromSelect = document.getElementById("from-country").value;
  const toSelect = document.getElementById("to-country").value;
  const toNumber = document.getElementById("to-input");

  if (fromNum === 0) {
    return
  }

  get_converter(fromSelect, toSelect).then(result => {
    const rez = fromNum * result;
    toNumber.value = rez;
    toNumber.textContent = rez;
  });

}
window.onload = () => {
  const fromSelect = document.getElementById("from-country").value;
  const toSelect = document.getElementById("to-country").value;

  const img1 = document.getElementById("imgForm")
  img1.src = `https://hatscripts.github.io/circle-flags/flags/${fromSelect.substring(0, 2)}.svg`

  const img2 = document.getElementById("imgTo")
  img2.src = `https://hatscripts.github.io/circle-flags/flags/${toSelect.substring(0, 2)}.svg`

  // if (fromSelect === toSelect || toSelect === fromSelect ) {
  //   document.getElementById("").style.visibility = "hidden"
  // }

};

document.getElementById("from-input").addEventListener('change', () => {

  const fromNum = parseFloat(document.getElementById("from-input").value);
  const fromSelect = document.getElementById("from-country").value;
  const toSelect = document.getElementById("to-country").value;
  const toNumber = document.getElementById("to-input");

  get_converter(fromSelect, toSelect).then(result => {
    const rez = fromNum * result;
    toNumber.value = rez;
    toNumber.textContent = rez;
  });

});

document.getElementById("from-country").addEventListener('change', () => {

  const fromNum = parseFloat(document.getElementById("from-input").value);
  const fromSelect = document.getElementById("from-country").value;
  const toSelect = document.getElementById("to-country").value;
  const toNumber = document.getElementById("to-input");
  const img1 = document.getElementById("imgForm")

  img1.src = `https://hatscripts.github.io/circle-flags/flags/${fromSelect.substring(0, 2)}.svg`
  if (fromNum === 0 || toNumber === 0 ) {
    return
  }
  
  get_converter(fromSelect, toSelect).then(result => {
    const rez = fromNum * result;
    document.getElementById("p-ex").textContent = `1 ${fromSelect} = ${result} ${toSelect}`
    document.getElementById("p-ex").visibility = "visible !important"
    toNumber.value = rez;
    toNumber.textContent = rez;
  });

});
document.getElementById("to-input").addEventListener('change', () => {

  const fromNum = parseFloat(document.getElementById("from-input").value);
  const fromSelect = document.getElementById("from-country").value;
  const toSelect = document.getElementById("to-country").value;
  const toNumber = document.getElementById("to-input");
  if (fromNum === 0 || toNumber === 0 ) {
    return
  }
  get_converter(toSelect, fromSelect).then(result => {
    const rez = fromNum * result;
    document.getElementById("p-ex").textContent = `1 ${fromSelect} = ${result} ${toSelect}`
    document.getElementById("p-ex").visibility = "visible !important"
    toNumber.value = rez;
    toNumber.textContent = rez;
  });

});
document.getElementById("to-country").addEventListener('change', () => {

  const fromNum = parseFloat(document.getElementById("from-input").value);
  const fromSelect = document.getElementById("from-country").value;
  const toSelect = document.getElementById("to-country").value;
  const toNumber = document.getElementById("to-input");
  const img2 = document.getElementById("imgTo")
  img2.src = `https://hatscripts.github.io/circle-flags/flags/${toSelect.substring(0, 2)}.svg`
  
  if (fromNum === 0 || toNumber === 0 ) {
    return
  }
  get_converter(toSelect, fromSelect).then(result => {
    const rez = fromNum * result;
    document.getElementById("p-ex").textContent = `1 ${fromSelect} = ${result} ${toSelect}`
    document.getElementById("p-ex").visibility = "visible !important"
    toNumber.value = rez;
    toNumber.textContent = rez;
  });

});


 
  // document.getElementById("from-country").addEventListener('change', changer());

