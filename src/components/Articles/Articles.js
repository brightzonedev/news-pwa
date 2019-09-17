import React, { Fragment } from "react";
import { arrayOf, bool, func } from "prop-types";
import { Stack, Flex, Box, Button, Text, Heading } from "@chakra-ui/core";

import { formatDate } from "../../utils/helpers";
import Source from "../../images/icon_list_source@2x.png";
import Time from "../../images/icon_list_time@2x.png";
import { shape } from "prop-types";

const Articles = ({
  articles,
  handleArticleClick,
  handleFollow,
  handleUnfollow,
  location,
  isFollowing
}) => {
  const { channel } = location.state;

  const background = {
    backgroundImage: `url(${location.state.background})`,
    backgroundSize: "cover",
    bgPos: "top left",
    backgroundRepeat: "no-repeat"
  };

  return (
    <Fragment>
      <Flex
        direction="column"
        justify="space-evenly"
        align="center"
        h="200px"
        {...background}
      >
        <Heading
          textTransform="uppercase"
          fontSize="1.4rem"
          fontWeight="bold"
          color="#fff"
        >
          {channel} channel
        </Heading>
        {!isFollowing && (
          <Button
            color="rgb(230, 82, 138)"
            fontSize=".8rem"
            rounded="20px"
            onClick={handleFollow}
          >
            Follow
          </Button>
        )}
        {isFollowing && (
          <Button
            color="#fff"
            bg="rgb(230, 82, 138)"
            fontSize=".8rem"
            rounded="20px"
            onClick={handleUnfollow}
          >
            Following
          </Button>
        )}
        <Text fontSize=".6rem" color="#fff">
          20 Followers
        </Text>
      </Flex>

      {/* TODO: Add no content available if no articles found */}

      {articles &&
        articles.map((article, index) => (
          <Stack
            key={index}
            spacing={8}
            borderBottom="0.5px solid #eee"
            onClick={() => handleArticleClick(article)}
          >
            <Text mx={5} my={4} fontWeight="bold">
              {article.data.headline}
            </Text>
            <Flex marginBottom={5} mx={5}>
              <Flex align="center">
                <Box width={2}>
                  <img src={Source} width="100%" />
                </Box>
                <Text mx={2} fontSize=".6rem">
                  {article.data.source}
                </Text>
              </Flex>

              <Flex mx={2} align="center">
                <Box width={3}>
                  <img src={Time} width="100%" />
                </Box>
                <Text mx={2} fontSize=".6rem">
                  {formatDate(article.data.timestamp.seconds).toString()}
                </Text>
              </Flex>
            </Flex>
          </Stack>
        ))}
    </Fragment>
  );
};

Articles.defaultProps = {
  articles: []
};

Articles.propTypes = {
  articles: arrayOf(shape({})),
  handleArticleClick: func.isRequired,
  handleFollow: func.isRequired,
  handleUnfollow: func.isRequired,
  location: shape({}).isRequired,
  history: shape({}).isRequired,
  isFollowing: bool.isRequired
};

export default Articles;
