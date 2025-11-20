"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createUser } from "app/backend/controllers/user.controller";
import Loading from "components/store/common/others/Loading";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();
  const [error, setError] = useState<string>("");
  const [loading, setLoging] = useState<boolean>(false);
  const [callbackUrl, setCallbackUrl] = useState<string>("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/";
      setCallbackUrl(url);
    }
  }, []);

  const handleUserRegister = async (data: SignupFormData): Promise<void> => {
    setError("");
    setLoging(true);
    const userData = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    const res = await createUser(userData);
    if (res?.error) {
      setError(res.error);
      setLoging(false);
      return;
    }

    if (res?.user && typeof res.user === "object" && "email" in res.user) {
      setError("");
      const email = (res.user as { email: string }).email;
      const password = userData.password; // Use original password from form
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        setLoging(false);
      } else {
        setLoging(false);
        router.push(callbackUrl);
      }
    } else {
      setLoging(false);
    }
  };

  // Setting removed - using empty object
  const setting: Record<string, unknown> = {};
  const settingLoading = false;
  return (
    <>
      <section className="login-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-5 col-12 tt-login-img"
              style={{
                background: "url(/img/banner/login-banner.jpg) center ",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="col-lg-5 col-12 bg-white d-flex p-0 tt-login-col shadow">
              <form
                className="tt-login-form-wrap p-3 p-md-6 p-lg-6 py-7 w-100"
                onSubmit={handleSubmit(handleUserRegister)}
              >
                <div className="text-center mb-7">
                  <Link href="/">
                    <img src={(setting?.home as { logo?: string })?.logo} alt="logo" />
                  </Link>
                </div>
                <h4 className="mb-3">Get started absolutely free</h4>
                <p className="fs-xs">
                  Already have an account?{" "}
                  <Link href="/login" className="text-secondary">
                    Sign in
                  </Link>
                </p>
                <div className="row g-3">
                  <div className="col-sm-12">
                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="First name"
                        className="theme-input"
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <p className="text-red-600 mt-2">Name is requred</p>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="input-field">
                      <input
                        type="email"
                        placeholder="Email address"
                        className="theme-input"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <p className="text-red-600 mt-2">email is requred</p>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="input-field check-password">
                      <input
                        type="password"
                        placeholder="Password"
                        className="theme-input"
                        {...register("password", { required: true })}
                      />
                      {errors.password && (
                        <p className="text-red-600 mt-2">Password is requred</p>
                      )}
                      <span className="eye eye-icon">
                        <i className="fa-solid fa-eye"></i>
                      </span>
                      <span className="eye eye-slash">
                        <i className="fa-solid fa-eye-slash"></i>
                      </span>
                    </div>
                  </div>
                </div>
                 {loading && <Loading loading={true} />}
                {error && <p className="text-danger mt-2">{error}</p>}
                <div className="row g-4 mt-4">
                  <div className="col-sm-6 ">
                    <button
                      disabled={loading === true}
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Create account
                    </button>
                  </div>
                </div>
                <p className="mb-0 fs-xxs mt-4 text-center">
                  By signing up, I agree to{" "}
                  <Link href="/terms-condition" className="text-dark">
                    Terms of Use and Privacy Policy
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

