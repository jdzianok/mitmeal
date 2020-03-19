const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 70px)",
    position: "absolute",
    left: "0",
    width: "350px"
  },
  search: {
    width: "100%",
    borderBottom: "1px solid #d8e3fa"
  },
  listItem: {
    cursor: "pointer",
    marginLeft: "50px",
    marginBottom: "10px",
    width: "200px",
    "&$selected:hover": {
      backgroundColor: "rgba(0, 0, 0, 0)"
    }
  },
  newChatBtn: {
    borderRadius: "30px",
    margin: "0 0 35px 35px",
    height: "50px",
    fontSize: "14px",
    letterSpacing: "2px",
    backgroundColor: "#3040cb",
    color: "#fff",
    width: "280px"
  },
  listItemContainer: {
    paddingTop: 0,
    paddingBottom: "20px",
    borderBottom: "1px solid #d8e3fa"
  },

  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "15px",
    right: "10px"
  },
  textField: {
    margin: "35px",

    width: "280px",
    backgroundColor: "#eff4ff",
    borderRadius: "30px",
    [`& fieldset`]: {
      borderRadius: "30px",
      color: "#3040cb",
      paddingLeft: "20px"
    }
  },
  lastExchange: {
    display: "flex",
    margin: "25px 111px 15px 35px",
    width: "250px"
  },
  paragraph: {
    color: "#686868",
    textTransform: "uppercase",
    letterSpacing: "1.4px",
    marginLeft: "10px",
    fontSize: "12px"
  },
  ListItemText: {
    color: "#454851",
    fontSize: "14px"
  }
});

export default styles;
