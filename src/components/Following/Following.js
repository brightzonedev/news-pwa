import React, { useState, useEffect, useContext } from "react";
import { shape } from "prop-types";
import { withRouter } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/core";

import Channels from "../../config/channels";
import Loader from "../../components/Loader/Loader";
import { StoreContext } from "../../context/Store";
import { background } from "../../LoadingScreen";
import Nav from "../Nav/Nav";
import Menu from "../Menu/Menu";

const Following = ({ history, match }) => {
  const [intersection, setIntersection] = useState([]);
  const { allFollowingChannels, followingChannels, loading } = useContext(
    StoreContext
  );

  const onChannelClick = channel => {
    history.push({
      pathname: `${match.url}/${channel.link}`,
      state: {
        channel: channel.name,
        background: channel.background
      }
    });
  };

  useEffect(() => {
    if (followingChannels.length) {
      const common = Channels.filter(
        channel => followingChannels.indexOf(channel.name) !== -1
      );
      setIntersection(common);
    }
  }, [followingChannels]);

  useEffect(() => {
    if (allFollowingChannels.length) {
      const common = Channels.filter(
        channel => allFollowingChannels.indexOf(channel.name) !== -1
      );
      setIntersection(common);
    }
  }, [allFollowingChannels]);

  return (
    <Flex direction="column">
      <Nav />
      <Box h="100vh" {...background}>
        <Menu />
        <Flex
          justify={intersection.length ? "flex-start" : "center"}
          wrap="wrap"
        >
          {loading && <Loader my={10} />}

          {!loading &&
            !followingChannels.length &&
            !allFollowingChannels.length && (
              <Text color="#fff" my={10}>
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
      </Box>
    </Flex>
  );
};

Following.propTypes = {
  history: shape({}).isRequired,
  match: shape({}).isRequired
};

export default withRouter(Following);
