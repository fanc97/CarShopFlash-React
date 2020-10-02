import React from "react";

import { bindActionCreators } from "redux";
import * as Actions from "../actions/Actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Page from "../common/Page";
import ViacleBar from "../components/ViacleBar";
import { addNewCar, getOnaCar } from "../services/CarService";
import { addNewMoto } from "../services/MotoService";
import Button from "@material-ui/core/Button";

import AddViacleForm from "../components/forms/viacle/AddViacleForm";
import { Typography } from "@material-ui/core";

import Validators from "../constants/ValidatorTypes";

class Ad extends Page {
  validationList = {
    price: [{ type: Validators.IS_NUMBER }],
    description: [{ type: Validators.REQUIRED }],
    numberOfSeats: [{ type: Validators.IS_NUMBER }],
    volume: [{ type: Validators.IS_NUMBER }],
    brand: [{ type: Validators.REQUIRED }],
    carBody: [{ type: Validators.REQUIRED }],
    model: [{ type: Validators.REQUIRED }],
    fuel: [{ type: Validators.REQUIRED }],
  };
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {},
      pic: {},
      newCar: {},
      newViacleID: "",
      err: "",
    };
  }

  componentDidMount() {}

  addForm() {
    if (this.props.view === "car") {
      this.validationList.drive = [{ type: Validators.REQUIRED }];
    }
    if (this.props.view === "truck") {
      this.validationList.drive = [{ type: Validators.REQUIRED }];
      this.validationList.capacity = [{ type: Validators.REQUIRED }];
    }
    if (!this.validate()) {
      return;
    }

    let user = JSON.parse(localStorage.getItem("user"));
    switch (this.props.view) {
      case "car":
        this.addCar(user);
        break;
      case "moto":
        addNewMoto(this.state.data, this.state.pic, user.uid)
          .then((data) => {
            this.setState({ newViacleID: data });
            this.showOverLay();
          })
          .catch((err) => {
            this.setState({ err: err.message });
          });
        break;
      case "truck":
        console.log("Cao truck");
        break;
      default:
        this.addCar(user);
    }
  }

  addCar(user) {
    addNewCar(this.state.data, this.state.pic, user.uid)
      .then((data) => {
        this.setState({ newViacleID: data });
        this.showOverLay();
      })
      .catch((err) => {
        this.setState({ err: err.message });
      });
  }

  showAdd() {
    this.props.history.push({
      pathname: "/card",
      search: `?id=${this.state.newViacleID}`,
    });
  }

  backToForm() {
    document.getElementById("overlay").style.transform = "translateX(110%)";
    document.getElementById("overlay-content").style.transform =
      "translateX(150%)";
    let c = document.getElementById("overlay-content").childNodes;
    c.forEach((elem) => {
      console.log(elem);
      elem.style.opacity = "0";
    });
  }

  showOverLay() {
    document.getElementById("overlay").style.transform = "translateX(0)";
    document.getElementById("overlay-content").style.transform =
      "translateX(0)";
    let c = document.getElementById("overlay-content").childNodes;
    c.forEach((elem) => {
      console.log(elem);
      elem.style.opacity = "1";
    });
  }

  render() {
    let activForm;
    switch (this.props.view) {
      case "car":
        activForm = (
          <Typography variant="h3" component="h2">
            Add Car advertisement
          </Typography>
        );
        break;
      case "moto":
        activForm = (
          <Typography variant="h3" component="h2">
            Add Moto advertisement
          </Typography>
        );
        break;
      case "truck":
        activForm = (
          <Typography variant="h3" component="h2">
            Add Truck advertisement
          </Typography>
        );
        break;
      default:
        activForm = (
          <Typography variant="h3" component="h2">
            Add Car advertisement
          </Typography>
        );
    }

    return (
      <div className="addComponent">
        <div className="addComponentMain">
          <ViacleBar
            adminBar={false}
            changeView={this.changeView}
            toggleFormsView={this.toggleFormsView}
          />
          <div style={{ textAlign: "center" }}>{activForm}</div>
          <AddViacleForm
            errors={this.state.errors}
            setPhoto={this.setPhoto}
            onSubmit={() => this.addForm()}
            onChange={this.changeData}
            keyPress={this.keyPress}
            data={this.state.data}
            errors={this.state.errors}
            onCancel={() => this.cancel()}
          />
          <p style={{ color: "red" }}>{this.state.err}</p>
          <div className="overlay" id="overlay"></div>
          <div className="overlay-content" id="overlay-content">
            <h1>Succesfull added new viacle</h1>
            <h3>New viacle id: {this.state.newViacleID}</h3>
            <div className="overlay-content-btns">
              <Button
                style={{ marginTop: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  this.showAdd();
                }}
              >
                See Add
              </Button>
              <Button
                style={{ marginTop: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  this.onCancel();
                }}
              >
                Home
              </Button>
              <Button
                style={{ marginTop: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => this.backToForm()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
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

function mapStateToProps({ menuReducers, toggleViewReducer }) {
  return { menu: menuReducers, view: toggleViewReducer.view };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ad));
