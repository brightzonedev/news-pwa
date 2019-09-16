import React, { useState, useEffect, createContext, useContext } from "react";

import { db } from "./utils/firebase";
import { AuthContext } from "./AuthProvider";

export const FollowingContext = createContext();

export const FollowingProvider = ({ children }) => {
  const user = useContext(AuthContext);
  const [followingChannels, setFollowingChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const docRef = db.collection("users").doc(user.uid);

      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data().following;
            setFollowingChannels(data);
            setLoading(false);
          } else {
            docRef.set({
              following: []
            });
          }
        })
        .catch(e => {
          console.log("Error getting document:", e);
        });
    }
  }, [user]);

  return (
    <FollowingContext.Provider
      value={{
        followingChannels,
        loading
      }}
    >
      {children}
    </FollowingContext.Provider>
  );
};

export default FollowingProvider;
