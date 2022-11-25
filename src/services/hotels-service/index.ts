import { notFoundError, requestError, unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { BAD_REQUEST } from "http-status";

async function verifyTicketAndEnrollment(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTickeyById(ticketId);
  
  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);
  
  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

async function getHotels(ticketId: number, userId: number) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const includes = await ticketRepository.findTickeWithTypeById(ticketId);

  if(!includes.TicketType.includesHotel)throw unauthorizedError();

  const hotels = await hotelsRepository .findHotels();
    
  if (!hotels) throw notFoundError();

  return hotels;
}

async function getHotelByHotelId(ticketId: number, hotelId: number, userId: number) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const includes = await ticketRepository.findTickeWithTypeById(ticketId);

  if(!includes.TicketType.includesHotel)throw unauthorizedError();

  const hotel = await hotelsRepository .findHotelByHotelId(hotelId);
  if (!hotel) throw notFoundError();
  const rooms = await hotelsRepository .findRoomsByHotelId(hotelId);
  if (!rooms) throw notFoundError();

  return [hotel, rooms];
}

const hotelsService = {
  getHotels,
  getHotelByHotelId
};

export default hotelsService;
