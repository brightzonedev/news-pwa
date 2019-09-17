import React from "react";
import { Box, Flex, Text } from "@chakra-ui/core";

import Nav from "../Nav/Nav";
import { background } from "../../LoadingScreen";
import Menu from "../Menu/Menu";

const Popular = () => (
  <Flex direction="column">
    <Nav />
    <Box h="100vh" {...background}>
      <Menu />
      <Text color="#fff">Coming soon...</Text>
    </Box>
  </Flex>
);
export default Popular;
