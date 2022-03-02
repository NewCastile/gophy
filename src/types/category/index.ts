import { Gif } from "../gif";

export interface Category {
  name: string;
  name_encoded: string;
  subcategories: Subcategory[];
  gif: Gif;
}

export interface Subcategory {
  name: string;
  name_encoded: string;
}

export interface CategoryQueryObject {
  url: string;
  name: string;
  name_encoded: string;
}

// isLoading is used for optional rendering whereas isFetching is used for refetching
export interface CategoryFetchState {
  categories: CategoryQueryObject[] | null;
  displayed: CategoryQueryObject[] | null;
  error: string | null;
  isLoading: boolean;
  isLoadingNextPage: boolean;
  isRefetching: boolean;
  page: number;
}

export interface CategoryOnErrorAction {
  type: "ERROR";
  payload: string;
}

export interface CategoryOnSuccessAction {
  type: "SUCCESS";
  payload: CategoryOnSuccessPayload;
}

export interface CategoryOnSuccessPayload {
  categories: CategoryQueryObject[];
  displayed: CategoryQueryObject[];
  page: number;
}

export interface CategoryOnFetchAction {
  type: "LOADING";
}

export interface CategoryOnNextPageAction {
  type: "FETCH_NEXT_PAGE";
  payload: { page: number };
}

export default interface CategoryOnRetryAction {
  type: "RETRY";
}

export type CategoryFetchAction =
  | CategoryOnSuccessAction
  | CategoryOnErrorAction
  | CategoryOnFetchAction
  | CategoryOnNextPageAction
  | CategoryOnRetryAction;
