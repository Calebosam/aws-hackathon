import axios from "axios";
import fileDownload from "js-file-download";
import config from '../config'
axios.defaults.withCredentials = true;

let serverPort: number | string;
config.NODE_ENV === "production" ? (serverPort = "") : (serverPort = `:${config.SERVER_PORT}`!);

export async function getDocumentsData() {
  console.log(`http://${config.HOST}${serverPort}/api/documents`)
  return await axios.get(`http://${config.HOST}${serverPort}/api/documents`);
}

export async function onUpload(uploadData: {}) {
  return await axios.post(`http://${config.HOST}${serverPort}/api/upload`, uploadData);
}

export async function onDownload(id: String, name: string) {
  return await axios({
    url: `http://${config.HOST}${serverPort}/api/download/${id}`,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    fileDownload(response.data, name)
    return response
  });
}

export async function onSendFile(data: {}) {
  return await axios.post(`http://${config.HOST}${serverPort}/api/send/`, data)
}

export async function onDelete(id: String) {
  return await axios.delete(`http://${config.HOST}${serverPort}/api/delete/${id}`)
}