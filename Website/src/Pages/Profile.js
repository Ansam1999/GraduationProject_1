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
import firebase, { auth, db, storage } from "./firebase";

let mountedRef = null;
async function GetUsers() {
  mountedRef = true;
  const users = [];
  await db
    .collection("AppUsers")
    .where("kinderName", "==", AppString.KinderName)
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
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    marginBottom: "15vh",
    justifyContent: "center",
    marginTop: "-95vh",
    width: "60vw",
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
    marginBottom: "7vh",
  },
  input: {
    textAlign: "right",
    direction: "rtl",
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
/*
async function GetClasses() {
  const Axios = axios.create({
    baseURL: "http://localhost/php-login-registration-api/",
  });
  const getC = await Axios.post("Classes.php", {
    KinderEmail: AppString.KinderEmail,
  });
  console.log(getC.data);
  console.log(AppString.KinderEmail);
  AppString.Classes = getC.data.classes;
  console.log(AppString.Classes);
}*/
{
  /* 
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
}*/
}

async function GetGN() {
  const Axios = axios.create({
    baseURL: "http://localhost/php-login-registration-api/",
  });
  const getN = await Axios.post("GN.php", {
    KinderEmail: AppString.KinderEmail,
  });
  AppString.GN = getN.data.NumberG;
  AppString.BN = getN.data.NumberB;
  AppString.FN = getN.data.NumberF;
  AppString.SN = getN.data.NumberS;
  AppString.busN = getN.data.NumberBus;
  AppString.foodN = getN.data.NumberFood;
  console.log(getN.data.NumberG);
  console.log(getN.data.NumberB);
}
async function GetClasses() {
  const Axios = axios.create({
    baseURL: "http://localhost/php-login-registration-api/",
  });
  const getC = await Axios.post("Classes.php", {
    KinderEmail: AppString.KinderEmail,
  });
  console.log(getC.data);
  console.log(AppString.KinderEmail);
  AppString.Classes = getC.data.classes;
  console.log(AppString.Classes);
}

const Profile = (props) => {
  GetUsers();
  GetClasses();
  const { history } = props;
  const { rootState } = useContext(MyContext);
  const { theUser } = rootState;
  AppString.KinderEmail = theUser.KinderEmail;
  AppString.KinderName = theUser.KinderName;
  const [open, setOpen] = React.useState(false);
  const [coverfile, setCoverFile] = useState("");
  const [C, setC] = useState([]);
  const [value, setValue] = React.useState(2);
  const classes = useStyles();
  console.log(AppString.Classes);
  // GetClasses();
  GetGN();
  //GetImages();
  //console.log(Class);
  const handleClickOpen = () => {
    setOpen(true);
  };

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
  const handleClose = () => {
    setOpen(false);
  };
  function handleChangeCover(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    setCoverFile(url);
    console.log(url);
  }

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
        <div xs={6} style={{ width: "53vw" }}>
          <img className={classes.image} src={theUser.coverfile}></img>
          {console.log(theUser.coverfile)}
          <IconButton
            aria-label="change"
            className={classes.b}
            onClick={handleClickOpen}
          >
            <EditIcon />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle
              style={{ cursor: "move", color: "#7840A7", textAlign: "center" }}
              id="draggable-dialog-title"
            >
              تحميل صورة الغلاف
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <TextField
                  id="outlined-full-width"
                  label="تحميل صورة الغلاف"
                  className={classes.input}
                  name="cover image"
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
                  onChange={handleChangeCover}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={handleClose}
                style={{ color: "#7840A7", textAlign: "center" }}
              >
                إلغاء
              </Button>
              <Button
                onClick={handleClose}
                style={{
                  color: "#7840A7",
                  marginRight: 120,
                  textAlign: "center",
                }}
              >
                تأكيد
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 24,
            marginLeft: "12vw",
            marginTop: "3vh",
            width: "53vw",
          }}
          xs={12}
        >
          <Rating
            name="read-only"
            name="half-rating"
            value={theUser.Rate}
            readOnly
            style={{ flex: 1, marginLeft: "-4vw" }}
          />
          <span style={{ fontSize: 18, marginRight: "20vw" }}>
            {theUser.Rate}
          </span>
          <Typography className={classes.h2}> {theUser.KinderName} </Typography>
        </div>
        <Grid container>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "3vh",
                fontSize: 24,
                width: "30vw",
                marginLeft: "25vw",
                textAlign: "right",
              }}
            >
              <div style={{ width: "17vw" }}>
                {" "}
                <Typography style={{ marginRight: "7vw" }}>
                  {theUser.City}
                </Typography>
              </div>
              <Typography style={{ marginRight: "1vw", fontWeight: "bold" }}>
                المدينة
              </Typography>
              <LocationOnIcon style={{ marginLeft: "0.2vw" }} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                fontSize: 24,
                width: "30vw",
                marginLeft: "25vw",
                marginTop: "3vh",
                textAlign: "right",
              }}
            >
              <div style={{ width: "17vw" }}>
                {" "}
                <Typography style={{ marginRight: "7vw" }}>
                  {theUser.Address}
                </Typography>
              </div>
              <Typography style={{ marginRight: "1vw", fontWeight: "bold" }}>
                العنوان
              </Typography>
              <HomeIcon />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                fontSize: 24,
                width: "30vw",
                marginLeft: "23.7vw",
                marginTop: "3vh",
                textAlign: "right",
              }}
            >
              <div style={{ width: "17vw" }}>
                {" "}
                <Typography style={{ marginRight: "5.5vw" }}>
                  {theUser.KinderPhone}
                </Typography>
              </div>
              <Typography style={{ marginRight: "1vw", fontWeight: "bold" }}>
                رقم الهاتف
              </Typography>
              <PhoneIcon />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                fontSize: 24,
                width: "30vw",
                marginLeft: "23vw",
                marginTop: "3vh",
                textAlign: "right",
              }}
            >
              <div style={{ width: "17vw" }}>
                {" "}
                <Typography style={{ marginRight: "5vw" }}>
                  {theUser.gender}
                </Typography>
              </div>
              <Typography style={{ marginRight: "1vw", fontWeight: "bold" }}>
                جنس الأطفال
              </Typography>
              <EmojiPeopleIcon />
            </div>

            <div className={classes.div}>
              <Typography
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  fontSize: "1.2vw",
                  fontWeight: "bold",
                  height: "5vh",
                  width: "13vw",
                  marginTop: "1.5vh",
                  textAlign: "center",
                }}
              >
                الأقساط الشهرية
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                fontSize: 24,
                width: "30vw",
                marginLeft: "23vw",
                marginTop: "3vh",
                textAlign: "right",
              }}
            >
              <div style={{ width: "17vw" }}>
                {" "}
                <Typography style={{ marginRight: "5vw" }}>
                  {theUser.k1}₪
                </Typography>
              </div>
              <Typography style={{ fontWeight: "bold" }}>
                مرحلة البستان
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                fontSize: 24,
                width: "30vw",
                marginLeft: "23vw",
                marginTop: "3vh",
                textAlign: "right",
              }}
            >
              <div style={{ width: "17vw" }}>
                {" "}
                <Typography style={{ marginRight: "5vw" }}>
                  {theUser.k2}₪{" "}
                </Typography>
              </div>
              <Typography style={{ fontWeight: "bold", marginLeft: "-0.3vw" }}>
                مرحلة التمهيدي
              </Typography>
            </div>

            <div className={classes.div}>
              <Typography
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  fontSize: "1.2vw",
                  fontWeight: "bold",
                  height: "5vh",
                  width: "10vw",
                  marginTop: "1.5vh",
                  textAlign: "center",
                }}
              >
                الخدمات المدفوعة{" "}
              </Typography>
            </div>
            {theUser.bus == 0 ? null : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                  fontSize: 24,
                  width: "30vw",
                  marginLeft: "23.3vw",
                  marginTop: "3vh",
                  textAlign: "right",
                }}
              >
                <div style={{ width: "17vw" }}>
                  {" "}
                  <Typography style={{ marginRight: "5vw" }}>
                    + {theUser.bus}₪{" "}
                  </Typography>
                </div>
                <Typography style={{ fontWeight: "bold" }}>
                  باص المدرسة
                </Typography>
              </div>
            )}
            {theUser.food == 0 ? null : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                  fontSize: 24,
                  width: "30vw",
                  marginLeft: "23.6vw",
                  marginTop: "3vh",
                  textAlign: "right",
                }}
              >
                <div style={{ width: "17vw" }}>
                  {" "}
                  <Typography style={{ marginRight: "5.3vw" }}>
                    + {theUser.food}₪{" "}
                  </Typography>
                </div>
                <Typography style={{ fontWeight: "bold" }}>
                  وجبة الفطور
                </Typography>
              </div>
            )}
            <div className={classes.div}>
              <Typography
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  fontSize: "1.2vw",
                  fontWeight: "bold",
                  height: "5vh",
                  width: "10vw",
                  marginTop: "1.5vh",
                  textAlign: "center",
                }}
              >
                الصفوف{" "}
              </Typography>
            </div>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={classes.select}
              displayEmpty
              label="ekeke"
              value={0}
              placeholder="الصفوف المتوفرة"
              color="#7840A7"
            >
              <MenuItem value={0} disabled>
                عرض الصفوف المتوفرة
              </MenuItem>
              {AppString.Classes.map((item) => {
                return (
                  <MenuItem
                    value={1}
                    disabled
                    style={{ color: "#000", fontWeight: "bold" }}
                  >
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <div xs={3}></div>
      </Paper>
    </Container>
  );
};

export default withRouter(Profile);
