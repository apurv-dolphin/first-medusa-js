import { RouteConfig } from "@medusajs/admin";
// import { CustomIcon } from "../../icons/custom";

const ApurvPage = () => {
  return <div>This is my Apurv name route. {process.env.MEDUSA_BACKEND_URL}</div>;
};

export const config: RouteConfig = {
  link: {
    label: "Apurv Route",
    // icon: ApurvIcon,
  },
};

export default ApurvPage;
