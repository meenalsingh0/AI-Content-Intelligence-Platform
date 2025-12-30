const axios = require("axios");

const SERP_API_KEY = process.env.SERPAPI_KEY;

/**
 * Search Google for article title
 * Returns top 2 competitor blog URLs
 */
async function searchCompetitorArticles(query) {
  const response = await axios.get("https://serpapi.com/search", {
    params: {
      q: query,
      engine: "google",
      api_key: SERP_API_KEY,
      num: 10,
    },
  });

  const results = response.data.organic_results || [];

  const competitors = [];

  for (const result of results) {
    const link = result.link;

    if (
      link &&
      !link.includes("beyondchats.com") &&
      (link.includes("blog") || link.includes("article"))
    ) {
      competitors.push(link);
    }

    if (competitors.length === 2) break;
  }

  return competitors;
}

module.exports = searchCompetitorArticles;
