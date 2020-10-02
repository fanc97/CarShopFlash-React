import React from "react";

import Page from "../../common/Page";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/Actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import ViacleBar from "../../components/ViacleBar";
import AddNewForm from "../../components/forms/admin/AddNewForm";
import {
  getAllBrands,
  getAllMotoBrands,
  saveAndEditBrand,
} from "../../services/BrandService";
import { getAllRegions, saveAndEditRegion } from "../../services/RegionService";
import {
  getAllFuels,
  getAllMotoFuels,
  saveAndEditFuel,
} from "../../services/FuelService";
import { getAllDrives, saveAndEditDrive } from "../../services/DriveService";
import {
  getAllTransmition,
  saveAndEditTransmition,
} from "../../services/TransmitionService";
import {
  getAllEmisions,
  saveAndEditEmision,
} from "../../services/EmisionService";
import { getAllUsages, saveAndEditUsage } from "../../services/UsageService";
import {
  getAllBodyTypes,
  getAllMotoBodyTypes,
  saveAndEditBodyType,
  deleteBodyTypeByID,
} from "../../services/BodyType";

import strings from "../../localization";
import { saveAndEditModel } from "../../services/ModelService";
import { saveData, deleteData } from "../../services/admin/HelpService";
import MenageUsers from "../../components/adminControl/MenageUsers";

class AdminDashBoard extends Page {
  constructor(props) {
    super(props);
    this.state = {
      wellcome: true,
      data: {},
      toggleForms: "",
      actC: false,
      actM: false,
      actT: false,
      brands: [],
      usages: [],
      emisions: [],
      transmitions: [],
      body: [],
      fuels: [],
      drives: [],
      regions: [],
      workOn: [],
      message: "",
      err: false,
    };
    this.mineToggle = this.mineToggle.bind(this);
    this.toggleWelcome = this.toggleWelcome.bind(this);
  }

  componentWillMount() {
    if (this.props.user.role.name !== "ROLE_ADMIN") {
      this.props.history.push({ pathname: "/" });
    }
  }

  componentDidMount() {
    this.getAllCommonData();
    switch (this.state.viacleView) {
      case "car":
        this.setState({ actC: true });
        this.setState({ actM: false });
        this.setState({ actT: false });
        this.getAllCarData();
        break;
      case "moto":
        this.setState({ actC: false });
        this.setState({ actM: true });
        this.setState({ actT: false });
        this.getAllMotoData();
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
        this.getAllCarData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.viacleView != this.state.viacleView) {
      switch (this.state.viacleView) {
        case "car":
          this.setState({ actC: true });
          this.setState({ actM: false });
          this.setState({ actT: false });
          this.setState({ wellcome: true });
          this.getAllCarData();
          break;
        case "moto":
          this.setState({ actC: false });
          this.setState({ actM: true });
          this.setState({ actT: false });
          this.setState({ wellcome: true });
          this.getAllMotoData();
          break;
        case "truck":
          this.setState({ actC: false });
          this.setState({ actM: false });
          this.setState({ actT: false });
          this.setState({ wellcome: true });
          break;
        default:
          this.setState({ actC: true });
          this.setState({ actM: false });
          this.setState({ actT: false });
          this.setState({ wellcome: true });
          this.getAllCarData();
      }
    }
    if (prevState.toggleForms !== this.state.toggleForms) {
      this.setState({ data: {} });
      this.setState({ err: false });
    }
  }

  getAllCommonData() {
    getAllRegions().then((data) => {
      this.setState({ regions: data });
    });
    getAllUsages().then((data) => {
      this.setState({ usages: data });
    });
    getAllEmisions().then((data) => {
      this.setState({ emisions: data });
    });
    getAllTransmition().then((data) => {
      this.setState({ transmitions: data });
    });
  }

  getAllCarData() {
    getAllBrands().then((data) => {
      this.setState({ brands: data });
    });
    getAllBodyTypes().then((data) => {
      this.setState({ body: data });
    });
    getAllFuels().then((data) => {
      this.setState({ fuels: data });
    });
    getAllDrives().then((data) => {
      this.setState({ drives: data });
    });
  }

  getAllMotoData() {
    getAllMotoBrands().then((data) => {
      this.setState({ brands: data });
    });
    getAllMotoBodyTypes().then((data) => {
      this.setState({ body: data });
    });
    getAllMotoFuels().then((data) => {
      this.setState({ fuels: data });
    });
  }
  mineToggle(item) {
    this.setState({ toggleForms: item });
    this.setState({ wellcome: false });
  }

  saveData() {
    saveData(
      this.state.toggleForms,
      this.state.data,
      this.state.viacleView
    ).then((data) => {
      if (data === "Err") {
        this.setState({ message: "Error while working with" });
      } else {
        this.setState({ message: "Success" });
      }
      this.setState({ wellcome: true });
      this.setState({ err: true });
      this.getAllCommonData();
      switch (this.state.viacleView) {
        case "car":
          this.getAllCarData();
          break;
        case "moto":
          this.getAllMotoData();
          break;
        case "truck":
          console.log("truck");
          break;
      }
    });
  }

  delete() {
    deleteData(
      this.state.toggleForms,
      this.state.data,
      this.state.viacleView
    ).then((data) => {
      if (data === "Err") {
        this.setState({ message: "Error while deleting data " });
      } else {
        this.setState({ message: "Succesfull deleting" });
      }
      this.setState({ wellcome: true });
      this.setState({ err: true });
      this.getAllCommonData();
      switch (this.state.viacleView) {
        case "car":
          this.getAllCarData();
          break;
        case "moto":
          this.getAllMotoData();
          break;
        case "truck":
          console.log("truck");
          break;
      }
    });
  }

