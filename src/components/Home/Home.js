import React, { Fragment, useState, useContext, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/core";

import bgImage from "../../images/bg.png";
import Menu from "../Menu/Menu";
import { AuthContext } from "../../containers/AuthProvider";
import Nav from "../Nav/Nav";
import { db } from "../../utils/firebase";

const background = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  bgPos: "top",
  backgroundRepeat: "no-repeat"
};

const Home = () => {
  const user = useContext(AuthContext);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const docRef = db.collection("users").doc(user.uid);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data().following;
          setFollowingList(data);
        } else {
          docRef.set({
            following: []
          });
        }
      })
      .catch(e => {
        console.log("Error getting document:", e);
      });
  }, []);

  return (
    <Fragment>
      <Flex direction="column">
        <Nav />
        <Box h="100vh" {...background}>
          <Menu followingList={followingList} />
        </Box>
      </Flex>
    </Fragment>
  );
};

export default Home;
