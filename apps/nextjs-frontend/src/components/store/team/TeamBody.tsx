"use client";

import Link from "next/link";

const TeamBody = () => {
  return (
    <>
      <section className="team-members ptb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5">
              <div className="section-title text-center">
                <h2 className="mb-0">
                  Our Online Customer Help! Support Member
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4 mt-5 justify-content-center">
            {[1, 2, 1, 2, 1, 2, 1, 2].map((teamNum, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
                <div className="team-card text-center bg-white rounded py-7 px-4">
                  <div className="team-thumb mb-5">
                    <img
                      src={`/img/authors/team-${teamNum}.jpg`}
                      alt="team"
                      className="img-fluid rounded-circle"
                    />
                    <div className="team-social">
                      <Link href="#">
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                      <Link href="#">
                        <i className="fab fa-twitter"></i>
                      </Link>
                      <Link href="#">
                        <i className="fab fa-behance"></i>
                      </Link>
                    </div>
                  </div>
                  <h5>Frances Gilmartin</h5>
                  <span>CEO & Founder</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-7">
            <Link href="#" className="btn btn-secondary btn-md rounded-1">
              More Member
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamBody;

