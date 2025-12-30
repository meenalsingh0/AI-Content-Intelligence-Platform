require("dotenv").config();
const axios = require("axios");

const API_BASE_URL = process.env.API_BASE_URL;

async function fetchOriginalArticles() {
  const response = await axios.get(`${API_BASE_URL}/articles`);

  // only original articles
  const originals = response.data.filter(
    (article) => article.isUpdated === false
  );

  return originals;
}

(async () => {
  try {
    const articles = await fetchOriginalArticles();

    console.log(`Fetched ${articles.length} original articles\n`);

    articles.forEach((a, i) => {
      console.log(`Article ${i + 1}:`);
      console.log("Title:", a.title);
      console.log("ID:", a._id);
      console.log("-----------");
    });
  } catch (err) {
    console.error("Error fetching articles:", err.message);
  }
})();
