import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { SectionParams } from "../../types/route";
import { Link as ReachLink, useParams } from "react-router-dom";
import Section from "../Section";

export default function SectionScreen() {
  const { section } = useParams<SectionParams>();
  return (
    <Stack direction={"column"} width={"100%"} spacing={"40px"}>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={"30px"}
      >
        <Link as={ReachLink} to={"entertaiment"}>
          <Stack>
            <Text>Entertaiment</Text>
            <Box
              padding={"2px"}
              background={
                "linear-gradient(90deg, #f5d1b1 41%, #fcd3ad 50%, #f5a09d 100%)"
              }
            ></Box>
          </Stack>
        </Link>
        <Link as={ReachLink} to={"sports"}>
          <Stack>
            <Text>Sports</Text>
            <Box
              padding={"2px"}
              background={
                "linear-gradient(90deg, #f5d1b1 41%, #fcd3ad 50%, #f5a09d 100%)"
              }
            ></Box>
          </Stack>
        </Link>
        <Link as={ReachLink} to={"reactions"}>
          <Stack>
            <Text>Reactions</Text>
            <Box
              padding={"2px"}
              background={
                "linear-gradient(90deg, #f5d1b1 41%, #fcd3ad 50%, #f5a09d 100%)"
              }
            ></Box>
          </Stack>
        </Link>
      </Stack>
      <Section category={`${section}`}></Section>
    </Stack>
  );
}
