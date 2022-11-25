import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelsByTicket } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("", getHotels)
  .get("/:hotelId", getHotelsByTicket);

export { hotelsRouter };
