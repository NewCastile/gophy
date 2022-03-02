import { createContext, ReactElement, useContext, useReducer } from "react";
import { CarrouselContextProps, CarrouselState } from "../types/carrousel";
import CarrouselReducer from "../components/Gif/Carrousel/CarrouselReducer";

const initialState: CarrouselState = {
  distance: 0,
  lastItemIndex: 0,
  maxReached: false,
};

const CarrouselContext = createContext<CarrouselContextProps>(
  {} as CarrouselContextProps
);

export function CarrouselProvider({ children }: { children: ReactElement }) {
  const [carrouselState, carrouselDispatcher] = useReducer(
    CarrouselReducer,
    initialState
  );

  return (
    <CarrouselContext.Provider value={{ carrouselState, carrouselDispatcher }}>
      {children}
    </CarrouselContext.Provider>
  );
}

export default function useCarrouselContext() {
  const context = useContext(CarrouselContext);
  if (context === undefined) {
    throw new Error(
      "useCarrouselContext must be used inside a CarrouselProvider"
    );
  }
  return context;
}
