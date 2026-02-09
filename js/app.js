const TMDB_API_KEY = "a3585bbddb78faddcc9969920abce760";
const moviesContainer = document.getElementById("movies");

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchUpcomingMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  );

  const data = await response.json();
  showMovies(data.results);
}

function showMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${IMAGE_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;

    moviesContainer.appendChild(card);
  });
}

fetchUpcomingMovies();
