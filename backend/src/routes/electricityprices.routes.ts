import express from "express";
import { getDailyPricesController  } from "../controllers/electricityprices.controller.js"

const router = express.Router();

router.route('/electricity-prices').get(getDailyPricesController);

export default router;
