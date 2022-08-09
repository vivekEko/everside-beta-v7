import React, { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useRecoilState } from "recoil";
import allDataRecievedProvider from "../../../recoil/atoms/allDataRecievedProvider";
import DateFilterStatus from "../../../recoil/atoms/DateFilterStatusAtom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import seachIcon from "../../../assets/img/global-img/searchIcon.svg";
import clientAPIdataProvider from "../../../recoil/atoms/clientAPIdataProvider";
import flushClientProvider from "../../../recoil/atoms/flushClientProvider";
import clientDataLengthAtom from "../../../recoil/atoms/clientDataLengthAtom";
import flushClinicProvider from "../../../recoil/atoms/flushClinicProvider";

const ProviderClient2 = () => {
  // Global variabbles
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);
  const [allDataRecievedStatus, setAllDataRecievedStatus] = useRecoilState(
    allDataRecievedProvider
  );

  const [clientAPIdata, setClientDataProvider] = useRecoilState(
    clientAPIdataProvider
  );
  const [flushClientStatus, setFlushClientStatus] =
    useRecoilState(flushClientProvider);
  const [clientDataLength, setClientDataLength] =
    useRecoilState(clientDataLengthAtom);
  // Local variables
  const [clientLocal, setClientLocal] = useState([]);
  const [clientStatusLocal, setClientStatusoLocal] = useState(false);
  const [inputData, setInputData] = useState("");
  const [clearFilterVar, setClearFilterVar] = useState(false);

  // Close on outside click functionality
  const closeToggle = () => {
    setClientStatusoLocal(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  // Search input field
  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  //   remove items from array logic
  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  // Flush client list values
  useEffect(() => {
    if (flushClientStatus === true) {
      setClientLocal([]);
      // setSelectedClientValue([]);
    }
  }, [flushClientStatus]);

  // send length to clear filter
  useEffect(() => {
    setClientDataLength(clientLocal.length);
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
            // setFlushClientStatus(false);
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
                  {clientAPIdata
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
                      setClientLocal(clientAPIdata);
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
                // onClick={() => {
                //   setRunClientAPI(true);
                //   setClientStatusoLocal(!clientStatusLocal);
                //   setFilterButtonStatus(true);
                //   setSendDataStatus(true);
                //   setGoStatus(!goStatus);
                //   setAllDataRecievedStatus(false);

                //   setTimeout(() => {
                //     setRunClientAPI(false);
                //   }, 500);
                // }}
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

export default ProviderClient2;
