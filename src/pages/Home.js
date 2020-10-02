import React, { Component } from "react";

import Page from "../common/Page";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/Actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import ViacleBar from "../components/ViacleBar";
import {
  searchCarForm,
  getAllCars,
  getAllCarsForTrade,
  getAllCarsOrderByClicked,
} from "../services/CarService";
import ViacleCardView from "../components/ViacleCardView";
import Pagination from "../components/Pagination";
import ViacleForm from "../components/forms/viacle/ViacleForm";
import { getAllMotos, searchMotoForm } from "../services/MotoService";
import {
  getAllTrucks,
  getAllTrucksWithCapacity,
  searchTruckForm,
} from "../services/TruckService";
import CapacityToolBar from "../components/CapacityToolBar";

import Validators from "../constants/ValidatorTypes";
import strings from "../localization";

class Home extends Page {
  validationList = {
    price: [{ type: Validators.IS_NUMBER }],
  };
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {},
      cars: [],
      page: 0,
      pageOffset: 0,
      motos: [],
      trucks: [],
      capacityID: "",
      viacleForViewC: [],
      viacleForViewM: [],
      viacleForViewT: [],
    };

    this.props.changeFullScreen(false);
    this.setPage = this.setPage.bind(this);
    this.getAllTruckWithCapacity = this.getAllTruckWithCapacity.bind(this);
  }

  componentDidMount() {
    this.reciveData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search != this.props.location.search) {
      let temp;
      let slice;
      switch (this.props.location.search.slice(1)) {
        case strings.navSearch.newestAD:
          temp = this.state.cars;
          temp.sort(function (a, b) {
            return (
              new Date(b.ADcreated).getTime() - new Date(a.ADcreated).getTime()
            );
          });
          slice = temp.slice(this.state.pageOffset, this.state.pageOffset + 12);
          this.setState({ viacleForViewC: slice });
          break;
        case strings.navSearch.mostWanted:
          temp = this.state.cars;
          temp.sort(function (a, b) {
            return b.clicked - a.clicked;
          });
          slice = temp.slice(this.state.pageOffset, this.state.pageOffset + 12);
          this.setState({ viacleForViewC: slice });
          break;
        case strings.navSearch.trade:
          getAllCarsForTrade().then((res) => {
            this.setState({ cars: res });
            let temp = this.state.cars;
            const slice = temp.slice(
              this.state.pageOffset,
              this.state.pageOffset + 12
            );
            this.setState({ viacleForViewC: slice });
          });
          break;
        case strings.navSearch.newestCAR:
        case strings.navSearch.newestAD:
          temp = this.state.cars;
          temp.sort(function (a, b) {
            return (
              new Date(b.creationData).getTime() -
              new Date(a.creationData).getTime()
            );
          });
          slice = temp.slice(this.state.pageOffset, this.state.pageOffset + 12);
          this.setState({ viacleForViewC: slice });
          break;
          break;
        default:
          this.reciveData();
          break;
      }
    }
  }

  reciveData() {
    this.getAllC();
    this.getAllM();
    this.getAllT();
  }

  getAllC() {
    getAllCars().then((res) => {
      this.setState({ cars: res });
      let temp = this.state.cars;
      const slice = temp.slice(
        this.state.pageOffset,
        this.state.pageOffset + 12
      );
      this.setState({ viacleForViewC: slice });
    });
  }

  getAllM() {
    getAllMotos().then((res) => {
      this.setState({ motos: res });
      let temp = this.state.motos;
      const slice = temp.slice(
        this.state.pageOffset,
        this.state.pageOffset + 12
      );
      this.setState({ viacleForViewM: slice });
    });
  }

  getAllT() {
    getAllTrucks().then((res) => {
      this.setState({ trucks: res });
      let temp = this.state.trucks;
      const slice = temp.slice(
        this.state.pageOffset,
        this.state.pageOffset + 12
      );
      this.setState({ viacleForViewT: slice });
    });
  }

  getAllTruckWithCapacity(ID) {
    if (ID === "all") {
      this.getAllT();
    } else {
      getAllTrucksWithCapacity(ID).then((res) => {
        this.setState({ trucks: res });
        let temp = this.state.trucks;
        const slice = temp.slice(
          this.state.pageOffset,
          this.state.pageOffset + 12
        );
        this.setState({ viacleForViewT: slice });
      });
    }
    this.setState({ capacityID: ID });
  }

  search() {
    if (!this.validate()) {
      return;
    }
    let temp = this.state.cars;
    let tempM = this.state.motos;
    switch (this.props.view) {
      case "car":
        searchCarForm(this.state.data, temp).then((response) => {
          temp = response;
          const slice = temp.slice(
            this.state.pageOffset,
            this.state.pageOffset + 12
          );
          this.setState({ viacleForViewC: slice });
        });
        break;
      case "moto":
        searchMotoForm(this.state.data, tempM).then((response) => {
          tempM = response;
          const slice = tempM.slice(
            this.state.pageOffset,
            this.state.pageOffset + 12
          );
          this.setState({ viacleForViewM: slice });
        });
        break;
      case "truck":
        searchTruckForm(this.state.data, tempM).then((response) => {
          tempM = response;
          const slice = tempM.slice(
            this.state.pageOffset,
            this.state.pageOffset + 12
          );
          this.setState({ viacleForViewM: slice });
        });
        break;
      default:
        searchCarForm(this.state.data, temp).then((response) => {
          temp = response;
          const slice = temp.slice(
            this.state.pageOffset,
            this.state.pageOffset + 12
          );
          this.setState({ viacleForViewC: slice });
        });
        break;
    }
  }

  setPage(i) {
    const offSet = i * 12;
    this.setState({ page: i, pageOffset: offSet }, () => {
      switch (this.state.viacleView) {
        case "car":
          this.getAllC();
          break;
        case "moto":
          this.getAllM();
          break;
        case "truck":
          this.getAllT();
          break;
        default:
          this.getAllC();
          break;
      }
    });
  }

  render() {
    let active;
    switch (this.props.view) {
      case "car":
        active = (
          <div>
            <ViacleCardView listViacle={this.state.viacleForViewC} />
            <Pagination
              total={this.state.cars.length}
              page={this.state.page}
              perPage={12}
              setPage={this.setPage}
            />
          </div>
        );
        break;
      case "moto":
        active = (
          <div>
            <ViacleCardView listViacle={this.state.viacleForViewM} />
            <Pagination
              total={this.state.motos.length}
              page={this.state.page}
              perPage={12}
              setPage={this.setPage}
            />
          </div>
        );
        break;
      case "truck":
        active = (
          <div>
            <ViacleCardView listViacle={this.state.viacleForViewT} />
            <Pagination
              total={this.state.trucks.length}
              page={this.state.page}
              perPage={12}
              setPage={this.setPage}
            />
          </div>
        );
        break;
      default:
        active = (
          <div>
            <ViacleCardView listViacle={this.state.viacleForViewC} />
            <Pagination
              total={this.state.cars.length}
              page={this.state.page}
              perPage={12}
              setPage={this.setPage}
            />
          </div>
        );
    }
    return (
      <div>
        <ViacleBar
          adminBar={false}
          changeView={this.changeView}
          toggleFormsView={this.toggleFormsView}
        />
        {this.props.view === "truck" && (
          <CapacityToolBar changeCapacity={this.getAllTruckWithCapacity} />
        )}
        <ViacleForm
          errors={this.state.errors}
          data={this.state.data}
          onSubmit={() => this.search()}
          onChange={this.changeData}
          capacityID={this.state.capacityID}
        />
        {active}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
