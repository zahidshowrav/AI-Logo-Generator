import React from 'react';
import { LogoParams, LogoStyle } from '../types';
import { Wand2, Loader2 } from 'lucide-react';

interface LogoFormProps {
  params: LogoParams;
  setParams: React.Dispatch<React.SetStateAction<LogoParams>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const LogoForm: React.FC<LogoFormProps> = ({ params, setParams, onGenerate, isGenerating }) => {
  
  const handleChange = (field: keyof LogoParams, value: string) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
        <Wand2 className="w-5 h-5 text-indigo-400" />
        Configure Your Brand
      </h2>

      <div className="space-y-5">
        
        {/* Company Name & Domain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Company Name</label>
            <input
              type="text"
              value={params.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Flizz"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Domain</label>
            <input
              type="text"
              value={params.domain}
              onChange={(e) => handleChange('domain', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Flizz.io"
            />
          </div>
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Visual Style</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.values(LogoStyle).map((style) => (
              <button
                key={style}
                onClick={() => handleChange('style', style)}
                className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                  params.style === style
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Brand Colors</label>
          <input
            type="text"
            value={params.primaryColor}
            onChange={(e) => handleChange('primaryColor', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="e.g. Electric Blue & Neon Purple, or Monochrome Black"
          />
        </div>

        {/* Additional Details */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Additional Requirements (Optional)</label>
          <textarea
            value={params.additionalDetails}
            onChange={(e) => handleChange('additionalDetails', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-24 resize-none"
            placeholder="Describe any specific icons, metaphors (e.g., cloud, lightning), or vibes you want to capture..."
          />
        </div>

        {/* Action Button */}
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all transform flex items-center justify-center gap-2 ${
            isGenerating
              ? 'bg-slate-700 cursor-not-allowed opacity-75'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 hover:scale-[1.02] shadow-lg shadow-indigo-500/25'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Concept...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate Logo
            </>
          )}
        </button>

      </div>
    </div>
  );
};
