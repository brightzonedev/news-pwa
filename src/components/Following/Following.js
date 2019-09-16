import React, { Fragment, useState, useEffect, useContext } from "react";
import { shape } from "prop-types";
import { withRouter } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/core";

import Channels from "../../config/channels";
import AppShell from "../AppShell/AppShell";
import { FollowingContext } from "../../containers/FollowingProvider";

// Read related comments in Explore.js
const Following = ({ history, match }) => {
  const followingChannels = useContext(FollowingContext);
  const [intersection, setIntersection] = useState([]);

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

  useEffect(() => {
    if (followingChannels) {
      console.log(followingChannels);
    }
    // Compare hardcoded channel names with the ones user follows and filter following (matching) channels
    // ES6 way for future reference: Channels.filter(channel => following.includes(channel.name))
    const common = Channels.filter(
      channel => followingChannels.indexOf(channel.name) !== -1
    );
    setIntersection(common);
  }, [followingChannels]);

  return (
    <Fragment>
      <AppShell />

      <Flex justify={intersection.length ? "flex-start" : "center"} wrap="wrap">
        {/*{(!followingList.length && !intersection.length) && (*/}
        {/*  <Text color="#fff">You are not following any channels yet.</Text>*/}
        {/*)}*/}
        {/*{(!!followingList && !intersection.length) && (*/}
        {/*  <Loader color="rgb(230, 82, 138)" />*/}
        {/*)}*/}

        {!!intersection &&
          intersection.map((channel, index) => (
            <Box
              key={index}
              flexBasis="50%"
              pos="relative"
              onClick={() => onChannelClick(channel)}
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
