const styles = theme => ({
  chatTextBoxContainer: {
    position: "absolute",
    top: "70px",
    left: "350px",
    width: "calc(100% - 350px)",
    height: "calc(100vh - 70px)",
    backgroundImage: "linear-gradient(to top, #e4ecff, #eff4ff)"
  },
  arrowsContainer: {
    position: "absolute",
    top: "200px",
    left: "50%",
    transform: "translate(-50%)"
  },

  offerForm: {
    width: "100%",
    marginTop: "190px",
    paddingBottom: theme.spacing(6),
    display: "flex",
    justifyContent: "space-around"
  },
  yourOffer: {
    backgroundColor: "rgba(255, 255, 255, .8)",
    padding: "35px",
    zIndex: "2",
    borderRadius: "15px"
  },
  newFriend: {
    position: "absolute",
    top: "50px",
    left: "50%",
    transform: "translate(-50%)",
    backgroundColor: "rgba(255, 255, 255, .8)",
    padding: "35px",
    zIndex: "2",
    borderRadius: "15px"
  },

  youWant: {
    backgroundColor: "rgba(255, 255, 255, .8)",
    padding: "25px",
    zIndex: "2",
    borderRadius: "15px"
  },
  priceQty: {
    display: "flex"
  },
  submitOffer: {
    display: "block",
    position: "absolute",
    top: "470px",
    left: "50%",
    transform: "translate(-50%)",
    padding: "10px 20px",
    borderRadius: "30px",
    height: "50px",
    fontSize: "14px",
    letterSpacing: "2px",
    backgroundColor: "#3040cb",
    color: "#fff",
    width: "280px"
  },
  headerEx: {
    fontWeight: "400",
    padding: "70px 0 50px 5%",
    fontSize: "40px"
  },
  spanUser: {
    fontWeight: "600"
  },

  input: {
    width: 250
  }
});

export default styles;
