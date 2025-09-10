import React from 'react';
import { 
  Video, 
  Users, 
  BarChart3, 
  Calendar, 
  CheckCircle, 
  Crown,
  Zap
} from 'lucide-react';

const Premium = () => {
  const premiumFeatures = [
    {
      icon: Video,
      title: 'Live Video Streaming',
      description: 'Host live market analysis, educational sessions, and Q&A with your audience.'
    },
    {
      icon: Users,
      title: 'Advanced Networking',
      description: 'Access premium member directory and exclusive networking events.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your engagement, follower growth, and content performance.'
    },
    {
      icon: Calendar,
      title: 'Event Management',
      description: 'Create and promote scheduled streams, webinars, and meetings.'
    }
  ];

  return (
    <section id="premium" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-[#7030A0] mr-2" />
            <span className="text-[#7030A0] font-semibold">Premium Features</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Unlock Your Full 
            <span className="text-[#7030A0]"> Potential</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take your financial networking to the next level with premium features 
            designed for serious professionals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="space-y-6">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-[#7030A0] bg-opacity-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-[#7030A0]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#7030A0] to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-yellow-400 mr-2" />
                <span className="text-2xl font-bold">Premium Plan</span>
              </div>
              <div className="text-4xl font-bold mb-2">
                $29<span className="text-xl font-normal">/month</span>
              </div>
              <p className="text-purple-100">
                Everything you need to grow your professional network
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                'Live video streaming capabilities',
                'Advanced analytics and insights',
                'Priority customer support',
                'Exclusive networking events',
                'Custom branding options',
                'API access for integrations'
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-white text-[#7030A0] py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            
            <p className="text-center text-purple-100 text-sm mt-4">
              14-day free trial • Cancel anytime
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Stream Your Success?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of financial professionals who are already using our platform 
            to share knowledge, build relationships, and grow their businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#7030A0] text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition-colors">
              Start Premium Trial
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Premium;