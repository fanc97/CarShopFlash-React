import React from "react";

import { bindActionCreators } from "redux";
import * as Actions from "../../actions/Actions";
import { withRouter, Link } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Page from "../../common/Page";

import { getUserByID } from "../../services/UserService";
import { getAllCarsByUID } from "../../services/CarService";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import userPhoto from "./userPhoto.png";
import ViacleCardView from "../../components/ViacleCardView";
import Pagination from "../../components/Pagination";
import Button from "@material-ui/core/Button";
import UpdateProfile from "../../components/forms/user/UpdateProfile";
import { editUserWithID } from "../../services/UserService";

class UserDetails extends Page {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      cars: [],
      viacleForView: [],
      user: {},
      page: 0,
      pageOffset: 0,
      date: "",
      pic: undefined,
      displayUser: true
    };
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    let userID = this.props.match.params.id;
    getUserByID(userID).then(data => {
      this.setState({ user: data });
      let d = new Date(data.birthday);
      this.setState({
        date: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
      });
    });
    getAllCarsByUID(userID).then(res => {
      this.setState({ cars: res });
      const slice = res.slice(this.state.pageOffset, this.state.pageOffset + 4);
      this.setState({ viacleForView: slice });
    });
  }
  updateProfile() {
    this.setState({ displayUser: false });
  }
  cancel() {
    this.setState({ displayUser: true });
  }

  editProfileForm() {
    editUserWithID(this.state.data, this.state.pic, this.state.user).then(
      data => {
        console.log(data);
      }
    );
  }

  render() {
    return (
      <div>
        <div>
          <div className="user-info-show">
            <h1>{this.state.user.firstName}</h1>
            <h2>{this.state.user.lastName}</h2>
            <span
              style={{ paddingLeft: "10px" }}
              className="car-info-show-span"
            >
              Role: {this.state.user.roleID === 2 ? "ADMIN" : "USER"}
            </span>
            <div className={this.state.displayUser ? "" : "hide"}>
              <Button
                style={{ marginTop: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  this.updateProfile();
                }}
              >
                Update Profile
              </Button>
            </div>
          </div>
          <div className={this.state.displayUser ? "" : "hide"}>
            <div className="profile-image-container">
              <img
                className="profile-img-src"
                src={
                  this.state.user.photoURL === "none"
                    ? userPhoto
                    : this.state.user.photoURL
                }
                alt="nothing"
              ></img>
            </div>
            <div className="grid-spec">
              <Typography variant="h6" className="page-spec-title">
                Information about you
              </Typography>
              <div className="page-viacle-spec-cont">
                <div className="page-viacle-spec-cont-part">
                  <List className="page-list-specification">
                    <ListItem>
                      <ListItemText primary="Age" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={this.state.user.age} />
                    </ListItem>
                  </List>
                  <List className="page-list-specification">
                    <ListItem>
                      <ListItemText primary="Country" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={this.state.user.Country} />
                    </ListItem>
                  </List>
                  <List className="page-list-specification">
                    <ListItem>
                      <ListItemText primary="BirthDay" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={this.state.date} />
                    </ListItem>
                  </List>
                  <List className="page-list-specification">
                    <ListItem>
                      <ListItemText primary="City" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={this.state.user.City} />
                    </ListItem>
                  </List>
                </div>
                <div className="page-viacle-spec-cont-part">
                  <List className="page-list-specification">
                    <ListItem>
                      <ListItemText primary="Gander" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={this.state.user.gander} />
                    </ListItem>
                  </List>
                  <List className="page-list-specification">
                    <ListItem>
                      <ListItemText primary="Phone Number" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={this.state.user.phoneNumber} />
                    </ListItem>
                  </List>
                  <List className="page-list-specification">
                    <ListItem>
                      <ListItemText primary="Middle Name" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={this.state.user.midlename} />
                    </ListItem>
                  </List>
                  <List className="page-list-specification">
                    <ListItem>
                      <ListItemText primary="Email" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={this.state.user.email} />
                    </ListItem>
                  </List>
                </div>
              </div>
            </div>
            <ViacleCardView listViacle={this.state.viacleForView} />
            <Pagination
              total={this.state.cars.length}
              page={this.state.page}
              perPage={4}
              setPage={this.setPage}
            />
          </div>
          <div className={this.state.displayUser ? "hide" : ""}>
            <UpdateProfile
              onSubmit={() => this.editProfileForm()}
              onChange={this.changeData}
              keyPress={this.keyPress}
              data={this.state.data}
              date={this.state.date}
              user={this.state.user}
              onCancel={this.cancel}
              setPhoto={this.setPhoto}
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeFullScreen: Actions.changeFullScreen
    },
    dispatch
  );
}

function mapStateToProps({ menuReducers }) {
  return { menu: menuReducers };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDetails)
);
