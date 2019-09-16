import React, { createContext, useContext, useReducer } from "react";

import { followingReducer } from "../reducers/reducers";
import { FOLLOW, UNFOLLOW } from "../reducers/types";
import { FollowingContext } from "./FollowingProvider";

export const StoreContext = createContext();

const Store = ({ children }) => {
  const [cachedFollowingChannels, setFollowingChannels] = useReducer(
    followingReducer,
    []
  );
  const following = useContext(FollowingContext);

  const followChannel = channel => {
    setFollowingChannels({ type: FOLLOW, channel });
  };

  const unfollowChannel = channel => {
    setFollowingChannels({ type: UNFOLLOW, channel });
  };
  return (
    <StoreContext.Provider
      value={{
        cachedFollowingChannels,
        followChannel,
        unfollowChannel
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
