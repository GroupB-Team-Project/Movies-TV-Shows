import { IMAGE_URL } from "./config.js";

// =======================
// ELEMENT
// =======================
const content = document.getElementById("content");

// =======================
// DISPLAY MOVIE / TV CARDS
// =======================
export function displayItems(items, type) {
  if (!content || !items) return;

  items.forEach((item) => {
    if (!item.poster_path) return;

    const title = type === "movie" ? item.title : item.name;
    const rating =
      item.vote_average && !isNaN(item.vote_average)
        ? item.vote_average.toFixed(1)
        : "N/A";

    const card = document.createElement("div");

    card.className = `
      group cursor-pointer relative
      bg-gradient-to-br from-zinc-950 via-black to-zinc-900
      border border-white/10
      rounded-xl overflow-hidden
      transition-all duration-500
      hover:-translate-y-2
      hover:shadow-[0_40px_120px_rgba(0,0,0,1)]
    `;

    card.innerHTML = `
      <img
        src="${IMAGE_URL + item.poster_path}"
        alt="${title}"
        class="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div class="absolute bottom-0 w-full bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
        <h3 class="text-white font-semibold text-sm mb-1">${title}</h3>
        <p class="text-slate-400 text-xs">⭐ ${rating}</p>
      </div>
    `;

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
