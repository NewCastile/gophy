import { Category } from "../category";
import { Gif } from "../gif";

export interface Meta {
  msg: string;
  status: number;
  response_id: string;
}

export interface Pagination {
  offset: number;
}

export interface Response {
  meta: Meta;
  pagination: Pagination;
}

export interface CategoryResponse extends Response {
  data: Category[];
}

export interface GifResponse extends Response {
  data: Gif[];
}
