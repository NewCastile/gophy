import { Box } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

export default function ScrollSectionTrace({
  subsection,
  section,
}: {
  subsection: string;
  section?: string;
}) {
  return section ? (
    <>
      <ReactLink to={`/sections/${section}`}>
        {"".concat(section[0].toUpperCase(), section.slice(1))}
      </ReactLink>
      <Box>{" > "}</Box>
      <Box>{"".concat(subsection[0].toUpperCase(), subsection.slice(1))}</Box>
    </>
  ) : (
    <Box>{"".concat(subsection[0].toUpperCase(), subsection.slice(1))}</Box>
  );
}
