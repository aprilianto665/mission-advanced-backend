# Movie API Documentation

API for movie data management with CRUD operations, user authentication, email verification, and file upload functionality.

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

2. Configure environment variables

   - Create `.env` file in the project root
   - Fill with your configuration:
     ```
     DATABASE_URL="mysql://username:password@localhost:3306/movie_db"
     JWT_SECRET="your-jwt-secret-key"
     EMAIL_SERVER="your-gmail@gmail.com"
     EMAIL_PASSWORD="your-app-password"
     BASE_URL="http://localhost:3000"
     ```

3. Generate Prisma Client

   ```bash
   npx prisma generate
   ```

4. Run database migrations

   ```bash
   npx prisma migrate dev --name init
   ```

5. Seed the database (optional)

   ```bash
   npx prisma db seed
   ```

6. Create uploads directory

   ```bash
   mkdir uploads
   ```

7. Start the application

   ```bash
   npm start
   # or
   yarn start
   ```

8. The application will run at `http://localhost:3000`

## Base URL

```
http://localhost:3000
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication Endpoints

#### 1. Register User

Register a new user account.

- **URL**: `/register`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "fullname": "John Doe",
    "username": "johndoe",
    "password": "password123",
    "email": "john@example.com"
  }
  ```
- **Response**: 200 OK
  ```json
  {
    "status": "success",
    "message": "Registration successful. Please check your email to verify your account"
  }
  ```

#### 2. Login User

Authenticate user and get JWT token.

- **URL**: `/login`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: 200 OK
  ```json
  {
    "status": "success",
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses**:
  - **404 Not Found** (User not found):
    ```json
    {
      "status": "error",
      "message": "User not found"
    }
    ```
  - **401 Unauthorized** (Invalid password):
    ```json
    {
      "status": "error",
      "message": "Invalid password"
    }
    ```
  - **401 Unauthorized** (Email not verified):
    ```json
    {
      "status": "error",
      "message": "Email is not verified"
    }
    ```

#### 3. Verify Email

Verify user email address using token from email.

- **URL**: `/verify-email?token=<verification-token>`
- **Method**: `GET`
- **Authentication**: Not required
- **Response**: 200 OK
  ```json
  {
    "status": "success",
    "message": "Email verification successful"
  }
  ```

### Movie Endpoints

#### 4. Get All Movies

Retrieve a list of all movies with optional filtering, sorting, and search.

- **URL**: `/movie`
- **Method**: `GET`
- **Authentication**: Required
- **Query Parameters**:
  - `filter` (optional): Field to filter by
  - `search` (optional): Search term
  - `orderBy` (optional): Field to sort by
  - `sortOrder` (optional): Sort direction
- **Valid Values**:
  - `filter`: title, category, genre, cast, creators
  - `category` values: FILM, SERIES (case insensitive)
  - `orderBy`: id, title, category, duration, releaseYear, ageRating, rating
  - `sortOrder`: asc, desc
- **Example Usage**:
  ```
  GET /movie?filter=genre&search=action&orderBy=rating&sortOrder=desc
  ```
  This will search for movies with "Action" in their genre, ordered by rating in descending order.
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
- **Error Responses**:
  - **404 Not Found** (Movies not found or invalid query parameters):
    ```json
    {
      "status": "error",
      "message": "Movies not found"
    }
    ```
    This error occurs when:
    - No movies match the search criteria
    - Invalid `filter` field is used
    - Invalid `orderBy` field is used
    - Invalid `sortOrder` value is used
    - Invalid `category` value is used (must be FILM or SERIES)

#### 5. Get Movie by ID

Retrieve movie details by ID.

- **URL**: `/movie/:id`
- **Method**: `GET`
- **Authentication**: Required
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

#### 6. Create Movie

Create a new movie.

- **URL**: `/movie`
- **Method**: `POST`
- **Authentication**: Required
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

#### 7. Update Movie

Update an existing movie.

- **URL**: `/movie/:id`
- **Method**: `PUT`
- **Authentication**: Required
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

#### 8. Delete Movie

Delete a movie by ID.

- **URL**: `/movie/:id`
- **Method**: `DELETE`
- **Authentication**: Required
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

### File Upload Endpoint

#### 9. Upload File

Upload a file to the server.

- **URL**: `/upload`
- **Method**: `POST`
- **Authentication**: Required
- **Content-Type**: `multipart/form-data`
- **Request Body**: Form data with `file` field
- **File Limits**: Maximum 5MB
- **Response**: 200 OK
  ```json
  {
    "status": "success",
    "message": "File uploaded successfully",
    "data": {
      "fieldname": "file",
      "originalname": "example.jpg",
      "filename": "example.jpg",
      "path": "uploads/example.jpg",
      "size": 12345
    }
  }
  ```
- **Error Response**: 400 Bad Request
  ```json
  {
    "status": "error",
    "message": "File size exceeds 5MB limit"
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

model User {
  id          Int     @id @default(autoincrement())
  fullname    String
  username    String  @unique
  password    String
  email       String  @unique
  verifyToken String  @unique
  isVerified  Boolean @default(false)
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
- **401 Unauthorized**: Authentication required or invalid token
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Internal server error

All error responses have a consistent format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

### Authentication Errors

For protected endpoints that require authentication, the following errors may occur:

- **401 Unauthorized** (Invalid Token):
  ```json
  {
    "status": "error",
    "message": "Invalid Token"
  }
  ```
- **401 Unauthorized** (Token Expired):
  ```json
  {
    "status": "error",
    "message": "Token has expired"
  }
  ```
- **401 Unauthorized** (Invalid token format):
  ```json
  {
    "status": "error",
    "message": "Invalid token"
  }
  ```

## Default Admin Account

After running the seed command, a default admin account is created:

- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Status**: Email verified

Use this account for initial testing and administration.
