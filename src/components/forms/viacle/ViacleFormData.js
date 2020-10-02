import React from "react";

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { TextField, Button } from "@material-ui/core";
import { hasError, getError } from "../../../functions/Validation";

const ViacleFormData = ({
  classes,
  data,
  handleBrandChange,
  brands,
  errors,
  regions,
  bodyTypes,
  generation,
  handleChangeee,
  modelsForView,
  dis_this,
  displayModels,
  usages,
  fuels,
  onSubmit,
  activCar,
  activMoto,
  activTruck
}) => {
  return (
    <form className={classes.formControl} action="#">
      <div className={classes.formContener}>
        <div className={classes.partion1}>
          <labe>Brand</labe>
          <Select
            label="Brand"
            placeholder="Brand"
            value={data.brand}
            onChange={handleBrandChange}
            name="brand"
            style={{ width: "100%" }}
          >
            <MenuItem value={undefined} active>
              -----
            </MenuItem>
            {brands.map(elem => {
              return (
                <MenuItem value={elem.ID} key={elem.ID}>
                  {elem.name}
                </MenuItem>
              );
            })}
          </Select>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <labe>From</labe>
            <Select
              style={{ width: "60px" }}
              value={data.fromGeneration}
              onChange={handleChangeee}
              name="fromGeneration"
            >
              {" "}
              <MenuItem>-----</MenuItem>
              {generation.map((elem, i) => {
                return (
                  <MenuItem key={i} value={elem}>
                    {elem}
                  </MenuItem>
                );
              })}
            </Select>
            <labe>To</labe>
            <Select
              value={data.toGeneration}
              style={{ width: "60px" }}
              onChange={handleChangeee}
              name="toGeneration"
            >
              {" "}
              <MenuItem>-----</MenuItem>
              {generation.map((elem, i) => {
                return (
                  <MenuItem key={i} value={elem}>
                    {elem}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <labe>Region</labe>
          <Select
            value={data.region}
            onChange={handleChangeee}
            name="region"
            style={{ width: "100%" }}
          >
            {" "}
            <MenuItem>-----</MenuItem>
            {regions.map(elem => {
              return (
                <MenuItem value={elem.ID} key={elem.ID}>
                  {elem.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className={classes.partion1}>
          {(activCar || activTruck) && (
            <div style={{ width: "100%", textAlign: "center" }}>
              <labe>Model</labe>
              <Select
                disabled={dis_this}
                value={data.model}
                onChange={handleChangeee}
                name="model"
                style={{ width: "100%" }}
              >
                <MenuItem>-----</MenuItem>
                {modelsForView.map(elem => {
                  return (
                    <MenuItem
                      className={displayModels ? classes.show_dont_show : ""}
                      value={elem.ID}
                      key={elem.ID}
                    >
                      {elem.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          )}
          {activMoto && (
            <TextField
              label="Model"
              fullWidth
              name="model"
              onChange={handleChangeee}
              margin="normal"
              value={data.model}
            />
          )}
          <labe>Body</labe>
          <Select
            value={data.carBody}
            onChange={handleChangeee}
            name="carBody"
            style={{ width: "100%" }}
          >
            {" "}
            <MenuItem>-----</MenuItem>
            {bodyTypes.map(elem => {
              return (
                <MenuItem value={elem.ID} key={elem.ID}>
                  {elem.name}
                </MenuItem>
              );
            })}
          </Select>
          <labe>Usage</labe>
          <Select
            label="secondHand"
            value={data.secondHand}
            onChange={handleChangeee}
            name="secondHand"
            style={{ width: "100%" }}
          >
            {" "}
            <MenuItem>-----</MenuItem>
            {usages.map(elem => {
              return (
                <MenuItem value={elem.ID} key={elem.ID}>
                  {elem.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className={classes.partion1} style={{ paddingRight: "0" }}>
          <TextField
            error={hasError(errors, "price")}
            helperText={getError(errors, "price")}
            label="to Price"
            fullWidth
            name="price"
            onChange={handleChangeee}
            margin="normal"
            value={data.price}
          />
          {activCar && (
            <div style={{ width: "100%", textAlign: "center" }}>
              <label>Fuel</label>
              <Select
                label="Fuel"
                value={data.fuel}
                onChange={handleChangeee}
                name="fuel"
                style={{ width: "100%" }}
              >
                {" "}
                <MenuItem>-----</MenuItem>
                {fuels.map(elem => {
                  return (
                    <MenuItem value={elem.ID} key={elem.ID}>
                      {elem.name}{" "}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          )}
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers }) {
  return { menu: menuReducers };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViacleFormData)
);
