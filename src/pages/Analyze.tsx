
import { useState } from 'react';
import { Brain, Heart, Smile, Frown, Angry, Zap, MessageSquare, Key } from 'lucide-react';
import EmotionalChatbot from '@/components/EmotionalChatbot';
import { toast } from '@/components/ui/use-toast';

const Analyze = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [textInput, setTextInput] = useState('');
  const [moodResult, setMoodResult] = useState<any>(null);
  const [analysisMethod, setAnalysisMethod] = useState<'buttons' | 'text'>('buttons');
  const [showChatbot, setShowChatbot] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [openaiKey, setOpenaiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const moodOptions = [
    { value: 'happy', label: 'Happy', icon: Smile, color: 'bg-yellow-500', theme: 'yellow', emoji: '😊' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'bg-blue-500', theme: 'blue', emoji: '😢' },
    { value: 'angry', label: 'Angry', icon: Angry, color: 'bg-red-500', theme: 'red', emoji: '😠' },
    { value: 'excited', label: 'Excited', icon: Zap, color: 'bg-orange-500', theme: 'orange', emoji: '🤩' },
    { value: 'calm', label: 'Calm', icon: Heart, color: 'bg-green-500', theme: 'green', emoji: '😌' },
    { value: 'anxious', label: 'Anxious', icon: Brain, color: 'bg-purple-500', theme: 'purple', emoji: '😰' }
  ];

  const saveApiKey = () => {
    if (openaiKey.trim()) {
      localStorage.setItem('openai_api_key', openaiKey.trim());
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved locally.",
      });
    }
  };

  const analyzeTextMoodWithAPI = async (text: string) => {
    try {
      setIsAnalyzing(true);
      
      const apiKey = localStorage.getItem('openai_api_key');
      if (!apiKey) {
        toast({
          title: "API Key Required",
          description: "Please add your OpenAI API key to use AI analysis.",
          variant: "destructive"
        });
        throw new Error('No API key provided');
      }

      console.log('Starting OpenAI analysis for text:', text);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an emotion analysis expert. Analyze the given text and respond with ONLY ONE of these emotions: happy, sad, angry, excited, calm, anxious. 
              
              Guidelines:
              - "tired", "exhausted", "drained" = sad
              - "excited", "thrilled", "energetic" = excited
              - "worried", "stressed", "nervous" = anxious
              - "angry", "mad", "furious" = angry
              - "happy", "joyful", "glad" = happy
              - "peaceful", "relaxed", "serene" = calm
              
              Respond with just the emotion word, nothing else.`
            },
            {
              role: 'user',
              content: text
            }
          ],
          max_tokens: 10,
          temperature: 0.1
        })
      });

      console.log('OpenAI Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(`OpenAI API request failed: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('OpenAI response data:', data);
      
      const detectedEmotion = data.choices[0]?.message?.content?.trim().toLowerCase();
      console.log('Detected emotion:', detectedEmotion);
      
      // Validate the response is one of our expected emotions
      const validEmotions = ['happy', 'sad', 'angry', 'excited', 'calm', 'anxious'];
      if (validEmotions.includes(detectedEmotion)) {
        return detectedEmotion;
      } else {
        // Fallback mapping if the response isn't exact
        const lowerText = text.toLowerCase();
        if (lowerText.includes('tired') || lowerText.includes('exhausted')) return 'sad';
        if (lowerText.includes('excited') || lowerText.includes('thrilled')) return 'excited';
        if (lowerText.includes('worried') || lowerText.includes('anxious')) return 'anxious';
        if (lowerText.includes('angry') || lowerText.includes('mad')) return 'angry';
        if (lowerText.includes('happy') || lowerText.includes('joyful')) return 'happy';
        if (lowerText.includes('calm') || lowerText.includes('peaceful')) return 'calm';
        
        // Default fallback
        return 'calm';
      }
    } catch (error) {
      console.error('Error analyzing mood:', error);
      toast({
        title: "AI Analysis Failed",
        description: `Unable to analyze with OpenAI API: ${error.message}`,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getMoodAnalysis = (mood: string, userText?: string) => {
    const moodOption = moodOptions.find(m => m.value === mood);
    
    const generateContextualMessage = (baseMood: string, text?: string) => {
      if (!text) {
        const defaultMessages = {
          happy: "You're radiating positive energy! Your happiness is contagious and brings light to those around you.",
          sad: "It's okay to feel sad. Your emotions are valid, and this feeling will pass. You're stronger than you know.",
          angry: "Your anger is telling you something important. Take time to understand what's triggering these feelings.",
          excited: "Your energy is amazing! Channel this excitement into something productive and meaningful.",
          calm: "Your inner peace is beautiful. This calm state is perfect for reflection and mindful decisions.",
          anxious: "Your mind is very active right now. Remember that anxiety often comes from caring deeply about things."
        };
        return defaultMessages[baseMood as keyof typeof defaultMessages] || defaultMessages.calm;
      }

      const lowerText = text.toLowerCase();
      
      switch (baseMood) {
        case 'sad':
          if (lowerText.includes('tired') || lowerText.includes('exhausted')) {
            return "Feeling tired can weigh heavily on your spirit. Your body and mind are telling you they need rest and care. This exhaustion is your system's way of asking for gentleness and recovery time.";
          } else if (lowerText.includes('lonely')) {
            return "Loneliness can feel overwhelming, but you're not alone in feeling this way. Connection and support are within reach, and reaching out is a sign of strength.";
          } else if (lowerText.includes('disappointed')) {
            return "Disappointment shows how much you care about outcomes. This caring nature is actually a strength, even when things don't go as planned.";
          }
          return "Your sadness is valid and temporary. These difficult feelings often lead to growth and deeper understanding of yourself.";
          
        case 'happy':
          if (lowerText.includes('excited')) {
            return "Your excitement is infectious! This positive energy can inspire and uplift everyone around you. You're in a beautiful state of anticipation and joy.";
          } else if (lowerText.includes('grateful')) {
            return "Gratitude transforms ordinary moments into blessings. Your appreciation for life is beautiful and creates a positive ripple effect.";
          } else if (lowerText.includes('proud')) {
            return "Feeling proud of yourself is wonderful! You've earned this moment of recognition and joy. Celebrate your achievements.";
          }
          return "Your happiness lights up the world around you. Embrace this beautiful energy you're radiating and let it flow freely.";
          
        case 'angry':
          if (lowerText.includes('frustrated')) {
            return "Frustration often comes from caring deeply about something important to you. This passion can be channeled constructively once you understand its source.";
          } else if (lowerText.includes('annoyed')) {
            return "These feelings of annoyance are signals about your boundaries. Take time to understand what needs to change or what limits need to be set.";
          }
          return "Your anger contains important information about your values and boundaries. Listen to what it's trying to tell you about your needs.";
          
        case 'anxious':
          if (lowerText.includes('worried')) {
            return "Worry shows how much you care about the future and the people in your life. Let's channel this concern into positive, actionable steps.";
          } else if (lowerText.includes('stressed')) {
            return "Stress is your mind's way of highlighting what matters most to you. You have the inner tools to manage this and find your center again.";
          } else if (lowerText.includes('nervous')) {
            return "Nervousness often appears before meaningful moments in life. Your courage to face these feelings shows your strength and growth.";
          }
          return "Your anxious thoughts show how deeply you think about life and its possibilities. This awareness can be transformed into purposeful action.";
          
        case 'excited':
          if (lowerText.includes('thrilled')) {
            return "Your enthusiasm is absolutely contagious! This high energy can fuel amazing achievements and create wonderful experiences for yourself and others.";
          } else if (lowerText.includes('energetic')) {
            return "This vibrant energy you're feeling is a precious gift. Use it to pursue what truly matters to you and make positive changes.";
          }
          return "Your excitement opens doors to new possibilities and adventures. Ride this beautiful wave of positive momentum!";
          
        case 'calm':
          if (lowerText.includes('peaceful')) {
            return "This sense of peace you're experiencing is precious and healing. It's a foundation for clarity, wisdom, and meaningful decisions.";
          } else if (lowerText.includes('relaxed')) {
            return "Your relaxed state is allowing your natural wisdom and intuition to emerge. Trust this inner guidance and embrace the stillness.";
          }
          return "Your calmness is a strength that helps you navigate life with grace, mindfulness, and inner wisdom.";
          
        default:
          return "Your feelings are valid and important. Every emotion carries wisdom and helps you understand yourself better.";
      }
    };

    const generateContextualTips = (baseMood: string, text?: string) => {
      const lowerText = text?.toLowerCase() || '';
      
      switch (baseMood) {
        case 'sad':
          if (lowerText.includes('tired') || lowerText.includes('exhausted')) {
            return [
              "Prioritize 7-9 hours of quality sleep tonight", 
              "Take short 5-minute breaks every hour today", 
              "Try gentle stretching or light yoga",
              "Consider a warm bath or shower to relax",
              "Limit caffeine and focus on hydrating foods"
            ];
          } else if (lowerText.includes('lonely')) {
            return [
              "Reach out to one friend or family member today", 
              "Join a local community group or online community", 
              "Practice loving-kindness meditation",
              "Write a letter to someone you care about",
              "Consider volunteering to connect with others"
            ];
          }
          return [
            "Allow yourself to feel this emotion without judgment", 
            "Reach out to someone you trust for support", 
            "Practice gentle self-care activities",
            "Consider journaling about your feelings",
            "Take a nature walk if possible"
          ];
          
        case 'happy':
          if (lowerText.includes('excited')) {
            return [
              "Channel this energy into a meaningful project", 
              "Share your enthusiasm with friends and family", 
              "Document this positive moment in a journal",
              "Use this energy for physical activity or exercise",
              "Plan something fun to look forward to"
            ];
          }
          return [
            "Share your joy with others around you", 
            "Practice gratitude by writing down three good things", 
            "Engage in activities that bring you even more joy",
            "Take photos or create memories of this moment",
            "Consider doing something kind for someone else"
          ];
          
        case 'angry':
          if (lowerText.includes('frustrated')) {
            return [
              "Take 10 deep breaths before responding", 
              "Identify what specific aspect you can control", 
              "Express your feelings through writing or art",
              "Take a brief walk to clear your head",
              "Focus on solutions rather than the problem"
            ];
          }
          return [
            "Practice deep breathing for 5 minutes", 
            "Step away from the triggering situation temporarily", 
            "Express yourself through physical activity",
            "Talk to a trusted friend about your feelings",
            "Consider what boundary needs to be set"
          ];
          
        case 'anxious':
          if (lowerText.includes('worried')) {
            return [
              "List what you can control vs. what you can't", 
              "Practice the 5-4-3-2-1 grounding technique", 
              "Break your concerns into smaller, manageable steps",
              "Set aside 10 minutes for 'worry time' then move on",
              "Talk to someone who can offer perspective"
            ];
          } else if (lowerText.includes('stressed')) {
            return [
              "Prioritize your top 3 most important tasks only", 
              "Take 5-minute breaks between activities", 
              "Practice box breathing (4-4-4-4 pattern)",
              "Delegate tasks if possible",
              "Focus on progress, not perfection"
            ];
          }
          return [
            "Practice the 4-7-8 breathing technique", 
            "Ground yourself using your five senses", 
            "Break overwhelming tasks into tiny steps",
            "Limit news and social media if they increase anxiety",
            "Consider talking to a counselor or therapist"
          ];
          
        case 'excited':
          return [
            "Set specific, achievable goals for this energy", 
            "Start a creative project you've been putting off", 
            "Share your excitement with supportive people",
            "Channel energy into learning something new",
            "Plan an adventure or new experience"
          ];
          
        case 'calm':
          return [
            "Use this clarity to make important decisions", 
            "Practice meditation or mindfulness exercises", 
            "Help others find their sense of peace",
            "Reflect on your goals and values",
            "Create a peaceful environment around you"
          ];
          
        default:
          return [
            "Listen to your inner wisdom and intuition", 
            "Take care of your basic needs (sleep, food, water)", 
            "Be patient and gentle with yourself",
            "Consider what this emotion is trying to tell you",
            "Seek support if you need it"
          ];
      }
    };

    const analyses = {
      happy: {
        message: generateContextualMessage('happy', userText),
        tips: generateContextualTips('happy', userText),
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        emoji: "😊"
      },
      sad: {
        message: generateContextualMessage('sad', userText),
        tips: generateContextualTips('sad', userText),
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        emoji: "😢"
      },
      angry: {
        message: generateContextualMessage('angry', userText),
        tips: generateContextualTips('angry', userText),
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        emoji: "😠"
      },
      excited: {
        message: generateContextualMessage('excited', userText),
        tips: generateContextualTips('excited', userText),
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        emoji: "🤩"
      },
      calm: {
        message: generateContextualMessage('calm', userText),
        tips: generateContextualTips('calm', userText),
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        emoji: "😌"
      },
      anxious: {
        message: generateContextualMessage('anxious', userText),
        tips: generateContextualTips('anxious', userText),
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
      try {
        detectedMood = await analyzeTextMoodWithAPI(textInput);
      } catch (error) {
        return;
      }
    }
    
    if (detectedMood) {
      const analysis = getMoodAnalysis(detectedMood, analysisMethod === 'text' ? textInput : undefined);
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

          {/* API Key Section */}
          {analysisMethod === 'text' && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">AI Analysis Settings</h3>
                </div>
                <button
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                >
                  {openaiKey ? 'Update API Key' : 'Add API Key'}
                </button>
              </div>
              
              {showApiKeyInput && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OpenAI API Key (for AI analysis)
                    </label>
                    <input
                      type="password"
                      value={openaiKey}
                      onChange={(e) => setOpenaiKey(e.target.value)}
                      placeholder="Enter your OpenAI API key..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={saveApiKey}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Save Key
                    </button>
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Get OpenAI API Key
                    </a>
                  </div>
                  <p className="text-xs text-gray-500">
                    Your API key is stored locally in your browser and never sent to our servers.
                  </p>
                </div>
              )}
              
              {!showApiKeyInput && (
                <p className="text-sm text-gray-600">
                  {openaiKey 
                    ? "OpenAI API key configured ✓ - AI analysis enabled" 
                    : "Add your OpenAI API key to enable AI-powered mood analysis"
                  }
                </p>
              )}
            </div>
          )}

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
                      placeholder="Describe your current mood or feelings... (e.g., 'I feel really tired today' or 'I'm feeling excited about my new project')"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                      rows={4}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {openaiKey 
                      ? "Our AI will analyze your text using OpenAI's advanced language model"
                      : "Add an OpenAI API key above for AI analysis"
                    }
                  </p>
                </div>
              </>
            )}

            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={(!selectedMood && !textInput.trim()) || isAnalyzing || (analysisMethod === 'text' && !openaiKey)}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze My Mood'}
              </button>
              {analysisMethod === 'text' && !openaiKey && (
                <p className="text-sm text-red-500 mt-2">Please add your OpenAI API key to use AI analysis</p>
              )}
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
