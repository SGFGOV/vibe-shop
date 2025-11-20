"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Loading from "../common/others/Loading";

interface LoginProps {
  setting?: {
    home?: {
      logo?: string;
    };
  };
}

const Login = ({ setting }: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();

  const handleLogin = async (data: FieldValues) => {
    setError("");
    setLoading(true);
    const { email, password } = data as { email: string; password: string };
    const callbackUrl =
      new URLSearchParams(window.location.search).get("callbackUrl") || "/";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
      setError("email or password not match");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    router.refresh();
    if (status === "authenticated") {
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/";

      if (session?.user?.role !== "Customer") {
        router.push("/admin");
      } else {
        router.push(callbackUrl);
      }
    }
  }, [status, router, session]);

  const copyAdmin = () => {
    setValue("email", "admin@themetags.com");
    setValue("password", "12345678");
    setError("");
  };

  const copyCustomer = () => {
    setValue("email", "customer@themetags.com");
    setValue("password", "12345678");
    setError("");
  };
  
  return (
    <>
      <section className="login-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-5 col-12 tt-login-img"
              style={{
                background: "url(/img/banner/login-banner.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="col-lg-5 col-12 bg-white d-flex p-0 tt-login-col shadow">
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="tt-login-form-wrap p-3 p-md-6 p-lg-6 py-7 w-100"
              >
                <div className="mb-7">
                  <Link href="/">
                    <img src={setting?.home?.logo} alt="logo" />
                  </Link>
                </div>
                <h2 className="mb-4 h3">
                  Hey there! <br />
                  Welcome back <span className="text-secondary">Grostore.</span>
                </h2>
                <div className="row g-3">
                  <div className="col-sm-12">
                    <div className="input-field">
                      <label className="fw-bold text-dark fs-sm mb-1">
                        Email
                      </label>
                      <input
                        onFocus={() => setError("")}
                        type="email"
                        placeholder="Enter your email"
                        className="theme-input"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                      {errors.email && (
                        <p className="text-danger">
                          {(errors.email as { message?: string })?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="input-field check-password">
                      <label className="fw-bold text-dark fs-sm mb-1">
                        Password
                      </label>
                      <div className="check-password">
                        <input
                          onFocus={() => setError("")}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="theme-input"
                          {...register("password", {
                            required: "Password is required",
                          })}
                        />
                        {showPassword ? (
                          <span onClick={toggleShowPassword} className="eye">
                            <i className="fa-solid fa-eye-slash"></i>
                          </span>
                        ) : (
                          <span
                            onClick={toggleShowPassword}
                            className="eye eye-icon"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </span>
                        )}
                      </div>
                      {errors.password && (
                        <p className="text-danger">
                          {(errors.password as { message?: string })?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12">
                    <label className="fw-bold">Admin Access</label>
                    <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-3">
                      <small>admin@themetags.com</small>
                      <small>12345678</small>
                      <button
                        className="btn btn-sm btn-secondary py-0 px-2"
                        type="button"
                        onClick={copyAdmin}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <label className="fw-bold">Customer Access</label>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      <small>customer@themetags.com</small>
                      <small>12345678</small>

                      <button
                        className="btn btn-sm btn-secondary py-0 px-2"
                        type="button"
                        onClick={copyCustomer}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
                {error && <div className="mt-5 text-danger">{error}</div>}
                {loading && <Loading loading={loading} />}
                <div className="row g-4 mt-4">
                  <div className="col-sm-12">
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
                <p className="mb-0 fs-xs mt-4 text-center">
                  Don't have an Account? <Link href="/singup">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

