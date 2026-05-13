import { fetchDailyElectricityPrices } from "../services/electricityprices.service.js";

export async function getDailyPricesController(req: Request, res: Response) {
  const prices = await fetchDailyElectricityPrices();
  return res.status(200).json(prices);
}