  toggleWelcome() {
    this.setState({ wellcome: true });
  }

  render() {
    let formEl;
    switch (this.state.toggleForms) {
      case strings.adminBar.brand:
        formEl = (
          <AddNewForm
            workOn={this.state.brands}
            label={this.state.toggleForms}
            data={this.state.data}
            onSubmit={() => this.saveData()}
            onDelete={() => this.delete()}
            onChange={this.changeData}
            keyPress={this.keyPress}
            onCancel={this.toggleWelcome}
            viacleView={this.state.viacleView}
            actC={this.state.actC}
            actM={this.state.actM}
            actT={this.state.actT}
          />
        );
        break;
      case strings.adminBar.region:
        formEl = (
          <AddNewForm
            workOn={this.state.regions}
            label={this.state.toggleForms}
            data={this.state.data}
            onSubmit={() => this.saveData()}
            onDelete={() => this.delete()}
            onChange={this.changeData}
            keyPress={this.keyPress}
            onCancel={this.toggleWelcome}
            viacleView={this.state.viacleView}
            actC={this.state.actC}
            actM={this.state.actM}
            actT={this.state.actT}
          />
        );
        break;
      case strings.adminBar.usage:
        formEl = (
          <AddNewForm
            workOn={this.state.usages}
            label={this.state.toggleForms}
            data={this.state.data}
            onSubmit={() => this.saveData()}
            onDelete={() => this.delete()}
            onChange={this.changeData}
            keyPress={this.keyPress}
            onCancel={this.toggleWelcome}
            viacleView={this.state.viacleView}
            actC={this.state.actC}
            actM={this.state.actM}
            actT={this.state.actT}
          />
        );
        break;
      case strings.adminBar.body:
        formEl = (
          <AddNewForm
            workOn={this.state.body}
            label={this.state.toggleForms}
            data={this.state.data}
            onSubmit={() => this.saveData()}
            onDelete={() => this.delete()}
            onChange={this.changeData}
            keyPress={this.keyPress}
            onCancel={this.toggleWelcome}
            viacleView={this.state.viacleView}
            actC={this.state.actC}
            actM={this.state.actM}
            actT={this.state.actT}
          />
        );
        break;
      case strings.adminBar.drive:
        formEl = (
          <AddNewForm
            workOn={this.state.drives}
            label={this.state.toggleForms}
            data={this.state.data}
            onSubmit={() => this.saveData()}
            onDelete={() => this.delete()}
            onChange={this.changeData}
            keyPress={this.keyPress}
            onCancel={this.toggleWelcome}
            viacleView={this.state.viacleView}
            actC={this.state.actC}
            actM={this.state.actM}
            actT={this.state.actT}
          />
        );
        break;
      case strings.adminBar.emition:
        formEl = (
          <AddNewForm
            workOn={this.state.emisions}
            label={this.state.toggleForms}
            data={this.state.data}
            onSubmit={() => this.saveData()}
            onDelete={() => this.delete()}
            onChange={this.changeData}
            keyPress={this.keyPress}
            onCancel={this.toggleWelcome}
            viacleView={this.state.viacleView}
            actC={this.state.actC}
            actM={this.state.actM}
            actT={this.state.actT}
          />
        );
        break;
      case strings.adminBar.fuel:
        formEl = (
          <AddNewForm
            workOn={this.state.fuels}
            label={this.state.toggleForms}
            data={this.state.data}
            onSubmit={() => this.saveData()}
            onDelete={() => this.delete()}
            onChange={this.changeData}
            keyPress={this.keyPress}
            onCancel={this.toggleWelcome}
            viacleView={this.state.viacleView}
            actC={this.state.actC}
            actM={this.state.actM}
            actT={this.state.actT}
          />
        );
        break;
      case strings.adminBar.model:
        formEl = (
          <AddNewForm
            workOn={this.state.brands}
            label={this.state.toggleForms}
            data={this.state.data}
            onSubmit={() => this.saveData()}
            onDelete={() => this.delete()}
            onChange={this.changeData}
            keyPress={this.keyPress}
            onCancel={this.toggleWelcome}
            viacleView={this.state.viacleView}
            actC={this.state.actC}
            actM={this.state.actM}
            actT={this.state.actT}
          />
        );
        break;
      case strings.adminBar.transimtion:
        formEl = (
          <AddNewForm
            workOn={this.state.transmitions}
            brands={this.state.brands}
            label={this.state.toggleForms}
            data={this.state.data}
            onSubmit={() => this.saveData()}
            onDelete={() => this.delete()}
            onChange={this.changeData}
            keyPress={this.keyPress}
            onCancel={this.toggleWelcome}
            viacleView={this.state.viacleView}
            actC={this.state.actC}
            actM={this.state.actM}
            actT={this.state.actT}
          />
        );
        break;
    }
    return (
      <div>
        <ViacleBar
          adminBar={true}
          changeView={this.changeView}
          toggleFormsView={this.mineToggle}
        />
        {this.state.wellcome && this.props.view !== "users" && (
          <h1>{this.props.user.email} ,wellcome to admin Dashboar</h1>
        )}
        {!this.state.wellcome && this.props.view !== "users" && formEl}
        {this.props.view === "users" ? <MenageUsers /> : null}
        {this.state.err && (
          <h3>
            {this.state.message} {this.state.viacleView},
            {this.state.toggleForms}
          </h3>
        )}
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

function mapStateToProps({ menuReducers, authReducers, toggleViewReducer }) {
  return {
    menu: menuReducers,
    user: authReducers.user,
    view: toggleViewReducer.view,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminDashBoard)
);
