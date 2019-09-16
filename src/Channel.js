import React, { Fragment, useContext, useEffect, useState } from "react";
import { shape } from "prop-types";
import { useToast } from "@chakra-ui/core";

import { AuthContext } from "./context/AuthProvider";
import { db, arrayField } from "./utils/firebase";
import Articles from "./components/Articles/Articles";
import Article from "./components/Article/Article";
import Nav from "./components/Nav/Nav";
import { StoreContext } from "./context/Store";
import { FollowingContext } from "./context/FollowingProvider";

const Channel = ({ location, history }) => {
  const [article, setArticle] = useState(null);
  const { channel } = location.state;
  const [isFollowing, setIsFollowing] = useState({
    client: false,
    server: false
  });
  const user = useContext(AuthContext);
  const {
    cachedFollowingChannels,
    followChannel,
    unfollowChannel
  } = useContext(StoreContext);
  const { followingChannels } = useContext(FollowingContext);
  const toast = useToast();

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
    setIsFollowing({ client: true, server: false });
    toast({
      description: "You followed this channel.",
      status: "success",
      duration: 3000,
      isClosable: true
    });

    followChannel(channel);
    const docRef = db.collection("users").doc(user.uid);
    docRef.update({
      following: arrayField.FieldValue.arrayUnion(channel)
    });
  };

  const handleUnfollow = () => {
    setIsFollowing({ client: false, server: false });
    toast({
      description: "You unfollowed this channel.",
      status: "success",
      duration: 3000,
      isClosable: true
    });

    unfollowChannel(channel);
    const docRef = db.collection("users").doc(user.uid);
    docRef.update({
      following: arrayField.FieldValue.arrayRemove(channel)
    });
  };

  useEffect(() => {
    setIsFollowing({
      server: !!followingChannels.find(i => i === channel),
      client: !!cachedFollowingChannels.find(i => i === channel)
    });
  }, []);

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
