export default function CampaignSinglePage() {
  return (
    <>
      <div
        className="gstore-breadcrumb position-relative z-1 overflow-hidden mt--50 tt-campaign-single-bg"
        style={{
          background:
            "url('/img/banner/cta-banner-2.jpg') no-repeat center center / cover",
        }}
      >
        <img
          src="/img/shapes/bg-shape-6.png"
          alt="bg-shape"
          className="position-absolute start-0 z--1 w-100 bg-shape"
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="breadcrumb-content">
                <h2 className="mb-2 text-center text-light">
                  Business Development Representative
                </h2>
                <ul
                  className="timing-countdown countdown-timer d-flex align-items-center gap-2 mt-3 justify-content-center"
                  data-date="06/30/2023 23:59:59"
                >
                  <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                    <h5 className="mb-1 days fs-sm">00</h5>
                    <span className="gshop-subtitle fs-xxs d-block">Days</span>
                  </li>
                  <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                    <h5 className="mb-1 hours fs-sm">00</h5>
                    <span className="gshop-subtitle fs-xxs d-block">Days</span>
                  </li>
                  <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                    <h5 className="mb-1 minutes fs-sm">00</h5>
                    <span className="gshop-subtitle fs-xxs d-block">Days</span>
                  </li>
                  <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                    <h5 className="mb-1 seconds fs-sm">00</h5>
                    <span className="gshop-subtitle fs-xxs d-block">Days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-100 pt-80 position-relative overflow-hidden z-1 trending-products-area">
        <img
          src="/img/shapes/garlic.png"
          alt="garlic"
          className="position-absolute garlic z--1"
          data-parallax='{"y": 100}'
        />
        <img
          src="/img/shapes/carrot.png"
          alt="carrot"
          className="position-absolute carrot z--1"
          data-parallax='{"y": -100}'
        />
        <img
          src="/img/shapes/mashrom.png"
          alt="mashrom"
          className="position-absolute mashrom z--1"
          data-parallax='{"x": 100}'
        />
        <div className="container">
          <div className="row justify-content-center g-4 mt-5">
            {/* Product cards would go here - keeping structure but removing repetitive content */}
          </div>
        </div>
      </section>
    </>
  );
}

