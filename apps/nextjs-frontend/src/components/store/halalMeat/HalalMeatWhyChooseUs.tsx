"use client";

interface WhyChooseItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface HalalMeatWhyChooseUsProps {
  setting?: {
    halal_meat_why_choose_large_img?: string;
    halal_meat_why_choose_youtube_video_link?: string;
    halal_meat_why_choose_title?: string;
    halal_meat_why_choose_sub_title?: string;
    halal_meat_why_choose_icon_one?: string;
    halal_meat_why_choose_one_title?: string;
    halal_meat_why_choose_one_text?: string;
    halal_meat_why_choose_icon_two?: string;
    halal_meat_why_choose_two_title?: string;
    halal_meat_why_choose_two_text?: string;
    halal_meat_why_choose_icon_three?: string;
    halal_meat_why_choose_three_title?: string;
    halal_meat_why_choose_three_text?: string;
    halal_meat_why_choose_icon_four?: string;
    halal_meat_why_choose_four_title?: string;
    halal_meat_why_choose_four_text?: string;
    halal_meat_why_choose_icon_five?: string;
    halal_meat_why_choose_five_title?: string;
    halal_meat_why_choose_five_text?: string;
    halal_meat_why_choose_icon_six?: string;
    halal_meat_why_choose_six_title?: string;
    halal_meat_why_choose_six_text?: string;
  };
}

const HalalMeatWhyChooseUs = ({
  setting,
}: HalalMeatWhyChooseUsProps) => {
  const whyChooseData: WhyChooseItem[] = [
    {
      id: 1,
      icon: setting?.halal_meat_why_choose_icon_one || "",
      title: setting?.halal_meat_why_choose_one_title || "",
      description: setting?.halal_meat_why_choose_one_text || "",
    },
    {
      id: 2,
      icon: setting?.halal_meat_why_choose_icon_two || "",
      title: setting?.halal_meat_why_choose_two_title || "",
      description: setting?.halal_meat_why_choose_two_text || "",
    },
    {
      id: 3,
      icon: setting?.halal_meat_why_choose_icon_three || "",
      title: setting?.halal_meat_why_choose_three_title || "",
      description: setting?.halal_meat_why_choose_three_text || "",
    },
    {
      id: 4,
      icon: setting?.halal_meat_why_choose_icon_four || "",
      title: setting?.halal_meat_why_choose_four_title || "",
      description: setting?.halal_meat_why_choose_four_text || "",
    },
    {
      id: 5,
      icon: setting?.halal_meat_why_choose_icon_five || "",
      title: setting?.halal_meat_why_choose_five_title || "",
      description: setting?.halal_meat_why_choose_five_text || "",
    },
    {
      id: 6,
      icon: setting?.halal_meat_why_choose_icon_six || "",
      title: setting?.halal_meat_why_choose_six_title || "",
      description: setting?.halal_meat_why_choose_six_text || "",
    },
  ];
  
  return (
    <>
      <section className="hl-wcs-section ptb-120">
        <div className="container position-relative">
          <div className="hl-video-box">
            <img
              src={setting?.halal_meat_why_choose_large_img}
              alt="video bg"
              className="img-fluid"
            />
            <a
              href={setting?.halal_meat_why_choose_youtube_video_link}
              className="video-popup-btn"
            >
              <i className="fas fa-play"></i>
            </a>
          </div>

          <div className="row justify-content-center">
            <div className="col-xl-5">
              <div className="text-center">
                <span className="hl-subtitle fw-bold">
                  {setting?.halal_meat_why_choose_title}
                </span>
                <h2 className="mb-6 mt-3">
                  {setting?.halal_meat_why_choose_sub_title}
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <div className="row g-4">
              <div className="col-xl-4 col-md-6">
                {whyChooseData.slice(0, 3).map((item, index) => (
                  <div
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "text-xl-end" : "text-start"
                    } ${index !== 0 ? "mt-7" : ""}`}
                  >
                    <div className="hl-icon-box bg-white d-inline-block text-start">
                      <span className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-circle mb-4 p-3 bg-white">
                        <img src={item.icon} alt="icon" className="img-fluid" />
                      </span>
                      <h5 className="mb-2">{item.title}</h5>
                      <p className="mb-0 fs-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-xl-4 col-md-6 offset-xl-4">
                {whyChooseData.slice(3).map((item, index) => (
                  <div
                    key={item.id}
                    className={`${
                      index % 2 !== 0 ? "text-xl-end" : "text-start"
                    } ${index !== 0 ? "mt-7" : ""}`}
                  >
                    <div className="hl-icon-box bg-white d-inline-block text-start">
                      <span className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-circle mb-4 p-3 bg-white">
                        <img src={item.icon} alt="icon" className="img-fluid" />
                      </span>
                      <h5 className="mb-2">{item.title}</h5>
                      <p className="mb-0 fs-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HalalMeatWhyChooseUs;

