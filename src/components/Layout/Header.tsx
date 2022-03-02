import {
  Link,
  Stack,
  Text,
  Input,
  Button,
  Image,
  Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Link as ReachLink, Redirect } from "react-router-dom";
import AttributionMark from "../../static/giphy-att-marks/Poweredby_100px-Black_VertText.png";

export default function Header() {
  const [search, setSearch] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Stack
      width={{ base: "100%", sm: "100%", md: "80%" }}
      className="header"
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mb={"50px"}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"4em"}
        spacing={"1em"}
      >
        <Link as={ReachLink} to={"/"}>
          <Text lineHeight={"short"} fontSize={"2em"}>
            Gophy
          </Text>
        </Link>
        <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <Image src={AttributionMark} />
        </Stack>
      </Stack>

      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={"20px"}
      >
        <Input
          color={"gray.600"}
          bgColor={"whiteAlpha.900"}
          _focus={{
            border: "1px solid",
            borderColor: "gray.500",
          }}
          variant={"unstyled"}
          ref={inputRef}
          minWidth={"10ch"}
          maxWidth={"60ch"}
          width={"100%"}
          height={"3em"}
          paddingLeft={"2em"}
          placeholder="Let's find what u looking"
        />

        <Button
          width={"10ch"}
          height={"3em"}
          variant={"gradient"}
          onClick={() => {
            if (inputRef.current) {
              setSearch(inputRef.current.value);
            }
          }}
        >
          Search
        </Button>
        {search && inputRef.current ? (
          <Redirect to={`/search/${inputRef.current.value}`} />
        ) : null}
      </Stack>
    </Stack>
  );
}
