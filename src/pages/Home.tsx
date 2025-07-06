
import { Link } from 'react-router-dom';
import { Brain, Calendar, BarChart3, Heart, Zap, Sun, Sparkles, Star, Moon, Rainbow, Flower2 } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "Analyze My Mood",
      description: "Get instant insights into your current emotional state with our advanced mood analysis powered by AI magic.",
      link: "/analyze",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      iconBg: "bg-gradient-to-r from-purple-100 to-pink-100",
      iconColor: "text-purple-600",
      hoverGradient: "from-purple-500 via-pink-600 to-red-600"
    },
    {
      icon: Calendar,
      title: "Mood Journey",
      description: "Track your daily emotions, weather conditions, sleep patterns, and receive personalized support on your wellness adventure.",
      link: "/journey",
      gradient: "from-blue-400 via-cyan-500 to-teal-500",
      iconBg: "bg-gradient-to-r from-blue-100 to-cyan-100",
      iconColor: "text-blue-600",
      hoverGradient: "from-blue-500 via-cyan-600 to-teal-600"
    },
    {
      icon: BarChart3,
      title: "Mood History",
      description: "Visualize your emotional patterns and track your progress over time with beautiful, detailed graphs and insights.",
      link: "/history",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      iconBg: "bg-gradient-to-r from-green-100 to-emerald-100",
      iconColor: "text-green-600",
      hoverGradient: "from-green-500 via-emerald-600 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Medium floating orbs */}
        <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-300/30 animate-float blur-lg" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-green-300/30 to-emerald-300/30 animate-float blur-xl" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-yellow-300/40 to-orange-300/40 animate-float blur-lg" style={{animationDelay: '1s'}}></div>
        
        {/* Enhanced sparkle elements */}
        <Sparkles className="absolute top-32 right-1/4 h-8 w-8 text-yellow-400 animate-sparkle drop-shadow-lg" />
        <Star className="absolute top-64 left-1/3 h-6 w-6 text-pink-400 animate-sparkle drop-shadow-lg" style={{animationDelay: '1s'}} />
        <Heart className="absolute bottom-40 right-1/3 h-7 w-7 text-red-400 animate-sparkle drop-shadow-lg" style={{animationDelay: '3s'}} />
        <Moon className="absolute top-80 left-20 h-8 w-8 text-indigo-400 animate-sparkle drop-shadow-lg" style={{animationDelay: '2.5s'}} />
        <Rainbow className="absolute bottom-60 right-20 h-6 w-6 text-purple-400 animate-sparkle drop-shadow-lg" style={{animationDelay: '4s'}} />
        <Flower2 className="absolute top-96 right-1/4 h-7 w-7 text-pink-500 animate-float drop-shadow-lg" style={{animationDelay: '1.5s'}} />
        <Flower2 className="absolute bottom-32 left-1/3 h-6 w-6 text-emerald-400 animate-sparkle drop-shadow-lg" style={{animationDelay: '3.5s'}} />
        
        {/* Additional floating mini elements */}
        <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-pink-300 rounded-full animate-bounce opacity-70" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute top-3/4 left-1/4 w-5 h-5 bg-blue-300 rounded-full animate-bounce opacity-50" style={{animationDelay: '2.1s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-6xl mx-auto animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-full blur-xl opacity-60 animate-glow group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-40 animate-pulse"></div>
              <div className="relative p-6 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border-4 border-white/80 group-hover:scale-110 transition-transform duration-500 animate-float">
                <Brain className="h-16 w-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse" />
              </div>
              {/* Magical sparkles around the brain */}
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-sparkle" />
              <Star className="absolute -bottom-2 -left-2 h-5 w-5 text-pink-400 animate-sparkle" style={{animationDelay: '1s'}} />
              <Heart className="absolute top-1/2 -right-4 h-4 w-4 text-red-400 animate-sparkle" style={{animationDelay: '0.5s'}} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 leading-tight tracking-tight">
            Understand Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 animate-gradient drop-shadow-lg">
              Beautiful Mind
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
            Discover the magic in your emotions, track your wellness journey, and receive 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold"> personalized insights </span>
            to nurture your mental health with our AI-powered companion ✨
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link 
              to="/analyze"
              className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white rounded-2xl font-bold text-base hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105 animate-glow overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                Start Your Journey
                <Heart className="ml-2 h-5 w-5 animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            </Link>
            <Link 
              to="/journey"
              className="group px-6 py-3 border-3 border-purple-600 text-purple-600 rounded-2xl font-bold text-base hover:bg-purple-600 hover:text-white transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 glass-effect backdrop-blur-lg bg-white/30 hover:border-pink-500"
            >
              <span className="flex items-center justify-center">
                <Calendar className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Begin Adventure
                <Star className="ml-2 h-5 w-5 group-hover:animate-spin" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-8 tracking-tight">Choose Your Path</h2>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto font-medium leading-relaxed">Select how you'd like to explore your emotional well-being with our magical, intuitive tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-8xl mx-auto">
          {features.map((feature, index) => (
            <Link 
              key={index}
              to={feature.link}
              className="group animate-fade-in transform hover:scale-105 transition-all duration-500"
              style={{animationDelay: `${index * 0.3}s`}}
            >
              <div className="relative p-10 bg-white/90 backdrop-blur-lg rounded-4xl shadow-2xl border-2 border-white/60 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:border-purple-300/50">
                {/* Enhanced background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-700`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.hoverGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-8 rounded-4xl ${feature.iconBg} mb-10 group-hover:scale-125 transition-transform duration-500 shadow-xl group-hover:shadow-2xl border-2 border-white/50`}>
                    <feature.icon className={`h-12 w-12 ${feature.iconColor} group-hover:animate-pulse`} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-800 mb-6 group-hover:text-purple-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-8 text-base font-medium">
                    {feature.description}
                  </p>
                  
                  <div className="inline-flex items-center text-purple-600 font-bold text-lg group-hover:text-purple-700 group-hover:scale-105 transition-all duration-300">
                    <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                    Get Started
                    <svg className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="bg-gradient-to-r from-white/95 via-purple-50/95 to-pink-50/95 backdrop-blur-sm py-24 relative border-y-4 border-purple-200/30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-pink-100/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-8 tracking-tight">Why Track Your Mood?</h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto font-medium leading-relaxed">Understanding your emotions leads to better mental health and a more fulfilling, joyful life ✨</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <div className="text-center animate-fade-in transform hover:scale-105 transition-all duration-500 p-10 bg-white/80 backdrop-blur-sm rounded-4xl shadow-xl border-2 border-white/60 hover:shadow-2xl group" style={{animationDelay: '0.1s'}}>
              <div className="inline-flex p-8 bg-gradient-to-r from-red-100 via-pink-100 to-rose-100 text-red-600 rounded-full mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500 border-2 border-pink-200/50">
                <Heart className="h-12 w-12 group-hover:animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-6 group-hover:text-red-600 transition-colors">Better Self-Awareness</h3>
              <p className="text-gray-600 text-base leading-relaxed font-medium">Recognize patterns and triggers in your emotional responses with detailed, loving insights that help you grow</p>
            </div>

            <div className="text-center animate-fade-in transform hover:scale-105 transition-all duration-500 p-10 bg-white/80 backdrop-blur-sm rounded-4xl shadow-xl border-2 border-white/60 hover:shadow-2xl group" style={{animationDelay: '0.3s'}}>
              <div className="inline-flex p-8 bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100 text-yellow-600 rounded-full mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500 border-2 border-yellow-200/50">
                <Zap className="h-12 w-12 group-hover:animate-bounce" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-6 group-hover:text-yellow-600 transition-colors">Improved Well-being</h3>
              <p className="text-gray-600 text-base leading-relaxed font-medium">Make informed, positive decisions about your mental health and lifestyle choices with confidence and joy</p>
            </div>

            <div className="text-center animate-fade-in transform hover:scale-105 transition-all duration-500 p-10 bg-white/80 backdrop-blur-sm rounded-4xl shadow-xl border-2 border-white/60 hover:shadow-2xl group" style={{animationDelay: '0.5s'}}>
              <div className="inline-flex p-8 bg-gradient-to-r from-orange-100 via-yellow-100 to-lime-100 text-orange-600 rounded-full mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500 border-2 border-orange-200/50">
                <Sun className="h-12 w-12 group-hover:animate-spin" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-6 group-hover:text-orange-600 transition-colors">Positive Growth</h3>
              <p className="text-gray-600 text-base leading-relaxed font-medium">Track your beautiful progress and celebrate your emotional development journey with pride and happiness</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
