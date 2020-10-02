import React, { useEffect, useState } from "react";

import { bindActionCreators } from "redux";
import * as Actions from "../../../actions/Actions";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import strings from "../../../localization";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getError, hasError } from "../../../functions/Validation";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import {
  getAllBrands,
  getAllMotoBrands,
  getAllTruckBrands,
} from "../../../services/BrandService";
import { getAllRegions } from "../../../services/RegionService";
import {
  getAllFuels,
  getAllMotoFuels,
  getAllTruckFuels,
} from "../../../services/FuelService";
import { getAllDrives } from "../../../services/DriveService";
import { getAllUsages } from "../../../services/UsageService";
import { getAllEmisions } from "../../../services/EmisionService";
import { getAllTransmition } from "../../../services/TransmitionService";
import {
  getAllBodyTypes,
  getAllMotoBodyTypes,
  getAllTruckBodyTypes,
} from "../../../services/BodyType";
import {
  getModelByBrandID,
  getModelByTruckID,
} from "../../../services/ModelService";
import AddForm from "./AddForm";
import { getAllCapacity } from "../../../services/CapacityService";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  formContener: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "center",
    height: "100%",
  },
  partion1: {
    flex: "1 0 33.33%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100%",
    paddingRight: "20px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  show_dont_show: {
    display: "none",
  },
  btns: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputFile: {
    width: "100px",
  },
  AddViacleFormContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));

