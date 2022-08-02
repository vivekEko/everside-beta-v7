import React, { useEffect } from "react";
import CalendarIcon from "../../../assets/img/NPS Dashboard/calendar.svg";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useRecoilState } from "recoil";
import activeInnerPage from "../../../recoil/atoms/activeInnerPage";
import allDataRecievedProvider from "../../../recoil/atoms/allDataRecievedProvider";
import ProviderDateFilterStatus from "../../../recoil/atoms/ProviderDateFilterStatusAtom";
import regionStatusProvider from "../../../recoil/atoms/regionStatusProvider";
import startDateValueProvider from "../../../recoil/atoms/StartDateAtomProvider";
import startMonthValueProvider from "../../../recoil/atoms/StartMonthAtomProvider";
import endDateValueProvider from "../../../recoil/atoms/EndDateAtomProvider";
import endMonthValueProvider from "../../../recoil/atoms/EndMonthProvider";
import ProviderCalendar2 from "./ProviderCalendar2";
import ProviderRegion from "./ProviderRegion";
import ProviderRegion2 from "./ProviderRegion2";

const ProviderFilter2 = () => {
  // Global variables
  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);

  const [allDataRecievedStatus, setAllDataRecievedStatus] = useRecoilState(
    allDataRecievedProvider
  );

  const [datePickerStatus, setDatePickerStatus] = useRecoilState(
    ProviderDateFilterStatus
  );

  const [callRegion, setCallRegion] = useRecoilState(regionStatusProvider);
  const [finalStartDate, setFinalStartDate] = useRecoilState(
    startDateValueProvider
  );
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(
    startMonthValueProvider
  );
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValueProvider);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(
    endMonthValueProvider
  );

  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    setAllDataRecievedStatus(true);
  }, []);

  return (
    <div
      className={` ${
        activePageValue === "Provider_Score" ? "block" : "hidden"
      } flex justify-between items-center  relative  mb-2  `}
    >
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2  w-full ">
        {/* Calendar */}

        <div className="relative">
          <div className="flex items-center gap-5 w-full relative ">
            <div
              onClick={() => {
                if (allDataRecievedStatus) {
                  setDatePickerStatus(!datePickerStatus);
                  setCallRegion(false);
                }
              }}
              className={` ${
                allDataRecievedStatus ? "" : " opacity-50 cursor-not-allowed"
              }  p-1 bg-green-50 active:scale-95 transition-all px-2 rounded-lg flex justify-center items-center cursor-pointer w-full border`}
            >
              <img src={CalendarIcon} alt="date selector" />
              <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1">
                {monthList[finalStartMonth - 1] +
                  "  " +
                  finalStartDate +
                  " - " +
                  monthList[finalEndMonth - 1] +
                  "  " +
                  finalEndDate}
              </span>
            </div>

            <div
              className={`absolute  top-[100%] left-0 right-0 z-[150] cursor-default ${
                datePickerStatus ? "block" : "hidden"
              }`}
            >
              <ProviderCalendar2 />
            </div>

            <div
              className={`absolute right-5 ${
                allDataRecievedStatus ? "hidden" : " block"
              } `}
            >
              <RefreshRoundedIcon className="opacity-30 animate-spin" />
            </div>
          </div>
        </div>

        {/* Region */}
        <ProviderRegion2 />
      </div>
    </div>
  );
};

export default ProviderFilter2;
