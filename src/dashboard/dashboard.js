import React, { Component } from "react";
import ChatListComponent from "../chatlist/chatList";
import { withStyles } from "@material-ui/core";
import ChatViewComponent from "../chatview/chatView";
import ChatTextBoxComponent from "../chattextbox/chatTextBox";
import NewChatComponent from "../newchat/newChat";
import HeaderComponent from "../header/header";
import talerz from "../assets/talerz.svg";
import arrows from "../assets/arrows.svg";
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
      selectedChat: chatIndex,
      newChatFormVisible: false
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
            quantity: offer.howMuchIWant,
            priceWhatIWant: offer.priceWhatIWant
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
    // console.log(chatObj.message);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        messages: [
          {
            hasAccepted: false,
            hasRejected: false,
            myOffer: {
              item: chatObj.message.yourOffer,
              quantity: chatObj.message.quantityOffer,
              price: chatObj.message.priceOffer
            },
            whatIWant: {
              item: chatObj.message.wantedMeal,
              quantity: chatObj.message.howMuchIWant,
              priceWhatIWant: chatObj.message.priceWhatIWant
            },
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
            // console.log(chats);
            await this.setState({
              email: user.email,
              chats: chats
            });
            // console.log(this.state);
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

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <HeaderComponent
          userEmail={this.state.email}
          signOut={this.signOut}
        ></HeaderComponent>
        <ChatListComponent
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          selectedChatIndex={this.state.selectedChat}
        ></ChatListComponent>
        {this.state.selectedChat === null ? (
          <div className={classes.background}>
            <div className={classes.plateContainer}>
              <img src={talerz} alt="talerz" />
            </div>
            <h1
              style={{
                position: "absolute",
                top: "525px",
                left: "50%",
                transform: "translate(-50%)",
                fontSize: 36,
                color: "#2b2d33"
              }}
            >
              {this.state.email === null
                ? null
                : this.capitalizeFirstLetter(this.state.email.split("@")[0])}
            </h1>
            <div
              style={{
                position: "absolute",
                top: "600px",
                left: "50%",
                transform: "translate(-50%)",
                fontSize: "24px",
                width: 900,
                fontWeight: 400,
                textAlign: "center",
                color: "#2b2d33"
              }}
            >
              <p>W tym momencie nie masz żadnej wymiany.</p>
              <p>Wybierz restaurację, aby złożyć ofertę.</p>
            </div>
          </div>
        ) : null}
        {this.state.selectedChat !== null && !this.state.newChatFormVisible ? (
          <div className={classes.chatContainer}>
            <div className={classes.arrowsContainer}>
              <img src={arrows} alt="strzalki" />
            </div>
            {this.state.selectedChat !== null &&
            !this.state.newChatFormVisible ? (
              <ChatTextBoxComponent
                chat={this.state.chats[this.state.selectedChat]}
                user={this.state.email}
                submitMessageFn={this.submitMessage}
                messageReadFn={this.messageRead}
              ></ChatTextBoxComponent>
            ) : null}
            {this.state.newChatFormVisible &&
            this.state.selectedChat === null ? null : (
              <ChatViewComponent
                user={this.state.email}
                chat={this.state.chats[this.state.selectedChat]}
                userHasAcceptedFn={this.userHasAccepted}
                userHasRejectedFn={this.userHasRejected}
              ></ChatViewComponent>
            )}
          </div>
        ) : null}
        {this.state.newChatFormVisible && this.state.selectedChat === null ? (
          <NewChatComponent
            goToChatFn={this.goToChat}
            newChatSubmitFn={this.newChatSubmit}
          ></NewChatComponent>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(DashboardComponent);
