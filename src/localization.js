import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
  en: {
    menu: {
      Home: "Home",
      Products: "Products",
      Services: "Services",
      OnlineGoods: "Online Goods",
      EmeraldDragon: "Emerald Dragon",
      Features: "Features",
    },

    table: {
      actions: "Actions",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      confirmDelete: "Confirm delete",
      no: "No",
      yes: "Yes",
      search: "Search",
    },

    header: {
      lock: "Lock",
      logout: "Logout",
      profile: "Profile Settings",
      admin: "Admin dashboard",
      chat: "Messages",
    },

    navSearch: {
      newestAD: "Newest Ads",
      mostWanted: "Most looked For",
      trade: "Car For Trade",
      newestCAR: "Newest Cars",
    },

    adminBar: {
      model: "Model",
      brand: "Brand",
      region: "Region",
      usage: "Usage",
      body: "Body",
      drive: "Drive",
      fuel: "Fuel",
      emition: "Emition",
      transimtion: "Transmition",
    },

    filter: {
      search: "Search",
    },

    validation: {
      RequiredErrorMessage: "required",
      MinLengthErrorMessage: "Minimal length is ",
      MaxLengthErrorMessage: "Maximal length is ",
      EmailErrorMessage: "Please enter valid email",
      PasswordErrorMessage:
        "Password must contain at least 6 letters, one upper case, one lower case and one number.",
      UserExistsErrorMessage: "User with this email address already exists",
      OldPasswordDidNotMatch: "Old password did not match",
      PasswordsNotEqual: "Passwords do not match",
      notNumber: "Not number",
    },
    editUser: {
      age: "Age",
      country: "Country",
      city: "City",
      phoneNumber: "Phone Number",
      birthday: "Birthday",
      Gander: "Gander",
      midlename: "Midlename",
    },
    notFound: {
      notFound: "Not found!",
      dashboard: "Dashboard",
    },

    forbidden: {
      forbidden: "Forbidden!",
      dashboard: "Dashboard",
      block: "This account is blocked",
      home: "Home",
    },

    error: {
      error: "Error!",
      dashboard: "Dashboard",
    },

    login: {
      email: "Email",
      password: "Password",
      login: "Login",
      wrongCredentials: "Wrong Credentials",
      forgotPW: "",
    },

    lock: {
      password: "Password",
      login: "Login",
      wrongCredentials: "Wrong Credentials",
      unlock: "Unlock",
    },

    socialLogin: {
      google: "sign in with Google",
      gmail: "sign in with Gmail",
      linkedIn: "sign in with Linked In",
      gitHub: "sign in with Git Hub",
    },

    userList: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      isDeleted: "Is deleted",
      dateCreated: "Date Created",
      pageTitle: "Users",
      enabled: "Enabled",
      userDelete: "User deleted",
      userRestored: "User restored",
    },

    userForm: {
      signUp: "Sign up",
      email: "Email",
      firstName: "First name",
      lastName: "Last name",
      ok: "Ok",
      cancel: "Cancel",
    },

    addUser: {
      pageTitle: "Add user",
      errorAddClub: "Error adding user",
      clubAdded: "User added",
      errorAddingUser: "Error adding user",
      userAdded: "User added",
    },

    resetPassword: {
      email: "Email",
      resetPassword: "Reset password",
      password: "Password",
      passwordRepeat: "Password repeat",
    },
  },
});

export default strings;
