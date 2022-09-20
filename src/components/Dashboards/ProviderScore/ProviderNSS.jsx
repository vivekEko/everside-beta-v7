import React from "react";
import { PuffLoader } from "react-spinners";
import ProviderNSSAtom from "../../../recoil/atoms/ProviderNSSAtom";

import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { exportComponentAsPNG } from "react-component-export-image";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Tooltip } from "react-leaflet";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import CountUp from "react-countup";

import PositiveIcon from "../../../assets/img/NPS Dashboard/Positive.svg";
import NegativeIcon from "../../../assets/img/NPS Dashboard/Negative.svg";
import ExtremeIcon from "../../../assets/img/NPS Dashboard/Extreme.svg";
import NeutralIcon from "../../../assets/img/NPS Dashboard/Neutral.svg";
import providerComponentAPIData from "../../../recoil/atoms/providerComponentAPIData";

const ProviderNSS = () => {
  const [nssApiData, setNssApiData] = useRecoilState(providerComponentAPIData);
  const [apiData, setApiData] = useState();

  const [showInfoNss, setShowInfoNss] = useState(false);

  useEffect(() => {
    setApiData(nssApiData);
    console.log(
      "nssApiData:::::::::::::::::::::::::::::::::::::::::::::::::::"
    );
    console.log(nssApiData);
  }, [nssApiData]);

  const NPSComponent = useRef();

  return (
    <div
      className="p-2 md:py-5 2xl:px-5 w-full border  rounded-lg bg-white "
      ref={NPSComponent}
    >
      {!apiData?.nss && (
        <div className="min-h-[130px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData?.nss && (
        <div>
          <div className=" font-bold  flex justify-between gap-2 items-center">
            <div className="opacity-80">Sentiments</div>

            <div className="flex items-center gap-2">
              <button onClick={() => exportComponentAsPNG(NPSComponent)}>
                <FileDownloadOutlinedIcon
                  fontSize="small"
                  className="text-gray-400"
                />
              </button>

              <div
                className="relative "
                onMouseEnter={() => setShowInfoNss(!showInfoNss)}
                onMouseLeave={() => setShowInfoNss(!showInfoNss)}
              >
                <InfoRoundedIcon className="text-gray-300 opacity-80 hover:opacity-100" />

                {/* NPS explanation */}
                <div
                  className={` ${
                    showInfoNss ? "block" : "hidden"
                  } absolute top-[100%] right-0  z-[100] bg-gray-50 opacity-100 text-[10px] text-gray-500 p-4 rounded-lg shadow-lg`}
                >
                  <h1 className="mb-2">How is Sentiments calculated ?</h1>
                  <div className="flex justify-center items-center  mx-auto  gap-2 h-full">
                    <div className="flex justify-between items-center w-full gap-2">
                      <div className="flex justify-center items-center flex-col gap-1 ">
                        <img
                          src={PositiveIcon}
                          alt="Positive"
                          className="w-[20px]"
                        />
                        <div className="opacity-70 text-[10px]">Positive%</div>
                      </div>
                      <div className="text-xl">-</div>
                      <div className="text-2xl">(</div>
                      <div className="flex justify-center items-center flex-col gap-1">
                        <img
                          src={NegativeIcon}
                          alt="Negative"
                          className="w-[20px]"
                        />
                        <div className="opacity-70 text-[10px]">Negative%</div>
                      </div>
                      <div className="text-xl">+</div>
                      <div className="flex justify-center items-center flex-col gap-1">
                        <img
                          src={ExtremeIcon}
                          alt="Extreme"
                          className="w-[20px]"
                        />
                        <div className="opacity-70 text-[10px] ">Extreme%</div>
                      </div>
                      <div className="text-2xl">)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  gap-3 md:gap-5 justify-center items-center  h-[270px]  xl:gap-2 ">
            {/* <div className="flex justify-start items-center gap-3 md:gap-5"> */}

            <div className="grid grid-cols-4 place-items-center gap-8 ">
              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={PositiveIcon} alt="positive" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  {apiData?.nss?.positive < 1 ? (
                    apiData?.nss?.positive + "%"
                  ) : (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss?.positive}
                      separator=","
                      suffix="%"
                    />
                  )}
                </h1>
                <p className=" opacity-60 text-xs font-medium">Positives</p>
              </div>

              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={NeutralIcon} alt="neutral" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  {apiData?.nss?.neutral < 1 ? (
                    apiData?.nss?.neutral + "%"
                  ) : (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss?.neutral}
                      separator=","
                      suffix="%"
                    />
                  )}
                </h1>
                <p className=" opacity-60 text-xs font-medium">Neutrals</p>
              </div>

              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={NegativeIcon} alt="passives" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  {apiData?.nss?.negative < 1 ? (
                    apiData?.nss?.negative + "%"
                  ) : (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss?.negative}
                      separator=","
                      suffix="%"
                    />
                  )}
                </h1>
                <p className=" opacity-60 text-xs font-medium">Negatives</p>
              </div>

              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={ExtremeIcon} alt="extremes" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  {apiData?.nss?.extreme < 1 ? (
                    apiData?.nss?.extreme + "%"
                  ) : (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss?.extreme}
                      separator=","
                      suffix="%"
                    />
                  )}
                </h1>
                <p className=" opacity-60 text-xs font-medium">Extremes</p>
              </div>
            </div>

            {/* Graph */}
            <div className="xl:ml-1 relative hidden">
              <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[10px] opacity-40">Sentiment</h1>
                  <p className="opacity-80 text-xs md:text-base">
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss?.nss_score}
                      separator=","
                    />
                  </p>
                </div>
              </div>
              <div className=" w-[80px] md:w-[110px]  ">
                <ResponsiveContainer height={110} width="100%">
                  <PieChart>
                    <Tooltip
                      cursor={false}
                      content={<CustomTooltip />}
                      position={{ y: -0, x: -150 }}
                    />
                    <Pie
                      data={apiData?.nss_pie}
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
                      {apiData?.nss_pie?.map((entry, index) => (
                        <Cell key={Math.random()} fill={entry?.color} />
                      ))}
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

export default ProviderNSS;

function CustomTooltip({ active, payload, label }) {
  const [nssApiData, setNssApiData] = useRecoilState(ProviderNSSAtom);
  const [apiData, setApiData] = useState();

  useEffect(() => {
    setApiData(nssApiData);
  }, [nssApiData]);

  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-3 shadow-2xl shadow-[#000000] min-w-[150px] ">
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="">
              <div className="flex justify-between items-center mb-2">
                <h1 className="capitalize mr-5 text-[14px] font-semibold">
                  {data?.name}s
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
                  {data?.name === "Positive"
                    ? apiData?.nss?.total_positive
                    : ""}

                  {data?.name === "Neutral" ? apiData?.nss?.total_neutral : ""}

                  {data?.name === "Negative"
                    ? apiData?.nss?.total_negative
                    : ""}

                  {data?.name === "Extreme" ? apiData?.nss?.total_extreme : ""}
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
