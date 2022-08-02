import React, { useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useRecoilState } from "recoil";
import allDataRecievedProvider from "../../../recoil/atoms/allDataRecievedProvider";
import DateFilterStatus from "../../../recoil/atoms/DateFilterStatusAtom";
import regionStatusProvider from "../../../recoil/atoms/regionStatusProvider";

const ProviderRegion2 = () => {
  // Global Variables
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);
  const [callRegion, setCallRegion] = useRecoilState(regionStatusProvider);

  // Local Variables
  const [regionShowStatus, setRegionShowStatus] = useState(false);
  const [allDataRecievedStatus, setAllDataRecievedStatus] = useRecoilState(
    allDataRecievedProvider
  );
  const [runClinicAPI, setRunClinicAPI] = useState(true);

  // Click outside this component to close it functionality
  const closeToggle = () => {
    setRegionShowStatus(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  return (
    <div
      className="relative w-full z-[150] "
      ref={ref}
      onClick={() => setDatePickerStatus(!setDatePickerStatus)}
    >
      <div className="flex items-center gap-2">
        <div
          className={` ${
            allDataRecievedStatus
              ? "active:scale-95"
              : " opacity-50 cursor-not-allowed"
          } cursor-pointer  p-1 bg-green-50  transition-all px-2 rounded-lg flex justify-center items-center  border relative flex-1 `}
          onClick={() => {
            if (allDataRecievedStatus) {
              setRegionShowStatus(!regionShowStatus);
              setCallRegion(false);
              setRunClinicAPI(false);
              //   setFlushRegionvalue(false);
            }
          }}
        >
          <LocationOnOutlinedIcon className="text-green-500" fontSize="small" />
          <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1 ">
            Regions
          </span>

          {/* selected count */}
          {/* <div
            className={`text-xs ml-2 rounded-full bg-[#00ac69] bg-opacity-80 text-white font-semibold w-[25px] h-[25px] flex justify-center items-center  ${
              regionLocal?.length > 0 ? "block" : "hidden"
            } `}
          >
            {regionLocal?.length}
          </div> */}

          <div
            className={`absolute right-5 ${
              allDataRecievedStatus ? "hidden" : " block"
            } `}
          >
            <RefreshRoundedIcon className="opacity-50 animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderRegion2;
