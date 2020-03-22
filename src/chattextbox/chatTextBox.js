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

const initialState = {
  yourOffer: "",
  quantityOffer: "",
  priceOffer: "",
  wantedMeal: "",
  howMuchIWant: "",
  priceWhatIWant: ""
};
class ChatTextBoxComponent extends Component {
  state = initialState;

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
    }
  };

  submitMessage = e => {
    e.preventDefault();
    this.props.submitMessageFn(this.state);
    this.setState(initialState);
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
    const { classes, user, chat } = this.props;
    return (
      <div className={classes.chatTextBoxContainer}>
        <h1 className={classes.headerEx}>
          Twoja wymiana z{" "}
          {chat !== undefined ? (
            <span className={classes.spanUser}>
              {this.capitalizeFirstLetter(
                chat.users.filter(usr => usr !== user)[0].split("@")[0]
              )}
            </span>
          ) : null}
        </h1>
        <form
          onSubmit={e => this.submitMessage(e)}
          className={classes.offerForm}
        >
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
                autoFocus
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
                  type="number"
                  id="price"
                  value={priceOffer}
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

export default withStyles(styles)(ChatTextBoxComponent);
