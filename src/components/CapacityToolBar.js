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
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { getAllCapacity } from "../services/CapacityService";

class CapacityToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capacity: "all",
      capacitys: []
    };
  }
  componentDidMount() {
    getAllCapacity().then(data => {
      this.setState({ capacitys: data });
    });
  }

  activateCapacity(capacity) {
    this.setState({ capacity: capacity });
    this.props.changeCapacity(capacity);
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
            marginTop: "10px"
          }}
          variant="dense"
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly"
            }}
          >
            <IconButton
              onClick={() => this.activateCapacity("all")}
              className="viacle-btn "
            >
              <Typography
                variant="body2"
                component="span"
                className={this.state.capacity === "all" ? "activeBarLink" : ""}
              >
                All
              </Typography>
            </IconButton>
            {this.state.capacitys.map(elem => {
              return (
                <IconButton
                  onClick={() => this.activateCapacity(elem.ID)}
                  className="viacle-btn"
                >
                  <Typography
                    variant="body2"
                    component="span"
                    className={
                      this.state.capacity === elem.ID ? "activeBarLink" : ""
                    }
                  >
                    {elem.name}
                  </Typography>
                </IconButton>
              );
            })}
          </div>
        </Toolbar>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers }) {
  return { menu: menuReducers };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CapacityToolBar)
);
