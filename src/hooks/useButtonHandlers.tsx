import { RefObject } from "react";
import useCarrouselContext from "./useCarrouselContext";

export default function useButtonHandlers(
  widths: number[],
  currWidth: number,
  ref: RefObject<HTMLDivElement>,
  limit: number
) {
  const { carrouselState, carrouselDispatcher } = useCarrouselContext();
  const { distance, lastItemIndex } = carrouselState;

  const leftButtonOnClickHandler = () => {
    const invertedWidths = invertArray(widths.slice(0, lastItemIndex + 1));
    const shownSectionMeasures: number[] = reduceMeasures(invertedWidths, 0);

    const widerThanWrapper = (width: number) => width > currWidth;
    const lastShownIdx = shownSectionMeasures.findIndex(widerThanWrapper);
    const nextSectionMeasures = reduceMeasures(
      invertedWidths.slice(lastShownIdx)
    );
    const nextLastShownIdx = nextSectionMeasures.findIndex(widerThanWrapper);

    const dist =
      nextLastShownIdx === -1
        ? distance
        : shownSectionMeasures[lastShownIdx - 1];
    const newDistance = Math.abs(distance - dist);
    carrouselDispatcher({
      type: "MOVE_LEFT",
      payload: {
        distance: newDistance,
        lastItemIndex:
          nextLastShownIdx === -1 ? 0 : Math.abs(lastItemIndex - lastShownIdx),
        maxReached: false,
      },
    });
  };

  const rightButtonOnClickHandler = () => {
    const carrouselWidth = ref.current?.clientWidth as number;
    const shownSectionMeasures: number[] = reduceMeasures(
      widths,
      lastItemIndex
    );
    const widerThanWrapper = (width: number) => width > currWidth;
    const lastShownIdx = shownSectionMeasures.findIndex(widerThanWrapper);
    const nextSectionMeasures = reduceMeasures(
      widths.slice(lastItemIndex + lastShownIdx)
    );
    const nextLastShownIdx = nextSectionMeasures.findIndex(widerThanWrapper);
    const rest =
      nextLastShownIdx === -1
        ? currWidth -
          (carrouselWidth - distance - shownSectionMeasures[lastShownIdx - 1])
        : 0;
    const newIndex = lastItemIndex + lastShownIdx;
    const dist =
      lastShownIdx === -1
        ? shownSectionMeasures[shownSectionMeasures.length - 1]
        : shownSectionMeasures[lastShownIdx - 1] - rest;
    const maxReachedBool = newIndex === limit || rest ? true : false;

    carrouselDispatcher({
      type: "MOVE_RIGHT",
      payload: {
        distance: distance + dist,
        lastItemIndex: maxReachedBool ? limit : lastItemIndex + lastShownIdx,
        maxReached: maxReachedBool,
      },
    });
  };

  return [leftButtonOnClickHandler, rightButtonOnClickHandler] as const;
}

const reduceMeasures = (arr: number[], initialIdx: number = 0) => {
  return arr.slice(initialIdx).map((measure, measureIdx, arr) => {
    if (measureIdx === 0) return measure;
    return arr.slice(0, measureIdx + 1).reduce((prev, curr) => prev + curr);
  });
};

const invertArray = (arr: number[]) => {
  const newArr: number[] = [];
  arr.forEach((val) => newArr.push(val));
  return newArr.reverse();
};
