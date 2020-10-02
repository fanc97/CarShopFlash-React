import React from "react";
import Page from "../../common/Page";
import SignUpForm from "../../components/forms/user/SignUpForm";
import { signUp } from "../../base/OAuth";
import Validators from "../../constants/ValidatorTypes";

import { bindActionCreators } from "redux";
import * as Actions from "../../actions/Actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import strings from "../../localization";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class Signup extends Page {
  validationList = {
    email: [{ type: Validators.EMAIL }],
    firstName: [{ type: Validators.REQUIRED }],
    lastName: [{ type: Validators.REQUIRED }],
    password: [
      { type: Validators.REQUIRED, type: Validators.MIN_LENGTH, min: 8 }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {
        firebase: ""
      },
      redirectUrl: props.location.state
        ? props.location.state.redirectUrl
        : "/",
      firebase: ""
    };
    this.keyPress = this.keyPress.bind(this);
  }

  keyPress(event) {
    if (event.key == "Enter") {
      this.signUp();
    }
  }

  signUp() {
    if (!this.validate()) {
      return;
    }

    signUp(this.state.data).then(response => {
      if (response.name === "Error") {
        let temp = response.error;
        this.setState({
          errors: { ...this.state.errors, firebase: response.error }
        });
        return;
      }
      this.props.history.push({ pathname: "/login" });
    });
  }

  render() {
    return (
      <div id="login">
        <Grid item md={6}>
          <Paper className="paper">
            <h1>{strings.userForm.signUp}</h1>
            <SignUpForm
              onSubmit={() => this.signUp()}
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
      changeFullScreen: Actions.changeFullScreen
    },
    dispatch
  );
}

function mapStateToProps({ menuReducers }) {
  return { menu: menuReducers };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
// export default withRouter(Signup);
