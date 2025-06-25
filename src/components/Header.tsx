
import { useState } from 'react';
import { Menu, X, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">Mood Analyzer</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link to="/analyze" className="text-gray-600 hover:text-purple-600 transition-colors">
              Analyze Mood
            </Link>
            <Link to="/journey" className="text-gray-600 hover:text-purple-600 transition-colors">
              Mood Journey
            </Link>
            <Link to="/history" className="text-gray-600 hover:text-purple-600 transition-colors">
              History
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/analyze" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Analyze Mood
              </Link>
              <Link 
                to="/journey" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mood Journey
              </Link>
              <Link 
                to="/history" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                History
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
