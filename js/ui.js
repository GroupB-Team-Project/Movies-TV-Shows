import { IMAGE_URL } from "./config.js";

const content = document.getElementById("content");

export function displayItems(items, type) {
  if (!content || !items) return;

  content.innerHTML = "";

  items.forEach((item) => {
    if (!item.poster_path) return;

    const title = type === "movie" ? item.title : item.name;

    const rating =
      item.vote_average && !isNaN(item.vote_average)
        ? item.vote_average.toFixed(1)
        : "N/A";

    const card = document.createElement("div");

    card.className = "movie-card";
    card.dataset.id = item.id;
    card.dataset.type = type;

    card.innerHTML = `
      <img src="${IMAGE_URL + item.poster_path}" alt="${title}" />

      <div class="movie-hover">
        <h4>${title}</h4>
        <p>⭐ ${rating}</p>

        <div class="buttons">
          <button class="info-btn">Info</button>
        </div>
      </div>
    `;

    // INFO BUTTON
    card.querySelector(".info-btn").addEventListener("click", (e) => {
      e.stopPropagation();

      const isInPagesFolder = window.location.pathname.includes("/pages/");

      const detailsPath = isInPagesFolder
        ? `details.html?id=${item.id}&type=${type}`
        : `pages/details.html?id=${item.id}&type=${type}`;

      window.location.href = detailsPath;
    });

    // CARD CLICK
    card.addEventListener("click", () => {
      const isInPagesFolder = window.location.pathname.includes("/pages/");

      const detailsPath = isInPagesFolder
        ? `details.html?id=${item.id}&type=${type}`
        : `pages/details.html?id=${item.id}&type=${type}`;

      window.location.href = detailsPath;
    });

    content.appendChild(card);
  });
}
