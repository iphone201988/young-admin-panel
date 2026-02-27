import Logo from "../assets/logo.png";
import Footer from "./LandingPage/components/Footer";
import { Link } from "react-router";

const sections = [
  {
    title: "Introduction",
    body:
      "This Privacy Policy explains how we collect, use, and safeguard your information when you use TheBoom web and mobile experiences.",
  },
  {
    title: "Information We Collect",
    items: [
      "Account details you provide (name, email, phone, role).",
      "Content you submit (posts, ads, complaints, uploaded media).",
      "Usage data (feature interactions, timestamps, device/browser info).",
      "Cookies and similar technologies for session management and analytics.",
    ],
  },
  {
    title: "How We Use Information",
    items: [
      "Operate and improve the platform, including moderation and safety.",
      "Provide support, notifications, and service-related communications.",
      "Protect against fraud, abuse, and violations of our Terms.",
      "Comply with legal obligations and enforce our policies.",
    ],
  },
  {
    title: "Sharing",
    items: [
      "With service providers assisting with hosting, analytics, and support.",
      "With authorities or third parties when required by law or to protect rights.",
      "During business transfers subject to applicable law.",
    ],
  },
  {
    title: "Data Retention",
    body:
      "We retain information as needed to operate the service and meet legal obligations. When data is no longer required, we take steps to delete or de-identify it.",
  },
  {
    title: "Security",
    body:
      "We use administrative, technical, and physical safeguards to protect information. No method of transmission or storage is fully secure, so we cannot guarantee absolute security.",
  },
  {
    title: "Your Choices",
    items: [
      "Access, update, or delete certain account information via your profile or by contacting support.",
      "Manage cookies through your browser settings.",
      "Opt out of non-essential communications via provided controls where available.",
    ],
  },
  {
    title: "Children",
    body:
      "The service is not directed to children under the age required by applicable law, and we do not knowingly collect information from them.",
  },
  {
    title: "Changes to This Policy",
    body:
      "We may update this Privacy Policy to reflect changes to our practices. When we do, we will revise the “Last Updated” date below.",
  },
  {
    title: "Contact Us",
    body:
      "If you have questions, contact us at support@theboom.com. For legal requests, include sufficient detail for us to verify and process your inquiry.",
  },
];

const PrivacyPolicy = () => {
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#7030A0]">Privacy Policy</h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: December 2025</p>
              <p className="mt-4 text-gray-700">
                Your privacy matters. Please read this policy carefully to understand how TheBoom handles your information.
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.title} className="space-y-3">
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  {section.body && <p className="text-gray-700 leading-relaxed">{section.body}</p>}
                  {section.items && (
                    <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Shared marketing footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;


