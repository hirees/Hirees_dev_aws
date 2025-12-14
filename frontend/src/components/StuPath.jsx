
import React from 'react';
import { ArrowRight, BookOpen, Search, FileCheck, Trophy, Building2, Briefcase, Users, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '@/redux/store';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white shadow-sm">
    <div className="p-2 sm:p-3 rounded-lg bg-blue-600 flex-shrink-0">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </div>
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);

const PathSection = ({ badge, title, subtitle, features, ctaText, isReversed = false }) => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  const handleNavigation = () => {
    if (user) {
      navigate('/');
    } else {
      navigate('/signup/candidate');
    }
  };

  return (
    <div className={`w-full py-8 sm:py-12 lg:py-16 ${isReversed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}>
          {/* Content Column */}
          <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm sm:text-base">
              {badge}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {subtitle}
            </p>
            <button
              onClick={handleNavigation}
              className="group inline-flex items-center gap-2 sm:gap-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300"
            >
              <span>{user ? 'Go to Dashboard' : ctaText}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Features Column */}
          <div className="flex-1 w-full">
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StuPath = () => {
  const studentFeatures = [
    {
      icon: BookOpen,
      title: "Build Your Profile",
      description: "Showcase your skills and achievements"
    },
    {
      icon: Search,
      title: "Find Opportunities",
      description: "Access AI-matched jobs and internships"
    },
    {
      icon: FileCheck,
      title: "Easy Applications",
      description: "One-click apply with real-time tracking"
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Get personalized recommendations"
    }
  ];

  const recruiterFeatures = [
    {
      icon: Building2,
      title: "Employer Branding",
      description: "Create an attractive company presence"
    },
    {
      icon: Briefcase,
      title: "Post Positions",
      description: "Reach qualified candidates with AI"
    },
    {
      icon: Users,
      title: "Access Top Talent",
      description: "Connect with pre-vetted candidates"
    },
    {
      icon: UserCheck,
      title: "Smart Matching",
      description: "Find perfect candidates with AI"
    }
  ];

  return (
    <div className="w-full">
      <PathSection
        badge="For Students"
        title="Launch Your Career Journey"
        subtitle="Join thousands of students discovering their perfect career path through our platform."
        features={studentFeatures}
        ctaText="Get Started Now"
      />
    </div>
  );
};

export default StuPath;