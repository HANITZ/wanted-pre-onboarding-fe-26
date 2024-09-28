import { useEffect, useMemo, useRef } from "react";
import { MockData } from "../mock/product";

export function useInfiniteScroll(loadMore: () => void, products: MockData[]) {
  const lastRef = useRef<HTMLDivElement>(null);

  const observe = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadMore();
            }
          });
        },
        { threshold: 1 }
      ),
    [loadMore]
  );

  useEffect(() => {
    if (lastRef.current) {
      observe.observe(lastRef.current as HTMLDivElement);
      return () => {
        observe.unobserve(lastRef.current as HTMLDivElement);
      };
    }
  }, [observe, lastRef, products]);

  return { lastRef };
}
