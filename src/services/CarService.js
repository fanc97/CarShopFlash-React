import { firebase } from "../config";

export async function searchCarForm(searchObj, cars) {
  let newCars = cars;

  if (searchObj.fuel && searchObj.fuel != undefined) {
    newCars = newCars.filter((el) => {
      return el.fuelID === searchObj.fuel;
    });
  }
  if (searchObj.carBody && searchObj.carBody != undefined) {
    newCars = newCars.filter((el) => {
      return el.bodyTypeID === searchObj.carBody;
    });
  }
  if (searchObj.brand && searchObj.brand != undefined) {
    newCars = newCars.filter((el) => {
      return el.brandID === searchObj.brand;
    });
  }
  if (searchObj.fromGeneration && searchObj.fromGeneration != undefined) {
    newCars = newCars.filter((el) => {
      console.log(
        new Date(el.creationData).getFullYear(),
        searchObj.toGeneration
      );
      return (
        new Date(el.creationData).getFullYear() >= searchObj.fromGeneration
      );
    });
  }
  if (searchObj.toGeneration && searchObj.toGeneration != undefined) {
    newCars = newCars.filter((el) => {
      console.log(
        new Date(el.creationData).getFullYear(),
        searchObj.toGeneration
      );
      return new Date(el.creationData).getFullYear() <= searchObj.toGeneration;
    });
  }
  if (searchObj.model && searchObj.model != undefined) {
    newCars = newCars.filter((el) => {
      return el.modelID === searchObj.model;
    });
  }
  if (searchObj.price && searchObj.price != undefined) {
    newCars = newCars.filter((el) => {
      return el.price >= searchObj.price;
    });
  }
  if (searchObj.region && searchObj.region != undefined) {
    newCars = newCars.filter((el) => {
      return el.regionID === searchObj.region;
    });
  }
  if (searchObj.secondHand && searchObj.secondHand != undefined) {
    newCars = cars.filter((el) => {
      return el.usagedID === searchObj.secondHand;
    });
  }
  if (searchObj.price && searchObj.price != undefined) {
    newCars = cars.filter((el) => {
      return el.price <= Number(searchObj.price);
    });
  }
  return newCars;
}

export async function getAllCars() {
  return firebase
    .database()
    .ref()
    .child("Car")
    .once("value")
    .then((data) => {
      if (data.val() === null) {
        return [];
      }
      let retVal = [];
      Object.values(data.val()).forEach((value) => {
        retVal.push(value);
      });
      return retVal;
    });
}

export async function getOnaCar(ID) {
  return firebase
    .database()
    .ref()
    .child("Car")
    .orderByChild("ID")
    .equalTo(ID)
    .once("value")
    .then((data) => {
      if (data.val() === null) {
        return {};
      }
      let obj;
      Object.values(data.val()).forEach((value) => {
        obj = value;
      });
      return obj;
    });
}

export async function getAllCarsByUID(UID) {
  return firebase
    .database()
    .ref()
    .child("Car")
    .orderByChild("userID")
    .equalTo(UID)
    .once("value")
    .then((data) => {
      if (data.val() === null) {
        return [];
      }
      let retVal = [];
      Object.values(data.val()).forEach((value) => {
        retVal.push(value);
      });
      return retVal;
    });
}

export async function getAllCarsForTrade() {
  return firebase
    .database()
    .ref()
    .child("Car")
    .orderByChild("trade")
    .equalTo(true)
    .once("value")
    .then((data) => {
      if (data.val() === null) {
        return [];
      }
      let retVal = [];
      Object.values(data.val()).forEach((value) => {
        retVal.push(value);
      });
      return retVal;
    });
}

export async function deleteCarByID(ID) {
  let viacle = {};
  var updates = {};
  updates["Car/" + ID] = viacle;
  return firebase
    .database()
    .ref()
    .update(updates)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return "Err";
    });
}

export async function clickedCarADIncrement(elem) {
  let viacle = elem;
  viacle.clicked = viacle.clicked + 1;
  var updates = {};
  updates["Car/" + elem.ID] = viacle;
  firebase
    .database()
    .ref()
    .update(updates)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return "Err";
    });
}

export async function addNewCar(newCar, file, uid) {
  let d = new Date();

  let newCarID = firebase.database().ref().child("Car/").push().key;

  return await firebase
    .storage()
    .ref("car/" + newCarID + "/" + file.name)
    .put(file)
    .then((data) => {
      let car = {};
      firebase
        .storage()
        .ref("car/" + newCarID + "/" + file.name)
        .getDownloadURL()
        .then((imgUrl) => {
          car = {
            ID: newCarID,
            emisionID: newCar.EngineEmision ? newCar.EngineEmision : "",
            engineVolume: newCar.volume,
            transmitionID: newCar.transmition ? newCar.transmition : "",
            ac: newCar.ac ? newCar.ac : "",
            bodyTypeID: newCar.carBody,
            brandID: newCar.brand,
            color: newCar.color ? newCar.color : "",
            garantion: newCar.garantion ? newCar.garantion : "",
            creationData: newCar.generation ? newCar.generation : "",
            damaged: newCar.demaged ? newCar.demaged : "",
            firstOwner: newCar.firstOwner ? newCar.firstOwner : "",
            fuelID: newCar.fuel,
            modelID: newCar.model,
            numberOfDoors: newCar.numberOfDoors ? newCar.numberOfDoors : "",
            numberOfSeats: newCar.numberOfSeats,
            price: newCar.price,
            regionID: newCar.region ? newCar.region : "",
            registrationEnd: newCar.registrationEnd
              ? newCar.registrationEnd
              : "",
            description: newCar.description,
            usagedID: newCar.secondHand ? newCar.secondHand : "",
            driveID: newCar.drive,
            picture: imgUrl,
            userID: uid,
            clickedOn: 0,
            advertisementCreation: `${d.getFullYear()}-${
              d.getMonth() + 1
            }-${d.getDate()}`,
          };
          var updates = {};
          updates["Car/" + newCarID] = car;
          firebase
            .database()
            .ref()
            .update(updates)
            .then((data) => {})
            .catch((err) => {
              firebase
                .storage()
                .ref("car/" + newCarID)
                .delete()
                .then((data) => {
                  console.log("nothing saved");
                });
            });
        });
      return newCarID;
    })
    .catch((err) => {
      return err;
    });
}
