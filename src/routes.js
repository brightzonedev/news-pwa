import LoadingScreen from "./LoadingScreen";
import Following from "./components/Following/Following";
import Explore from "./components/Explore/Explore";
import Channel from "./Channel";
import Popular from "./components/Popular/Popular";

export default [
  {
    path: "/",
    exact: true,
    component: LoadingScreen
  },
  {
    path: "/following",
    exact: true,
    component: Following,
    private: true
  },
  {
    path: "/following/:channelName",
    component: Channel,
    exact: true,
    private: true
  },
  {
    path: "/explore",
    exact: true,
    component: Explore,
    private: true
  },
  {
    path: "/explore/:channelName",
    component: Channel,
    exact: true,
    private: true
  },
  {
    path: "/popular",
    exact: true,
    component: Popular,
    private: true
  }
];
