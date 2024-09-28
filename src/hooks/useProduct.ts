import { useCallback, useEffect, useState } from "react";
import { getMockData, MockData } from "../mock/product";

export function useProduct() {
  const [products, setProducts] = useState<MockData[]>([]);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMockData(page)
      .then(({ datas, isEnd }) => {
        setProducts((prev) => [...prev, ...datas]);
        setEnd(isEnd);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const loadMore = useCallback(() => {
    if (!end) {
      setPage((prev) => prev + 1);
    }
  }, [setPage, end]);

  return { products, loadMore, isLoading };
}
