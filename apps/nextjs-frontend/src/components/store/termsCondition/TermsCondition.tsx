"use client";

import Loading from "../common/others/Loading";
import PreLoader from "../common/others/PreLoader";

const TermsCondition = () => {
  // Setting removed - using empty object
  const setting: {
    terms?: {
      value?: string;
    };
  } = {};
  const settingLoading = false;
  
  return (
    <>
      {settingLoading ? (
        <PreLoader />
      ) : (
        <section className="blog-details py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-12">
                {settingLoading ? (
                  <Loading loading={settingLoading} />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: setting?.terms?.value || "",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TermsCondition;

