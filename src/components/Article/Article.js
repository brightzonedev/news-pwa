import React, { Fragment } from "react";
import { shape, string } from "prop-types";
import { Box, Flex, Text, Badge } from "@chakra-ui/core";

import Source from "../../images/icon_list_source@2x.png";
import Time from "../../images/icon_list_time@2x.png";
import { formatDate } from "../../utils/helpers";

const Article = ({ article, channel }) => {
  const background = {
    backgroundImage: `url(${article.data.imageUrl})`,
    backgroundSize: "cover",
    bgPos: "top left",
    backgroundRepeat: "no-repeat"
  };

  return (
    <Fragment>
      <Flex
        direction="column"
        justify="flex-end"
        minH="300px"
        maxH="400px"
        {...background}
      >
        <Text
          textTransform="uppercase"
          fontSize="1.1rem"
          fontWeight="bold"
          color="#fff"
          mx={5}
          my={4}
        >
          {article.data.headline}
        </Text>
      </Flex>
      <Flex my={5} mx={5} justify="space-between">
        <Flex>
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
        <Badge
          variant="solid"
          variantColor="transparent"
          color="#000"
          borderBottom="2px solid #eee"
          fontSize=".6rem"
        >
          {channel}
        </Badge>
      </Flex>
      <Text fontSize="1rem" mx={5} my={4}>
        {article.data.content}
      </Text>
    </Fragment>
  );
};

Article.propTypes = {
  article: shape({}).isRequired,
  channel: string.isRequired
};

export default Article;
