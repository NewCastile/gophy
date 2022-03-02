import { Skeleton, Stack } from "@chakra-ui/react";

export default function ScrollSkeleton() {
  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={"50px"}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((v, idx) => {
        return (
          <Skeleton
            startColor="blackAlpha.500"
            endColor="whiteAlpha.500"
            key={idx}
            height={"300px"}
            width={"300px"}
          ></Skeleton>
        );
      })}
    </Stack>
  );
}
