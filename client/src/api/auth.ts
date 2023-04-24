import axios from "axios";
import { ResetPasswordModule } from "../interfaces/ResetPassword";
axios.defaults.withCredentials = true;

export async function onRegister(registrationData: {}) {
  return await axios.post("http://localhost:8000/api/register", registrationData);
}

export async function onLogin(loginData: {}) {
  return await axios.post("http://localhost:8000/api/login", loginData);
}

export async function onLogout() {
  return await axios.get("http://localhost:8000/api/logout");
}

interface Email{
  email: string;
}
export async function onResetpasswordRequest(email: Email) {
  return await axios.post("http://localhost:8000/api/requestpasswordreset", email)
}

export async function onResetPassword(data: ResetPasswordModule) {
  return await axios.post("http://localhost:8000/api/resetpassword", data)
}

/* export async function fetchCurrentUser() {
  return await axios.get("http://localhost:8000/api/currentuser");
} */

/* export async function fetchDocuments() {
  return await axios.get("http://localhost:8000/api/documents");
} */
