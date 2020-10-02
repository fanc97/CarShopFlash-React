import { firebase } from "../config";
export async function searchMotorForm(searchObj, cars) {
  console.log(searchObj);
}
export async function getAllMotos() {
  return firebase
    .database()
    .ref()
    .child("Moto")
    .once("value")
    .then((data) => {
      let retVal = [];
      Object.values(data.val()).forEach((value) => {
        retVal.push(value);
      });
      return retVal;
    });
}
export async function getOnaMoto(ID) {
  return firebase
    .database()
    .ref()
    .child("Moto")
    .orderByChild("ID")
    .equalTo(ID)
    .once("value")
    .then((data) => {
      let obj;
      Object.values(data.val()).forEach((value) => {
        obj = value;
      });
      return obj;
    });
}

export async function getAllMotoByUID(UID) {
  return await firebase
    .database()
    .ref()
    .child("Moto")
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

export async function deleteMotoByID(ID) {
  let viacle = {};
  var updates = {};
  updates["Moto/" + ID] = viacle;
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

export async function addNewMoto(newViacle, file, uid) {
  let d = new Date();

  let newID = firebase.database().ref().child("Moto/").push().key;
  return await firebase
    .storage()
    .ref("moto/" + newID + "/" + file.name)
    .put(file)
    .then((data) => {
      let viacle = {};
      firebase
        .storage()
        .ref("moto/" + newID + "/" + file.name)
        .getDownloadURL()
        .then((imgUrl) => {
          viacle = {
            ID: newID,
            emisionID: newViacle.EngineEmision ? newViacle.EngineEmision : "",
            engineVolume: newViacle.volume,
            transmitionID: newViacle.transmition ? newViacle.transmition : "",
            brandID: newViacle.brand,
            color: newViacle.color ? newViacle.color : "",
            garantion: newViacle.garantion ? newViacle.garantion : "",
            creationData: newViacle.creationData ? newViacle.creationData : "",
            damaged: newViacle.demaged ? newViacle.damaged : "",
            firstOwner: newViacle.firstOwner ? newViacle.firstOwner : "",
            modelID: newViacle.model,
            numberOfSeats: newViacle.numberOfSeats,
            price: newViacle.price,
            regionID: newViacle.region ? newViacle.region : "",
            registrationEnd: newViacle.registrationEnd
              ? newViacle.registrationEnd
              : "",
            description: newViacle.description,
            usagedID: newViacle.secondHand ? newViacle.secondHand : "",
            bodyTypeID: newViacle.carBody,
            picture: imgUrl,
            userID: uid,
            clickedOn: 0,
            advertisementCreation: `${d.getFullYear()}-${
              d.getMonth() + 1
            }-${d.getDate()}`,
          };
          console.log(newViacle);
          console.log(viacle);
          var updates = {};
          updates["Moto/" + newID] = viacle;
          firebase
            .database()
            .ref()
            .update(updates)
            .then((data) => {})
            .catch((err) => {
              firebase
                .storage()
                .ref("moto/" + newID)
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
export async function searchMotoForm(searchObj, moto) {
  let newViacle = moto;

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
    console.log();

    newViacle = newViacle.filter((el) => {
      if (searchObj.model.length <= el.modelID.length) {
        let n = el.modelID
          .trim()
          .toLowerCase()
          .slice(0, searchObj.model.length)
          .localeCompare(searchObj.model.trim().toLowerCase());
        if (n == 0) {
          return el;
        }
      }
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
