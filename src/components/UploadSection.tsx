import React, { useCallback, useState } from 'react';
import { Upload, FileVideo, Clock, Zap } from 'lucide-react';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
}

export function UploadSection({ onFileUpload }: UploadSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      handleFileUpload(videoFile);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      onFileUpload(file);
      setIsUploading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Video
          </h2>
          <p className="text-xl text-gray-600">
            Drop your long-form content and watch the magic happen
          </p>
        </div>

        <div className="card max-w-2xl mx-auto">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
              isDragOver
                ? 'border-primary-400 bg-primary-50'
                : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="animate-pulse">
                <Zap className="w-16 h-16 text-primary-600 mx-auto mb-4 animate-bounce" />
                <p className="text-lg font-medium text-primary-600">Uploading...</p>
              </div>
            ) : (
              <>
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Drop your video here
                </h3>
                <p className="text-gray-600 mb-6">
                  Or click to browse your files
                </p>
                
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="btn-primary cursor-pointer inline-flex items-center"
                >
                  <FileVideo className="w-5 h-5 mr-2" />
                  Choose Video File
                </label>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p>Supports MP4, MOV, AVI up to 2GB</p>
                </div>
              </>
            )}
          </div>

          {/* Processing steps preview */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">AI Analysis</h4>
                <p className="text-sm text-gray-600">Find engaging moments</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                <span className="text-accent-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Smart Clipping</h4>
                <p className="text-sm text-gray-600">Generate viral clips</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Auto Format</h4>
                <p className="text-sm text-gray-600">Perfect for social</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}