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
import { MyContext } from "./Context";
import firebase, {
  auth,
  firestore,
  storage,
  performance,
  db,
} from "./firebase";
import { AppString } from "./Const";
import axios from "axios";

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
    padding: theme.spacing(3),
  },
  centerAdornment: {
    marginLeft: "1%", // or your relevant measure
  },
  root: {
    width: "80%",
    height: "90%",
    margin: theme.spacing(1),
  },
  input: {
    width: "80%",
    margin: theme.spacing(1),
    textAlign: "right",
    marginLeft: "130%",
    direction: "rtl",
  },
  inputBtn: {
    width: "80%",
    margin: theme.spacing(1),
    textAlign: "right",
    marginLeft: "130%",
    direction: "rtl",
    backgroundColor: "#84d4a4",
  },
  typographyStyles: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: "15%",
    color: "#7840A7",
  },
}));

function CreateK(props) {
  const { history } = props;

  const { toggleNav, registerUser, insertUid } = useContext(MyContext);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange2 = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            state.userInfo.coverfile = url;
            AppString.coverfile = url;
          });
        //  localStorage.setItem('loginToken');
        // isLoggedIn();
        // history.push('/Information');
      }
    );
  };

  const initialState = {
    userInfo: {
      KinderName: "",
      KinderEmail: "",
      Password: "",
      City: "",
      KinderPhone: "",
      Address: "",
      coverfile: "",
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);

  const classes = useStyles();

  function handleChange(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: url,
      },
    });
    console.log(e.target.files[0].name);
  }

  async function updateKinder(id) {
    const Axios = axios.create({
      baseURL: "http://localhost/php-login-registration-api/",
    });
    const getI = await Axios.post("update.php", {
      KinderID: id,
      KinderEmail: state.userInfo.KinderEmail,
    });
  }
  async function InsertInFirebase() {
    auth
      .createUserWithEmailAndPassword(
        state.userInfo.KinderEmail,
        state.userInfo.Password
      )
      .then((value) => {
        var user = value.user;
        AppString.UserID = user.uid;
        updateKinder(user.uid);
        console.log(AppString.UserID);
        db.collection("users").doc(AppString.UserID.toString()).set({
          username: state.userInfo.KinderName,
          email: state.userInfo.KinderEmail,
          createdAt: new Date(),
        });
      });
  }

  const InsertRecord = async (event) => {
    event.preventDefault();
    const data = await registerUser(state.userInfo);
    console.log(data.success);
    if (data.success) {
      setState({
        ...initialState,
        successMsg: data.message,
      });
      InsertInFirebase();
      history.push("/Login");
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Show Message on Success or Error
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
    history.push("/Login");
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.pageContent}>
        <Typography color="primary" className={classes.typographyStyles}>
          إنشاء حساب جديد
        </Typography>
        <form className={classes.root}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                id="outlined-full-width"
                label="اسم الروضـة "
                type="text"
                name="KinderName"
                fullWidth
                margin="normal"
                className={classes.input}
                variant="outlined"
                onChange={onChangeValue}
                value={state.userInfo.KinderName}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "#7840A7",
                    alignContent: "right",
                  },
                }}
              />
              <TextField
                id="outlined-basic"
                label="الإيميل "
                name="KinderEmail"
                variant="outlined"
                className={classes.input}
                onChange={onChangeValue}
                value={state.userInfo.KinderEmail}
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
                onChange={onChangeValue}
                value={state.userInfo.Password}
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
              <TextField
                id="standard-number"
                label="رقم الهاتف "
                variant="outlined"
                name="KinderPhone"
                onChange={onChangeValue}
                value={state.userInfo.KinderPhone}
                className={classes.input}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "#7840A7",
                    alignContent: "right",
                  },
                }}
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.userInfo.City}
                className={classes.input}
                onChange={onChangeValue}
                name="City"
                displayEmpty
                color="#7840A7"
              >
                <MenuItem value="" disabled>
                  مدينتك
                </MenuItem>
                <MenuItem value={"طولكرم"}>طولكرم</MenuItem>
                <MenuItem value={"نابلس"}>نابلس</MenuItem>
                <MenuItem value={"قلقيلية"}>قلقيلية</MenuItem>
                <MenuItem value={"جنين"}>جنين</MenuItem>
                <MenuItem value={"رام الله"}>رام الله</MenuItem>
                <MenuItem value={"بيت لحم"}>بيت لحم</MenuItem>
                <MenuItem value={"الخليل"}>الخليل</MenuItem>
                <MenuItem value={"أريحا"}>أريحا</MenuItem>
                <MenuItem value={"طوباس"}>طوباس</MenuItem>
                <MenuItem value={"سلفيت"}>سلفيت</MenuItem>
              </Select>
              <TextField
                id="outlined-basic"
                label="العنوان"
                name="Address"
                variant="outlined"
                className={classes.input}
                onChange={onChangeValue}
                value={state.userInfo.Address}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "#7840A7",
                    alignContent: "right",
                  },
                }}
              />

              <TextField
                id="outlined-full-width"
                label="تحميل صورة الغلاف"
                className={classes.input}
                name="coverfile"
                type="file"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "#7840A7",
                    alignContent: "center",
                  },
                }}
                variant="outlined"
                onChange={handleChange2}
              ></TextField>
              <Button
                color="#84d4a4"
                variant="contained"
                className={classes.inputBtn}
                onClick={handleUpload}
              >
                حفظ المعلومات
              </Button>

              {console.log("string", state.userInfo.coverfile)}

              <Button
                color="#84d4a4"
                variant="contained"
                className={classes.inputBtn}
                onClick={InsertRecord}
              >
                إنشــاء الحساب
              </Button>
            </Grid>
            <Grid item xs={6}>
              <img
                src={require("../Photos/s.jpg").default}
                alt="c image"
                style={{ width: "37vw", height: 400, marginLeft: "-95%" }}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </ThemeProvider>
  );
}

export default CreateK;
