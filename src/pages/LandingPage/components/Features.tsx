import React from 'react';
import { 
  Video, 
  MessageCircle, 
  Calendar, 
  Users, 
  TrendingUp, 
  Shield,
  Star,
  Camera
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Video,
      title: 'Live Video Streaming',
      description: 'Stream market analysis, educational content, and engage with your audience in real-time.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: MessageCircle,
      title: 'Private Messaging & Chat Rooms',
      description: 'Secure communication with file sharing capabilities and real-time group discussions.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Smart Calendar Integration',
      description: 'Schedule events, track IPOs, and never miss important market opportunities.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Users,
      title: 'Professional Community',
      description: 'Connect with verified financial advisors, investors, and business professionals.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Market Data',
      description: 'Integrated financial news and live market tickers to stay informed.',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Shield,
      title: 'Solid Security',
      description: 'Dual authentication, strong encryption, and comprehensive user verification.',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to 
            <span className="text-[#7030A0]"> Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed specifically for financial professionals 
            to connect, share insights, and grow their network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 bg-gradient-to-r from-[#7030A0] to-purple-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                What are you investing in today?
              </h3>
              <p className="text-purple-100 text-lg mb-6">
                Share your insights, discover opportunities, and engage with a community 
                that understands the markets like you do.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>Rated posts</span>
                </div>
                <div className="flex items-center">
                  <Camera className="h-5 w-5 text-purple-200 mr-1" />
                  <span>Rich media sharing</span>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur">
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="text-gray-800 text-sm">
                  "Just closed a major position in tech. The AI revolution is just beginning. 
                  What's everyone's take on semiconductor plays for Q2?"
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>$NVDA $AMD $INTC</span>
                  <div className="flex items-center space-x-2">
                    <span>⭐ 47</span>
                    <span>💬 23</span>
                  </div>
                </div>
              </div>
              <div className="text-purple-100 text-sm text-center">
                Sample post from the community
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Features;