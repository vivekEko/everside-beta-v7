import React, { useEffect, useRef, useState } from "react";
import doctorIcon from "../../../assets/img/NPS Dashboard/DoctorIcon.svg";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { exportComponentAsPNG } from "react-component-export-image";
import providerComponentAPIData from "../../../recoil/atoms/providerComponentAPIData";
import { useRecoilState } from "recoil";
import Star from "../../../assets/img/ProviderScoreCard/star.png";

const ProviderInfo = () => {
  // GLobal variable
  const [providerComponentApi, setProviderComponentApi] = useRecoilState(
    providerComponentAPIData
  );

  const [starArray, setStarArray] = useState([]);

  useEffect(() => {
    console.log(providerComponentApi);

    setStarArray(providerComponentApi?.provider_star);
  }, [providerComponentApi]);

  const ProviderNPSComponent = useRef();

  return (
    <div
      ref={ProviderNPSComponent}
      className="h-[300px] w-full flex-1 md:flex-[0.3]  rounded-md p-2 px-4 border"
    >
      <div className="flex justify-between items-center">
        <h1 className="font-bold opacity-80 text-lg">Provider Score</h1>
        {/* <h1
          onClick={() => exportComponentAsPNG(ProviderNPSComponent)}
          className="font-bold opacity-80 text-lg cursor-pointer"
        >
          {" "}
          <FileDownloadOutlinedIcon
            fontSize="small"
            className="text-gray-400"
          />
        </h1> */}
      </div>
      <div className="flex flex-col items-center   w-full  ">
        <div className="h-full w-full flex flex-col  gap-5 justify-center items-center  ">
          {/* <img src={doctorIcon} alt="doctorIcon" className="w-[25%]" /> */}
          <h1 className="text-3xl  bg-[#e6f5fc] text-[#0094e0] p-5 rounded-full">
            {(providerComponentApi?.provider_info?.score / 2).toFixed(1)}
          </h1>

          <div className="flex justify-around items-center mb-5">
            <div className="relative  w-[30px] h-[30px] mx-2 ">
              <div className="z-[30] absolute top-0 bottom-0 left-0 right-0">
                <img src={Star} alt="star" className="w-[30px] h-[30px]" />
              </div>

              <div
                style={{
                  width: starArray[0] + "%",
                }}
                className={`  absolute bg-[#0094e0] top-0 bottom-0 left-0    z-[20]`}
              >
                {/* layer */}
              </div>
            </div>

            <div className="relative  w-[30px] h-[30px] mx-2 ">
              <div className="z-[30] absolute top-0 bottom-0 left-0 right-0">
                <img src={Star} alt="star" className="w-[30px] h-[30px]" />
              </div>

              <div
                style={{
                  width: starArray[1] + "%",
                }}
                className={`  absolute bg-[#0094e0] top-0 bottom-0 left-0    z-[20]`}
              >
                {/* layer */}
              </div>
            </div>

            <div className="relative  w-[30px] h-[30px] mx-2 ">
              <div className="z-[30] absolute top-0 bottom-0 left-0 right-0">
                <img src={Star} alt="star" className="w-[30px] h-[30px]" />
              </div>

              <div
                style={{
                  width: starArray[2] + "%",
                }}
                className={`  absolute bg-[#0094e0] top-0 bottom-0 left-0    z-[20]`}
              >
                {/* layer */}
              </div>
            </div>

            <div className="relative  w-[30px] h-[30px] mx-2 ">
              <div className="z-[30] absolute top-0 bottom-0 left-0 right-0">
                <img src={Star} alt="star" className="w-[30px] h-[30px]" />
              </div>

              <div
                style={{
                  width: starArray[3] + "%",
                }}
                className={`  absolute bg-[#0094e0] top-0 bottom-0 left-0    z-[20]`}
              >
                {/* layer */}
              </div>
            </div>

            <div className="relative  w-[30px] h-[30px] mx-2 ">
              <div className="z-[30] absolute top-0 bottom-0 left-0 right-0">
                <img src={Star} alt="star" className="w-[30px] h-[30px]" />
              </div>

              <div
                style={{
                  width: starArray[4] + "%",
                }}
                className={`  absolute bg-[#0094e0] top-0 bottom-0 left-0    z-[20]`}
              >
                {/* layer */}
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full   flex flex-col justify-center items-center">
          <h1 className="text-xl 2xl:text-2xl font-medium">
            {providerComponentApi?.provider_info?.name}
          </h1>
          <div className="flex justify-center gap-[20px] mt-4">
            <div className="bg-[#e6f5fc91] p-2 rounded-md text-[#45b1e8] font-medium relative group ">
              <span>{providerComponentApi?.provider_info?.type}</span>
              <div className="absolute hidden group-hover:block p-2 bg-gray-100 rounded-md top-[105%]  w-max text-gray-500 text-xs  z-50 ">
                Provider Type
              </div>
            </div>
            <div className="bg-[#e6f5fc91] p-2 rounded-md text-[#45b1e8] font-medium relative group ">
              <span>{providerComponentApi?.provider_info?.category}</span>

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
