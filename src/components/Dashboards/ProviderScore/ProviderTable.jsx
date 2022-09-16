// React
import React from "react";
import { useRef } from "react";

// npm packages
import { exportComponentAsPNG } from "react-component-export-image";

// State Management (recoil JS)
import providerComponentAPIData from "../../../recoil/atoms/providerComponentAPIData";
import { useRecoilState } from "recoil";

// Media
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useState } from "react";
import { useEffect } from "react";

const ProviderTable = () => {
  // Global variable
  const [providerComponentApi, setProviderComponentApi] = useRecoilState(
    providerComponentAPIData
  );

  //   Loacl variable
  const [npsWidth, setNpsWidth] = useState();

  useEffect(() => {
    setNpsWidth(providerComponentApi?.topic?.nps_abs);
  }, [providerComponentApi]);

  const ProviderTable = useRef();
  return (
    <div
      ref={ProviderTable}
      className="p-2 md:p-5  w-full border   rounded-lg bg-white flex justify-center md:justify-center items-start relative  "
    >
      <div className="w-full">
        <div className=" font-bold  flex justify-between gap-2 items-center w-full">
          <div className="opacity-80">Provider</div>

          <button onClick={() => exportComponentAsPNG(ProviderTable)}>
            <FileDownloadOutlinedIcon
              fontSize="small"
              className="text-gray-400"
            />
          </button>
        </div>

        {/* Heading */}
        <div className="grid  grid-cols-[1fr_1fr_1fr_1fr_minmax(100px,1.2fr)] mt-5 gap-2">
          <h1 className="text-xs text-gray-500 text-center">
            Top Positive Topic
          </h1>
          <h1 className="text-xs text-gray-500 text-center">
            Top Negative Topic
          </h1>
          <h1 className="text-xs text-gray-500 text-center">Survey Count</h1>
          <h1 className="text-xs text-gray-500 text-center">Score</h1>
          <h1 className="text-xs text-gray-500 ">NPS</h1>
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_minmax(100px,1.2fr)] mt-5 gap-2">
          <h1 className="text-sm text-center">
            {providerComponentApi?.topic?.POSITIVE_TOPIC}
          </h1>
          <h1 className="text-sm text-center">
            {providerComponentApi?.topic?.NEGATIVE_TOPIC}
          </h1>
          <h1 className="text-sm text-center">
            {providerComponentApi?.topic?.count}
          </h1>
          <h1 className="text-sm text-center">
            {providerComponentApi?.topic?.score}
          </h1>
          <div className="">
            <h1
              className="text-sm bg-[#0094de] text-white p-1 rounded-r-lg flex justify-end px-3 items-center max-h-[30px]"
              style={{ width: npsWidth + "%" }}
            >
              {providerComponentApi?.topic?.nps_abs}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderTable;
