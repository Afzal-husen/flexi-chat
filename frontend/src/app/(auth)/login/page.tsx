import ButtonLink from "@/components/common/button-link";
import LeftPanel from "@/components/common/left-panel";
import GoogleSignup from "@/components/page/login/google-signup";
import LoginForm from "@/components/page/login/login-form";
import { clientRoutes } from "@/lib/utils/constant";

const SignIn = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <LeftPanel />

      <div className="grid place-items-center relative">
        <ButtonLink href={clientRoutes.signUp} content={"Sign up"} />

        <div className="w-[70%] mx-auto space-y-3">
          <LoginForm />

          <p className="text-center uppercase font-semibold text-accent-foreground text-xs">
            or
          </p>

          <GoogleSignup />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
