import playStoreImg from "../../../assets/play.png";
import appStoreImg from "../../../assets/apple.png";

const Hero = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="bg-[#7030A0] bg-opacity-10 px-4 py-2 rounded-full">
                <span className="text-[#7030A0] font-semibold text-sm">
                  🚀 Now Available on Mobile
                </span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Connect, Stream, and
              <span className="text-[#7030A0] block">Grow Together</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              The premier financial social networking platform where advisors,
              investors, and businesses connect to share insights, stream live
              content, and build meaningful professional relationships.
            </p>

            {/* Download Buttons */}
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

          <div className="relative">
            {/* <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/6964463/pexels-photo-6964463.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Financial professionals collaborating"
                className="rounded-2xl shadow-2xl"
              />
            </div> */}
            <div className="absolute top-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Live: Market Analysis
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">1,247 viewers</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
              <div className="text-sm font-semibold text-gray-700">
                Today's Engagement
              </div>
              <div className="text-2xl font-bold text-[#7030A0] mt-1">+47%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
