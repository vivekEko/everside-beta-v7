import React, { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  Area,
} from "recharts";
import mockApiData from "../../../../mock_API/NPS/NPS Main Dashboard/NSSOverTime.json";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import sentimentOverTimeApiData from "../../../../recoil/atoms/sentimentOverTimeApiData";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { exportComponentAsPNG } from "react-component-export-image";
import AvgNPSAtom from "../../../../recoil/atoms/AvgNPSAtom";

const AvgNPS = () => {
  const [apiData, setApiData] = useState();
  const [avgNPS, setAvgNPS] = useRecoilState(AvgNPSAtom);

  const [nssOverTimeAPIData, setNssOverTimeAPIData] = useRecoilState(
    sentimentOverTimeApiData
  );

  useEffect(() => {
    setApiData(avgNPS);
  }, [avgNPS]);

  const AvgNPSGraphComponent = useRef();

  return (
    <div
      className="p-2 md:p-5 w-full border  rounded-lg bg-white flex justify-center md:justify-center items-center "
      ref={AvgNPSGraphComponent}
    >
      {!apiData && (
        <div className="min-h-[170px] w-full bg-[#ffffff] z-[0] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <h1 className=" font-bold opacity-80 text-[18px] ">Average NPS</h1>
            <button onClick={() => exportComponentAsPNG(AvgNPSGraphComponent)}>
              <FileDownloadOutlinedIcon
                fontSize="small"
                className="text-gray-400"
              />
            </button>
          </div>

          <div className="flex justify-end items-center gap-[4px] ">
            <div className="flex items-center gap-1">
              <div className="bg-[#0094E0] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Average NPS</div>
            </div>
          </div>

          {/* Graph */}
          <div className="relative ">
            <ResponsiveContainer width="100%" height={180}>
              <ComposedChart
                data={apiData?.nps_avg}
                margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  horizontal={false}
                  opacity={0.5}
                />

                <XAxis
                  dataKey="month"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickCount={10}
                  angle={0}
                  textAnchor="middle"
                />
                <YAxis
                  type="number"
                  domain={["dataMin - 0.005", "dataMax + 0.0005"]}
                  axisLine={false}
                  tickLine={false}
                  fontSize={10}
                  tickFormatter={(number) => `${number.toFixed(2)}`}
                  margin={{ right: 20 }}
                />

                <Tooltip cursor={false} content={<CustomTooltip />} />

                <Bar
                  barSize={20}
                  name="Average NPS"
                  dataKey="NPS"
                  fill="#0094E0"
                  radius={[5, 5, 0, 0]}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvgNPS;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        <h1 className="capitalize mr-2 text-[13px] mb-2 font-bold ">
          {payload[0]?.payload?.month}, {payload[0]?.payload?.year}
        </h1>
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="flex justify-start items-center ">
              <div
                style={{ background: "#0094E0" }}
                className={`h-[5px] w-[5px] rounded-full mr-2 `}
              ></div>
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  {data?.name}:
                </span>
                <span className="text-[11px] font-semibold">{data?.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
