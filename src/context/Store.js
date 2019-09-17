import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";

import { followingReducer } from "../reducers/reducers";
import { FOLLOW, UNFOLLOW } from "../reducers/types";
import { db } from "../utils/firebase";
import { AuthContext } from "./AuthProvider";

export const StoreContext = createContext();

const Store = ({ children }) => {
  const user = useContext(AuthContext);
  const [followingChannels, setFollowingChannels] = useState([]);
  const [allFollowingChannels, setAllFollowingChannels] = useReducer(
    followingReducer,
    []
  );
  const [loading, setLoading] = useState(true);

  const followChannel = (channel, followingChannels) => {
    setAllFollowingChannels({ type: FOLLOW, channel, followingChannels });
  };

  const unfollowChannel = channel => {
    setAllFollowingChannels({ type: UNFOLLOW, channel, allFollowingChannels });
  };

  useEffect(() => {
    // Check if user exists in db and has any followings; if not create the field
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
  });

  return (
    <StoreContext.Provider
      value={{
        allFollowingChannels,
        followingChannels,
        followChannel,
        unfollowChannel,
        loading
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
