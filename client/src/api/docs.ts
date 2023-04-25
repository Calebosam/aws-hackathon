import axios from "axios";
import fileDownload from "js-file-download";
import config from '../config'
axios.defaults.withCredentials = true;

export async function getDocumentsData() {
  return await axios.get(`http://${config.HOST}:${config.SERVER_PORT}/api/documents`);
}

export async function onUpload(uploadData: {}) {
  return await axios.post(`http://${config.HOST}:${config.SERVER_PORT}/api/upload`, uploadData);
}

export async function onDownload(id: String, name: string) {
  return await axios({
    url: `http://${config.HOST}:${config.SERVER_PORT}/api/download/${id}`,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    fileDownload(response.data, name)
    return response
  });
}

export async function onSendFile(data: {}) {
  return await axios.post(`http://${config.HOST}:${config.SERVER_PORT}/api/send/`, data)
}

export async function onDelete(id: String) {
  return await axios.delete(`http://${config.HOST}:${config.SERVER_PORT}/api/delete/${id}`)
}
