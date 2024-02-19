import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/screens/Login";
import RoutesConfig, { Rota } from "./configs/RoutesConfig";

interface Props {
  component: React.FC;
  tipoUsuario: boolean;
  path: string;
  exact: boolean;
  key: number;
}

const PrivateRouter: React.FC<Props> = ({
  component: Component,
  tipoUsuario,
  path,
  exact,
}) => {
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  };

  return (
    <Route
      path={path}
      exact={exact}
      render={(props: Record<string, any>) =>
        isLoggedIn() ? (
          tipoUsuario ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/403", state: { from: props.location } }}
            />
          )
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {RoutesConfig.map((value: Rota, key) => {
        return (
          <PrivateRouter
            key={key}
            path={value.path}
            exact={value.exact}
            component={value.component}
            tipoUsuario={value.tipoUsuario}
          />
        );
      })}
      <Route path="/" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
