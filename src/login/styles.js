const styles = theme => ({
  headerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "70px"
  },
  imgContainer: {
    marginLeft: "25px",
    width: "90%"
  },
  paper: {
    position: "absolute",
    top: "calc(50% + 70px)",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 60px",
    width: "400px",
    height: "500px",
    borderRadius: "20px",
    backgroundColor: "rgba(255,255,255, 0.9)"
  },
  form: {
    width: "100%",
    marginTop: "10px"
  },
  submit: {
    margin: "60px auto 20px auto",
    padding: "10px 60px",
    display: "block",
    borderRadius: "30px",
    letterSpacing: "1.8"
  },
  noAccountHeader: {
    width: "100%",
    marginTop: 40
  },
  signUpLink: {
    width: "100%",
    textDecoration: "none",
    color: "#303f9f",
    fontWeight: "bolder"
  },
  errorText: {
    color: "red",
    textAlign: "center"
  }
});

export default styles;
