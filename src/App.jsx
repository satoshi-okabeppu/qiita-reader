import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://qiita.com/api/v2/items?page=1&per_page=20")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>読み込み中...</h2>;

  return (
    <div style={{ padding: "20px" }} name="bottom">
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
      <div style={{ position: "fixed", bottom: "0", width: "100%", display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f0f0f0" }}>
  <button onClick={() => {
    fetch("https://qiita.com/api/v2/items?query=tag%3A-%E5%91%B3%E6%99%82%E3%83%80%E3%83%A3&page=1&per_page=20")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }}>トレンド</button>
  <button onClick={() => { /* 検索処理をここに追加する */ }} style={{ flex: 1 }}>検索</button>
</div>
    </div>
    
  );
}

export default App;
