import * as Actions from "../actions/Actions";

const initialState = {
  view: "car",
};

const toggleViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SETVIEW:
      return {
        ...state,
        view: action.view,
      };
    case Actions.LOAD_VIEW:
      return state;
    default:
      return state;
  }
};

export default toggleViewReducer;
