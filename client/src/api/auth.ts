import axios from "axios";
axios.defaults.withCredentials = true;

export async function onRegister(registrationData: {}) {
  return await axios.post("http://localhost:8000/api/register", registrationData);
}

export async function onLogin(loginData: {}) {
  return await axios.post("http://localhost:8000/api/login", loginData);
}

export async function fetchCurrentUser() {
  return await axios.get("http://localhost:8000/api/currentuser");
}

export async function onLogout() {
  return await axios.get("http://localhost:8000/api/logout");
}

export async function fetchDocuments() {
  return await axios.get("http://localhost:8000/api/documents");
}
