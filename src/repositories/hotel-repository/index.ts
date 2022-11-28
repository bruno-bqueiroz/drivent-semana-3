import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelByHotelId(hotelId: number) {
  const id = hotelId;
  return prisma.hotel.findMany({
    where: {
      id,
    },
    include: {
      Rooms: true,
    }
  });
}

const hotelsRepository = {
  findHotels,
  findHotelByHotelId
};
  
export default hotelsRepository;
