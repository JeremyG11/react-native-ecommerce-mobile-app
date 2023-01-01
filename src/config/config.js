import { Platform } from "react-native";
export const API_URL = Platform.OS === 'android' ? "http://10.4.113.194:6000" : "http://127.0.0.1:4242"