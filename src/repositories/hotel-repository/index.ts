import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: { hotelId }
  });
}
async function findHotelByHotelId(hotelId: number) {
  return prisma.room.findFirst({
    where: { hotelId }
  });
}

const hotelsRepository = {
  findHotels,
  findRoomsByHotelId,
  findHotelByHotelId
};
  
export default hotelsRepository;
