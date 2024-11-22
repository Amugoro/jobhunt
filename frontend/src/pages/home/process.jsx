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
					<div className="col-span-12 lg:col-span-4">
					<h3 className="mb-3 text-3xl items-center text-white bg-purple-600 font-semibold p-6">
					  Freelancer
					</h3>
					<p className="text-white bg-purple-600 h-[65vh] rounded-lg p-8">
					  Create a professional profile showcasing your skills. <br />
					  Browse and apply for international projects.<br />
					  Get hired and work with top global clients.<br />
					  Receive payments in foreign currency.<br />
					  Signup now and take your freelancer career global.
					  <button className="mt-10 bg-white  text-purple-800 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:text-white transition-all duration-700">
					  <a
					  href="/signup"
					  >
					  
					  Signup
					  </a>
					  </button>
					</p>
					     
				  </div>
				  
						<div className="col-span-12 lg:col-span-4">
							<h3 className="mb-3 text-3xl bg-green-600 text-white font-semibold p-6">
								Trades-Person
							</h3>
							<div className="text-white bg-green-500 h-[65vh] rounded-lg p-8">
							<p className="text-white p-2 ">
								Get instant access to skilled tradepeople for your daily needs such as:<br/>
								<ul>
								<li >Maintenance</li>
								<li>Construction</li>
								<li>Repair</li>
								<li>Design</li>
								-And many more
								</ul>

							</p>
							<p>
							Find a Tradespeople Near You
							<ol>
							<li>Sign up today.</li>
							<li>Enter your location and service needs.</li>
							<li>Browse profiles and reviews.</li>
							<li>Connect with your chosen expert.</li>
							</ol>
							</p>
							</div>
							


						</div>
						<div className="col-span-12 lg:col-span-4">
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
