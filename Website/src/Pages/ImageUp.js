import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  TextField,
  MenuItem,
  Select,
  Button,
  Box,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { AppString } from "./Const";
import { Apps } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
    width: "40vw",
  },
  dialogTitle: {
    marginLeft: "350px",
  },

  dialog: {
    flexDirection: "column",
  },
  Button: {
    width: "12vw",
    backgroundColor: "#7840A7",

    height: "6vh",
    marginTop: "3vh",
    marginLeft: "11vw",
  },
  ButtonRed: {
    width: "12vw",
    backgroundColor: "#b31919",

    height: "6vh",
    marginTop: "3vh",
  },
  input: {
    width: "30vw",
    margin: theme.spacing(1),
    textAlign: "right",
    marginLeft: "2vw",
    direction: "rtl",
  },
  text: {
    textAlign: "right",
    marginLeft: "4vw",
    height: "6vh",
    fontSize: "1.3vw",
    width: "28vw",
    paddingRight: "1vw",
    paddingTop: "1vh",
    fontWeight: "bold",
    backgroundColor: "#e5e5e5",
    borderRadius: 7,
  },
  text1: {
    textAlign: "right",
    marginLeft: "4vw",
    height: "6vh",
    fontSize: "1.3vw",
    width: "28vw",
    paddingRight: "1vw",
    paddingTop: "1vh",
    fontWeight: "bold",
    backgroundColor: "#e5e5e5",
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  all: {
    width: "70%",
    marginLeft: "200px",
  },
  dialogTitle: {
    fontSize: "1.4vw",
    textAlign: "right",
    paddingRight: "5vw",
    backgroundColor: "#84d4a4",
    width: "100%",
    height: "100%",
  },
}));

export default function ImageUp(props) {
  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    item,
    accept,
    setAccept,
    history,
  } = props;
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  return (
    <Dialog open={openPopup} maxWidth="50%">
      <Button
        style={{
          position: "absolute",
          top: "4vh",
          left: "1.5vw",
          width: "1.5vw",
        }}
        onClick={() => {
          setOpenPopup(false);
        }}
      >
        <CancelIcon
          style={{ position: "absolute", right: "4vw", bottom: "2vh" }}
          color="white"
        />
      </Button>
      <DialogContent dividers>
        <img
          src={AppString.openImage}
          style={{ width: "40vw", height: "55vh" }}
        />
      </DialogContent>
    </Dialog>
  );
}
