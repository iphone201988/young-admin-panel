import React from 'react';
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  UserCheck, 
  FileCheck, 
  Eye,
  Smartphone
} from 'lucide-react';

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Dual Authentication',
      description: 'Multi-factor authentication keeps your account secure with SMS and app-based verification.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Lock,
      title: 'Strong Encryption',
      description: 'Bank-level encryption protects all your data and communications end-to-end.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: UserCheck,
      title: 'Identity Verification',
      description: 'CRD, EIN, and photo verification ensure authentic professional connections.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Eye,
      title: 'Privacy Controls',
      description: 'Granular privacy settings let you control who sees your content and profile.',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const verificationMethods = [
    {
      title: 'CRD Number Verification',
      description: 'For financial advisors and brokerage professionals',
      icon: FileCheck
    },
    {
      title: 'EIN Verification',
      description: 'For small businesses and corporate entities',
      icon: CheckCircle2
    },
    {
      title: 'Photo Verification',
      description: 'For all members to ensure authentic profiles',
      icon: UserCheck
    }
  ];

  return (
    <section id="security" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Security You Can 
            <span className="text-[#7030A0]"> Trust</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your financial data and professional reputation are precious. 
            That's why we've built enterprise-grade security into every aspect of our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Professional Verification Process
            </h3>
            <p className="text-gray-600 mb-8">
              Every member goes through our comprehensive verification process to ensure 
              you're connecting with legitimate financial professionals.
            </p>
            
            <div className="space-y-6">
              {verificationMethods.map((method, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-[#7030A0] bg-opacity-10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <method.icon className="h-5 w-5 text-[#7030A0]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {method.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {method.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-6">
              <div className="bg-[#7030A0] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-[#7030A0]" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Mobile App Security
              </h4>
              <p className="text-gray-600">
                Our iOS and Android apps feature biometric authentication and secure local storage.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                'Biometric login (Face ID / Touch ID)',
                'Secure push notifications',
                'Offline data encryption',
                'Remote device management'
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#7030A0] to-purple-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-purple-200" />
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Your Trust is Our Priority
          </h3>
          <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
            We're SOC 2 compliant and follow industry best practices to protect your data. 
            Your professional reputation and financial information are always secure.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2" />
              <span>Identity Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;