import React, { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import seachIcon from "../../../assets/img/global-img/searchIcon.svg";

import { useRecoilState } from "recoil";
import flushClinicProvider from "../../../recoil/atoms/flushClinicProvider";
import ProviderDateFilterStatus from "../../../recoil/atoms/ProviderDateFilterStatusAtom";
import allDataRecievedProvider from "../../../recoil/atoms/allDataRecievedProvider";
import callClinicProvider from "../../../recoil/atoms/callClinicProvider";
import clinicProviderAPI from "../../../recoil/atoms/clinicProviderAPI";
import clinicDataLengthAtom from "../../../recoil/atoms/clinicDataLengthAtom";
import AllFilterDataProvider from "../../../recoil/atoms/AllFilterDataProvider";
import startDateValueProvider from "../../../recoil/atoms/StartDateAtomProvider";
import startMonthValueProvider from "../../../recoil/atoms/StartMonthAtomProvider";
import endMonthValueProvider from "../../../recoil/atoms/EndMonthProvider";
import endDateValueProvider from "../../../recoil/atoms/EndDateAtomProvider";
import axios from "axios";
import { BASE_API_LINK } from "../../../utils/BaseAPILink";
import selectedClinicProvider from "../../../recoil/atoms/selectedClinicProvider";
import clientAPIdataProvider from "../../../recoil/atoms/clientAPIdataProvider";
import providersApiDataProviderPage from "../../../recoil/atoms/providersApiDataProviderPage";

const ProviderClinic2 = () => {
  // Global variables
  const [providerAPIDATA, setProviderAPIDATA] = useRecoilState(
    providersApiDataProviderPage
  );
  const [allFilterData, setAllFilterData] = useRecoilState(
    AllFilterDataProvider
  );
  const [datePickerStatus, setDatePickerStatus] = useRecoilState(
    ProviderDateFilterStatus
  );
  const [flushClinicStatus, setFlushClinicStatus] =
    useRecoilState(flushClinicProvider);
  const [allDataRecievedStatus, setAllDataRecievedStatus] = useRecoilState(
    allDataRecievedProvider
  );
  const [callClinicAtom, setCallClinicAtom] =
    useRecoilState(callClinicProvider);
  const [clinicAPIData, setClinicAPIData] = useRecoilState(clinicProviderAPI);
  const [clinicDataLength, setClinicDataLength] =
    useRecoilState(clinicDataLengthAtom);

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
  const [clinicLocal, setClinicLocal] = useRecoilState(selectedClinicProvider);
  const [clientAPIdata, setClientDataProvider] = useRecoilState(
    clientAPIdataProvider
  );
  // Local Variables
  const [clinicStatusLocal, setClinicStatusoLocal] = useState(false);
  const [inputData, setInputData] = useState("");
  const [regionShowStatus, setRegionShowStatus] = useState(false);
  const [usernameLocal, setUsernameLocal] = useState();

  // Click outside to close filter functionality
  const closeToggle = () => {
    setClinicStatusoLocal(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  // Flush Clinic functionality
  useEffect(() => {
    if (flushClinicStatus === true) {
      setClinicLocal([]);
    }
  }, [flushClinicStatus]);

  //   Search bar input field
  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  // remove from array logic
  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  // send length to clear filter
  useEffect(() => {
    setClinicDataLength(clinicLocal.length);
  }, [clinicLocal]);

  // getting username from session storage
  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  // handle submit
  function handleClientSubmit() {
    setAllDataRecievedStatus(false);
    setClinicStatusoLocal(false);

    const paramText = clinicLocal.join(",");

    // adding username in form data
    const formdata = new FormData();
    formdata.append("username", usernameLocal);

    const clinicSubmitCall = axios
      .post(
        BASE_API_LINK +
          "filterClinicProvider?start_month=" +
          finalStartMonth +
          "&start_year=" +
          finalStartDate +
          "&end_month=" +
          finalEndMonth +
          "&end_year=" +
          finalEndDate +
          "&clinic=" +
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
        console.log("clinic submit api res:");
        console.log(res?.data);
        setProviderAPIDATA(res?.data);
        setAllFilterData(res?.data);
        setClientDataProvider(res?.data?.client);
        setAllDataRecievedStatus(true);
      });
  }

  return (
    <div
      className="relative z-[10]"
      ref={ref}
      onClick={() => setDatePickerStatus(!setDatePickerStatus)}
    >
      <div
        className={` ${
          allDataRecievedStatus
            ? "active:scale-95"
            : " opacity-50 cursor-not-allowed"
        } cursor-pointer  p-1 bg-green-50 bg-opacity-80 transition-all px-2 rounded-lg flex justify-center items-center  border relative  `}
        onClick={() => {
          if (allDataRecievedStatus) {
            setClinicStatusoLocal(!clinicStatusLocal);
            // setCallRegion(false);
            setFlushClinicStatus(false);
          }
        }}
      >
        <MedicationOutlinedIcon className="text-green-500" fontSize="small" />
        <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1 ">
          Health Centers
        </span>

        <div
          className={`text-xs ml-2 rounded-full bg-[#00ac69] bg-opacity-80 text-white font-semibold w-[25px] h-[25px] flex justify-center items-center  ${
            clinicLocal?.length > 0 ? "block" : "hidden"
          } `}
        >
          {clinicLocal?.length}
        </div>
        <div
          className={`absolute right-5 ${
            allDataRecievedStatus ? "hidden" : " block"
          } `}
        >
          <RefreshRoundedIcon className="opacity-50 animate-spin" />
        </div>
      </div>

      {/* Clinic List  */}

      <div
        className={` ${
          clinicStatusLocal ? "block ease-in" : "hidden ease-out"
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
                    <img src={seachIcon} alt="search bar" />
                  </div>
                </div>
              </div>

              {/* List */}
              <div className="pl-2 pt-2 relative pb-14">
                <div>
                  {clinicAPIData
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
                          checked={clinicLocal?.includes(data) ? true : false}
                          onChange={() => {
                            if (clinicLocal?.includes(data)) {
                              console.log(data + " already exits");
                              setClinicLocal((clinicLocal) =>
                                arrayRemove(clinicLocal, data)
                              );
                            } else {
                              setClinicLocal((clinicLocal) => [
                                ...clinicLocal,
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
                              if (clinicLocal?.includes(data)) {
                                console.log(data + " already exits");
                                setClinicLocal((clinicLocal) =>
                                  arrayRemove(clinicLocal, data)
                                );
                              } else {
                                setClinicLocal((clinicLocal) => [
                                  ...clinicLocal,
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
                      setClinicLocal(clinicAPIData);
                    }
                  }}
                >
                  Select All
                </div>

                <div
                  className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#00ac69]"
                  onClick={() => {
                    setClinicLocal([]);
                  }}
                >
                  Clear
                </div>
              </div>
              <div
                className="p-1 rounded-lg bg-[#00ac69] text-white w-[100px] text-center  active:scale-95 transition-all cursor-pointer"
                // onClick={() => {
                // setClinicStatusoLocal(!clinicStatusLocal);
                //   setFilterButtonStatus(true);
                //   setSendDataStatus(true);
                //   setRunClientAPI(true);

                //   setTimeout(() => {
                //     setRunClientAPI(false);
                //   }, 500);
                //   setGoStatus(!goStatus);
                // setAllDataRecievedStatus(false);
                // }}
                onClick={handleClientSubmit}
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderClinic2;
