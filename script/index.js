require("dotenv").config();
const axios = require("axios");

const searchCompetitorArticles = require("./googleSearch");
const scrapeArticleContent = require("./scrapeArticle");

const API_BASE_URL = process.env.API_BASE_URL;

async function fetchOriginalArticles() {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data.filter((a) => a.isUpdated === false);
}

(async () => {
  const articles = await fetchOriginalArticles();

  for (const article of articles) {
    console.log("\nOriginal Article:");
    console.log(article.title);

    const competitors = await searchCompetitorArticles(article.title);

    for (const url of competitors) {
      console.log("\nScraping competitor:", url);

      const content = await scrapeArticleContent(url);

      console.log(
        "Scraped content length:",
        content.length > 0 ? content.length : "FAILED"
      );
    }
  }
})();
