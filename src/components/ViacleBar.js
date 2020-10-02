import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import strings from "../localization";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import PeopleIcon from "@material-ui/icons/People";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

class ViacleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleForms: "",
      actC: true,
      actM: false,
      actT: false,
    };
  }
  componentDidMount() {}

  activateForm(displayForm) {
    this.props.changeView(displayForm);
  }

  togleForms(displayForm) {
    this.setState({ toggleForms: displayForm });
    this.props.toggleFormsView(displayForm);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.view !== this.props.view) {
      switch (this.props.view) {
        case "car":
          this.setState({ actC: true });
          this.setState({ actM: false });
          this.setState({ actT: false });
          break;
        case "moto":
          this.setState({ actC: false });
          this.setState({ actM: true });
          this.setState({ actT: false });
          break;
        case "truck":
          this.setState({ actC: false });
          this.setState({ actM: false });
          this.setState({ actT: true });
          break;
        default:
          this.setState({ actC: true });
          this.setState({ actM: false });
          this.setState({ actT: false });
      }
    }
  }

  render() {
    return (
      <div style={{ display: "flax", flexDirection: "column" }}>
        <Toolbar
          style={{
            backgroundColor: "rgb(220,220,220)",
            alignContent: "center",
            height: "7vh",
            display: "flex",
            marginTop: "10px",
          }}
          variant="dense"
        >
          <Link to="/">
            <IconButton
              onClick={() => this.activateForm("car")}
              className="viacle-btn"
              size="medium"
            >
              <HomeIcon style={{ color: "#FB5607" }} />
            </IconButton>
          </Link>

          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <IconButton
              onClick={() => this.activateForm("car")}
              className="viacle-btn "
            >
              <DriveEtaIcon
                className={this.props.view === "car" ? "activeBarLink" : ""}
              />
            </IconButton>

            <IconButton
              id="moto"
              onClick={() => this.activateForm("moto")}
              className="viacle-btn"
            >
              <MotorcycleIcon
                className={this.props.view === "moto" ? "activeBarLink" : ""}
              />
            </IconButton>

            <IconButton
              id="truck"
              onClick={() => this.activateForm("truck")}
              className="viacle-btn"
            >
              <LocalShippingIcon
                className={this.props.view === "truck" ? "activeBarLink" : ""}
              />
            </IconButton>
            {this.props.user &&
              this.props.user.roleID === 2 &&
              this.props.location.pathname === "/admin" && (
                <IconButton
                  onClick={() => this.activateForm("users")}
                  className="viacle-btn"
                >
                  <PeopleIcon
                    className={
                      this.props.view === "users" ? "activeBarLink" : ""
                    }
                  />
                </IconButton>
              )}
          </div>
        </Toolbar>

        {this.props.adminBar && this.props.view !== "users " && (
          <Toolbar
            style={{
              backgroundColor: "rgb(220,220,220)",
              alignContent: "center",
              height: "7vh",
              display: "flex",
              marginTop: "10px",
            }}
            variant="dense"
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <IconButton
                onClick={() => this.togleForms(strings.adminBar.brand)}
                className="viacle-btn"
                size="medium"
              >
                <Typography variant="body2" component="span">
                  {strings.adminBar.brand}
                </Typography>
              </IconButton>
              {this.state.actC && (
                <IconButton
                  id="moto"
                  onClick={() => this.togleForms(strings.adminBar.model)}
                  className="viacle-btn"
                >
                  <Typography variant="body2" component="span">
                    {strings.adminBar.model}
                  </Typography>
                </IconButton>
              )}
              <IconButton
                id="moto"
                onClick={() => this.togleForms(strings.adminBar.emition)}
                className="viacle-btn"
              >
                <Typography variant="body2" component="span">
                  {strings.adminBar.emition}
                </Typography>
              </IconButton>
              <IconButton
                id="moto"
                onClick={() => this.togleForms(strings.adminBar.transimtion)}
                className="viacle-btn"
              >
                <Typography variant="body2" component="span">
                  {strings.adminBar.transimtion}
                </Typography>
              </IconButton>
              <IconButton
                id="truck"
                onClick={() => this.togleForms(strings.adminBar.body)}
                className="viacle-btn"
                size="medium"
              >
                <Typography variant="body2" component="span">
                  {strings.adminBar.body}
                </Typography>
              </IconButton>
              {this.state.actC && (
                <IconButton
                  id="truck"
                  onClick={() => this.togleForms(strings.adminBar.drive)}
                  className="viacle-btn"
                  size="medium"
                >
                  <Typography variant="body2" component="span">
                    {strings.adminBar.drive}
                  </Typography>
                </IconButton>
              )}
              <IconButton
                id="truck"
                onClick={() => this.togleForms(strings.adminBar.fuel)}
                className="viacle-btn"
                size="medium"
              >
                <Typography variant="body2" component="span">
                  {strings.adminBar.fuel}
                </Typography>
              </IconButton>
              <IconButton
                id="truck"
                onClick={() => this.togleForms(strings.adminBar.region)}
                className="viacle-btn"
                size="medium"
              >
                <Typography variant="body2" component="span">
                  {strings.adminBar.region}
                </Typography>
              </IconButton>
              <IconButton
                id="truck"
                onClick={() => this.togleForms(strings.adminBar.usage)}
                className="viacle-btn"
                size="medium"
              >
                <Typography variant="body2" component="span">
                  {strings.adminBar.usage}
                </Typography>
              </IconButton>
            </div>
          </Toolbar>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers, authReducers, toggleViewReducer }) {
  return {
    menu: menuReducers,
    user: authReducers.user,
    view: toggleViewReducer.view,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViacleBar)
);
