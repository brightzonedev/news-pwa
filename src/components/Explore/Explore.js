import React from "react";
import { withRouter, Link } from "react-router-dom";
import { shape } from "prop-types";
import { Flex, Box, Heading } from "@chakra-ui/core";

import Channels from "../../config/channels";
import Nav from "../Nav/Nav";
import { background } from "../../LoadingScreen";
import Menu from "../Menu/Menu";

const Explore = ({ match }) => (
  // Unless I have to, I generally don't pass anything to the URL's state.
  // This time it is done for the sake of simplicity. :)

  <Flex direction="column">
    <Nav />
    <Box h="100vh" {...background}>
      <Menu />
      <Flex justify="center" wrap="wrap">
        {Channels.map((channel, index) => (
          <Box key={index} flexBasis="50%" pos="relative">
            <Link
              to={{
                pathname: `${match.url}/${channel.link}`,
                state: {
                  channel: channel.name,
                  background: channel.background
                }
              }}
            >
              <img src={channel.thumbnail} alt={channel.name} width="100%" />
              <Heading
                as="h3"
                color="#fff"
                fontSize=".85rem"
                fontWeight="lighter"
                textTransform="uppercase"
                pos="absolute"
                bottom={3}
                left={5}
              >
                {channel.name}
              </Heading>
            </Link>
          </Box>
        ))}
      </Flex>
    </Box>
  </Flex>
);

Explore.propTypes = {
  match: shape({})
};

export default withRouter(Explore);
