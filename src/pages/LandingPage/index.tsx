import React, { useState } from "react";
import VerifiedImage from "../../assets/verified.png";
import FairTrade from "../../assets/fair-trade 1.png";
import SearchIcon from "../../assets/search (4).png";
import Messages from "../../assets/messages.png";
import Card from "../../assets/card.png";
import StreamImg from "../../assets/stream-img.png";
import Document from "../../assets/document (1).png";
import Ai from "../../assets/ai.png";
import Calendar from "../../assets/calendar (6).png";
import AiRel from "../../assets/ai-rel.png";
import Monitoring from "../../assets/monitoring.png";
import Ecosystem from "../../assets/ecosystem.png";
import UserVerification from "../../assets/user-verification.png";
import News from "../../assets/news.png";
import Discussion from "../../assets/discussion.png";
import Insights from "../../assets/insights.png";
import IpoCalendar from "../../assets/ipo-calendar.png";

import BannerImg from "../../assets/banner-bg.png";
import BannerImg2 from "../../assets/Group 53.png";
import Logo from "../../assets/logo.png";

import personImg from "../../assets/person-img.png";
import groupImg from "../../assets/group-img.png";
import streamImg from "../../assets/stream-img.png";
import upworkimg from "../../assets/upwork-img.png";

import socialIcon1 from "../../assets/1384015 1.png";
import socialIcon2 from "../../assets/2168281 1.png";
import socialIcon3 from "../../assets/5969020 1.png";

import Frame1 from "../../assets/Frame-1.png";
import Frame2 from "../../assets/Frame-2.png";
import Frame3 from "../../assets/Frame-3.png";
import Frame4 from "../../assets/Frame-4.png";
import Frame5 from "../../assets/Frame-5.png";
import Frame6 from "../../assets/Frame-6.png";
import Frame7 from "../../assets/Frame-7.png";
import Frame8 from "../../assets/Frame-8.png";

