import { Box, BoxProps } from "@chakra-ui/react";
import { ChakraComponent } from "@chakra-ui/react";

type DivComponent = ChakraComponent<"div", {}>;

const CarrouselButton = ((props: BoxProps) => (
  <Box
    display={"flex"}
    direction={"column"}
    justifyContent={"center"}
    alignItems={"center"}
    width={"50px"}
    color={"white"}
    height={"100%"}
    px={"5px"}
    position={"absolute"}
    cursor={"pointer"}
    zIndex={"1"}
    top={"0"}
    {...props}
  />
)) as DivComponent;

export default CarrouselButton;
