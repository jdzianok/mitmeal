const styles = theme => ({
  content: {
    height: "calc(100vh - 550px - 70px)",
    minHeight: "calc(100vh - 550px - 70px)",
    boxSizing: "border-box",
    overflowY: "scroll",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  acceptBtn: {
    width: "121px",
    height: "32px",
    borderRadius: "200px",
    border: "solid 1px #00c1db",
    backgroundColor: "rgba(0, 193, 219, 0.16)",
    color: "#00a1b7",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    marginRight: "16px"
  },
  rejectBtn: {
    width: "102px",
    height: "32px",
    borderRadius: "200px",
    border: "solid 1px #3040cb",
    textTransform: "uppercase",
    color: "#3040cb",
    letterSpacing: "1.2px"
  },

  message: {
    display: "flex",
    minHeight: "160px",
    minWidth: "840px",
    margin: "20px 0",
    backgroundColor: "#fff",
    width: "50%",
    borderRadius: "20px"
  },
  left: {
    width: "50%",
    padding: "30px 20px 20px 30px",
    display: "flex",
    borderRight: "1px solid #d8e3fa"
  },
  right: {
    padding: "30px 0 0 30px",
    width: "50%"
  },
  icon: {
    margin: "2px 30px 0 0"
  },
  firstP: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "15px",
    lineHeight: "24px"
  },
  secondP: {
    color: "#686868",
    lineHeight: "21px"
  },
  thirdP: {
    fontWeight: 600,
    fontSize: "16px",
    marginBottom: "17px"
  },
  fourthP: {
    marginLeft: 10
  },

  offerExchange: {
    display: "flex",
    fontSize: "16px",
    marginBottom: "10px"
  }
});

export default styles;
