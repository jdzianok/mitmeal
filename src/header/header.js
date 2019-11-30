import React, { Component } from "react";
import { withStyles, Button } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import styles from "./styles";
import logo from "../assets/logo.svg";
import bell from "../assets/bell.svg";
import settings from "../assets/settings.svg";

class HeaderComponent extends Component {
  state = {
    active: false
  };

  handleShow = () => {
    // document.querySelector("#dropdown").style.display = "block";
    this.setState({ active: !this.state.active });
  };
  render() {
    const { classes, userEmail } = this.props;
    return (
      <div className={classes.headerWrapper}>
        <div className={classes.imgContainer}>
          <img src={logo} alt="logo" />
        </div>
        <div className={classes.user}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="dziobek">
                {/* {
                chat.users
                  .filter(user => user !== this.props.userEmail)[0]
                  .split("")[0]
              } */}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={userEmail === null ? userEmail : userEmail.split("@")[0]}
            />
          </ListItem>
        </div>
        <div className={classes.bell}>
          <img src={bell} alt="bell"></img>
        </div>
        <div className={classes.settings} onClick={this.handleShow}>
          <img src={settings} alt="bell"></img>
          <div
            className={classes.dropdown}
            style={
              this.state.active ? { display: "block" } : { display: "none" }
            }
            id="dropdown"
          >
            <Button
              className={classes.signOutBtn}
              color="primary"
              onClick={this.props.signOut}
              variant="contained"
            >
              Wyloguj
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HeaderComponent);
