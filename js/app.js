// =======================
// TMDB CONFIG
// =======================
const TMDB_API_KEY = "a3585bbddb78faddcc9969920abce760";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

// =======================
// ELEMENTS
// =======================
const content = document.getElementById("content");
const moviesTab = document.getElementById("moviesTab");
const tvTab = document.getElementById("tvTab");

const modal = document.getElementById("detailsModal");
const closeModalBtn = document.getElementById("closeModal");

const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalOverview = document.getElementById("modalOverview");
const modalRating = document.getElementById("modalRating");
const modalDate = document.getElementById("modalDate");

// =======================
// FETCH MOVIES
// =======================
async function fetchMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`,
  );
  const data = await res.json();
  displayItems(data.results, "movie");
}

// =======================
// FETCH TV SHOWS
// =======================
async function fetchTVShows() {
  const res = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${TMDB_API_KEY}`);
  const data = await res.json();
  displayItems(data.results, "tv");
}

// =======================
// DISPLAY CARDS
// =======================
function displayItems(items, type) {
  content.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const title = type === "movie" ? item.title : item.name;

    card.innerHTML = `
      <img src="${IMAGE_URL + item.poster_path}">
      <h3>${title}</h3>
    `;

    card.onclick = () => openModal(item, type);
    content.appendChild(card);
  });
}

// =======================
// MODAL
// =======================
function openModal(item, type) {
  modalPoster.src = IMAGE_URL + item.poster_path;
  modalTitle.textContent = type === "movie" ? item.title : item.name;
  modalOverview.textContent = item.overview || "No description available.";
  modalRating.textContent = item.vote_average || "N/A";
  modalDate.textContent =
    type === "movie"
      ? item.release_date || "Unknown"
      : item.first_air_date || "Unknown";

  modal.classList.remove("hidden");
}

closeModalBtn.onclick = () => modal.classList.add("hidden");
modal.onclick = (e) => {
  if (e.target === modal) modal.classList.add("hidden");
};

// =======================
// TABS
// =======================
moviesTab.onclick = () => {
  moviesTab.classList.add("active");
  tvTab.classList.remove("active");
  fetchMovies();
};

tvTab.onclick = () => {
  tvTab.classList.add("active");
  moviesTab.classList.remove("active");
  fetchTVShows();
};

// =======================
// START APP
// =======================
fetchMovies();
