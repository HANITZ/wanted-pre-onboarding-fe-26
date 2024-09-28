import { useInfiniteScroll } from "./hooks/useInfinitedScroll";
import { useProduct } from "./hooks/useProduct";

function App() {
  const { products, loadMore } = useProduct();

  const { lastRef } = useInfiniteScroll(loadMore, products);

  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  return (
    <div
      style={{
        padding: 25,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{ fontWeight: "bold", fontSize: "26px", lineHeight: "1.34" }}
      >
        Total : ${totalPrice}
      </span>
      <ul>
        {products &&
          products.map((product, idx) => (
            <li key={product.productId}>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "space-between",
                  border: "solid 1px",
                  borderRadius: 9,
                  width: "100%",
                  padding: "10px 20px",
                  margin: "10px 8px",
                }}
                ref={idx === products.length - 1 ? lastRef : null}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "8px 24px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "26px",
                      lineHeight: "1.34",
                    }}
                  >
                    {product.productName}
                  </span>
                  <div style={{ height: "10px" }} />
                  <span style={{ fontSize: "20px", lineHeight: "1.5" }}>
                    ${product.price}
                  </span>
                </div>
                <span>{formatDate(product.boughtDate)}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

export default App;
