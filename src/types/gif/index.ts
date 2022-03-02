export interface Gif {
  id: string;
  url: string;
  embed_url: string;
  username: string;
  source: string;
  images: Images;
}

export interface Images {
  original: ImageBase;
  preview_gif: ImageBase;
  fixed_height_small: ImageBase;
  fixed_width_small: ImageBase;
}

export interface ImageBase {
  width: string;
  height: string;
  url: string;
}

export interface GifFetchState {
  data: Gif[] | null;
  error: string | null;
  isLoading: boolean;
  page: number;
  isLoadingNextPage: boolean;
}

export interface GifOnErrorAction {
  type: "ERROR";
  payload: string;
}

export interface GifOnSuccessAction {
  type: "SUCCESS";
  payload: GifOnSuccessPayload;
}

export type GifOnSuccessPayload = {
  gifs: Gif[];
  page: number;
};

export interface GifOnFetchAction {
  type: "LOADING";
}

export interface GifOnNextPageAction {
  type: "FETCH_NEXT_PAGE";
  payload: { page: number };
}

export type GifFetchAction =
  | GifOnSuccessAction
  | GifOnErrorAction
  | GifOnFetchAction
  | GifOnNextPageAction;
