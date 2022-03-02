import { CategoryFetchAction, CategoryFetchState } from "../../types/category";
import { GifFetchAction, GifFetchState } from "../../types/gif";

export const CategoryReducer = function (
  state: CategoryFetchState,
  action: CategoryFetchAction
) {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        displayed: null,
        error: action.payload,
        isFetching: false,
        isLoadingNextPage: false,
      };
    case "SUCCESS":
      return {
        categories: action.payload.categories,
        displayed: action.payload.displayed,
        error: null,
        isLoading: false,
        isLoadingNextPage: false,
        isRefetching: false,
        page: action.payload.page,
      };
    case "LOADING":
      return {
        ...state,
        error: null,
        isLoading: true,
        isLoadingNextPage: false,
        isRefetching: false,
      };
    case "FETCH_NEXT_PAGE":
      return {
        ...state,
        error: null,
        isLoading: false,
        isLoadingNextPage: true,
        isRefetching: false,
        page: action.payload.page,
      };
    case "RETRY":
      return {
        ...state,
        error: null,
        isLoading: false,
        isLoadingNextPage: false,
        isRefetching: true,
      };
    default:
      return state;
  }
};

export const GifsReducer = function (
  state: GifFetchState,
  action: GifFetchAction
) {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isLoadingNextPage: false,
      };
    case "SUCCESS":
      return {
        data: action.payload.gifs,
        error: null,
        isLoading: false,
        page: action.payload.page,
        isLoadingNextPage: false,
      };
    case "LOADING":
      return {
        ...state,
        error: null,
        isLoading: true,
        isLoadingNextPage: false,
      };
    case "FETCH_NEXT_PAGE":
      return {
        ...state,
        error: null,
        isLoading: false,
        page: action.payload.page,
        isLoadingNextPage: true,
      };
    default:
      return state;
  }
};
