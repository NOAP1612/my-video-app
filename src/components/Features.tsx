import { Brain, Scissors, Smartphone, Type, Music, Zap, Clock, TrendingUp, Share2 } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced algorithms analyze your content to identify the most engaging moments, hooks, and emotional peaks.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: Scissors,
      title: 'Smart Clipping',
      description: 'Automatically generates perfectly timed clips with natural start and end points for maximum impact.',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Format',
      description: 'Instantly converts to 9:16 vertical aspect ratio, optimized for TikTok, Instagram Reels, and YouTube Shorts.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Type,
      title: 'Auto Captions',
      description: 'Generates accurate, stylized subtitles that boost engagement and make content accessible to all viewers.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Music,
      title: 'Background Music',
      description: 'Adds trending background tracks with perfect audio balancing to give your clips a professional feel.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Zap,
      title: 'One-Click Magic',
      description: 'Upload once, get multiple viral-ready clips in minutes. No editing experience required.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Clock,
      title: 'Save Hours of Work',
      description: 'What used to take hours of manual editing now happens automatically in just a few minutes.',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: TrendingUp,
      title: 'Viral Optimization',
      description: 'Clips are optimized for maximum engagement based on social media best practices and trending formats.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      icon: Share2,
      title: 'Multi-Platform Ready',
      description: 'Export in formats perfect for all major social platforms with platform-specific optimizations.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Go Viral
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform handles every aspect of creating engaging social media content from your long-form videos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Content?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using AI to scale their social media presence.
            </p>
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Creating Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}