import { decryptData } from "@/helpers/encryptionData";
import Cookies from "js-cookie";
const userData = Cookies.get("user");
const decryptUserData = decryptData(userData);

export function userReducer(state = decryptUserData, action) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    default:
      return state;
  }
}