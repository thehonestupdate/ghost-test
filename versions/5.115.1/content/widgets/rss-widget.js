<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSS Widget</title>
  <style>
    body {
      margin: 0;
      padding: 1em;
      background: #1e1e1e;
      font-family: 'Segoe UI', sans-serif;
      color: #fff;
    }
    .rss-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1em;
      max-height: 600px;
      overflow-y: auto;
    }
    .rss-card {
      background: #2b2b2b;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s;
    }
    .rss-card:hover {
      transform: translateY(-4px);
    }
    .rss-card img {
      width: 100%;
      height: 160px;
      object-fit: cover;
    }
    .rss-card-content {
      padding: 1em;
    }
    .rss-card-title {
      font-size: 1.1em;
      margin: 0 0 0.5em;
      color: #fff;
    }
    .rss-card-desc {
      font-size: 0.9em;
      color: #ccc;
    }
    .load-more {
      margin-top: 1em;
      text-align: center;
    }
    .load-more button {
      padding: 0.5em 1.2em;
      background: #ff4081;
      border: none;
      border-radius: 6px;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
    .load-more button:hover {
      background: #e73370;
    }
  </style>
</head>
<body>
  <div class="rss-container" id="rssContainer"></div>
  <div class="load-more"><button onclick="loadMore()">Load More</button></div>

  <script>
    const endpoint = "https://script.google.com/macros/s/AKfycbxjMIi7RzVdOQbegw5XxIT9oUQOA_aiR9ifOZK5_QExDRtH0AkH0-Ves8bkT3u0WQcK9A/exec";
    let allArticles = [];
    let currentIndex = 0;
    const batchSize = 15;

    function renderArticles(articles) {
      const container = document.getElementById("rssContainer");
      articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "rss-card";

        const image = document.createElement("img");
        image.src = article.image;

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
        card.appendChild(image);
        card.appendChild(content);

        container.appendChild(card);
      });
    }

    function loadMore() {
      const nextArticles = allArticles.slice(currentIndex, currentIndex + batchSize);
      renderArticles(nextArticles);
      currentIndex += batchSize;
    }

    async function init() {
      const res = await fetch(endpoint);
      const data = await res.json();
      allArticles = data.reverse();
      loadMore();
    }

    init();
  </script>
</body>
</html>
