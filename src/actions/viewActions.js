import { getUserFromLocalStorage } from "../base/OAuth";

export const SETVIEW = "[VIEW] SETVIEW";
export const LOAD_VIEW = "[VIEW] LOAD";

export function setView(view) {
  return {
    type: SETVIEW,
    view,
  };
}

export function loadVIew() {
  return {
    type: LOAD_VIEW,
  };
}
