import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const firebase = require("firebase");

class SignupComponent extends Component {
  state = {
    email: null,
    password: null,
    passwordConfirmation: null,
    singupError: ""
  };

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  submitSignup = e => {
    e.preventDefault();
    if (!this.formIsValid()) {
      this.setState({
        singupError: "Passwords do not match!"
      });
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authResponse => {
        const userObj = {
          email: authResponse.user.email
        };
        firebase
          .firestore()
          .collection("users")
          .doc(this.state.email)
          .set(userObj)
          .then(() => {
            this.props.history.push("/dashboard");
          })
          .catch(dbError => {
            console.log(dbError);
            this.setState({ singupError: "Faild to add user" });
          });
      })
      .catch(authError => {
        console.log(authError);
        this.setState({ singupError: "Faild to add user" });
      });
  };

  userTyping = (type, e) => {
    if (type === "email") {
      this.setState({ email: e.target.value });
    } else if (type === "password") {
      this.setState({ password: e.target.value });
    } else if (type === "passwordConfirmation") {
      this.setState({ passwordConfirmation: e.target.value });
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up!
          </Typography>
          <form onSubmit={e => this.submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                onChange={e => this.userTyping("email", e)}
                autoComplete="email"
                autoFocus
                id="signup-email-input"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">
                Create A Password
              </InputLabel>
              <Input
                type="password"
                onChange={e => this.userTyping("password", e)}
                id="signup-password-input"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">
                Confirm Your Password
              </InputLabel>
              <Input
                type="password"
                onChange={e => this.userTyping("passwordConfirmation", e)}
                id="signup-password-confirmation-input"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          {this.state.singupError ? (
            <Typography
              className={classes.errorText}
              component="h5"
              variant="h6"
            >
              {this.state.singupError}
            </Typography>
          ) : null}
          <Typography
            component="h5"
            variant="h6"
            className={classes.hasAccountHeader}
          >
            Already Have An Account?
          </Typography>
          <Link className={classes.logInLink} to="/">
            Log In!
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(SignupComponent);
