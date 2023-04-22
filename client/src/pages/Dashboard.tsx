import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import dash from "../assets/dashboard-hero.svg";
import { UploadFile } from "../components/UploadFile";
import { Navbar } from "../components/Navbar";
import { Files } from "../components/Files";

function Dashboard() {
  const { files } = useSelector((state: any) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, setState] = useState({
    query: "",
    files: files,
  });

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Fragment>
      <div className="min-w-screen min-h-screen bg-[#ffffff] text-slate-700">
        <div className="container md:px-4">
          <Navbar showModal={showModal} state={state} setState={setState}></Navbar>

          <div className="flex items-center justify-center py-12 my-10 rounded-2xl bg-[antiquewhite]">
            <img src={dash} alt="dash" width="30%" />
          </div>
          <Files state={state} setState={setState}></Files>
        </div>

        {isModalOpen ? <UploadFile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></UploadFile> : ""}
        <div className="copy text-center mt-8 pb-4">© 2023 Lizo, Inc.</div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
