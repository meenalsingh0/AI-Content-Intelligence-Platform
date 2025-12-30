const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Scrape main article content from a blog/article URL
 */
async function scrapeArticleContent(url) {
  try {
    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
      },
    });

    const $ = cheerio.load(data);

    let content = "";

    // Collect meaningful paragraphs
    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 60) {
        content += text + "\n\n";
      }
    });

    return content.trim();
  } catch (error) {
    console.error("Failed to scrape:", url);
    return "";
  }
}

module.exports = scrapeArticleContent;
