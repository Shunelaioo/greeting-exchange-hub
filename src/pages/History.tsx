
import { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const History = () => {
  const [viewType, setViewType] = useState<'line' | 'bar'>('line');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Mock data - in a real app, this would come from your database
  const mockData = [
    { date: '2024-01-01', mood: 7, sleep: 8, weather: 'sunny' },
    { date: '2024-01-02', mood: 6, sleep: 6, weather: 'cloudy' },
    { date: '2024-01-03', mood: 8, sleep: 9, weather: 'sunny' },
    { date: '2024-01-04', mood: 5, sleep: 5, weather: 'rainy' },
    { date: '2024-01-05', mood: 7, sleep: 7, weather: 'cloudy' },
    { date: '2024-01-06', mood: 9, sleep: 8, weather: 'sunny' },
    { date: '2024-01-07', mood: 6, sleep: 6, weather: 'rainy' },
    { date: '2024-01-08', mood: 8, sleep: 8, weather: 'sunny' },
    { date: '2024-01-09', mood: 7, sleep: 7, weather: 'cloudy' },
    { date: '2024-01-10', mood: 9, sleep: 9, weather: 'sunny' },
    { date: '2024-01-11', mood: 5, sleep: 5, weather: 'stormy' },
    { date: '2024-01-12', mood: 6, sleep: 6, weather: 'rainy' },
    { date: '2024-01-13', mood: 8, sleep: 8, weather: 'sunny' },
    { date: '2024-01-14', mood: 7, sleep: 7, weather: 'cloudy' },
  ];

  const getAverageMood = () => {
    const sum = mockData.reduce((acc, day) => acc + day.mood, 0);
    return (sum / mockData.length).toFixed(1);
  };

  const getTrend = () => {
    const recent = mockData.slice(-7);
    const older = mockData.slice(-14, -7);
    const recentAvg = recent.reduce((acc, day) => acc + day.mood, 0) / recent.length;
    const olderAvg = older.reduce((acc, day) => acc + day.mood, 0) / older.length;
    return recentAvg > olderAvg ? 'improving' : recentAvg < olderAvg ? 'declining' : 'stable';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData = mockData.map(day => ({
    ...day,
    formattedDate: formatDate(day.date)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <BarChart3 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Mood History</h1>
            <p className="text-gray-600 text-lg">Track your emotional patterns and progress over time</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Average Mood</p>
                  <p className="text-3xl font-bold text-blue-600">{getAverageMood()}/10</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Trend</p>
                  <p className={`text-xl font-bold capitalize ${
                    getTrend() === 'improving' ? 'text-green-600' : 
                    getTrend() === 'declining' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {getTrend()}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  getTrend() === 'improving' ? 'bg-green-100' : 
                  getTrend() === 'declining' ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  <TrendingUp className={`h-6 w-6 ${
                    getTrend() === 'improving' ? 'text-green-600' : 
                    getTrend() === 'declining' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Days Tracked</p>
                  <p className="text-3xl font-bold text-purple-600">{mockData.length}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">View Options:</span>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setViewType('line')}
                    className={`px-4 py-2 text-sm font-medium ${
                      viewType === 'line' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Line Chart
                  </button>
                  <button
                    onClick={() => setViewType('bar')}
                    className={`px-4 py-2 text-sm font-medium ${
                      viewType === 'bar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Bar Chart
                  </button>
                </div>
                
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Mood & Sleep Patterns</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                {viewType === 'line' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="formattedDate" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      name="Mood (1-10)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sleep" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      name="Sleep Quality (1-10)"
                    />
                  </LineChart>
                ) : (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="formattedDate" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mood" fill="#3B82F6" name="Mood (1-10)" />
                    <Bar dataKey="sleep" fill="#10B981" name="Sleep Quality (1-10)" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Sleep Impact</h4>
                <p className="text-gray-600 text-sm">
                  Your mood tends to be higher on days when you get better sleep. 
                  Consider maintaining a consistent sleep schedule for better emotional well-being.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Weather Correlation</h4>
                <p className="text-gray-600 text-sm">
                  Sunny days appear to positively influence your mood. 
                  On cloudy or rainy days, try indoor activities that bring you joy.
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
