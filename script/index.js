require("dotenv").config();
const rewriteArticle = require("./rewriteWithLLM");

(async () => {
  const result = await rewriteArticle(
    "AI is changing customer support.",
    "AI improves response time using chatbots.",
    "Companies adopt AI to scale support."
  );

  console.log(result);
})();
