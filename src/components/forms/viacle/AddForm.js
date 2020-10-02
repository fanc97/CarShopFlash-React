import React from "react";

import { bindActionCreators } from "redux";
import * as Actions from "../../../actions/Actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import strings from "../../../localization";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getError, hasError } from "../../../functions/Validation";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const AddViacleForm = ({
  data,
  handleBrandChange,
  handleChangeee,
  keyPress,
  onCancel,
  onSubmit,
  activeMotoForm,
  activeTruckForm,
  activeCarForm,
  bodyTypes,
  brands,
  regions,
  generation,
  fuels,
  drives,
  capacity,
  usages,
  errors,
  modelsForView,
  dis_this,
  displayModels,
  classes,
  emitions,
  transmitions
}) => {
  return (
    <div>
      <form className={classes.formControl} action="#" id="form">
        <div className={classes.formContener}>
          <div className={classes.partion1}>
            <label>Brand</label>
            <Select
              error={hasError(errors, "brand")}
              helperText={getError(errors, "brand")}
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

            <label>Demaged</label>
            <Select
              value={data.demaged}
              onChange={handleChangeee}
              name="demaged"
              style={{ width: "100%" }}
            >
              <MenuItem>-----</MenuItem>

              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <label>Generation</label>
            <Select
              value={data.generation}
              onChange={handleChangeee}
              name="generation"
              style={{ width: "100%" }}
            >
              <MenuItem>-----</MenuItem>
              {generation.map((elem, i) => {
                return (
                  <MenuItem key={i} value={`${elem}-01-01`}>
                    {elem}
                  </MenuItem>
                );
              })}
            </Select>
            <label className={activeMotoForm ? classes.show_dont_show : ""}>
              Drive
            </label>
            <Select
              error={hasError(errors, "drive")}
              helperText={getError(errors, "drive")}
              label="region"
              value={data.drive}
              onChange={handleChangeee}
              name="drive"
              style={{ width: "100%" }}
              className={activeMotoForm ? classes.show_dont_show : ""}
            >
              <MenuItem>-----</MenuItem>
              {drives.map(elem => {
                return (
                  <MenuItem value={elem.ID} key={elem.ID}>
                    {elem.name}
                  </MenuItem>
                );
              })}
            </Select>

            <label>Engine Emission</label>
            <Select
              label="Engine Emision"
              value={data.EngineEmision}
              onChange={handleChangeee}
              name="EngineEmision"
              style={{ width: "100%" }}
            >
              <MenuItem>-----</MenuItem>

              {emitions.map(elem => {
                return (
                  <MenuItem value={elem.ID} key={elem.ID}>
                    {elem.name}
                  </MenuItem>
                );
              })}
            </Select>
            <label>Reserve Key</label>
            <Select
              label="First Owner"
              value={data.reserveKet}
              onChange={handleChangeee}
              name="reserveKey"
              style={{ width: "100%" }}
            >
              <MenuItem>-----</MenuItem>

              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <label className={activeMotoForm ? classes.show_dont_show : ""}>
              Number of Doors
            </label>
            <Select
              error={hasError(errors, "numberOfDoors")}
              helperText={getError(errors, "numberOfDoors")}
              className={activeMotoForm ? classes.show_dont_show : ""}
              value={data.numberOfDoors}
              onChange={handleChangeee}
              name="numberOfDoors"
              style={{ width: "100%" }}
            >
              <MenuItem>-----</MenuItem>

              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
            <div style={{ marginTop: "10px" }}>
              <label>Add image</label>
              <input
                name="file"
                onChange={handleChangeee}
                className={classes.inputFile}
                type="file"
                id="photo"
              />
            </div>
          </div>
          <div className={classes.partion1}>
            <label className={activeMotoForm ? classes.show_dont_show : ""}>
              Model
            </label>
            <TextField
              error={hasError(errors, "model")}
              helperText={getError(errors, "model")}
              className={activeMotoForm ? "" : classes.show_dont_show}
              label="Model"
              fullWidth
              name="model"
              onChange={handleChangeee}
              margin="normal"
              value={data.model}
            />
            {
              <Select
                error={hasError(errors, "model")}
                helperText={getError(errors, "model")}
                className={
                  activeCarForm || activeTruckForm ? "" : classes.show_dont_show
                }
                label="model"
                disabled={dis_this}
                value={data.model}
                onChange={handleChangeee}
                name="model"
                style={{ width: "100%" }}
              >
                <MenuItem>-----</MenuItem>
                {activeCarForm ||
                  (activeTruckForm &&
                    modelsForView.map(elem => {
                      return (
                        <MenuItem
                          className={
                            displayModels ? classes.show_dont_show : ""
                          }
                          value={elem.ID}
                          key={elem.ID}
                        >
                          {elem.name}
                        </MenuItem>
                      );
                    }))}
              </Select>
            }
            <label>Region</label>
            <Select
              error={hasError(errors, "region")}
              helperText={getError(errors, "region")}
              label="region"
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
            <label
              className={
                activeMotoForm || activeCarForm ? classes.show_dont_show : ""
              }
            >
              Capacity
            </label>
            <Select
              error={hasError(errors, "capacity")}
              helperText={getError(errors, "capacity")}
              label="region"
              value={data.capacity}
              onChange={handleChangeee}
              name="capacity"
              style={{ width: "100%" }}
              className={
                activeMotoForm || activeCarForm ? classes.show_dont_show : ""
              }
            >
              <MenuItem>-----</MenuItem>
              {capacity.map(elem => {
                return (
                  <MenuItem value={elem.ID} key={elem.ID}>
                    {elem.name}
                  </MenuItem>
                );
              })}
            </Select>
            <label>First Owner</label>
            <Select
              label="First Owner"
              value={data.firstOwner}
              onChange={handleChangeee}
              name="firstOwner"
              style={{ width: "100%" }}
            >
              <MenuItem>-----</MenuItem>

              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <label>Garantion</label>
            <Select
              value={data.garantion}
              onChange={handleChangeee}
              name="garantion"
              style={{ width: "100%" }}
            >
              <MenuItem>-----</MenuItem>

              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <label>Transmition</label>
            <Select
              label="Transmition"
              value={data.transmition}
              onChange={handleChangeee}
              name="transmition"
              style={{ width: "100%" }}
            >
              <MenuItem>-----</MenuItem>

              {transmitions.map(elem => {
                return (
                  <MenuItem value={elem.ID} key={elem.ID}>
                    {elem.name}
                  </MenuItem>
                );
              })}
            </Select>
            <label>Body</label>
            <Select
              error={hasError(errors, "carBody")}
              helperText={getError(errors, "carBody")}
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
            <label>New or Used</label>
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
              label="Price"
              fullWidth
              name="price"
              onChange={handleChangeee}
              margin="normal"
              value={data.price}
            />
            <TextField
              error={hasError(errors, "volume")}
              helperText={getError(errors, "volume")}
              label="Engine Volume"
              fullWidth
              name="volume"
              onChange={handleChangeee}
              margin="normal"
              value={data.volume}
            />
            <TextField
              error={hasError(errors, "numberOfSeats")}
              helperText={getError(errors, "numberOfSeats")}
              label="Number of Seats"
              fullWidth
              name="numberOfSeats"
              onChange={handleChangeee}
              margin="normal"
              value={data.numberOfSeats}
            />
            <TextField
              label="Color"
              fullWidth
              name="color"
              onChange={handleChangeee}
              margin="normal"
              value={data.color}
            />
            <TextField
              label={"registration"}
              fullWidth
              autoFocus
              name="registrationEnd"
              type="date"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              value={data.registrationEnd}
              onChange={handleChangeee}
              onKeyPress={keyPress}
            />
            <label>Fuel</label>
            <Select
              error={hasError(errors, "fuel")}
              helperText={getError(errors, "fuel")}
              label={"Fuel"}
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

            <label className={activeMotoForm ? classes.show_dont_show : ""}>
              Ac
            </label>
            <Select
              className={activeMotoForm ? classes.show_dont_show : ""}
              label="Ac"
              value={data.ac}
              onChange={handleChangeee}
              name="ac"
              style={{ width: "100%" }}
            >
              <MenuItem>-----</MenuItem>

              <MenuItem value={true}>Have</MenuItem>
              <MenuItem value={false}>Dont Have</MenuItem>
            </Select>
          </div>
        </div>
        <div>
          <TextField
            error={hasError(errors, "description")}
            helperText={getError(errors, "description")}
            label="Description"
            fullWidth
            name="description"
            onChange={handleChangeee}
            margin="normal"
            value={data.description}
          />
          <div className={classes.btns}>
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Submit AD
            </Button>
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              color="primary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers, authReducers }) {
  return { menu: menuReducers, auth: authReducers };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddViacleForm)
);
