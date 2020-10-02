import { firebase } from "../config";

export async function getAllBodyTypes() {
  return firebase
    .database()
    .ref()
    .child("bodyType")
    .once("value")
    .then(data => {
      let retVal = [];
      Object.values(data.val()).forEach(value => {
        retVal.push(value);
      });
      return retVal;
    });
}
export async function getAllTruckBodyTypes() {
  return firebase
    .database()
    .ref()
    .child("truckBodyType")
    .once("value")
    .then(data => {
      let retVal = [];
      Object.values(data.val()).forEach(value => {
        retVal.push(value);
      });
      return retVal;
    });
}

export async function getAllMotoBodyTypes() {
  return firebase
    .database()
    .ref()
    .child("motoBodyType")
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

export async function getOneBodyType(ID) {
  return firebase
    .database()
    .ref()
    .child("bodyType")
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

export async function getOneTruckBodyType(ID) {
  return firebase
    .database()
    .ref()
    .child("truckBodyType")
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

export async function deleteBodyTypeByID(viacleDel, activ) {
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
      db = "bodyType";
      break;
    case "moto":
      db = "motoBodyType";
      break;
    case "truck":
      db = "truckBodyType";
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
export async function getOneMotoBodyType(ID) {
  return firebase
    .database()
    .ref()
    .child("motoBodyType")
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

export async function saveAndEditBodyType(viacleEandS, activ) {
  let db;
  let newID;
  let newObj;

  switch (activ) {
    case "car":
      db = "bodyType";
      break;
    case "moto":
      db = "motoBodyType";
      break;
    case "truck":
      db = "truckBodyType";
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
