const TMDB_API_KEY = "a3585bbddb78faddcc9969920abce760";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

// =======================
// ELEMENTS
// =======================
const content = document.getElementById("content");
const moviesTab = document.getElementById("moviesTab");
const tvTab = document.getElementById("tvTab");

// MODAL
const modal = document.getElementById("detailsModal");
const closeModalBtn = document.getElementById("closeModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalOverview = document.getElementById("modalOverview");
const modalRating = document.getElementById("modalRating");
const modalDate = document.getElementById("modalDate");

// THEME TOGGLE
const toggleBtn = document.getElementById("theme-toggle");

// =======================
// THEME LOGIC
// =======================
if (toggleBtn) {
  toggleBtn.onclick = () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      toggleBtn.textContent = "🌙 Dark Mode";
      localStorage.setItem("theme", "light");
    } else {
      toggleBtn.textContent = "☀️ Light Mode";
      localStorage.setItem("theme", "dark");
    }
  };

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggleBtn.textContent = "🌙 Dark Mode";
  }
}

// =======================
// FETCH FUNCTIONS
// =======================
async function fetchMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`,
  );
  const data = await res.json();
  displayItems(data.results, "movie");
}

async function fetchTVShows() {
  const res = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${TMDB_API_KEY}`);
  const data = await res.json();
  displayItems(data.results, "tv");
}

async function fetchTopRated() {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`,
  );
  const data = await res.json();
  displayItems(data.results, "movie");
}

// =======================
// DISPLAY
// =======================
function displayItems(items, type) {
  if (!content) return;

  content.innerHTML = "";

  items.forEach((item) => {
    if (!item.poster_path) return;

    const card = document.createElement("div");
    card.className = "movie-card";

    const title = type === "movie" ? item.title : item.name;

    card.innerHTML = `
      <img src="${IMAGE_URL + item.poster_path}" alt="${title}">
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
  if (!modal) return;

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

if (modal && closeModalBtn) {
  closeModalBtn.onclick = () => modal.classList.add("hidden");
  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  };
}

// =======================
// AUTO PAGE LOADING
// =======================
if (content) {
  if (moviesTab && tvTab) {
    fetchMovies();

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
  } else {
    fetchTopRated();
  }
}
