/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

export default function ProcessSection() {
	const [activeTab, setActiveTab] = useState("v-pills-home-tab");

	const handleTabClick = (tabId) => {
		setActiveTab(tabId);
	};

	return (
		<section className="py-20 px-4">
			<div className="container mx-auto">
				<div className="nav-tabs round-pill">
					<div className="grid items-center grid-cols-12 gap-5">
						<div className="col-span-12 lg:col-span-6">
							<h3 className="mb-3 text-3xl text-gray-900 font-semibold">
								How It Works
							</h3>
							<p className="text-gray-500">
								Post a job to tell us about your project. We&apos;ll quickly match you with the right freelancers.
							</p>

							<div className="mt-5">
								<ul className="text-gray-700 nav">
									<li className="w-full mb-[22px]">
										<a
											href="#"
											onClick={() => handleTabClick("v-pills-home-tab")}
											className={`relative inline-block w-full p-2 ${
												activeTab === "v-pills-home-tab" ? "active group/active" : "group"
											}`}
											aria-current={activeTab === "v-pills-home-tab" ? "page" : undefined}
										>
											<div className="flex gap-4">
												<div className="shrink-0 h-10 w-10 rounded-full text-center bg-lime-100">
													<span className="text-gray-900 text-16 leading-[2.5]">1</span>
												</div>
												<div className="grow ltr:ml-4 rtl:mr-4">
													<h5 className="fs-18 text-gray-900 font-medium">
														Register an account
													</h5>
													<p className="mt-1 mb-2 text-gray-500">
														Due to its widespread use as filler text for layouts, non-readability is of great importance.
													</p>
												</div>
											</div>
										</a>
									</li>
									<li className="w-full mb-[22px]">
										<a
											href="#"
											onClick={() => handleTabClick("v-pills-profile")}
											className={`relative inline-block w-full p-2 ${
												activeTab === "v-pills-profile" ? "active group/active" : "group"
											}`}
											aria-current={activeTab === "v-pills-profile" ? "page" : undefined}
										>
											<div className="flex gap-4">
												<div className="shrink-0 h-10 w-10 rounded-full text-center bg-lime-100">
													<span className="text-gray-900 text-16 leading-[2.5]">2</span>
												</div>
												<div className="grow ltr:ml-4 rtl:mr-4">
													<h5 className="fs-18 text-gray-900 font-medium">
														Find your job
													</h5>
													<p className="mt-1 mb-2 text-gray-500">
														There are many variations of passages of lorem ipsum, but the majority have alteration in some form.
													</p>
												</div>
											</div>
										</a>
									</li>
									<li className="w-full mb-[22px]">
										<a
											href="#"
											onClick={() => handleTabClick("v-pills-messages")}
											className={`relative inline-block w-full p-2 ${
												activeTab === "v-pills-messages" ? "active group/active" : "group"
											}`}
											aria-current={activeTab === "v-pills-messages" ? "page" : undefined}
										>
											<div className="flex gap-4">
												<div className="shrink-0 h-10 w-10 rounded-full text-center bg-lime-100">
													<span className="text-gray-900 text-16 leading-[2.5]">3</span>
												</div>
												<div className="grow ltr:ml-4 rtl:mr-4">
													<h5 className="fs-18 text-gray-900 font-medium">
														Apply for job
													</h5>
													<p className="mt-1 mb-2 text-gray-500">
														It is a long established fact that a reader will be distracted by the readable content of a page.
													</p>
												</div>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-span-12 lg:col-span-6">
							<div className="tab-content">
								{activeTab === "v-pills-home-tab" && (
									<div className="block tab-pane">
										<img src="/images/process-01.png" alt="" className="max-w-full" />
									</div>
								)}
								{activeTab === "v-pills-profile" && (
									<div className="block tab-pane">
										<img src="/images/process-02.png" alt="" className="max-w-full" />
									</div>
								)}
								{activeTab === "v-pills-messages" && (
									<div className="block tab-pane">
										<img src="/images/process-03.png" alt="" className="max-w-full" />
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
