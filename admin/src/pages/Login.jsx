import { useUser } from "@/contexts/UserContext";
import authService from "@/services/auth.service";
import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";

export default function Login() {
  const { isLoggedIn, setUserState } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setError("");
      const data = await authService.loginAdmin(email, password);
      toast.success("Login successful 🔓");

      setTimeout(() => {
        setUserState(data);
        navigate(state?.from || "/");
      }, 1500);
    } catch (error) {
      setError(error.response?.data.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to={state?.from || "/"} />;
  }

  return (
    <div className="flex items-center justify-center m-auto mt-20">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-4xl my-4">PERN Admin</h1>
        <div className="">
          <Label className="block text-grey-darker text-sm font-bold mb-2">
            <span>Email</span>
          </Label>
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            type="email"
            name="email"
            {...register("email", {
              required: true,
              // eslint-disable-next-line no-useless-escape
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}
            placeholder="Enter a valid email"
          />
        </div>
        {errors?.email && errors?.email.type === "required" && (
          <HelperText className="mt-1 italic" valid={false}>
            Email required
          </HelperText>
        )}
        {errors?.email && errors?.email.type === "pattern" && (
          <HelperText className="mt-1 italic" valid={false}>
            Invalid email
          </HelperText>
        )}
        <div className="mt-4">
          <Label className="block text-grey-darker text-sm font-bold mb-2">
            <span>Password</span>
          </Label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        {errors?.password && (
          <HelperText className="mt-1 italic" valid={false}>
            {errors?.password?.type === "required" && "Password required"}
          </HelperText>
        )}
        {error && (
          <HelperText className="mt-1 italic" valid={false}>
            {error}
          </HelperText>
        )}
        <Button type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? (
            <PulseLoader color={"#0a138b"} size={10} loading />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
}
