const express = require("express");
const router = express.Router();

const {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

router.post("/articles", createArticle);
router.get("/articles", getAllArticles);
router.get("/articles/:id", getArticleById);
router.put("/articles/:id", updateArticle);
router.delete("/articles/:id", deleteArticle);

module.exports = router;
