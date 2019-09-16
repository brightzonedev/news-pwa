import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Flex } from "@chakra-ui/core";

import { AuthContext } from "./AuthProvider";
import Loader from "../components/Loader/Loader";
import bgImage from "../images/bg.png";
import splashLogo from "../images/splash_logo.png";
import { app } from "../utils/firebase";

const LoadingScreen = () => {
  const user = useContext(AuthContext);

  const background = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    bgPos: "center",
    backgroundRepeat: "no-repeat"
  };

  useEffect(user => {
    if (!user) {
      app.auth().signInAnonymously();
    }
  }, []);

  if (user) {
    return <Redirect to="/following" />;
  }

  return (
    <Flex
      flexDir="column"
      align="center"
      justify="space-evenly"
      h="100vh"
      {...background}
    >
      <img src={splashLogo} width="auto" />
      <Loader />
    </Flex>
  );
};

export default LoadingScreen;
