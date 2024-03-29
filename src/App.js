import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";

import AuthProvider from "./context/AuthProvider";
import routes from "./routes";
import PrivateRoute from "./PrivateRoute";
import LoadingScreen from "./LoadingScreen";
import Store from "./context/Store";

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <AuthProvider>
      <Store>
        <Router>
          <Suspense fallback={<LoadingScreen />}>
            <Switch>
              {routes.map(({ private: isPrivate, path, exact, component }) =>
                isPrivate ? (
                  <PrivateRoute
                    key={path}
                    path={path}
                    exact={exact}
                    component={component}
                  />
                ) : (
                  <Route
                    key={path}
                    path={path}
                    exact={exact}
                    component={component}
                  />
                )
              )}
            </Switch>
          </Suspense>
        </Router>
      </Store>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
