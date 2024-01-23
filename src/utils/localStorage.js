import { CONSTANTS } from "./constants";

// SET COMMANDS
export const getUser = () => JSON.parse(localStorage.getItem(CONSTANTS.USER));

export const setUser = (data) => localStorage.setItem(CONSTANTS.USER, JSON.stringify(data));

// ACCESS COMMANDS
export const getToken = () => JSON.parse(localStorage.getItem(CONSTANTS.TOKEN));

export const setToken = (data) => localStorage.setItem(CONSTANTS.TOKEN, JSON.stringify(data));

// REMOVE COMMANDS
export const removeUser = () => localStorage.removeItem(CONSTANTS.USER);

export const removeToken = () => localStorage.removeItem(CONSTANTS.TOKEN);