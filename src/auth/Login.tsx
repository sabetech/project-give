import { Button } from "antd-mobile";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { useSignIn } from "../hooks/authHooks";

const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleGoogleLogin = async () => {
    try {
      await signIn();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-[480px] flex flex-col items-start">
        <div className="w-full h-48 bg-surface-container rounded-xl mb-6 flex items-center justify-center">
          <img 
            src="/makarios_log_trans_bg-a8a80d8d.png" 
            alt="The Makarios Church" 
            className="w-48 h-auto"
          />
        </div>

        <div className="w-full text-center">
          <h1 className="font-display text-2xl font-bold text-on-surface tracking-tight mb-2">
            Welcome to Give!
          </h1>
          <p className="text-on-surface-variant mb-6">
            Manage your contributions to your church right here!
          </p>

          <Button
            block
            color="primary"
            size="large"
            className="!bg-primary-dark !text-on-primary !rounded-xl !h-14"
            onClick={handleGoogleLogin}
          >
            <div className="flex items-center justify-center gap-2">
              <FcGoogle size={24} />
              <span>Login with Google</span>
            </div>
          </Button>
        </div>

        <p className="text-primary-dark text-xs text-center mt-auto pt-8 opacity-80">
          By signing in, you agree to our Terms and Conditions and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
