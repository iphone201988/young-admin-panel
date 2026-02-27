import Logo from "../assets/logo.png";
import Footer from "./LandingPage/components/Footer";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top bar with logo to match landing page vibe */}
      <header className="bg-gradient-to-r from-[#7030A0] to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={Logo} alt="Boom logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold">Boom</span>
          </Link>
        </div>
      </header>

      {/* Content card */}
      <main className="flex-1 bg-gradient-to-b from-[#f5ecff] via-white to-white">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 px-6 md:px-10 py-8 md:py-10 space-y-6 text-gray-700 leading-relaxed">
            <h1 className="text-3xl font-bold text-[#7030A0] mb-2">
              Our Mission: Wealth with Purpose
            </h1>
            <p>
              At Boom, we believe that the &quot;State of the Nation&quot; demands a new kind of
              financial infrastructure, one where your portfolio finally reflects your principles.
            </p>
            <p>
              Inspired by the legacy of Black Wall Street, Boom is a premier digital ecosystem
              designed to bridge the gap between individual wealth and community impact. We
              aren&apos;t just a social network; we are a high-trust marketplace where individual
              investors, startups, and small businesses connect directly with license-verified
              financial advisors, insurance brokers, and venture capitalists.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6">
              The Boom Advantage
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <span className="font-semibold">AI-Driven Alignment:</span> Our proprietary
                algorithm provides a 1–100 Suitability Score, matching your capital with
                opportunities that fit your values.
              </li>
              <li>
                <span className="font-semibold">Verified Trust:</span> We set the gold standard
                for security. Every user is ID-verified, and every financial professional is
                vetted for active licensing.
              </li>
              <li>
                <span className="font-semibold">A Circular Economy:</span> From uploading pitch
                decks in our Founder&apos;s Rooms to analyzing Community Sentiment, we provide
                the tools to build a self-sustaining financial future.
              </li>
            </ul>

            <p className="mt-4 font-medium text-gray-900">
              Join us as we prepare for our full ecosystem launch in Early Summer 2026.
            </p>
          </div>
        </div>
      </main>

      {/* Shared marketing footer */}
      <Footer />
    </div>
  );
};

export default About;

