"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../common/others/Loading";

interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  services: string[];
  text: string;
}

export default function ReceivedMail() {
  const [emailData, setEmailData] = useState<EmailData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    services: [],
    text: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    const checked = target.checked;
    const id = target.id;

    if (type === "checkbox") {
      setEmailData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, id]
          : prev.services.filter((service) => service !== id),
      }));
    } else {
      setEmailData({ ...emailData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API endpoint removed - functionality disabled
      toast.error("Contact form submission is currently unavailable.");
        setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="col-xl-7">
      <form
        onSubmit={handleSubmit}
        className="contact-form ps-5 ps-xl-4 py-6 pe-6"
      >
        <h3 className="mb-6">Need Help? Send Message</h3>
        <div className="row g-4">
          <div className="col-sm-6">
            <div className="label-input-field">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={emailData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="label-input-field">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={emailData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="label-input-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Recipient Email"
                value={emailData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="label-input-field">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your phone"
                value={emailData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="checkbox-fields d-flex align-items-center gap-3 flex-wrap my-2">
              <div className="single-field d-inline-flex align-items-center gap-2">
                <div className="theme-checkbox">
                  <input
                    type="checkbox"
                    id="delivery"
                    onChange={handleChange}
                    checked={emailData.services.includes("delivery")}
                  />
                  <span className="checkbox-field">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                <label htmlFor="delivery" className="text-dark fw-semibold">
                  Delivery Problem
                </label>
              </div>
              <div className="single-field d-inline-flex align-items-center gap-2">
                <div className="theme-checkbox">
                  <input
                    type="checkbox"
                    id="service"
                    onChange={handleChange}
                    checked={emailData.services.includes("service")}
                  />
                  <span className="checkbox-field">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                <label htmlFor="service" className="text-dark fw-semibold">
                  Customer Service
                </label>
              </div>
              <div className="single-field d-inline-flex align-items-center gap-2">
                <div className="theme-checkbox">
                  <input
                    type="checkbox"
                    id="others"
                    onChange={handleChange}
                    checked={emailData.services.includes("others")}
                  />
                  <span className="checkbox-field">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                <label htmlFor="others" className="text-dark fw-semibold">
                  Others Service
                </label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="label-input-field">
              <label>Messages</label>
              <textarea
                name="text"
                placeholder="Your message"
                value={emailData.text}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary btn-md rounded-1 mt-6"
        >
          Send Message
        </button>
        {loading && <Loading loading={loading} />}
      </form>
    </div>
  );
}

