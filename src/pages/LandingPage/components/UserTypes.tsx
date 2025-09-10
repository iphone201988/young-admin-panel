import React from 'react';
import { 
  User, 
  Briefcase, 
  Building2, 
  Store, 
  Rocket, 
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const UserTypes = () => {
  const userTypes = [
    {
      icon: User,
      title: 'General Member',
      description: 'Individual investors and finance enthusiasts',
      features: ['Community access', 'Private messaging', 'News & market data', 'Basic networking'],
      badge: false
    },
    {
      icon: Briefcase,
      title: 'Financial Advisor',
      description: 'Certified financial advisors and wealth managers',
      features: ['CRD verification', 'Live streaming*', 'Client management', 'Premium features*'],
      badge: true
    },
    {
      icon: Building2,
      title: 'Financial Firm',
      description: 'Investment banks, wealth management firms',
      features: ['Company verification', 'Team management', 'Brand presence', 'Advanced analytics*'],
      badge: true
    },
    {
      icon: Store,
      title: 'Small Business',
      description: 'Small to medium business owners',
      features: ['EIN verification', 'Business networking', 'Growth resources', 'Customer tracking'],
      badge: true
    },
    {
      icon: Rocket,
      title: 'Startup',
      description: 'Early-stage companies and entrepreneurs',
      features: ['Pitch streaming*', 'Investor connections', 'Fundraising tools', 'Mentor matching'],
      badge: true
    },
    {
      icon: TrendingUp,
      title: 'Investor / VC',
      description: 'Venture capitalists and angel investors',
      features: ['Deal flow access', 'Portfolio management', 'Startup scouting', 'Market insights*'],
      badge: true
    }
  ];

  return (
    <section id="community" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Built for Every Type of 
            <span className="text-[#7030A0]"> Financial Professional</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're an advisor, investor, or entrepreneur, our platform 
            provides tailored experiences for your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userTypes.map((type, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
            >
              {type.badge && (
                <div className="absolute -top-3 right-4 bg-[#7030A0] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Verified
                </div>
              )}
              
              <div className="bg-[#7030A0] bg-opacity-10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <type.icon className="h-7 w-7 text-[#7030A0]" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {type.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {type.description}
              </p>

              <div className="space-y-2">
                {type.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-6">
            * Premium features available with paid subscription
          </p>
          <button className="bg-[#7030A0] text-white px-8 py-4 rounded-lg hover:bg-purple-800 transition-colors">
            Choose Your Account Type
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default UserTypes;