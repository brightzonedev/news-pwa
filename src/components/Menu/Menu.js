import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { shape } from "prop-types";
import { Flex, PseudoBox } from "@chakra-ui/core";

import menuItems from "../../config/menuItems";

const Menu = ({ history, match }) => {
  const url = match.url.replace("/", "");

  return (
    <Fragment>
      <Flex my={6} justifyContent="space-around">
        {menuItems.map((tab, index) => (
          <PseudoBox
            as="button"
            key={index}
            borderRadius={20}
            color={url === tab.link ? "#fff" : "#a0aec0"}
            bg="transparent"
            border={url === tab.link ? "1px solid rgb(230, 82, 138)" : ""}
            outline="0"
            fontSize=".85rem"
            fontWeight="bold"
            textAlign="center"
            py={2}
            px={5}
            onClick={() => history.push(`/${tab.link}`)}
          >
            {tab.name}
          </PseudoBox>
        ))}
      </Flex>
    </Fragment>
  );
};

Menu.propTypes = {
  history: shape({}).isRequired,
  match: shape({}).isRequired
};

export default withRouter(Menu);
