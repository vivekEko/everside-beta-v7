import React, { useEffect, useRef, useState } from "react";
import RespondantsIcon from "../../../assets/img/global-img/respondants.svg";

import LoadingBar from "react-top-loading-bar";

import CountUp from "react-countup";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PuffLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import npsAPIdata from "../../../recoil/atoms/npsAPIdata";
import PromoterIcon from "../../../assets/img/NPS Dashboard/greenMan.svg";
import PassiveIcon from "../../../assets/img/NPS Dashboard/darkGrayMan.svg";
import DetractorIcon from "../../../assets/img/NPS Dashboard/redMan.svg";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
// import nssAPIdata from "../../../recoil/atoms/nssAPIdata";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { exportComponentAsPNG } from "react-component-export-image";
import providerComponentAPIData from "../../../recoil/atoms/providerComponentAPIData";

const ProviderNPS = () => {
  const [apiData, setApiData] = useState();
  const [npsApiData, setNpsApiData] = useRecoilState(npsAPIdata);
  const [promoters, setPromoters] = useState(0);
  const [passives, setPassives] = useState(0);
  const [detractors, setDetractors] = useState(0);

  const [providerComponentApi, setProviderComponentApi] = useRecoilState(
    providerComponentAPIData
  );

  useEffect(() => {
    setApiData(npsApiData);
    // console.log("nps Data:");
    // console.log(npsApiData);
  }, [npsApiData]);

  useEffect(() => {
    setTimeout(() => {
      setPromoters(providerComponentApi?.provider_nps_pie?.promoter);
      setPassives(providerComponentApi?.provider_nps_pie?.passive);
      setDetractors(providerComponentApi?.provider_nps_pie?.detractor);
    }, 100);
  }, [providerComponentApi?.provider_nps_pie?.promoter]);

  useEffect(() => {
    console.log("promoters :");
    console.log(promoters);
  }, [promoters]);

  const [showInfoNps, setShowInfoNps] = useState(false);

  const loaderAnimation = {
    width: promoters + "%",
    minWidth: "5%",
  };

  const NPSComponentDetailedCardComponent = useRef();

  return (
    <div
      ref={NPSComponentDetailedCardComponent}
      className="p-2 px-4  w-full   rounded-lg bg-white flex justify-center md:justify-center items-start relative "
    >
      {!providerComponentApi && (
        <div className="min-h-[240px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {providerComponentApi && (
        <div className=" w-full  ">
          <div className=" font-bold  flex justify-between gap-2 items-center mb-7">
            <div className="font-bold opacity-80 text-[18px] ">
              Provider NPS
            </div>

            <div className="flex items-center gap-2">
              {/* <button
                onClick={() =>
                  exportComponentAsPNG(NPSComponentDetailedCardComponent)
                }
              >
                <FileDownloadOutlinedIcon
                  fontSize="small"
                  className="text-gray-400"
                />
              </button> */}

              <div
                className="relative z-[10] "
                onMouseEnter={() => setShowInfoNps(!showInfoNps)}
                onMouseLeave={() => setShowInfoNps(!showInfoNps)}
              >
                <InfoRoundedIcon className="text-gray-300 opacity-80 hover:opacity-100" />

                {/* NPS explanation */}
                <div
                  className={` ${
                    showInfoNps ? "block" : "hidden"
                  } absolute top-[100%] right-0  bg-gray-50 opacity-100 text-[10px] text-gray-500 p-4 rounded-lg shadow-lg`}
                >
                  <h1 className="mb-2">How is NPS calculated ?</h1>
                  <div className="flex justify-center items-center  mx-auto  gap-2 h-full">
                    <div className="flex justify-between items-center w-full gap-2">
                      <div className="flex justify-center items-center flex-col ">
                        <img
                          src={PromoterIcon}
                          alt="Promoter"
                          className="w-[20px]"
                        />
                        <div className="opacity-70 text-[10px]">Promoters%</div>
                      </div>
                      <div className="text-xl">-</div>
                      {/* <div className="text-2xl">(</div> */}
                      {/* <div className="flex justify-center items-center flex-col">
                      <img
                        src={PassiveIcon}
                        alt="Promoter"
                        className="w-[20px]"
                      />
                      <div className="opacity-70 text-[10px]">Passives%</div>
                    </div> */}
                      {/* <div className="text-xl">+</div> */}
                      <div className="flex justify-center items-center flex-col">
                        <img
                          src={DetractorIcon}
                          alt="Promoter"
                          className="w-[20px]"
                        />
                        <div className="opacity-70 text-[10px] ">
                          Detractors%
                        </div>
                      </div>
                      {/* <div className="text-2xl">)</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5 items-center flex-col-reverse sm:flex-row  ">
            <div className=" w-full flex-1 sm:flex-[0.7]  ">
              <div className=" w-[100%]  ml-auto">
                {/* Promoters */}
                <div>
                  <div className="flex items-center px-3">
                    <div className="w-[100%] text-[14px] opacity-80 font-medium">
                      Promoters
                    </div>

                    <div className="mx-2 opacity-80 font-bold">
                      <CountUp
                        start={0}
                        duration={1}
                        end={providerComponentApi?.provider_nps?.promoter_count}
                        separator=","
                      />
                    </div>
                    <img src={RespondantsIcon} alt="number of promoters" />
                  </div>
                  <div className="">
                    {/* Fake graph */}
                    <div className=" rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center ">
                      {providerComponentApi?.provider_nps?.promoter && (
                        <div
                          className={`min-w-[5%] ml-auto rounded-full bg-[#00AC69] transition-all ease-in duration-1000`}
                          style={{
                            width:
                              providerComponentApi?.provider_nps?.promoter +
                              "%",
                            minWidth: "5%",
                          }}
                        >
                          <div className="font-semibold  text-white ml-2">
                            {providerComponentApi?.provider_nps?.promoter <
                            1 ? (
                              providerComponentApi?.provider_nps?.promoter + "%"
                            ) : (
                              <CountUp
                                start={0}
                                duration={1}
                                end={
                                  providerComponentApi?.provider_nps?.promoter
                                }
                                separator=","
                                suffix="%"
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Passives */}
                <div className="my-4">
                  <div className="flex items-center px-3">
                    <div className="w-full text-[14px] opacity-80 font-medium">
                      Passives
                    </div>

                    <div className="mx-2 opacity-80 font-bold">
                      <CountUp
                        start={0}
                        duration={1}
                        end={providerComponentApi?.provider_nps?.passive_count}
                        separator=","
                      />
                    </div>
                    <img src={RespondantsIcon} alt="number of promoters" />
                  </div>
                  <div>
                    <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                      <div
                        className={` ml-auto rounded-full bg-[#939799] transition-all ease-in duration-500`}
                        style={{
                          width:
                            providerComponentApi?.provider_nps?.passive + "%",
                          minWidth: "5%",
                        }}
                      >
                        <div className="font-semibold  text-white ml-2">
                          {providerComponentApi?.provider_nps?.passive < 1 ? (
                            providerComponentApi?.provider_nps?.passive + "%"
                          ) : (
                            <CountUp
                              start={0}
                              duration={1}
                              end={providerComponentApi?.provider_nps?.passive}
                              separator=","
                              suffix="%"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detractors */}
                <div>
                  <div className="flex items-center px-3">
                    <div className="w-full text-[14px] opacity-80 font-medium">
                      Detractors
                    </div>

                    <div className="mx-2 opacity-80 font-bold">
                      <CountUp
                        start={0}
                        duration={1}
                        end={
                          providerComponentApi?.provider_nps?.detractor_count
                        }
                        separator=","
                      />
                    </div>
                    <img src={RespondantsIcon} alt="number of promoters" />
                  </div>
                  <div>
                    <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                      <div
                        className={`  ml-auto rounded-full bg-[#DB2B39] transition-all ease-in duration-1000`}
                        style={{
                          width:
                            providerComponentApi?.provider_nps?.detractor + "%",
                          minWidth: "5%",
                        }}
                      >
                        <div className="font-semibold  text-white ml-2">
                          {providerComponentApi?.provider_nps?.detractor < 1 ? (
                            providerComponentApi?.provider_nps?.detractor + "%"
                          ) : (
                            <CountUp
                              start={0}
                              duration={1}
                              end={
                                providerComponentApi?.provider_nps?.detractor
                              }
                              separator=","
                              suffix="%"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex-[0.3]     ">
              {/* Pie graph */}
              <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[18px] opacity-40">NPS</h1>
                  <p className="opacity-80 text-[24px] font-semibold  ">
                    <CountUp
                      start={0}
                      duration={1}
                      end={providerComponentApi?.provider_nps?.nps}
                      separator=","
                      suffix="%"
                    />
                  </p>
                </div>
              </div>

              <div className=" w-[100%] md:min-w-[110px] ">
                <ResponsiveContainer height={180} width="100%">
                  <PieChart key={providerComponentApi?.provider_nps_pie}>
                    <Tooltip cursor={false} content={<CustomTooltip />} />
                    <Pie
                      data={providerComponentApi?.provider_nps_pie}
                      dataKey="percentage"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      strokeWidth={5}
                      innerRadius="60%"
                      outerRadius="100%"
                      cornerRadius={6}
                      paddingAngle={-1}
                      startAngle={-270}
                      endAngle={-630}
                      minAngle={15}
                    >
                      {providerComponentApi?.provider_nps_pie?.map(
                        (entry, index) => (
                          <Cell key={Math.random()} fill={entry?.color} />
                        )
                      )}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderNPS;

function CustomTooltip({ active, payload, label }) {
  const [npsAPIdataValue, setNpsApiDataValue] = useRecoilState(npsAPIdata);

  const [providerComponentApi, setProviderComponentApi] = useRecoilState(
    providerComponentAPIData
  );
  const [apiData, setApiData] = useState();

  useEffect(() => {
    setApiData(providerComponentApi);
  }, [providerComponentApi]);

  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-3 shadow-2xl shadow-[#000000] min-w-[150px]">
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="">
              <div className="flex justify-between items-center mb-2">
                <h1 className="capitalize mr-5 text-[14px] font-semibold">
                  {data?.name}
                </h1>

                <div
                  style={{ background: data?.payload?.color }}
                  className={`h-[8px] w-[8px] rounded-full  `}
                ></div>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">Percentage:</span>
                <span className="text-[11px] font-semibold">
                  {data?.value} %
                </span>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">Total count:</span>
                <span className="text-[11px] font-semibold">
                  {data?.name === "Promoters"
                    ? providerComponentApi?.provider_nps?.promoter_count
                    : ""}
                  {data?.name === "Passives"
                    ? providerComponentApi?.provider_nps?.passive_count
                    : ""}
                  {data?.name === "Detractors"
                    ? providerComponentApi?.provider_nps?.detractor_count
                    : ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
