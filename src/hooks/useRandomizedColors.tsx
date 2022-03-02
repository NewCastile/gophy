import { useMemo } from "react";
import { colors } from "../theme";

export default function useRandomizedColors(dependencies: any[]) {
  return useMemo(() => {
    const arr: string[] = [];
    for (let index = 0; index < colors.length; index++) {
      const random = Math.ceil(Math.random() * (colors.length - 1));
      const randomColor = colors[random];
      arr.push(randomColor);
    }
    return arr;
  }, [...dependencies]);
}
