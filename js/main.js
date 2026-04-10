import { TMDB_API_KEY, BASE_URL } from "./config.js";
import { displayItems } from "./ui.js";

// =======================
// GLOBAL STATE
// =======================
let currentPage = 1;
let currentType = "movie";
let currentCategory = "now_playing";
let isLoading = false;

const content = document.getElementById("content");
const showMoreBtn = document.getElementById("showMoreBtn");
const moviesTab = document.getElementById("moviesTab");
const tvTab = document.getElementById("tvTab");

// =======================
// FETCH CONTENT
// =======================
async function fetchContent(type, category, page = 1) {
  if (!content || isLoading) return;

  try {
    isLoading = true;

    // Loading state (only when first page)
    if (page === 1) {
      content.innerHTML = `
  ${Array(8)
    .fill()
    .map(
      () => `
  <div class="animate-pulse">
    <div class="bg-zinc-800 h-[420px] rounded-xl"></div>
  </div>
  `,
    )
    .join("")}
`;
    }

    const res = await fetch(
      `${BASE_URL}/${type}/${category}?api_key=${TMDB_API_KEY}&page=${page}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      if (page === 1) {
        content.innerHTML =
          "<p class='text-center col-span-full text-slate-400'>No results found.</p>";
      }
      return;
    }

    // Clear only on first page
    if (page === 1) {
      content.innerHTML = "";
    }

    displayItems(data.results, type);
  } catch (error) {
    console.error(error);
    content.innerHTML =
      "<p class='text-center col-span-full text-red-400'>Something went wrong. Please try again.</p>";
  } finally {
    isLoading = false;
  }
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
