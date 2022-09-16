import React, { useEffect, useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useRecoilState } from "recoil";
import seachIcon from "../../../assets/img/global-img/searchIcon.svg";
import { useDetectClickOutside } from "react-detect-click-outside";
import providerComponentAPIData from "../../../recoil/atoms/providerComponentAPIData";
import { BASE_API_LINK } from "../../../utils/BaseAPILink";
import startDateValueProvider from "../../../recoil/atoms/StartDateAtomProvider";
import startMonthValueProvider from "../../../recoil/atoms/StartMonthAtomProvider";
import endDateValueProvider from "../../../recoil/atoms/EndDateAtomProvider";
import endMonthValueProvider from "../../../recoil/atoms/EndMonthProvider";
import allDataRecievedProvider from "../../../recoil/atoms/allDataRecievedProvider";
import axios from "axios";
import selectedProviderAtom from "../../../recoil/atoms/selectedProviderAtom";
import regionStatusProvider from "../../../recoil/atoms/regionStatusProvider";
import providersApiDataProviderPage from "../../../recoil/atoms/providersApiDataProviderPage";

const SelectProvider = () => {
  // Global Variables
  const [allDataRecievedStatus, setAllDataRecievedStatus] = useRecoilState(
    allDataRecievedProvider
  );
  const [providerAPIDATA, setProviderAPIDATA] = useRecoilState(
    providersApiDataProviderPage
  );
  const [providerComponentApi, setProviderComponentApi] = useRecoilState(
    providerComponentAPIData
  );

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

  const [callRegion, setCallRegion] = useRecoilState(regionStatusProvider);

  // Local variables
  const [providerListStatus, setProviderListStatus] = useState(false);
  const [inputData, setInputData] = useState("");

  const [usernameLocal, setUsernameLocal] = useState();
  const [sendEmail, setSendEmail] = useState(0);

  // getting username from session storage
  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  //   Search bar input field
  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    console.log("selected hai yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    console.log(selectedProvider);
  }, [selectedProvider]);

  // Click outside to close filter functionality
  const closeToggle = () => {
    setProviderListStatus(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  useEffect(() => {
    if (selectedProvider) {
      setAllDataRecievedStatus(false);

      // adding username in form data
      const formdata = new FormData();
      formdata.append("username", sessionStorage?.getItem("username"));

      console.log(sessionStorage?.getItem("username"), "usernameLocal");
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
          console.log("provider submit api res.............................:");
          console.log(res?.data);
          setProviderComponentApi(res?.data);
          setAllDataRecievedStatus(true);
        });
    }
  }, [selectedProvider]);

  // useEffect(() => {
  //   if (selectedProvider) {
  //     // setAllDataRecievedStatus(false);

  //     // adding username in form data
  //     const formdata = new FormData();
  //     formdata.append("username", usernameLocal);
  //     const ProviderEmailcall = axios
  //       .post(
  //         BASE_API_LINK +
  //           "providerEmail?start_month=" +
  //           finalStartMonth +
  //           "&start_year=" +
  //           finalStartDate +
  //           "&end_month=" +
  //           finalEndMonth +
  //           "&end_year=" +
  //           finalEndDate +
  //           "&provider=" +
  //           selectedProvider,
  //         formdata,
  //         {
  //           headers: {
  //             authorization: sessionStorage.getItem("token"),
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log("provider email api res:");
  //         console.log(res?.data);
  //         // setProviderComponentApi(res?.data);
  //         // setAllDataRecievedStatus(true);
  //       });
  //   }
  // }, [sendEmail]);

  return (
    <div className=" mb-2">
      <div className="flex  text-gray-500 justify-between   text-sm relative ">
        <div ref={ref} className="">
          <div
            onClick={() => setProviderListStatus(!providerListStatus)}
            className=" w-fit border cursor-pointer rounded-md p-2 px-3 space-x-2 flex justify-between items-center"
          >
            <span>Select Provider</span>
            <span className="">
              <KeyboardArrowDownRoundedIcon className={`  text-gray-500  `} />
            </span>
          </div>

          <div
            className={`${
              providerListStatus ? "block" : "hidden"
            } absolute left-0 top-[120%] transition-all   text-xl  w-[220px] rounded-md  shadow-2xl bg-white  border  `}
          >
            {/* search */}
            <div className=" bg-white h-[30px] sticky top-0 z-[99]  rounded-md ">
              <div className=" flex items-center p-2  border-b gap-2">
                <div className=" w-fit flex justify-center items-center h-full">
                  <img src={seachIcon} alt="search bar" />
                </div>
                <input
                  type="text"
                  className="outline-none border-0  w-full text-xs  "
                  placeholder="Search..."
                  onChange={handleInput}
                  value={inputData}
                />
              </div>
            </div>
            {providerAPIDATA?.provider?.length ? (
              <div
                className="mt-2 z-[50]  min-h-[150px] max-h-[250px]
overflow-y-scroll"
              >
                {providerAPIDATA?.provider
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
                  ?.map((data, index) => {
                    return (
                      <div
                        key={index + 1}
                        className="flex justify-start items-center gap-2 mb-2 px-2"
                      >
                        <input
                          className=""
                          type="radio"
                          name={data}
                          value={data}
                          checked={selectedProvider === data ? true : false}
                          onChange={() => {
                            if (selectedProvider === data) {
                              setSelectedProvider(null);
                            } else {
                              setSelectedProvider(data);
                            }
                          }}
                        />

                        <label
                          htmlFor={data}
                          className="text-sm ml-5"
                          //   onClick={() => {
                          //     {
                          //       if (providerLocal?.includes(data)) {
                          //         console.log(data + " already exits");
                          //         setProviderLocal((providerLocal) =>
                          //           arrayRemove(providerLocal, data)
                          //         );
                          //       } else {
                          //         setProviderLocal((providerLocal) => [
                          //           ...providerLocal,
                          //           data,
                          //         ]);
                          //       }
                          //     }
                          //   }}

                          onClick={() => {
                            if (selectedProvider === data) {
                              setSelectedProvider(null);
                            } else {
                              setSelectedProvider(data);
                            }
                          }}
                        >
                          <p className="text-ellipsis overflow-hidden ... ">
                            {data}
                          </p>
                        </label>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div
                className="mt-2 z-[50]  min-h-[150px] max-h-[250px]
flex justify-center items-center"
              >
                <h1 className="text-gray-400 text-center text-sm">
                  No Providers
                </h1>
              </div>
            )}
          </div>
        </div>

        <div className="hidden">
          <div
            onClick={() => setSendEmail(!sendEmail)}
            className={` ${
              selectedProvider
                ? "bg-[#00ac69] active:scale-95 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } p-3  text-white rounded-md transition  `}
          >
            Send Report
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectProvider;
