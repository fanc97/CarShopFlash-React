import React, { useEffect, useState } from "react";

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import strings from "../../../localization";
import { makeStyles } from "@material-ui/styles";

import { getModelByBrandID } from "../../../services/ModelService";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  show_dont_show: {
    display: "none",
  },
  cont: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
}));

const AddNewForm = ({
  label,
  data,
  onSubmit,
  onChange,
  keyPress,
  onCancel,
  onDelete,
  workOn,
  actC,
  actM,
  actT,
  viacleView,
}) => {
  const classes = useStyles();

  const [actModel, setActModel] = useState(false);

  useEffect(() => {
    if (label === strings.adminBar.model) {
      setActModel(true);
    } else {
      setActModel(false);
    }
  }, [label]);

  const [modelsForView, setModelsForView] = useState([]);
  const [dis_this, setDis_this] = useState(true);
  const [displayModels, setDisplayModels] = useState(false);

  const handleChange = (event) => {
    onChange({ target: event.target });
  };

  const handleBrandChange = (event) => {
    setModelsForView([]);
    data.model = undefined;
    if (event.target.value === undefined) {
      setDisplayModels(true);
      setDis_this(true);
    } else {
      getModelByBrandID(Number(event.target.value)).then((res) => {
        setModelsForView(res);
      });

      setDis_this(false);
      setDisplayModels(false);
    }
    onChange({ target: event.target });
  };

  return (
    <div className={classes.cont}>
      <form id="login-form" onSubmit={onSubmit} action="#">
        <Typography variant="h3" component="h2">
          Work on {label}
        </Typography>
        {actC && actModel && (
          <div>
            <Select
              value={data.brand}
              onChange={handleBrandChange}
              name="brand"
              style={{ width: "100%" }}
            >
              <MenuItem value={undefined} active>
                -----
              </MenuItem>
              {workOn.map((elem) => {
                return (
                  <MenuItem value={elem.ID} key={elem.ID}>
                    {elem.name}
                  </MenuItem>
                );
              })}
            </Select>
            <label>Existing {label}</label>
            <Select
              disabled={dis_this}
              value={data.edit}
              onChange={handleChange}
              name="edit"
              style={{ width: "100%" }}
            >
              <MenuItem>-----</MenuItem>
              {modelsForView.map((elem) => {
                return (
                  <MenuItem
                    className={displayModels ? classes.show_dont_show : ""}
                    value={elem}
                    key={elem.ID}
                  >
                    {elem.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        )}
        {!(actC && actModel) && (
          <Select
            style={{ width: "100%" }}
            name="edit"
            onChange={handleChange}
            value={data.edit}
          >
            <MenuItem>-----</MenuItem>
            {workOn.map((elem) => {
              return (
                <MenuItem value={elem} key={elem.ID}>
                  {elem.name}
                </MenuItem>
              );
            })}
          </Select>
        )}
        <TextField
          label={label}
          fullWidth
          autoFocus
          name="newName"
          type="text"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={data.newName}
          onChange={handleChange}
          onKeyPress={keyPress}
        />

        <div
          className="submit-container"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="contained"
            style={{ marginRight: 5 }}
            color="primary"
            onClick={onSubmit}
          >
            Save
          </Button>
          <Button variant="contained" color="primary" onClick={onCancel}>
            cancel
          </Button>
          <Button
            variant="contained"
            style={{ color: "#fff", backgroundColor: "#e63946" }}
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers }) {
  return { menu: menuReducers };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddNewForm)
);
/* dodatne informacije o autu preko reducera pr. kada hoverujem preko auta da iskoci jos neke inf */
