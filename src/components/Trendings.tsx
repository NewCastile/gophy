import { CategoryQueryObject } from "../types/category";
import CarrouselContainer from "./Gif/Carrousel/CarrouselContainer";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Trendings() {
  const trendingsQueryObject: CategoryQueryObject = {
    name: "trending",
    name_encoded: "trending",
    url: `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`,
  };
  return (
    <CarrouselContainer section="trending" subsection={trendingsQueryObject}></CarrouselContainer>
  );
}
