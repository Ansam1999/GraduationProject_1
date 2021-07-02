import {
  Button,
  makeStyles,
  Grid,
  Box,
  Typography,
  Paper,
  Container,
  IconButton,
  GridList,
  GridListTile,
} from "@material-ui/core";
import "./style.css";
import React, { useState, useContext } from "react";
import { MyContext } from "./Context";
import { withRouter } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import Draggable from "react-draggable";
import { createMuiTheme } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import CheckIcon from "@material-ui/icons/Check";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import { AppString } from "./Const";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import EventIcon from "@material-ui/icons/Event";
import MaterialTable from "material-table";
import ActPopup from "./ActPopup";
import { Apps } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  b: {
    marginLeft: "20%",
    color: "#7840A7",
    fontWeight: "bold",
    fontSize: 16,
  },
  Grid: {
    width: "30%",
    position: "absolute",
    top: "60%",
    left: "40%",
    flexDirection: "coulmn",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  image: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    margin: 0,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    marginRight: 0,
    paddingRight: 0,
  },
  div: {
    marginTop: "5vh",
    fontSize: 24,
    width: "12vw",
    marginLeft: "35vw",
    height: "6vh",
    backgroundColor: "#84d4a4",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    flexDirection: "row",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    textAlign: "right",
  },
  pageContent1: {
    margin: theme.spacing(5),
    padding: theme.spacing(0),
    marginBottom: "21vh",
    justifyContent: "center",
    height: "80vh",
    width: "15vw",
    marginLeft: "70vw",
    display: "block",
    overflow: "hidden",
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
  button: {
    width: "150px",
    borderColor: "#84d4a4",
    borderWidth: 1,
    backgroundColor: "#84d4a4",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: "5vh",
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(3),
    marginBottom: "15vh",
    justifyContent: "center",
    marginTop: "-95vh",
    width: "65vw",
    marginBottom: "52vh",
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
}));
async function GetActivities() {
  const Axios = axios.create({
    baseURL: "http://localhost/php-login-registration-api/",
  });
  console.log(AppString.KinderEmail);
  const getF = await Axios.post("getActivities.php", {
    KinderEmail: AppString.KinderEmail,
  });
  console.log(getF.data);
  AppString.Activities = getF.data.Activities;
  console.log(AppString.Activities);
}
const Analysis = (props) => {
  console.log(AppString.KinderEmail);
  const classes = useStyles();
  const { history } = props;
  const { rootState, logoutUser } = useContext(MyContext);
  const { isAuth, theUser, showLogin } = rootState;
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
  const a = GetActivities();
  const [openPopup, setOpenPopup] = useState(false);
  const [Activities, setActivities] = useState([]);
  const data = [
    { الاسم: "انسام", العمر: "22", المدينة: "طوباس" },
    { الاسم: "رؤى", العمر: "21", المدينة: "طولكرم" },
  ];
  const columns = [
    { field: "Note", title: "ملاحظـة", cellStyle: { paddingLeft: "2vw" } },
    {
      field: "Duration",
      title: "وقت إنتهاء النشاط",
      cellStyle: { paddingLeft: "2vw" },
    },
    {
      field: "Time",
      title: "وقت بداية النشاط",
      cellStyle: { paddingLeft: "2vw" },
    },
    { title: "تاريخ النشاط", field: "Date", cellStyle: { paddingLeft: "2vw" } },
    { field: "Place", title: "موقع النشاط", cellStyle: { paddingLeft: "2vw" } },
    { field: "Name", title: "اسـم النشاط", cellStyle: { paddingLeft: "2vw" } },
  ];

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
            marginTop: "3vh",
            width: "15vw",
            justifyContent: "center",
          }}
          xs={12}
        >
          <Typography className={classes.h1}>{theUser.KinderName}</Typography>
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
          الأنشــطـة
        </Typography>
        <MaterialTable
          title=""
          style={{
            justifyContent: "right",
            alignContent: "flex-end",
            alignItems: "flex-end",
            fontSize: 20,
            textAlign: "right",
          }}
          data={AppString.Activities}
          columns={columns}
          options={{
            paging: false,
            search: false,
            headerStyle: {
              paddingLeft: "2vw",
              fontSize: 21,
              fontWeight: "bold",
            },
          }}
          fontSize={20}
        />

        <Button
          className={classes.button}
          style={{ marginLeft: "5vw" }}
          onFocusVisible="true"
          onClick={() => {
            setOpenPopup(true);
          }}
        >
          {" "}
          إضـافة نشاط{" "}
        </Button>
        <ActPopup openPopup={openPopup} setOpenPopup={setOpenPopup}></ActPopup>
      </Paper>
    </Container>
  );
};

export default withRouter(Analysis);
