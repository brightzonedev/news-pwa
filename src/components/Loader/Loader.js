import React from "react";
import { string } from "prop-types";
import { Spinner } from "@chakra-ui/core";

const Loader = ({ color }) => (
  <Spinner color={color} thickness="1px" size="md" speed="0.40s" />
);

Loader.defaultProps = {
  color: "rgb(255, 255, 255)"
};

Loader.propTypes = {
  color: string
};

export default Loader;
