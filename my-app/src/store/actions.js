import {CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_VERIFICATION_PASSWORD, SELECTED_DAY} from "./storeConstants";

export const changeVerifPassword = (string) => {
  return {
    type: CHANGE_VERIFICATION_PASSWORD,
    payload: string,
  }
}

export const changeEmail = (string) => {
  return {
    type: CHANGE_EMAIL,
    payload: string,
  }
}

export const changePassword = (string) => {
  return {
    type: CHANGE_PASSWORD,
    payload: string,
  }
}

export const saveSelectedDay = (day) => {
  return {
    type: SELECTED_DAY,
    payload: day
  };
};
