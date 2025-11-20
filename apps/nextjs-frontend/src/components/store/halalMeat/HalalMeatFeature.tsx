"use client";

interface HalalMeatFeatureProps {
  setting?: {
    halal_meat_feature_icon_one?: string;
    halal_meat_feature_one_title?: string;
    halal_meat_feature_one_text?: string;
    halal_meat_feature_icon_two?: string;
    halal_meat_feature_two_title?: string;
    halal_meat_feature_two_text?: string;
    halal_meat_feature_icon_three?: string;
    halal_meat_feature_three_title?: string;
    halal_meat_feature_three_text?: string;
  };
}

const HalalMeatFeature = ({ setting }: HalalMeatFeatureProps) => {
  return (
    <div>
      <section className="hl-feature-section pb-120 position-relative z-2">
        <div className="container">
          <div className="hl-feature-area">
            <div className="row align-items-center g-4 justify-content-center">
              <div className="col-xl-4 col-lg-6">
                <div className="hl-feature-box border-r">
                  <div className="icon-wrapper mb-4">
                    <span>
                      <img
                        src={setting?.halal_meat_feature_icon_one}
                        alt="icon"
                        className="img-fluid"
                      />
                    </span>
                  </div>
                  <h5 className="hl-heading mb-3">
                    {setting?.halal_meat_feature_one_title}
                  </h5>
                  <p className="mb-0">
                    {setting?.halal_meat_feature_one_text}
                  </p>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6">
                <div className="hl-feature-box border-r">
                  <div className="icon-wrapper mb-4">
                    <span>
                      <img
                        src={setting?.halal_meat_feature_icon_two}
                        alt="icon"
                        className="img-fluid"
                      />
                    </span>
                  </div>
                  <h5 className="hl-heading mb-3">
                    {setting?.halal_meat_feature_two_title}
                  </h5>
                  <p className="mb-0">
                    {setting?.halal_meat_feature_two_text}
                  </p>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6">
                <div className="hl-feature-box">
                  <div className="icon-wrapper mb-4">
                    <span>
                      <img
                        src={setting?.halal_meat_feature_icon_three}
                        alt="icon"
                        className="img-fluid"
                      />
                    </span>
                  </div>
                  <h5 className="hl-heading mb-3">
                    {setting?.halal_meat_feature_three_title}
                  </h5>
                  <p className="mb-0">
                    {setting?.halal_meat_feature_three_text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HalalMeatFeature;

