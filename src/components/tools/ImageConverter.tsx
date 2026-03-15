import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, FileImage, ArrowRightLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface ImageConverterProps {
  fromFormat: 'PNG' | 'JPG';
  toFormat: 'PNG' | 'JPG';
}

export default function ImageConverter({ fromFormat, toFormat }: ImageConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setConvertedUrl(null);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const convertImage = () => {
    if (!preview || !file) return;
    setIsConverting(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Fill white background for JPGs (since PNGs might have transparency)
        if (toFormat === 'JPG') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        const mimeType = toFormat === 'JPG' ? 'image/jpeg' : 'image/png';
        const dataUrl = canvas.toDataURL(mimeType, 0.9);
        setConvertedUrl(dataUrl);
        setIsConverting(false);
      }
    };
    img.src = preview;
  };

  const handleDownload = () => {
    if (convertedUrl && file) {
      const a = document.createElement('a');
      a.href = convertedUrl;
      const originalName = file.name.split('.')[0];
      a.download = `${originalName}-converted.${toFormat.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Auto-clear after download for privacy
      setFile(null);
      setPreview(null);
      setConvertedUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {!file ? (
        <div 
          className="w-full border-2 border-dashed border-zinc-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-neon-green transition-colors cursor-pointer bg-zinc-950/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={48} className="text-zinc-500 mb-4" />
          <h3 className="text-xl font-bold text-zinc-200 mb-2">Upload {fromFormat} Image</h3>
          <p className="text-sm text-zinc-500">Click to browse or drag and drop</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept={fromFormat === 'PNG' ? 'image/png' : 'image/jpeg, image/jpg'} 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-1/2 aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center p-2 relative">
              <img src={preview!} alt="Original" className="max-w-full max-h-full object-contain" />
              <div className="absolute top-2 left-2 bg-zinc-900/80 px-2 py-1 rounded text-xs text-zinc-300 font-mono">Original ({fromFormat})</div>
            </div>
            
            <div className="hidden sm:flex items-center justify-center">
              <ArrowRightLeft size={24} className="text-zinc-600" />
            </div>

            <div className="w-full sm:w-1/2 aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center p-2 relative">
              {convertedUrl ? (
                <>
                  <img src={convertedUrl} alt="Converted" className="max-w-full max-h-full object-contain" />
                  <div className="absolute top-2 left-2 bg-neon-green/20 text-neon-green px-2 py-1 rounded text-xs font-mono">Converted ({toFormat})</div>
                </>
              ) : (
                <div className="text-zinc-600 flex flex-col items-center">
                  <FileImage size={32} className="mb-2 opacity-50" />
                  <span className="text-sm">Ready to convert</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-zinc-800">
            <button 
              onClick={() => {
                setFile(null);
                setPreview(null);
                setConvertedUrl(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="px-6 py-3 rounded-lg bg-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            
            {!convertedUrl ? (
              <button 
                onClick={convertImage}
                disabled={isConverting}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-blue text-zinc-950 font-bold hover:bg-neon-blue/90 transition-colors disabled:opacity-50"
              >
                {isConverting ? <RefreshCw className="animate-spin" size={20} /> : <RefreshCw size={20} />}
                Convert to {toFormat}
              </button>
            ) : (
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-green text-zinc-950 font-bold hover:bg-neon-green/90 transition-colors"
              >
                <Download size={20} />
                Download & Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
