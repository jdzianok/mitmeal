import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

class HeaderComponent extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.imgContainer}>
          <img src="./assets/logo.svg" alt="logo" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HeaderComponent);
