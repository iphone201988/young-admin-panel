import Logo from "../assets/logo.png";
import Footer from "./LandingPage/components/Footer";
import { Link } from "react-router";

const Terms = () => {
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
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 px-6 md:px-10 py-8 md:py-10">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-[#7030A0]">
                Terms of Use &amp; Privacy Notice
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Please read these terms carefully before using the Boom informational site or
                joining our waitlist.
              </p>
            </header>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                By accessing the Boom informational site and joining our waitlist, you agree to
                the following:
              </p>

              <ul className="list-disc list-inside space-y-3">
                <li>
                  <span className="font-semibold">Informational Purpose:</span>{" "}
                  This site provides preliminary information regarding the Boom app scheduled for
                  release in Summer 2026. Features and interface designs are subject to change.
                </li>
                <li>
                  <span className="font-semibold">Intellectual Property:</span>{" "}
                  All content, including the &quot;Suitability Score&quot; methodology, AI-driven
                  sentiment analysis concepts, and site branding, is the exclusive property of
                  Boom and is protected under pending patent and trademark filings. Unauthorized
                  reproduction is strictly prohibited.
                </li>
                <li>
                  <span className="font-semibold">Data Privacy:</span>{" "}
                  We collect your email address solely to provide updates regarding the Boom
                  launch. We do not sell your data to third parties. Every user must undergo ID
                  verification upon the full app release.
                </li>
                <li>
                  <span className="font-semibold">Not Financial Advice:</span>{" "}
                  Boom is a networking and research platform. Content shared on this site or the
                  upcoming app does not constitute professional financial or investment advice.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Shared marketing footer */}
      <Footer />
    </div>
  );
};

export default Terms;

