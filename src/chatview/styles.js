const styles = theme => ({
  content: {
    height: "calc(100vh - 550px - 70px)",
    minHeight: "calc(100vh - 550px - 70px)",

    // overflow: "auto",
    // padding: "25px",
    // marginLeft: "350px",
    // marginTop: "620px",
    boxSizing: "border-box",
    // overflowY: "scroll",
    width: "100%",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  scroll: {
    flex: 8,
    overflowY: "scroll",
    width: "100%",
    height: "calc(100vh - 550px - 70px)"
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

  message: {
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#03396c",
    color: "white",
    width: "70%",
    borderRadius: "10px"
  }
});

export default styles;
