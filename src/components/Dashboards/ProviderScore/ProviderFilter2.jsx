import React, { useEffect, useState } from "react";
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
import ProviderClinic2 from "./ProviderClinic2";
import ProviderClient2 from "./ProviderClient2";
import clientAPIdataProvider from "../../../recoil/atoms/clientAPIdataProvider";
import clinicProviderAPI from "../../../recoil/atoms/clinicProviderAPI";
import regionGlobalProvider from "../../../recoil/atoms/regionGlobalProvider";
import flushRegionProvider from "../../../recoil/atoms/flushRegionProvider";
import flushClinicProvider from "../../../recoil/atoms/flushClinicProvider";
import flushClientProvider from "../../../recoil/atoms/flushClientProvider";
import regionDataLengthAtom from "../../../recoil/atoms/regionDataLengthAtom";
import clinicDataLengthAtom from "../../../recoil/atoms/clinicDataLengthAtom";
import clientDataLengthAtom from "../../../recoil/atoms/clientDataLengthAtom";
import FormatColorResetOutlinedIcon from "@mui/icons-material/FormatColorResetOutlined";

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

  const [regionGlobal, setRegionGlobal] = useRecoilState(regionGlobalProvider);
  const [clinicAPIData, setClinicAPIData] = useRecoilState(clinicProviderAPI);
  const [clientAPIdata, setClientDataProvider] = useRecoilState(
    clientAPIdataProvider
  );
  const [flushRegionValue, setFlushRegionvalue] =
    useRecoilState(flushRegionProvider);

  const [flushClinicStatus, setFlushClinicStatus] =
    useRecoilState(flushClinicProvider);
  const [flushClientStatus, setFlushClientStatus] =
    useRecoilState(flushClientProvider);
  const [regionDataLength, setRegionDataLength] =
    useRecoilState(regionDataLengthAtom);
  const [clinicDataLength, setClinicDataLength] =
    useRecoilState(clinicDataLengthAtom);
  const [clientDataLength, setClientDataLength] =
    useRecoilState(clientDataLengthAtom);

  // Local variable
  const [clearFilterVar, setClearFilterVar] = useState(false);

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

  // clear filter logic
  useEffect(() => {
    setFlushRegionvalue(true);
    setFlushClinicStatus(true);
    setFlushClientStatus(true);
    setTimeout(() => {
      setFlushRegionvalue(false);
      setFlushClinicStatus(false);
      setFlushClientStatus(false);
    }, 500);
  }, [clearFilterVar]);

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

        {/* Clinics / Health  */}
        <ProviderClinic2 />

        {/* Clients */}
        <ProviderClient2 />

        {/* Clear filter */}
        <div
          className={`
          ${
            allDataRecievedStatus === true
              ? "  cursor-pointer active:scale-95"
              : "opacity-50 cursor-not-allowed "
          }
          
          ${
            regionDataLength > 0 || clinicDataLength > 0 || clientDataLength > 0
              ? "  cursor-pointer active:scale-95"
              : "opacity-50 cursor-not-allowed "
          }  bg-green-50 p-2 rounded-lg text-[10px] sm:text-[12px] text-[#000C08] border text-opacity-70  transition-all flex justify-center items-center gap-2`}
          onClick={() => {
            if (allDataRecievedStatus === true) {
              if (
                regionDataLength > 0 ||
                clinicDataLength > 0 ||
                clientDataLength > 0
              ) {
                setClearFilterVar(!clearFilterVar);
              }
            }
          }}
        >
          <FormatColorResetOutlinedIcon
            fontSize="small"
            className="text-[#00ac69]"
          />
          Clear Filters
        </div>
      </div>
    </div>
  );
};

export default ProviderFilter2;
