const endpoint = "https://script.google.com/macros/s/AKfycbxjMIi7RzVdOQbegw5XxIT9oUQOA_aiR9ifOZK5_QExDRtH0AkH0-Ves8bkT3u0WQcK9A/exec";
let allArticles = [];
let currentIndex = 0;
const batchSize = 15;

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("rss-feed-widget");
  const grid = document.createElement("div");
  grid.className = "rss-container";
  container.appendChild(grid);

  const button = document.createElement("button");
  button.className = "rss-load-more";
  button.textContent = "Load More";
  button.onclick = loadMore;
  container.appendChild(button);

  function renderArticles(articles) {
    articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "rss-card";

      const img = document.createElement("img");
      img.src = article.image;

      const content = document.createElement("div");
      content.className = "rss-card-content";

      const title = document.createElement("a");
      title.href = article.url;
      title.target = "_blank";
      title.className = "rss-card-title";
      title.textContent = article.title;

      const desc = document.createElement("div");
      desc.className = "rss-card-desc";
      desc.textContent = article.description;

      content.appendChild(title);
      content.appendChild(desc);
      card.appendChild(img);
      card.appendChild(content);

      grid.appendChild(card);
    });
  }

  function loadMore() {
    const nextArticles = allArticles.slice(currentIndex, currentIndex + batchSize);
    renderArticles(nextArticles);
    currentIndex += batchSize;
    if (currentIndex >= allArticles.length) {
      button.style.display = "none";
    }
  }

  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      allArticles = data.reverse();
      loadMore();
    })
    .catch(err => {
      container.innerHTML = "<p style='color: white;'>Failed to load articles. Please try again later.</p>";
    });
});
