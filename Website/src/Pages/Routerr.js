import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderUser from "../components/HeaderUser";
import Login from "./Login";
import CreateK from "./CreateK";
import Splash from "./Splash";
import Home from "./Home";
import Messages from "./Messages";
import Profile from "./Profile";
import Information from "./Information";
import Information_2 from "./Information_2";
import Information_3 from "./Information_3";
import Requests from "./Requests";
import Analysis from "./Analysis";
import { Switch, Route } from "react-router-dom";
import { MyContext } from "./Context";
import Request from "./Request";
import { Test } from "./Test";
import Cover from "./Cover";
import Activity from "./Activity";
import Images from "./Images";

function Routerr() {
  const { rootState, logoutUser } = useContext(MyContext);
  const { isAuth, theUser, showLogin } = rootState;
  return (
    <div>
      {isAuth ? (
        <>
          <HeaderUser />
          <Switch>
            <Route
              exact
              path="/Messages"
              render={(props) => <Messages {...props} />}
            />
            <Route
              exact
              path="/Profile"
              render={(props) => <Profile {...props} />}
            />
            <Route
              exact
              path="/Requests"
              render={(props) => <Requests {...props} />}
            />
            <Route
              exact
              path="/Information"
              render={(props) => <Information {...props} />}
            />
            <Route
              exact
              path="/Information_2"
              render={(props) => <Information_2 {...props} />}
            />
            <Route
              exact
              path="/Information_3"
              render={(props) => <Information_3 {...props} />}
            />
            <Route
              exact
              path="/Analysis"
              render={(props) => <Analysis {...props} />}
            />
            <Route
              exact
              path="/Activity"
              render={(props) => <Activity {...props} />}
            />
            <Route
              exact
              path="/Images"
              render={(props) => <Images {...props} />}
            />
          </Switch>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <Switch>
            <Route exact path="/" render={(props) => <Splash {...props} />} />
            <Route
              exact
              path="/Login"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/CreateK"
              render={(props) => <CreateK {...props} />}
            />
          </Switch>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Routerr;
