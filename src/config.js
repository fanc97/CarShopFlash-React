let CONFIG = {
  baseUrlAPI: "http://localhost:PORT/api/",
  baseUrl: "http://localhost:PORT/",
  tokenKey: "1stKgorpnoj8mFIsI3sg",
  refreshTokenKey: "ZJmD63XQFsK6cHUWwN5T",
  clientId: "CLIENT_ID",
  clientSecret: "CLIENT_SECRET",
  facebookAppId: "FACEBOOK_APP_ID",
  facebookAppSecret: "FACEBOOK_APP_SECRET",
  googleClientId: "GOOGLE_CLIENT_ID",
  googleClientSecret: "GOOGLE_CLIENT_SECRET",
  linkedInClientId: "LINKEDIN_CLIENT_ID",
  linkedInCliendSecret: "LINKEDIN_CLIENT_SECRET",
  rowsPerPage: [5, 10, 25],
  rolesAllowed: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]
};

export default CONFIG;

export let firebase = require("firebase");
var firebaseConfig = {
  apiKey: "AIzaSyCa9bI-zvrsU8w1jbx2qxoErcAURHES-VE",
  authDomain: "login-d240e.firebaseapp.com",
  databaseURL: "https://login-d240e.firebaseio.com",
  projectId: "login-d240e",
  storageBucket: "login-d240e.appspot.com",
  messagingSenderId: "589770377043",
  appId: "1:589770377043:web:7e8954534f9c9c39f283a6",
  measurementId: "G-TQD8121B1R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
