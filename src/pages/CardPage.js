import React from "react";

import { bindActionCreators } from "redux";
import * as Actions from "../actions/Actions";
import { withRouter, Link } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Page from "../common/Page";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { getOnaCar } from "../services/CarService";
import { getOnaMoto } from "../services/MotoService";
import HomeIcon from "@material-ui/icons/Home";

import {
  getOneBodyType,
  getOneMotoBodyType,
  getOneTruckBodyType,
} from "../services/BodyType";
import {
  getOnaBrand,
  getOnaMotoBrand,
  getOnaTruckBrand,
} from "../services/BrandService";
import { getOneFuel, getOneTruckFuel } from "../services/FuelService";
import { getOneModel, getOneTruckModel } from "../services/ModelService";
import { getOneRegion } from "../services/RegionService";
import { getOneUsage } from "../services/UsageService";
import { getOneDrive } from "../services/DriveService";
import { getOneEmision } from "../services/EmisionService";
import { getOneTransmition } from "../services/TransmitionService";
import { getOnaTruck } from "../services/TruckService";
import { getOnaCapacity } from "../services/CapacityService";

class CardPage extends Page {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {},
      viacle: {},
      bodyType: {},
      model: {},
      fuel: {},
      brand: {},
      region: {},
      usage: {},
      drive: {},
      capacity: {},
      emision: {},
      transmition: {},
      viacleView: "",
      activCar: false,
      activMoto: false,
      activTruck: false,
    };
  }

  componentDidMount() {
    let ID = this.props.location.search.slice(4);

    switch (this.props.view) {
      case "car":
        this.setState({ activCar: true });
        this.getCarInfo(ID);
        break;
      case "moto":
        this.setState({ activMoto: true });
        this.getMotoInfo(ID);
        break;
      case "truck":
        this.setState({ activTruck: true });
        this.getTruckInfo(ID);
        break;
    }
  }

  getCarInfo(ID) {
    getOnaCar(ID)
      .then((data) => {
        this.setState({ viacle: data });
      })
      .then(() => {
        getOnaBrand(this.state.viacle.brandID).then((e) => {
          this.setState({ brand: e });
        });
        getOneBodyType(this.state.viacle.bodyTypeID).then((e) => {
          this.setState({ bodyType: e });
        });
        getOneModel(this.state.viacle.modelID).then((e) => {
          this.setState({ model: e });
        });
        getOneDrive(this.state.viacle.driveID).then((e) => {
          this.setState({ drive: e });
        });
        getOneFuel(this.state.viacle.fuelID).then((e) => {
          this.setState({ fuel: e });
        });

        this.getComonData();
      });
  }
  getMotoInfo(ID) {
    getOnaMoto(ID)
      .then((data) => {
        this.setState({ viacle: data });
      })
      .then(() => {
        getOneMotoBodyType(this.state.viacle.bodyTypeID).then((e) => {
          this.setState({ bodyType: e });
        });

        getOnaMotoBrand(this.state.viacle.brandID).then((e) => {
          this.setState({ brand: e });
        });

        this.getComonData();
      });
  }
  getTruckInfo(ID) {
    getOnaTruck(ID)
      .then((data) => {
        this.setState({ viacle: data });
      })
      .then(() => {
        getOnaTruckBrand(this.state.viacle.brandID).then((e) => {
          this.setState({ brand: e });
        });
        getOneTruckBodyType(this.state.viacle.bodyTypeID).then((e) => {
          this.setState({ bodyType: e });
        });
        getOneTruckModel(this.state.viacle.modelID).then((e) => {
          this.setState({ model: e });
        });
        getOneDrive(this.state.viacle.driveID).then((e) => {
          this.setState({ drive: e });
        });
        getOneTruckFuel(this.state.viacle.fuelID).then((e) => {
          this.setState({ fuel: e });
        });
        getOnaCapacity(this.state.viacle.capacityID).then((e) => {
          this.setState({ capacity: e });
        });

        this.getComonData();
      });
  }
  getComonData() {
    getOneRegion(this.state.viacle.regionID).then((e) => {
      this.setState({ region: e });
    });
    getOneUsage(this.state.viacle.usagedID).then((e) => {
      this.setState({ usage: e });
    });
    getOneEmision(this.state.viacle.emisionID).then((e) => {
      this.setState({ emision: e });
    });
    getOneTransmition(this.state.viacle.transmitionID).then((e) => {
      this.setState({ transmition: e });
    });
  }

  cancel() {
    this.props.history.push({ pathname: "/" });
  }

  isRegistred() {
    let curentDate = new Date();
    let lastRegistration = new Date(this.state.viacle.registrationEnd);

    if (lastRegistration >= curentDate) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <div className="car-info-show">
          <div className="car-info-show-text">
            <h1>{this.state.brand.name},</h1>
            {this.state.activCar ||
              (this.state.activTruck && <h2>{this.state.model.name}</h2>)}
            {this.state.activMoto && <h2>{this.state.viacle.modelID}</h2>}
            <span className="car-info-show-span">
              Year of Creation:
              {new Date(this.state.viacle.creationData).getFullYear()}
            </span>
          </div>
          <div>
            <Link to="/">
              <HomeIcon
                style={{
                  fontSize: "80px",
                  color: "rgb(100,100,100)",
                  marginRight: "50px",
                }}
              />
            </Link>
          </div>
        </div>
        <div className="car-image-container">
          <img className="car-img-src" src={this.state.viacle.picture}></img>
          <div className="car-info-container">
            <p className="car-info-pricing">{this.state.viacle.price}</p>
            <p>{this.state.viacle.color}</p>
            <p>{new Date(this.state.viacle.creationData).getFullYear()}</p>
            <p>{this.state.bodyType.name}</p>
            <p>{this.state.model.name}</p>
            <p className={this.state.activMoto ? "hide" : ""}>
              {this.state.fuel.name}
            </p>
            <p>{this.state.drive.name}</p>
            <p>{this.state.usage.name}</p>
            <p>Ad Created:{this.state.viacle.ADcreated}</p>
            <p>{this.state.viacle.trade}</p>
            <p>{this.state.region.name}</p>
            <p>Volume: {this.state.viacle.engineVolume}</p>
            {this.state.activTruck && (
              <p>Capacity: {this.state.capacity.name}</p>
            )}
          </div>
        </div>
        <div className="grid-spec">
          <Typography variant="h6" className="page-spec-title">
            Viacle Spacification
          </Typography>
          <div className="page-viacle-spec-cont">
            <div className="page-viacle-spec-cont-part">
              <List className="page-list-specification">
                <ListItem>
                  <ListItemText primary="Emisnion level" />
                </ListItem>
                <ListItem>
                  <ListItemText primary={this.state.emision.name} />
                </ListItem>
              </List>
              {this.state.activTruck && (
                <List className="page-list-specification">
                  <ListItem>
                    <ListItemText primary="Horese power" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={this.state.viacle.horsePower} />
                  </ListItem>
                </List>
              )}
              <List className="page-list-specification">
                <ListItem>
                  <ListItemText primary="Transmiter" />
                </ListItem>
                <ListItem>
                  <ListItemText primary={this.state.transmition.name} />
                </ListItem>
              </List>
              <List className="page-list-specification">
                <ListItem>
                  <ListItemText primary="Number of Seats" />
                </ListItem>
                <ListItem>
                  <ListItemText primary={this.state.viacle.numberOfSeats} />
                </ListItem>
              </List>
              {this.state.activCar && (
                <List className="page-list-specification">
                  <ListItem>
                    <ListItemText primary="AC" />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={this.state.viacle.aC ? "have" : "dont have"}
                    />
                  </ListItem>
                </List>
              )}
            </div>
            <div className="page-viacle-spec-cont-part">
              {this.state.activCar && (
                <List className="page-list-specification">
                  <ListItem>
                    <ListItemText primary="Drive" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={this.state.drive.name} />
                  </ListItem>
                </List>
              )}
              {this.state.activCar && (
                <List className="page-list-specification">
                  <ListItem>
                    <ListItemText primary="Number of doors" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={this.state.viacle.numberOfDoors} />
                  </ListItem>
                </List>
              )}
              <List className="page-list-specification">
                <ListItem>
                  <ListItemText primary="Color" />
                </ListItem>
                <ListItem>
                  <ListItemText primary={this.state.viacle.color} />
                </ListItem>
              </List>
              <List className="page-list-specification">
                <ListItem>
                  <ListItemText primary="Registration" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      this.isRegistred()
                        ? "until " + this.state.viacle.registrationEnd
                        : "Ended " + this.state.viacle.registrationEnd
                    }
                  />
                </ListItem>
              </List>
              <List className="page-list-specification">
                <ListItem>
                  <ListItemText primary="Demage" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={this.state.viacle.damaged ? "yes" : "no"}
                  />
                </ListItem>
              </List>
            </div>
          </div>
        </div>
        <div className="grid-spec">
          <Typography variant="h6" className="page-spec-title blue">
            State
          </Typography>
          <div className="tree-parts">
            <div className="second-partition">
              <List className="page-list-specification second-partition">
                <ListItem>
                  <ListItemText primary="Reserve Key" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={this.state.viacle.reserveKey ? "yes" : "no"}
                  />
                </ListItem>
              </List>
            </div>
            <div className="second-partition">
              <List className="page-list-specification second-partition">
                <ListItem>
                  <ListItemText primary="First Owner" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={this.state.viacle.firstOwner ? "yes" : "no"}
                  />
                </ListItem>
              </List>
            </div>
            <div className="second-partition">
              <List className="page-list-specification second-partition">
                <ListItem>
                  <ListItemText primary="Grantion" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={this.state.viacle.garantion ? "yes" : "no"}
                  />
                </ListItem>
              </List>
            </div>
          </div>
        </div>
        <div className="grid-spec">
          <Typography variant="h4" className="page-spec-title">
            Description
          </Typography>
          <div className="page-viacle-spec-cont">
            <Typography variant="h6" className="page-spec-descrption">
              {this.state.viacle.description}
            </Typography>
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
    },
    dispatch
  );
}

function mapStateToProps({ menuReducers, toggleViewReducer }) {
  return { menu: menuReducers, view: toggleViewReducer.view };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CardPage)
);
// export default withRouter(Signup);