import playStoreImg from "../../assets/play.png";
import appStoreImg from "../../assets/apple.png";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [openFaq, setOpenFaq] = useState(null);

  const scrollCarousel = (direction: any) => {
    const carousel: any = document.getElementById("carousel");
    const firstCard = carousel.querySelector("img");
    const scrollAmount = firstCard.offsetWidth + 20;
    carousel.scrollBy({
      left: scrollAmount * direction,
      behavior: "smooth",
    });
  };

  const toggleFaq = (index: any) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is this platform about?",
      answer:
        "This platform helps you connect, share content, and grow your network.",
    },
    {
      question: "What kind of posts can I share?",
      answer:
        "You can share articles, opinions, images, videos, and event invites.",
    },
    {
      question: "Can I upload documents to my posts?",
      answer: "Yes, supported formats include PDF, DOCX, and PPT.",
    },
    {
      question: "Is it free to join?",
      answer:
        "Yes! Basic membership is completely free. We also offer premium features like live streaming and ad promotions.",
    },
  ];

  const coreFeatures = [
    { icon: VerifiedImage, text: "Profile Setup & Verification" },
    { icon: FairTrade, text: "Identifies Members with FAIR Values" },
    { icon: SearchIcon, text: "Advanced User Search" },
    { icon: Messages, text: "One-to-One Messaging" },
    { icon: Card, text: "Ad Packages (Experts)" },
    { icon: StreamImg, text: "Live Video Streams (Premium)" },
    { icon: Document, text: "Document Sharing (PDF, JPEG, etc.)" },
    { icon: Ai, text: "Mobile + Web Platform" },
    { icon: Calendar, text: "Personal Calendar Integration" },
    { icon: AiRel, text: "AI-Powered Content Curation" },
    { icon: Monitoring, text: "Compliance Monitoring" },
    { icon: Ecosystem, text: "Ecosystem" },
    { icon: UserVerification, text: "User Verification" },
    { icon: News, text: "Latest Financial News" },
    { icon: Discussion, text: "Discussion Vaults" },
    { icon: Insights, text: "Filters Insights from Experts" },
    { icon: IpoCalendar, text: "Stock Ticker and IPO Calendar" },
  ];

  return (
    <div className="m-0 p-0 bg-white">
      {/* Banner Section */}
      <div
        className="relative bg-center bg-no-repeat bg-cover flex flex-col items-center"
        style={{ backgroundImage: `url(${BannerImg})` }}
      >
        {/* Navbar */}
        <div className="flex justify-between items-center w-full max-w-[1400px] mx-5 mt-5 mb-[3rem]">
          <img src={Logo} alt="" className="w-full max-w-[40px] ml-5" />
          {/* <div className="flex gap-2 mr-5">
            <button className="bg-transparent text-white border border-white px-3 py-2 rounded-lg text-sm hover:bg-white hover:text-[#7030A0] transition">
              Login
            </button>
            <button className="bg-[#00B050] text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition">
              Sign Up
            </button>
          </div> */}
        </div>

        {/* Banner Content */}
        <div className="flex justify-between items-center flex-col-reverse md:flex-row w-full max-w-[1400px] pb-10 md:pb-20 px-5 md:px-0">
          <div className="mt-10 md:mt-0 md:ml-10 text-center md:text-left">
            <p className="text-white font-bold text-[28px] md:text-[45px] sm:text-[35px] leading-tight mb-5">
              Connect. Share. Grow — <br />
              Your Financial Social Network
            </p>
            <p className="text-white font-normal text-[20px] sm:text-[16px] w-full md:w-3/4 mb-5">
              Access a growing ecosystem of individual investors, advisors, and
              business founders exchanging financial insights, streaming live
              events, building networks, and staying up to date on latest
              financial news – all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={playStoreImg}
                  alt="Get it on Google Play"
                  className="h-14 hover:scale-105 transition-transform"
                />
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={appStoreImg}
                  alt="Download on the App Store"
                  className="h-14 hover:scale-105 transition-transform"
                />
              </a>
            </div>
          </div>
          <div className="md:mr-10">
            <img
              src={BannerImg2}
              alt="Banner Image"
              className="w-[450px] xs:w-[180px] mx-auto"
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-10 sm:px-5 py-10 flex flex-col items-center">
        <p className="text-[#7030A0] text-center w-full text-3xl sm:text-2xl mb-10">
          How It Works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: personImg,
              title: "Create Your Profile",
              desc: "Answer a few quick questions.",
            },
            {
              icon: groupImg,
              title: "Join the Ecosystem",
              desc: "Connect, follow, and message users.",
            },
            {
              icon: streamImg,
              title: "Expert Exchange",
              desc: "Share Insights, Videos, or view Live Streams",
            },
            {
              icon: upworkimg,
              title: "Grow Together",
              desc: "Attend events, discussions or network.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#F8F8F8] hover:bg-[#AB8BC3] transition rounded-xl p-5 flex flex-col items-center hover:-translate-y-1 cursor-pointer"
            >
              <div className="bg-[#D6C6E2] w-[70px] h-[70px] rounded-full flex items-center justify-center">
                <img src={item.icon} alt="" className="w-10 h-10" />
              </div>
              <p className="mt-3 text-[22px] text-[#7030A0] text-center font-semibold">
                {item.title}
              </p>
              <p className="mt-3 text-[18px] sm:text-[14px] text-[#3E3E3E] text-center w-[90%]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Features */}
      <div className="px-10 sm:px-5 py-10 flex flex-col items-center bg-[#D6C6E2]">
        <p className="text-[#7030A0] text-center w-full text-3xl sm:text-2xl mb-10">
          Core Features
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[60px] gap-y-[40px] justify-items-center">
          {coreFeatures.map((feature, index) => (
            <div
              key={index}
              className="w-full h-full bg-white hover:bg-[#F8F8F8] transition rounded-xl p-5 flex flex-col items-center"
            >
              <img src={feature.icon} alt="" className="w-12 h-12" />
              <p className="mt-3 text-[18px] text-[#555555] text-center font-semibold max-w-[235px]">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
        <p className="text-[#7030A0] mt-10 mb-0 text-center text-base">
          <strong>Note:</strong> General members with Premium can only view the
          Streams. All other Members with Premium can view and post Streams.
        </p>
      </div>

      {/* Product Tour Section */}
      <div className="px-10 sm:px-5 py-10 flex flex-col items-center">
        <p className="text-[#7030A0] text-center w-full text-3xl sm:text-2xl mb-10">
          Product Tour
        </p>
        <div className="relative w-full overflow-hidden px-5">
          <button
            className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white rounded-full p-2 z-10 hover:bg-opacity-90 transition"
            onClick={() => scrollCarousel(-1)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <polyline
                points="15 18 9 12 15 6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white rounded-full p-2 z-10 hover:bg-opacity-90 transition"
            onClick={() => scrollCarousel(1)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <polyline
                points="9 18 15 12 9 6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            id="carousel"
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 hide-scroll-bar"
          >
            <img
              src={Frame1}
              alt=""
              className="snap-start w-[300px] sm:w-[245px] rounded-3xl hover:-translate-y-1 transition"
            />
            <img
              src={Frame2}
              alt=""
              className="snap-start w-[300px] sm:w-[245px] rounded-3xl hover:-translate-y-1 transition"
            />
            <img
              src={Frame3}
              alt=""
              className="snap-start w-[300px] sm:w-[245px] rounded-3xl hover:-translate-y-1 transition"
            />
            <img
              src={Frame4}
              alt=""
              className="snap-start w-[300px] sm:w-[245px] rounded-3xl hover:-translate-y-1 transition"
            />
            <img
              src={Frame5}
              alt=""
              className="snap-start w-[300px] sm:w-[245px] rounded-3xl hover:-translate-y-1 transition"
            />
            <img
              src={Frame6}
              alt=""
              className="snap-start w-[300px] sm:w-[245px] rounded-3xl hover:-translate-y-1 transition"
            />
            <img
              src={Frame7}
              alt=""
              className="snap-start w-[300px] sm:w-[245px] rounded-3xl hover:-translate-y-1 transition"
            />
            <img
              src={Frame8}
              alt=""
              className="snap-start w-[300px] sm:w-[245px] rounded-3xl hover:-translate-y-1 transition"
            />
          </div>
        </div>
      </div>

      {/* Pricing Plans Section */}
      <div className="px-10 sm:px-5 py-10 bg-[#F8F8F8]">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center">
          <p className="text-[#7030A0] text-center w-full text-3xl sm:text-2xl mb-10">
            Pricing Plans
          </p>
          <div className="flex gap-10 mb-8">
            <span
              className={`tab cursor-pointer text-[#7030A0] font-semibold pb-1 border-b-2 border-transparent ${
                activeTab === "general" ? "active" : ""
              }`}
              onClick={() => setActiveTab("general")}
            >
              General Members
            </span>
            <span
              className={`tab cursor-pointer text-[#7030A0] font-semibold pb-1 border-b-2 border-transparent ${
                activeTab === "expert" ? "active" : ""
              }`}
              onClick={() => setActiveTab("expert")}
            >
              Expert Members
            </span>
          </div>

          {/* Plans Grid */}
          <div
            className={`plans-grid grid grid-cols-1 sm:grid-cols-3 gap-5 w-full ${
              activeTab === "general" ? "block" : "hidden"
            }`}
          >
            <div className="box bg-[#AB8BC3] text-white rounded-lg p-8 text-2xl font-bold">
              Choose <br /> your plans
            </div>
            <div className="box bg-[#D6C6E2] text-[#7030A0] rounded-lg p-8 text-2xl font-bold text-center">
              Standard <br /> Plan <br />
              <p className="plan-price text-[18px] font-semibold mt-2">Free</p>
            </div>
            <div className="box bg-[#D6C6E2] text-[#7030A0] rounded-lg p-8 text-2xl font-bold text-center">
              Premium <br /> Plan <br />
              <p className="plan-price text-[18px] font-semibold mt-2">
                $20/month
              </p>
            </div>
          </div>

          <div
            className={`plans-grid grid grid-cols-1 sm:grid-cols-3 gap-5 w-full ${
              activeTab === "expert" ? "block" : "hidden"
            }`}
          >
            <div className="box bg-[#AB8BC3] text-white rounded-lg p-8 text-2xl font-bold">
              Choose <br /> your plans
            </div>
            <div className="box bg-[#D6C6E2] text-[#7030A0] rounded-lg p-8 text-2xl font-bold text-center">
              Standard <br /> Plan <br />
              <p className="plan-price text-[18px] font-semibold mt-2">Free</p>
            </div>
            <div className="box bg-[#D6C6E2] text-[#7030A0] rounded-lg p-8 text-2xl font-bold text-center">
              Premium <br /> Plan <br />
              <p className="plan-price text-[18px] font-semibold mt-2">
                $20/month
              </p>
            </div>
          </div>

          <div className="feature-divider-heading text-[#7030A0] text-xl font-semibold my-4">
            Features
          </div>

          {/* General Features */}
          <div
            className={`features w-full ${
              activeTab === "general" ? "block" : "hidden"
            }`}
          >
            <div className="features-sub-section grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
              <div className="feature-title bg-[#AB8BC3] text-white rounded-lg p-5 flex flex-col gap-3 text-[18px]">
                <span>Share Content</span>
                <span>Messaging</span>
                <span>View Video Streaming</span>
                <span>View Events</span>
              </div>
              <div className="feature bg-[#D6C6E2] rounded-lg p-5 flex flex-col gap-3 text-center">
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
                <span className="text-[18px] text-[#666]">—</span>
                <span className="text-[18px] text-[#666]">—</span>
              </div>
              <div className="feature bg-[#D6C6E2] rounded-lg p-5 flex flex-col gap-3 text-center">
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
              </div>
            </div>
            <p className="text-[#00B050] text-center text-sm mt-4">
              Note: Ad packages are available.
            </p>
          </div>

          {/* Expert Features */}
          <div
            className={`features w-full ${
              activeTab === "expert" ? "block" : "hidden"
            }`}
          >
            <div className="features-sub-section grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
              <div className="feature-title bg-[#AB8BC3] text-white rounded-lg p-5 flex flex-col gap-3 text-[18px]">
                <span>Share Content</span>
                <span>Messaging</span>
                <span>Host Video Streaming</span>
                <span>Host Events</span>
              </div>
              <div className="feature bg-[#D6C6E2] rounded-lg p-5 flex flex-col gap-3 text-center">
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
                <span className="text-[18px] text-[#666]">—</span>
                <span className="text-[18px] text-[#666]">—</span>
              </div>
              <div className="feature bg-[#D6C6E2] rounded-lg p-5 flex flex-col gap-3 text-center">
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
                <span className="text-[18px] font-bold text-[#00B050]">✔</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-10 sm:px-5 py-10 flex flex-col items-center">
        <p className="text-[#7030A0] text-center w-full text-3xl sm:text-2xl mb-10">
          Frequently Asked Questions
        </p>

        <div className="w-full max-w-[800px]">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item bg-[#F8F8F8] rounded-lg overflow-hidden transition ${
                  openFaq === index ? "open" : ""
                }`}
              >
                <button
                  className="faq-question w-full flex justify-between items-center px-4 py-3 text-lg sm:text-base text-[#414141]"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className="faq-arrow w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="faq-answer px-4 pb-4 text-[#414141]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-10 sm:px-5 py-10 flex flex-col items-center bg-[#AB8BC3] text-white">
        <p className="text-white text-center w-full text-3xl sm:text-2xl mb-5">
          Ready to gain access to financial resources?
        </p>
        <p className="text-white text-center w-full text-xl sm:text-base">
          Join the first financial social network today.
        </p>
        <button className="bg-[#00B050] text-white px-6 py-3 rounded-lg text-[16px] sm:text-[14px] mt-5 hover:bg-green-700 transition">
          Get Started Free
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="px-10 sm:px-5 py-5 flex flex-col md:flex-row items-center justify-between text-[#414141] gap-4">
          <div className="flex items-center gap-2">
            <img
              src="assets/images/logo.png"
              alt=""
              className="w-full max-w-[40px] ml-5"
            />
            <span className="text-xl font-bold text-[#7030A0]">Boom</span>
          </div>
          <div className="flex gap-8 sm:gap-4 cursor-pointer flex-wrap justify-center">
            <p>About</p>
            <a href="/privacy-policy" className="hover:text-[#7030A0]">Privacy Policy</a>
            <p>Terms</p>
            <p>Contact</p>
          </div>
          <div className="flex gap-3">
            <img src={socialIcon1} alt="Social Icon" className="w-7 h-7" />
            <img src={socialIcon2} alt="Social Icon" className="w-7 h-7" />
            <img src={socialIcon3} alt="Social Icon" className="w-7 h-7" />
          </div>
        </div>
        <div className="bg-[#7030A0] py-2">
          <p className="text-center text-white m-0">© 2005 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
