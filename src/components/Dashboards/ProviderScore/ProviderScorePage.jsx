import React, { useEffect, useState } from "react";
import ProviderTotalCard from "./ProviderTotalCard";
import ProviderInfo from "./ProviderInfo";
import ProviderNPS from "./ProviderNPS";
import ProviderAllGraph from "./ProviderAllGraph";
import ProviderComments from "./ProviderComments";
import ProviderFilter from "./ProviderFilter";
import ProviderFilter2 from "./ProviderFilter2";
import regionStatusProvider from "../../../recoil/atoms/regionStatusProvider";
import startDateValueProvider from "../../../recoil/atoms/StartDateAtomProvider";
import startMonthValueProvider from "../../../recoil/atoms/StartMonthAtomProvider";
import endDateValueProvider from "../../../recoil/atoms/EndDateAtomProvider";
import endMonthValueProvider from "../../../recoil/atoms/EndMonthProvider";
import { useRecoilState } from "recoil";
import allDataRecievedProvider from "../../../recoil/atoms/allDataRecievedProvider";
import axios from "axios";
import { BASE_API_LINK } from "../../../utils/BaseAPILink";
import regionGlobalProvider from "../../../recoil/atoms/regionGlobalProvider";
import flushRegionProvider from "../../../recoil/atoms/flushRegionProvider";
import callClinicProvider from "../../../recoil/atoms/callClinicProvider";
import clinicProviderAPI from "../../../recoil/atoms/clinicProviderAPI";
import clientAPIdataProvider from "../../../recoil/atoms/clientAPIdataProvider";
import flushClinicProvider from "../../../recoil/atoms/flushClinicProvider";
import flushClientProvider from "../../../recoil/atoms/flushClientProvider";
import FormatColorResetOutlinedIcon from "@mui/icons-material/FormatColorResetOutlined";
import SelectProvider from "./SelectProvider";
import AllFilterDataProvider from "../../../recoil/atoms/AllFilterDataProvider";
import providerComponentAPIData from "../../../recoil/atoms/providerComponentAPIData";
import selectedProviderAtom from "../../../recoil/atoms/selectedProviderAtom";
import providersApiDataProviderPage from "../../../recoil/atoms/providersApiDataProviderPage";
import activeInnerPage from "../../../recoil/atoms/activeInnerPage";
import NPSCard from "../NPS/NPS Overall Dashboard/NPSCard";
import NSSCard from "../NPS/NPS Overall Dashboard/NSSCard";
import ProviderTotalCard2 from "./ProviderTotalCard2";
import ProviderNSS from "./ProviderNSS";
import ProviderInfo2 from "./ProviderInfo2";
import ProviderTable from "./ProviderTable";
import PuffLoader from "react-spinners/PuffLoader";

const ProviderScorePage = () => {
  // Global Variables

  const [callRegion, setCallRegion] = useRecoilState(regionStatusProvider);
  const [finalStartDate, setFinalStartDate] = useRecoilState(
    startDateValueProvider
  );
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(
    startMonthValueProvider
  );
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValueProvider);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(
    endMonthValueProvider
  );
  const [allDataRecievedStatus, setAllDataRecievedStatus] = useRecoilState(
    allDataRecievedProvider
  );
  const [allFilterData, setAllFilterData] = useRecoilState(
    AllFilterDataProvider
  );

  const [regionGlobal, setRegionGlobal] = useRecoilState(regionGlobalProvider);
  const [flushRegionValue, setFlushRegionvalue] =
    useRecoilState(flushRegionProvider);
  const [callClinicAtom, setCallClinicAtom] =
    useRecoilState(callClinicProvider);
  const [clinicAPIData, setClinicAPIData] = useRecoilState(clinicProviderAPI);
  const [clientAPIdata, setClientDataProvider] = useRecoilState(
    clientAPIdataProvider
  );
  const [flushClinicStatus, setFlushClinicStatus] =
    useRecoilState(flushClinicProvider);
  const [flushClientStatus, setFlushClientStatus] =
    useRecoilState(flushClientProvider);
  const [providerAPIDATA, setProviderAPIDATA] = useRecoilState(
    providersApiDataProviderPage
  );
  const [providerComponentApi, setProviderComponentApi] = useRecoilState(
    providerComponentAPIData
  );

  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);

  const [selectedProvider, setSelectedProvider] =
    useRecoilState(selectedProviderAtom);

  // local variables
  const [usernameLocal, setUsernameLocal] = useState();

  // getting username from session storage
  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  // Call Region
  useEffect(async () => {
    if (callRegion === true && usernameLocal) {
      // adding username in form data
      const formdata = new FormData();
      formdata.append("username", usernameLocal);

      const firstAPIdata = await axios.post(
        BASE_API_LINK +
          "filterDateProvider?start_month=" +
          finalStartMonth +
          "&start_year=" +
          finalStartDate +
          "&end_month=" +
          finalEndMonth +
          "&end_year=" +
          finalEndDate,
        formdata,
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );

      if (firstAPIdata) {
        setAllFilterData(firstAPIdata?.data);
        setProviderAPIDATA(firstAPIdata?.data);
        setSelectedProvider(firstAPIdata?.data?.provider[0]);
        setRegionGlobal(firstAPIdata?.data?.region);
        setClinicAPIData(firstAPIdata?.data?.clinic);
        setClientDataProvider(firstAPIdata?.data?.client);
        setAllDataRecievedStatus(true);
        setFlushRegionvalue(true);
        setFlushClinicStatus(true);
        setFlushClientStatus(true);
        setTimeout(() => {
          setFlushRegionvalue(false);
          setFlushClinicStatus(false);
          setFlushClientStatus(false);
        }, 500);
      }
    }
  }, [callRegion, usernameLocal]);

  return (
    <div className=" min-h-[90vh] relative">
      <div className="sticky top-[50px] z-[300] bg-white pb-1">
        <ProviderFilter2 />
        <SelectProvider />
      </div>

      <div className=" ">
        {providerComponentApi ? (
          <div>
            {providerComponentApi?.Message === "TRUE" ? (
              <div className="mt-5">
                <div>
                  <ProviderInfo2 />
                </div>

                <div className="mt-5 flex flex-col xl:flex-row gap-5  items-start">
                  <div className="flex-[0.7]">
                    <ProviderComments />
                  </div>
                  <div className=" w-[100%] flex xl:flex-[0.3] flex-col-reverse sm:flex  sm:flex-row-reverse xl:flex-col-reverse  gap-5   ">
                    {/* <div className="">
                      <ProviderTable />
                    </div> */}

                    <ProviderNPS />
                    <ProviderNSS />
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-[80vh]  w-full text-3xl text-gray-400 flex justify-center items-center">
                {providerComponentApi?.Message === "ERROR" && (
                  <div className="">{providerComponentApi?.Comment}</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="min-h-[80vh]  w-full text-3xl text-gray-400 flex justify-center items-center">
            <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
              <PuffLoader color="#00ac69" size={50} width={300} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderScorePage;
