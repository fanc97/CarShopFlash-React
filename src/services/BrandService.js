import { firebase } from "../config";
export async function getAllBrands() {
  return firebase
    .database()
    .ref()
    .child("brand")
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

export async function getAllTruckBrands() {
  return firebase
    .database()
    .ref()
    .child("truckBrand")
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

export async function getAllMotoBrands() {
  return firebase
    .database()
    .ref()
    .child("motoBrand")
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

export async function getOnaBrand(ID) {
  return firebase
    .database()
    .ref()
    .child("brand")
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

export async function getOnaTruckBrand(ID) {
  return firebase
    .database()
    .ref()
    .child("truckBrand")
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
export async function getOnaMotoBrand(ID) {
  return firebase
    .database()
    .ref()
    .child("motoBrand")
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
export async function saveAndEditBrand(viacleEandS, activ) {
  let db;
  let newID;
  let newObj;

  switch (activ) {
    case "car":
      db = "brand";
      break;
    case "moto":
      db = "motoBrand";
      break;
    case "truck":
      db = "truckBrand";
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
  return firebase
    .database()
    .ref()
    .update(updates)
    .then(data => {
      return data;
    })
    .catch(err => {
      return "Err";
    });
}

export async function deleteBrandTypeByID(viacleDel, activ) {
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
      db = "brand";
      break;
    case "moto":
      db = "motoBrand";
      break;
    case "truck":
      db = "truckBrand";
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
