
import { useState } from 'react';
import { Brain, Sparkles, Heart, Sun, Cloud, CloudRain, Snowflake, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Analyze = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [feelingsText, setFeelingsText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedWeather, setSelectedWeather] = useState('');

  const weatherOptions = [
    { value: 'sunny', label: 'Sunny', icon: Sun },
    { value: 'cloudy', label: 'Cloudy', icon: Cloud },
    { value: 'rainy', label: 'Rainy', icon: CloudRain },
    { value: 'snowy', label: 'Snowy', icon: Snowflake },
  ];

  const handleAnalyze = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to analyze your mood.",
        variant: "destructive",
      });
      return;
    }

    if (!feelingsText.trim()) {
      toast({
        title: "Missing Input",
        description: "Please tell us how you're feeling first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simple mood analysis based on keywords (replace with Hugging Face API if you have a key)
      const analysisResult = analyzeMoodLocally(feelingsText);
      
      // Save to database
      const { data, error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood: analysisResult.mood,
          emoji: analysisResult.emoji,
          feelings_text: feelingsText,
          weather: selectedWeather || null,
          message: analysisResult.message,
          suggested_activities: analysisResult.suggested_activities,
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving mood entry:', error);
        throw error;
      }

      setResult(analysisResult);
      
      toast({
        title: "Mood Analyzed Successfully! ✨",
        description: "Your mood has been analyzed and saved to your journey.",
      });

    } catch (error) {
      console.error('Error analyzing mood:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your mood. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Local mood analysis function (fallback)
  const analyzeMoodLocally = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Simple keyword-based analysis
    const positiveWords = ['happy', 'joy', 'great', 'amazing', 'wonderful', 'excited', 'love', 'good', 'fantastic', 'awesome'];
    const negativeWords = ['sad', 'angry', 'frustrated', 'terrible', 'awful', 'hate', 'bad', 'horrible', 'depressed', 'upset'];
    const neutralWords = ['okay', 'fine', 'alright', 'normal', 'usual'];

    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveCount++;
    });

    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });

    neutralWords.forEach(word => {
      if (lowerText.includes(word)) neutralCount++;
    });

    let mood, emoji, message, theme, activities;

    if (positiveCount > negativeCount && positiveCount > neutralCount) {
      mood = 'great';
      emoji = '😊';
      message = "You're feeling positive today! That's wonderful to see.";
      theme = 'positive';
      activities = [
        "Continue doing what makes you happy",
        "Share your positive energy with others",
        "Try a new hobby or activity",
        "Spend time in nature"
      ];
    } else if (negativeCount > positiveCount && negativeCount > neutralCount) {
      mood = 'poor';
      emoji = '😔';
      message = "It sounds like you're going through a tough time. Remember, this feeling will pass.";
      theme = 'supportive';
      activities = [
        "Take deep breaths and practice mindfulness",
        "Talk to someone you trust",
        "Do something kind for yourself",
        "Try gentle exercise like walking"
      ];
    } else {
      mood = 'okay';
      emoji = '😐';
      message = "You seem to be in a neutral state today. That's perfectly normal.";
      theme = 'balanced';
      activities = [
        "Try something new to spark interest",
        "Connect with friends or family",
        "Practice gratitude",
        "Do a small creative activity"
      ];
    }

    return {
      mood,
      emoji,
      message,
      theme,
      suggested_activities: activities
    };
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to analyze your mood</h2>
          <p className="text-gray-600">You need to be logged in to track and save your mood analysis.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-purple-300/30 to-pink-300/30 animate-float blur-2xl"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-300/30 animate-float blur-xl" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-pink-300/40 to-purple-300/40 animate-float blur-lg" style={{animationDelay: '4s'}}></div>
        
        {/* Sparkle decorations */}
        <Sparkles className="absolute top-32 right-1/4 h-6 w-6 text-purple-400 animate-sparkle drop-shadow-lg" />
        <Heart className="absolute bottom-40 left-1/4 h-8 w-8 text-pink-400 animate-sparkle drop-shadow-lg" style={{animationDelay: '1s'}} />
        <Star className="absolute top-2/3 right-10 h-5 w-5 text-blue-400 animate-sparkle drop-shadow-lg" style={{animationDelay: '3s'}} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-xl opacity-60 animate-glow"></div>
                <div className="relative p-6 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border-4 border-white/60 group-hover:scale-110 transition-transform duration-500">
                  <Brain className="h-16 w-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 leading-tight">
              Analyze Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient">
                Beautiful Mood
              </span>
            </h1>
            <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">Share your feelings and let our AI provide personalized insights and suggestions to brighten your day ✨</p>
          </div>

          {/* Main Analysis Card */}
          <div className="bg-gradient-to-r from-white/95 via-purple-50/90 to-pink-50/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border-2 border-white/50 animate-fade-in" style={{animationDelay: '0.2s'}}>
            
            {/* Weather Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Sun className="h-5 w-5 mr-2 text-yellow-500" />
                What's the weather like today?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {weatherOptions.map((weather) => {
                  const IconComponent = weather.icon;
                  return (
                    <button
                      key={weather.value}
                      onClick={() => setSelectedWeather(weather.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 hover:scale-105 ${
                        selectedWeather === weather.value
                          ? 'border-purple-500 bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg'
                          : 'border-gray-200 bg-white/60 hover:border-purple-300'
                      }`}
                    >
                      <IconComponent className={`h-6 w-6 ${
                        selectedWeather === weather.value ? 'text-purple-600' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm font-medium ${
                        selectedWeather === weather.value ? 'text-purple-800' : 'text-gray-700'
                      }`}>
                        {weather.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feelings Input */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-800 mb-4">
                How are you feeling today? Share whatever is on your mind... 💭
              </label>
              <textarea
                value={feelingsText}
                onChange={(e) => setFeelingsText(e.target.value)}
                placeholder="I'm feeling excited about my new project, but also a bit nervous about the presentation tomorrow..."
                className="w-full h-40 p-6 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 resize-none text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm shadow-inner text-base leading-relaxed"
                disabled={isAnalyzing}
              />
            </div>

            {/* Analyze Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !feelingsText.trim()}
                className={`px-12 py-4 rounded-2xl font-black text-lg transition-all duration-500 shadow-2xl ${
                  isAnalyzing || !feelingsText.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:scale-110 hover:shadow-3xl animate-glow'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                    Analyzing Your Beautiful Mind...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="h-6 w-6 mr-3 animate-sparkle" />
                    Analyze My Mood ✨
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-gradient-to-r from-white/95 via-blue-50/90 to-green-50/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-white/50 animate-fade-in">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 animate-bounce">{result.emoji}</div>
                <h2 className="text-3xl font-black text-gray-800 mb-4">Your Mood Analysis</h2>
                <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
                  {result.message}
                </p>
              </div>

              {result.suggested_activities && result.suggested_activities.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-white/60">
                  <h3 className="text-2xl font-black text-gray-800 mb-6 text-center flex items-center justify-center">
                    <Heart className="h-6 w-6 mr-3 text-pink-500" />
                    Suggested Activities Just for You
                    <Sparkles className="h-6 w-6 ml-3 text-purple-500 animate-sparkle" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.suggested_activities.map((activity: string, index: number) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-r from-purple-100/80 to-pink-100/80 rounded-xl border-2 border-white/60 hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <p className="text-gray-700 font-medium text-center">
                          {activity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyze;
