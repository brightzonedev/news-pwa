import React, { createContext, useReducer } from "react";

import { followingReducer } from "../reducers/reducers";
import { FOLLOW, UNFOLLOW } from "../reducers/types";

export const StoreContext = createContext();

const Store = ({ children }) => {
  const [followingChannels, setFollowingChannels] = useReducer(
    followingReducer,
    []
  );

  const followChannel = channel => {
    setFollowingChannels({ type: FOLLOW, channel });
  };

  const unfollowChannel = channel => {
    setFollowingChannels({ type: UNFOLLOW, channel });
  };
  return (
    <StoreContext.Provider
      value={{
        followingChannels,
        followChannel,
        unfollowChannel
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
