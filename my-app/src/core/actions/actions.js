import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_VERIFICATION_PASSWORD,
  SELECTED_DAY,
} from "../store/storeConstants";

export const changeVerifPassword = (string) => ({
  type: CHANGE_VERIFICATION_PASSWORD,
  payload: string,
});

export const changeEmail = (string) => ({
  type: CHANGE_EMAIL,
  payload: string,
});

export const changePassword = (string) => ({
  type: CHANGE_PASSWORD,
  payload: string,
});

export const saveSelectedDay = (day) => ({
  type: SELECTED_DAY,
  payload: day,
});
