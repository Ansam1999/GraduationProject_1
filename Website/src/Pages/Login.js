import {
  Paper,
  makeStyles,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Link, NavLink, withRouter } from "react-router-dom";
import { MyContext } from "./Context";
import { AppString } from "./Const";
import axios from "axios";
import firebase, {
  auth,
  firestore,
  storage,
  performance,
  db,
} from "./firebase";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7840A7", //pirple
    },
    secondary: {
      main: "#84d4a4", //green
    },
  },
});

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(18),
    height: "70vh",
  },
  centerAdornment: {
    marginLeft: "1%", // or your relevant measure
  },
  root: {
    width: "50%",
    margin: theme.spacing(1),
    alignContent: "center",
    textAlign: "center",
  },
  input: {
    width: "30vw",
    margin: theme.spacing(1),
    direction: "rtl",
    alignContent: "center",
    marginLeft: "60%",
    fontWeight: "bold",
  },
  input1: {
    width: "30vw",
    margin: theme.spacing(1),
    direction: "rtl",
    alignContent: "center",
    marginLeft: "60%",
    fontWeight: "bold",
    backgroundColor: "#84d4a4",
  },
  typographyStyles: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#7840A7",
  },
}));

function Login(props) {
  let mountedRef = null;
  const { history } = props;
  const { toggleNav, loginUser, isLoggedIn, rootState } = useContext(MyContext);
  const { theUser } = rootState;

  const initialState = {
    userInfo: {
      KinderEmail: "",
      Password: "",
    },
    errorMsg: "",
    successMsg: "",
  };

  const [state, setState] = useState(initialState);

  // On change input value (email & password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  async function GetClasses() {
    const Axios = axios.create({
      baseURL: "http://localhost/php-login-registration-api/",
    });
    const getC = await Axios.post("Classes.php", {
      KinderEmail: theUser.KinderEmail,
    });
    console.log(getC.data);
    console.log(AppString.KinderEmail);
    AppString.Classes = getC.data.classes;
    console.log(AppString.Classes);
  }
  async function LoginInFirebase() {
    auth
      .signInWithEmailAndPassword(
        state.userInfo.KinderEmail,
        state.userInfo.Password
      )
      .then((userCredential) => {
        var user = firebase.auth().currentUser;
        if (user != null) {
          AppString.UserID = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
          console.log(AppString.UserID);
        }
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
  async function GetUsers() {
    mountedRef = true;
    console.log(theUser.KinderName);
    const users = [];
    await db
      .collection("AppUsers")
      .where("kinderName", "==", theUser.KinderName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (mountedRef) {
            console.log(doc.id, " => ", doc.data());
            users.push(doc.data());
          }
          AppString.users = users;
          console.log(users);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return () => (mountedRef = false);
  }

  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(state.userInfo);
    if (data.success && data.token) {
      setState({
        ...initialState,
      });
      localStorage.setItem("loginToken", data.token);
      await isLoggedIn();

      console.log("hiiii");
      //  AppString.KinderEmail=theUser.KinderEmail;
      //console.log(theUser.KinderEmail);
      LoginInFirebase();
      GetClasses();
      GetUsers();
      if (AppString.filled == "yes") {
        history.push("/Profile");
      } else {
        history.push("/Information");
      }
      // window.location.href = "/Profile";
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  // Show Message on Error or Success
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
    console.log(theUser.KinderName);
  }

  const classes = useStyles();
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.pageContent}>
        <Typography color="primary" className={classes.typographyStyles}>
          تسجيــل الدخول
        </Typography>
        <form className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                id="outlined-full-width"
                label="البريـد الإلكتروني "
                type="text"
                name="KinderEmail"
                fullWidth
                margin="normal"
                className={classes.input}
                variant="outlined"
                value={state.userInfo.KinderEmail}
                onChange={onChangeValue}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "#7840A7",
                    alignContent: "right",
                  },
                }}
              />

              <TextField
                id="standard-password-input"
                type="password"
                name="Password"
                value={state.userInfo.Password}
                onChange={onChangeValue}
                autoComplete="current-password"
                label="كلمة المرور"
                variant="outlined"
                className={classes.input}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "#7840A7",
                    alignContent: "right",
                  },
                }}
              />
              <div style={{ marginLeft: "23vw", color: "red" }}>
                {errorMsg}
                {successMsg}
              </div>
              <Button
                color="#84d4a4"
                variant="contained"
                className={classes.input1}
                onClick={submitForm}
              >
                تسجيــل الدخول
              </Button>

              <div
                style={{
                  display: "flex",
                  width: "20vw",
                  flexDirection: "row",
                  marginLeft: "80%",
                  fontSize: 16,
                  color: "#7840A7",
                }}
              >
                <NavLink
                  to="/CreateK"
                  style={{
                    fontWeight: "bold",
                    marginTop: "1.5vh",
                    marginRight: "1vw",
                    color: "#84d4a4",
                    fontSize: 22,
                  }}
                >
                  هنــا
                </NavLink>
                <p color="primary" style={{ fontWeight: "bold" }}>
                  ليس لديك حساب ماذا تنتظر ، سجل من
                </p>
              </div>

              {/* <Link to="/CreateK" color = "#84d4a4" style={{marginLeft : 270,fontWeight :"bold",}} >هنا</Link>*/}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </ThemeProvider>
  );
}

export default withRouter(Login);