const AddViacleForm = ({
  onSubmit,
  onChange,
  errors,
  data,
  setPhoto,
  keyPress,
  onCancel,
  view,
}) => {
  const classes = useStyles();

  const [generation, setDates] = useState([]);
  const [modelsForView, setModelsForView] = useState([]);
  const [dis_this, setDis_this] = useState(true);
  const [displayModels, setDisplayModels] = useState(false);

  const [usages, setUsages] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [drives, setDrives] = useState([]);
  const [brands, setBrands] = useState([]);
  const [emitions, setEmitions] = useState([]);
  const [transmitions, setTransmitions] = useState([]);
  const [capacity, setCapacity] = useState([]);

  const [activeCarForm, setActiveCarForm] = useState(true);
  const [activeTruckForm, setActiveTruckForm] = useState(false);
  const [activeMotoForm, setActiveMotoForm] = useState(false);

  const handleChangeee = (event) => {
    if (event.target.name === "file") {
      const file = document.querySelector("#photo").files[0];

      setPhoto(file);
    } else {
      onChange({ target: event.target });
    }
  };

  const handleBrandChange = (event) => {
    setModelsForView([]);

    data.model = undefined;

    if (event.target.value === undefined) {
      setDisplayModels(true);
      setDis_this(true);
    } else {
      if (view === "car") {
        getModelByBrandID(Number(event.target.value)).then((res) => {
          setModelsForView(res);
        });
      } else {
        getModelByTruckID(Number(event.target.value)).then((res) => {
          setModelsForView(res);
        });
      }

      setDis_this(false);
      setDisplayModels(false);
    }
    onChange({ target: event.target });
  };

  useEffect(() => {
    for (let i = new Date().getFullYear(); 1950 < i; i--) {
      setDates((generation) => [...generation, i]);
    }
    getAllDataComon();
  }, []);

  useEffect(() => {
    switch (view) {
      case "car":
        setActiveMotoForm(false);
        setActiveTruckForm(false);
        setActiveCarForm(true);
        getAllCarData();
        break;
      case "moto":
        setActiveMotoForm(true);
        setActiveTruckForm(false);
        setActiveCarForm(false);
        setDisplayModels(true);
        setDis_this(true);
        getAllMotoData();
        break;
      case "truck":
        setActiveMotoForm(false);
        setActiveTruckForm(true);
        setActiveCarForm(false);
        getAllTruckData();
        break;
      default:
        setActiveMotoForm(false);
        setActiveTruckForm(false);
        setActiveCarForm(true);
        getAllCarData();
    }
  }, [view]);

  const getAllDataComon = () => {
    getAllRegions().then((data) => {
      setRegions(data);
    });
    getAllUsages().then((data) => {
      setUsages(data);
    });

    getAllDrives().then((data) => {
      setDrives(data);
    });
    getAllEmisions().then((data) => {
      setEmitions(data);
    });
    getAllTransmition().then((data) => {
      setTransmitions(data);
    });
  };

  const getAllCarData = () => {
    getAllBrands().then((data) => {
      setBrands(data);
    });
    getAllBodyTypes().then((data) => {
      setBodyTypes(data);
    });
    getAllFuels().then((data) => {
      setFuels(data);
    });
  };

  const getAllMotoData = () => {
    getAllMotoBrands().then((data) => {
      setBrands(data);
    });
    getAllMotoBodyTypes().then((data) => {
      setBodyTypes(data);
    });
    getAllMotoFuels().then((data) => {
      setFuels(data);
    });
  };

  const getAllTruckData = () => {
    getAllTruckBrands().then((data) => {
      setBrands(data);
    });
    getAllTruckBodyTypes().then((data) => {
      setBodyTypes(data);
    });
    getAllTruckFuels().then((data) => {
      setFuels(data);
    });
    getAllCapacity().then((data) => {
      setCapacity(data);
    });
  };

  return (
    <div className={classes.AddViacleFormContainer}>
      {activeCarForm && (
        <AddForm
          errors={errors}
          onSubmit={onSubmit}
          onChange={onChange}
          onCancel={onCancel}
          keyPress={keyPress}
          data={data}
          activeTruckForm={activeTruckForm}
          activeMotoForm={activeMotoForm}
          activeCarForm={activeCarForm}
          dis_this={dis_this}
          displayModels={displayModels}
          brands={brands}
          usages={usages}
          drives={drives}
          bodyTypes={bodyTypes}
          generation={generation}
          regions={regions}
          capacity={capacity}
          handleBrandChange={handleBrandChange}
          handleChangeee={handleChangeee}
          fuels={fuels}
          classes={classes}
          modelsForView={modelsForView}
          emitions={emitions}
          transmitions={transmitions}
        />
      )}
      {activeMotoForm && (
        <AddForm
          errors={errors}
          onSubmit={onSubmit}
          onChange={onChange}
          onCancel={onCancel}
          keyPress={keyPress}
          data={data}
          activeTruckForm={activeTruckForm}
          activeMotoForm={activeMotoForm}
          activeCarForm={activeCarForm}
          dis_this={dis_this}
          displayModels={displayModels}
          brands={brands}
          usages={usages}
          drives={drives}
          bodyTypes={bodyTypes}
          generation={generation}
          regions={regions}
          capacity={capacity}
          handleBrandChange={handleBrandChange}
          handleChangeee={handleChangeee}
          fuels={fuels}
          classes={classes}
          emitions={emitions}
          transmitions={transmitions}
        />
      )}
      {activeTruckForm && (
        <AddForm
          errors={errors}
          onSubmit={onSubmit}
          onChange={onChange}
          onCancel={onCancel}
          keyPress={keyPress}
          data={data}
          activeTruckForm={activeTruckForm}
          activeMotoForm={activeMotoForm}
          activeCarForm={activeCarForm}
          dis_this={dis_this}
          displayModels={displayModels}
          brands={brands}
          usages={usages}
          drives={drives}
          bodyTypes={bodyTypes}
          generation={generation}
          regions={regions}
          handleBrandChange={handleBrandChange}
          handleChangeee={handleChangeee}
          modelsForView={modelsForView}
          fuels={fuels}
          capacity={capacity}
          classes={classes}
          emitions={emitions}
          transmitions={transmitions}
        />
      )}
    </div>
  );
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers, authReducers, toggleViewReducer }) {
  return {
    menu: menuReducers,
    auth: authReducers,
    view: toggleViewReducer.view,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddViacleForm)
);
