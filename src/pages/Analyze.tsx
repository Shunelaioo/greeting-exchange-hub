
import { useState } from 'react';
import { Brain, Heart, Smile, Frown, Angry, Zap } from 'lucide-react';

const Analyze = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [moodResult, setMoodResult] = useState<any>(null);

  const moodOptions = [
    { value: 'happy', label: 'Happy', icon: Smile, color: 'bg-yellow-500', theme: 'yellow' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'bg-blue-500', theme: 'blue' },
    { value: 'angry', label: 'Angry', icon: Angry, color: 'bg-red-500', theme: 'red' },
    { value: 'excited', label: 'Excited', icon: Zap, color: 'bg-orange-500', theme: 'orange' },
    { value: 'calm', label: 'Calm', icon: Heart, color: 'bg-green-500', theme: 'green' },
    { value: 'anxious', label: 'Anxious', icon: Brain, color: 'bg-purple-500', theme: 'purple' }
  ];

  const getMoodAnalysis = (mood: string) => {
    const analyses = {
      happy: {
        message: "You're radiating positive energy! Your happiness is contagious and brings light to those around you.",
        tips: ["Share your joy with others", "Practice gratitude", "Engage in activities you love"],
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200"
      },
      sad: {
        message: "It's okay to feel sad. Your emotions are valid, and this feeling will pass. You're stronger than you know.",
        tips: ["Reach out to a friend", "Practice self-care", "Consider talking to someone"],
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      },
      angry: {
        message: "Your anger is telling you something important. Take time to understand what's triggering these feelings.",
        tips: ["Take deep breaths", "Step away from the situation", "Express yourself safely"],
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      },
      excited: {
        message: "Your energy is amazing! Channel this excitement into something productive and meaningful.",
        tips: ["Set new goals", "Start a creative project", "Share your enthusiasm"],
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
      },
      calm: {
        message: "Your inner peace is beautiful. This calm state is perfect for reflection and mindful decisions.",
        tips: ["Practice meditation", "Enjoy quiet moments", "Help others find peace"],
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      },
      anxious: {
        message: "Your mind is very active right now. Remember that anxiety often comes from caring deeply about things.",
        tips: ["Practice breathing exercises", "Break tasks into smaller steps", "Ground yourself in the present"],
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200"
      }
    };
    return analyses[mood as keyof typeof analyses];
  };

  const handleAnalyze = () => {
    if (selectedMood) {
      const analysis = getMoodAnalysis(selectedMood);
      setMoodResult(analysis);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Mood Analysis</h1>
            <p className="text-gray-600 text-lg">Select your current mood to receive personalized insights</p>
          </div>

          {/* Mood Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">How are you feeling right now?</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {moodOptions.map((mood) => {
                const IconComponent = mood.icon;
                return (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedMood === mood.value 
                        ? `${mood.color} text-white border-transparent shadow-lg` 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className={`h-8 w-8 mx-auto mb-2 ${selectedMood === mood.value ? 'text-white' : 'text-gray-600'}`} />
                    <span className={`font-medium ${selectedMood === mood.value ? 'text-white' : 'text-gray-700'}`}>
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={!selectedMood}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                Analyze My Mood
              </button>
            </div>
          </div>

          {/* Results */}
          {moodResult && (
            <div className={`${moodResult.bgColor} ${moodResult.borderColor} border-2 rounded-2xl p-8 shadow-xl animate-fade-in`}>
              <div className="text-center mb-6">
                <div className={`inline-flex p-4 rounded-full ${moodOptions.find(m => m.value === selectedMood)?.color} mb-4`}>
                  {(() => {
                    const selectedMoodOption = moodOptions.find(m => m.value === selectedMood);
                    if (selectedMoodOption) {
                      const IconComponent = selectedMoodOption.icon;
                      return <IconComponent className="h-8 w-8 text-white" />;
                    }
                    return null;
                  })()}
                </div>
                <h3 className={`text-2xl font-bold ${moodResult.color} mb-4`}>Your Mood Analysis</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{moodResult.message}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <h4 className={`font-semibold ${moodResult.color} mb-2`}>Recommended Actions</h4>
                  <ul className="text-gray-600 space-y-1">
                    {moodResult.tips.map((tip: string, index: number) => (
                      <li key={index} className="text-sm">• {tip}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <h4 className={`font-semibold ${moodResult.color} mb-2`}>Remember</h4>
                  <p className="text-gray-600 text-sm">All emotions are temporary and valid. You have the strength to navigate through any feeling.</p>
                </div>
                
                <div className="text-center">
                  <h4 className={`font-semibold ${moodResult.color} mb-2`}>Support</h4>
                  <p className="text-gray-600 text-sm">If you need additional support, consider reaching out to friends, family, or mental health professionals.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyze;
