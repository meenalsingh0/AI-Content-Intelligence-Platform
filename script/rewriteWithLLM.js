const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function rewriteArticle(original, competitor1, competitor2) {
  const prompt = `
You are an expert SEO content writer.

Rewrite the ORIGINAL ARTICLE by improving:
- structure
- clarity
- formatting
- depth

Use ideas and structure inspiration from COMPETITOR ARTICLES.
DO NOT plagiarize.
DO NOT copy sentences.

Return well-formatted markdown.

ORIGINAL ARTICLE:
${original}

COMPETITOR ARTICLE 1:
${competitor1}

COMPETITOR ARTICLE 2:
${competitor2}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile", 
    messages: [
      { role: "system", content: "You rewrite blog articles professionally." },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = rewriteArticle;
