import CONFIG from "../config";
import { firebase } from "../config";
import HttpMethod from "../constants/HttpMethod";
import { request } from "./HTTP";
import history from "../history";
import { isUserOneOfRoles, isUserRole } from "../util/UserUtil";
import { getUserByID, getUserRole } from "../services/UserService";

/** OAUTH **/

export async function login(username, password) {
  clearUserData();
  let temp;
  return await firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then((response) => {
      let idTok;
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idtoken) => {
          idTok = idtoken;
        });
      return getUserByID(response.user.uid).then((data) => {
        if (data.blocked) {
          return { blocked: true };
        }
        temp = data;

        return getUserRole(temp.roleID).then((data) => {
          temp.role = data;
          setTokenToLocalStorage(idTok, response.user.refreshToken);
          setUserToLocalStorage(temp);

          return temp;
        });
      });
    })
    .catch((e) => {
      let error = {
        errorName: "Error",
        message: e.message,
      };
      return error;
    });
}

export async function signUp(newUser) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((response) => {
      firebase
        .database()
        .ref("user/" + response.user.uid)
        .set({
          uid: response.user.uid,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          roleID: 1,
          age: 0,
          City: "none",
          Country: "none",
          birthday: "none",
          gander: "other",
          midlename: "none",
          phoneNumber: "none",
          photoURL: "none",
        });
      return response;
    })
    .catch((e) => {
      return { name: "Error", error: "" + e.message };
    });
}

export async function signUpWithGoogle() {
  let temp;
  let provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      let user = res.user;
      let token = user.displayName.split(" ");
      return firebase
        .database()
        .ref("user/" + user.uid)
        .set({
          uid: user.uid,
          firstName: token[0],
          lastName: token[1],
          email: user.email,
          roleID: 1,
          age: 0,
          City: "none",
          Country: "none",
          birthday: "none",
          gander: "other",
          midlename: "none",
          phoneNumber: "none",
          photoURL: "none",
        })
        .then(() => {
          let idTok;
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((idtoken) => {
              idTok = idtoken;
            });
          return getUserByID(res.user.uid).then((data) => {
            temp = data;
            return getUserRole(temp.roleID).then((data) => {
              temp.role = data;
              setTokenToLocalStorage(idTok, res.user.refreshToken);
              setUserToLocalStorage(temp);
              return temp;
            });
          });
        });
    })
    .catch((e) => {
      return { name: "Error", error: "" + e.message };
    });
}

export async function unlock(username, password) {
  clearUserDataLock();

  let data = {
    client_id: CONFIG.clientId,
    client_secret: CONFIG.clientSecret,
    grant_type: "password",
    username: username,
    password: password,
  };

  return await request("/oauth/v2/token", data, HttpMethod.GET).then(
    (response) => {
      if (!response.ok) {
        return response;
      }

      setTokenToLocalStorage(
        response.data.access_token,
        response.data.refresh_token
      );

      return response;
    }
  );
}

export async function socialLogin(
  provider,
  email,
  firstName,
  lastName,
  socialId,
  accessToken,
  expiresAt
) {
  let data = {
    provider: provider,
    email: email,
    firstName: firstName ? firstName : "",
    lastName: lastName ? lastName : "",
    socialId: socialId,
    accessToken: accessToken,
    expiresAt: expiresAt,
  };

  return await request("/social/authenticate", data, HttpMethod.POST).then(
    (response) => {
      if (!response.ok) {
        return;
      }

      setSocialTokenToLocalStorage(response.data.access_token);

      return request("/user/current").then((response) => {
        if (response.data.user) {
          if (isUserOneOfRoles(response.data.user, CONFIG.rolesAllowed)) {
            setUserToLocalStorage(response.data.user);
          } else {
            clearUserData();
            response.ok = false;
          }
        }

        return response;
      });
    }
  );
}

export async function refreshToken(refreshToken) {
  let data = {
    client_id: CONFIG.clientId,
    client_secret: CONFIG.clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  return await request("/oauth/v2/token", data, HttpMethod.GET).then(
    (response) => {
      if (
        response.data &&
        response.data.access_token &&
        response.data.refresh_token
      ) {
        setTokenToLocalStorage(
          response.data.access_token,
          response.data.refresh_token
        );
      }

      return true;
    }
  );
}

export function logout() {
  clearUserData();
  history.push("/");
  firebase.auth().signOut();
}

export function lock() {
  clearUserDataLock();
  history.push("/");
}

/** LOCAL STORAGE  **/

export function setUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  let user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setTokenToLocalStorage(access_token, refresh_token) {
  localStorage.setItem(CONFIG.tokenKey, access_token);
  localStorage.setItem(CONFIG.refreshTokenKey, refresh_token);
}

export function getRefreshToken() {
  return localStorage.getItem(CONFIG.refreshTokenKey);
}

export function getToken() {
  return localStorage.getItem(CONFIG.tokenKey);
}

export function setSocialTokenToLocalStorage(access_token) {
  localStorage.setItem(CONFIG.socialTokenKey, access_token);
}

export function clearUserData() {
  localStorage.removeItem("user");
  clearUserDataLock();
}

function clearUserDataLock() {
  localStorage.removeItem(CONFIG.tokenKey);
  localStorage.removeItem(CONFIG.refreshTokenKey);
}

export function isUserLoggedIn() {
  return getUserFromLocalStorage() != null && getToken();
}

export function isUserLocked() {
  return getUserFromLocalStorage() && !getToken();
}
