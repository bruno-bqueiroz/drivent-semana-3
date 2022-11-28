import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import hotelsService from "@/services/hotels-service";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const { userId } = req;
  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const hotels = await hotelsService.getHotels(ticketId, userId);
  
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelsByTicket(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.params.hotelId);
  const ticketId = Number(req.query.ticketId);
  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const { userId } = req;

  try {
    const hotel = await hotelsService.getHotelByHotelId(ticketId, hotelId, userId);

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
