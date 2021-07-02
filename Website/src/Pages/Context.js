import React, { createContext, Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { AppString } from "./Const";
import firebase, { auth, db, storage } from "./firebase";
export const MyContext = createContext();

// Define the base URL
const Axios = axios.create({
  baseURL: "http://localhost/php-login-registration-api/",
});

class MyContextProvider extends Component {
  constructor() {
    super();
    this.isLoggedIn();
  }

  // Root State
  state = {
    showLogin: true,
    isAuth: false,
    theUser: null,
    uid: "",
  };

  // Toggle between Login & Signup page
  toggleNav = () => {
    const showLogin = !this.state.showLogin;
    this.setState({
      ...this.state,
      showLogin,
    });
  };

  insertUid = (uid) => {
    this.setState({
      ...this.state,
      uid: uid,
    });
  };

  // On Click the Log out button
  logoutUser = () => {
    localStorage.removeItem("loginToken");
    this.setState({
      ...this.state,
      isAuth: false,
    });
  };

  registerUser = async (user) => {
    // Sending the user registration request
    const register = await Axios.post("registerK.php", {
      KinderName: user.KinderName,
      KinderEmail: user.KinderEmail,
      Password: user.Password,
      City: user.City,
      KinderPhone: user.KinderPhone,
      Address: user.Address,
      coverfile: user.coverfile,
    });
    console.log(user.KinderEmail);
    return register.data;
  };
  registerInfo3 = async (user) => {
    let imageL = user.ImagesURL.length;
    let classesL = user.Classes.length;
    // Sending the user registration request
    const register = await Axios.post("Information3.php", {
      Images: user.ImagesURL,
      Classes: user.Classes,
      KinderEmail: user.KinderEmail,
      imageL: imageL,
      classesL: classesL,
    });
    AppString.Classes = user.Classes;
    console.log(user.Images);
    console.log(user.Classes);
    console.log(user.email);

    return register.data;
  };

  updateUser = async (user) => {
    // Sending the user registration request
    const register = await Axios.post("Information.php", {
      KinderName: user.KinderName,
      KinderEmail: user.KinderEmail,
      City: user.City,
      KinderPhone: user.KinderPhone,
      Address: user.Address,
      gender: user.gender,
    });
    console.log(user.KinderEmail);
    return register.data;
  };

  updateUser2 = async (user) => {
    // Sending the user registration request
    const register = await Axios.post("Information2.php", {
      k1: user.k1,
      k2: user.k2,
      place1: user.place1,
      place2: user.place2,
      bus: user.bus,
      food: user.food,
      KinderEmail: user.KinderEmail,
    });
    console.log(user.place1);
    return register.data;
  };

  loginUser = async (user) => {
    // Sending the user Login request
    const login = await Axios.post("login.php", {
      KinderEmail: user.KinderEmail,
      Password: user.Password,
    });
    console.log(user.KinderEmail);
    return login.data;
  };

  // Checking user logged in or not
  isLoggedIn = async () => {
    const loginToken = localStorage.getItem("loginToken");

    // If inside the local-storage has the JWT token
    if (loginToken) {
      //Adding JWT token to axios default header
      Axios.defaults.headers.common["Authorization"] = "bearer " + loginToken;

      // Fetching the user information
      const { data } = await Axios.get("user-info.php");

      // If user information is successfully received
      if (data.success && data.user) {
        this.setState({
          ...this.state,
          isAuth: true,
          theUser: data.user,
        });
        if (
          data.user.gender != "" &&
          data.user.k1 != "" &&
          data.user.k2 != ""
        ) {
          AppString.filled = "yes";
        }
      }
      // console.log(this.state.theUser.KinderName,this.state.theUser.KinderPhone);
    }
  };

  render() {
    const contextValue = {
      rootState: this.state,
      toggleNav: this.toggleNav,
      isLoggedIn: this.isLoggedIn,
      registerUser: this.registerUser,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
      insertUid: this.insertUid,
      updateUser: this.updateUser,
      updateUser2: this.updateUser2,
      registerInfo3: this.registerInfo3,
    };
    return (
      <MyContext.Provider value={contextValue}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyContextProvider;
