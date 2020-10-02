import { firebase } from "../config";

export async function getSidePics() {
  return firebase
    .database()
    .ref()
    .child("globalPics")
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
