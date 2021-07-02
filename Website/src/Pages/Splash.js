import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  h1: {
    position: "absolute",
    top: "55%",
    left: "38%",
    color: "#7840A7",
  },
  b: {
    position: "absolute",
    top: "65%",
    left: "46%",
    color: "#7840A7",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "550px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    marginRight: 0,
    paddingRight: 0,
    width: "100%",
    height: "81.5vh",
  },
}));
const Splash = (props) => {
  const classes = useStyles();
  const { history } = props;
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
  return (
    <div style={{ width: "auto" }}>
      <img
        className={classes.image}
        src={require("../Photos/back.jpg").default}
      ></img>
      <h1 className={classes.h1}>أهلاً وسهلاً بكم في موقع روضتي </h1>
      <Button
        variant="contained"
        color="#7840A7"
        className={classes.b}
        onClick={() => handleButtonClick("/CreateK")}
      >
        انضم إلينا
      </Button>
    </div>
  );
};

export default withRouter(Splash);
