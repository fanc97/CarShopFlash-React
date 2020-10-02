import React from "react";

import Home from "./pages/Home";
import Error from "./pages/Error";
import Forbidden from "./pages/Forbidden";
import NotFound from "./pages/NotFound";
import CardPage from "./pages/CardPage";
import Ad from "./pages/Ad";

import { Route } from "react-router-dom";
import { isUserLoggedIn } from "./base/OAuth";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import UserDetails from "./pages/user/UserDetails";
import Lock from "./pages/user/Lock";
import UserList from "./pages/admin/users/UserList";
import UpdateProfile from "./components/forms/user/UpdateProfile";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import Message from "./pages/user/Message";
import Blocked from "./pages/user/Blocked";

let ROUTES = {
  Home: {
    path: "/",
    component: <Home />,
    auth: false,
  },
  CardPage: {
    path: "/card",
    component: <CardPage />,
    auth: false,
  },
  Blocked: {
    path: "/block",
    component: <Blocked />,
    auth: false,
  },
  Profije: {
    path: "/profile/:id",
    component: <UserDetails />,
    auth: true,
  },
  Ad: {
    path: "/ad",
    component: <Ad />,
    auth: true,
  },
  Admin: {
    path: "/admin",
    component: <AdminDashBoard />,
    auth: true,
  },
  Message: {
    path: "/chat",
    component: <Message />,
    auth: true,
  },
  Error: {
    path: "/error",
    component: <Error />,
    auth: false,
  },
  Forbidden: {
    path: "/forbidden",
    component: <Forbidden />,
    auth: false,
  },
  NotFound: {
    path: "/not-found",
    component: <NotFound />,
    auth: false,
  },
  Login: {
    path: "/login",
    component: <Login />,
    auth: false,
  },
  Signup: {
    path: "/signup",
    component: <Signup />,
    auth: false,
  },
  Lock: {
    path: "/lock",
    component: <Lock />,
    auth: false,
  },
  UserList: {
    path: "/users",
    component: <UserList showFilter={false} />,
    auth: true,
  },
};

export default ROUTES;

function getRoute(path) {
  for (const [key, value] of Object.entries(ROUTES)) {
    if (value.path === path) {
      return value;
    }
  }

  return null;
}

export function checkPath(path) {
  let pathObject = getRoute(path);

  if (!pathObject) {
    return true;
  }

  if (pathObject.auth) {
    return !isUserLoggedIn();
  }

  return false;
}

export function getRoutes() {
  let result = [];

  for (const [key, value] of Object.entries(ROUTES)) {
    result.push(
      <Route
        key={"route-" + result.length}
        exact
        path={value.path}
        render={() => value.component}
      />
    );
  }

  return result;
}
