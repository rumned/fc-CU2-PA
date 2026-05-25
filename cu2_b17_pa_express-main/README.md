# Video Games API Documentation

This API documentation provides an overview of the available endpoints, their query parameters, and example usage.

## Endpoints

### GET /games

Retrieves a list of games with optional filtering, sorting, and search.

#### Query Parameters

- `search` (optional): Keyword to search for in the game titles. Case-insensitive.
- `genre` (optional): Genre to filter the games by.
- `platform` (optional): Platform to filter the games by. Possible values: `Nintendo Switch`, `PlayStation`, `PC`, `Xbox`.
- `year` (optional): Year to filter the games by.
- `sort` (optional): Sorting criteria for the games. Possible values: `title`, `year`.

#### Response

- Returns an array of game objects matching the specified criteria.

```json
[
  {
    "title": "Elden Ring",
    "genre": "RPG",
    "year": 2022,
    "platform": "PC",
    "image": "/assets/elden-ring.jpg"
  },
  {
    "title": "God of War Ragnarok",
    "genre": "Action",
    "year": 2022,
    "platform": "PlayStation",
    "image": "/assets/god-of-war-ragnarok.jpg"
  }
]
```

> **Note:** The `image` field is a relative path. To display the image in your front-end, prepend the API base URL (e.g. `http://localhost:5123/assets/elden-ring.jpg`).

### GET /genres

Retrieves a list of all unique genres.

#### Response

- Returns an array of genre strings sorted alphabetically.

```json
["Action", "Adventure", "RPG", "Sandbox", "Shooter", "Simulation", "Sports"]
```

### GET /platforms

Retrieves a list of all unique platforms.

#### Response

- Returns an array of platform strings sorted alphabetically.

```json
["Nintendo Switch", "PC", "PlayStation", "Xbox"]
```

## Examples

- Get all games:

  ```
  GET http://localhost:5123/games
  ```

- Search for games with "Mario" in the title:

  ```
  GET http://localhost:5123/games?search=Mario
  ```

- Filter games by the "RPG" genre:

  ```
  GET http://localhost:5123/games?genre=RPG
  ```

- Filter games by "PC" platform:

  ```
  GET http://localhost:5123/games?platform=PC
  ```

- Filter games by year 2022:

  ```
  GET http://localhost:5123/games?year=2022
  ```

- Sort games by title:

  ```
  GET http://localhost:5123/games?sort=title
  ```

- Sort games by year:

  ```
  GET http://localhost:5123/games?sort=year
  ```

- Filter by genre "RPG", sort by "title":

  ```
  GET http://localhost:5123/games?genre=RPG&sort=title
  ```

### Static Assets

Game images are served from the `/assets` directory. Each game object includes an `image` field with a relative path (e.g. `/assets/zelda-totk.jpg`). To access an image directly:

```
GET http://localhost:5123/assets/zelda-totk.jpg
```

### Notes

- This API allows dynamic filtering, sorting, and searching to provide flexibility in retrieving game data.
- Ensure to handle cases where no games match the given criteria gracefully in your application.
