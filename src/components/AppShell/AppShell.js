import React from "react";
import { Box, Flex } from "@chakra-ui/core";

import Nav from "../Nav/Nav";
import Menu from "../Menu/Menu";
import bgImage from "../../images/bg.png";

const background = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  bgPos: "top",
  backgroundRepeat: "no-repeat"
};

const AppShell = () => (
  <Flex direction="column" flex={1}>
    <Nav />
    <Box {...background}>
      <Menu />
    </Box>
  </Flex>
);

export default AppShell;
