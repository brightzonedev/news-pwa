import React, { Fragment, useContext, useState } from "react";
import { shape } from "prop-types";
import { useToast } from "@chakra-ui/core";

import { AuthContext } from "./AuthProvider";
import { db, arrayField } from "./utils/firebase";
import Articles from "./components/Articles/Articles";
import Article from "./components/Article/Article";
import Nav from "./components/Nav/Nav";
import { StoreContext } from "./context/Store";

const Channel = ({ location, history }) => {
  const [article, setArticle] = useState(null);
  const { channel, following } = location.state;
  const [isFollowing, setIsFollowing] = useState(following);
  const user = useContext(AuthContext);
  const appState = useContext(StoreContext);
  const toast = useToast();
  
  console.log(appState)
  const handleArticleClick = article => {
    setArticle(article);
  };

  const handleNavClick = button => {
    if (button === "chevron-left") {
      history.goBack();
    }
    if (button === "small-close") {
      setArticle("");
    }
  };

  const handleFollow = () => {
    setIsFollowing(true);
    toast({
      description: "You followed this channel.",
      status: "success",
      duration: 3000,
      isClosable: true
    });

    appState.followChannel(channel);
    const docRef = db.collection("users").doc(user.uid);
    docRef.update({
      following: arrayField.FieldValue.arrayUnion(channel)
    });
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
    toast({
      description: "You unfollowed this channel.",
      status: "success",
      duration: 3000,
      isClosable: true
    });
    const docRef = db.collection("users").doc(user.uid);
    docRef.update({
      following: arrayField.FieldValue.arrayRemove(channel)
    });
  };

  if (!!article) {
    return (
      <Fragment>
        <Nav
          button="small-close"
          title={channel}
          handleNavClick={handleNavClick}
        />
        <Article article={article} channel={channel} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Nav button="chevron-left" handleNavClick={handleNavClick} />
      <Articles
        handleArticleClick={handleArticleClick}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
        location={location}
        history={history}
        isFollowing={isFollowing}
      />
    </Fragment>
  );
};

Channel.propTypes = {
  location: shape({}).isRequired,
  history: shape({}).isRequired
};

export default Channel;
