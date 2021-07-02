import { Grid, Button, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";

class Footer extends Component {
  render() {
    const { classes } = this.props;
    const currentYear = new Date().getFullYear();
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Typography
            className={classes.white}
            variant="subheading"
            component={"span"}
          >
            {currentYear} جميع الحقوق محفوظة ©
          </Typography>
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    // marginTop: 20,
    backgroundColor: "#7840A7",
    height: "6vh",
    overflowX: "hidden",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    marginButtom: 0,
    paddingTop: "1.5vh",
    justifyContent: "center",
  },

  white: {
    color: "#ffffff",
  },
});

export default withStyles(styles)(Footer);
