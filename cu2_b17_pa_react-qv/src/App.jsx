import { useState, useEffect } from "react";
import { fetchGames, fetchGenres, fetchPlatforms, fetchYears, API_URL } from "./utils/api";

function App() {

  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [years, setYears] = useState([]);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchGenres().then(setGenres);
    fetchPlatforms().then(setPlatforms);
    fetchYears().then(setYears);
  }, []);

  useEffect(() => {
    fetchGames(search, genre, platform, year, sort).then(setGames);
  }, [search, genre, platform, year, sort]);

  return (
    <div className="app">
      <h1>Video Games</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="">All Platforms</option>
          {platforms.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="year">Year</option>
        </select>
      </div>

      {!games || games.length === 0 ? (
        <p>No games found</p>
      ) : (
        <div className="card-container">
          {games.map((game) => (
            <div key={game.title} className="card">
              <img className="card-image" src={API_URL + game.image} alt={game.title} />
              <p className="card-genre">{game.genre}</p>
              <h2 className="card-title">{game.title}</h2>
              <p className="card-platform">{game.platform}</p>
              <p className="card-year">{game.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;