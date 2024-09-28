import { useCallback, useEffect, useState } from "react";
import { getMockData, MockData } from "../mock/product";

export function useProduct() {
  const [products, setProducts] = useState<MockData[]>([]);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    getMockData(page).then(({ datas, isEnd }) => {
      setProducts((prev) => [...prev, ...datas]);
      setEnd(isEnd);
    });
  }, [page]);

  const loadMore = useCallback(() => {
    if (!end) {
      setPage((prev) => prev + 1);
    }
  }, [setPage, end]);

  return { products, loadMore };
}
