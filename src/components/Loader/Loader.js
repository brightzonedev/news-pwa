import React from "react";
import { number, string } from "prop-types";
import { Spinner } from "@chakra-ui/core";

const Loader = ({ color, my }) => (
  <Spinner color={color} my={my} thickness="1px" size="md" speed="0.40s" />
);

Loader.defaultProps = {
  color: "rgb(255, 255, 255)",
  my: 0
};

Loader.propTypes = {
  color: string,
  my: number
};

export default Loader;
