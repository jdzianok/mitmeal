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

class LoginComponent extends Component {
  state = {
    email: "",
    password: "",
    loginError: "",
    emailError: ""
  };

  validate = () => {
    this.setState({ emailError: "" });
    let emailError = "";

    if (!this.state.email.includes("@") && this.state.email.length < 4) {
      emailError = "Niepoprawny email";
    }

    if (emailError) {
      this.setState({ emailError });
      return false;
    }

    return true;
  };

  submitLogin = e => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.props.history.push("/dashboard");
        })
        .catch(error => {
          this.setState({
            loginError: "Niepoprawne hasło lub login"
          });
          console.log(error);
        });
    } else return;
  };

  userTyping = (type, e) => {
    if (type === "email") {
      this.setState({
        email: e.target.value
      });
    } else if (type === "password") {
      this.setState({
        password: e.target.value
      });
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
            Zaloguj się
          </Typography>
          <form className={classes.form} onSubmit={e => this.submitLogin(e)}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-email-input">Adres e-mail</InputLabel>
              <Input
                autoComplete="email"
                id="login-email-input"
                onChange={e => this.userTyping("email", e)}
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
              <InputLabel htmlFor="login-password-input">Hasło</InputLabel>
              <Input
                type="password"
                id="login-password-input"
                onChange={e => this.userTyping("password", e)}
              />
            </FormControl>
            {this.state.loginError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                {this.state.loginError}
              </Typography>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Zaloguj
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
            className={classes.noAccountHeader}
          >
            Nie masz konta?
          </Typography>
          <Link
            style={{
              color: "#3040cb",
              fontSize: 16,
              fontWeight: 600
            }}
            className={classes.signUpLink}
            to="/signup"
          >
            Zarejestruj się
          </Link>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(LoginComponent);
