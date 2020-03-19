const styles = theme => ({
  sendBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray"
    }
  },
  chatTextBoxContainer: {
    width: "100%",
    height: "550px"
  },

  offerForm: {
    width: "100%",
    paddingBottom: theme.spacing(6),
    display: "flex",
    justifyContent: "space-around"
  },
  yourOffer: {
    backgroundColor: "rgba(255, 255, 255, .8)",
    padding: "35px",
    zIndex: "2",
    borderRadius: "15px",
    minWidth: "450px"
  },
  youWant: {
    backgroundColor: "rgba(255, 255, 255, .8)",
    padding: "25px",
    zIndex: "2",
    borderRadius: "15px",
    minWidth: "450px"
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
  }
});

export default styles;
