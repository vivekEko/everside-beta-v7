import React, { useEffect, useState } from "react";
import clinicIcon from "../../../../assets/img/NPS Dashboard/ClinicIcon.svg";
import clinicData from "../../../../mock_API/NPS/NPS Main Dashboard/Clinics.json";
// import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import FirstMedal from "../../../../assets/img/global-img/firstMedal.svg";
import SecondMedal from "../../../../assets/img/global-img/SecondMedal.svg";
import ThirdMedal from "../../../../assets/img/global-img/thirdMedal.svg";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";

const Clinics2 = () => {
  const [apiData, setApiData] = useState();
  const [clinicsAPIData, setClinicsAPIData] = useRecoilState(clinicsApiData);
  useEffect(() => {
    setApiData(clinicsAPIData);
    console.log("clinic data:");
    console.log(clinicsAPIData);
  }, [clinicsAPIData]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ". . ." : string;
  }

  return (
    <div className="p-5 border rounded-lg bg-white transition-all  w-[100%] h-[300px] ">
      {!apiData?.data && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center ">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData?.data?.length === 0 && (
        <div className="h-full w-full flex justify-center items-center text-gray-400">
          No Health Centers
        </div>
      )}

      {apiData?.data?.length > 0 && (
        <div>
          <h1 className="  font-bold  opacity-80">Health Centers</h1>

          <div className="h-[250px] overflow-y-scroll">
            <div className="sticky bg-white top-0 z-[5] ">
              <div className="grid grid-cols-[50px_minmax(150px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(60px,0.3fr)_minmax(30px,0.3fr)] gap-2 text-xs text-gray-400 border-b py-2">
                <div className="flex  items-center">Type</div>
                <div className="flex  items-center">Name</div>
                <div className="flex  items-center">Positive Topic</div>
                <div className="flex  items-center">Negative Topic</div>
                <div className="text-center flex justify-center items-center ">
                  Survey Count
                </div>
                <div className="text-center flex justify-center items-center ">
                  NPS
                </div>
              </div>
            </div>

            <div className="">
              {apiData?.data?.map((data, index) => {
                return (
                  <div key={index} className="">
                    <div className="grid grid-cols-[50px_minmax(150px,1fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(60px,0.3fr)_minmax(30px,0.3fr)] gap-2    py-2 ">
                      <div className="rounded-md text-sm   flex justify-center items-center text-[#0094e0] uppercase">
                        <img
                          src={clinicIcon}
                          alt={data.clinic}
                          className="w-[40px] rounded-full"
                        />
                      </div>
                      <div className="">
                        <div className="text-sm">{data?.clinic}</div>
                        <div className="text-gray-500 text-xs">
                          {data?.city}, {data?.state}
                        </div>
                      </div>
                      <div className=" text-gray-500 text-xs flex  items-center">
                        {apiData?.topic[index].POSITIVE_TOPIC}
                      </div>
                      <div className="text-gray-500 text-xs flex  items-center">
                        {apiData?.topic[index].NEGATIVE_TOPIC}
                      </div>
                      <div className="text-sm text-gray-500 text-center">
                        {data?.count}
                      </div>
                      <div className="text-sm text-gray-500 text-center">
                        {" "}
                        {data?.average_nps}
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
  );
};

export default Clinics2;
