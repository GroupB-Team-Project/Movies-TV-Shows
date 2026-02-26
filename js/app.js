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
const showMoreBtn = document.getElementById("showMoreBtn");

const modal = document.getElementById("detailsModal");
const closeModalBtn = document.getElementById("closeModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalOverview = document.getElementById("modalOverview");
const modalRating = document.getElementById("modalRating");
const modalDate = document.getElementById("modalDate");

let currentType = "movie"; // track current tab

// =======================
// FETCH MOVIES
// =======================
async function fetchMovies() {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`);
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
// DISPLAY CARDS (LIMIT TO 8)
// =======================
function displayItems(items, type) {
  content.innerHTML = "";

  // Only show first 8 items
  const limitedItems = items.slice(0, 8);

  limitedItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "movie-card cursor-pointer bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105";

    const title = type === "movie" ? item.title : item.name;

    card.innerHTML = `
      <img src="${IMAGE_URL + item.poster_path}" 
           class="w-full object-contain">
      <h3 class="text-white font-semibold text-lg mt-2 text-center px-2">${title}</h3>
    `;

    card.onclick = () => openModal(item, type);
    content.appendChild(card);
  });
}

// =======================
// Cards
// =======================
function openModal(item, type) {
  modalPoster.src = IMAGE_URL + item.poster_path;
  modalTitle.textContent = type === "movie" ? item.title : item.name;
  modalOverview.textContent = item.overview || "No description available.";
  modalRating.textContent = item.vote_average || "N/A";
  modalDate.textContent =
    type === "movie" ? item.release_date || "Unknown" : item.first_air_date || "Unknown";

  // Shows the card centered
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// Closes the card
closeModalBtn.onclick = () => {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
};

// Close if user clicks outside card content
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
};

// =======================
// TABS
// =======================
if (moviesTab && tvTab) {
  moviesTab.onclick = () => {
    currentType = "movie";
    fetchMovies();
    moviesTab.classList.add("bg-indigo-600", "text-white");
    tvTab.classList.remove("bg-indigo-600", "text-white");
  };

  tvTab.onclick = () => {
    currentType = "tv";
    fetchTVShows();
    tvTab.classList.add("bg-indigo-600", "text-white");
    moviesTab.classList.remove("bg-indigo-600", "text-white");
  };
}

// =======================
// START APP
// =======================
fetchMovies(); // load 8 movies by default

// =======================
// SHOW MORE BUTTON
// =======================
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    if (currentType === "movie") {
      window.location.href = "film.html";
    } else {
      window.location.href = "tv.html";
    }
  });
}

// =======================
// LOGIN & REGISTER MODAL
// =======================
function openAccountModal() {
  const modal = document.getElementById("accountModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeAccountModal() {
  const modal = document.getElementById("accountModal");
  if (modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
}