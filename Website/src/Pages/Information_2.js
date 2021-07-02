import {
  Paper,
  makeStyles,
  Grid,
  div,
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
import React, { useState, useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Icon } from "@material-ui/core";
import { MyContext } from "./Context";
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
    marginLeft: "12vw",
    width: "72vw",
    paddingBottom: "8vh",
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
    width: "50vw",
  },
  radio: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  radiodiv: {
    fontSize: 16,
    marginRight: "-20px",
  },
  table: {
    textAlign: "right",
    direction: "rtl",
    width: "120vw",
    marginLeft: "7vw",
    marginRight: "-3vw",
  },
  cell: {
    width: "7vw",
    paddingRight: "20vw",
    textAlign: "right",
    marginBottom: "-5vh",
  },
  add: {
    width: "8vw",
    borderWidth: 1,
    borderColor: "#84d4a4",
    backgroundColor: "#C6C6C6",
    marginLeft: "18vw",
  },

  div: {
    width: "27vw",
    marginRight: "-14vw",
    height: "7vw",
    fontSize: 16,
    marginBottom: "-70px",
  },
  textField: {
    width: "24vw",

    textAlign: "center",
    marginTop: "-1vw",
    marginRight: "-5vw",
  },
  shekel: {
    marginLeft: "7vw",
    marginBottom: "-1vw",
  },
  button: {
    width: "10vw",
    borderColor: "#84d4a4",
    borderWidth: 1,
    backgroundColor: "#84d4a4",
    marginTop: "-80px",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: "10vw",
  },
  button2: {
    width: "150px",
    borderColor: "#84d4a4",
    borderWidth: 1,
    backgroundColor: "#84d4a4",
    marginBottom: "-3vh",
    fontWeight: "bold",
    fontSize: 16,
  },
  check: {
    marginLeft: "12vw",
    color: "#84d4a4",
  },
  icon: {
    marginLeft: "15px",
  },
  typographyStyles: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: "14vw",
    color: "#7840A7",
  },
}));

function Information_2(props) {
  const [City, setCity] = useState("");
  const [wantBus, setWantBus] = useState("No");

  const classes = useStyles();
  const handleChangeSelect = (event) => {
    setCity(event.target.value);
  };
  const [Buschecked, setBusChecked] = useState(false);

  const handleBusChange = (event) => {
    setBusChecked(event.target.checked);
  };
  const [Foodchecked, setFoodChecked] = useState(false);

  const handleFoodChange = (event) => {
    setFoodChecked(event.target.checked);
  };

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const { history } = props;
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const URLL = "";
  const { updateUser2, rootState } = useContext(MyContext);
  const { theUser } = rootState;
  const initialState = {
    userInfo: {
      k1: theUser.k1,
      k2: theUser.k2,
      place1: theUser.place1,
      place2: theUser.place2,
      bus: theUser.bus,
      food: theUser.food,
      KinderEmail: theUser.KinderEmail,
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);

  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
    console.log(e.target.value);
  };

  const InsertRecord = async (event) => {
    event.preventDefault();
    const data = await updateUser2(state.userInfo);
    console.log(data.success);
    if (data.success) {
      setState({
        ...initialState,
        successMsg: data.message,
      });
      history.push("/Information_3");
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  const [openPopup, setOpenPopup] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.pageContent}>
        <Typography color="primary" className={classes.typographyStyles}>
          تعديــل المعلومات
        </Typography>
        <form className={classes.root}>
          <Grid container>
            <Grid item xs={12} className={classes.table}>
              <TableBody>
                <TableRow className={classes.table}>
                  <TableCell className={classes.cell}>
                    <div className={classes.div}>
                      القسـط الشهري لمرحلة البسـتان
                    </div>
                  </TableCell>

                  <TableCell className={classes.input}>
                    <div className={classes.shekel}>₪</div>
                    <TextField
                      className={classes.textField}
                      name="k1"
                      defaultValue={state.userInfo.k1}
                      onChange={onChangeValue}
                    ></TextField>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.table}>
                  <TableCell className={classes.cell}>
                    <div className={classes.div}>
                      القسـط الشهري لمرحلة التمهيدي
                    </div>
                  </TableCell>
                  <TableCell className={classes.input}>
                    <div className={classes.shekel}>₪</div>

                    <TextField
                      className={classes.textField}
                      name="k2"
                      defaultValue={state.userInfo.k2}
                      onChange={onChangeValue}
                    ></TextField>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.table}>
                  <TableCell className={classes.cell}>
                    <div className={classes.div}>
                      عدد المقاعد المتاحة لمرحلة البستان
                    </div>
                  </TableCell>
                  <TableCell className={classes.input}>
                    <TextField
                      className={classes.textField}
                      name="place1"
                      defaultValue={state.userInfo.place1}
                      onChange={onChangeValue}
                    ></TextField>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.table}>
                  <TableCell className={classes.cell}>
                    <div className={classes.div}>
                      عدد المقاعد المتاحة لمرحلة التمهيدي
                    </div>
                  </TableCell>
                  <TableCell className={classes.input}>
                    <TextField
                      className={classes.textField}
                      name="place2"
                      defaultValue={state.userInfo.place2}
                      onChange={onChangeValue}
                    ></TextField>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.table}>
                  <TableCell className={classes.cell}>
                    <div className={classes.div}>
                      هل خدمة باص المدرسة متوفرة؟
                    </div>
                  </TableCell>
                  <TableCell className={classes.input}>
                    <Checkbox
                      className={classes.check}
                      disabled={false}
                      checked={Buschecked}
                      onChange={handleBusChange}
                      color="#84d4a4"
                    />
                  </TableCell>
                </TableRow>
                {console.log(Buschecked)}
                {Buschecked ? (
                  <TableRow className={classes.table}>
                    <TableCell className={classes.cell}>
                      <div className={classes.div}>تكلفة خدمة باص المدرسة</div>
                    </TableCell>
                    <TableCell className={classes.input}>
                      <div className={classes.shekel}>₪</div>
                      <TextField
                        className={classes.textField}
                        name="bus"
                        defaultValue={state.userInfo.bus}
                        onChange={onChangeValue}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                ) : null}

                <TableRow className={classes.table}>
                  <TableCell className={classes.cell}>
                    <div className={classes.div}>
                      هل خدمة وجبة الفطور متوفرة؟
                    </div>
                  </TableCell>
                  <TableCell className={classes.input}>
                    <Checkbox
                      className={classes.check}
                      checked={Foodchecked}
                      onChange={handleFoodChange}
                      color="#84d4a4"
                    />
                  </TableCell>
                </TableRow>
                {Foodchecked ? (
                  <TableRow className={classes.table}>
                    <TableCell className={classes.cell}>
                      <div className={classes.div}>تكلفة خدمة وجبة الفطور</div>
                    </TableCell>
                    <TableCell className={classes.input}>
                      <div className={classes.shekel}>₪</div>
                      <TextField
                        className={classes.textField}
                        name="food"
                        defaultValue={state.userInfo.food}
                        onChange={onChangeValue}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Grid>
          </Grid>
        </form>
        {errorMsg}
        {successMsg}
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Button
            className={classes.button}
            onClick={InsertRecord}
            style={{ marginLeft: "5vw" }}
          >
            {" "}
            حفــظ التغييرات
          </Button>
          <Button
            className={classes.button2}
            onClick={() => handleButtonClick("/Information_3")}
            style={{ marginLeft: "5vw" }}
          >
            التــالي
          </Button>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default Information_2;
