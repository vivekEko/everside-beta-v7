import React, { useRef } from "react";
import doctorIcon from "../../../assets/img/NPS Dashboard/DoctorIcon.svg";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { exportComponentAsPNG } from "react-component-export-image";

const ProviderInfo = () => {
  const ProviderNPSComponent = useRef();

  return (
    <div
      ref={ProviderNPSComponent}
      className="h-[300px] w-full flex-1 md:flex-[0.3]  rounded-md p-2 px-4 border"
    >
      <div className="flex justify-between items-center">
        <h1 className="font-bold opacity-80 text-lg">Provider Info</h1>
        <h1
          onClick={() => exportComponentAsPNG(ProviderNPSComponent)}
          className="font-bold opacity-80 text-lg cursor-pointer"
        >
          {" "}
          <FileDownloadOutlinedIcon
            fontSize="small"
            className="text-gray-400"
          />
        </h1>
      </div>
      <div className="flex flex-col items-center h-[250px] w-full ">
        <div className="h-full w-full flex justify-center items-center ">
          <img src={doctorIcon} alt="doctorIcon" className="w-[25%]" />
        </div>
        <div className="h-full w-full   flex flex-col justify-center items-center">
          <h1 className="text-xl 2xl:text-2xl font-medium">
            Alexander Bingcang
          </h1>
          <div className="flex justify-center gap-[20px] mt-4">
            <div className="bg-[#e6f5fc91] p-2 rounded-md text-[#45b1e8] font-medium relative group ">
              <span>DO</span>
              <div className="absolute hidden group-hover:block p-2 bg-gray-100 rounded-md top-[105%]  w-max text-gray-500 text-xs  z-50 ">
                Provider Type
              </div>
            </div>
            <div className="bg-[#e6f5fc91] p-2 rounded-md text-[#45b1e8] font-medium relative group ">
              <span>Physician</span>

              <div className="absolute hidden group-hover:block p-2 bg-gray-100 rounded-md top-[105%]  w-max text-gray-500 text-xs  z-50 ">
                Provider Category
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderInfo;
