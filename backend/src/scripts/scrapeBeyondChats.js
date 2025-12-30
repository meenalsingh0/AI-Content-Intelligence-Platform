const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
require("dotenv").config();

const Article = require("../models/Article");

const BASE_URL = "https://beyondchats.com";

/* ---------- DB ---------- */
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected for scraping");
};

/* ---------- SLUG ---------- */
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();

/* ---------- AUTO SCROLL ---------- */
const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 400);
    });
  });
};

/* ---------- SCRAPER ---------- */
const scrapeBeyondChats = async () => {
  await connectDB();

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  console.log("Opening blogs page...");
  await page.goto(`${BASE_URL}/blogs`, { waitUntil: "networkidle2" });

  // 👇 THIS IS THE KEY
  console.log("Scrolling to load all articles...");
  await autoScroll(page);
  await autoScroll(page); // scroll twice to be safe

  // 📰 Extract article links AFTER scroll
  const articleLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a"))
      .map((a) => a.href)
      .filter(
        (href) =>
          href.includes("/blogs/") &&
          !href.endsWith("/blogs") &&
          !href.endsWith("/blogs/") &&
          !href.includes("#")
      );
  });

  const uniqueLinks = [...new Set(articleLinks)];

  console.log(`Found ${uniqueLinks.length} article links`);

  if (uniqueLinks.length < 5) {
    console.log("❌ Not enough articles found");
    process.exit(1);
  }

  // 🕰️ Oldest articles = last ones
  const oldestFive = uniqueLinks.slice(-5);

  console.log("Oldest 5 article links:");
  console.log(oldestFive);

  // 📄 Scrape each article
  for (const url of oldestFive) {
    console.log("Scraping:", url);
    await page.goto(url, { waitUntil: "networkidle2" });

    const { title, content } = await page.evaluate(() => {
      const title = document.querySelector("h1")?.innerText || "";
      const content = Array.from(document.querySelectorAll("p"))
        .map((p) => p.innerText)
        .join("\n\n");
      return { title, content };
    });

    if (!title || !content) {
      console.log("Skipping empty article");
      continue;
    }

    const slug = slugify(title);

    const exists = await Article.findOne({ slug });
    if (exists) {
      console.log("Already exists:", title);
      continue;
    }

    await Article.create({
      title,
      slug,
      content,
      source: "BeyondChats",
      isUpdated: false,
    });

    console.log("Saved:", title);
  }

  await browser.close();
  console.log("✅ Scraping completed successfully");
  process.exit();
};

scrapeBeyondChats();
