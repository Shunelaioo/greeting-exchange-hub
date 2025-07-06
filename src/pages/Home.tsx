
import { Link } from 'react-router-dom';
import { Brain, Calendar, BarChart3, Heart, Zap, Sun, Sparkles, Star, Moon } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "Analyze My Mood",
      description: "Get instant insights into your current emotional state with our advanced mood analysis.",
      link: "/analyze",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      iconBg: "bg-gradient-to-r from-purple-100 to-pink-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Calendar,
      title: "Mood Journey",
      description: "Track your daily emotions, weather conditions, sleep patterns, and receive personalized support.",
      link: "/journey",
      gradient: "from-blue-400 via-cyan-500 to-teal-500",
      iconBg: "bg-gradient-to-r from-blue-100 to-cyan-100",
      iconColor: "text-blue-600"
    },
    {
      icon: BarChart3,
      title: "Mood History",
      description: "Visualize your emotional patterns and track your progress over time with detailed graphs.",
      link: "/history",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      iconBg: "bg-gradient-to-r from-green-100 to-emerald-100",
      iconColor: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-purple-300/30 to-pink-300/30 animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-300/30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-green-300/30 to-emerald-300/30 animate-float" style={{animationDelay: '4s'}}></div>
        
        {/* Sparkle elements */}
        <Sparkles className="absolute top-32 right-1/4 h-6 w-6 text-yellow-400 animate-sparkle" />
        <Star className="absolute top-64 left-1/3 h-4 w-4 text-pink-400 animate-sparkle" style={{animationDelay: '1s'}} />
        <Heart className="absolute bottom-40 right-1/3 h-5 w-5 text-red-400 animate-sparkle" style={{animationDelay: '3s'}} />
        <Moon className="absolute top-80 left-20 h-6 w-6 text-indigo-400 animate-sparkle" style={{animationDelay: '2.5s'}} />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75 animate-glow"></div>
              <div className="relative p-6 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border border-white/50">
                <Brain className="h-20 w-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight">
            Understand Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 animate-gradient">
              Emotions
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Discover patterns in your mood, track your emotional journey, and receive 
            personalized insights to support your mental wellness with our AI-powered companion.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link 
              to="/analyze"
              className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 animate-glow"
            >
              <span className="relative z-10">Start Analysis</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
            </Link>
            <Link 
              to="/journey"
              className="group px-10 py-4 border-3 border-purple-600 text-purple-600 rounded-2xl font-bold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 glass-effect"
            >
              Begin Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Choose Your Path</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">Select how you'd like to explore your emotional well-being with our beautiful, intuitive tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Link 
              key={index}
              to={feature.link}
              className="group animate-fade-in card-hover"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-6 rounded-3xl ${feature.iconBg} mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className={`h-10 w-10 ${feature.iconColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {feature.description}
                  </p>
                  
                  <div className="inline-flex items-center text-purple-600 font-bold text-lg group-hover:text-purple-700">
                    Get Started
                    <svg className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-white/90 to-purple-50/90 backdrop-blur-sm py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Why Track Your Mood?</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">Understanding your emotions leads to better mental health and a more fulfilling life</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="text-center animate-fade-in card-hover p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50" style={{animationDelay: '0.1s'}}>
              <div className="inline-flex p-6 bg-gradient-to-r from-red-100 to-pink-100 text-red-600 rounded-full mb-6 shadow-lg">
                <Heart className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Better Self-Awareness</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Recognize patterns and triggers in your emotional responses with detailed insights</p>
            </div>

            <div className="text-center animate-fade-in card-hover p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50" style={{animationDelay: '0.3s'}}>
              <div className="inline-flex p-6 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-600 rounded-full mb-6 shadow-lg">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Improved Well-being</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Make informed decisions about your mental health and lifestyle choices</p>
            </div>

            <div className="text-center animate-fade-in card-hover p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50" style={{animationDelay: '0.5s'}}>
              <div className="inline-flex p-6 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-600 rounded-full mb-6 shadow-lg">
                <Sun className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Positive Growth</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Track your progress and celebrate your emotional development journey</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
