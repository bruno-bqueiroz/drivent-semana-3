
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
