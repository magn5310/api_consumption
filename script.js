"use strict";

// API consts
const popularApi = "https://api.themoviedb.org/3/movie/popular?api_key=5624cb9bec33c494a6eda345caae6ec3";
const nowPlayingApi = "https://api.themoviedb.org/3/movie/now_playing?api_key=5624cb9bec33c494a6eda345caae6ec3";
const topRatedApi = "https://api.themoviedb.org/3/movie/top_rated?api_key=5624cb9bec33c494a6eda345caae6ec3";
const upcomingApi = "https://api.themoviedb.org/3/movie/upcoming?api_key=5624cb9bec33c494a6eda345caae6ec3";

// DOM element consts
const popularLink = document.querySelector("#popular");
const nowPlayingLink = document.querySelector("#now_playing");
const topRatedLink = document.querySelector("#top_rated");
const upcomingLink = document.querySelector("#upcoming");
const movieContainer = document.querySelector("#movie_container");

// Function to create a movie card
function createMovieCard(movie) {
  // Create elements
  const movieCard = document.createElement("article");
  movieCard.setAttribute("id", "movie_card");

  const movieTitle = document.createElement("h2");
  movieTitle.setAttribute("id", "movie_title");
  movieTitle.textContent = movie.title;

  const movieImage = document.createElement("img");
  movieImage.setAttribute("id", "movie_img");
  movieImage.setAttribute("src", `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
  movieImage.setAttribute("alt", movie.title);

  const infoSection = document.createElement("section");
  infoSection.setAttribute("id", "info_section");

  const movieDescription = document.createElement("p");
  movieDescription.setAttribute("id", "movie_desc");
  movieDescription.textContent = movie.overview;

  const smallInfo = document.createElement("div");
  smallInfo.setAttribute("id", "small_info");

  const movieOriginalTitle = document.createElement("p");
  movieOriginalTitle.setAttribute("id", "original_title");
  movieOriginalTitle.textContent = `Original title: ${movie.original_title}`;

  const movieReleaseDate = document.createElement("p");
  movieReleaseDate.setAttribute("id", "release_date");
  movieReleaseDate.textContent = `Release date: ${movie.release_date}`;

  // Append small info
  smallInfo.appendChild(movieOriginalTitle);
  smallInfo.appendChild(movieReleaseDate);

  // Append info section
  infoSection.appendChild(movieDescription);
  infoSection.appendChild(smallInfo);

  // Create new div to wrap around image and info section
  const imageInfoContainer = document.createElement("div");
  imageInfoContainer.setAttribute("id", "image_info_container");

  // Append movie image and info section to the new div
  imageInfoContainer.appendChild(movieImage);
  imageInfoContainer.appendChild(infoSection);

  // Append title and the new div to movie card
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(imageInfoContainer);

  return movieCard;
}

// Function to fetch and display movies
async function fetchAndDisplayMovies(apiUrl) {
  const response = await fetch(apiUrl);
  const json = await response.json();

  // Clear previous movie cards
  movieContainer.innerHTML = "";

  // Create and append a movie card for each movie
  json.results.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    movieContainer.appendChild(movieCard);
  });
}

// Link event listeners
popularLink.addEventListener("click", () => fetchAndDisplayMovies(popularApi));
nowPlayingLink.addEventListener("click", () => fetchAndDisplayMovies(nowPlayingApi));
topRatedLink.addEventListener("click", () => fetchAndDisplayMovies(topRatedApi));
upcomingLink.addEventListener("click", () => fetchAndDisplayMovies(upcomingApi));

const links = document.querySelectorAll("nav a");

links.forEach((link) => {
  link.addEventListener("click", function () {
    links.forEach((link) => link.classList.remove("active"));

    this.classList.add("active");
  });
});
