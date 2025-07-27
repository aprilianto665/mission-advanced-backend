# Movie API Documentation

API for movie data management with CRUD (Create, Read, Update, Delete) operations.

## Installation and Setup Guide

### Prerequisites

- Node.js (version 14 or newer)
- NPM or Yarn
- Database (MySQL, PostgreSQL, or SQLite)

### Installation Steps

1. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

2. Configure database

   - Create `.env` file in the project root
   - Fill with your database configuration:
     ```
     DATABASE_URL="mysql://username:password@localhost:3306/movie_db"
     # or for PostgreSQL
     # DATABASE_URL="postgresql://username:password@localhost:5432/movie_db"
     # or for SQLite
     # DATABASE_URL="file:./dev.db"
     ```

3. Generate Prisma Client

   ```bash
   npx prisma generate
   ```

4. Run database migrations

   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the application

   ```bash
   npm start
   # or
   yarn start
   ```

6. The application will run at `http://localhost:3000`

## Base URL

```
http://localhost:3000
```

## Endpoints

### 1. Get All Movies

Retrieve a list of all movies.

- **URL**: `/movies`
- **Method**: `GET`
- **Response**: 200 OK
  ```json
  {
    "status": "success",
    "message": "Movies retrieved successfully",
    "data": [
      {
        "id": 1,
        "title": "Movie Title",
        "image": "https://example.com/image.jpg",
        "category": "FILM",
        "genre": ["Action", "Adventure"],
        "duration": 120,
        "releaseYear": 2023,
        "ageRating": 18,
        "synopsis": "Movie synopsis...",
        "cast": ["Actor 1", "Actor 2"],
        "creators": ["Director", "Producer"],
        "rating": 8.5
      }
    ]
  }
  ```

### 2. Get Movie by ID

Retrieve movie details by ID.

- **URL**: `/movies/:id`
- **Method**: `GET`
- **URL Parameters**: `id=[integer]` ID of the movie
- **Response**: 200 OK
  ```json
  {
    "status": "success",
    "message": "Movie retrieved successfully",
    "data": {
      "id": 1,
      "title": "Movie Title",
      "image": "https://example.com/image.jpg",
      "category": "FILM",
      "genre": ["Action", "Adventure"],
      "duration": 120,
      "releaseYear": 2023,
      "ageRating": 18,
      "synopsis": "Movie synopsis...",
      "cast": ["Actor 1", "Actor 2"],
      "creators": ["Director", "Producer"],
      "rating": 8.5
    }
  }
  ```
- **Error Response**: 404 Not Found
  ```json
  {
    "status": "error",
    "message": "Movie not found"
  }
  ```

### 3. Create Movie

Create a new movie.

- **URL**: `/movies`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "Movie Title",
    "image": "https://example.com/image.jpg",
    "category": "FILM",
    "genre": ["Action", "Adventure"],
    "duration": 120,
    "releaseYear": 2023,
    "ageRating": 18,
    "synopsis": "Movie synopsis...",
    "cast": ["Actor 1", "Actor 2"],
    "creators": ["Director", "Producer"],
    "rating": 8.5
  }
  ```
- **Response**: 201 Created
  ```json
  {
    "status": "success",
    "message": "Movie created successfully",
    "data": {
      "id": 1,
      "title": "Movie Title",
      "image": "https://example.com/image.jpg",
      "category": "FILM",
      "genre": ["Action", "Adventure"],
      "duration": 120,
      "releaseYear": 2023,
      "ageRating": 18,
      "synopsis": "Movie synopsis...",
      "cast": ["Actor 1", "Actor 2"],
      "creators": ["Director", "Producer"],
      "rating": 8.5
    }
  }
  ```
- **Error Response**: 400 Bad Request
  ```json
  {
    "status": "error",
    "message": "Error message"
  }
  ```

### 4. Update Movie

Update an existing movie.

- **URL**: `/movies/:id`
- **Method**: `PUT`
- **URL Parameters**: `id=[integer]` ID of the movie
- **Request Body**:
  ```json
  {
    "id": 1,
    "title": "Movie Title",
    "image": "https://example.com/image.jpg",
    "category": "FILM",
    "genre": ["Action", "Adventure"],
    "duration": 120,
    "releaseYear": 2023,
    "ageRating": 18,
    "synopsis": "Movie synopsis...",
    "cast": ["Actor 1", "Actor 2"],
    "creators": ["Director", "Producer"],
    "rating": 8.5
  }
  ```
- **Response**: 200 OK
  ```json
  {
    "status": "success",
    "message": "Movie updated successfully",
    "data": {
      "id": 1,
      "title": "Movie Title",
      "image": "https://example.com/image.jpg",
      "category": "FILM",
      "genre": ["Action", "Adventure"],
      "duration": 120,
      "releaseYear": 2023,
      "ageRating": 18,
      "synopsis": "Movie synopsis...",
      "cast": ["Actor 1", "Actor 2"],
      "creators": ["Director", "Producer"],
      "rating": 8.5
    }
  }
  ```
- **Error Response**: 404 Not Found
  ```json
  {
    "status": "error",
    "message": "Movie not found"
  }
  ```

### 5. Delete Movie

Delete a movie by ID.

- **URL**: `/movies/:id`
- **Method**: `DELETE`
- **URL Parameters**: `id=[integer]` ID of the movie
- **Response**: 200 OK
  ```json
  {
    "status": "success",
    "message": "Movie deleted successfully",
    "data": {
      "id": 1,
      "title": "Movie Title",
      "image": "https://example.com/image.jpg",
      "category": "FILM",
      "genre": ["Action", "Adventure"],
      "duration": 120,
      "releaseYear": 2023,
      "ageRating": 18,
      "synopsis": "Movie synopsis...",
      "cast": ["Actor 1", "Actor 2"],
      "creators": ["Director", "Producer"],
      "rating": 8.5
    }
  }
  ```
- **Error Response**: 404 Not Found
  ```json
  {
    "status": "error",
    "message": "Movie not found"
  }
  ```

## Database Structure

This application uses Prisma as an ORM with the following database schema:

```prisma
enum Category {
  FILM
  SERIES
}

model Movie {
  id          Int      @id @default(autoincrement())
  title       String
  image       String
  category    Category
  genre       Json
  duration    Int
  releaseYear Int
  ageRating   Int
  synopsis    String   @db.Text
  cast        Json
  creators    Json
  rating      Float
}
```

## Troubleshooting

### Database Issues

- **Database connection error**: Ensure database credentials in the `.env` file are correct
- **Migration error**: Try deleting the `prisma/migrations` folder and run `npx prisma migrate dev --name init` again

### Application Issues

- **Port already in use**: If port 3000 is already in use, change the port in the server configuration file

## Error Handling

This API returns HTTP status codes appropriate to the type of error:

- **400 Bad Request**: Invalid request or validation failure
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Internal server error

All error responses have a consistent format:

```json
{
  "status": "error",
  "message": "Error description"
}
```
