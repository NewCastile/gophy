import useGifs from "../../../hooks/useGifs";
import { Stack, Text, Box, Link } from "@chakra-ui/react";
import Carrousel from ".";
import { CarrouselContainerProps } from "../../../types/carrousel";
import { Link as ReachLink } from "react-router-dom";
import CarrouselSkeleton from "./CarrouselSkeleton";
import { CarrouselProvider } from "../../../hooks/useCarrouselContext";

export default function CarrouselContainer({
  section,
  subsection,
}: CarrouselContainerProps) {
  const [{ data, isLoading, error }] = useGifs(subsection.url, 20);
  if (isLoading) return <CarrouselSkeleton />;
  if (error) return <Box>Error while fetching data</Box>;
  if (!data) return null;
  return (
    <Stack
      width={"100%"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Link
        as={ReachLink}
        to={`/sections/${
          section
            ? section.concat(`/${subsection.name_encoded}`)
            : subsection.name_encoded
        }`}
      >
        <Stack>
          <Text margin={0}>
            {"".concat(
              subsection.name[0].toUpperCase(),
              subsection.name.slice(1)
            )}
          </Text>
          <Box
            padding={"2px"}
            background={
              "linear-gradient(90deg, #f5d1b1 41%, #fcd3ad 50%, #f5a09d 100%)"
            }
          ></Box>
        </Stack>
      </Link>
      <CarrouselProvider>
        <Carrousel gifs={data} />
      </CarrouselProvider>
    </Stack>
  );
}
