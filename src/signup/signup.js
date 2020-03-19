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
    email: "",
    password: "",
    passwordConfirmation: "",
    passwordError: "",
    emailError: "",
    passwordConfirmationError: ""
  };

  validate = () => {
    this.setState({
      passwordError: "",
      emailError: "",
      passwordConfirmationError: ""
    });
    let emailError = "";
    let passwordError = "";
    let passwordConfirmationError = "";

    if (!this.state.email.includes("@") && this.state.email.length < 4) {
      emailError = "Niepoprawny email";
    }

    if (this.state.password.lenght < 5) {
      passwordError = "Za krótkie hasło";
    }

    if (this.state.password !== this.state.passwordConfirmation) {
      passwordConfirmationError = "Hasła nie są jednakowe";
    }

    if (emailError || passwordError || passwordConfirmationError) {
      this.setState({ emailError, passwordError, passwordConfirmationError });
      return false;
    }

    return true;
  };

  submitSignup = e => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
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
              this.setState({
                passwordConfirmationError: "Błąd w rejestracji użytkownika"
              });
            });
        })
        .catch(authError => {
          console.log(authError);
          this.setState({
            passwordConfirmationError: "Błąd w rejestracji użytkownika"
          });
        });
    } else return;
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
            {this.state.emailError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                {this.state.emailError}
              </Typography>
            ) : null}
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">Hasło</InputLabel>
              <Input
                type="password"
                onChange={e => this.userTyping("password", e)}
                id="signup-password-input"
              />
            </FormControl>
            {this.state.passwordError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                {this.state.passwordError}
              </Typography>
            ) : null}
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
            {this.state.passwordConfirmationError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                {this.state.passwordConfirmationError}
              </Typography>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Zarejestruj
            </Button>
          </form>

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
