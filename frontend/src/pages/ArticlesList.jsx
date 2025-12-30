import { useEffect, useState } from "react";
import api from "../api";
import ArticleCard from "../components/ArticleCard";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.get("/articles").then((res) => {
      setArticles(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "8px"
}}>
  BeyondChats Articles
</h1>

<p style={{
  color: "#555",
  marginBottom: "24px"
}}>
  Original blog articles and their AI-enhanced versions
</p>


      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}
