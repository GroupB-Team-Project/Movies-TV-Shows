document.addEventListener("click", async function (e) {
  // PLAY BUTTON
  if (e.target.classList.contains("play-btn")) {
    e.stopPropagation();

    const card = e.target.closest(".movie-card");
    const id = card.dataset.id;
    const type = card.dataset.type;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=YOUR_API_KEY`,
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        alert("Trailer not available");
        return;
      }

      const video = data.results[0];

      window.open(`https://www.youtube.com/watch?v=${video.key}`, "_blank");
    } catch (err) {
      console.error(err);
      alert("Could not load trailer");
    }
  }

  // INFO BUTTON
  if (e.target.classList.contains("info-btn")) {
    e.stopPropagation();

    const card = e.target.closest(".movie-card");
    const id = card.dataset.id;
    const type = card.dataset.type;

    const isInPagesFolder = window.location.pathname.includes("/pages/");

    const detailsPath = isInPagesFolder
      ? `details.html?id=${id}&type=${type}`
      : `pages/details.html?id=${id}&type=${type}`;

    window.location.href = detailsPath;
  }
});
