import { useState } from 'react';
import { Play, Download, Share2, Edit3, Clock, TrendingUp, Check, X, Smartphone, Music, Type } from 'lucide-react';
import { VideoClip } from '../App';

interface ClipsPreviewProps {
  clips: VideoClip[];
  onToggleClip: (clipId: string) => void;
  onReset: () => void;
}

export function ClipsPreview({ clips, onToggleClip, onReset }: ClipsPreviewProps) {
  const [isExporting, setIsExporting] = useState(false);
  const selectedClips = clips.filter(clip => clip.selected);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger the download
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-100';
    if (confidence >= 0.8) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
            <Check className="w-4 h-4" />
            <span className="font-medium">Processing Complete!</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Viral Clips Are Ready
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI found {clips.length} engaging moments. Select your favorites and export them as social-ready clips.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-primary-600 mb-2">{clips.length}</div>
            <div className="text-gray-600">Clips Generated</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-accent-600 mb-2">{selectedClips.length}</div>
            <div className="text-gray-600">Selected</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {formatTime(selectedClips.reduce((acc, clip) => acc + clip.duration, 0))}
            </div>
            <div className="text-gray-600">Total Duration</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              {Math.round(clips.reduce((acc, clip) => acc + clip.confidence, 0) / clips.length * 100)}%
            </div>
            <div className="text-gray-600">Avg. Confidence</div>
          </div>
        </div>

        {/* Clips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {clips.map((clip) => (
            <div
              key={clip.id}
              className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-md ${
                clip.selected ? 'border-primary-300 ring-2 ring-primary-100' : 'border-gray-200'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={clip.thumbnail}
                  alt={clip.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-black/20 rounded-t-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors">
                    <Play className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
                
                {/* Confidence badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(clip.confidence)}`}>
                  {Math.round(clip.confidence * 100)}%
                </div>
                
                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {formatTime(clip.duration)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {clip.title}
                </h3>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(clip.startTime)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>High Engagement</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                    <Smartphone className="w-3 h-3" />
                    <span>9:16</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                    <Type className="w-3 h-3" />
                    <span>Captions</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                    <Music className="w-3 h-3" />
                    <span>Music</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onToggleClip(clip.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      clip.selected
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {clip.selected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" />
                        <span>Select</span>
                      </>
                    )}
                  </button>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Export Your Clips?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Export {selectedClips.length} selected clips as individual files, perfectly formatted for social media platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <button
              onClick={handleExport}
              disabled={selectedClips.length === 0 || isExporting}
              className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isExporting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Export Selected Clips
                </>
              )}
            </button>
            
            <button className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
              <Share2 className="w-5 h-5 mr-2" />
              Share Preview
            </button>
            
            <button
              onClick={onReset}
              className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2"
            >
              Start Over
            </button>
          </div>
          
          {selectedClips.length === 0 && (
            <p className="text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
              Please select at least one clip to export.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}