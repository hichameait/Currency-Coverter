const url = "https://api.freecurrencyapi.com/v1/currencies";
const apikey = "fca_live_3nsDhSeIdfailQYFqEX955q8nDHYCKePl8Hbx78G";
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