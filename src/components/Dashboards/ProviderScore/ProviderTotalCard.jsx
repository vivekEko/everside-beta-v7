import React from "react";

const ProviderTotalCard = () => {
  return (
    <div className="h-[300px] w-full flex-1  lg:flex-[0.2]  rounded-md grid grid-cols-4 lg:grid-cols-2 gap-2 ">
      <div className="flex justify-center flex-col items-center  text-xl rounded-md border p-4">
        <h1 className="text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
          Members
        </h1>
        <h3 className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
          2521
        </h3>
      </div>
      <div className="flex justify-center flex-col items-center  text-xl rounded-md border p-4">
        <h1 className="text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
          Alerts
        </h1>
        <h3 className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
          12
        </h3>
      </div>
      <div className="flex justify-center flex-col items-center  text-xl rounded-md border p-4">
        <h1 className="text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
          Reasons
        </h1>
        <h3 className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
          32
        </h3>
      </div>
      <div className="flex justify-center flex-col items-center  text-xl rounded-md border p-4">
        <h1 className="text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
          Comments
        </h1>
        <h3 className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
          6325
        </h3>
      </div>
    </div>
  );
};

export default ProviderTotalCard;
