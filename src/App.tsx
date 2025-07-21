import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { ProcessingSection } from './components/ProcessingSection';
import { ClipsPreview } from './components/ClipsPreview';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

export type ProcessingStep = 'upload' | 'analyzing' | 'generating' | 'preview' | 'complete';

export interface VideoClip {
  id: string;
  title: string;
  duration: number;
  thumbnail: string;
  startTime: number;
  endTime: number;
  confidence: number;
  selected: boolean;
}

function App() {
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setCurrentStep('analyzing');
    
    // Simulate processing steps
    simulateProcessing();
  };

  const simulateProcessing = () => {
    // Simulate AI analysis
    setTimeout(() => {
      setProcessingProgress(25);
      setCurrentStep('generating');
    }, 1500);

    // Simulate clip generation
    setTimeout(() => {
      setProcessingProgress(75);
      generateMockClips();
    }, 3000);

    // Complete processing
    setTimeout(() => {
      setProcessingProgress(100);
      setCurrentStep('preview');
    }, 4500);
  };

  const generateMockClips = () => {
    const mockClips: VideoClip[] = [
      {
        id: '1',
        title: 'Opening Hook - "The Secret Nobody Tells You"',
        duration: 28,
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        startTime: 45,
        endTime: 73,
        confidence: 0.95,
        selected: true,
      },
      {
        id: '2',
        title: 'Key Insight - "This Changes Everything"',
        duration: 32,
        thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
        startTime: 420,
        endTime: 452,
        confidence: 0.92,
        selected: true,
      },
      {
        id: '3',
        title: 'Emotional Moment - Audience Reaction',
        duration: 25,
        thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
        startTime: 1240,
        endTime: 1265,
        confidence: 0.88,
        selected: true,
      },
      {
        id: '4',
        title: 'Actionable Tip - "Do This Today"',
        duration: 30,
        thumbnail: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
        startTime: 1800,
        endTime: 1830,
        confidence: 0.85,
        selected: false,
      },
      {
        id: '5',
        title: 'Surprising Statistic Reveal',
        duration: 22,
        thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
        startTime: 2100,
        endTime: 2122,
        confidence: 0.82,
        selected: false,
      },
    ];
    setClips(mockClips);
  };

  const toggleClipSelection = (clipId: string) => {
    setClips(clips.map(clip => 
      clip.id === clipId ? { ...clip, selected: !clip.selected } : clip
    ));
  };

  const resetApp = () => {
    setCurrentStep('upload');
    setUploadedFile(null);
    setClips([]);
    setProcessingProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {currentStep === 'upload' && (
        <>
          <Hero />
          <UploadSection onFileUpload={handleFileUpload} />
          <Features />
        </>
      )}
      
      {(currentStep === 'analyzing' || currentStep === 'generating') && (
        <ProcessingSection 
          step={currentStep}
          progress={processingProgress}
          fileName={uploadedFile?.name || ''}
        />
      )}
      
      {currentStep === 'preview' && (
        <ClipsPreview 
          clips={clips}
          onToggleClip={toggleClipSelection}
          onReset={resetApp}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;