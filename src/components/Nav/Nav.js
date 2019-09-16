import React from "react";
import { func, string } from "prop-types";
import { Flex, Box, Text } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { space } from "styled-system";
import { Icon } from "@chakra-ui/core";

import Logo from "./Icon_navbar_Logo.png";

const StyledImg = styled("img")(space);

const Nav = ({ button, title, handleNavClick }) => {
  return (
    <Flex
      bg="rgb(161, 117, 211)"
      justify={button ? "space-between" : "center"}
      align="flex-end"
      h={53}
    >
      {button && (
        <Icon
          name={button}
          color="#fff"
          size="2.2rem"
          onClick={() => handleNavClick(button)}
        />
      )}

      {!!title ? (
        <Text color="#fff" fontWeight="bold" textTransform="uppercase" mb={2}>
          {title} channel
        </Text>
      ) : (
        <Box>
          <StyledImg src={Logo} mb={2} />
        </Box>
      )}

      {/* The following line ensures correct alignment of all items inside
      navigation since we never have an item on the right side of it*/}
      {button && <Icon name={button} size="2.2rem" opacity={0} />}
    </Flex>
  );
};

Nav.defaultProps = {
  button: "",
  title: "",
  handleNavClick: null
};

Nav.propTypes = {
  button: string,
  title: string,
  handleNavClick: func
};

export default Nav;
