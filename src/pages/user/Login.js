import React from "react";

import { bindActionCreators } from "redux";
import * as Actions from "../../actions/Actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../../localization";
import Page from "../../common/Page";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LoginForm from "../../components/forms/user/LoginForm";
import Validators from "../../constants/ValidatorTypes";
import { login, signUpWithGoogle } from "../../base/OAuth";

import { getUserByID, getUserRole } from "../../services/UserService";
import { log } from "util";

class Login extends Page {
  validationList = {
    email: [{ type: Validators.EMAIL, type: Validators.REQUIRED }],
    password: [{ type: Validators.REQUIRED }],
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      errors: {},
      redirectUrl: props.location.state
        ? props.location.state.redirectUrl
        : "/",
    };

    this.props.changeFullScreen(false);

    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.user) {
      this.props.history.push("/");
    }
  }

  keyPress(event) {
    if (event.key == "Enter") {
      this.login();
    }
  }

  login() {
    if (!this.validate()) {
      return;
    }

    login(this.state.data.email, this.state.data.password).then((response) => {
      if (response.errorName === "Error") {
        this.setError("loginErr", response.message);
        return;
      }
      if (response.blocked) {
        this.props.history.push("/block");
        return;
      }
      this.props.login(response);
      this.props.history.push({
        pathname: this.state.redirectUrl,
      });
    });
  }
  loginWithGoogle() {
    signUpWithGoogle().then((response) => {
      if (response.name === "Error") {
        this.setError("loginErr", response.message);
        return;
      }
      this.props.login(response);
      this.props.history.push({
        pathname: this.state.redirectUrl,
      });
    });
  }

  render() {
    return (
      <div id="login">
        <Grid item md={6}>
          <Paper className="paper">
            <h1>{strings.login.login}</h1>
            <div
              className="signInWithGoogle"
              onClick={() => {
                this.loginWithGoogle();
              }}
            >
              <p className="socialLogo">G</p>
              <p>{strings.socialLogin.google}</p>
            </div>
            <LoginForm
              googleLogin={() => {}}
              onSubmit={() => this.login()}
              onChange={this.changeData}
              keyPress={this.keyPress}
              data={this.state.data}
              errors={this.state.errors}
              onCancel={() => this.cancel()}
            />
          </Paper>
        </Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeFullScreen: Actions.changeFullScreen,
      login: Actions.login,
    },
    dispatch
  );
}

function mapStateToProps({ menuReducers, authReducers }) {
  return { menu: menuReducers, auth: authReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
