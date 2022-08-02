import React from "react";
import ProviderTotalCard from "./ProviderTotalCard";
import ProviderInfo from "./ProviderInfo";
import ProviderNPS from "./ProviderNPS";
import ProviderAllGraph from "./ProviderAllGraph";
import ProviderComments from "./ProviderComments";
import ProviderFilter from "./ProviderFilter";
import ProviderFilter2 from "./ProviderFilter2";

const ProviderScorePage = () => {
  return (
    <div className=" min-h-[90vh]">
      <ProviderFilter2 />
      <div className="flex items-center gap-2 flex-col lg:flex-row  ">
        <div className="flex flex-col md:flex-row items-center gap-2 flex-1  lg:flex-[0.8] w-full ">
          <ProviderInfo />
          <div className="h-[300px] flex-1 md:flex-[0.7] border w-full rounded-md">
            <ProviderNPS />
          </div>
        </div>

        <ProviderTotalCard />
      </div>
      <div className="flex  flex-col 2xl:flex-row items-center gap-2 my-2">
        <ProviderAllGraph />
        <ProviderComments />
      </div>
    </div>
  );
};

export default ProviderScorePage;
