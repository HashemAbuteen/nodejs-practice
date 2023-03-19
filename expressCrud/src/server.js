const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());

const moviesFilePath = path.join(__dirname, "..", "data", "movies.json");

// Retrieve all movies
app.get("/movies", (req, res) => {
  const movies = JSON.parse(fs.readFileSync(moviesFilePath));
  res.send(movies);
});

// Retrieve a specific movie
app.get("/movies/:id", (req, res) => {
  const movies = JSON.parse(fs.readFileSync(moviesFilePath));
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie) {
    res.status(404).send("Movie not found");
  } else {
    res.send(movie);
  }
});

// Add a new movie
app.post("/movies", (req, res) => {
  const movies = JSON.parse(fs.readFileSync(moviesFilePath));
  const newMovie = req.body;
  newMovie.id = movies.length + 1;
  movies.push(newMovie);
  fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2));
  res.send(newMovie);
});

// Update a movie
app.put("/movies/:id", (req, res) => {
  const movies = JSON.parse(fs.readFileSync(moviesFilePath));
  const updatedMovie = req.body;
  const index = movies.findIndex(
    (movie) => movie.id === parseInt(req.params.id)
  );
  if (index === -1) {
    res.status(404).send("Movie not found");
  } else {
    movies[index] = { ...movies[index], ...updatedMovie };
    fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2));
    res.send(movies[index]);
  }
});

// Delete a movie
app.delete("/movies/:id", (req, res) => {
  const movies = JSON.parse(fs.readFileSync(moviesFilePath));
  const index = movies.findIndex(
    (movie) => movie.id === parseInt(req.params.id)
  );
  if (index === -1) {
    res.status(404).send("Movie not found");
  } else {
    movies.splice(index, 1);
    fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2));
    res.send("Movie deleted");
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
