import axios from "axios";

/*
  INSTRUCTIONS:
  - create and export a constant API_URL that contains the base URL for the API
  - create a function fetchGames that fetches the games from the API
  - create a function fetchGenres that fetches the genres from the API
  - create a function fetchPlatforms that fetches the platforms from the API
  - create a function fetchYears that fetches the unique years from the games data
*/

export const API_URL = "http://localhost:5123";

export const fetchGames = async (search, genre, platform, year, sort) => {
  try {
    const response = await axios.get(`${API_URL}/games`, {
      params: {
        search: search || undefined,
        genre: genre || undefined,
        platform: platform || undefined,
        year: year || undefined,
        sort: sort || undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/genres`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPlatforms = async () => {
  try {
    const response = await axios.get(`${API_URL}/platforms`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchYears = async () => {
  try {
    const response = await axios.get(`${API_URL}/games`);
    const years = [...new Set(response.data.map((game) => game.year))];
    return years.sort();
  } catch (error) {
    console.log(error);
  }
};

// if server.js has the below code directly:
// app.get("/years", (req, res) => {
//   const years = [...new Set(shows.map((show) => show.year))];
//   years.sort();
//   res.status(200).send(years);
// });

// fetchYears could be simplified to:
// export const fetchYears = async () => {
//   const response = await axios.get(`${API_URL}/years`);
//   return response.data;
// };