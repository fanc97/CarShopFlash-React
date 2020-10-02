import { firebase } from "../config";
export async function getAllModels() {
  return firebase
    .database()
    .ref()
    .child("model")
    .once("value")
    .then(data => {
      let retVal = [];
      Object.values(data.val()).forEach(value => {
        retVal.push(value);
      });
      return retVal;
    });
}

export async function getOneModel(ID) {
  return firebase
    .database()
    .ref()
    .child("model")
    .orderByChild("ID")
    .equalTo(ID)
    .once("value")
    .then(data => {
      if (data.val() === null) {
        return {};
      }
      let obj;
      Object.values(data.val()).forEach(value => {
        obj = value;
      });
      return obj;
    });
}

export async function getOneTruckModel(ID) {
  return firebase
    .database()
    .ref()
    .child("truckModel")
    .orderByChild("ID")
    .equalTo(ID)
    .once("value")
    .then(data => {
      if (data.val() === null) {
        return {};
      }
      let obj;
      Object.values(data.val()).forEach(value => {
        obj = value;
      });
      return obj;
    });
}

export async function getModelByBrandID(brandID) {
  return firebase
    .database()
    .ref()
    .child("model")
    .orderByChild("brandID")
    .equalTo(brandID)
    .once("value")
    .then(data => {
      if (data.val() === null) {
        return [];
      }
      let retVal = [];
      Object.values(data.val()).forEach(value => {
        retVal.push(value);
      });
      return retVal;
    });
}
export async function getModelByTruckID(brandID) {
  return firebase
    .database()
    .ref()
    .child("truckModel")
    .orderByChild("brandID")
    .equalTo(brandID)
    .once("value")
    .then(data => {
      if (data.val() === null) {
        return [];
      }
      let retVal = [];
      Object.values(data.val()).forEach(value => {
        retVal.push(value);
      });
      return retVal;
    });
}

export async function saveAndEditModel(viacleEandS, activ) {
  let db;
  let newID;
  let newObj;
  console.log(viacleEandS);

  switch (activ) {
    case "car":
      db = "model";
      break;
    case "truck":
      db = "truckModel";
      break;
  }
  if (!viacleEandS.brand && viacleEandS.brand === undefined) {
    return "Err";
  } else if (
    !viacleEandS.newName ||
    (viacleEandS.edit === undefined && viacleEandS.newName === "")
  ) {
    return "Err";
  } else if (viacleEandS.edit) {
    newID = viacleEandS.edit.ID;
  } else if (viacleEandS.edit === undefined && viacleEandS.newName !== "") {
    newID = firebase
      .database()
      .ref()
      .child(`${db}/`)
      .push().key;
  } else {
    newID = firebase
      .database()
      .ref()
      .child(`${db}/`)
      .push().key;
  }

  newObj = {
    ID: newID,
    brandID: viacleEandS.brand,
    name: viacleEandS.newName
  };

  var updates = {};
  updates[`${db}/` + newID] = newObj;
  firebase
    .database()
    .ref()
    .update(updates)
    .then(data => {
      console.log("Succ");
    })
    .catch(err => {
      console.log("Err");
    });
}

export async function deleteModelByID(viacleDel, activ) {
  let db;
  let ID;

  console.log(viacleDel, activ);

  if (viacleDel.edit) {
    ID = viacleDel.edit.ID;
  } else {
    return "Err";
  }
  switch (activ) {
    case "car":
      db = "model";
      break;
    case "truck":
      db = "truckModel";
      break;
  }

  var del = {};
  del[`${db}/` + ID] = {};

  return firebase
    .database()
    .ref()
    .update(del)
    .then(data => {
      return data;
    })
    .catch(err => {
      return "Err";
    });
}
