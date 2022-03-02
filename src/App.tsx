import { Container, Stack, ChakraProvider } from "@chakra-ui/react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import MainScreen from "./components/Screens/main";
import SectionScreen from "./components/Screens/section";
import ScrollingScreen from "./components/Screens/scrolling";
import "./App.css";
import Header from "./components/Layout/Header";
import theme from "./theme";

function App() {
  return (
    <Container
      maxWidth={"container.xl"}
      centerContent
      className="App"
      fontSize={"2em"}
      fontWeight={"bold"}
    >
      <ChakraProvider theme={theme}>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"80%"}
        >
          <Router>
            <Header />
            <Switch>
              <Route exact path={"/"} component={MainScreen} />
              <Route
                exact
                path={"/sections/:section"}
                component={SectionScreen}
              />
              <Route
                exact
                path={"/sections/:section/:subsection"}
                component={ScrollingScreen}
              />
              <Route
                exact
                path={"/search/:subsection"}
                component={ScrollingScreen}
              />
            </Switch>
          </Router>
        </Stack>
      </ChakraProvider>
    </Container>
  );
}

export default App;
