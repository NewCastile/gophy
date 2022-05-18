import { Box, Image, Stack } from "@chakra-ui/react";
import useGifs from "../../hooks/useGifs";
import Visor from "../Visor";
import useRandomizedColors from "../../hooks/useRandomizedColors";
import ScrollSkeleton from "./ScrollSkeleton";
import ScrollSectionTrace from "./ScrollSectionTrace";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Scroll({
  section,
  subsection,
}: {
  section?: string;
  subsection: string;
}) {

  const url =
    subsection === "trending"
      ? `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`
      : `https://api.giphy.com/v1/gifs/search?q=${subsection}&api_key=${API_KEY}`;
  const [
    { data: gifs, isLoading, error, page: currentPage, isLoadingNextPage },
    dispatch,
  ] = useGifs(
    url,
    5
  );
  const randomizedColors = useRandomizedColors([]);
  if (isLoading) return <ScrollSkeleton />;
  if (error) return <Box>An error has ocurred: {decodeURI(error)}</Box>;
  if (!gifs) return null;
  return (
    <>
      <Stack
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        width={"100%"}
        height={"max-content"}
        minHeight={"100vh"}
        spacing={5}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"max-content"}
        >
          <ScrollSectionTrace subsection={subsection} section={section} />
        </Stack>
        <Stack
          spacing={"50px"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"max-content"}
        >
          {gifs
            .map((gif, gifIdx) => {
              const digit = parseInt(gifIdx.toString().slice(-1));
              const colorIdx =
                digit >= randomizedColors.length
                  ? Math.abs(digit - randomizedColors.length)
                  : digit;
              return (
                <Box key={gifIdx}>
                  <Image
                    fallback={
                      <Box
                        bgColor={randomizedColors[colorIdx]}
                        width={"350px"}
                        height={"350px"}
                      ></Box>
                    }
                    key={gif.id}
                    width={"350px"}
                    height={"350px"}
                    objectFit={"contain"}
                    src={gif.images.original.url}
                  ></Image>
                </Box>
              );
            })
            .concat(
              <Box key={gifs.length} className="spacer" height={"2em"} />
            )}
        </Stack>
        )
      </Stack>
      {isLoadingNextPage ? (
        <Box margin={"30px"}>Loading...</Box>
      ) : (
        <Visor sectionCurrentPage={currentPage} dispatcher={dispatch}></Visor>
      )}
    </>
  );
}
