import { Box, Button, Stack } from "@chakra-ui/react";
import { Key } from "react";
import useCategories from "../hooks/useCategories";
import { CategoryQueryObject } from "../types/category";
import CarrouselContainer from "./Gif/Carrousel/CarrouselContainer";
import CarrouselSkeleton from "./Gif/Carrousel/CarrouselSkeleton";
import Visor from "./Visor";

export default function Section({ category }: { category?: string }) {
  const [
    {
      categories: categoriesData,
      displayed: displayedCategoriesData,
      isLoading: categoriesIsLoading,
      isLoadingNextPage: categoriesIsLoadingNextPage,
      isRefetching: categoriesRetryFetching,
      error: categoriesError,
      page: categoriesCurrentPage,
    },
    SectionDispatcher,
  ] = useCategories(2, category);
  if (categoriesIsLoading || categoriesRetryFetching) {
    return (
      <Stack width={"100%"} spacing={"50px"}>
        {[1, 2].map((_, idx) => {
          return <CarrouselSkeleton key={idx} />;
        })}
      </Stack>
    );
  }
  if (categoriesError) {
    return (
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={"20px"}
      >
        <Box>An error has ocurred: </Box>
        <Box>{decodeURI(categoriesError)}</Box>
        <Button
          variant={"gradient"}
          width={"max-content"}
          onClick={() => {
            SectionDispatcher({ type: "RETRY" });
          }}
        >
          Try again?
        </Button>
      </Stack>
    );
  }
  if (!categoriesData || !displayedCategoriesData) return null;
  return (
    <>
      <Stack
        spacing={"50px"}
        width={"100%"}
        height={"max-content"}
        minHeight={"80vh"}
      >
        {displayedCategoriesData
          .map(
            (
              displayedCategory: CategoryQueryObject,
              displayedCategoryIdx: Key
            ) => {
              return (
                <CarrouselContainer
                  key={displayedCategoryIdx}
                  section={category}
                  subsection={displayedCategory}
                />
              );
            }
          )
          .concat(
            <Box
              key={displayedCategoriesData.length}
              className="spacer"
              height={"2em"}
            />
          )}
      </Stack>
      {categoriesIsLoadingNextPage ? (
        <Box margin={"30px"}>Loading...</Box>
      ) : (
        <Visor
          sectionCurrentPage={categoriesCurrentPage}
          dispatcher={SectionDispatcher}
        ></Visor>
      )}
    </>
  );
}
