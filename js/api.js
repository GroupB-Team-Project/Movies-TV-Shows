import { TMDB_API_KEY, BASE_URL } from "./config.js";
import { displayItems } from "./ui.js";

// =======================
// FETCH MOVIES
// =======================
export async function fetchMovies() {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`,
    );
    const data = await res.json();
    displayItems(data.results, "movie");
  } catch (err) {
    console.error("Movies fetch failed", err);
  }
}

// =======================
// FETCH TV SHOWS
// =======================
export async function fetchTVShows() {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/on_the_air?api_key=${TMDB_API_KEY}`,
    );
    const data = await res.json();
    displayItems(data.results, "tv");
  } catch (err) {
    console.error("TV fetch failed", err);
  }
}

// =======================
// FETCH TOP RATED
// =======================
export async function fetchTopRated() {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`,
    );
    const data = await res.json();
    displayItems(data.results, "movie");
  } catch (err) {
    console.error("Top rated fetch failed", err);
  }
}
