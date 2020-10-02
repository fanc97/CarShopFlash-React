import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../actions/Actions";
import MenuState from "../constants/MenuState";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import HomeIcon from "@material-ui/icons/Home";

import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { Button, Drawer, IconButton } from "@material-ui/core";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import strings from "../localization";
class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submenu: {
        fast_search: false,
        viacle_offer: false,
        selling: false,
        insurance: false,
      },
    };
  }

  getNavigationClass() {
    if (this.props.menu.state === MenuState.SHORT) {
      return "navigation-content-container short";
    } else {
      return "navigation-content-container";
    }
  }

  setViacle(viacle) {
    this.props.setView(viacle);
  }

  isCurrentPath(path) {
    return this.props.history.location.pathname == path;
  }

  toggleSubmenu(key) {
    let submenu = this.state.submenu;

    submenu[key] = !submenu[key];

    this.setState({
      submenu: submenu,
    });
  }

  searchBy(param) {
    this.props.history.push({
      pathname: "/",
      search: param,
    });
  }

  goHome() {
    this.props.history.push({
      pathname: "/",
    });
  }
  render() {
    return (
      <Drawer variant="permanent" id="navigation">
        <div className={this.getNavigationClass()}>
          <div
            className="logo-container"
            onClick={() => {
              this.goHome();
            }}
          >
            <div className="logo">
              <FlashOnIcon style={{ fontSize: 40, color: "#fff" }} />
            </div>
            <div className="title">
              <h2 style={{ letterSpacing: 4, fontStyle: "italic" }}>
                CarShopFlash
              </h2>
            </div>
          </div>
          <List component="nav">
            <ListItem
              className="navigation-item"
              button
              onClick={() => this.toggleSubmenu("fast_search")}
            >
              <ListItemIcon className="navigation-icon">
                <SettingsEthernetIcon />
              </ListItemIcon>

              <ListItemText
                inset
                style={{ textAlign: "right" }}
                primary="Shortcut"
                className="navigation-text"
              />
              {this.state.submenu.fast_search ? (
                <ExpandLess className="navigation-icon" />
              ) : (
                <ExpandMore className="navigation-icon" />
              )}
            </ListItem>
            <Collapse
              in={this.state.submenu.fast_search}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding className="submenu">
                <Button
                  onClick={() => {
                    this.searchBy(strings.navSearch.newestAD);
                  }}
                  className={
                    this.isCurrentPath("/")
                      ? "navigation-link active"
                      : "navigation-link"
                  }
                >
                  <ListItem className="navigation-item">
                    <ListItemText
                      inset
                      primary={strings.navSearch.newestAD}
                      className="navigation-text"
                    />
                  </ListItem>
                </Button>
                <Button
                  onClick={() => {
                    this.searchBy(strings.navSearch.mostWanted);
                  }}
                  className={
                    this.isCurrentPath("/")
                      ? "navigation-link active"
                      : "navigation-link"
                  }
                >
                  <ListItem className="navigation-item">
                    <ListItemText
                      inset
                      primary={strings.navSearch.mostWanted}
                      className="navigation-text"
                    />
                  </ListItem>
                </Button>
                <Button
                  onClick={() => {
                    this.searchBy(strings.navSearch.trade);
                  }}
                  className={
                    this.isCurrentPath("/")
                      ? "navigation-link active"
                      : "navigation-link"
                  }
                >
                  <ListItem className="navigation-item">
                    <ListItemText
                      inset
                      primary={strings.navSearch.trade}
                      className="navigation-text"
                    />
                  </ListItem>
                </Button>
                <Button
                  onClick={() => {
                    this.searchBy(strings.navSearch.newestCAR);
                  }}
                  className={
                    this.isCurrentPath("/")
                      ? "navigation-link active"
                      : "navigation-link"
                  }
                >
                  <ListItem className="navigation-item">
                    <ListItemText
                      inset
                      primary={strings.navSearch.newestCAR}
                      className="navigation-text"
                    />
                  </ListItem>
                </Button>
              </List>
            </Collapse>
            {/* <div></div> pocetak */}
            <ListItem
              className="navigation-item"
              button
              onClick={() => this.toggleSubmenu("viacle_offer")}
            >
              <ListItemText
                inset
                primary="Offer"
                style={{ textAlign: "right" }}
                className="navigation-text"
              />
              {this.state.submenu.viacle_offer ? (
                <ExpandLess className="navigation-icon" />
              ) : (
                <ExpandMore className="navigation-icon" />
              )}
            </ListItem>
            <Collapse
              in={this.state.submenu.viacle_offer}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding className="submenu">
                <Link
                  onClick={() => {
                    this.setViacle("car");
                  }}
                  className={
                    this.isCurrentPath("/")
                      ? "navigation-link active"
                      : "navigation-link"
                  }
                >
                  <ListItem>
                    <DriveEtaIcon style={{ color: "#fff", margin: "0 auto" }} />
                  </ListItem>
                </Link>
                <Link
                  onClick={() => {
                    this.setViacle("moto");
                  }}
                  className={
                    this.isCurrentPath("/")
                      ? "navigation-link active"
                      : "navigation-link"
                  }
                >
                  <ListItem>
                    <MotorcycleIcon
                      style={{ color: "#fff", margin: "0 auto" }}
                    />
                  </ListItem>
                </Link>
                <Link
                  onClick={() => {
                    this.setViacle("truck");
                  }}
                  className={
                    this.isCurrentPath("/")
                      ? "navigation-link active"
                      : "navigation-link"
                  }
                >
                  <ListItem>
                    <LocalShippingIcon
                      style={{ color: "#fff", margin: "0 auto" }}
                    />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            {/* <div></div> */}
            <ListItem
              className="navigation-item"
              button
              onClick={() => this.toggleSubmenu("selling")}
            >
              <ListItemText
                inset
                primary="Im Selling"
                style={{ textAlign: "right" }}
                className="navigation-text"
              />
              {this.state.submenu.selling ? (
                <ExpandLess className="navigation-icon" />
              ) : (
                <ExpandMore className="navigation-icon" />
              )}
            </ListItem>
            <Collapse
              in={this.state.submenu.selling}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding className="submenu">
                <Link
                  to={"/Ad"}
                  className={
                    this.isCurrentPath("/")
                      ? "navigation-link active"
                      : "navigation-link"
                  }
                >
                  <ListItem className="navigation-item">
                    <ListItemText
                      inset
                      primary="Advertisement"
                      className="navigation-text"
                    />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </List>
        </div>
      </Drawer>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeFullScreen: Actions.changeFullScreen,
      setView: Actions.setView,
    },
    dispatch
  );
}

function mapStateToProps({ menuReducers, authReducers, toggleViewReducer }) {
  return {
    menu: menuReducers,
    auth: authReducers,
    view: toggleViewReducer.view,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigation)
);
