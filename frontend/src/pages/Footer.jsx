import React from "react";
import { FaFacebookF, FaLinkedinIn, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <section className="relative py-16 px-4 overflow-hidden bg-blue-900">
        <div className="container mx-auto">
          <div className="grid items-center grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-7">
              <div className="text-center lg:text-start">
                <h4 className="text-white font-medium text-xl">
                  Get New Jobs Notification!
                </h4>
                <p className="mt-1 mb-0 text-white/50">
                  Subscribe & get all related jobs notification.
                </p>
              </div>
            </div>
            <div className="z-40 col-span-12 lg:col-span-5">
              <form className="flex flex-col md:flex-row items-center justify-center gap-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="p-3 rounded text-black w-80"
                />
                <button className="bg-purple-600 hover:bg-purple-500 py-3 px-6 rounded">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute right-0 -top-10 -z-0 opacity-20">
          <img src="/images/subscribe.png" alt="" className="img-fluid" />
        </div>
      </section>
      <footer className="">
        <section className="bg-secondary-100 py-10 px-4">
          <div className="md:col-span-3 border-t-4 bg-secondary border-primary h-fit p-6 flex flex-col items-center gap-5">
            <h1 className="text-white font-semibold text-xl">
              JOBWING SKILLEDHUNT
            </h1>

            <div className="text-gray-300 text-sm">
              <p className="flex items-center ">
                JobWing-SKILLEDHUNT is an online Recruitment platform for
                professinals and <br /> Tradepeople
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Follow Us On</span>
              </p>
            </div>
            <div className="flex items-center gap-3 *:size-12 *:bg-secondary-100 *:rounded-md">
              <a
                href="https://www.facebook.com/profile.php?id=61553683591870&mibextid=ZbWKwL"
                className="hover:bg-primary transition duration-300 ease-out flex justify-center items-center text-white hover:text-secondary-100"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/company/jw-skilledhunt/"
                className="hover:bg-primary transition duration-300 ease-out flex justify-center items-center text-white hover:text-secondary-100"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>
          <div className="container mx-auto min-h-10 grid md:grid-cols-8 gap-10">
            <div className="md:col-span-2 text-white">
              <h1 className="font-medium text-lg">Company</h1>
              <ul className="mt-3 space-y-4">
                <li>
                  <Link
                    to="/aboutus"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    to="/our-team"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Team
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact-us"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-white md:col-span-2">
              <h1 className="font-medium text-lg">For Jobs</h1>
              <ul className="mt-3 space-y-4">
                <li>
                  <Link
                    to="/hire"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Browse Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/job-search"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Browse Industries
                  </Link>
                </li>
                <li>
                  <Link
                    to="/job-search"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Browse Location
                  </Link>
                </li>
                <li>
                  <Link
                    to="/job-search"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-white md:col-span-2">
              <h1 className="font-medium text-lg">For Employers</h1>
              <ul className="mt-3 space-y-4">
                <li>
                  <Link
                    to="/job-search"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Post Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hire"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Hire Tradesperson
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hire"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Hire Freelancer
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-white md:col-span-2">
              <h1 className="font-medium text-lg">Support</h1>
              <ul className="mt-3 space-y-4">
                <li>
                  <Link
                    to="/hire"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    FAQ's
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Privacy and Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/donation-page"
                    className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
                  >
                    <FaChevronRight className="text-xs text-primary" />
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="py-6 border-t bg-blue-950 border-gray-100/10">
          <div className="container mx-auto">
            <div className="text-center font-medium">
              <p className="mb-0 text-center text-white/50">
                {new Date().getFullYear() + " "}© JW SKILLEDHUNT
              </p>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
