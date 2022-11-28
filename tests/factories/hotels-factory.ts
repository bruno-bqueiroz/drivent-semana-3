
import { prisma } from "@/config";

export async function createHotel() {
  return prisma.hotel.createMany({
    data: [{
      name: "Hotel do Bruno",
      image: "https://www.revistasim.com.br/wp-content/uploads/2021/03/revistaSIM_Arquitetura_Quarto-de-hotel-em-casa_Destaque_Credito_Eduardo-Pozella-1155x500.jpg"
    },
    {
      name: "Hotel da Driven",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/0a/01/4c/e3/maple-hotel.jpg"
    }
    ]
  });
}

export async function getHotel() {
  return prisma.hotel.findMany();
}

export async function createRooms(hotel: any) {
  return prisma.room.createMany({
    data: [
      {
        name: "Quarto simples",
        capacity: 1,
        hotelId: hotel[0].id
      },
      {
        name: "Quarto Duplo",
        capacity: 2,
        hotelId: hotel[0].id
      },
      {
        name: "Quarto Familia",
        capacity: 4,
        hotelId: hotel[0].id
      },
      {
        name: "Quarto simples",
        capacity: 1,
        hotelId: hotel[1].id
      },
      {
        name: "Quarto Familia",
        capacity: 4,
        hotelId: hotel[1].id
      },
      
    ]
  });
}
