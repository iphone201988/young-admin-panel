import Logo from "../assets/logo.png";
import Footer from "./LandingPage/components/Footer";
import { Link } from "react-router";
import { useState } from "react";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!email.trim()) {
      setFeedback({ type: "error", text: "Please enter your email." });
      return;
    }

    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_BACKEND_URL || "";
      const formData = new FormData();
      formData.append("subject", subject.trim());
      formData.append("name", name.trim());
      if (company.trim()) formData.append("company", company.trim());
      formData.append("email", email.trim());
      if (message.trim()) formData.append("message", message.trim());
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch(`${baseUrl}/api/v1/user/contactUs`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.success) {
        setFeedback({
          type: "success",
          text: data?.message || "Thank you for contacting us. Our team will reach out soon.",
        });
        setSubject("");
        setName("");
        setCompany("");
        setEmail("");
        setMessage("");
        setFile(null);
      } else {
        setFeedback({
          type: "error",
          text: data?.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Unable to submit your request right now. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top bar with logo to match landing page vibe */}
      <header className="bg-gradient-to-r from-[#7030A0] to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <img src={Logo} alt="Boom logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold">Boom</span>
          </Link>
        </div>
      </header>

      {/* Content card */}
      <main className="flex-1 bg-gradient-to-b from-[#f5ecff] via-white to-white">
        <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 px-6 md:px-10 py-8 md:py-10">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#7030A0]">Contact Us</h1>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                Have a question, partnership idea, or feedback about the Boom ecosystem? Send us
                a note below. You do not need an account to reach out.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7030A0]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7030A0]"
                    placeholder="Company or organization"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7030A0]"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7030A0]"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#7030A0]"
                  placeholder="Share any details that will help us respond."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment (optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-700"
                />
              </div>

              {feedback && (
                <p
                  className={`text-sm ${
                    feedback.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {feedback.text}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#7030A0] text-white text-sm font-semibold hover:bg-[#5b2688] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Shared marketing footer */}
      <Footer />
    </div>
  );
};

export default Contact;

