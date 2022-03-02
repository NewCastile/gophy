import { Box } from "@chakra-ui/react";
import debounce from "just-debounce-it";
import { Dispatch, useEffect, useRef } from "react";
import { CategoryFetchAction, CategoryFetchState } from "../types/category";
import { GifFetchAction } from "../types/gif";

interface VisorProps {
  sectionCurrentPage: CategoryFetchState["page"];
  dispatcher: Dispatch<CategoryFetchAction> | Dispatch<GifFetchAction>;
}

export default function Visor({ sectionCurrentPage, dispatcher }: VisorProps) {
  const visorRef = useRef<HTMLDivElement>(null);
  const onChange = (entries: any[]) => {
    const el = entries[0];
    if (el.isIntersecting) {
      dispatcher({
        type: "FETCH_NEXT_PAGE",
        payload: { page: sectionCurrentPage + 1 },
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(debounce(onChange, 1000), {
      rootMargin: "100px",
    });

    observer.observe(visorRef.current as HTMLDivElement);
  }, []);

  return <Box ref={visorRef} />;
}
