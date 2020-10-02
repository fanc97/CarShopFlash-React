import { firebase } from "../config";
export async function getAllTransmition() {
  return firebase
    .database()
    .ref()
    .child("transmition")
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

export async function getOneTransmition(ID) {
  return firebase
    .database()
    .ref()
    .child("transmition")
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

export async function saveAndEditTransmition(viacleEandS, activ) {
  let db = "transmition";
  let newID;
  let newObj;

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

export async function deleteTransmitionByID(viacleDel, activ) {
  let db = "transmition";
  let ID;

  console.log(viacleDel, activ);

  if (viacleDel.edit) {
    ID = viacleDel.edit.ID;
  } else {
    return "Err";
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
