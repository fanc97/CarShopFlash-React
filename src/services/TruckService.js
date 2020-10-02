import { firebase } from "../config";

export async function searchTruckForm(searchObj, truck) {
  let newViacle = truck;

  if (searchObj.carBody && searchObj.carBody != undefined) {
    newViacle = newViacle.filter((el) => {
      return el.bodyTypeID === searchObj.carBody;
    });
  }
  if (searchObj.brand && searchObj.brand != undefined) {
    newViacle = newViacle.filter((el) => {
      return el.brandID === searchObj.brand;
    });
  }
  if (searchObj.fromGeneration && searchObj.fromGeneration != undefined) {
    newViacle = newViacle.filter((el) => {
      return (
        new Date(el.creationData).getFullYear() >= searchObj.fromGeneration
      );
    });
  }
  if (searchObj.toGeneration && searchObj.toGeneration != undefined) {
    newViacle = newViacle.filter((el) => {
      return new Date(el.creationData).getFullYear() <= searchObj.toGeneration;
    });
  }

  if (searchObj.model && searchObj.model != undefined) {
    newViacle = newViacle.filter((el) => {
      return el.modelID === searchObj.model;
    });
  }

  if (searchObj.price && searchObj.price != undefined) {
    newViacle = newViacle.filter((el) => {
      return el.price >= searchObj.price;
    });
  }

  if (searchObj.region && searchObj.region != undefined) {
    newViacle = newViacle.filter((el) => {
      return el.regionID === searchObj.region;
    });
  }
  if (searchObj.secondHand && searchObj.secondHand != undefined) {
    newViacle = newViacle.filter((el) => {
      return el.usagedID === searchObj.secondHand;
    });
  }
  if (searchObj.price && searchObj.price != undefined) {
    newViacle = newViacle.filter((el) => {
      return el.price <= Number(searchObj.price);
    });
  }
  return newViacle;
}

export async function getAllTrucks() {
  return firebase
    .database()
    .ref()
    .child("Truck")
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
export async function getAllTrucksWithCapacity(ID) {
  return firebase
    .database()
    .ref()
    .child("Truck")
    .orderByChild("capacityID")
    .equalTo(ID)
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

export async function getOnaTruck(ID) {
  return firebase
    .database()
    .ref()
    .child("Truck")
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

export async function getAllTruckByUID(UID) {
  return await firebase
    .database()
    .ref()
    .child("Truck")
    .orderByChild("userID")
    .equalTo(UID)
    .once("value")
    .then((data) => {
      let retVal = [];
      if (data === null) {
        return retVal;
      }
      Object.values(data.val()).forEach((value) => {
        retVal.push(value);
      });
      return retVal;
    });
}

export async function deleteTruckByID(ID) {
  let viacle = {};
  var updates = {};
  updates["Truck/" + ID] = viacle;
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

export async function addTruckCar(newViacle, file, uid) {
  let d = new Date();

  let newID = firebase.database().ref().child("Truck/").push().key;
  return await firebase
    .storage()
    .ref("truck/" + newID + "/" + file.name)
    .put(file)
    .then((data) => {
      let truck = {};
      firebase
        .storage()
        .ref("truck/" + newID + "/" + file.name)
        .getDownloadURL()
        .then((imgUrl) => {
          truck = {
            ID: newID,
            emisionID: newViacle.EngineEmision ? newViacle.EngineEmision : "",
            ac: newViacle.ac ? newViacle.ac : "",
            bodyTypeID: newViacle.carBody,
            brandID: newViacle.brand,
            color: newViacle.color ? newViacle.color : "",
            transmitionID: newViacle.transmition,
            garantion: newViacle.garantion ? newViacle.garantion : "",
            creationData: newViacle.generation ? newViacle.generation : "",
            damaged: newViacle.demaged ? newViacle.demaged : "",
            firstOwner: newViacle.firstOwner ? newViacle.firstOwner : "",
            fuelID: newViacle.fuel,
            modelID: newViacle.model,
            numberOfDoors: newViacle.numberOfDoors
              ? newViacle.numberOfDoors
              : "",
            numberOfSeats: newViacle.numberOfSeats,
            price: newViacle.price,
            regionID: newViacle.region ? newViacle.region : "",
            registrationEnd: newViacle.registrationEnd
              ? newViacle.registrationEnd
              : "",
            description: newViacle.description,
            usagedID: newViacle.secondHand ? newViacle.secondHand : "",
            driveID: newViacle.drive,
            picture: imgUrl,
            userID: uid,
            capacityID: newViacle.capacity,
            clickedOn: 0,
            advertisementCreation: `${d.getFullYear()}-${
              d.getMonth() + 1
            }-${d.getDate()}`,
          };
          var updates = {};
          updates["Truck/" + newID] = truck;
          firebase
            .database()
            .ref()
            .update(updates)
            .then((data) => {})
            .catch((err) => {
              firebase
                .storage()
                .ref("truck/" + newID)
                .delete()
                .then((data) => {
                  console.log("nothing saved");
                });
            });
        });
      return newID;
    })
    .catch((err) => {
      return err;
    });
}
