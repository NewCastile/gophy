import { CarrouselAction, CarrouselState } from "../../../types/carrousel";

const CarrouselReducer = (
  state: CarrouselState,
  action: CarrouselAction
): CarrouselState => {
  switch (action.type) {
    case "MOVE_LEFT":
      return {
        distance: action.payload.distance,
        lastItemIndex: action.payload.lastItemIndex,
        maxReached: action.payload.maxReached,
      };

    case "MOVE_RIGHT":
      return {
        distance: action.payload.distance,
        lastItemIndex: action.payload.lastItemIndex,
        maxReached: action.payload.maxReached,
      };
    case "RESET":
      return {
        distance: 0,
        lastItemIndex: 0,
        maxReached: false,
      };

    default:
      return state;
  }
};

export default CarrouselReducer;
