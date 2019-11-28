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
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
const firebase = require("firebase");

class LoginComponent extends Component {
  state = {
    email: null,
    password: null,
    loginError: ""
    // isSignedIn: false
  };

  // uiConfig = {
  //   signInFlow: "popup",
  //   signInOptions: [
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     firebase.auth.FacebookAuthProvider.PROVIDER_ID
  //   ],
  //   callbacks: {
  //     signInSuccess: () => false
  //   }
  // };

  // componentDidMount = () => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     this.setState({ isSignedIn: !!user });
  //     console.log(user);
  //   });
  // };

  submitLogin = e => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        this.setState({
          loginError: "Server error"
        });
        console.log(error);
      });
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
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log In!
          </Typography>
          <form className={classes.form} onSubmit={e => this.submitLogin(e)}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                autoComplete="email"
                id="login-email-input"
                onChange={e => this.userTyping("email", e)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-password-input">
                Enter Your Password
              </InputLabel>
              <Input
                type="password"
                id="login-password-input"
                onChange={e => this.userTyping("password", e)}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
          </form>
          {this.state.loginError ? (
            <Typography
              className={classes.errorText}
              component="h5"
              variant="h6"
            >
              Incorrect Login Information
            </Typography>
          ) : null}

          <Typography
            component="h5"
            variant="h6"
            className={classes.noAccountHeader}
          >
            Don't Have An Account?
          </Typography>
          <Link className={classes.signUpLink} to="/signup">
            Sign Up!
          </Link>
        </Paper>
        {/* <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebase={firebase.auth()}
        /> */}
      </main>
    );
  }
}

export default withStyles(styles)(LoginComponent);
