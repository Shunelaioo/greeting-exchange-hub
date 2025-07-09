import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight, Sparkles, Heart, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface MoodEntry {
  id: string;
  mood: string;
  emoji: string;
  feelings_text: string;
  weather?: string;
  theme?: string;
  message?: string;
  suggested_activities?: any;
  created_at: string;
}

interface ChartData {
  date: string;
  mood: number;
  sleep: number;
  weather: string;
  formattedDate: string;
}

const History = () => {
  const { user } = useAuth();
  const [viewType, setViewType] = useState<'line' | 'bar'>('line');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  // Fetch mood entries from Supabase
  const { data: moodEntries = [], isLoading, error } = useQuery({
    queryKey: ['mood-entries', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching mood entries:', error);
        throw error;
      }
      
      return data as MoodEntry[];
    },
    enabled: !!user,
  });

  // Convert mood text to number for charts
  const getMoodScore = (mood: string): number => {
    const moodMap: { [key: string]: number } = {
      'terrible': 1,
      'bad': 2,
      'poor': 3,
      'okay': 4,
      'neutral': 5,
      'good': 6,
      'great': 7,
      'excellent': 8,
      'amazing': 9,
      'perfect': 10
    };
    return moodMap[mood.toLowerCase()] || 5;
  };

  // Process data for charts
  const chartData: ChartData[] = moodEntries.map(entry => ({
    date: entry.created_at,
    mood: getMoodScore(entry.mood),
    sleep: Math.floor(Math.random() * 5) + 6, // Placeholder for sleep data
    weather: entry.weather || 'unknown',
    formattedDate: formatDate(entry.created_at)
  })).reverse();

  const getAverageMood = () => {
    if (chartData.length === 0) return '0.0';
    const sum = chartData.reduce((acc, day) => acc + day.mood, 0);
    return (sum / chartData.length).toFixed(1);
  };

  const getTrend = () => {
    if (chartData.length < 7) return 'stable';
    const recent = chartData.slice(-7);
    const older = chartData.slice(-14, -7);
    if (older.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((acc, day) => acc + day.mood, 0) / recent.length;
    const olderAvg = older.reduce((acc, day) => acc + day.mood, 0) / older.length;
    return recentAvg > olderAvg ? 'improving' : recentAvg < olderAvg ? 'declining' : 'stable';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getMoodEmoji = (moodScore: number) => {
    if (moodScore >= 9) return '😄';
    if (moodScore >= 7) return '😊';
    if (moodScore >= 5) return '😐';
    if (moodScore >= 3) return '😔';
    return '😢';
  };

  const getMoodData = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return chartData.find(data => data.date.startsWith(dateString));
  };

  const generateCalendarDays = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, monthIndex, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100 py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your mood history</h2>
          <p className="text-gray-600">You need to be logged in to see your personal mood journey.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100 py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100 py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading mood history</h2>
          <p className="text-gray-600">There was an error loading your mood data. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (moodEntries.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100 py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No mood entries yet</h2>
          <p className="text-gray-600 mb-6">Start tracking your mood to see your beautiful journey here!</p>
          <a 
            href="/analyze" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform duration-300"
          >
            Analyze Your Mood
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100 py-12 relative overflow-hidden">
      {/* Enhanced floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-green-300/30 to-blue-300/30 animate-float blur-2xl"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-300/30 to-pink-300/30 animate-float blur-xl" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-300/40 to-teal-300/40 animate-float blur-lg" style={{animationDelay: '1.5s'}}></div>
        
        {/* Sparkle decorations */}
        <Sparkles className="absolute top-40 left-1/4 h-8 w-8 text-emerald-400 animate-sparkle drop-shadow-lg" />
        <Star className="absolute bottom-32 right-1/3 h-6 w-6 text-blue-400 animate-sparkle drop-shadow-lg" style={{animationDelay: '2s'}} />
        <Heart className="absolute top-80 right-1/4 h-7 w-7 text-purple-400 animate-sparkle drop-shadow-lg" style={{animationDelay: '1s'}} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header with matching Home page font sizes */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-full blur-xl opacity-60 animate-glow"></div>
                <div className="relative p-6 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border-4 border-white/60 group-hover:scale-110 transition-transform duration-500">
                  <BarChart3 className="h-16 w-16 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 leading-tight">
              Your Mood
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 animate-gradient">
                Journey History
              </span>
            </h1>
            <p className="text-gray-600 text-lg font-medium max-w-3xl mx-auto">Track your emotional patterns and celebrate your beautiful progress over time ✨</p>
          </div>

          {/* Enhanced Stats Cards with matching font sizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-white/95 to-blue-50/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-2 border-white/50 hover:shadow-3xl transition-all duration-500 group animate-fade-in hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-base font-medium mb-2">Average Mood</p>
                  <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{getAverageMood()}/10</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <BarChart3 className="h-8 w-8 text-blue-600 group-hover:animate-pulse" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/95 to-green-50/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-2 border-white/50 hover:shadow-3xl transition-all duration-500 group animate-fade-in hover:scale-105" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-base font-medium mb-2">Trend</p>
                  <p className={`text-xl font-black capitalize ${
                    getTrend() === 'improving' ? 'text-green-600' : 
                    getTrend() === 'declining' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {getTrend()}
                  </p>
                </div>
                <div className={`p-6 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500 ${
                  getTrend() === 'improving' ? 'bg-gradient-to-r from-green-100 to-emerald-100' : 
                  getTrend() === 'declining' ? 'bg-gradient-to-r from-red-100 to-pink-100' : 'bg-gradient-to-r from-yellow-100 to-orange-100'
                }`}>
                  <TrendingUp className={`h-8 w-8 group-hover:animate-bounce ${
                    getTrend() === 'improving' ? 'text-green-600' : 
                    getTrend() === 'declining' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/95 to-purple-50/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border-2 border-white/50 hover:shadow-3xl transition-all duration-500 group animate-fade-in hover:scale-105" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-base font-medium mb-2">Days Tracked</p>
                  <p className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{moodEntries.length}</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <CalendarIcon className="h-8 w-8 text-purple-600 group-hover:animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Controls with matching font sizes */}
          <div className="bg-gradient-to-r from-white/95 via-purple-50/90 to-pink-50/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-12 border-2 border-white/50 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                  <Filter className="h-6 w-6 text-purple-600" />
                </div>
                <span className="font-bold text-lg text-gray-800">View Options:</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex rounded-xl border-2 border-purple-200 overflow-hidden shadow-lg">
                  <button
                    onClick={() => setViewType('line')}
                    className={`px-5 py-3 text-base font-bold transition-all duration-300 ${
                      viewType === 'line' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                    }`}
                  >
                    Line Chart
                  </button>
                  <button
                    onClick={() => setViewType('bar')}
                    className={`px-5 py-3 text-base font-bold transition-all duration-300 ${
                      viewType === 'bar' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                    }`}
                  >
                    Bar Chart
                  </button>
                </div>

                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className={`flex items-center px-5 py-3 text-base font-bold rounded-xl border-2 transition-all duration-500 shadow-lg hover:scale-105 ${
                    showCalendar ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-600 animate-glow' : 'bg-white text-gray-700 border-purple-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
                  }`}
                >
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Mood Calendar
                  <Sparkles className="h-4 w-4 ml-2 animate-sparkle" />
                </button>
                
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
                  className="px-5 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 text-base font-medium bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mood Calendar with adjusted font sizes */}
          {showCalendar && (
            <div className="bg-gradient-to-r from-white/95 via-blue-50/90 to-purple-50/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-12 border-2 border-white/50 animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-gray-800">Mood Calendar ✨</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-3 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <span className="font-bold text-xl text-gray-800">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-3 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-3">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-base font-black text-gray-700 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days with hover functionality */}
                {generateCalendarDays(currentMonth).map((day, index) => {
                  if (!day) {
                    return <div key={index} className="p-3"></div>;
                  }
                  
                  const moodData = getMoodData(day);
                  const emoji = moodData ? getMoodEmoji(moodData.mood) : '';
                  const dayKey = day.toISOString();
                  
                  return (
                    <div
                      key={dayKey}
                      className={`p-3 text-center rounded-xl transition-all duration-300 cursor-pointer border-2 ${
                        moodData 
                          ? 'hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:border-purple-300 border-transparent shadow-lg hover:shadow-xl hover:scale-105' 
                          : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border-transparent'
                      }`}
                      onMouseEnter={() => moodData && setHoveredDay(dayKey)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      <div className="text-base text-gray-800 font-bold mb-1">{day.getDate()}</div>
                      {emoji && hoveredDay === dayKey && (
                        <div 
                          className="text-2xl animate-fade-in animate-bounce" 
                          title={`Mood: ${moodData?.mood}/10`}
                        >
                          {emoji}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-center space-x-6 text-base text-gray-700 font-medium">
                <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                  <span>😢</span><span>Poor (1-2)</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                  <span>😔</span><span>Low (3-4)</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                  <span>😐</span><span>Okay (5-6)</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                  <span>😊</span><span>Good (7-8)</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                  <span>😄</span><span>Great (9-10)</span>
                </div>
              </div>
              
              <div className="mt-4 text-center text-base text-gray-600 font-medium">
                Hover over a day to see your mood emoji! ✨
              </div>
            </div>
          )}

          {/* Chart with matching font sizes */}
          <div className="bg-gradient-to-r from-white/95 via-blue-50/90 to-green-50/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-12 border-2 border-white/50 animate-fade-in" style={{animationDelay: '0.8s'}}>
            <h3 className="text-2xl font-black text-gray-800 mb-8 text-center">Mood & Sleep Patterns 📊</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                {viewType === 'line' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="formattedDate" stroke="#4b5563" fontSize={14} fontWeight="bold" />
                    <YAxis domain={[0, 10]} stroke="#4b5563" fontSize={14} fontWeight="bold" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '2px solid #e0e7ff',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="url(#moodGradient)"
                      strokeWidth={4}
                      dot={{ fill: '#3B82F6', strokeWidth: 3, r: 6 }}
                      name="Mood (1-10)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sleep" 
                      stroke="url(#sleepGradient)"
                      strokeWidth={4}
                      dot={{ fill: '#10B981', strokeWidth: 3, r: 6 }}
                      name="Sleep Quality (1-10)"
                    />
                    <defs>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                      <linearGradient id="sleepGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                ) : (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="formattedDate" stroke="#4b5563" fontSize={14} fontWeight="bold" />
                    <YAxis domain={[0, 10]} stroke="#4b5563" fontSize={14} fontWeight="bold" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '2px solid #e0e7ff',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="mood" fill="url(#moodBarGradient)" name="Mood (1-10)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sleep" fill="url(#sleepBarGradient)" name="Sleep Quality (1-10)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="moodBarGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                      <linearGradient id="sleepBarGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06B6D4" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights with matching font sizes */}
          <div className="bg-gradient-to-r from-purple-100/90 via-pink-100/90 to-blue-100/90 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border-2 border-white/50 animate-fade-in" style={{animationDelay: '1s'}}>
            <h3 className="text-3xl font-black text-gray-800 mb-10 text-center">Your Beautiful Insights ✨</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-white/60 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">💤</span>
                  </div>
                  <h4 className="font-black text-xl text-gray-800">Sleep Impact</h4>
                </div>
                <p className="text-gray-700 text-base leading-relaxed font-medium">
                  Your mood tends to be higher on days when you get better sleep. 
                  Consider maintaining a consistent sleep schedule for better emotional well-being and more joyful days! 🌙
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-white/60 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">☀️</span>
                  </div>
                  <h4 className="font-black text-xl text-gray-800">Weather Correlation</h4>
                </div>
                <p className="text-gray-700 text-base leading-relaxed font-medium">
                  Sunny days appear to positively influence your mood! 
                  On cloudy or rainy days, try indoor activities that bring you joy and light up your beautiful soul. 🌈
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
