import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";

import { copy } from "../assets/hero";
import dash from "../assets/dashboard-hero.svg";
import { logOutUser } from "../redux/slices/authSlice";
import logo from "../assets/logo_alt.svg";
import { onDownload, onUpload } from "../api/docs";
import { FileData } from "../interfaces/Document";

function Dashboard() {
  const dispatch = useDispatch<any>();

  const { user } = useSelector((state: any) => state);
  const { files } = useSelector((state: any) => state);

  const logout = async () => {
    try {
      dispatch(logOutUser());
    } catch (error: any) {
      console.error(error.response);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showOptions = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
    showOptions();
  };

  //Upload options
  interface Document {
    user_uid: string;
    title: string;
    description: string;
    document: File | null;
  }

  const document: Document = {
    user_uid: user.user_uid,
    title: "",
    description: "",
    document: null,
  };

  const [documentToUpload, setDocumentToUpload] = useState(document);

  const uploadFile = async (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user_uid", documentToUpload.user_uid);
    formData.append("title", documentToUpload.title);
    formData.append("description", documentToUpload.description);
    if (documentToUpload.document !== null) {
      formData.append("document", documentToUpload.document);
    }

    await onUpload(formData);
  };

  const downloadFile = async (id: String, name: string) => {
    name = name.replace(/^.*[\\\/]/, '');
    await onDownload(id, name);
  };

  return (
    <Fragment>
      <div className="min-w-screen min-h-screen bg-[#ffffff] text-slate-700">
        <div className="container md:px-4">
          <div className="navbar w-full flex items-center justify-between pt-8 pb-2">
            <div className="logo flex items-end">
              <img src={logo} alt="Lizo File Server Logo" className="h-[46px] mr-1" />
              <h3 className="text-4xl font-[1000] tracking-wide leading-[0.6]">IZO</h3>
            </div>

            <div className="search rounded-full border border-2 min-w-[35%] flex items-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="rgb(112 26 117)"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                className="w-full bg-transparent font-normal py-2 px-3 text-center"
                type="search"
                name="search_document"
                id="search_ducoment"
                placeholder="Search all documents..."
              />
            </div>

            <div className="user_controls flex items-center">
              <p>
                Howdy <span className="font-bold text-2xl">{user.first_name + " " + user.last_name}</span>
              </p>
              <div className="avatar ml-3 relative">
                <span className="relative" id="avatar" onClick={() => showOptions()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>

                {isDropdownOpen ? (
                  <div className="user_options absolute right-0 top-[50px] min-w-max bg-white border-2 rounded-lg">
                    <div className="arrow_box px-4 py-2 rounded">
                      {user.is_admin ? (
                        <div>
                          <span
                            className="px-4 text-sm py-2 cursor-pointer flex items-center"
                            onClick={() => showModal()}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                              />
                            </svg>
                            &ensp;Upload File
                          </span>
                          <hr className="my-1" />
                        </div>
                      ) : (
                        ""
                      )}
                      <span className="px-4 text-sm py-2 cursor-pointer flex items-center" onClick={() => logout()}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                        &ensp;Log out
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center py-12 my-10 rounded-2xl bg-[antiquewhite]">
            <img src={dash} alt="dash" width="30%" />
          </div>

          <div className="flex flex-wrap iems-center justify-between w-full">
            {files.map((file: FileData, index: any) => (
              <div
                className="w-[460px] min-w-[32%] h-[260px] flex flex-col justify-between border-2 rounded-xl px-5 py-3 my-4"
                key={index}
              >
                <div className="flex justify-between">
                  <div className="title mb-2 flex items-center">
                    <div className="w-[45px] h-[45px] bg-gray-200 p-2 rounded-full mr-3">
                      <img src={copy} alt="notebook" />
                    </div>
                    <h1 className="text-xl font-bold leading-4">
                      {file.title}
                      <br />
                      <span className="text-xs font-normal">{Moment(file.created_at).format("Do MMM")}</span>
                    </h1>
                  </div>

                  <div className="options cursor-pointer mt-1">
                    <span title="Options">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="desc mb-2">
                  <span>{file.description.substring(0, 170)}...</span>
                </div>
                <div className="w-full actions flex justify-between items-center">
                  {user.is_admin ? (
                    <div className="min-w-[45%] flex items-center">
                      <span className="font-bold flex mr-5">
                        <span className="text-sm">{file.num_downloads.toString()}&ensp;</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>
                      </span>
                      |
                      <span className="font-bold flex ml-5">
                        <span className="text-sm">{file.num_emails_sent.toString()}&ensp;</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                          />
                        </svg>
                      </span>
                    </div>
                  ) : (
                    "--"
                  )}
                  <div className="flex">
                    <button className="bg-transparent flex p-0 text-sm" onClick={() => downloadFile(file.file_uid, file.file_path)}>
                      Download&ensp;
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </button>
                    <button className="bg-transparent flex p-0 ml-5 text-sm">
                      Send&ensp;
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen ? (
          <div className="w-screen h-screen fixed top-0 bg-[white] flex justify-center items-center">
            <form onSubmit={(e) => uploadFile(e)} className="w-[40%]">
              <h2 className="text-5xl font-bold">Upload File</h2>
              <input
                value={documentToUpload.title}
                onChange={(e) => setDocumentToUpload({ ...documentToUpload, title: e.target.value })}
                className="text-white rounded-xl w-[100%] my-4 p-3"
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                required
              />
              <textarea
                value={documentToUpload.description}
                onChange={(e) => setDocumentToUpload({ ...documentToUpload, description: e.target.value })}
                className="text-white rounded-xl w-[100%] h-[200px] p-3"
                name="description"
                id="description"
              ></textarea>
              <input
                onChange={(e: any) => setDocumentToUpload({ ...documentToUpload, document: e.target.files[0] })}
                className="text-white rounded-xl w-[100%] my-4 p-3"
                type="file"
                name="file"
                id="file"
                required
              />
              <button className="mr-4" type="button" onClick={() => setIsModalOpen(!isModalOpen)}>
                Cancel
              </button>
              <button>Upload</button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
}

export default Dashboard;
