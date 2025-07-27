const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function main() {
  const movies = [
    {
      title: "Pengabdi Setan 2: Communion",
      image: "https://example.com/pengabdi-setan-2.jpg",
      category: "FILM",
      genre: JSON.stringify(["Horror", "Thriller"]),
      duration: 119,
      releaseYear: 2022,
      ageRating: 17,
      synopsis: "Rini dan keluarganya pindah ke apartemen untuk menghindari teror entitas jahat, namun mereka menyadari bahwa ancaman mengikuti mereka ke mana pun mereka pergi.",
      cast: JSON.stringify(["Tara Basro", "Bront Palarae", "Endy Arfian"]),
      creators: JSON.stringify(["Joko Anwar"]),
      rating: 7.2,
    },
    {
      title: "KKN di Desa Penari",
      image: "https://example.com/kkn-desa-penari.jpg",
      category: "FILM",
      genre: JSON.stringify(["Horror", "Mystery"]),
      duration: 110,
      releaseYear: 2022,
      ageRating: 17,
      synopsis: "Enam mahasiswa KKN terjebak di desa terpencil yang penuh dengan misteri dan teror supernatural.",
      cast: JSON.stringify(["Tissa Biani", "Adinda Thomas", "Achmad Megantara"]),
      creators: JSON.stringify(["Awi Suryadi"]),
      rating: 6.8,
    },
    {
      title: "Dilan 1990",
      image: "https://example.com/dilan-1990.jpg",
      category: "FILM",
      genre: JSON.stringify(["Romance", "Drama"]),
      duration: 110,
      releaseYear: 2018,
      ageRating: 13,
      synopsis: "Kisah cinta remaja antara Dilan dan Milea di Bandung tahun 1990 yang penuh dengan kenangan manis.",
      cast: JSON.stringify(["Iqbaal Ramadhan", "Vanesha Prescilla"]),
      creators: JSON.stringify(["Fajar Bustomi", "Pidi Baiq"]),
      rating: 7.5,
    },
    {
      title: "The Raid: Redemption",
      image: "https://example.com/the-raid.jpg",
      category: "FILM",
      genre: JSON.stringify(["Action", "Thriller"]),
      duration: 101,
      releaseYear: 2011,
      ageRating: 18,
      synopsis: "Tim elit polisi terjebak dalam gedung apartemen yang dikuasai gembong narkoba dan harus bertarung untuk bertahan hidup.",
      cast: JSON.stringify(["Iko Uwais", "Joe Taslim", "Donny Alamsyah"]),
      creators: JSON.stringify(["Gareth Evans"]),
      rating: 7.6,
    },
    {
      title: "Laskar Pelangi",
      image: "https://example.com/laskar-pelangi.jpg",
      category: "FILM",
      genre: JSON.stringify(["Drama", "Family"]),
      duration: 124,
      releaseYear: 2008,
      ageRating: 13,
      synopsis: "Kisah inspiratif sepuluh anak dari keluarga miskin di Belitung yang berjuang menempuh pendidikan.",
      cast: JSON.stringify(["Cut Mini Theo", "Ikranagara", "Tora Sudiro"]),
      creators: JSON.stringify(["Riri Riza"]),
      rating: 7.8,
    },
    {
      title: "Stranger Things",
      image: "https://example.com/stranger-things.jpg",
      category: "SERIES",
      genre: JSON.stringify(["Sci-Fi", "Horror", "Drama"]),
      duration: 50,
      releaseYear: 2016,
      ageRating: 16,
      synopsis: "Sekelompok anak di kota kecil menghadapi kekuatan supernatural dan eksperimen pemerintah rahasia.",
      cast: JSON.stringify(["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"]),
      creators: JSON.stringify(["The Duffer Brothers"]),
      rating: 8.7,
    },
    {
      title: "Breaking Bad",
      image: "https://example.com/breaking-bad.jpg",
      category: "SERIES",
      genre: JSON.stringify(["Crime", "Drama", "Thriller"]),
      duration: 47,
      releaseYear: 2008,
      ageRating: 18,
      synopsis: "Seorang guru kimia SMA yang didiagnosis kanker mulai memproduksi dan menjual metamfetamin untuk mengamankan masa depan keluarganya.",
      cast: JSON.stringify(["Bryan Cranston", "Aaron Paul", "Anna Gunn"]),
      creators: JSON.stringify(["Vince Gilligan"]),
      rating: 9.5,
    },
    {
      title: "Squid Game",
      image: "https://example.com/squid-game.jpg",
      category: "SERIES",
      genre: JSON.stringify(["Thriller", "Drama", "Action"]),
      duration: 60,
      releaseYear: 2021,
      ageRating: 18,
      synopsis: "Ratusan orang yang kesulitan finansial mengikuti permainan anak-anak dengan taruhan nyawa untuk memenangkan hadiah miliaran won.",
      cast: JSON.stringify(["Lee Jung-jae", "Park Hae-soo", "Wi Ha-joon"]),
      creators: JSON.stringify(["Hwang Dong-hyuk"]),
      rating: 8.0,
    }
  ];

  for (const movie of movies) {
    await prisma.movie.create({ data: movie });
  }

  console.log('Data dummy movie berhasil ditambahkan!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
