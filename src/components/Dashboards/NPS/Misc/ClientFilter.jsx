import React, { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useRecoilState } from "recoil";
import allDataRecieved from "../../../../recoil/atoms/allDataRecieved";
import DateFilterStatus from "../../../../recoil/atoms/DateFilterStatusAtom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import seachIcon from "../../../../assets/img/global-img/searchIcon.svg";
import ApiDataJson from "../../../../mock_API/NPS/NPS Main Dashboard/ClientFilter.json";
import activeFilterButton from "../../../../recoil/atoms/activeFilterButton";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";
import clientStatusLocalAtom from "../../../../recoil/atoms/clientStatusLocalAtom";
import flushClinic from "../../../../recoil/atoms/flushClinic";
import clientValue from "../../../../recoil/atoms/clientValue";
import axios from "axios";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";
import runClientAPIatom from "../../../../recoil/atoms/runClientAPIatom";
import flushClientFilter from "../../../../recoil/atoms/flushClientFilter";
const ClientFilter = () => {
  const [allDataRecievedStatus, setAllDataRecievedStatus] =
    useRecoilState(allDataRecieved);
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);
  const [clientStatusLocal, setClientStatusoLocal] = useState(false);
  const [inputData, setInputData] = useState("");
  const [filterButtonStatus, setFilterButtonStatus] =
    useRecoilState(activeFilterButton);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);
  const [clientLocal, setClientLocal] = useState([]);
  const [flushClinicStatus, setFlushClinicStatus] = useRecoilState(flushClinic);
  const [flushClientStatus, setFlushClientStatus] =
    useRecoilState(flushClientFilter);
  const [clientLocalStatusAtom, setClientLocalStatusAtom] = useRecoilState(
    clientStatusLocalAtom
  );
  const [selectedClientValue, setSelectedClientValue] =
    useRecoilState(clientValue);
  const [usernameLocal, setUsernameLocal] = useState();
  const [runClientAPI, setRunClientAPI] = useRecoilState(runClientAPIatom);
  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);

  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobalValue);

  const [ApiData, setApiData] = useState();

  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  useEffect(() => {
    if (flushClientStatus === true) {
      console.log("deleteimg clientttttttttttttttttttttttt");
      setClientLocal([]);
      setSelectedClientValue([]);
    }
  }, [flushClientStatus]);

  const closeToggle = () => {
    setClientStatusoLocal(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  // console.log(ApiData);

  // useEffect(() => {
  //   setApiData(ApiDataJson);
  // }, []);

  useEffect(async () => {
    const text = clientLocal.join(",");

    setSelectedClientValue(text);

    if (runClientAPI === true && usernameLocal) {
      const formdata = new FormData();
      formdata.append("username", usernameLocal);

      const clinicData = await axios.post(
        baseAPI +
          "filterClient?start_month=" +
          finalStartMonth +
          "&start_year=" +
          finalStartDate +
          "&end_month=" +
          finalEndMonth +
          "&end_year=" +
          finalEndDate +
          "&region=" +
          newRegionGlobal +
          "&clinic=" +
          selectedClinicValue,
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );

      setApiData(clinicData?.data);
    }
  }, [usernameLocal, runClientAPI]);

  useEffect(() => {
    const text = clientLocal.join(",");

    setSelectedClientValue(text);
  }, [clientLocal, selectedClientValue]);

  useEffect(() => {
    if (clientLocal.length) {
      setClientLocalStatusAtom(true);
    } else {
      setClientLocalStatusAtom(false);
    }
  }, [clientLocal]);

  return (
    <div
      className="relative z-[150] "
      ref={ref}
      onClick={() => setDatePickerStatus(!setDatePickerStatus)}
    >
      <div
        className={` ${
          allDataRecievedStatus
            ? "active:scale-95"
            : " opacity-50 cursor-not-allowed"
        } cursor-pointer  p-1 bg-green-50 bg-opacity-80 transition-all px-2 rounded-lg flex justify-center items-center  border relative `}
        onClick={() => {
          if (allDataRecievedStatus) {
            setClientStatusoLocal(!clientStatusLocal);
            // setCallRegion(false);
            setFlushClientStatus(false);
          }
        }}
      >
        <PeopleAltOutlinedIcon className="text-green-500" fontSize="small" />
        <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1 ">
          Clients
        </span>

        <div
          className={`text-xs ml-2 rounded-full bg-[#00ac69] bg-opacity-80 text-white font-semibold w-[25px] h-[25px] flex justify-center items-center  ${
            clientLocal?.length > 0 ? "block" : "hidden"
          } `}
        >
          {clientLocal?.length}
        </div>
        <div
          className={`absolute right-5 ${
            allDataRecievedStatus ? "hidden" : " block"
          } `}
        >
          <RefreshRoundedIcon className="opacity-50 animate-spin" />
        </div>
      </div>

      {/* list items */}
      <div
        className={` ${
          clientStatusLocal ? "block ease-in" : "hidden ease-out"
        } absolute top-[110%] bg-white shadow-lg h-[230px] w-full rounded-lg transition-all p-2 `}
      >
        <div className="h-full">
          {/* fetched list */}
          <div className="relative  h-full">
            <div className="h-full  overflow-scroll scrollbar-hide">
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

              {/* List */}
              <div className="pl-2 pt-2 relative  pb-14">
                <div>
                  {ApiData?.client
                    ?.filter((filtered_value) => {
                      if (inputData === "") {
                        return filtered_value;
                      } else if (
                        filtered_value
                          ?.toLowerCase()
                          ?.includes(inputData.toLowerCase())
                      ) {
                        return filtered_value;
                      }
                    })
                    .map((data, index) => (
                      <div
                        key={index + 1}
                        className="flex justify-start items-center gap-2 mb-2"
                      >
                        <input
                          type="checkbox"
                          name={data}
                          value={data}
                          checked={clientLocal?.includes(data) ? true : false}
                          onChange={() => {
                            if (clientLocal?.includes(data)) {
                              setClientLocal((clientLocal) =>
                                arrayRemove(clientLocal, data)
                              );
                            } else {
                              setClientLocal((clientLocal) => [
                                ...clientLocal,
                                data,
                              ]);
                            }
                          }}
                        />

                        <label
                          htmlFor={data}
                          className="text-sm ml-5 "
                          onClick={() => {
                            {
                              if (clientLocal?.includes(data)) {
                                setClientLocal((clientLocal) =>
                                  arrayRemove(clientLocal, data)
                                );
                              } else {
                                setClientLocal((clientLocal) => [
                                  ...clientLocal,
                                  data,
                                ]);
                              }
                            }
                          }}
                        >
                          <p className="text-ellipsis overflow-hidden ... ">
                            {data}
                          </p>
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Submit btn */}
            <div className="bg-white pt-1 absolute bottom-0 right-0 left-0 flex justify-between items-center  pl-2">
              <div className="flex justify-start items-center gap-2  ">
                <div
                  className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#00ac69]"
                  onClick={() => {
                    {
                      setClientLocal(ApiData?.client);
                    }
                  }}
                >
                  Select All
                </div>

                <div
                  className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#00ac69]"
                  onClick={() => {
                    setClientLocal([]);
                  }}
                >
                  Clear
                </div>
              </div>
              <div
                className="p-1 rounded-lg bg-[#00ac69] text-white w-[100px] text-center  active:scale-95 transition-all cursor-pointer"
                onClick={() => {
                  setRunClientAPI(true);
                  setClientStatusoLocal(!clientStatusLocal);
                  setFilterButtonStatus(true);
                  setSendDataStatus(true);
                  setGoStatus(!goStatus);
                  setAllDataRecievedStatus(false);

                  setTimeout(() => {
                    setRunClientAPI(false);
                  }, 500);
                }}
              >
                Submit
              </div>
            </div>
          </div>

          {/* selected list */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ClientFilter;
