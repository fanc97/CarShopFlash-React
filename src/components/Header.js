import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/Actions";

import connect from "react-redux/es/connect/connect";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import MoreVert from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";

import MenuState from "../constants/MenuState";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import strings from "../localization";
import { lock, logout } from "../base/OAuth";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  /** HANDLERS **/

  handleMenuClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuClose() {
    this.setState({ anchorEl: null });
  }

  logout() {
    logout();
    this.props.logout();
    this.props.history.push("/");
  }

  lock() {
    lock();
    this.props.history.push("/");
  }

  getHeaderClass() {
    if (this.props.menu.state === MenuState.SHORT) {
      return "short";
    } else {
      return "";
    }
  }

  render() {
    return (
      <div id="header" className={this.getHeaderClass()}>
        <div className="left">
          {this.props.menu.state === MenuState.FULL && (
            <IconButton
              size="small"
              onClick={() => this.props.changeMenuState(MenuState.SHORT)}
            >
              <MoreVert />
            </IconButton>
          )}

          {this.props.menu.state === MenuState.SHORT && (
            <IconButton
              size="small"
              onClick={() => this.props.changeMenuState(MenuState.FULL)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </div>
        <div className="right">
          {!this.props.user && (
            <span>
              <Link to="/signup">
                <IconButton size="medium">Sign Up</IconButton>
              </Link>

              <Link to="/login">
                <IconButton size="medium">Log in</IconButton>
              </Link>
            </span>
          )}

          {this.props.user && this.props.location.pathname === `/profile` && (
            <Link to="/">
              <HomeIcon
                style={{ fontSize: "40px", color: "rgb(100,100,100)" }}
              />
            </Link>
          )}
          <Link to="/Ad">
            <IconButton size="medium">AD</IconButton>
          </Link>
          {this.props.user && (
            <IconButton
              size="small"
              aria-owns={this.state.anchorEl ? "person-menu" : undefined}
              aria-haspopup="true"
              onClick={event => this.handleMenuClick(event)}
            >
              <PersonIcon />
            </IconButton>
          )}
          {this.props.user && (
            <Menu
              id="person-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={() => this.handleMenuClose()}
            >
              {/* <MenuItem onClick={() => this.lock()}>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText inset primary={strings.header.lock} />
            </MenuItem> */}
              <Link
                to={"/profile/" + this.props.user.uid}
                style={{ color: "rgb(110,110,110)" }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={strings.header.profile} />
                </MenuItem>
              </Link>
              <Link to={"/chat"} style={{ color: "rgb(110,110,110)" }}>
                <MenuItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={strings.header.chat} />
                </MenuItem>
              </Link>
              {this.props.user && this.props.user.role.name === "ROLE_ADMIN" && (
                <Link to={`/admin`} style={{ color: "rgb(110,110,110)" }}>
                  <MenuItem>
                    <ListItemIcon>
                      <VerifiedUserIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={strings.header.admin} />
                  </MenuItem>
                </Link>
              )}

              {/* <Link to="/" onClick={() => this.logout()}> */}
              <MenuItem onClick={() => this.logout()}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary={strings.header.logout}
                  style={{ color: "rgb(110,110,110)" }}
                />
              </MenuItem>
              {/* </Link> */}
            </Menu>
          )}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeMenuState: Actions.changeMenuState,
      logout: Actions.logout
    },
    dispatch
  );
}

function mapStateToProps({ menuReducers, authReducers }) {
  return { menu: menuReducers, user: authReducers.user };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
