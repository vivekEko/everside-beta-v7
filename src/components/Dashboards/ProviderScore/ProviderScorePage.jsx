import React from "react";
import doctorIcon from "../../../assets/img/NPS Dashboard/DoctorIcon.svg";

const ProviderScorePage = () => {
  return (
    <div className="mt-1 min-h-[90vh]">
      {/* <div className="h-[40px] w-[350px] border rounded-md mb-2 "></div> */}

      <div className="flex items-center gap-2">
        {/* Provider Details */}
        <div className="h-[300px] flex-[0.25]  rounded-md p-2 px-4 border">
          <h1 className="font-bold opacity-80 text-lg">Provider Info</h1>
          <div className="flex flex-col items-center h-[250px] w-full ">
            <div className="h-full w-full flex justify-center items-center ">
              <img src={doctorIcon} alt="doctorIcon" className="w-[25%]" />
            </div>
            <div className="h-full w-full   flex flex-col justify-center items-center">
              <h1 className="text-2xl font-medium">Alexander Bingcang</h1>
              <div className="flex justify-center gap-[20px] mt-4">
                <div className="bg-[#e6f5fc91] p-2 rounded-md text-[#45b1e8] font-medium relative group hover:cursor-help">
                  <span>DO</span>
                  <div className="absolute hidden group-hover:block p-2 bg-gray-100 rounded-md top-[105%]  w-max text-gray-500 text-xs  ">
                    Provider Type
                  </div>
                </div>
                <div className="bg-[#e6f5fc91] p-2 rounded-md text-[#45b1e8] font-medium relative group hover:cursor-help">
                  <span>Physician</span>

                  <div className="absolute hidden group-hover:block p-2 bg-gray-100 rounded-md top-[105%]  w-max text-gray-500 text-xs  ">
                    Provider Category
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[300px] flex-[0.5] border rounded-md"></div>
        <div className="h-[300px] flex-[0.25] border rounded-md grid grid-cols-2 gap-2 ">
          <div className="flex justify-center items-center  text-xl rounded-md">
            1
          </div>
          <div className="flex justify-center items-center  text-xl rounded-md">
            2
          </div>
          <div className="flex justify-center items-center  text-xl rounded-md">
            3
          </div>
          <div className="flex justify-center items-center  text-xl rounded-md">
            4
          </div>
        </div>
      </div>

      {/* <div className="flex gap-2">
        <div className="h-[400px] w-full mt-2 bg-gray-200 rounded-md"></div>
        <div className="h-[400px] w-full mt-2 bg-gray-200 rounded-md"></div>
      </div> */}
    </div>
  );
};

export default ProviderScorePage;
