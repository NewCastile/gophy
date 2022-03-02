import axios from "axios";
import {
  Category,
  CategoryFetchAction,
  CategoryFetchState,
  CategoryQueryObject,
} from "../types/category";
import { Dispatch, useEffect, useReducer } from "react";
import { CategoryResponse } from "../types/api";
import { CategoryReducer } from "./reducers";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function useCategories(
  limit: number,
  category?: string
): [CategoryFetchState, Dispatch<CategoryFetchAction>] {
  const [state, dispatch] = useReducer(CategoryReducer, {
    categories: null,
    displayed: null,
    error: null,
    isLoading: false,
    isLoadingNextPage: false,
    isRefetching: false,
    page: 0,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const init = async () => {
      dispatch({ type: "LOADING" });
      const response = await axios.get<CategoryResponse>(
        `https://api.giphy.com/v1/gifs/categories?api_key=${API_KEY}`,
        { signal: abortController.signal }
      );
      try {
        if (!response.data) throw new Error("Error while fetching categories");
        const { data: categories } = response.data;
        const allCategories = category
          ? mapSubcategories(category, categories)
          : mapMainCategories(categories);
        if (!allCategories)
          throw new Error(`Couldn't find the ${category} category`);
        return dispatch({
          type: "SUCCESS",
          payload: {
            categories: allCategories,
            displayed: allCategories.slice(state.page, state.page + limit),
            page: state.page,
          },
        });
      } catch (err) {
        return dispatch({
          type: "ERROR",
          payload: JSON.stringify(err),
        });
      }
    };
    init();
    return function () {
      abortController.abort();
    };
  }, [category]);

  useEffect(() => {
    const displayNextCategories = async () => {
      if (state.categories) {
        if (state.page >= state.categories.length) {
          return;
        }
        const followingCategories = state.categories.slice(
          state.page + 1,
          state.page + limit
        );
        // conditional only for type constraint
        if (state.displayed) {
          return dispatch({
            type: "SUCCESS",
            payload: {
              categories: state.categories,
              displayed: state.displayed.concat(followingCategories),
              page: state.page,
            },
          });
        }
      }
    };
    displayNextCategories();
  }, [state.page]);

  return [state, dispatch];
}

const mapMainCategories = (categories: Category[]): CategoryQueryObject[] => {
  return categories.map((cat) => {
    return {
      url: `https://api.giphy.com/v1/gifs/search?q=${cat.name_encoded}&api_key=${API_KEY}`,
      name: cat.name,
      name_encoded: cat.name_encoded,
    };
  });
};

const mapSubcategories = (
  category: string,
  categories: Category[]
): false | CategoryQueryObject[] => {
  const [filteredCategory] = categories.filter(
    (cat) => cat.name_encoded === category
  );
  if (!filteredCategory) {
    return false;
  }
  return filteredCategory.subcategories.map((subcat) => {
    return {
      url: `https://api.giphy.com/v1/gifs/search?q=${subcat.name_encoded}&api_key=${API_KEY}`,
      name: subcat.name,
      name_encoded: subcat.name_encoded,
    };
  });
};
