const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black"
  },
  listItem: {
    cursor: "pointer"
  },
  newChatBtn: {
    borderRadius: "0px",
    height: "50px",
    fontSize: "16px"
  },
  listItemContainer: {
    paddingTop: 0
  },
  welcomeSign: {
    textAlign: "center",
    padding: "10px 0",
    "& span": {
      fontWeight: 700
    }
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px"
  }
});

export default styles;
