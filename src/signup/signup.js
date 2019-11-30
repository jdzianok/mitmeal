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
import background from "../assets/background_login.svg";
import logo from "../assets/logo.svg";
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
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover"
        }}
      >
        <div className={classes.headerWrapper}>
          <div className={classes.imgContainer}>
            <img src={logo} alt="logo" />
          </div>
        </div>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography
            style={{ fontSize: "24px", fontWeight: 600 }}
            component="h1"
            variant="h5"
          >
            Zarejestruj się
          </Typography>
          <form onSubmit={e => this.submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input">Adres e-mail</InputLabel>
              <Input
                onChange={e => this.userTyping("email", e)}
                autoComplete="email"
                autoFocus
                id="signup-email-input"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">Hasło</InputLabel>
              <Input
                type="password"
                onChange={e => this.userTyping("password", e)}
                id="signup-password-input"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">
                Powtórz hasło
              </InputLabel>
              <Input
                type="password"
                onChange={e => this.userTyping("passwordConfirmation", e)}
                id="signup-password-confirmation-input"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Zarejestruj
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
            style={{
              marginBottom: 8,
              fontSize: 18,
              fontWeight: 600,
              color: "#2b2d33"
            }}
            component="h5"
            variant="h6"
            className={classes.hasAccountHeader}
          >
            Masz już konto?
          </Typography>
          <Link
            className={classes.logInLink}
            style={{
              color: "#3040cb",
              fontSize: 16,
              fontWeight: 600
            }}
            to="/"
          >
            Zaloguj się
          </Link>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SignupComponent);
