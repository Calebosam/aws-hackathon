import axios from "axios";
import config from '../config'
import { ResetPasswordModule } from "../interfaces/ResetPassword";
axios.defaults.withCredentials = true;

export async function onRegister(registrationData: {}) {
  return await axios.post(`http://${config.HOST}:${config.SERVER_PORT}/api/register`, registrationData);
}

export async function onLogin(loginData: {}) {
  return await axios.post(`http://${config.HOST}:${config.SERVER_PORT}/api/login`, loginData);
}

export async function onLogout() {
  return await axios.get(`http://${config.HOST}:${config.SERVER_PORT}/api/logout`);
}

interface Email{
  email: string;
}
export async function onResetpasswordRequest(email: Email) {
  return await axios.post(`http://${config.HOST}:${config.SERVER_PORT}/api/requestpasswordreset`, email)
}

export async function onResetPassword(data: ResetPasswordModule) {
  return await axios.post(`http://${config.HOST}:${config.SERVER_PORT}/api/resetpassword`, data)
}

/* export async function fetchCurrentUser() {
  return await axios.get(`http://${config.HOST}:${config.SERVER_PORT}/api/currentuser`);
} */

/* export async function fetchDocuments() {
  return await axios.get(`http://${config.HOST}:${config.SERVER_PORT}/api/documents`);
} */
