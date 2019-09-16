import React, { Fragment, useState, useEffect, useContext } from "react";
import { shape } from "prop-types";
import { withRouter } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/core";

import Channels from "../../config/channels";
import AppShell from "../AppShell/AppShell";
import { FollowingContext } from "../../FollowingProvider";
import Loader from "../../components/Loader/Loader";
import { StoreContext } from "../../context/Store";

// Read related comments in Explore.js
const Following = ({ history, match }) => {
  // followingChannels comes from network request
  const followingChannels = useContext(FollowingContext);
  const [intersection, setIntersection] = useState([]);
  const appState = useContext(StoreContext);
  // cachedFollowingChannels is only client side for optimistic UI and offline use
  const cachedFollowingChannels = appState.followingChannels;
  // allFollowingChannels is cachedFollowingChannels & followingChannels merged
  const allFollowingChannels = [
    ...followingChannels.followingChannels,
    ...cachedFollowingChannels
  ];

  const onChannelClick = channel => {
    history.push({
      pathname: `${match.url}/${channel.link}`,
      state: {
        channel: channel.name,
        following: !!followingChannels.find(i => i === channel.name),
        background: channel.background
      }
    });
  };

  /*  useEffect(() => {
    if (followingChannels.length) {
      console.log("followingChannels", followingChannels);
      // Compare hardcoded channel names with the ones user follows and filter following (matching) channels
      // ES6 way for future reference: Channels.filter(channel => following.includes(channel.name))
      const common = Channels.filter(
        channel => followingChannels.indexOf(channel.name) !== -1
      );
      setIntersection(common);
    }
  }, [followingChannels]);

  useEffect(() => {
    if (cachedFollowingChannels.length) {
      console.log("cachedFollowingChannels: ", cachedFollowingChannels);
      const common = Channels.filter(
        channel => cachedFollowingChannels.indexOf(channel.name) !== -1
      );
      setIntersection(common);
    }
  }, [cachedFollowingChannels]); */


  useEffect(() => {
    if (allFollowingChannels.length) {
      const common = Channels.filter(
        channel => allFollowingChannels.indexOf(channel.name) !== -1
      );
      setIntersection(common);
    }
  }, [followingChannels, cachedFollowingChannels]);

  return (
    <Fragment>
      <AppShell />

      <Flex justify={intersection.length ? "flex-start" : "center"} wrap="wrap">
        {followingChannels.loading && <Loader my={10} color="rgb(230, 82, 138)" />}

        {!followingChannels.loading && !allFollowingChannels.length && (
          <Text color="#000" my={10}>
            You are not following any channels yet.
          </Text>
        )}

        {intersection &&
          intersection.map((channel, index) => (
            <Box
              key={index}
              flexBasis="50%"
              pos="relative"
              onClick={() => onChannelClick(channel)}
            >
              {console.log(channel)}
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
            </Box>
          ))}
      </Flex>
    </Fragment>
  );
};

Following.propTypes = {
  history: shape({}).isRequired,
  match: shape({}).isRequired
};

export default withRouter(Following);
