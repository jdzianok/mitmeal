const styles = theme => ({
  headerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "70px",
    borderBottom: "1px solid #d8e3fa",
    borderRight: "1px solid #d8e3fa"
  },
  imgContainer: {
    marginLeft: "25px",
    width: "90%"
  },
  user: {
    width: "220px"
  },

  bell: {
    width: "75px",
    height: "70px",
    padding: "23px 25px",
    borderLeft: "1px solid #d8e3fa",
    borderRight: "1px solid #d8e3fa"
  },
  settings: {
    position: "relative",
    width: "90px",
    padding: "10px 30px 0 33px",
    cursor: "pointer"
  },
  dropdown: {
    display: "none",
    position: "absolute",
    top: "55px",
    right: "0px"
  },
  signOutBtn: {
    padding: "15px 30px",
    borderRadius: "30px"
  }
});

export default styles;
