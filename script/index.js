require("dotenv").config();
const axios = require("axios");
const searchCompetitorArticles = require("./googleSearch");

const API_BASE_URL = process.env.API_BASE_URL;

async function fetchOriginalArticles() {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data.filter((a) => a.isUpdated === false);
}

(async () => {
  const articles = await fetchOriginalArticles();

  for (const article of articles) {
    console.log("\nSearching competitors for:");
    console.log(article.title);

    const competitors = await searchCompetitorArticles(article.title);
    console.log("Competitor URLs:", competitors);
  }
})();
