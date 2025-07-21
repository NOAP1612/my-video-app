import React from 'react';
import { Play, Sparkles, TrendingUp } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">AI-Powered Video Magic</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Turn Long Videos Into
            <span className="block gradient-text">Viral Clips</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl">In One Click</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Upload your podcast, webinar, or interview. Our AI finds the most engaging moments 
            and creates perfect social media clips with captions, music, and mobile-first formatting.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              <Play className="w-5 h-5 mr-2" />
              Try It Free
            </button>
            <button className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
              Watch Demo
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">10x</div>
              <div className="text-gray-600">Faster Editing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-gray-600">Viral Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}