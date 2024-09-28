import { useEffect, useState } from "react";
import { getMockData, MockData } from "./mock/product";

function App() {
  const [products, setProducts] = useState<MockData[]>([]);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);
  useEffect(() => {
    getMockData(page).then(({ datas, isEnd }) => {
      setProducts((prev) => [...prev, ...datas]);
      setEnd(isEnd);
    });
  }, [page]);
  console.log(products);
  return (
    <div style={{ padding: 25 }}>
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.productId}>
              <span>{product.productName}</span>
              <span>{product.price}</span>
            </li>
          ))}
        <li>
          <span>{}</span>
        </li>
      </ul>
    </div>
  );
}

export default App;
