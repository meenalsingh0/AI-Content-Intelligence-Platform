import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        padding: "20px",
        marginBottom: "16px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.04)"
      }}
    >
      {/* Title */}
      <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>
        {article.title}
      </h3>

      {/* Status Badge */}
      <span
        style={{
          display: "inline-block",
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: "600",
          marginBottom: "12px",
          backgroundColor: article.isUpdated ? "#DCFCE7" : "#DBEAFE",
          color: article.isUpdated ? "#166534" : "#1E40AF"
        }}
      >
        {article.isUpdated ? "Updated Version" : "Original Article"}
      </span>

      {/* Action */}
      <div style={{ marginTop: "12px" }}>
        <Link
          to={`/articles/${article._id}`}
          style={{
            textDecoration: "none",
            color: "#2563EB",
            fontWeight: "600"
          }}
        >
          Read Article →
        </Link>
      </div>
    </div>
  );
}
