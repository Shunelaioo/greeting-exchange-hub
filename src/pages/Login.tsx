
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail, Lock, Eye, EyeOff, Heart, Sparkles, Star, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-purple-300/40 to-pink-300/40 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-gradient-to-r from-blue-300/40 to-cyan-300/40 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-indigo-300/40 to-purple-300/40 animate-float" style={{animationDelay: '4s'}}></div>
        
        {/* Floating Icons */}
        <Heart className="absolute top-32 left-32 h-8 w-8 text-pink-300 animate-sparkle" />
        <Sparkles className="absolute top-60 right-40 h-6 w-6 text-purple-300 animate-sparkle" style={{animationDelay: '1s'}} />
        <Star className="absolute bottom-40 right-32 h-7 w-7 text-yellow-300 animate-sparkle" style={{animationDelay: '2s'}} />
        <Zap className="absolute bottom-60 left-40 h-6 w-6 text-blue-300 animate-sparkle" style={{animationDelay: '3s'}} />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/50 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75 animate-glow"></div>
              <div className="relative inline-flex p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-xl">
                <Brain className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Welcome Back
              </span>
            </h1>
            <p className="text-gray-600 text-lg">Sign in to continue your mood journey ✨</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all bg-white/70 backdrop-blur-sm text-lg hover:border-purple-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-14 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all bg-white/70 backdrop-blur-sm text-lg hover:border-purple-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 animate-glow"
            >
              Sign In ✨
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Don't have an account?{' '}
              <a href="#" className="text-purple-600 hover:text-purple-700 font-bold hover:underline transition-colors">
                Sign up
              </a>
            </p>
            <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-purple-600 transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
