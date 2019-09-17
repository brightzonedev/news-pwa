import * as types from "./types";

const followChannel = (channel, followingChannels, state) => [
  ...state,
  ...followingChannels,
  channel
];

const unfollowChannel = (channel, allFollowingChannels) =>
  allFollowingChannels.filter(i => i !== channel);

export const followingReducer = (state, action) => {
  switch (action.type) {
    case types.FOLLOW:
      return followChannel(action.channel, action.followingChannels, state);
    case types.UNFOLLOW:
      return unfollowChannel(action.channel, action.allFollowingChannels);
    default:
      return state;
  }
};
