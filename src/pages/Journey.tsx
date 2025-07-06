
import { useState } from 'react';
import { Calendar, Cloud, Bed, Star, Heart, Sparkles, Sun, Moon } from 'lucide-react';

const Journey = () => {
  const [journeyData, setJourneyData] = useState({
    mood: '',
    weather: '',
    sleep: '',
    dayQuality: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const moodOptions = [
    { value: 'excellent', label: 'Excellent', emoji: '😄', color: 'bg-gradient-to-r from-green-400 to-emerald-500', border: 'border-green-400' },
    { value: 'good', label: 'Good', emoji: '😊', color: 'bg-gradient-to-r from-blue-400 to-cyan-500', border: 'border-blue-400' },
    { value: 'okay', label: 'Okay', emoji: '😐', color: 'bg-gradient-to-r from-yellow-400 to-orange-500', border: 'border-yellow-400' },
    { value: 'poor', label: 'Poor', emoji: '😔', color: 'bg-gradient-to-r from-orange-400 to-red-500', border: 'border-orange-400' },
    { value: 'terrible', label: 'Terrible', emoji: '😢', color: 'bg-gradient-to-r from-red-400 to-pink-500', border: 'border-red-400' }
  ];

  const weatherOptions = [
    { value: 'sunny', label: 'Sunny', emoji: '☀️', gradient: 'from-yellow-400 to-orange-400' },
    { value: 'cloudy', label: 'Cloudy', emoji: '☁️', gradient: 'from-gray-400 to-blue-400' },
    { value: 'rainy', label: 'Rainy', emoji: '🌧️', gradient: 'from-blue-400 to-indigo-400' },
    { value: 'snowy', label: 'Snowy', emoji: '❄️', gradient: 'from-blue-200 to-cyan-300' },
    { value: 'stormy', label: 'Stormy', emoji: '⛈️', gradient: 'from-gray-600 to-purple-600' }
  ];

  const sleepOptions = [
    { value: 'excellent', label: 'Excellent (8+ hours)', emoji: '😴', gradient: 'from-green-400 to-emerald-400' },
    { value: 'good', label: 'Good (6-8 hours)', emoji: '😊', gradient: 'from-blue-400 to-cyan-400' },
    { value: 'fair', label: 'Fair (4-6 hours)', emoji: '😐', gradient: 'from-yellow-400 to-orange-400' },
    { value: 'poor', label: 'Poor (<4 hours)', emoji: '😵', gradient: 'from-red-400 to-pink-400' }
  ];

  const getSupportMessage = () => {
    const messages = {
      excellent: "What a wonderful day! Your positive energy is inspiring. Keep up the great work! ✨",
      good: "You're doing great! It's lovely to see you taking care of yourself and staying positive. 🌟",
      okay: "Every day doesn't have to be perfect. You're doing your best, and that's enough. 💙",
      poor: "It's okay to have difficult days. Remember, you're stronger than you think and tomorrow is a new opportunity. 🌈",
      terrible: "I'm sorry you're having such a tough time. Please be gentle with yourself and consider reaching out for support. 💜"
    };
    return messages[journeyData.mood as keyof typeof messages] || "Thank you for sharing your day with us. 🤗";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Journey data:', journeyData);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 py-12 relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Heart className="absolute top-20 left-20 h-8 w-8 text-pink-400 animate-float" />
          <Star className="absolute top-40 right-32 h-6 w-6 text-yellow-400 animate-sparkle" />
          <Sparkles className="absolute bottom-32 left-1/4 h-7 w-7 text-purple-400 animate-sparkle" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/50">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-50 animate-glow"></div>
                <Heart className="relative h-20 w-20 text-pink-500 mx-auto animate-float" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-6">Thank You! 🎉</h1>
              <p className="text-gray-600 mb-8 text-lg">Your mood journey has been recorded successfully.</p>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                  Today's Support Message
                </h3>
                <p className="text-gray-700 italic text-lg leading-relaxed">"{getSupportMessage()}"</p>
              </div>
              
              <button
                onClick={() => {
                  setSubmitted(false);
                  setJourneyData({ mood: '', weather: '', sleep: '', dayQuality: '', notes: '' });
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-glow"
              >
                Record Another Day ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 py-12 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-300/30 to-purple-300/30 animate-float"></div>
        <div className="absolute top-60 right-20 w-24 h-24 rounded-full bg-gradient-to-r from-pink-300/30 to-red-300/30 animate-float" style={{animationDelay: '2s'}}></div>
        <Calendar className="absolute top-32 right-1/4 h-8 w-8 text-blue-400 animate-sparkle" />
        <Sun className="absolute bottom-40 left-20 h-6 w-6 text-yellow-400 animate-sparkle" style={{animationDelay: '1.5s'}} />
        <Moon className="absolute top-80 left-1/3 h-7 w-7 text-indigo-400 animate-sparkle" style={{animationDelay: '3s'}} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50 animate-glow"></div>
              <Calendar className="relative h-20 w-20 text-blue-600 mx-auto" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Mood Journey
              </span>
            </h1>
            <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">Track your daily emotions and receive personalized support on your wellness journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/50 animate-fade-in">
            {/* Overall Mood */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Star className="h-6 w-6 mr-3 text-yellow-500" />
                How was your overall mood today?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setJourneyData({...journeyData, mood: option.value})}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 transform ${
                      journeyData.mood === option.value 
                        ? `${option.color} text-white border-transparent shadow-xl animate-glow` 
                        : 'bg-white/70 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="text-sm font-semibold">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Weather */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Cloud className="h-6 w-6 mr-3 text-blue-500" />
                What was the weather like?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weatherOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setJourneyData({...journeyData, weather: option.value})}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl ${
                      journeyData.weather === option.value 
                        ? `bg-gradient-to-r ${option.gradient} text-white border-transparent animate-glow` 
                        : 'bg-white/70 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="text-sm font-semibold">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Bed className="h-6 w-6 mr-3 text-purple-500" />
                How was your sleep?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sleepOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setJourneyData({...journeyData, sleep: option.value})}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 transform text-left shadow-lg hover:shadow-xl ${
                      journeyData.sleep === option.value 
                        ? `bg-gradient-to-r ${option.gradient} text-white border-transparent animate-glow` 
                        : 'bg-white/70 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-3xl mr-4">{option.emoji}</span>
                      <span className="font-semibold">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Day Quality */}
            <div className="mb-12">
              <label className="block text-2xl font-bold text-gray-800 mb-6">
                Rate your day overall (1-10):
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={journeyData.dayQuality}
                  onChange={(e) => setJourneyData({...journeyData, dayQuality: e.target.value})}
                  className="w-full h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>😢 Poor</span>
                  <span className="font-bold text-2xl text-gray-700 bg-white/80 px-4 py-2 rounded-full border-2 border-purple-300">
                    {journeyData.dayQuality || '5'}
                  </span>
                  <span>😄 Great</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-10">
              <label className="block text-2xl font-bold text-gray-800 mb-6">
                <Sparkles className="inline h-6 w-6 mr-2 text-purple-500" />
                Additional thoughts (optional):
              </label>
              <textarea
                value={journeyData.notes}
                onChange={(e) => setJourneyData({...journeyData, notes: e.target.value})}
                placeholder="How are you feeling? What happened today? Any thoughts you'd like to record... ✨"
                className="w-full p-6 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 resize-none bg-white/70 backdrop-blur-sm text-lg"
                rows={4}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!journeyData.mood || !journeyData.weather || !journeyData.sleep}
              className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105 animate-glow"
            >
              Save My Journey ✨
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Journey;
