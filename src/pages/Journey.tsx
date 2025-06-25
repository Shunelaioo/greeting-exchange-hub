
import { useState } from 'react';
import { Calendar, Cloud, Bed, Star, Heart } from 'lucide-react';

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
    { value: 'excellent', label: 'Excellent', emoji: '😄', color: 'bg-green-500' },
    { value: 'good', label: 'Good', emoji: '😊', color: 'bg-blue-500' },
    { value: 'okay', label: 'Okay', emoji: '😐', color: 'bg-yellow-500' },
    { value: 'poor', label: 'Poor', emoji: '😔', color: 'bg-orange-500' },
    { value: 'terrible', label: 'Terrible', emoji: '😢', color: 'bg-red-500' }
  ];

  const weatherOptions = [
    { value: 'sunny', label: 'Sunny', emoji: '☀️' },
    { value: 'cloudy', label: 'Cloudy', emoji: '☁️' },
    { value: 'rainy', label: 'Rainy', emoji: '🌧️' },
    { value: 'snowy', label: 'Snowy', emoji: '❄️' },
    { value: 'stormy', label: 'Stormy', emoji: '⛈️' }
  ];

  const sleepOptions = [
    { value: 'excellent', label: 'Excellent (8+ hours)', emoji: '😴' },
    { value: 'good', label: 'Good (6-8 hours)', emoji: '😊' },
    { value: 'fair', label: 'Fair (4-6 hours)', emoji: '😐' },
    { value: 'poor', label: 'Poor (<4 hours)', emoji: '😵' }
  ];

  const getSupportMessage = () => {
    const messages = {
      excellent: "What a wonderful day! Your positive energy is inspiring. Keep up the great work!",
      good: "You're doing great! It's lovely to see you taking care of yourself and staying positive.",
      okay: "Every day doesn't have to be perfect. You're doing your best, and that's enough.",
      poor: "It's okay to have difficult days. Remember, you're stronger than you think and tomorrow is a new opportunity.",
      terrible: "I'm sorry you're having such a tough time. Please be gentle with yourself and consider reaching out for support."
    };
    return messages[journeyData.mood as keyof typeof messages] || "Thank you for sharing your day with us.";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically save to a database
    console.log('Journey data:', journeyData);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <Heart className="h-16 w-16 text-pink-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
              <p className="text-gray-600 mb-6">Your mood journey has been recorded successfully.</p>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Today's Support Message</h3>
                <p className="text-gray-700 italic">"{getSupportMessage()}"</p>
              </div>
              
              <button
                onClick={() => {
                  setSubmitted(false);
                  setJourneyData({ mood: '', weather: '', sleep: '', dayQuality: '', notes: '' });
                }}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Record Another Day
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Calendar className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Mood Journey</h1>
            <p className="text-gray-600 text-lg">Track your daily emotions and receive personalized support</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {/* Overall Mood */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                How was your overall mood today?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setJourneyData({...journeyData, mood: option.value})}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      journeyData.mood === option.value 
                        ? `${option.color} text-white border-transparent` 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Weather */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Cloud className="h-5 w-5 mr-2 text-blue-500" />
                What was the weather like?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {weatherOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setJourneyData({...journeyData, weather: option.value})}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      journeyData.weather === option.value 
                        ? 'bg-blue-500 text-white border-transparent' 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Bed className="h-5 w-5 mr-2 text-purple-500" />
                How was your sleep?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sleepOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setJourneyData({...journeyData, sleep: option.value})}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 text-left ${
                      journeyData.sleep === option.value 
                        ? 'bg-purple-500 text-white border-transparent' 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Day Quality */}
            <div className="mb-8">
              <label className="block text-xl font-semibold text-gray-800 mb-4">
                Rate your day overall (1-10):
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={journeyData.dayQuality}
                onChange={(e) => setJourneyData({...journeyData, dayQuality: e.target.value})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1</span>
                <span className="font-semibold text-gray-700">{journeyData.dayQuality || '5'}</span>
                <span>10</span>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <label className="block text-xl font-semibold text-gray-800 mb-4">
                Additional notes (optional):
              </label>
              <textarea
                value={journeyData.notes}
                onChange={(e) => setJourneyData({...journeyData, notes: e.target.value})}
                placeholder="How are you feeling? What happened today? Any thoughts you'd like to record..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!journeyData.mood || !journeyData.weather || !journeyData.sleep}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
            >
              Save My Journey
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Journey;
