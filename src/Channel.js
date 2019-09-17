import React, { Fragment, lazy, Suspense, useContext, useEffect, useState } from "react";
import { shape } from "prop-types";
import { useToast } from "@chakra-ui/core";

import { AuthContext } from "./context/AuthProvider";
import { db, arrayField } from "./utils/firebase";
// import Articles from "./components/Articles/Articles";
import Article from "./components/Article/Article";
import Nav from "./components/Nav/Nav";
import { StoreContext } from "./context/Store";

const Articles = lazy(() => import('./components/Articles/Articles'));

const Channel = ({ location, history }) => {
  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const { channel } = location.state;
  const [isFollowing, setIsFollowing] = useState(false);
  const user = useContext(AuthContext);
  const { followingChannels, followChannel, unfollowChannel } = useContext(
    StoreContext
  );
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
    // Optimistic UI here
    setIsFollowing(true);
    toast({
      description: "You followed this channel.",
      status: "success",
      duration: 3000,
      isClosable: true
    });
    followChannel(channel, followingChannels);

    // Actual update request here
    const docRef = db.collection("users").doc(user.uid);
    docRef.update({
      following: arrayField.FieldValue.arrayUnion(channel)
    });
  };

  const handleUnfollow = () => {
    // Optimistic UI here
    setIsFollowing(false);
    toast({
      description: "You unfollowed this channel.",
      status: "success",
      duration: 3000,
      isClosable: true
    });
    unfollowChannel(channel);

    // Actual update request here
    const docRef = db.collection("users").doc(user.uid);
    docRef.update({
      following: arrayField.FieldValue.arrayRemove(channel)
    });
  };

  const addArticle = data => {
    setArticles(articles => articles.concat(data));
  };

  useEffect(() => {
    setIsFollowing(!!followingChannels.find(i => i === channel));
  }, [channel, followingChannels]);

  useEffect(() => {
    // Check in realtime for any article changes like add or remove
    db.collection("articles")
      .where("channel", "==", channel)
      .onSnapshot({ includeMetadataChanges: true }, snapshot => {
        snapshot.docChanges().forEach(change => {
          let data = change.doc.data();
          const id = change.doc.id;
          data = { data, id };
          if (change.type === "added") {
            addArticle(data);
          }
          if (change.type === "removed") {
            // TODO: create remove function
          }

          // The following line can be used for advanced and more optimized cache management
          // const source = snapshot.metadata.fromCache ? "local cache" : "server";
          // console.log("Data came from " + source);
        });
      });
  }, [channel]);

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
      <Suspense fallback={<div>Loading...</div>}>
        <Articles
          articles={articles}
          handleArticleClick={handleArticleClick}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          location={location}
          history={history}
          isFollowing={isFollowing}
        />
      </Suspense>
      
    </Fragment>
  );
};

Channel.propTypes = {
  location: shape({}).isRequired,
  history: shape({}).isRequired
};

export default Channel;
