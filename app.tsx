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
    <div >
      {Object.keys(products).map((category) => (
        <div key={category} >
          <h2>{category}</h2>
          <div >
            {products[category].map((product) => (
              <div
                key={product.id}
              >
                <img
                  src={product.image}
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

