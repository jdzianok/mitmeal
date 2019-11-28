const styles = theme => ({
  sendBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray"
    }
  },

  chatTextBoxContainer: {
    position: "fixed",
    top: "50px",
    left: "301px",
    boxSizing: "border-box",
    width: "calc(100% - 300px)",
    height: "300px"
  },

  chatTextBox: {
    width: "calc(100% - 25px)"
  },
  offerForm: {
    width: "100%",
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(6),
    display: "flex",
    justifyContent: "space-around"
  },
  submitOffer: {
    marginTop: "20px",
    padding: "10px 20px"
  }
});

export default styles;
