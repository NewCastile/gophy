import axios from "axios";
import { useEffect, useReducer } from "react";
import { GifResponse } from "../types/api";
import { GifFetchAction, GifFetchState } from "../types/gif";
import { GifsReducer } from "./reducers";

export default function useGifs(
  url: string,
  limit: number
): [GifFetchState, React.Dispatch<GifFetchAction>] {
  const [state, dispatch] = useReducer(GifsReducer, {
    data: null,
    error: null,
    isLoading: false,
    page: 0,
    isLoadingNextPage: false,
  });

  const abortController = new AbortController();
  const fetchGifs = async (controller: AbortController) => {
    const gifsResponse = await axios
      .get<GifResponse>(
        url.concat(`&limit=${limit}&offset=${state.page * limit}`),
        { signal: controller.signal }
      )
      .then((res) => res.data)
      .catch((err) => err);
    return gifsResponse;
  };

  useEffect(() => {
    // fetches gifs on first render or when the user searches
    const fetchOnFirstRender = async () => {
      dispatch({ type: "LOADING" });
      const gifsResponse = await fetchGifs(abortController);
      if (gifsResponse.data) {
        const { data: gifsList } = gifsResponse;
        return dispatch({
          type: "SUCCESS",
          payload: {
            gifs: gifsList,
            page: state.page,
          },
        });
      } else {
        return dispatch({
          type: "ERROR",
          payload: "Error while fetching next page",
        });
      }
    };

    fetchOnFirstRender();
    return function () {
      abortController.abort();
    };
  }, [url]);

  useEffect(() => {
    const fetchNextPage = async () => {
      const gifsResponse = await fetchGifs(abortController);
      if (gifsResponse.data && state.data) {
        const { data: gifsList } = gifsResponse;
        return dispatch({
          type: "SUCCESS",
          payload: {
            gifs: state.data.concat(gifsList),
            page: state.page,
          },
        });
      } else {
        return dispatch({
          type: "ERROR",
          payload: "Error while fetching next page",
        });
      }
    };

    if (state.data) fetchNextPage();
    return function () {
      abortController.abort();
    };
  }, [state.page]);

  return [state, dispatch];
}
