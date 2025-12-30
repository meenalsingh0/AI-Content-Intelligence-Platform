import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`/articles/${id}`).then((res) => {
      setArticle(res.data);
    });
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h1>{article.title}</h1>

      <div
        style={{
          lineHeight: "1.7",
          fontSize: "16px",
          color: "#1f2937",
          marginTop: "24px",
          whiteSpace: "pre-wrap"
        }}
      >
        {article.content}
      </div>


      {article.references?.length > 0 && (
        <div style={{ marginTop: "32px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>
            References
          </h3>
          <ul>
            {article.references.map((ref, i) => (
              <li key={i}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#2563EB" }}
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
