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

  useEffect(() => {
    const abortController = new AbortController();
    const init = async () => {
      if (state.data === null) dispatch({ type: "LOADING" });
      const gifsResponse = await getGifs(
        url.concat(`&limit=${limit}&offset=${state.page * limit}`)
      );
      if (gifsResponse.data) {
        const { data: gifsList } = gifsResponse;
        return dispatch({
          type: "SUCCESS",
          payload: {
            gifs: state.data ? state.data.concat(gifsList) : gifsList,
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
    init();

    return function () {
      abortController.abort();
    };
  }, [url, state.page]);

  return [state, dispatch];
}

const getGifs = async (url: string): Promise<GifResponse> => {
  return axios
    .get<GifResponse>(url)
    .then((res) => res.data)
    .catch((err) => err);
};
