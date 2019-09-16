import * as types from './types';

const followChannel = (channel, state) => {
  const newChannels = [...state, channel];
  console.log('state: ', state);
  console.log('channel: ', channel);
  return newChannels;
};

const unfollowChannel = (channel, state) => {
  return;
};

export const followingReducer = (state, action) => {
  switch (action.type) {
    case types.FOLLOW:
      return followChannel(action.channel, state);
    case types.UNFOLLOW:
      return unfollowChannel(action.channel);
    default:
      return state;
  }
};
