import React, { useEffect, useState } from "react";

import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

import {
  getOnaBrand,
  getOnaMotoBrand,
  getOnaTruckBrand,
} from "../services/BrandService";
import { getOneModel, getOneTruckModel } from "../services/ModelService";

const useStyles = makeStyles({
  descr: {
    maxHeight: "150px",
    overflow: "hidden",
  },
  itemHeading: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "baseline",
  },
  hide: {
    display: "none",
  },
});

const CardElemComp = ({ elem, view }) => {
  const classes = useStyles();

  const [model, setModel] = useState({});
  const [brand, setBrand] = useState({});

  const [activCar, setActiveCar] = useState(false);
  const [activMoto, setActiveMoto] = useState(false);
  const [activTruc, setActiveTruck] = useState(false);

  useEffect(() => {
    switch (view) {
      case "car":
        setActiveCar(true);
        setActiveMoto(false);
        setActiveTruck(false);
        getOnaBrand(elem.brandID).then((e) => {
          setBrand(e);
        });
        getOneModel(elem.modelID).then((e) => {
          setModel(e);
        });
        break;
      case "moto":
        setActiveMoto(true);
        setActiveCar(false);
        setActiveTruck(false);
        getOnaMotoBrand(elem.brandID).then((e) => {
          setBrand(e);
        });
        break;
      case "truck":
        setActiveMoto(false);
        setActiveCar(false);
        setActiveTruck(true);
        getOnaTruckBrand(elem.brandID).then((e) => {
          setBrand(e);
        });
        getOneTruckModel(elem.modelID).then((e) => {
          setModel(e);
        });
        break;
    }
  }, [elem]);

  return (
    <Card className={classes.item}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={elem.picture}
          title="Contemplative Reptile"
        />
        <CardContent>
          <div className={classes.itemInfo}>
            <div className={classes.itemHeading}>
              <Typography gutterBottom variant="h5" component="h2">
                {brand.name},
              </Typography>
              {(activCar || activTruc) && (
                <Typography gutterBottom variant="h6" component="h2">
                  {model.name}
                </Typography>
              )}
              {activMoto && (
                <Typography gutterBottom variant="h6" component="h2">
                  {elem.modelID}
                </Typography>
              )}
            </div>
            <Typography gutterBottom variant="h4" component="h2">
              {elem.price}
            </Typography>
          </div>
          <Typography
            className={classes.descr}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {elem.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
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
  connect(mapStateToProps, mapDispatchToProps)(CardElemComp)
);
