"use client";
import Login from "components/store/auth/Login";
import PreLoader from "components/store/common/others/PreLoader";

export default function LoginPage() {
  // Setting removed - using empty object
  const setting: Record<string, unknown> = {};
  const settingLoading = false;
  return (
    <>
      {settingLoading ? (
        <PreLoader />
      ) : (
        <>
          <Login setting={setting} />
        </>
      )}
    </>
  );
}

