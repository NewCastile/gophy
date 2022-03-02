import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ScrollingParams } from "../../types/route";
import Scroll from "../Scroll";

export default function ScrollingScreen() {
  const { section, subsection } = useParams<ScrollingParams>();
  return (
    <Stack direction={"column"} width={"100%"}>
      <Scroll section={section} subsection={subsection}></Scroll>
    </Stack>
  );
}
