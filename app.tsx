import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};

        data.forEach((item) => {
          if (!grouped[item.category]) {
            grouped[item.category] = [];
          }
          grouped[item.category].push(item);
        });

        setProducts(grouped);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      {Object.keys(products).map((category) => (
        <div key={category} style={{ marginBottom: "2rem" }}>
          <h2>{category}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {products[category].map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  width: "200px",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", height: "150px", objectFit: "contain" }}
                />
                <h4>{product.title}</h4>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

