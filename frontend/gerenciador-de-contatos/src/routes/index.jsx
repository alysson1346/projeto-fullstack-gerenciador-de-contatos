import { Switch, Route } from "react-router-dom";
import PageLogin from "../pages/login";
import PageDashboard from "../pages/dashboard";
import PageCreateAccount from "../pages/CreateAccount";
import { useState, useEffect } from "react";

function Routes() {
  const [authenticad, setAuthenticad] = useState(false);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@UserAuthorization:token"));

    if (token) {
      setAuthenticad(true);
    }
  }, [authenticad]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <PageLogin
            authenticad={authenticad}
            setAuthenticad={setAuthenticad}
          />
        </Route>

        <Route exact path="/create-account">
          <PageCreateAccount authenticad={authenticad} />
        </Route>

        <Route exact path="/dashboard">
          <PageDashboard authenticad={authenticad} />
        </Route>
      </Switch>
    </>
  );
}

export default Routes;
