import React from "react";
import { FaFacebookF, FaLinkedinIn, FaChevronRight } from "react-icons/fa";

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
									Subscribe & get all related jobs
									notification.
								</p>
							</div>
						</div>
						<div className="z-40 col-span-12 lg:col-span-5">
							<form className="flex" action="#">
								<input
									placeholder="Enter your email"
									className="border-gray-400 text-gray-300 h-10 rounded-r-none min-w-50 "
								/>
								<button
									size="lg"
									className="text-secondary-100 h-10 rounded-l-none w-fit px-4"
								>
									Subscribe
								</button>
							</form>
						</div>
					</div>
				</div>
				<div className="absolute right-0 -top-10 -z-0 opacity-20">
					<img
						src="/images/subscribe.png"
						alt=""
						className="img-fluid"
					/>
				</div>
			</section>
			<footer className="">
				<section className="bg-secondary-100 py-10 px-4">
					<div className="container mx-auto min-h-10 grid md:grid-cols-8 gap-10">
						<div className="md:col-span-3 border-t-4 bg-secondary border-primary h-fit p-6 flex flex-col items-center gap-5">
							<h1 className="text-white font-semibold text-xl">
								JW SKILLEDHUNT
							</h1>
							<div className="text-center text-gray-300">
								<span className="text-sm">
									Postal Address : A. Dianne Sirmans 724 5th
									Avenue Bethlehem, PA. 18018
								</span>
							</div>
							<div className="text-gray-300 text-sm">
								<p className="flex items-center gap-2">
									<span className="font-medium">Phone:</span>
									<span>+234 123456789</span>
								</p>
								<p className="flex items-center gap-2">
									<span className="font-medium">Email:</span>
									<span>info@jwskilledhunt.org</span>
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
						<div className="md:col-span-2 text-white">
							<h1 className="font-medium text-lg">
								Useful links:
							</h1>
							<ul className="mt-3 space-y-4">

							<li>
							<a href="/donate" className="text-blue-400 hover:underline">
							Support Us with a Donation
						  </a>
						</li>
								<li>
									<a
										href="/about"
										className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
									>
										<FaChevronRight className="text-xs text-primary" />
										About Us
									</a>
								</li>
								<li>
									<a
										href="/services"
										className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
									>
										<FaChevronRight className="text-xs text-primary" />
										Services
									</a>
								</li>
								<li>
									<a
										href="/faqs"
										className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
									>
										<FaChevronRight className="text-xs text-primary" />
										FAQ's
									</a>
								</li>
								<li>
									<a
										href="/our-team"
										className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
									>
										<FaChevronRight className="text-xs text-primary" />
										Team
									</a>
								</li>
								<li>
									<a
										href="/privacy-policy"
										className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
									>
										<FaChevronRight className="text-xs text-primary" />
										Privacy and Policy
									</a>
								</li>
								<li>
									<a
										href="/contact-us"
										className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
									>
										<FaChevronRight className="text-xs text-primary" />
										Contact Us
									</a>
								</li>
							</ul>
						</div>
						<div className="text-white md:col-span-2">
							<h1 className="font-medium text-lg">
								Our Services:
							</h1>
							<ul className="mt-3 space-y-4">
								<li>
									<a
										href="/hire"
										className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
									>
										<FaChevronRight className="text-xs text-primary" />
										Hire Skilled Worker
									</a>
								</li>
								<li>
									<a
										href="/job-search"
										className="flex items-center gap-2 text-sm hover:text-primary transition duration-300"
									>
										<FaChevronRight className="text-xs text-primary" />
										Find Jobs
									</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<section className="py-6 border-t bg-blue-950 border-gray-100/10">
					<div className="container mx-auto">
						<div className="text-center font-medium">
							<p className="mb-0 text-center text-white/50">
								{new Date().getFullYear() + " "}
								© JW SKILLEDHUNT
							</p>
						</div>
					</div>
				</section>
			</footer>
		</>
	);
}