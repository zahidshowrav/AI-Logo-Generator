import React from 'react';
import { Download, RefreshCw, Share2 } from 'lucide-react';
import { GeneratedImage } from '../types';

interface LogoPreviewProps {
  generatedImage: GeneratedImage | null;
  isGenerating: boolean;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({ generatedImage, isGenerating }) => {
  if (!generatedImage && !isGenerating) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-xl p-8 text-center">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">✨</span>
        </div>
        <h3 className="text-xl font-medium text-slate-300">Ready to Create</h3>
        <p className="text-slate-500 mt-2 max-w-sm">
          Configure your preferences on the left and hit generate to see your future brand identity.
        </p>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-800/30 border border-slate-700 rounded-xl p-8">
        <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-r-4 border-violet-500 rounded-full animate-spin animation-delay-200"></div>
            <div className="absolute inset-4 border-b-4 border-fuchsia-500 rounded-full animate-spin animation-delay-500"></div>
        </div>
        <h3 className="text-xl font-medium text-white animate-pulse">Designing "Flizz"...</h3>
        <p className="text-slate-400 mt-2">Iterating through concepts</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in duration-500">
      <div className="relative group flex-1 bg-white/5 rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center p-8">
        {/* Checkered background pattern for transparency */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: 'linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)',
               backgroundSize: '20px 20px',
               backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
             }}
        />
        
        {generatedImage && (
          <img 
            src={generatedImage.url} 
            alt="Generated Logo" 
            className="relative z-10 max-w-full max-h-[500px] object-contain shadow-2xl rounded-lg"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-4">
             {/* Action buttons could go here if overlay style is preferred */}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <a 
          href={generatedImage?.url} 
          download={`flizz-logo-${Date.now()}.png`}
          className="flex-1 bg-white text-slate-900 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download PNG
        </a>
        <button 
           className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2"
           onClick={() => alert("Sharing functionality would go here!")}
        >
           <Share2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Generated Prompt Strategy</p>
        <p className="text-sm text-slate-300 italic">"{generatedImage?.prompt}"</p>
      </div>
    </div>
  );
};
