import React, { useEffect, useState } from "react";
import doctorIcon from "../../../../assets/img/NPS Dashboard/DoctorIcon.svg";
import docData from "../../../../mock_API/NPS/NPS Main Dashboard/HealthProfessional.json";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import providersApiData from "../../../../recoil/atoms/providersApiData";
import { useRecoilState } from "recoil";
import PuffLoader from "react-spinners/PuffLoader";
import SearchIcons from "../../../../assets/img/global-img/searchIcon.svg";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import clientValue from "../../../../recoil/atoms/clientValue";

const Providers3 = () => {
  const [apiData, setApiData] = useState();
  const [providerApiAtom, setProviderApiAtom] =
    useRecoilState(providersApiData);

  useEffect(() => {
    setApiData(providerApiAtom?.data);

    console.log(
      "providerApiAtom?.data: 2222222222222222222222222222222222222222222222222222222"
    );
    console.log(providerApiAtom?.data);
  }, [providerApiAtom]);

  const [searchStatus, setSearchStatus] = useState(false);
  const [inputData, setInputData] = useState("");

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const [usernameLocal, setUsernameLocal] = useState();

  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);
  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobalValue);

  const [selectedClientValue, setSelectedClientValue] =
    useRecoilState(clientValue);

  return (
    <div className=" rounded-lg bg-white transition-all w-[100%] p-2 h-[300px] border">
      {!apiData?.data && (
        <div className="  h-[270px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center ">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData?.data?.length === 0 && (
        <div className="flex 2 h-full w-full justify-center items-center text-gray-400">
          No Providers
        </div>
      )}

      {apiData?.data?.length > 0 && (
        <div>
          <div className=" pt-2  flex justify-between items-end mb-2">
            <h1 className=" text-left font-bold  flex-1 px-2 opacity-80 text-[#000C08]">
              Providers
            </h1>
            <div className="flex items-center gap-2">
              <div className=" rounded-md  flex justify-end items-center ">
                <input
                  type="text"
                  placeholder="Search.."
                  className={` outline-none  transition-all pl-2 text-xs  pb-1 w-[80px] sm:w-[100px] ${
                    searchStatus
                      ? "xl:w-[100%] ease-in  xl:border-b-[1px]"
                      : "xl:w-[0%] ease-out "
                  }`}
                  onChange={handleInput}
                  value={inputData}
                />
                {/* <SearchIcon
                fontSize="small"
                className="cursor-pointer text-gray-400"
              /> */}
                <img
                  src={SearchIcons}
                  alt="searchIcon"
                  className="px-2 cursor-pointer"
                  onClick={() => setSearchStatus(!searchStatus)}
                />
              </div>

              <a
                href={
                  BASE_API_LINK +
                  "providerDataDownload?" +
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
            </div>
          </div>

          <div className="h-[240px] overflow-y-scroll">
            <table className="">
              <thead className=" sticky top-0 bg-white">
                <tr className="text-xs text-gray-400   shadow">
                  <th className=" font-normal text-left  px-1">Type</th>
                  <th className=" font-normal text-left  px-1">Name</th>
                  <th className=" font-normal text-left px-1">
                    Top Positive Topic
                  </th>
                  <th className="font-normal text-left  px-1">
                    Top Negative Topic
                  </th>
                  <th className="font-normal text-left  px-1">Survey Count</th>
                  <th className=" font-normal text-left px-1">Score</th>

                  <th className=" font-normal text-left px-1">NPS</th>
                </tr>
              </thead>

              <tbody>
                {apiData?.data
                  ?.filter((filtered_value) => {
                    if (inputData === "") {
                      return filtered_value;
                    } else if (
                      filtered_value?.provider_name
                        ?.toLowerCase()
                        ?.includes(inputData.toLowerCase())
                    ) {
                      return filtered_value;
                    }
                  })
                  .map((data, idx) => (
                    <tr key={idx} className=" h-[50px] ">
                      <td className="w-[7%] px-1 ">
                        <div className="rounded-md text-sm h-10  bg-[#e6f5fc] flex justify-center items-center text-[#0094e0] uppercase">
                          {data?.provider_type}
                        </div>
                      </td>
                      <td className="w-[25%] px-1">
                        <div className="text-sm">{data?.provider_name}</div>
                        <div className="text-gray-500 text-xs">
                          {data?.provider_category}
                        </div>
                      </td>
                      <td className="w-[15%] px-1">
                        <div className=" text-gray-500 text-xs flex  items-center ">
                          {apiData?.topic[idx].POSITIVE_TOPIC}
                        </div>
                      </td>
                      <td className="w-[20%] px-1">
                        <div className="text-gray-500 text-xs flex  items-center">
                          {apiData?.topic[idx].NEGATIVE_TOPIC}
                        </div>
                      </td>
                      <td className="w-[5%] px-1">
                        <div className="text-sm text-gray-500  my-auto">
                          {data?.count}
                        </div>
                      </td>
                      <td className="w-[5%] px-1">
                        <div className="text-sm text-gray-500  my-auto">
                          {data?.score}
                        </div>
                      </td>
                      <td className="w-[24%] px-1">
                        <div className="w-[100%] flex justify-start items-center">
                          <div
                            style={{
                              width: `${data?.average_nps}%`,
                            }}
                            className="bg-[#0094DE] h-[25px] min-w-[15%] py-1 text-white text-center rounded-r-md flex justify-end items-center pr-1"
                          >
                            {data?.average_nps}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers3;
