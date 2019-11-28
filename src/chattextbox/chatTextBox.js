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

class ChatTextBoxComponent extends Component {
  state = {
    yourOffer: null,
    quantityOffer: null,
    priceOffer: null,
    wantedMeal: null,
    howMuchIWant: null
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
    }
  };

  submitMessage = e => {
    e.preventDefault();
    this.props.submitMessageFn(this.state);
    // document.getElementById("chattextbox").value = "";
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.chatTextBoxContainer}>
        <form
          onSubmit={e => this.submitMessage(e)}
          className={classes.offerForm}
        >
          <div className={classes.yourOffer}>
            <Typography component="h1" variant="h5">
              What Do You Offer?
            </Typography>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="what-i-offer">Enter Your Offer</InputLabel>
              <Input
                onChange={e => this.userTyping("yourOffer", e)}
                type="text"
                autoFocus
                id="what-i-offer"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="how-much-i-offer">Enter Quantity</InputLabel>
              <Input
                onChange={e => this.userTyping("quantityOffer", e)}
                type="number"
                id="how-much-i-offer"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="price">Enter Price</InputLabel>
              <Input
                onChange={e => this.userTyping("priceOffer", e)}
                type="number"
                id="price"
              />
            </FormControl>
          </div>
          <div className={classes.youWant}>
            <Typography component="h1" variant="h5">
              What Do You Want In Exchange?
            </Typography>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="what-i-want">
                Enter Your Wanted Meal
              </InputLabel>
              <Input
                onChange={e => this.userTyping("wantedMeal", e)}
                type="text"
                id="what-i-want"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="how-much-do-i-want">
                Enter Quantity
              </InputLabel>
              <Input
                onChange={e => this.userTyping("howMuchIWant", e)}
                type="number"
                id="how-much-do-i-want"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitOffer}
            >
              Submit Your Offer
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(ChatTextBoxComponent);
