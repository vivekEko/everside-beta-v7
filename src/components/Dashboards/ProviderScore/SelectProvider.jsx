import React, { useEffect, useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import providersApiData from "../../../recoil/atoms/providersApiData";
import { useRecoilState } from "recoil";
import seachIcon from "../../../assets/img/global-img/searchIcon.svg";

const SelectProvider = () => {
  // Global Variables
  const [providerAPIDATA, setProviderAPIDATA] =
    useRecoilState(providersApiData);
  // Local variables
  const [providerListStatus, setProviderListStatus] = useState(false);
  const [inputData, setInputData] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);

  //   Search bar input field
  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    console.log("length from select provider");
    console.log(providerAPIDATA?.provider?.length);
  }, [providerAPIDATA?.provider?.length]);

  useEffect(() => {
    console.log(selectedProvider);
  }, [selectedProvider]);

  return (
    <div className=" mb-2">
      <div className="flex  text-gray-500   text-sm relative">
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
          } absolute left-0 top-[120%] transition-all   text-xl  w-[220px] rounded-md  shadow-2xl z-50 bg-white  border `}
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

          <div
            className="mt-2 z-[50]  h-[250px]
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
                      //   onChange={() => {
                      //     if (providerLocal?.includes(data)) {
                      //       console.log(data + " already exits");
                      //       setProviderLocal((providerLocal) =>
                      //         arrayRemove(providerLocal, data)
                      //       );
                      //     } else {
                      //       setProviderLocal((providerLocal) => [
                      //         ...providerLocal,
                      //         data,
                      //       ]);
                      //     }
                      //   }}
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
        </div>
      </div>
    </div>
  );
};

export default SelectProvider;
