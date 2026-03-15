import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, FileImage, ArrowRightLeft } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setCompressedFile(null);
      setCompressedPreview(null);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const compressImage = async () => {
    if (!file) return;
    setIsCompressing(true);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: compressionLevel / 100,
    };

    try {
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
      
      const reader = new FileReader();
      reader.onload = () => setCompressedPreview(reader.result as string);
      reader.readAsDataURL(compressed);
    } catch (error) {
      console.error('Error compressing image:', error);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (compressedFile && compressedPreview) {
      const a = document.createElement('a');
      a.href = compressedPreview;
      const originalName = file?.name.split('.')[0] || 'image';
      const ext = file?.name.split('.').pop() || 'jpg';
      a.download = `${originalName}-compressed.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Auto-clear after download for privacy
      setFile(null);
      setPreview(null);
      setCompressedFile(null);
      setCompressedPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col items-center w-full">
      {!file ? (
        <div 
          className="w-full border-2 border-dashed border-zinc-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-neon-green transition-colors cursor-pointer bg-zinc-950/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={48} className="text-zinc-500 mb-4" />
          <h3 className="text-xl font-bold text-zinc-200 mb-2">Upload Image to Compress</h3>
          <p className="text-sm text-zinc-500">Click to browse or drag and drop (JPG, PNG, WebP)</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-1/2 aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 flex flex-col items-center justify-center p-2 relative">
              <img src={preview!} alt="Original" className="max-w-full max-h-full object-contain" />
              <div className="absolute top-2 left-2 bg-zinc-900/80 px-2 py-1 rounded text-xs text-zinc-300 font-mono">
                Original ({formatBytes(file.size)})
              </div>
            </div>
            
            <div className="hidden sm:flex items-center justify-center">
              <ArrowRightLeft size={24} className="text-zinc-600" />
            </div>

            <div className="w-full sm:w-1/2 aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center p-2 relative">
              {compressedPreview && compressedFile ? (
                <>
                  <img src={compressedPreview} alt="Compressed" className="max-w-full max-h-full object-contain" />
                  <div className="absolute top-2 left-2 bg-neon-green/20 text-neon-green px-2 py-1 rounded text-xs font-mono">
                    Compressed ({formatBytes(compressedFile.size)})
                    <span className="ml-2 text-neon-green/80">
                      -{Math.round((1 - compressedFile.size / file.size) * 100)}%
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-zinc-600 flex flex-col items-center">
                  <FileImage size={32} className="mb-2 opacity-50" />
                  <span className="text-sm">Ready to compress</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-zinc-400">Compression Level: {compressionLevel}%</label>
              <span className="text-xs text-zinc-500">Lower % = Smaller size, Lower quality</span>
            </div>
            <input 
              type="range" min="1" max="100" 
              value={compressionLevel} onChange={e => setCompressionLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-neon-blue"
            />
            <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
              <span>High Quality</span>
              <span>Balanced</span>
              <span>Small Size</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-zinc-800">
            <button 
              onClick={() => {
                setFile(null);
                setPreview(null);
                setCompressedFile(null);
                setCompressedPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="px-6 py-3 rounded-lg bg-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            
            {!compressedFile ? (
              <button 
                onClick={compressImage}
                disabled={isCompressing}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-blue text-zinc-950 font-bold hover:bg-neon-blue/90 transition-colors disabled:opacity-50"
              >
                {isCompressing ? <RefreshCw className="animate-spin" size={20} /> : <RefreshCw size={20} />}
                Compress Image
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
