import { Stack } from "@chakra-ui/react";
import Trendings from "../Trendings";
import Section from "../Section";

export default function MainScreen() {
  return (
    <Stack
      direction={"column"}
      justify={"flex-start"}
      align={"center"}
      width={"100%"}
      minHeight={"400px"}
      height={"max-content"}
      spacing={"50px"}
    >
      <Trendings></Trendings>
      <Section></Section>
    </Stack>
  );
}
