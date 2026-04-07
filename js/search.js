import { TMDB_API_KEY, BASE_URL, IMAGE_URL } from "./config.js";

const resultsContainer = document.getElementById("results");
const noResults = document.getElementById("noResults");
const suggestionsList = document.getElementById("suggestions");

let timeout;

//Load trending
window.addEventListener("load", () => {
  loadTrending();
});

//Setup input listener (SAFE way)
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");

  if (!input) return;

  input.addEventListener("input", handleSearch);
});

// 🔍 Handle search
function handleSearch() {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const input = document.getElementById("searchInput");
    const query = input.value.trim();

    if (query.length === 0) {
      suggestionsList.innerHTML = "";
      loadTrending();
      return;
    }

    fetchSearch(query);
    fetchSuggestions(query);
  }, 250);
}

//Fetch search results (NO inline template risk)
async function fetchSearch(query) {
  try {
    const url =
      BASE_URL +
      "/search/multi?api_key=" +
      TMDB_API_KEY +
      "&query=" +
      encodeURIComponent(query);

    const res = await fetch(url);
    const data = await res.json();

    displayResults(data.results);
  } catch (err) {
    console.error("Search error:", err);
  }
}

//Display results (SAFE HTML)
function displayResults(items) {
  resultsContainer.innerHTML = "";

  if (!items || items.length === 0) {
    if (noResults) noResults.classList.remove("hidden");
    return;
  }

  if (noResults) noResults.classList.add("hidden");

  items.forEach(function (item) {
    if (!item.poster_path) return;

    const div = document.createElement("div");
    div.className = "movie-card";

    const img = document.createElement("img");
    img.src = IMAGE_URL + item.poster_path;

    const overlay = document.createElement("div");
    overlay.className = "movie-hover";

    const title = document.createElement("h3");
    title.className = "text-sm font-semibold";
    title.textContent = item.title || item.name || "Untitled";

    const btn = document.createElement("button");
    btn.className = "info-btn";
    btn.textContent = "View";

    overlay.appendChild(title);
    overlay.appendChild(btn);

    div.appendChild(img);
    div.appendChild(overlay);

    //Click navigation (NO template string)
    div.onclick = function () {
      window.location.href =
        "/pages/details.html?id=" + item.id + "&type=" + item.media_type;
    };

    resultsContainer.appendChild(div);
  });
}

//Load trending
async function loadTrending() {
  try {
    const url = BASE_URL + "/trending/all/week?api_key=" + TMDB_API_KEY;

    const res = await fetch(url);
    const data = await res.json();

    displayResults(data.results);
  } catch (err) {
    console.error("Trending error:", err);
  }
}

async function fetchSuggestions(query) {
  try {
    const url =
      BASE_URL +
      "/search/multi?api_key=" +
      TMDB_API_KEY +
      "&query=" +
      encodeURIComponent(query);

    const res = await fetch(url);
    const data = await res.json();

    displaySuggestions(data.results.slice(0, 5)); // limit to 5
  } catch (err) {
    console.error("Suggestion error:", err);
  }
}

function displaySuggestions(items) {
  suggestionsList.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");

    li.className = "cursor-pointer hover:text-white transition duration-200";

    li.textContent = item.title || item.name || "Unknown";

    // click suggestion
    li.onclick = () => {
      const input = document.getElementById("searchInput");
      input.value = item.title || item.name;

      suggestionsList.innerHTML = "";
      displayResults([item]);
    };

    suggestionsList.appendChild(li);
  });
}
