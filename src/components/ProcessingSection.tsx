import { Brain, Scissors, Smartphone, Music, Type, Zap } from 'lucide-react';
import { ProcessingStep } from '../App';

interface ProcessingSectionProps {
  step: ProcessingStep;
  progress: number;
  fileName: string;
}

export function ProcessingSection({ step, progress, fileName }: ProcessingSectionProps) {
  const steps = [
    {
      id: 'analyzing',
      icon: Brain,
      title: 'AI Analysis',
      description: 'Analyzing audio patterns and identifying engaging moments...',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      id: 'generating',
      icon: Scissors,
      title: 'Smart Clipping',
      description: 'Generating optimized clips with perfect timing...',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
  ];

  const currentStepData = steps.find(s => s.id === step);
  const Icon = currentStepData?.icon || Zap;

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main processing animation */}
        <div className="mb-12">
          <div className={`w-24 h-24 ${currentStepData?.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse`}>
            <Icon className={`w-12 h-12 ${currentStepData?.color}`} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {currentStepData?.title}
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            {currentStepData?.description}
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-8 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Processing: {fileName}</span>
              <span className="text-sm font-medium text-primary-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Feature highlights during processing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <Smartphone className="w-8 h-8 text-primary-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Mobile-First</h3>
            <p className="text-sm text-gray-600">Perfect 9:16 aspect ratio for TikTok, Instagram Reels, and YouTube Shorts</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <Type className="w-8 h-8 text-accent-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Auto Captions</h3>
            <p className="text-sm text-gray-600">Engaging, styled subtitles that boost viewer retention and accessibility</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <Music className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Background Music</h3>
            <p className="text-sm text-gray-600">Professionally balanced audio with trending background tracks</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <Zap className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Viral Hooks</h3>
            <p className="text-sm text-gray-600">AI identifies the most compelling moments that drive engagement</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-accent-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span className="ml-3 text-sm">This usually takes 2-3 minutes...</span>
          </div>
        </div>
      </div>
    </section>
  );
}