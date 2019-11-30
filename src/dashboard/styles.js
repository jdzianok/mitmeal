const styles = theme => ({
  signOutBtn: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    width: "300px",
    borderRadius: "0px",
    backgroundColor: "#227092",
    height: "35px",
    boxShadow: "0px 0px 2px black",
    color: "white"
  },
  wrapper: {
    height: "100vh",
    minWidth: "1024px",
    position: "relative"
  },
  background: {
    position: "absolute",
    top: "70px",
    left: "350px",
    width: "calc(100% - 350px)",
    height: "calc(100% - 70px)",
    backgroundImage: "linear-gradient(to top, #e4ecff, #eff4ff)"
  },
  plateContainer: {
    position: "absolute",
    top: "50px",
    left: "50%",
    transform: "translate(-50%)"
  },
  arrowsContainer: {
    position: "absolute",
    top: "200px",
    left: "50%",
    transform: "translate(-50%)"
  },
  chatContainer: {
    position: "relative",
    margin: "0 0 0 350px",
    width: "calc(100% - 350px)",
    height: "calc(100vh - 70px)",
    backgroundImage: "linear-gradient(to top, #e4ecff, #eff4ff)"
  }
});

export default styles;
