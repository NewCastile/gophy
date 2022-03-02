import { CategoryQueryObject } from "../category";
import { Gif } from "../gif";

export interface CarrouselProps {
  gifs: Gif[];
  spacing?: number;
}

export interface CarrouselContextProps {
  carrouselState: CarrouselState;
  carrouselDispatcher: React.Dispatch<CarrouselAction>;
}

export interface CarrouselContainerProps {
  section?: string;
  subsection: CategoryQueryObject;
}

export interface CarrouselMovePayload {
  distance: number;
  lastItemIndex: number;
  maxReached: boolean;
}

export interface CarrouselResetAction {
  type: "RESET";
}

export interface CarrouselMoveAction {
  type: "MOVE_LEFT" | "MOVE_RIGHT";
  payload: CarrouselMovePayload;
}

export type CarrouselAction = CarrouselMoveAction | CarrouselResetAction;

export interface CarrouselState {
  distance: number;
  lastItemIndex: number;
  maxReached: boolean;
}
