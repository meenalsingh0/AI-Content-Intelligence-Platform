require("dotenv").config();
const axios = require("axios");

const searchCompetitorArticles = require("./googleSearch");
const scrapeArticleContent = require("./scrapeArticle");
const rewriteArticle = require("./rewriteWithLLM");

const API_BASE_URL = process.env.API_BASE_URL;

/* -------- Fetch original articles -------- */
async function fetchOriginalArticles() {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data.filter((a) => a.isUpdated === false);
}

/* -------- Publish updated article -------- */
async function publishUpdatedArticle(payload) {
  const response = await axios.post(`${API_BASE_URL}/articles`, payload);
  return response.data;
}

(async () => {
  try {
    const articles = await fetchOriginalArticles();

    console.log(`Processing ${articles.length} articles...\n`);

    for (const article of articles) {
      console.log("==================================");
      console.log("Original Article:", article.title);

      /* 1️⃣ Google search */
      const competitors = await searchCompetitorArticles(article.title);

      if (competitors.length < 2) {
        console.log("Not enough competitor articles found");
        continue;
      }

      console.log("Competitor URLs:", competitors);

      /* 2️⃣ Scrape competitor content */
      const competitorContents = [];

      for (const url of competitors) {
        const content = await scrapeArticleContent(url);
        if (content) competitorContents.push(content);
      }

      if (competitorContents.length < 2) {
        console.log("Failed to scrape competitor content");
        continue;
      }

      /* 3️⃣ Rewrite using Groq */
      console.log("Rewriting article with Groq...");
      const rewrittenContent = await rewriteArticle(
        article.content,
        competitorContents[0],
        competitorContents[1]
      );

      /* 4️⃣ Add references */
      const finalContent = `
${rewrittenContent}

---

## References
- ${competitors[0]}
- ${competitors[1]}
      `;

      /* 5️⃣ Publish updated article */
      const updatedArticlePayload = {
        title: `${article.title} (Updated)`,
        slug: `${article.slug}-updated`,
        content: finalContent,
        source: "Generated",
        isUpdated: true,
        originalArticleId: article._id,
        references: competitors,
      };

      const saved = await publishUpdatedArticle(updatedArticlePayload);

      console.log("Updated article published:", saved._id);
    }

    console.log("\nPhase 2 completed successfully");
    process.exit();
  } catch (error) {
    console.error("Phase 2 failed:", error.message);
    process.exit(1);
  }
})();
