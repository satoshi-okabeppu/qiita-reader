import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = () => {
    setLoading(true);

    const date = new Date();
    date.setDate(date.getDate() - 7);
    const weekAgo = date.toISOString().split("T")[0];

    fetch(
      `https://qiita.com/api/v2/items?page=1&per_page=20&query=created:>${weekAgo}+stocks:>10`
    )
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
        (a, b) => b.likes_count - a.likes_count
        );

        setArticles(sorted);
        setLoading(false);
              })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // 初回ロード
  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>読み込み中...</h2>;

  return (
    <div name="container">
      <div style={{ padding: "20px" }}>
        <h1>Qiita Reader</h1>

        {articles.map((article) => (
          <div key={article.id} className="card">
            <a href={article.url} target="_blank">
              <h3>{article.title}</h3>
            </a>

            <p>投稿者: {article.user.id}</p>
            <p>いいね: {article.likes_count}</p>
          </div>
        ))}
      </div>
      <div style={{ position: "fixed", bottom: "0", width: "96%", display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f0f0f0" }}>
        <button onClick={() => { /* 検索処理をここに追加する */ }}>検索</button>
        <button onClick={() => { /* ブックマーク処理をここに追加する */ }}>後で</button>
      </div>
    </div>
    
  );
}

export default App;
