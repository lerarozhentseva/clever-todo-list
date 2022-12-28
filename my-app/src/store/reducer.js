import {CHANGE_EMAIL, SELECTED_DAY, CHANGE_PASSWORD, CHANGE_VERIFICATION_PASSWORD} from "./storeConstants";
import moment from 'moment';

const initialState = {
  email: '',
  password: '',
  verificationPassword: '',
  selectedDay: String(moment().format().slice(0,10))
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
    case CHANGE_VERIFICATION_PASSWORD:
      return {
        ...state,
        verificationPassword: action.payload,
      }
    case SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload
      }
    default:
      return {
        state,
      }
  }
}