export async function fetchDailyElectricityPrices() {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_DK1.json`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  return response.json();
}
