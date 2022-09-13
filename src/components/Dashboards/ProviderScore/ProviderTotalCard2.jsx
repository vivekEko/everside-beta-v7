import React from "react";
import { useRecoilState } from "recoil";
import providerComponentAPIData from "../../../recoil/atoms/providerComponentAPIData";

const ProviderTotalCard2 = () => {
  // GLobal variable
  const [providerComponentApi, setProviderComponentApi] = useRecoilState(
    providerComponentAPIData
  );
  return (
    <div className="h-[300px] w-full flex-1  justify-between  rounded-md flex ">
      <div className="flex justify-center flex-col items-center  text-xl rounded-md border p-4 w-full ">
        <h1 className="text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
          Members
        </h1>
        <h3 className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
          {providerComponentApi?.provider_total_card?.member_count}
        </h3>
      </div>
      <div className="flex justify-center flex-col items-center  text-xl rounded-md border p-4 w-full">
        <h1 className="text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
          Alerts
        </h1>
        <h3 className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
          {providerComponentApi?.provider_total_card?.alerts_count}
        </h3>
      </div>
      <div className="flex justify-center flex-col items-center  text-xl rounded-md border p-4 w-full">
        <h1 className="text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
          Reasons
        </h1>
        <h3 className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
          {providerComponentApi?.provider_total_card?.reason_count}
        </h3>
      </div>
      <div className="flex justify-center flex-col items-center  text-xl rounded-md border p-4 w-full">
        <h1 className="text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
          Comments
        </h1>
        <h3 className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
          {providerComponentApi?.provider_total_card?.comment_count}
        </h3>
      </div>
    </div>
  );
};

export default ProviderTotalCard2;
