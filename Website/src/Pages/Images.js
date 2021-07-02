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
  GridList,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import Draggable from "react-draggable";
import Rating from "@material-ui/lab/Rating";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import EmailIcon from "@material-ui/icons/Email";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import { MyContext } from "./Context";
import { AppString } from "./Const";
import axios from "axios";
import "./style.css";
import EventIcon from "@material-ui/icons/Event";
import ImageUp from "./ImageUp";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    marginBottom: "15vh",
    justifyContent: "center",
    marginTop: "-95vh",
    width: "60vw",
    height: "70vh",
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
  image: {
    position: "relative",
    height: "40vh",
    backgroundPositionX: "center",
    width: "42vw",
    borderRadius: 10,
    resize: "cover",
    margin: "auto",
    marginLeft: "6vw",
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
  select: {
    width: "20vw",
    marginLeft: "26vw",
    marginTop: "3vh",
    textAlign: "right",
  },
  input: {
    textAlign: "right",
    direction: "rtl",
  },
  typographyStyles: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7840A7",
    textAlign: "right",
    textAlign: "right",
    marginRight: "6vw",
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

async function GetImages() {
  const Axios = axios.create({
    baseURL: "http://localhost/php-login-registration-api/",
  });
  const getI = await Axios.post("getImages.php", {
    KinderEmail: AppString.KinderEmail,
  });
  console.log(getI.data);
  console.log(AppString.KinderEmail);
  AppString.Images = getI.data.classes;
  console.log(AppString.Images);
}

const Profile = (props) => {
  const { history } = props;
  const { rootState } = useContext(MyContext);
  const { theUser } = rootState;
  AppString.KinderEmail = theUser.KinderEmail;

  const classes = useStyles();

  GetImages();

  {
    /* async function getC(){
      const Class = await getClasses(AppString.KinderEmail);
      if(Class.success && Class.classes){
      setC(Class.classes);
      }
    }*/
  }
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
  const [openPopup, setOpenPopup] = useState(false);

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
        <Typography color="primary" className={classes.typographyStyles}>
          الصــور
        </Typography>
        <Grid container>
          <GridList
            className={classes.gridList}
            cols={3}
            style={{
              width: "52vw",
              display: "flex",
              flexDirection: "row-reverse",
              marginTop: "2vh",
              height: "50vh",
            }}
          >
            {AppString.Images.map((item, index) => {
              return (
                <Button
                  onClick={() => {
                    setOpenPopup(true);
                    AppString.openImage = item;
                  }}
                >
                  <Box key={index}>
                    <img
                      style={{
                        width: "15vw",
                        height: "24vh",
                        marginRight: "1vw",
                        marginTop: "5vh",
                        marginLeft: "1vw",
                      }}
                      src={item}
                    ></img>
                  </Box>
                </Button>
              );
            })}
          </GridList>
          <ImageUp openPopup={openPopup} setOpenPopup={setOpenPopup}></ImageUp>
        </Grid>
        <Grid item xs={6}></Grid>
        <div xs={3}></div>
      </Paper>
    </Container>
  );
};

export default withRouter(Profile);
