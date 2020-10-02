import React, { Component } from "react";
import Loader from "../components/Loader";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import MenuState from "../constants/MenuState";
import { getSidePics } from "../services/GlobalPic";

class BaseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: {},
      right: {},
    };
  }

  getContentClass() {
    if (this.props.menu.state === MenuState.SHORT) {
      return "content-container short";
    } else {
      return "content-container";
    }
  }

  reSizeSide() {
    if (this.props.menu.state === MenuState.SHORT) {
      return "big app-img-cover";
    } else {
      return "small app-img-cover";
    }
  }

  componentDidMount() {
    getSidePics().then((res) => {
      res.forEach((elem) => {
        if (elem.name === "left-side") {
          this.setState({ left: elem });
        } else if (elem.name === "right-side") {
          this.setState({ right: elem });
        }
      });
    });
  }

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        {this.props.loader && <Loader />}

        {!this.props.menu.fullScreen && (
          <div id="main-container">
            <div className="navigation-container">
              <Navigation />
            </div>
            <div className={this.getContentClass()}>
              <Header />

              <div className="my-app-content-container">
                <div className="my-app-left-side">
                  <img
                    className={this.reSizeSide()}
                    src={this.state.left.pocture}
                  />
                </div>
                <div className="my-app-main-side">{children}</div>
                <div className="my-app-right-side">
                  <img
                    className={this.reSizeSide()}
                    src={this.state.right.pocture}
                  />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        )}

        {this.props.menu.fullScreen && children}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ authReducers, siteDataReducers, menuReducers }) {
  return {
    loader: siteDataReducers.loader,
    menu: menuReducers,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BaseLayout)
);
