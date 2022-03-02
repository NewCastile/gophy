import { Box, Image, Stack } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { CarrouselProps } from "../../../types/carrousel";
import CarrouselButton from "./CarrouselButton";
import useResizeObserver from "../../../hooks/useResizeObserver";
import useButtonHandlers from "../../../hooks/useButtonHandlers";
import useCarrouselContext from "../../../hooks/useCarrouselContext";
import useRandomizedColors from "../../../hooks/useRandomizedColors";

export default function Carrousel({ gifs, spacing = 15 }: CarrouselProps) {
  const carrouselRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperCurrentWidth = useResizeObserver(wrapperRef);
  const wrapperPrevWidth = useRef<number>(0);
  const { carrouselState, carrouselDispatcher } = useCarrouselContext();
  const { lastItemIndex, maxReached, distance } = carrouselState;
  const measures: number[] = gifs.map(
    (gif) => parseInt(gif.images.fixed_height_small.width) + spacing
  );
  const randomizedColors = useRandomizedColors([]);
  const [left, right] = useButtonHandlers(
    measures,
    wrapperCurrentWidth,
    carrouselRef,
    gifs.length - 1
  );

  const animationControls = useAnimation();

  useEffect(() => {
    if (!lastItemIndex) {
      //
    } else if (lastItemIndex) {
      if (maxReached) {
        const rest = Math.abs(wrapperPrevWidth.current - wrapperCurrentWidth);
        if (wrapperCurrentWidth > wrapperPrevWidth.current) {
          carrouselDispatcher({
            type: "MOVE_RIGHT",
            payload: { distance: distance - rest, lastItemIndex, maxReached },
          });
        }
        if (wrapperCurrentWidth < wrapperPrevWidth.current) {
          carrouselDispatcher({
            type: "MOVE_LEFT",
            payload: { distance: distance + rest, lastItemIndex, maxReached },
          });
        }
      } else if (!maxReached) {
        if (wrapperCurrentWidth > wrapperPrevWidth.current) {
          carrouselDispatcher({
            type: "RESET",
          });
        }
      }
    }
    wrapperPrevWidth.current = wrapperCurrentWidth;
  }, [maxReached, wrapperCurrentWidth, lastItemIndex]);

  useEffect(() => {
    animationControls.start({
      x: `${-distance}px`,
      transition: { ease: "easeOut", duration: 0.5 },
    });
  }, [distance, lastItemIndex, maxReached, gifs]);

  if (!gifs) return null;

  return (
    <Stack
      ref={wrapperRef}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      maxWidth={"700px"}
      width={"100%"}
      overflow={"hidden"}
      position={"relative"}
      spacing={"0px"}
    >
      {distance === 0 ? null : (
        <CarrouselButton
          background={
            "linear-gradient(90deg, rgba(0,0,0,0.7185807428440126) 41%, rgba(255,255,255,0) 100%, rgba(255,255,255,0) 100%)"
          }
          left={"0"}
          onClick={() => {
            left();
          }}
        >
          {"<"}
        </CarrouselButton>
      )}
      {maxReached ? null : (
        <CarrouselButton
          background={
            "linear-gradient(-90deg, rgba(0,0,0,0.7185807428440126) 41%, rgba(255,255,255,0) 100%, rgba(255,255,255,0) 100%)"
          }
          right={"0"}
          onClick={() => {
            right();
            // update wrapper previous width if resizing in the middle of the carrousel
            if (
              lastItemIndex < gifs.length - 1 &&
              wrapperPrevWidth.current !== wrapperCurrentWidth
            ) {
              wrapperPrevWidth.current = wrapperCurrentWidth;
            }
          }}
        >
          {">"}
        </CarrouselButton>
      )}
      <MotionStack
        direction="row"
        alignSelf="flex-start"
        justifyContent="flex-start"
        ref={carrouselRef}
        spacing={`${spacing}px`}
        animate={animationControls}
      >
        {gifs.map((gif, gifIdx) => {
          const digit = parseInt(gifIdx.toString().slice(-1));
          const colorIdx =
            digit > randomizedColors.length
              ? Math.abs(digit - randomizedColors.length)
              : digit;
          return (
            <Box
              key={gifIdx}
              minWidth={gif.images.fixed_height_small.width}
              height={gif.images.fixed_height_small.height}
            >
              <Image
                objectFit={"contain"}
                fallback={
                  <Box
                    bgColor={randomizedColors[colorIdx]}
                    minWidth={gif.images.fixed_height_small.width}
                    height={gif.images.fixed_height_small.height}
                  ></Box>
                }
                key={gif.id}
                width={gif.images.fixed_height_small.width}
                height={gif.images.fixed_height_small.height}
                src={gif.images.fixed_height_small.url}
              ></Image>
            </Box>
          );
        })}
      </MotionStack>
    </Stack>
  );
}

const MotionStack = motion(Stack);
