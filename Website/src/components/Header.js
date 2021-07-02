import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Box from "@material-ui/core/Box";

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
    backgroundColor: "#7840A7",
  },
  barStyle: {
    backgroundColor: "#84d4a4",
    height: "13vh",
  },
}));

const Header = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className={classes.barStyle} item xs={12}>
        <Toolbar>
          <Box display="flex" flexGrow={1} style={{ marginLeft: 60 }}>
            <Button
              variant="contained"
              color="#7840A7"
              onClick={() => handleButtonClick("/CreateK")}
              className={classes.typographyStyles}
            >
              إنشاء حساب جديد
            </Button>
            <Button
              variant="contained"
              color="#7840A7"
              onClick={() => handleButtonClick("/Login")}
              className={classes.typographyStyles}
            >
              تسجيل الدخول
            </Button>
          </Box>
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

export default withRouter(Header);
