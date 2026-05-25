const express = require("express");
const app = express();
const cors = require("cors");

const games = [
  {
    title: "The Legend of Zelda: Tears of the Kingdom",
    genre: "Adventure",
    year: 2023,
    platform: "Nintendo Switch",
    image: "/assets/zelda-totk.jpg",
  },
  {
    title: "God of War Ragnarok",
    genre: "Action",
    year: 2022,
    platform: "PlayStation",
    image: "/assets/god-of-war-ragnarok.jpg",
  },
  {
    title: "Elden Ring",
    genre: "RPG",
    year: 2022,
    platform: "PC",
    image: "/assets/elden-ring.jpg",
  },
  {
    title: "Minecraft",
    genre: "Sandbox",
    year: 2011,
    platform: "PC",
    image: "/assets/minecraft.jpg",
  },
  {
    title: "FIFA 23",
    genre: "Sports",
    year: 2022,
    platform: "PlayStation",
    image: "/assets/fifa-23.jpg",
  },
  {
    title: "Fortnite",
    genre: "Shooter",
    year: 2017,
    platform: "PC",
    image: "/assets/fortnite.jpg",
  },
  {
    title: "Animal Crossing: New Horizons",
    genre: "Simulation",
    year: 2020,
    platform: "Nintendo Switch",
    image: "/assets/animal-crossing.jpg",
  },
  {
    title: "Stardew Valley",
    genre: "Simulation",
    year: 2016,
    platform: "PC",
    image: "/assets/stardew-valley.jpg",
  },
  {
    title: "Super Mario Odyssey",
    genre: "Adventure",
    year: 2017,
    platform: "Nintendo Switch",
    image: "/assets/mario-odyssey.jpg",
  },
  {
    title: "The Witcher 3: Wild Hunt",
    genre: "RPG",
    year: 2015,
    platform: "PC",
    image: "/assets/witcher-3.jpg",
  },
  {
    title: "Hogwarts Legacy",
    genre: "RPG",
    year: 2023,
    platform: "PlayStation",
    image: "/assets/hogwarts-legacy.jpg",
  },
  {
    title: "Call of Duty: Modern Warfare II",
    genre: "Shooter",
    year: 2022,
    platform: "Xbox",
    image: "/assets/cod-mw2.jpg",
  },
  {
    title: "Halo Infinite",
    genre: "Shooter",
    year: 2021,
    platform: "Xbox",
    image: "/assets/halo-infinite.jpg",
  },
  {
    title: "Spider-Man: Miles Morales",
    genre: "Action",
    year: 2020,
    platform: "PlayStation",
    image: "/assets/spiderman-miles.jpg",
  },
  {
    title: "Hollow Knight",
    genre: "Adventure",
    year: 2017,
    platform: "PC",
    image: "/assets/hollow-knight.jpg",
  },
  {
    title: "Splatoon 3",
    genre: "Shooter",
    year: 2022,
    platform: "Nintendo Switch",
    image: "/assets/splatoon-3.jpg",
  },
  {
    title: "Cyberpunk 2077",
    genre: "RPG",
    year: 2020,
    platform: "PC",
    image: "/assets/cyberpunk-2077.jpg",
  },
  {
    title: "Red Dead Redemption 2",
    genre: "Action",
    year: 2018,
    platform: "Xbox",
    image: "/assets/rdr2.jpg",
  },
  {
    title: "It Takes Two",
    genre: "Adventure",
    year: 2021,
    platform: "PlayStation",
    image: "/assets/it-takes-two.jpg",
  },
  {
    title: "Rocket League",
    genre: "Sports",
    year: 2015,
    platform: "Xbox",
    image: "/assets/rocket-league.jpg",
  },
];

// Middleware to parse JSON request bodies
app.use(express.json());

// Setup CORS
const corsHandler = cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);

// Serve static image assets
app.use("/assets", express.static("assets"));

// API route to retrieve all games with filtering, sorting, and search
app.get("/games", (req, res) => {
  let filteredGames = [...games];

  // Search by keyword in the title
  if (req.query.search) {
    const searchKeyword = req.query.search.toLowerCase();
    filteredGames = filteredGames.filter((game) =>
      game.title.toLowerCase().includes(searchKeyword)
    );
  }

  // Filter by genre
  if (req.query.genre) {
    const genre = req.query.genre;
    filteredGames = filteredGames.filter((game) => game.genre === genre);
  }

  // Filter by platform
  if (req.query.platform) {
    const platform = req.query.platform;
    filteredGames = filteredGames.filter((game) => game.platform === platform);
  }

  // Filter by year
  if (req.query.year) {
    const year = parseInt(req.query.year);
    filteredGames = filteredGames.filter((game) => game.year === year);
  }

  // Sort by title or year
  if (req.query.sort) {
    const sortBy = req.query.sort;
    filteredGames.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "year") {
        return a.year - b.year;
      }
    });
  }

  res.status(200).send(filteredGames);
});

// API route to retrieve all genres
app.get("/genres", (req, res) => {
  const genres = [...new Set(games.map((game) => game.genre))];
  genres.sort();
  res.status(200).send(genres);
});

// API route to retrieve all platforms
app.get("/platforms", (req, res) => {
  const platforms = [...new Set(games.map((game) => game.platform))];
  platforms.sort();
  res.status(200).send(platforms);
});

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Video Games API!");
});

// Start the server
const port = 5123;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
