import React, { Suspense } from "react";
import AlertComments from "../NPS Overall Dashboard/AlertComments";
import WordFrequency from "../NPS Overall Dashboard/WordFrequency";
import Comments from "../NPS Overall Dashboard/Comments";
import Filter from "../Misc/Filter";
import CommentsTotalcards from "./CommentsTotalcards";
// import TotalComments from "./TotalComments";
import Allalerts from "./Allalerts";
import { PuffLoader } from "react-spinners";
import TotalComments2 from "./TotalComments2";
import Allalerts2 from "./Allalerts2";
import TotalComments4 from "./TotalComments4";
import AllAlerts3 from "./AllAlerts3";

const TotalComments = React.lazy(() => import("./TotalComments"));

const CommentsPage = () => {
  return (
    <div>
      <section className="my-[10px] flex flex-col-reverse 2xl:flex-row justify-center gap-[10px]">
        <TotalComments4 />

        <div className=" w-full">
          <CommentsTotalcards />
          <AllAlerts3 />
        </div>
      </section>
    </div>
  );
};

export default CommentsPage;
