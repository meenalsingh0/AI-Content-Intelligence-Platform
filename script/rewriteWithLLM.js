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

Use ideas and structure inspiration from the COMPETITOR ARTICLES.
DO NOT plagiarize.
DO NOT copy sentences.
Write in original language and tone.

Return well-formatted MARKDOWN.

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
      {
        role: "system",
        content: "You are a professional blog writer and SEO expert.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}

module.exports = rewriteArticle;
