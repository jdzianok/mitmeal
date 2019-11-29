const styles = theme => ({
  content: {
    height: "calc(100vh - 350px)",

    overflow: "auto",
    padding: "25px",
    marginLeft: "300px",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "350px",
    width: "calc(100% - 300px)",
    position: "absolute",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  // overflowWrapper: {
  //   minHeight: "0"
  // },
  acceptBtn: {
    padding: "10px 20px",
    margin: "10px 20px",
    backgroundColor: "green"
  },
  rejectBtn: {
    padding: "10px 20px",
    margin: "10px 20px",
    backgroundColor: "red"
  },

  userSent: {
    // float: "right",
    // clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#03396c",
    color: "white",
    width: "70%",
    borderRadius: "10px"
  },

  friendSent: {
    // float: "left",
    // clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#6497b1",
    color: "white",
    width: "70%",
    borderRadius: "10px"
  },

  chatHeader: {
    width: "calc(100% - 301px)",
    height: "50px",
    backgroundColor: "#344195",
    position: "fixed",
    marginLeft: "301px",
    fontSize: "18px",
    textAlign: "center",
    color: "white",
    paddingTop: "13px",
    boxSizing: "border-box"
  }
});

export default styles;
