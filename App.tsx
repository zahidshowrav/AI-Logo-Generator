import React, { useState } from 'react';
import { LogoForm } from './components/LogoForm';
import { LogoPreview } from './components/LogoPreview';
import { LogoParams, LogoStyle, GeneratedImage } from './types';
import { generateLogoImage } from './services/geminiService';
import { Sparkles, Hexagon, Download } from 'lucide-react';

const App: React.FC = () => {
  const [params, setParams] = useState<LogoParams>({
    companyName: 'Flizz',
    domain: 'Flizz.io',
    style: LogoStyle.CYBERPUNK,
    primaryColor: 'Electric Blue (#007BFF)',
    additionalDetails: 'A sleek, abstract letter F combined with a lightning bolt or digital circuit node.',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const imageData = await generateLogoImage(params);
      setGeneratedImage({
        id: crypto.randomUUID(),
        url: imageData,
        prompt: `${params.style} logo for ${params.companyName}`,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Failed to generate logo", error);
      alert("Something went wrong while generating the logo. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Hexagon className="w-6 h-6 text-white fill-indigo-600 stroke-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  Flizz
                </span>
                <span className="text-slate-500 text-sm ml-1">Design Studio</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Powered by Gemini 2.5
                </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                AI-Powered Identity for <span className="text-indigo-400">Flizz.io</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Generate professional, scalable vector-style logos instantly. 
                Perfect for your software company's new look.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5">
            <LogoForm 
                params={params} 
                setParams={setParams} 
                onGenerate={handleGenerate} 
                isGenerating={isGenerating} 
            />
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-7">
            <LogoPreview 
                generatedImage={generatedImage} 
                isGenerating={isGenerating} 
            />
          </div>

        </div>

        {/* Feature Highlights (Static) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-center">
            <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Unique Designs</h3>
                <p className="text-slate-400 text-sm">Every generation is unique, tailored specifically to your prompt configuration.</p>
            </div>
             <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Hexagon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Vector Aesthetics</h3>
                <p className="text-slate-400 text-sm">Optimized for clean lines and solid shapes, mimicking professional SVG assets.</p>
            </div>
             <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Instant Download</h3>
                <p className="text-slate-400 text-sm">Get high-resolution PNGs immediately ready for your mockups and websites.</p>
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;