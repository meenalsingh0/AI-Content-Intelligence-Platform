# AI Content Intelligence Platform

A full-stack platform that scrapes blog articles, analyzes top-ranking competitor content, and uses Large Language Models (LLMs) to generate improved, SEO-optimized article versions — complete with citations and a modern frontend UI.

This project is designed to showcase backend engineering, automation pipelines, LLM integration, and deployment.

---

## Live Links

- **Frontend (Netlify):**  
  https://my-frontend0.netlify.app/

- **Backend API (Render):**  
  https://my-backend-md1w.onrender.com/api/articles

---

## Project Overview

The platform implements an end-to-end **content intelligence workflow**:

1. Scrape blog articles from a public website
2. Store them in a database with full CRUD support
3. Search Google for competitor articles
4. Scrape competitor content
5. Rewrite articles using an LLM (non-plagiarized)
6. Publish original and AI-enhanced versions side-by-side
7. Display everything in a clean, responsive frontend UI

---

## Content Scraping & Backend APIs

### Features
- Scrapes blog articles from a dynamically rendered website
- Stores articles in MongoDB
- Exposes full CRUD APIs

### Tech Used
- Node.js
- Express.js
- MongoDB Atlas
- Puppeteer (for dynamic scraping)

### API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/articles` | Fetch all articles |
| GET | `/api/articles/:id` | Fetch article by ID |
| POST | `/api/articles` | Create article |
| PUT | `/api/articles/:id` | Update article |
| DELETE | `/api/articles/:id` | Delete article |

---

### Important Scraping Note

The target blog page is **client-side rendered** and uses **infinite scrolling**, which makes static HTML scraping insufficient.

To handle this:
- **Puppeteer with auto-scroll logic** was used to load all content dynamically.
- Non-article pages such as `/tag/*` routes were explicitly filtered out.

At the time of implementation, **only 3 valid blog article pages** were publicly accessible via standard `/blogs/{slug}` routes.

The scraper is **future-proofed** and will automatically collect more articles if additional valid blog pages become available later.

---

## AI-Based Article Enhancement

### Automated Workflow

For each original article:
1. Fetch article from backend API
2. Search article title on Google
3. Select top competitor blog articles
4. Scrape competitor article content
5. Rewrite original article using an LLM
6. Publish updated article with references

### LLM Used
- **Groq LLM – `llama-3.3-70b-versatile`**

### Design Decisions
- Original articles are **never overwritten**
- Updated articles are stored as separate records
- Each updated article includes:
  - `originalArticleId`
  - `references` (competitor URLs)
  - `isUpdated: true`

This ensures traceability, transparency, and data integrity.

---

## Frontend Application

### Features
- React-based frontend
- Displays original and AI-enhanced articles
- Clear visual distinction using status badges
- Reference links shown for updated articles
- Responsive, clean, professional UI

### Tech Used
- React.js
- React Router
- Axios
- Netlify (deployment)

---

## System Architecture
                ┌──────────────────────────┐
                │        Frontend UI        │
                │        (React.js)         │
                │      Deployed on Netlify  │
                └─────────────┬────────────┘
                              │
                              │ REST API (HTTPS)
                              ▼
                ┌──────────────────────────┐
                │        Backend API        │
                │   Node.js + Express.js   │
                │     Deployed on Render   │
                └─────────────┬────────────┘
                              │
                              │ Mongoose Queries
                              ▼
                ┌──────────────────────────┐
                │      MongoDB Atlas       │
                │   Articles Collection   │
                └──────────────────────────┘


    ┌───────────────────────────────────────────────────┐
    │            Automation / AI Pipeline                │
    │                                                    │
    │  ┌──────────────┐   ┌──────────────────────────┐ │
    │  │ Google Search│──▶│  Competitor Article URLs │ │
    │  │  (SerpAPI)   │   └─────────────┬────────────┘ │
    │  └──────────────┘                 │              │
    │                                   ▼              │
    │  ┌──────────────────────────┐  Scraping          │
    │  │ Competitor Content Scraper│  (Cheerio/Axios) │
    │  └─────────────┬────────────┘                    │
    │                │                                 │
    │                ▼                                 │
    │  ┌──────────────────────────┐                    │
    │  │   Groq LLM (LLaMA 3.3)   │                    │
    │  │ Article Rewriting Engine │                    │
    │  └─────────────┬────────────┘                    │
    │                │                                 │
    │                ▼                                 │
    │  ┌──────────────────────────┐                    │
    │  │ Updated Article Publisher│                    │
    │  │   (Backend CRUD APIs)    │                    │
    │  └──────────────────────────┘                    │
    └───────────────────────────────────────────────────┘

---

## Project Structure

root/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── models/
│ │ └── scripts/
│ └── package.json
│
├── script/
│ ├── index.js
│ ├── googleSearch.js
│ ├── scrapeArticle.js
│ ├── rewriteWithLLM.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── api.js
│ └── package.json


---

## ⚙️ Local Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
```

Create .env:
```bash
MONGO_URI=your_mongodb_uri
```

Automation Script
```bash
cd script
npm install
node index.js
```

Create .env:
```bash
API_BASE_URL=http://localhost:5000/api
GROQ_API_KEY=your_groq_key
SERPAPI_KEY=your_serpapi_key
```
Frontend
```bash
cd frontend
npm install
npm start
```
## What This Project Demonstrates
-Full-stack system design
-Web scraping of dynamic content
-REST API development
-LLM integration in real-world workflows
-Automation pipelines
-Production deployment (Render + Netlify)
-Clean, professional UI/UX
