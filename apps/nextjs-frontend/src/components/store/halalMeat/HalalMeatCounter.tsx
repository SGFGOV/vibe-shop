"use client";

interface HalalMeatCounterProps {
  setting?: {
    halal_meat_counter_one_count?: string;
    halal_meat_counter_one_title?: string;
    halal_meat_counter_two_count?: string;
    halal_meat_counter_two_title?: string;
    halal_meat_counter_three_count?: string;
    halal_meat_counter_three_title?: string;
  };
}

const HalalMeatCounter = ({ setting }: HalalMeatCounterProps) => {
  return (
    <>
      <section className="hl-counter-section">
        <div className="container">
          <div
            className="hl-counter-box rounded"
            style={{
              backgroundImage: "url('/img/home-4/cta-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="row">
              <div className="col-xl-4">
                <div className="hl-counter-item border-r">
                  <h1 className="display-3 text-white mb-2">
                    <span className="counter">
                      {setting?.halal_meat_counter_one_count}
                    </span>
                  </h1>
                  <h5 className="text-white mb-0">
                    {setting?.halal_meat_counter_one_title}
                  </h5>
                </div>
              </div>

              <div className="col-xl-4">
                <div className="hl-counter-item border-r">
                  <h1 className="display-3 text-white mb-2">
                    <span className="counter">
                      {setting?.halal_meat_counter_two_count}
                    </span>
                  </h1>
                  <h5 className="text-white mb-0">
                    {setting?.halal_meat_counter_two_title}
                  </h5>
                </div>
              </div>

              <div className="col-xl-4">
                <div className="hl-counter-item">
                  <h1 className="display-3 text-white mb-2">
                    <span className="counter">
                      {setting?.halal_meat_counter_three_count}
                    </span>
                  </h1>
                  <h5 className="text-white mb-0">
                    {setting?.halal_meat_counter_three_title}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HalalMeatCounter;

