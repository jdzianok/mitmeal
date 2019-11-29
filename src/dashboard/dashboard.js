import React, { Component } from "react";
import ChatListComponent from "../chatlist/chatList";
import { Button, withStyles } from "@material-ui/core";
import ChatViewComponent from "../chatview/chatView";
import ChatTextBoxComponent from "../chattextbox/chatTextBox";
import NewChatComponent from "../newchat/newChat";
import styles from "./styles";
const firebase = require("firebase");

class DashboardComponent extends Component {
  state = {
    selectedChat: null,
    newChatFormVisible: false,
    email: null,
    chats: []
  };

  newChatBtnClicked = () => {
    this.setState({
      newChatFormVisible: true,
      selectedChat: null
    });
  };

  selectChat = async chatIndex => {
    await this.setState({
      selectedChat: chatIndex
    });

    this.messageRead();
  };

  signOut = () => firebase.auth().signOut();

  buildDocKey = friend => {
    return [this.state.email, friend].sort().join(":");
  };

  submitMessage = offer => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        user => user !== this.state.email
      )[0]
    );

    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          hasAccepted: false,
          hasRejected: false,
          myOffer: {
            item: offer.yourOffer,
            quantity: offer.quantityOffer,
            price: offer.priceOffer
          },
          whatIWant: {
            item: offer.wantedMeal,
            quantity: offer.howMuchIWant
          }
        }),
        receiverHasRead: false
      });
  };

  clickedChatWhereNotSender = chatIndex =>
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.state.email;

  messageRead = () => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        user => user !== this.state.email
      )[0]
    );

    if (this.clickedChatWhereNotSender(this.state.selectedChat)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log("message where the user was the sender");
    }
  };

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find(chat =>
      usersInChat.every(user => chat.users.includes(user))
    );
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  };

  newChatSubmit = async chatObj => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        messages: [
          {
            message: chatObj.message,
            sender: this.state.email
          }
        ],
        users: [this.state.email, chatObj.sendTo],
        receiverHasRead: false
      });
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) this.props.history.push("/");
      else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", user.email)
          .onSnapshot(async result => {
            const chats = result.docs.map(doc => doc.data());
            console.log(chats);
            await this.setState({
              email: user.email,
              chats: chats
            });
            console.log(this.state);
          });
      }
    });
  };

  userHasAccepted = index => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        user => user !== this.state.email
      )[0]
    );

    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("error");
        } else {
          let document = doc.data();
          document.messages[index].hasAccepted = true;

          firebase
            .firestore()
            .collection("chats")
            .doc(docKey)
            .update(document);
        }
      });
  };

  userHasRejected = index => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        user => user !== this.state.email
      )[0]
    );

    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("error");
        } else {
          let document = doc.data();
          document.messages[index].hasRejected = true;

          firebase
            .firestore()
            .collection("chats")
            .doc(docKey)
            .update(document);
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ChatListComponent
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          selectedChatIndex={this.state.selectedChat}
        ></ChatListComponent>
        {this.state.selectedChat !== null && !this.state.newChatFormVisible ? (
          <ChatTextBoxComponent
            submitMessageFn={this.submitMessage}
            messageReadFn={this.messageRead}
          ></ChatTextBoxComponent>
        ) : null}
        {this.state.newChatFormVisible ? null : (
          <ChatViewComponent
            user={this.state.email}
            chat={this.state.chats[this.state.selectedChat]}
            userHasAcceptedFn={this.userHasAccepted}
            userHasRejectedFn={this.userHasRejected}
          ></ChatViewComponent>
        )}

        {this.state.newChatFormVisible ? (
          <NewChatComponent
            goToChatFn={this.goToChat}
            newChatSubmitFn={this.newChatSubmit}
          ></NewChatComponent>
        ) : null}
        <Button className={classes.signOutBtn} onClick={this.signOut}>
          Sign Out
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardComponent);
