import { Fragment, useState } from "react";
import dash from "../assets/dashboard-hero.svg";
import { UploadFile } from "../components/UploadFile";
import { Navbar } from "../components/Navbar";
import { Files } from "../components/Files";

function Dashboard() {  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Fragment>
      <div className="min-w-screen min-h-screen bg-[#ffffff] text-slate-700">
        <div className="container md:px-4">
          <Navbar showModal={showModal}></Navbar>

          <div className="flex items-center justify-center py-12 my-10 rounded-2xl bg-[antiquewhite]">
            <img src={dash} alt="dash" width="30%" />
          </div>
          <Files></Files>
        </div>

        {isModalOpen ? (
        <UploadFile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></UploadFile>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
}

export default Dashboard;
