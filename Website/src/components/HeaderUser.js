import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Box from "@material-ui/core/Box";
import { MyContext } from "../Pages/Context";

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
  typographyStyles: {
    margin: theme.spacing(1),
    paddingBlock: theme.spacing(1),
    height: "7vh",
    color: "#fff",
    fontSize: 20,
    marginRight: "5vw",
    backgroundColor: "#7840A7",
  },
  typographyStyles1: {
    margin: theme.spacing(1),
    paddingBlock: theme.spacing(1),
    height: "7vh",
    backgroundColor: "#7840A7",
    color: "#fff",
    marginLeft: "8vw",
  },
  barStyle: {
    backgroundColor: "#84d4a4",
    height: "13vh",
  },
}));

const HeaderUser = (props) => {
  const { history } = props;
  const classes = useStyles();
  const { rootState, logoutUser } = useContext(MyContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleLgout = () => {
    history.push("/Login");
  };
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className={classes.barStyle} item xs={12}>
        <Toolbar>
          <Box display="flex" flexGrow={1} style={{ marginLeft: 60 }}>
            <IconButton
              color="primary"
              onClick={(handleLgout, logoutUser)}
              className={classes.typographyStyles1}
            >
              <p style={{ fontSize: 16 }}>تسجيل الخروج</p>
            </IconButton>
          </Box>{" "}
          <Button
            style={{ marginRight: "3vw" }}
            variant="contained"
            color="primary"
            onClick={() => handleButtonClick("/Messages")}
            className={classes.typographyStyles}
          >
            الرسائل
          </Button>
          <Button
            onFocus={true}
            variant="contained"
            onClick={() => handleButtonClick("/Profile")}
            className={classes.typographyStyles}
          >
            الصفحة الشـخصية
          </Button>
          <Typography style={{ marginRight: 90 }}>
            <img
              src={require("../Photos/R.png").default}
              alt="image"
              style={{ width: "12vw", height: "15vh" }}
            />
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default withRouter(HeaderUser);
