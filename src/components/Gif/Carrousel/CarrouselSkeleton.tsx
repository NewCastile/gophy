import { Stack, Skeleton } from "@chakra-ui/react";

export default function CarrouselSkeleton() {
  return (
    <Stack
      direction={"column"}
      align={"center"}
      alignSelf={"center"}
      minWidth={"700px"}
      width={"50%"}
      height={"200px"}
      spacing={"15px"}
    >
      <Skeleton
        startColor="blackAlpha.500"
        endColor="whiteAlpha.500"
        width={"10ch"}
        height={"60px"}
      ></Skeleton>
      <Skeleton
        startColor="blackAlpha.500"
        endColor="whiteAlpha.500"
        width={"100%"}
        height={"100px"}
      ></Skeleton>
    </Stack>
  );
}
