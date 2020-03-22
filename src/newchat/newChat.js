import React, { Component } from "react";
import {
  withStyles,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button
} from "@material-ui/core";
import styles from "./styles";
import arrows from "../assets/arrows.svg";

const firebase = require("firebase");

class NewChatComponent extends Component {
  state = {
    username: "",
    yourOffer: "",
    quantityOffer: "",
    priceOffer: "",
    wantedMeal: "",
    howMuchIWant: "",
    priceWhatIWant: ""
  };

  userTyping = (type, e) => {
    if (type === "yourOffer") {
      this.setState({ yourOffer: e.target.value });
    } else if (type === "quantityOffer") {
      this.setState({ quantityOffer: e.target.value });
    } else if (type === "priceOffer") {
      this.setState({ priceOffer: e.target.value });
    } else if (type === "wantedMeal") {
      this.setState({ wantedMeal: e.target.value });
    } else if (type === "howMuchIWant") {
      this.setState({ howMuchIWant: e.target.value });
    } else if (type === "priceWhatIWant") {
      this.setState({ priceWhatIWant: e.target.value });
    } else if (type === "username") {
      this.setState({ username: e.target.value });
    }
  };

  submitNewChat = async e => {
    e.preventDefault();
    const userExists = await this.userExists();
    if (userExists) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createChat();
    }
  };

  createChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.username,
      message: this.state
    });
  };

  goToChat = () => {
    this.props.goToChatFn(this.buildDocKey(), this.state);
  };

  buildDocKey = () => {
    return [firebase.auth().currentUser.email, this.state.username]
      .sort()
      .join(":");
  };

  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get();
    return chat.exists;
  };

  userExists = async () => {
    const userSnapshot = await firebase
      .firestore()
      .collection("users")
      .get();
    const exists = userSnapshot.docs
      .map(doc => doc.data().email)
      .includes(this.state.username);
    this.setState({ serverError: !exists });
    return exists;
  };

  render() {
    const {
      yourOffer,
      quantityOffer,
      priceOffer,
      wantedMeal,
      howMuchIWant,
      priceWhatIWant
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.chatTextBoxContainer}>
        <div className={classes.arrowsContainer}>
          <img src={arrows} alt="strzalki" />
        </div>

        <form
          onSubmit={e => this.submitNewChat(e)}
          className={classes.offerForm}
        >
          <div className={classes.newFriend}>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="new-chat-username">
                Wpisz email nowej restauracji
              </InputLabel>
              <Input
                required
                autoFocus
                onChange={e => this.userTyping("username", e)}
                id="new-chat-username"
              ></Input>
            </FormControl>
          </div>
          <div className={classes.yourOffer}>
            <Typography component="h1" variant="h5">
              Co oferujesz?
            </Typography>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="what-i-offer">Nazwa dania</InputLabel>
              <Input
                onChange={e => this.userTyping("yourOffer", e)}
                value={yourOffer}
                type="text"
                id="what-i-offer"
              />
            </FormControl>
            <div className={classes.priceQty}>
              <FormControl required margin="normal">
                <InputLabel htmlFor="how-much-i-offer">Ilość</InputLabel>
                <Input
                  onChange={e => this.userTyping("quantityOffer", e)}
                  value={quantityOffer}
                  type="number"
                  id="how-much-i-offer"
                  style={{ marginRight: "40px" }}
                />
              </FormControl>
              <FormControl required margin="normal">
                <InputLabel htmlFor="price">Wartość zamówienia</InputLabel>
                <Input
                  onChange={e => this.userTyping("priceOffer", e)}
                  value={priceOffer}
                  type="number"
                  id="price"
                />
              </FormControl>
            </div>
          </div>
          <div className={classes.youWant}>
            <Typography component="h1" variant="h5">
              Co chcesz w zamian?
            </Typography>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="what-i-want">Nazwa dania</InputLabel>
              <Input
                onChange={e => this.userTyping("wantedMeal", e)}
                value={wantedMeal}
                type="text"
                id="what-i-want"
              />
            </FormControl>
            <div className={classes.priceQty}>
              <FormControl required margin="normal">
                <InputLabel htmlFor="how-much-do-i-want">Ilość</InputLabel>
                <Input
                  onChange={e => this.userTyping("howMuchIWant", e)}
                  value={howMuchIWant}
                  type="number"
                  id="how-much-do-i-want"
                  style={{ marginRight: "40px" }}
                />
              </FormControl>
              <FormControl required margin="normal">
                <InputLabel htmlFor="priceWhatIWant">
                  Wartość zamówienia
                </InputLabel>
                <Input
                  onChange={e => this.userTyping("priceWhatIWant", e)}
                  value={priceWhatIWant}
                  type="number"
                  id="priceWhatIWant"
                />
              </FormControl>
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitOffer}
          >
            wyślij ofertę
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(NewChatComponent);
