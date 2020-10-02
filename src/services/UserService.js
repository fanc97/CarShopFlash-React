import { request } from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";
import { firebase } from "../config";

export async function resetPasswordRequest(data) {
  return await request("/api/users/password/reset", data, HttpMethod.POST);
}

export async function resetPassword(data) {
  return await request("/api/users/password/reset_form", data, HttpMethod.POST);
}

export async function getAllUsers() {
  return await firebase
    .database()
    .ref()
    .child("user")
    .once("value")
    .then((data) => {
      let retVal = [];
      Object.values(data.val()).forEach((value) => {
        retVal.push(value);
      });
      return retVal;
    });
}

export async function getUserByID(ID) {
  return await firebase
    .database()
    .ref()
    .child("user")
    .orderByChild("uid")
    .equalTo(ID)
    .once("value")
    .then((data) => {
      console.log(data);

      let obj;
      Object.values(data.val()).forEach((value) => {
        obj = value;
      });
      return obj;
    });
}

export async function editUserWithID(newInfo, file, user) {
  let editedUser = user;
  console.log(newInfo);

  if (newInfo.age) {
    editedUser.age = newInfo.age;
  }
  if (newInfo.City) {
    editedUser.City = newInfo.City;
  }
  if (newInfo.Country) {
    editedUser.Country = newInfo.Country;
  }
  if (newInfo.birthday) {
    editedUser.birthday = newInfo.birthday;
  }
  if (newInfo.gander) {
    editedUser.gander = newInfo.gander;
  }

  if (newInfo.midlename) {
    editedUser.midlename = newInfo.midlename;
  }
  if (newInfo.phoneNumber) {
    editedUser.phoneNumber = newInfo.phoneNumber;
  }
  if (file !== undefined) {
    return await firebase
      .storage()
      .ref("user/" + user.uid + "/" + file.name)
      .put(file)
      .then((data) => {
        firebase
          .storage()
          .ref("user/" + user.uid + "/" + file.name)
          .getDownloadURL()
          .then((imgUrl) => {
            editedUser.photoURL = imgUrl;
            var updates = {};
            updates["user/" + user.uid] = editedUser;
            firebase
              .database()
              .ref()
              .update(updates)
              .then((data) => {})
              .catch((err) => {
                firebase
                  .storage()
                  .ref("user/" + user.uid)
                  .delete()
                  .then((data) => {
                    console.log("nothing saved");
                  });
              });
          });
        return user.uid;
      })
      .catch((err) => {
        return err;
      });
  } else {
    console.log(editedUser);

    var updates = {};
    updates["user/" + user.uid] = editedUser;
    firebase
      .database()
      .ref()
      .update(updates)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export async function getUserRole(ID) {
  return firebase
    .database()
    .ref()
    .child("Role")
    .orderByChild("roleID")
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

export async function deleteUserByUID(ID) {
  let user = {};
  var updates = {};
  updates["user/" + ID] = user;
  return await firebase
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

export async function blockUnblockUser(user) {
  let editUser = user;
  editUser.blocked = !editUser.blocked;
  var updates = {};
  updates["user/" + user.uid] = editUser;
  return await firebase
    .database()
    .ref()
    .update(updates)
    .then((data) => {})
    .catch((err) => {
      return "Err";
    });
}
