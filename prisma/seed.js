const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function main() {
  await prisma.movie.create({
    data: {
      title: "Contoh Film",
      image: "https://example.com/image.jpg",
      category: "FILM",
      genre: JSON.stringify(["Aksi", "Anime"]),
      duration: 120,
      releaseYear: 2024,
      ageRating: 13,
      synopsis: "Ini adalah sinopsis contoh.",
      cast: JSON.stringify(["Aktor 1", "Aktor 2"]),
      creators: JSON.stringify(["Sutradara 1"]),
      rating: 8.5,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
