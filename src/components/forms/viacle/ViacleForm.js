import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

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
import { getAllUsages } from "../../../services/UsageService";
import {
  getAllBodyTypes,
  getAllMotoBodyTypes,
  getAllTruckBodyTypes,
} from "../../../services/BodyType";
import {
  getModelByBrandID,
  getModelByTruckID,
} from "../../../services/ModelService";
import ViacleFormData from "./ViacleFormData";
import { getAllCapacity } from "../../../services/CapacityService";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "5px",
    width: "100%",
    height: "25vh",
  },
  formContener: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
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
    // backgroundColor: "red"
    display: "none",
  },
}));

const ViacleForm = ({ data, onChange, onSubmit, view, capacityID, errors }) => {
  const classes = useStyles();

  const [generation, setDates] = useState([]);
  const [modelsForView, setModelsForView] = useState([]);
  const [dis_this, setDis_this] = useState(true);
  const [displayModels, setDisplayModels] = useState(false);

  const [usages, setUsages] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [capacity, setCapacity] = useState([]);

  const [activCar, setActivCar] = useState(false);
  const [activMoto, setActivMoto] = useState(false);
  const [activTruck, setActivTruck] = useState(false);

  const handleChangeee = (event) => {
    onChange({ target: event.target });
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
    if (view === "truck") {
      if (capacityID != "all") {
        let newBody = bodyTypes;
        newBody = newBody.filter((el) => {
          return el.capacityID.forEach(
            (element) =>
              // console.log(element);
              element === capacityID
          );
        });
        console.log(newBody);
      }
    }
  }, [capacityID]);

  useEffect(() => {
    for (let i = new Date().getFullYear(); 1950 < i; i--) {
      setDates((generation) => [...generation, i]);
    }
    getAllDataComon();
  }, []);

  useEffect(() => {
    switch (view) {
      case "car":
        setActivCar(true);
        setActivMoto(false);
        setActivTruck(false);
        getAllCarData();
        break;
      case "moto":
        setActivCar(false);
        setActivMoto(true);
        setActivTruck(false);
        getAllMotoData();
        break;
      case "truck":
        setActivCar(false);
        setActivMoto(false);
        setActivTruck(true);
        getAllTruckData();
        break;
      default:
        setActivCar(true);
        setActivMoto(false);
        setActivTruck(false);
        getAllCarData();
        break;
    }
  }, [view]);

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

  const getAllDataComon = () => {
    getAllRegions().then((data) => {
      setRegions(data);
    });
    getAllUsages().then((data) => {
      setUsages(data);
    });
  };

  return (
    <div>
      <ViacleFormData
        errors={errors}
        brands={brands}
        fuels={fuels}
        data={data}
        regions={regions}
        bodyTypes={bodyTypes}
        usages={usages}
        handleBrandChange={handleBrandChange}
        handleChangeee={handleChangeee}
        classes={classes}
        generation={generation}
        modelsForView={modelsForView}
        dis_this={dis_this}
        displayModels={displayModels}
        activCar={activCar}
        activMoto={activMoto}
        activTruck={activTruck}
        capacity={capacity}
        onSubmit={onSubmit}
      />
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ menuReducers, toggleViewReducer }) {
  return { menu: menuReducers, view: toggleViewReducer.view };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViacleForm)
);
