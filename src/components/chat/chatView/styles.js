import { rgbToHex } from "@material-ui/core";

const styles = theme => ({
  content: {
    height: "calc(100% - 50px)",
    overflow: "auto",
    padding: "25px",
    overflowY: "scroll",
    width: "100%"
  },
  container: {
    height: "100%",
    backgroundColor: "rgb(241, 241, 241)"
  },
  userSent: {
    float: "left",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#707BC4",
    color: "white",
    width: "300px",
    borderRadius: "10px"
  },
  friendSent: {
    float: "right",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#707BC4",
    color: "white",
    width: "300px",
    borderRadius: "10px"
  },
  chatHeader: {
    width: "100%",
    height: "50px",
    backgroundColor: "#344195",
    fontSize: "18px",
    textAlign: "center",
    color: "white",
    paddingTop: "10px"
  }
});

export default styles;
