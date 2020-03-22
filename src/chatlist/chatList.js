import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import styles from "./styles";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import lastExchange from "../assets/lastExchange.svg";
import near from "../assets/wOkolicy.svg";
import dinette from "../assets/dinette.png";
import moa from "../assets/moa.png";
import najadacze from "../assets/najadacze.png";
import osiemMisek from "../assets/osiemMisek.png";
import sushiCorner from "../assets/sushiCorner.png";
import hoshi from "../assets/hoshi.png";
import pasibus from "../assets/pasibus.png";
import vaffanapoli from "../assets/vaffanapoli.png";
import michal from "../assets/michal.png";

class ChatListComponent extends Component {
  state = {
    search: ""
  };

  handleSearch = e => {
    this.setState({
      search: e.target.value
    });
  };

  newChat = () => {
    this.props.newChatBtnFn();
  };

  selectChat = index => {
    this.props.selectChatFn(index);
  };

  userIsSender = chat => {
    return (
      chat.messages[chat.messages.length - 1].sender === this.props.userEmail
    );
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const { classes } = this.props;

    const chatList = this.props.chats.map((chat, index) => (
      <div key={index}>
        <ListItem
          onClick={() => this.selectChat(index)}
          className={classes.listItem}
        >
          <ListItemAvatar>
            <Avatar
              src={
                chat.users
                  .filter(user => user !== this.props.userEmail)[0]
                  .split("@")[0] === "pasibus"
                  ? pasibus
                  : chat.users
                      .filter(user => user !== this.props.userEmail)[0]
                      .split("@")[0] === "vaffanapoli"
                  ? vaffanapoli
                  : chat.users
                      .filter(user => user !== this.props.userEmail)[0]
                      .split("@")[0] === "hoshi"
                  ? hoshi
                  : chat.users
                      .filter(user => user !== this.props.userEmail)[0]
                      .split("@")[0] === "michal"
                  ? michal
                  : null
              }
              alt="dziobek"
            >
              {this.capitalizeFirstLetter(
                chat.users
                  .filter(user => user !== this.props.userEmail)[0]
                  .split("")[0]
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText className={classes.ListItemText}>
            {this.capitalizeFirstLetter(
              chat.users
                .filter(user => user !== this.props.userEmail)[0]
                .split("@")[0]
            )}
          </ListItemText>
          {chat.receiverHasRead === false && !this.userIsSender(chat) ? (
            <ListItemIcon>
              <NotificationImportant
                className={classes.unreadMessage}
              ></NotificationImportant>
            </ListItemIcon>
          ) : null}
        </ListItem>
      </div>
    ));

    if (this.props.chats.length > 0) {
      return (
        <main className={classes.root}>
          <div className={classes.search}>
            <TextField
              id="outlined-search"
              label="Znajdź lokal"
              type="search"
              className={classes.textField}
              variant="outlined"
              onChange={e => this.handleSearch(e)}
            ></TextField>
            <Button
              className={classes.newChatBtn}
              onClick={this.newChat}
              variant="contained"
            >
              Nowa wiadomość
            </Button>
          </div>
          <div className={classes.lastExchange}>
            <img src={lastExchange} alt="last" />
            <p className={classes.paragraph}>Ostatnie wymiany</p>
          </div>
          <List className={classes.listItemContainer}>{chatList}</List>
          <div className={classes.nearYou}>
            <div className={classes.lastExchange}>
              <img src={near} alt="last" />
              <p className={classes.paragraph}>w twojej okolicy</p>
            </div>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar src={dinette} alt="dziobek"></Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.ListItemText}>
                Dinette
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar src={moa} alt="dziobek"></Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.ListItemText}>
                MoaBurger
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar src={osiemMisek} alt="dziobek"></Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.ListItemText}>
                Osiem Misek
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar src={sushiCorner} alt="dziobek"></Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.ListItemText}>
                Sushi Corner
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar src={najadacze} alt="dziobek"></Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.ListItemText}>
                Najadacze
              </ListItemText>
            </ListItem>
          </div>
        </main>
      );
    } else {
      return (
        <main className={classes.root}>
          <div className={classes.search}>
            <TextField
              id="outlined-search"
              label="Znajdź lokal"
              type="search"
              className={classes.textField}
              variant="outlined"
              onChange={e => this.handleSearch(e)}
            ></TextField>
            <Button
              className={classes.newChatBtn}
              onClick={this.newChat}
              variant="contained"
            >
              Nowa wiadomość
            </Button>
          </div>
          <List></List>
          <div className={classes.nearYou}>
            <div className={classes.lastExchange}>
              <img src={near} alt="last" />
              <p className={classes.paragraph}>w twojej okolicy</p>
            </div>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar src={dinette} alt="dziobek"></Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.ListItemText}>
                Dinette
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar src={moa} alt="dziobek"></Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.ListItemText}>
                MoaBurger
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar src={osiemMisek} alt="dziobek"></Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.ListItemText}>
                Osiem Misek
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar src={sushiCorner} alt="dziobek"></Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.ListItemText}>
                Sushi Corner
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Avatar src={najadacze} alt="dziobek"></Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.ListItemText}>
                Najadacze
              </ListItemText>
            </ListItem>
          </div>
        </main>
      );
    }
  }
}

export default withStyles(styles)(ChatListComponent);
