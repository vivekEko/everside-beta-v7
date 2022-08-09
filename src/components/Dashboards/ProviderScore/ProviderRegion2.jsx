import React, { useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useRecoilState } from "recoil";
import allDataRecievedProvider from "../../../recoil/atoms/allDataRecievedProvider";
import DateFilterStatus from "../../../recoil/atoms/DateFilterStatusAtom";
import regionStatusProvider from "../../../recoil/atoms/regionStatusProvider";
import regionGlobalProvider from "../../../recoil/atoms/regionGlobalProvider";
import seachIcon from "../../../assets/img/global-img/searchIcon.svg";
import flushRegionProvider from "../../../recoil/atoms/flushRegionProvider";
import regionDataLengthAtom from "../../../recoil/atoms/regionDataLengthAtom";
import selectedRegionProvider from "../../../recoil/atoms/selectedRegionProvider";
import axios from "axios";
import { BASE_API_LINK } from "../../../utils/BaseAPILink";
import endMonthValueProvider from "../../../recoil/atoms/EndMonthProvider";
import endDateValueProvider from "../../../recoil/atoms/EndDateAtomProvider";
import startMonthValueProvider from "../../../recoil/atoms/StartMonthAtomProvider";
import startDateValueProvider from "../../../recoil/atoms/StartDateAtomProvider";
import flushClinicProvider from "../../../recoil/atoms/flushClinicProvider";
import flushClientProvider from "../../../recoil/atoms/flushClientProvider";
import providersApiData from "../../../recoil/atoms/providersApiData";

