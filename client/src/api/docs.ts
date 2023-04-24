import axios from "axios";
import fileDownload from "js-file-download";
axios.defaults.withCredentials = true;

export async function getDocumentsData() {
  return await axios.get("http://localhost:8000/api/documents");
}

export async function onUpload(uploadData: {}) {
  return await axios.post("http://localhost:8000/api/upload", uploadData);
}

export async function onDownload(id: String, name: string) {
  return await axios({
    url: `http://localhost:8000/api/download/${id}`,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    fileDownload(response.data, name)
    return response
  });
}

export async function onSendFile(data: {}) {
  return await axios.post(`http://localhost:8000/api/send/`, data)
}

export async function onDelete(id: String) {
  return await axios.delete(`http://localhost:8000/api/delete/${id}`)
}
