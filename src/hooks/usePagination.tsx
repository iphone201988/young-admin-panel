import { useEffect, useRef, useState } from "react";

export const usePagination = ({
  scrollDown,
  fetchData,
}: {
  scrollDown: boolean;
  fetchData: any;
}) => {
  const [pagination, setPagnation] = useState({
    page: 1,
    totalPages: 1,
  });
  const scrollableRef = useRef<HTMLDivElement>(null);
  const prevScrollRef = useRef({ scrollTop: 0, scrollHeight: 0 });

  const handleScroll = async () => {
    console.log("scrollDown::;", scrollableRef.current);
    if (scrollableRef.current && pagination.page < pagination.totalPages) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      const page = pagination.page + 1;
      if (scrollDown && scrollTop === 0) {
        setPagnation((prev: any) => ({
          ...prev,
          page,
        }));

        prevScrollRef.current = {
          scrollTop: scrollableRef.current.scrollTop,
          scrollHeight: scrollableRef.current.scrollHeight,
        };
      }
      if (!scrollDown && scrollTop + clientHeight === scrollHeight) {
        setPagnation((prev: any) => ({
          ...prev,
          page,
        }));

        prevScrollRef.current = {
          scrollTop: scrollableRef.current.scrollTop,
          scrollHeight: scrollableRef.current.scrollHeight,
        };
      }
    }
  };

  const restoreScrollPosition = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight } = prevScrollRef.current;
      const newScrollHeight = scrollableRef.current.scrollHeight;
      scrollableRef.current.scrollTop =
        scrollTop + (newScrollHeight - scrollHeight);
    }
  };

  useEffect(() => {
    if (
      scrollableRef.current &&
      pagination.page > 1 &&
      pagination.page <= pagination.totalPages
    ) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;

      if (scrollDown && scrollTop === 0) {
        fetchData();
      }

      if (!scrollDown && scrollTop + clientHeight === scrollHeight) {
        fetchData();
      }
    }
  }, [pagination.page]);

  return {
    pagination,
    setPagnation,
    scrollableRef,
    handleScroll,
    restoreScrollPosition,
  };
};