const ProviderRegion2 = () => {
  // Global Variables
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);
  const [callRegion, setCallRegion] = useRecoilState(regionStatusProvider);
  const [regionGlobal, setRegionGlobal] = useRecoilState(regionGlobalProvider);
  const [flushRegionValue, setFlushRegionvalue] =
    useRecoilState(flushRegionProvider);
  const [allDataRecievedStatus, setAllDataRecievedStatus] = useRecoilState(
    allDataRecievedProvider
  );
  const [regionDataLength, setRegionDataLength] =
    useRecoilState(regionDataLengthAtom);
  const [regionLocal, setRegionLocal] = useRecoilState(selectedRegionProvider);
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

  const [flushClinicStatus, setFlushClinicStatus] =
    useRecoilState(flushClinicProvider);
  const [flushClientStatus, setFlushClientStatus] =
    useRecoilState(flushClientProvider);
  const [providerAPIDATA, setProviderAPIDATA] =
    useRecoilState(providersApiData);

  // Local Variables
  const [regionShowStatus, setRegionShowStatus] = useState(false);
  const [runClinicAPI, setRunClinicAPI] = useState(true);

  const [inputData, setInputData] = useState("");
  const [regionSubmit, setRegionSubmit] = useState(false);
  const [usernameLocal, setUsernameLocal] = useState();

  // Flushing region list
  useEffect(() => {
    if (flushRegionValue === true) {
      setRegionLocal([]);
    }
  }, [flushRegionValue]);

  // Handle search input
  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  // handle All select
  function handleAllSelect() {
    if (regionGlobal.length > regionLocal.length) {
      regionGlobal?.map((data) =>
        setRegionLocal((regionLocal) => [
          ...regionLocal,
          data.substr(data.indexOf(",") + 1),
        ])
      );
    }
  }

  // function to remove selected text from array
  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  // Click outside this component to close it functionality
  const closeToggle = () => {
    setRegionShowStatus(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  // send length to clear filter
  useEffect(() => {
    setRegionDataLength(regionLocal.length);
  }, [regionLocal]);

  // getting username from session storage
  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  // Region submit call
  function handleRegionSubmit() {
    setAllDataRecievedStatus(false);
    setRegionShowStatus(false);
    const paramText = regionLocal.join(",");

    // adding username in form data
    const formdata = new FormData();
    formdata.append("username", usernameLocal);

    const regionSubmitCall = axios
      .post(
        BASE_API_LINK +
          "filterRegionProvider?start_month=" +
          finalStartMonth +
          "&start_year=" +
          finalStartDate +
          "&end_month=" +
          finalEndMonth +
          "&end_year=" +
          finalEndDate +
          "&region=" +
          paramText,
        formdata,
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("api res:");
        console.log(res?.data);

        setProviderAPIDATA(res?.data);

        setFlushClinicStatus(true);
        setFlushClientStatus(true);
        setTimeout(() => {
          setFlushClinicStatus(false);
          setFlushClientStatus(false);
          setAllDataRecievedStatus(true);
        }, 500);
      });
  }

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
          <div
            className={`text-xs ml-2 rounded-full bg-[#00ac69] bg-opacity-80 text-white font-semibold w-[25px] h-[25px] flex justify-center items-center  ${
              regionLocal?.length > 0 ? "visible" : "invisible"
            } `}
          >
            {regionLocal?.length}
          </div>

          <div
            className={`absolute right-5 ${
              allDataRecievedStatus ? "hidden" : " block"
            } `}
          >
            <RefreshRoundedIcon className="opacity-50 animate-spin" />
          </div>
        </div>
      </div>

      {/* List items */}
      <div
        className={` ${
          regionShowStatus ? "block ease-in" : "hidden ease-out"
        } absolute top-[110%] bg-white shadow-lg h-[250px] w-full rounded-lg transition-all p-2  `}
      >
        <div>
          {/* search */}
          <div className=" bg-white h-[30px] sticky top-0 z-[45]">
            <div className="relative">
              <input
                type="text"
                className="outline-none border-0 pl-8 w-full text-xs border-b pb-2"
                placeholder="Search..."
                onChange={handleInput}
                value={inputData}
              />
              <div className="absolute top-0 left-0 w-5">
                <img src={seachIcon} alt="" />
              </div>
            </div>
          </div>

          {/* Region List */}
          <div className="pl-2 pt-2 relative  pb-14">
            <div>
              {regionGlobal
                ?.filter((filtered_value) => {
                  if (inputData === "") {
                    return filtered_value;
                  } else if (
                    filtered_value
                      ?.toLowerCase()
                      ?.includes(inputData?.toLowerCase())
                  ) {
                    return filtered_value;
                  }
                })
                .map((data, index) => {
                  return (
                    <div key={index + 1}>
                      <input
                        type="checkbox"
                        name={data?.split(",")[0]}
                        value={data?.split(",")[0]}
                        checked={
                          regionLocal?.includes(
                            data.substr(data.indexOf(",") + 1)
                          )
                            ? true
                            : false
                        }
                        onChange={() => {
                          if (
                            regionLocal?.includes(
                              data.substr(data.indexOf(",") + 1)
                            )
                          ) {
                            console.log(
                              data.substr(data.indexOf(",") + 1) +
                                " already exits"
                            );
                            setRegionLocal((regionLocal) =>
                              arrayRemove(
                                regionLocal,
                                data.substr(data.indexOf(",") + 1)
                              )
                            );
                          } else {
                            setRegionLocal((regionLocal) => [
                              ...regionLocal,
                              data.substr(data.indexOf(",") + 1),
                            ]);
                          }
                        }}
                      />

                      <label
                        htmlFor={data?.split(",")[0]}
                        className="text-sm ml-5"
                        onClick={() => {
                          {
                            if (
                              regionLocal?.includes(
                                data.substr(data.indexOf(",") + 1)
                              )
                            ) {
                              console.log(
                                data.substr(data.indexOf(",") + 1) +
                                  " already exits"
                              );
                              setRegionLocal((regionLocal) =>
                                arrayRemove(
                                  regionLocal,
                                  data.substr(data.indexOf(",") + 1)
                                )
                              );
                            } else {
                              setRegionLocal((regionLocal) => [
                                ...regionLocal,
                                data.substr(data.indexOf(",") + 1),
                              ]);
                            }
                          }
                        }}
                      >
                        {data?.split(",")[0]}
                      </label>
                    </div>
                  );
                })}
              {/* Submit btn */}
              <div className="bg-white pt-1 absolute bottom-0 right-0 left-0 flex justify-between items-center  pl-2">
                <div className="flex justify-start items-center gap-2  ">
                  <div
                    className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#00ac69]"
                    onClick={handleAllSelect}
                  >
                    Select All
                  </div>

                  <div
                    className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#00ac69]"
                    onClick={() => {
                      setRegionLocal([]);
                      // setNewRegionGlobal([]);
                      // setAllChecked(false);
                    }}
                  >
                    Clear
                  </div>
                </div>
                <div
                  className="p-1 rounded-lg bg-[#00ac69] text-white w-[100px] text-center  active:scale-95 transition-all cursor-pointer"
                  // onClick={() => {
                  //   setRegionShowStatus(!regionShowStatus);
                  //   // setSendDataStatus(true);
                  //   // setNewRegionGlobal(regionLocal);
                  //   // setFlushClinicStatus(true);
                  //   // setAllDataRecievedStatus(false);
                  //   // setRunClinicAPI(true);
                  //   // setGoStatus(!goStatus);

                  //   console.log("selected regions:");
                  //   console.log(regionLocal.join(","));

                  //   setRegionSubmit(!regionSubmit)
                  // }}

                  onClick={handleRegionSubmit}
                >
                  Submit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderRegion2;
