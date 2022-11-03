import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const API = 'https://larav.fad.web.id';
export const S3 = 'https://silka-itera.s3.ap-southeast-3.amazonaws.com'

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

export const STATUS_CONFIRMATION = 1;
export const STATUS_PICKUP = 2;
export const STATUS_QUEUE = 3;
export const STATUS_PROCESS = 4;
export const STATUS_READY = 5;
export const STATUS_DELIVER = 6;
export const STATUS_CLEAR = 7;
