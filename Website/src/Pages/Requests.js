import {
  makeStyles,
  Button,
  IconButton,
  Container,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
  Box,
  TableBody,
  TableCell,
  TableRow,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { MyContext } from "./Context";
import { withRouter } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import Draggable from "react-draggable";
import { createMuiTheme } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import CheckIcon from "@material-ui/icons/Check";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Popup from "./Popup";
import EventIcon from "@material-ui/icons/Event";

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
    padding: theme.spacing(5),
    marginBottom: "15vh",
    justifyContent: "center",
    marginTop: "-95vh",
    width: "55vw",
    marginBottom: "52vh",
  },
  pageContent1: {
    margin: theme.spacing(5),
    padding: theme.spacing(0),
    marginBottom: "15vh",
    justifyContent: "center",
    height: "80vh",
    width: "15vw",
    marginLeft: "70vw",
    display: "block",
    overflow: "hidden",
  },
  b: {
    position: "absolute",
    // top: '65%',
    //left: '46%',
    color: "#7840A7",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: "39vh",
    marginLeft: "-42vw",
  },

  img: {
    position: "relative",
    height: "18vh",
    backgroundPositionX: "center",
    width: "12.5vw",
    borderRadius: 10,
    resize: "cover",
    margin: "auto",
    marginLeft: "1.3vw",
    marginTop: "2vh",
  },
  h2: {
    color: "#7840A7",
    fontWeight: "bold",
    fontSize: 22,
    width: "20vw",
    marginRight: "10vw",
  },
  h1: {
    color: "#7840A7",
    fontWeight: "bold",
    fontSize: "1.2vw",
    marginLeft: "0.8vw",
  },
  table: {
    textAlign: "right",
    direction: "rtl",
    width: "40vw",
    paddingLeft: "47vw",
    borderWidth: 1,
    borderColor: "black",
  },
  table1: {
    textAlign: "right",
    direction: "rtl",
    width: "40vw",
    paddingLeft: "47vw",
  },
  cell: {
    width: "15vw",
    paddingLeft: "10vw",
    textAlign: "right",
    paddingBottom: "5vh",
  },

  div: {
    width: "12vw",
    height: "5vh",
    fontSize: 22,
    marginBottom: "-70px",
    fontWeight: "bold",
    marginRight: "4vw",
  },
  textField: {
    width: "8vw",
    textAlign: "center",
    height: "5vh",
    fontSize: "1.5vw",
    fontWeight: "bold",
    marginRight: "3vw",
    marginBottom: "-3vh",
    justifyContent: "space-around",
    backgroundColor: "#e5e5e5",
  },
  text: {
    width: "10vw",
    textAlign: "center",
    fontSize: "1.5vw",
    fontWeight: "bold",
    marginRight: "5vw",
    paddingTop: "4vh",
    paddingBottom: "-4vh",
  },
  text1: {
    width: "14vw",
    textAlign: "center",
    height: "5vh",
    fontSize: "1.5vw",
    fontWeight: "bold",
    marginBottom: "-3vh",
    display: "flex",
    flexDirection: "row",
  },
  textButton: {
    width: "17vw",
    textAlign: "center",
    height: "5vh",
    fontSize: "1.5vw",
    fontWeight: "bold",
    marginBottom: "-3vh",
    justifyContent: "space-around",
    backgroundColor: "#7840A7",
    elevation: 12,
  },
  button: {
    width: "10vw",
    borderColor: "#84d4a4",
    borderWidth: 1,
    backgroundColor: "#84d4a4",
    marginTop: "8vh",
    fontWeight: "bold",
    fontSize: "1.3vw",
    position: "relative",
  },
  select: {
    width: "20vw",
    marginLeft: "26vw",
    marginTop: "3vh",
    textAlign: "right",
  },
  input: {
    textAlign: "right",
    direction: "rtl",
    paddingRight: "-3vw",
    paddingBottom: "5vh",
  },
  typographyStyles: {
    fontSize: "1.4vw",
    fontWeight: "bold",

    color: "#7840A7",
  },
  typography: {
    fontSize: "1.7vw",
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: "7vw",
    color: "#7840A7",
    paddingTop: "3vh",
  },
}));
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
async function GetRequests() {
  const Axios = axios.create({
    baseURL: "http://localhost/php-login-registration-api/",
  });
  const getF = await Axios.post("forms1.php", {
    kinderEmail: AppString.KinderEmail,
  });
  console.log(getF.data);

  AppString.Requests = getF.data.requests;
  if (getF.data.requests) {
    return true;
  }
  console.log(AppString.Requests);
}
const Requests = (props) => {
  const [open, setOpen] = React.useState(false);
  const [coverfile, setCoverFile] = useState("");
  const [value, setValue] = React.useState(2);
  const { history } = props;
  const { rootState, logoutUser } = useContext(MyContext);
  const { isAuth, theUser, showLogin } = rootState;
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log(theUser.KinderEmail);
  const a = GetRequests();
  const handleClose = () => {
    setOpen(false);
  };
  function handleChangeCover(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    setCoverFile(url);
    console.log(url);
  }
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [item, setItem] = useState([]);
  const [accept, setAccept] = useState(false);

  const setChages = (i) => {
    setOpenPopup(true);
    setItem(i);
  };

  return (
    <Container style={{ flexDirection: "row-reverse" }}>
      <Paper xs={3} className={classes.pageContent1}>
        <div style={{ width: "15vw" }} xs={3}>
          <img className={classes.img} src={theUser.coverfile}></img>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 24,
            marginLeft: "2vw",
            marginTop: "3vh",
            width: "13vw",
          }}
          xs={12}
        >
          <Typography className={classes.typographyStyles}>
            {" "}
            {theUser.KinderName}{" "}
          </Typography>
        </div>
        <Button
          style={{
            width: "15vw",
            height: "6vh",
            backgroundColor: "#e5e5e5",
            paddingLeft: "5vw",
            marginTop: "2vh",
            paddingTop: "1.2vh",
          }}
          onClick={() => handleButtonClick("/Images")}
        >
          <span style={{ fontSize: "1.1vw", fontWeight: "bold" }}>الصـور</span>
          <IconButton aria-label="change">
            <EmailIcon
              style={{ width: "2vw", position: "absolute", left: "1vw" }}
            />
          </IconButton>
        </Button>
        <Button
          style={{
            width: "15vw",
            height: "6vh",
            backgroundColor: "#e5e5e5",
            paddingLeft: "5vw",
            marginTop: "2vh",
            paddingTop: "1.2vh",
          }}
          onClick={() => handleButtonClick("/Messages")}
        >
          <span style={{ fontSize: "1.1vw", fontWeight: "bold" }}>الرسائل</span>
          <IconButton aria-label="change">
            <EmailIcon
              style={{ width: "2vw", position: "absolute", left: "1vw" }}
            />
          </IconButton>
        </Button>

        <Button
          style={{
            width: "15vw",
            height: "6vh",
            backgroundColor: "#e5e5e5",
            paddingLeft: "2.2vw",
            marginTop: "2vh",
            paddingTop: "1.2vh",
          }}
          onClick={() => handleButtonClick("/Requests")}
        >
          <span style={{ fontSize: "1.1vw", fontWeight: "bold" }}>
            طلبات الانضمام
          </span>
          <IconButton aria-label="change">
            <FormatAlignJustifyIcon
              style={{ width: "2vw", position: "absolute", left: "1vw" }}
            />
          </IconButton>
        </Button>
        <Button
          style={{
            width: "15vw",
            height: "6vh",
            backgroundColor: "#e5e5e5",
            paddingLeft: "2.2vw",
            marginTop: "2vh",
            paddingTop: "1.2vh",
          }}
          onClick={() => handleButtonClick("/Information")}
        >
          <span
            style={{
              fontSize: "1.1vw",
              fontWeight: "bold",
              marginTop: "0.35vh",
            }}
          >
            تعديل المعلومات
          </span>
          <IconButton aria-label="change">
            <EditIcon
              style={{ width: "2vw", position: "absolute", left: "1vw" }}
            />
          </IconButton>
        </Button>
        <Button
          style={{
            width: "15vw",
            height: "6vh",
            backgroundColor: "#e5e5e5",
            paddingLeft: "2.2vw",
            marginTop: "2vh",
            paddingTop: "1.2vh",
          }}
          onClick={() => handleButtonClick("/Analysis")}
        >
          <span
            style={{
              fontSize: "1.1vw",
              fontWeight: "bold",
              marginTop: "0.35vh",
            }}
          >
            تحليلات وبيانات
          </span>
          <IconButton aria-label="change">
            <ShowChartIcon
              style={{ width: "2vw", position: "absolute", left: "1vw" }}
            />
          </IconButton>
        </Button>
        <Button
          style={{
            width: "15vw",
            height: "6vh",
            backgroundColor: "#e5e5e5",
            paddingLeft: "4.5vw",
            marginTop: "2vh",
            paddingTop: "1.2vh",
          }}
          onClick={() => handleButtonClick("/Activity")}
        >
          <span
            style={{
              fontSize: "1.1vw",
              fontWeight: "bold",
              marginTop: "0.35vh",
            }}
          >
            {" "}
            الأنشـطة
          </span>
          <IconButton aria-label="change">
            <EventIcon
              style={{ width: "2vw", position: "absolute", left: "1.3vw" }}
            />
          </IconButton>
        </Button>
      </Paper>
      <Paper className={classes.pageContent} xs={6}>
        <Typography color="primary" className={classes.typography}>
          طلبات الانضمام
        </Typography>
        <form className={classes.root}>
          <Grid container>
            <Grid item xs={6} className={classes.table1}>
              <TableBody>
                <TableRow className={classes.table}>
                  <TableCell className={classes.cell}>
                    <span className={classes.text1}>اسم الطالب</span>
                  </TableCell>
                  <TableCell className={classes.input}>
                    <span
                      className={classes.text1}
                      style={{ marginRight: "-10vw" }}
                    >
                      {" "}
                      حالة الطلب{" "}
                    </span>
                  </TableCell>
                </TableRow>
                {a ? (
                  <TableRow className={classes.table}>
                    {AppString.Requests
                      ? AppString.Requests.map((item, index) => {
                          return (
                            <div key={index}>
                              <TableCell className={classes.cell}>
                                <Button
                                  className={classes.textButton}
                                  onClick={() => {
                                    setChages(item);
                                  }}
                                  onFocusVisible="true"
                                >
                                  <span style={{ color: "white" }}>
                                    {item.Name}
                                  </span>
                                </Button>
                              </TableCell>
                              <TableCell className={classes.input}>
                                {item.state === "true" ? (
                                  <Button
                                    disabled="true"
                                    className={classes.textField}
                                  >
                                    <div>
                                      {" "}
                                      <ThumbUpAltIcon
                                        style={{ fill: "#266b43" }}
                                      />
                                      <span style={{ color: "#266b43" }}>
                                        {" "}
                                        مقبول{" "}
                                      </span>
                                    </div>{" "}
                                  </Button>
                                ) : item.state === "false" ? (
                                  <Button
                                    disabled="true"
                                    className={classes.textField}
                                  >
                                    <div>
                                      {" "}
                                      <ThumbDownAltIcon
                                        style={{ fill: "#FF0000" }}
                                      />
                                      <span style={{ color: "#FF0000" }}>
                                        {" "}
                                        مرفوض{" "}
                                      </span>
                                    </div>
                                  </Button>
                                ) : null}
                              </TableCell>
                            </div>
                          );
                        })
                      : "لا توجد طلبات لعرضها"}
                  </TableRow>
                ) : null}
              </TableBody>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Popup
        style={{ marginBottom: "30vh" }}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        item={item}
        accept={accept}
        setAccept={setAccept}
      ></Popup>
    </Container>
  );
};

export default withRouter(Requests);
