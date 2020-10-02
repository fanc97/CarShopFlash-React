import { firebase } from "../config";
export async function getAllCapacity() {
  return firebase
    .database()
    .ref()
    .child("Capacity")
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
export async function getOnaCapacity(ID) {
  return firebase
    .database()
    .ref()
    .child("Capacity")
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
