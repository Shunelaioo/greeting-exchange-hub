
import { Link } from 'react-router-dom';
import { Brain, Calendar, BarChart3, Heart, Zap, Sun } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "Analyze My Mood",
      description: "Get instant insights into your current emotional state with our advanced mood analysis.",
      link: "/analyze",
      color: "bg-purple-100 text-purple-600",
      hoverColor: "hover:bg-purple-600 hover:text-white"
    },
    {
      icon: Calendar,
      title: "Mood Journey",
      description: "Track your daily emotions, weather conditions, sleep patterns, and receive personalized support.",
      link: "/journey",
      color: "bg-blue-100 text-blue-600",
      hoverColor: "hover:bg-blue-600 hover:text-white"
    },
    {
      icon: BarChart3,
      title: "Mood History",
      description: "Visualize your emotional patterns and track your progress over time with detailed graphs.",
      link: "/history",
      color: "bg-green-100 text-green-600",
      hoverColor: "hover:bg-green-600 hover:text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-full shadow-lg">
              <Brain className="h-16 w-16 text-purple-600" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Understand Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {" "}Emotions
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover patterns in your mood, track your emotional journey, and receive 
            personalized insights to support your mental wellness.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link 
              to="/analyze"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              Start Analysis
            </Link>
            <Link 
              to="/journey"
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
            >
              Begin Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Path</h2>
          <p className="text-gray-600 text-lg">Select how you'd like to explore your emotional well-being</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link 
              key={index}
              to={feature.link}
              className="group"
            >
              <div className={`p-8 bg-white rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 border border-gray-100`}>
                <div className={`inline-flex p-4 rounded-full ${feature.color} group-${feature.hoverColor} transition-colors mb-6`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="mt-6 inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                  Get Started
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Track Your Mood?</h2>
            <p className="text-gray-600 text-lg">Understanding your emotions leads to better mental health</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex p-4 bg-red-100 text-red-600 rounded-full mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Better Self-Awareness</h3>
              <p className="text-gray-600">Recognize patterns and triggers in your emotional responses</p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 bg-yellow-100 text-yellow-600 rounded-full mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Improved Well-being</h3>
              <p className="text-gray-600">Make informed decisions about your mental health and lifestyle</p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 bg-orange-100 text-orange-600 rounded-full mb-4">
                <Sun className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Positive Growth</h3>
              <p className="text-gray-600">Track your progress and celebrate your emotional development</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
