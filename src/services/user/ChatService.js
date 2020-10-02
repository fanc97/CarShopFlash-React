import { firebase } from "../config";

export async function getChat(email) {
  return await firebase
    .database()
    .ref()
    .child("chats")
    .where("users", "array-contains", email)
    .onSnapshot(async res => {
      const chats = res.docs.map(_doc => _doc.data());
    });

  //   .once("value")
  //   .then(data => {
  //     let retVal = [];
  //     Object.values(data.val()).forEach(value => {
  //       retVal.push(value);
  //     });
  //     return retVal;
  //   });
}
