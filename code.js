const url = "https://api.freecurrencyapi.com/v1/currencies";
const apikey = "";
const options = {
  method: "GET",
  headers: {
    apikey: apikey,
  },
};
async function getData() {
try {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  console.log(json);
} catch (error) {
  console.error(error.message);
}}
getData()
