import { useState } from 'react';
import { Brain, Heart, Smile, Frown, Angry, Zap, MessageSquare } from 'lucide-react';
import EmotionalChatbot from '@/components/EmotionalChatbot';
import { toast } from '@/components/ui/use-toast';

const Analyze = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [textInput, setTextInput] = useState('');
  const [moodResult, setMoodResult] = useState<any>(null);
  const [analysisMethod, setAnalysisMethod] = useState<'buttons' | 'text'>('buttons');
  const [showChatbot, setShowChatbot] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moodOptions = [
    { value: 'happy', label: 'Happy', icon: Smile, color: 'bg-yellow-500', theme: 'yellow', emoji: '😊' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'bg-blue-500', theme: 'blue', emoji: '😢' },
    { value: 'angry', label: 'Angry', icon: Angry, color: 'bg-red-500', theme: 'red', emoji: '😠' },
    { value: 'excited', label: 'Excited', icon: Zap, color: 'bg-orange-500', theme: 'orange', emoji: '🤩' },
    { value: 'calm', label: 'Calm', icon: Heart, color: 'bg-green-500', theme: 'green', emoji: '😌' },
    { value: 'anxious', label: 'Anxious', icon: Brain, color: 'bg-purple-500', theme: 'purple', emoji: '😰' }
  ];

  const analyzeTextMoodWithAPI = async (text: string) => {
    try {
      setIsAnalyzing(true);
      
      // Using Hugging Face's free sentiment analysis API
      const response = await fetch(
        "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: text }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze mood');
      }

      const result = await response.json();
      console.log('API Response:', result);
      
      // The API returns sentiment labels like LABEL_0 (negative), LABEL_1 (neutral), LABEL_2 (positive)
      // We'll map these to our mood categories
      if (result && result[0]) {
        const topSentiment = result[0][0]; // Get the highest confidence result
        return mapSentimentToMood(topSentiment.label, topSentiment.score, text);
      }
      
      return 'calm'; // default fallback
    } catch (error) {
      console.error('Error analyzing mood:', error);
      toast({
        title: "Analysis Error",
        description: "Using fallback analysis method. Please try again.",
        variant: "destructive"
      });
      // Fallback to simple keyword analysis
      return analyzeTextMoodFallback(text);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const mapSentimentToMood = (label: string, score: number, text: string) => {
    const lowerText = text.toLowerCase();
    
    // Map sentiment to mood with additional context from text
    if (label === 'LABEL_2') { // Positive sentiment
      if (lowerText.includes('excited') || lowerText.includes('thrilled') || lowerText.includes('amazing')) {
        return 'excited';
      }
      return 'happy';
    } else if (label === 'LABEL_0') { // Negative sentiment
      if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('furious')) {
        return 'angry';
      } else if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('stressed')) {
        return 'anxious';
      }
      return 'sad';
    } else { // Neutral sentiment
      if (lowerText.includes('calm') || lowerText.includes('peaceful') || lowerText.includes('relaxed')) {
        return 'calm';
      }
      return 'calm';
    }
  };

  const analyzeTextMoodFallback = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Simple keyword-based mood detection as fallback
    if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('great') || lowerText.includes('wonderful') || lowerText.includes('amazing') || lowerText.includes('good')) {
      return 'happy';
    } else if (lowerText.includes('sad') || lowerText.includes('cry') || lowerText.includes('down') || lowerText.includes('depressed') || lowerText.includes('blue')) {
      return 'sad';
    } else if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('furious') || lowerText.includes('irritated') || lowerText.includes('annoyed')) {
      return 'angry';
    } else if (lowerText.includes('excited') || lowerText.includes('thrilled') || lowerText.includes('pumped') || lowerText.includes('energetic')) {
      return 'excited';
    } else if (lowerText.includes('calm') || lowerText.includes('peaceful') || lowerText.includes('relaxed') || lowerText.includes('serene')) {
      return 'calm';
    } else if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('nervous') || lowerText.includes('stressed') || lowerText.includes('overwhelmed')) {
      return 'anxious';
    } else {
      return 'calm';
    }
  };

  const getMoodAnalysis = (mood: string) => {
    const moodOption = moodOptions.find(m => m.value === mood);
    const analyses = {
      happy: {
        message: "You're radiating positive energy! Your happiness is contagious and brings light to those around you.",
        tips: ["Share your joy with others", "Practice gratitude", "Engage in activities you love"],
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        emoji: "😊"
      },
      sad: {
        message: "It's okay to feel sad. Your emotions are valid, and this feeling will pass. You're stronger than you know.",
        tips: ["Reach out to a friend", "Practice self-care", "Consider talking to someone"],
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        emoji: "😢"
      },
      angry: {
        message: "Your anger is telling you something important. Take time to understand what's triggering these feelings.",
        tips: ["Take deep breaths", "Step away from the situation", "Express yourself safely"],
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        emoji: "😠"
      },
      excited: {
        message: "Your energy is amazing! Channel this excitement into something productive and meaningful.",
        tips: ["Set new goals", "Start a creative project", "Share your enthusiasm"],
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        emoji: "🤩"
      },
      calm: {
        message: "Your inner peace is beautiful. This calm state is perfect for reflection and mindful decisions.",
        tips: ["Practice meditation", "Enjoy quiet moments", "Help others find peace"],
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        emoji: "😌"
      },
      anxious: {
        message: "Your mind is very active right now. Remember that anxiety often comes from caring deeply about things.",
        tips: ["Practice breathing exercises", "Break tasks into smaller steps", "Ground yourself in the present"],
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        emoji: "😰"
      }
    };
    
    const analysis = analyses[mood as keyof typeof analyses];
    return {
      ...analysis,
      moodEmoji: moodOption?.emoji || analysis.emoji
    };
  };

  const handleAnalyze = async () => {
    let detectedMood = '';
    
    if (analysisMethod === 'buttons' && selectedMood) {
      detectedMood = selectedMood;
    } else if (analysisMethod === 'text' && textInput.trim()) {
      detectedMood = await analyzeTextMoodWithAPI(textInput);
    }
    
    if (detectedMood) {
      const analysis = getMoodAnalysis(detectedMood);
      setMoodResult({ ...analysis, detectedMood });
    }
  };

  const resetAnalysis = () => {
    setMoodResult(null);
    setSelectedMood('');
    setTextInput('');
  };

  const handleChatbotClick = () => {
    setShowChatbot(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Mood Analysis</h1>
            <p className="text-gray-600 text-lg">Select your mood or describe how you're feeling to receive personalized insights</p>
          </div>

          {/* Analysis Method Selection and Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setAnalysisMethod('buttons')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    analysisMethod === 'buttons' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Quick Select
                </button>
                <button
                  onClick={() => setAnalysisMethod('text')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    analysisMethod === 'text' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  AI Analysis
                </button>
              </div>
            </div>

            {analysisMethod === 'buttons' ? (
              <>
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
                        <div className="text-2xl mb-2">{mood.emoji}</div>
                        <IconComponent className={`h-6 w-6 mx-auto mb-2 ${selectedMood === mood.value ? 'text-white' : 'text-gray-600'}`} />
                        <span className={`font-medium ${selectedMood === mood.value ? 'text-white' : 'text-gray-700'}`}>
                          {mood.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Tell us how you're feeling</h2>
                
                <div className="mb-8">
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Describe your current mood or feelings... (e.g., 'I feel really happy today because...' or 'I'm feeling anxious about...')"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                      rows={4}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Our AI will analyze your text to understand your mood using advanced sentiment analysis</p>
                </div>
              </>
            )}

            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={(!selectedMood && !textInput.trim()) || isAnalyzing}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze My Mood'}
              </button>
            </div>
          </div>

          {/* Results */}
          {moodResult && (
            <div className={`${moodResult.bgColor} ${moodResult.borderColor} border-2 rounded-2xl p-8 shadow-xl animate-fade-in`}>
              <div className="text-center mb-6">
                <div className={`inline-flex p-4 rounded-full ${moodOptions.find(m => m.value === moodResult.detectedMood)?.color} mb-4`}>
                  <div className="text-4xl">{moodResult.moodEmoji}</div>
                </div>
                <h3 className={`text-2xl font-bold ${moodResult.color} mb-4`}>
                  Your Mood: {moodOptions.find(m => m.value === moodResult.detectedMood)?.label} {moodResult.moodEmoji}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">{moodResult.message}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

              {/* Emotional Chatbot Button */}
              <div className="text-center mb-6">
                <button
                  onClick={handleChatbotClick}
                  className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto`}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat with Emotional Support Bot</span>
                </button>
                <p className="text-xs text-gray-500 mt-2">Get personalized emotional support through our AI chatbot</p>
              </div>

              <div className="text-center">
                <button
                  onClick={resetAnalysis}
                  className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Analyze Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chatbot Modal */}
      {showChatbot && (
        <EmotionalChatbot
          mood={moodResult?.detectedMood}
          context={analysisMethod === 'text' ? textInput : undefined}
          onClose={() => setShowChatbot(false)}
        />
      )}
    </div>
  );
};

export default Analyze;
