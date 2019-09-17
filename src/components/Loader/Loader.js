import React from "react";
import { number, string } from "prop-types";
import { Flex, Spinner } from "@chakra-ui/core";
import ContentLoader from "react-content-loader";

const Loader = ({ color, my, type }) => {
  if (type === "content-loader") {
    return (
      <Flex direction="column" justify="center">
        <ContentLoader
          height={750}
          width={500}
          speed={3}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="3" y="3" rx="10" ry="10" width="494" height="180" />
          <rect x="6" y="220" rx="0" ry="0" width="488" height="100" />
          <rect x="6" y="350" rx="0" ry="0" width="488" height="100" />
          <rect x="6" y="480" rx="0" ry="0" width="488" height="100" />
          <rect x="6" y="610" rx="0" ry="0" width="488" height="100" />
        </ContentLoader>
      </Flex>
    );
  }
  return (
    <Spinner color={color} my={my} thickness="1px" size="md" speed="0.40s" />
  );
};
Loader.defaultProps = {
  color: "rgb(255, 255, 255)",
  my: 0,
  type: ""
};

Loader.propTypes = {
  color: string,
  my: number,
  type: string
};

export default Loader;
