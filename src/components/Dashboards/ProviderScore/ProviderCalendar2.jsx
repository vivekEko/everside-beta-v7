import React, { useEffect, useState } from "react";
import Cross from "../../../assets/img/global-img/cross.svg";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { monthnameList } from "../../../utils/MonthNames";

import { useRecoilState } from "recoil";
import endDateValueProvider from "../../../recoil/atoms/EndDateAtomProvider";
import endMonthValueProvider from "../../../recoil/atoms/EndMonthProvider";
import ProviderDateFilterStatus from "../../../recoil/atoms/ProviderDateFilterStatusAtom";
import regionStatusProvider from "../../../recoil/atoms/regionStatusProvider";
import startDateValueProvider from "../../../recoil/atoms/StartDateAtomProvider";
import startMonthValueProvider from "../../../recoil/atoms/StartMonthAtomProvider";
import allDataRecievedProvider from "../../../recoil/atoms/allDataRecievedProvider";
import { BASE_API_LINK } from "../../../utils/BaseAPILink";
import selectedProviderAtom from "../../../recoil/atoms/selectedProviderAtom";
import axios from "axios";
import providerComponentAPIData from "../../../recoil/atoms/providerComponentAPIData";

// MUI Slider
const YearSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const ProviderCalendar2 = () => {
  // Global variable
  const [providerComponentApi, setProviderComponentApi] = useRecoilState(
    providerComponentAPIData
  );
  const [datePickerStatus, setDatePickerStatus] = useRecoilState(
    ProviderDateFilterStatus
  );
  const [allDataRecievedStatus, setAllDataRecievedStatus] = useRecoilState(
    allDataRecievedProvider
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

  const [selectedProvider, setSelectedProvider] =
    useRecoilState(selectedProviderAtom);

  // Local variables
  const [val, setVal] = useState([finalStartDate, finalEndDate]);
  const [startMonthVal, setStartMonthVal] = useState("Jan");
  const [startMonthNumVal, setStartMonthNumVal] = useState("1");
  const [endMonthVal, setEndMonthVal] = useState("Nov");
  const [endMonthNumVal, setEndMonthNumVal] = useState(11);
  const [usernameLocal, setUsernameLocal] = useState();

  useEffect(() => {
    console.log("finalStartDate: ", finalStartDate);
    console.log("finalEndDate: ", finalEndDate);
    console.log("finalStartMonth: ", finalStartMonth);
    console.log("finalEndMonth: ", finalEndMonth);
  }, [finalStartDate, finalEndDate, finalStartMonth, finalEndMonth]);

  //   MUI Slider marks
  const marks = [
    {
      value: 2018,
    },
    {
      value: 2019,
    },
    {
      value: 2020,
    },
    {
      value: 2021,
    },
    {
      value: 2022,
    },
  ];

  // Rerendering
  useEffect(() => {
    setFinalStartDate(val[0]);
    setFinalEndDate(val[1]);
  }, [val]);

  // Functions
  const updateVal = (e, item) => {
    setVal(item);
  };
  return (
    <div className="bg-white p-5 rounded-lg  shadow-2xl mt-4 w-[100%] sm:min-w-[340px]">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[18px] opacity-80 ">Select Date</h1>
        <img
          src={Cross}
          alt=""
          className="opacity-80 cursor-pointer transition-all active:scale-90"
          onClick={() => {
            setDatePickerStatus(!datePickerStatus);
          }}
        />
      </div>

      {/* main container */}
      <div>
        {/* date slider  */}
        <div>
          {/* displayed date */}
          <div className="relative ">
            <div className="flex justify-center items-center gap-2 text-sm p-3 rounded-lg bg-green-50 ">
              <h1 className="text-lg opacity-80 font-semibold">
                <span>{startMonthVal}</span> <span>{val[0]}</span>
              </h1>
              <h1 className="text-lg opacity-80 font-semibold">-</h1>
              <h1 className="text-lg opacity-80 font-semibold">
                <span>{endMonthVal}</span> <span>{val[1]}</span>
              </h1>
            </div>
            <div className=" bg-green-50 w-[20px] h-[20px] rotate-45 mx-auto mt-[-10px] "></div>
          </div>

          {/* slider */}

          <div className="w-[90%] mx-auto">
            <YearSlider
              value={val}
              min={2018}
              max={2022}
              onChange={updateVal}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </div>

          {/* Month  list */}
          <div className="flex justify-between items-center gap-2 ">
            <div className="flex-1">
              <div className="text-center w-full opacity-80 font-semibold">
                Start Month
              </div>

              <div className="grid grid-cols-3   place-items-center ">
                {monthnameList?.map((monthName) => (
                  <div
                    key={monthName?.id}
                    className={`h-[45px] w-[45px] flex justify-center items-center  text-center rounded-full hover:bg-green-100 cursor-pointer 
                  ${
                    startMonthVal === monthName?.month
                      ? "bg-green-100 opacity-100"
                      : "opacity-80"
                  }

                
                  `}
                    onClick={() => {
                      setStartMonthVal(monthName?.month);
                      setStartMonthNumVal(monthName?.id);
                      setFinalStartMonth(monthName?.id);
                    }}
                  >
                    {monthName?.month}
                  </div>
                ))}
              </div>
            </div>

            <ArrowForwardIosRoundedIcon
              fontSize="small"
              className="opacity-70 mt-8"
            />

            <div className="flex-1 ">
              <div className="text-center opacity-80 font-semibold">
                End Month
              </div>
              <div className="grid grid-cols-3   place-items-center flex-1 ">
                {monthnameList?.map((monthName) => (
                  <div
                    key={monthName?.id}
                    className={`h-[45px] w-[45px] flex justify-center items-center  text-center rounded-full hover:bg-green-100 cursor-pointer 
                  ${
                    endMonthVal === monthName?.month
                      ? "bg-green-100 opacity-100"
                      : "opacity-80"
                  }
                  ${
                    finalStartDate === finalEndDate &&
                    monthName.id < finalStartMonth
                      ? "cursor-not-allowed text-gray-500 "
                      : ""
                  }
                
                  `}
                    onClick={() => {
                      if (finalStartDate === finalEndDate) {
                        if (monthName.id >= finalStartMonth) {
                          setEndMonthVal(monthName?.month);
                          setEndMonthNumVal(monthName?.id);
                          setFinalEndMonth(monthName?.id);
                        }
                      } else {
                        setEndMonthVal(monthName?.month);
                        setEndMonthNumVal(monthName?.id);
                        setFinalEndMonth(monthName?.id);
                      }
                    }}
                  >
                    {monthName?.month}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* submit button */}
      <div
        className="bg-[#00ac69] mt-5 text-white p-2 rounded-lg text-center cursor-pointer active:scale-95 transition-all"
        onClick={() => {
          setDatePickerStatus(!datePickerStatus);
          //   setCallClinicValue(true);
          setCallRegion(true);
          setAllDataRecievedStatus(false);
          //   setSendDataStatus(true);
          //   setGoStatus(!goStatus);

          if (selectedProvider) {
            setAllDataRecievedStatus(false);

            // adding username in form data
            const formdata = new FormData();
            formdata.append("username", usernameLocal);
            const ProviderSelectCall = axios
              .post(
                BASE_API_LINK +
                  "providerScoreCard?start_month=" +
                  finalStartMonth +
                  "&start_year=" +
                  finalStartDate +
                  "&end_month=" +
                  finalEndMonth +
                  "&end_year=" +
                  finalEndDate +
                  "&provider=" +
                  selectedProvider,
                formdata,
                {
                  headers: {
                    authorization: sessionStorage.getItem("token"),
                    Accept: "application/json",
                  },
                }
              )
              .then((res) => {
                console.log(
                  "provider submit api res calendarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr:"
                );
                console.log(res?.data);
                setProviderComponentApi(res?.data);
                setAllDataRecievedStatus(true);
              });
          }
        }}
      >
        Submit
      </div>
    </div>
  );
};

export default ProviderCalendar2;
