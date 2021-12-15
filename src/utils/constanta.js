import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const API = 'http://192.168.1.6:8000';
export const SIZES = {
    // app dimensions
    width,
    height
};

export default SIZES;
export const ColorPrimary = '#64B8CB';
export const ColorDanger = '#FF0000';

// ROLE
export const ROLE_OWNER = 2;
export const ROLE_EMPLOYEE = 3;
export const ROLE_CUSTOMER = 4;