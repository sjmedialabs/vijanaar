import { FormEvent, useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import axios, { AxiosError } from "axios";

interface ForgotPasswordError {
  message: string;
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post<{ message: string }>(
        `${import.meta.env.VITE_API_BASE_URL}/forgot-password`,
        { username: email } // backend expects "username"
      );

      setSuccess(response.data.message); // e.g., "Reset link sent to your email"
    } catch (err) {
      const axiosError = err as AxiosError<ForgotPasswordError>;
      setError(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center items-center flex-1 w-full max-w-md mx-auto bg-[#fff] rounded-lg shadow mt-[200px] py-[30px]">
        <div>
          <h1 className="mb-2 font-semibold text-gray-800 text-lg dark:text-white/90 text-center">
            Forgot Password
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <div>
                <Button
                  className="w-full"
                  size="sm"
                  disabled={loading}
                  {...({ type: "submit" } as any)}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
