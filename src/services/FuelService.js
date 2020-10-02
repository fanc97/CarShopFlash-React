import { firebase } from "../config";
export async function getAllFuels() {
  return firebase
    .database()
    .ref()
    .child("fuel")
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

export async function getAllTruckFuels() {
  return firebase
    .database()
    .ref()
    .child("truckFuel")
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

export async function getOneFuel(ID) {
  return firebase
    .database()
    .ref()
    .child("fuel")
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

export async function getOneTruckFuel(ID) {
  return firebase
    .database()
    .ref()
    .child("truckFuel")
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

export async function getAllMotoFuels() {
  return firebase
    .database()
    .ref()
    .child("motoFuel")
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

export async function getOneMotoFuel(ID) {
  return firebase
    .database()
    .ref()
    .child("motoFuel")
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

export async function saveAndEditFuel(viacleEandS, activ) {
  let db;
  let newID;
  let newObj;

  switch (activ) {
    case "car":
      db = "fuel";
      break;
    case "moto":
      db = "motoFuel";
      break;
    case "truck":
      db = "truckFuel";
      break;
  }

  if (
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

export async function deleteFuelByID(viacleDel, activ) {
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
      db = "fuel";
      break;
    case "moto":
      db = "motoFuel";
      break;
    case "truck":
      db = "truckFuel";
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
