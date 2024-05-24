import ButtonLink from "@/components/common/button-link";
import LeftPanel from "@/components/common/left-panel";
import SignupForm from "@/components/page/signup/signup-form";
import { clientRoutes } from "@/lib/utils/constant";

const Page = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <LeftPanel />
      <div className="grid place-items-center relative ">
        <ButtonLink href={clientRoutes.signIn} content={"Login"} />
        <SignupForm />
      </div>
    </div>
  );
};

export default Page;
