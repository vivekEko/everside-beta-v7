import React, { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";

// import extremeCommentsData from "../../../../mock_API/NPS/NPS Main Dashboard/AlertsComments.json";
import { useRecoilState } from "recoil";

import PuffLoader from "react-spinners/PuffLoader";
import SearchIcons from "../../../../assets/img/global-img/searchIcon.svg";
// import ErrorIcon from "../../../../assets/img/global-img/Error.svg";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import alertCommentsApiData from "../../../../recoil/atoms/alertCommentsApiData";
import ExtremeIcon from "../../../../assets/img/NPS Dashboard/Extreme.svg";
import chevron from "../../../../assets/img/NPS Dashboard/chevron.svg";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import clientValue from "../../../../recoil/atoms/clientValue";

const AlertComments2 = () => {
  const [apiData, setApiData] = useState();
  const [alertCommentsAPIData, setAlertCommentsAPIData] =
    useRecoilState(alertCommentsApiData);
  const [inputData, setInputData] = useState("");
  const [expandComment, setExpandComment] = useState("");
  const [clickCount, setClickCount] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [totalFilteredComments, setTotalFilteredComments] = useState();
  const [ascSort, setAscSort] = useState(false);
  const [selectedClientValue, setSelectedClientValue] =
    useRecoilState(clientValue);

  //   truncating description if it contains more then desired no. of characters
  function truncate(string, n) {
    return (
      <span>
        {string?.length > n && (
          <span>
            {string.substr(0, n - 1)}{" "}
            <span className="text-[10px] text-gray-500 cursor-pointer">
              {" "}
              ... read more
            </span>
          </span>
        )}
        {string?.length <= n && <span>{string}</span>}
      </span>
    );
  }

  useEffect(() => {
    setApiData(alertCommentsAPIData?.data);
  }, [alertCommentsAPIData]);

  const handleInput = (e) => {
    setInputData(e.target.value);

    setTotalFilteredComments(
      apiData?.filter((filtered_value) => {
        return filtered_value?.review
          ?.toLowerCase()
          ?.includes(e.target.value?.toLowerCase());
      }).length
    );
  };

  const [usernameLocal, setUsernameLocal] = useState();

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);
  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobalValue);

  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  return (
    <div className=" w-[100%] p-2 h-[400px] rounded-lg bg-white border ">
      {!apiData && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div>
          <div className=" pt-2  flex justify-between items-center pb-2 ">
            <h1 className=" text-left font-bold  flex-1 px-2 opacity-80">
              Alerts
              <span
                className={` ${
                  inputData ? " " : " hidden"
                }  ml-1 sm:ml-5 text-[#0b271c]  rounded-md bg-red-100  border text-xs sm:text-sm p-1 sm:px-2`}
              >
                {totalFilteredComments}
              </span>
            </h1>

            <div className="flex items-center gap-2 flex-row-reverse ">
              <a
                href={
                  BASE_API_LINK +
                  "alertCommentsDownload?" +
                  "username=" +
                  usernameLocal +
                  "&start_year=" +
                  finalStartDate +
                  "&" +
                  "start_month=" +
                  finalStartMonth +
                  "&" +
                  "end_year=" +
                  finalEndDate +
                  "&" +
                  "end_month=" +
                  finalEndMonth +
                  "&region=" +
                  newRegionGlobal +
                  "&clinic=" +
                  selectedClinicValue +
                  "&client=" +
                  selectedClientValue
                }
              >
                <FileDownloadOutlinedIcon
                  fontSize="small"
                  className="cursor-pointer text-gray-400"
                />
              </a>

              <div className=" rounded-md flex justify-end items-center ">
                <input
                  type="text"
                  placeholder="Search.."
                  className={` outline-none  transition-all pl-2 text-xs  pb-1 w-[80px] sm:w-[100px] ${
                    searchStatus
                      ? "xl:w-[100%] ease-in  xl:border-b-[1px]"
                      : "xl:w-[0%] ease-out"
                  }`}
                  onChange={handleInput}
                  value={inputData}
                />

                <img
                  src={SearchIcons}
                  alt="searchIcon"
                  className="px-2 cursor-pointer"
                  onClick={() => setSearchStatus(!searchStatus)}
                />
              </div>
            </div>
          </div>

          <div className=" h-[340px]  ">
            {apiData?.length === 0 ? (
              <div className="h-full w-full flex justify-center items-center text-gray-400">
                No Alerts
              </div>
            ) : (
              <div className="h-[350px] overflow-y-scroll ">
                <div className="text-[12px] p-3 pb-0 w-full  ">
                  <div className=" sticky bg-white top-0 z-[5] ">
                    <div className=" grid grid-cols-[60px_minmax(150px,1fr)_minmax(100px,120px)_minmax(100px,120px)_minmax(100px,120px)_minmax(80px,100px)] gap-1   min-w-[600px]  text-[12px] text-gray-500 uppercase font-normal bg-white border-b-2 ">
                      <div
                        onClick={() => {
                          setAscSort(!ascSort);
                          setApiData(apiData?.map((data) => data)?.reverse());
                        }}
                        className=" text-gray-400  capitalize  font-normal cursor-pointer hover:text-gray-600 transition  "
                      >
                        <span>Date</span>
                        <span>
                          <img
                            src={chevron}
                            alt=" sort date"
                            className={` ${
                              ascSort
                                ? "rotate-180 ease-in"
                                : "rotate-0 ease-in"
                            } transition-all inline w-[6px] ml-1 `}
                          />
                        </span>
                      </div>
                      <div className=" text-gray-400   capitalize  font-normal ">
                        Comments
                      </div>
                      <div className=" text-gray-400   capitalize font-normal  ">
                        Topic
                      </div>

                      <div className=" text-gray-400   capitalize font-normal  ">
                        Client
                      </div>

                      <div className=" text-gray-400   capitalize font-normal  ">
                        Clinic
                      </div>

                      <div className="font-normal  text-center capitalize  text-gray-400    ">
                        Sentiment
                      </div>
                    </div>
                  </div>

                  <div>
                    {apiData
                      ?.filter((filtered_value) => {
                        if (inputData === "") {
                          return filtered_value;
                        } else if (
                          filtered_value?.review
                            ?.toLowerCase()
                            ?.includes(inputData.toLowerCase())
                        ) {
                          return {
                            filtered_value,
                          };
                        }
                      })
                      .map((data, index) => {
                        return (
                          <div key={data?.id} className="w-full ">
                            <div className=" grid  grid-cols-[60px_minmax(150px,1fr)_minmax(100px,120px)_minmax(100px,120px)_minmax(100px,120px)_minmax(80px,100px)] gap-1 items-center  border-b py-2 min-h-[60px] min-w-[600px]">
                              <div className="  text-gray-400  capitalize  font-normal text-[12px]  ">
                                {data?.timestamp}
                              </div>

                              <div className=" text-gray-400   text-left font-normal  ">
                                {/* {data?.review} */}
                                <div
                                  className="w-full text-[#000c08b3] text-[12px] font-semibold"
                                  onClick={() => {
                                    setExpandComment(data?.id);
                                    setClickCount(!clickCount);
                                  }}
                                >
                                  {expandComment == data?.id && clickCount
                                    ? data?.review
                                    : truncate(data?.review, 100)}
                                </div>
                              </div>

                              <div className=" text-gray-400    font-normal ">
                                {data?.topic}
                              </div>

                              <div className=" text-gray-400    font-normal ">
                                {data?.client}
                              </div>
                              <div className=" text-gray-400    font-normal ">
                                {data?.clinic}
                              </div>

                              <div className="  font-normal    text-gray-400 capitalize   ">
                                <img
                                  src={ExtremeIcon}
                                  alt="Extreme"
                                  className="mx-auto "
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertComments2;
