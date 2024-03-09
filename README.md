# Movie Lobby API

        Hi, I'm Sudhakar Mirjeli. I have 3 years of work experience in Softwrae development as a Software Development Engineer (SDE).
 This is a RESTful API for managing a collection of movies.
 It allows you to perform CRUD operations on movies and search for movies by genre or title.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.

## Usage

1. Start the server using `npm start`.
2. Use an API testing tool like Postman to interact with the API.

## Endpoints

- **POST /api/movies**: Create a new movie.
  - Request Body: { "title": "KGF Movie", "genre": "Action/Thriller", "rating": 8, "streamingLink": "https://www.youtube.com/watch?v=-KfsY-qwBS0" }
  - Response:  { "status":true, "message": "New Movie added successfully."}

- **GET /api/movies**: Get all movies.
  - Response: {"status":true, message:"Movies retrieved successfully.", "data": [{ "id": "Movie ID", "title": "Movie Title", "genre": "Movie Genre", "rating": "Movie Rating", "streamingLink": "Movie Streaming Link" }, ...] }

- **PUT /api/movies/:id**: Update a movie by ID.
  - Request Body: { "title": "Updated Movie Title", "genre": "Updated Movie Genre", "rating": "Updated Movie Rating", "streamingLink": "Updated Movie Streaming Link" }
  - Response: { "message": "Movie updated successfully."}

- **DELETE /api/movies/:id**: Delete a movie by ID.
  - Response: { "message": "Movie deleted successfully." }

- **GET /api/movies/search?q=${query}**: Search for movies by genre or title.
  - Query Parameters: genre, title
  - Response: {"status":true, message:"Movies retrieved successfully.", "data": [{ "id": "Movie ID", "title": "Movie Title", "genre": "Movie Genre", "rating": "Movie Rating", "streamingLink": "Movie Streaming Link" }, ...] }

## Testing

- Run `npm test` to execute test cases using Mocha.
- Test cases cover all endpoints and ensure correct responses.

