import React, { Fragment, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { shape } from "prop-types";
import { Flex, Box, Heading } from "@chakra-ui/core";

import Channels from "../../config/channels";
import { FollowingContext } from "../../FollowingProvider";
import AppShell from "../AppShell/AppShell";

const Explore = ({ match }) => {
  const followingChannels = useContext(FollowingContext);

  return (
    // followingList is array of channels user follows
    // It get generated inside Home.js and gets drilled through here
    // in a real world app I might have tried passing it to state management's store
    // doing that would also allow me to use it inside Channel.js instead of passing it
    // to the history's state. Same for the channel and background.
    // Unless I have to, I generally don't pass anything to the URL's state.

    <Fragment>
      <AppShell />

      <Flex justify="center" wrap="wrap">
        {Channels.map((channel, index) => (
          <Box key={index} flexBasis="50%" pos="relative">
            <Link
              to={{
                pathname: `${match.url}/${channel.link}`,
                state: {
                  channel: channel.name,
                  following: !!followingChannels.followingChannels.find(i => i === channel.name),
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
    </Fragment>
  );
};

Explore.propTypes = {
  match: shape({})
};

export default withRouter(Explore);
