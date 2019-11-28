import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";

class ChatListComponent extends Component {
  newChat = () => {
    this.props.newChatBtnFn();
  };

  selectChat = index => {
    this.props.selectChatFn(index);
  };

  userIsSender = chat => {
    console.log(chat);
    return (
      chat.messages[chat.messages.length - 1].sender === this.props.userEmail
    );
  };

  render() {
    const { classes, userEmail } = this.props;
    const chatList = this.props.chats.map((chat, index) => (
      <div key={index}>
        <ListItem
          onClick={() => this.selectChat(index)}
          className={classes.listItem}
          selected={this.props.selectedChatIndex === index}
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar alt="dziobek">
              {
                chat.users
                  .filter(user => user !== this.props.userEmail)[0]
                  .split("")[0]
              }
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              chat.users.filter(user => user !== this.props.userEmail)[0]
            }
            secondary={
              <React.Fragment>
                <Typography component="span" color="textPrimary">
                  {/* {chat.messages[chat.messages.length - 1].message.substring(
                    0,
                    30
                  ) + "..."} */}
                </Typography>
              </React.Fragment>
            }
          />
          {chat.receiverHasRead === false && !this.userIsSender(chat) ? (
            <ListItemIcon>
              <NotificationImportant
                className={classes.unreadMessage}
              ></NotificationImportant>
            </ListItemIcon>
          ) : null}
        </ListItem>
        <Divider></Divider>
      </div>
    ));

    if (this.props.chats.length > 0) {
      return (
        <main className={classes.root}>
          <Typography
            component="h1"
            variant="h5"
            className={classes.welcomeSign}
          >
            Witaj <span>{userEmail.split("@")[0]}</span>!
          </Typography>
          <Button
            className={classes.newChatBtn}
            color="primary"
            fullWidth
            onClick={this.newChat}
            variant="contained"
          >
            New Message
          </Button>
          <List className={classes.listItemContainer}>{chatList}</List>
        </main>
      );
    } else {
      return (
        <main className={classes.root}>
          <Button
            className={classes.newChatBtn}
            color="primary"
            fullWidth
            onClick={this.newChat}
            variant="contained"
          >
            New Message
          </Button>
          <List></List>
        </main>
      );
    }
  }
}

export default withStyles(styles)(ChatListComponent);
