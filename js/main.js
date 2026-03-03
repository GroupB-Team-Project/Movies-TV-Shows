import { TMDB_API_KEY, BASE_URL, IMAGE_URL } from "./config.js";

// =======================
// GLOBAL STATE
// =======================
let currentPage = 1;
let currentType = "movie";
let currentCategory = "now_playing";

const content = document.getElementById("content");
const showMoreBtn = document.getElementById("showMoreBtn");
const moviesTab = document.getElementById("moviesTab");
const tvTab = document.getElementById("tvTab");

// =======================
// FETCH CONTENT
// =======================
async function fetchContent(type, category, page = 1) {
  const res = await fetch(
    `${BASE_URL}/${type}/${category}?api_key=${TMDB_API_KEY}&page=${page}`,
  );

  const data = await res.json();
  displayItems(data.results, type);
}

// =======================
// DISPLAY ITEMS
// =======================
function displayItems(items, type) {
  if (!content) return;

  items.forEach((item) => {
    if (!item.poster_path) return;

    const card = document.createElement("div");

    card.className = `
      bg-black/60 backdrop-blur-xl rounded-xl overflow-hidden
      shadow-lg hover:scale-105 transition cursor-pointer
    `;

    const title = type === "movie" ? item.title : item.name;

    card.innerHTML = `
      <img src="${IMAGE_URL + item.poster_path}"
           class="w-full h-[380px] object-cover">
      <div class="p-4">
        <h3 class="text-white font-semibold text-sm">${title}</h3>
      </div>
    `;

    card.onclick = () => {
      window.location.href = `/pages/details.html?id=${item.id}&type=${type}`;
    };

    content.appendChild(card);
  });
}

// =======================
// LOAD MORE BUTTON
// =======================
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    currentPage++;
    fetchContent(currentType, currentCategory, currentPage);
  });
}

// =======================
// INDEX PAGE LOGIC
// =======================
if (moviesTab && tvTab) {
  fetchContent("movie", "now_playing", 1);

  moviesTab.onclick = () => {
    content.innerHTML = "";
    currentPage = 1;
    currentType = "movie";
    currentCategory = "now_playing";
    fetchContent("movie", "now_playing", 1);
  };

  tvTab.onclick = () => {
    content.innerHTML = "";
    currentPage = 1;
    currentType = "tv";
    currentCategory = "on_the_air";
    fetchContent("tv", "on_the_air", 1);
  };
}

// =======================
// FILM PAGE
// =======================
if (window.location.pathname.includes("film.html")) {
  currentType = "movie";
  currentCategory = "now_playing";
  fetchContent("movie", "now_playing", 1);
}

// =======================
// TV PAGE
// =======================
if (window.location.pathname.includes("tv.html")) {
  currentType = "tv";
  currentCategory = "on_the_air";
  fetchContent("tv", "on_the_air", 1);
}
