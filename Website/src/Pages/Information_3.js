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
  TableBody,
  TableRow,
  TableCell,
  Radio,
  RadioGroup,
  Checkbox,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddIcon from "@material-ui/icons/Add";
import { MyContext } from "./Context";
import firebase, {
  auth,
  firestore,
  storage,
  performance,
  db,
} from "./firebase";
import { AppString } from "./Const";
import Popup from "./Popup";

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
    width: "72vw",
    marginLeft: "12vw",
    marginBottom: "25vh",
  },
  centerAdornment: {
    marginLeft: "1%", // or your relevant measure
  },
  root: {
    marginBottom: "100px",
    width: "80%",
    margin: theme.spacing(1),
  },
  input: {
    width: "450px",
  },
  radio: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  radiodiv: {
    fontSize: 16,
    marginRight: "-3vw",
  },
  table: {
    textAlign: "right",
    direction: "rtl",
    width: "60vw",
    paddingLeft: "110%",
  },
  cell: {
    width: "4vw",
    paddingLeft: "10vw",
    textAlign: "right",
  },

  div: {
    width: "10vw",
    fontSize: 16,
  },
  textField: {
    width: "28vw",
    textAlign: "center",
    marginTop: "-1vw",
    marginLeft: "2vw",
  },
  button: {
    width: "150px",
    borderColor: "#84d4a4",
    borderWidth: 1,
    backgroundColor: "#84d4a4",
    marginTop: "-80px",
    fontWeight: "bold",
    fontSize: 16,
  },
  button2: {
    width: "100px",
    borderColor: "#84d4a4",
    borderWidth: 1,
    backgroundColor: "#84d4a4",
    fontWeight: "bold",
    fontSize: 14,
  },
  add: {
    width: "15vw",
    marginLeft: "15vw",
    marginBottom: "-1vw",
    flexDirection: "row",
  },
  icon: {
    marginLeft: "15px",
  },
  typographyStyles: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: "10vw",
    color: "#7840A7",
  },
}));

function Information_3(props) {
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange2 = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const { rootState, registerInfo3 } = useContext(MyContext);
  const { theUser } = rootState;
  const initialState = {
    userInfo: {
      ImagesURL: [],
      KinderEmail: theUser.KinderEmail,
      Classes: [],
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);

  AppString.KinderEmail = theUser.KinderEmail;
  const { history } = props;
  const classes = useStyles();
  const handleChangeSelect = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
  const handleUpload = async () => {
    let r = 0;
    images.forEach((image) => {
      //  const name = image.substring(image.lastIndexOf('/') + 1);
      console.log(image);
      console.log(image.name);
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
            .then((Url) => {
              state.userInfo.ImagesURL.push(Url);
            });
        }
      );
    });
  };
  const imageHandle = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files); //.map((file)=>URL.createObjectURL(file))        URL.createObjectURL(file)

      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      setImages(fileArray);
    }
  };

  const insertAll = async (event) => {
    event.preventDefault();
    console.log(state.userInfo.Images);
    console.log(state.userInfo.Classes);
    console.log(state.userInfo.email);
    const data = await registerInfo3(state.userInfo);
    console.log(data.success);
    if (data.success) {
      setState({
        ...initialState,
        successMsg: data.message,
      });
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.pageContent}>
        <Typography color="primary" className={classes.typographyStyles}>
          تعديــل المعلومات
        </Typography>
        <form className={classes.root}>
          <Grid container>
            <Grid item xs={6} className={classes.table}>
              <TableBody>
                <TableRow className={classes.table}>
                  <TableCell className={classes.cell}>
                    <div className={classes.div}>الصفوف الدراسية المتوفرة </div>
                  </TableCell>
                  <TableCell className={classes.input}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="Classes"
                      value={state.userInfo.Classes}
                      className={classes.textField}
                      onChange={handleChangeSelect}
                      displayEmpty
                      multiple
                      color="#7840A7"
                    >
                      <MenuItem value="" disabled>
                        الصفوف
                      </MenuItem>
                      <MenuItem value={"اللغة العربية"}>اللغة العربية</MenuItem>
                      <MenuItem value={"اللغة الإنجليزية"}>
                        اللغة الإنجليزية
                      </MenuItem>
                      <MenuItem value={"اللغة الفرنسية"}>
                        اللغة الفرنسية
                      </MenuItem>
                      <MenuItem value={"الحساب"}>الحساب</MenuItem>
                      <MenuItem value={"تعلّم القرآن "}>تعلّم القرآن </MenuItem>
                      <MenuItem value={"صف اللعب"}>صف اللعب</MenuItem>
                      <MenuItem value={"صف الرسم"}>صف الرسم</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.table}>
                  <TableCell className={classes.cell}>
                    <div className={classes.div}>إدراج صور للروضة</div>
                  </TableCell>
                  <TableCell className={classes.input}>
                    <input
                      accept="image/*"
                      className={classes.textField}
                      id="contained-button-file"
                      multiple
                      name="Images"
                      type="file"
                      onChange={imageHandle}
                    />
                    <Button
                      className={classes.button2}
                      onClick={handleUpload}
                      style={{ marginLeft: "4vw", marginTop: "-1vw" }}
                    >
                      حفظ الصور
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Grid>
          </Grid>
        </form>
        <Button
          className={classes.button}
          onClick={insertAll}
          style={{ marginLeft: "5vw" }}
        >
          حفظ كافة التغييرات
        </Button>
      </Paper>
    </ThemeProvider>
  );
}

export default Information_3;
