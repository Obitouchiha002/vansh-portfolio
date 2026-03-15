import React, { useState, useRef, useEffect } from 'react';
import { FileImage, Download, X, Loader2, Maximize } from 'lucide-react';
import { motion } from 'motion/react';

export default function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [targetWidth, setTargetWidth] = useState<number | ''>('');
  const [targetHeight, setTargetHeight] = useState<number | ''>('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        setResizedUrl(null);
        setError(null);

        // Get original dimensions
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setTargetWidth(img.width);
          setTargetHeight(img.height);
        };
        img.src = url;
      } else {
        setError('Please select a valid image file.');
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    setPreviewUrl(null);
    setResizedUrl(null);
    setError(null);
    setOriginalDimensions({ width: 0, height: 0 });
    setTargetWidth('');
    setTargetHeight('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? '' : Number(e.target.value);
    setTargetWidth(val);
    
    if (maintainAspectRatio && val !== '' && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setTargetHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? '' : Number(e.target.value);
    setTargetHeight(val);
    
    if (maintainAspectRatio && val !== '' && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setTargetWidth(Math.round(val * ratio));
    }
  };

  const applyPreset = (ratio: string) => {
    if (originalDimensions.width === 0) return;
    
    let w = originalDimensions.width;
    let h = originalDimensions.height;

    if (ratio === '1:1') {
      const size = Math.min(w, h);
      setTargetWidth(size);
      setTargetHeight(size);
    } else if (ratio === '16:9') {
      const newH = Math.round((w * 9) / 16);
      setTargetWidth(w);
      setTargetHeight(newH);
    } else if (ratio === '9:16') {
      const newW = Math.round((h * 9) / 16);
      setTargetWidth(newW);
      setTargetHeight(h);
    }
    setMaintainAspectRatio(false);
  };

  const resizeImage = () => {
    if (!file || !previewUrl || targetWidth === '' || targetHeight === '') return;

    setIsResizing(true);
    setError(null);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = Number(targetWidth);
      canvas.height = Number(targetHeight);
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('Failed to get canvas context.');
        setIsResizing(false);
        return;
      }

      // Draw image with new dimensions
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setResizedUrl(url);
        } else {
          setError('Failed to resize image.');
        }
        setIsResizing(false);
      }, file.type);
    };
    img.onerror = () => {
      setError('Failed to load image for resizing.');
      setIsResizing(false);
    };
    img.src = previewUrl;
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div 
          className="border-2 border-dashed border-zinc-700 rounded-xl p-12 text-center hover:border-neon-green/50 transition-colors cursor-pointer bg-zinc-900/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <Maximize size={32} />
          </div>
          <h3 className="text-xl font-bold text-zinc-200 mb-2">Upload Image to Resize</h3>
          <p className="text-zinc-500 mb-6">Drag and drop your image here or click to browse</p>
          <button className="px-6 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors font-medium">
            Select Image
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neon-green/20 text-neon-green rounded-lg flex items-center justify-center">
                <FileImage size={24} />
              </div>
              <div>
                <h4 className="font-medium text-zinc-200 truncate max-w-[200px] sm:max-w-xs">{file.name}</h4>
                <p className="text-sm text-zinc-500">
                  Original: {originalDimensions.width} × {originalDimensions.height} px
                </p>
              </div>
            </div>
            <button 
              onClick={clearFile}
              className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              title="Remove file"
            >
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {!resizedUrl ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-zinc-400">Presets</label>
                <div className="flex flex-wrap gap-2">
                  {['1:1', '16:9', '9:16'].map(ratio => (
                    <button 
                      key={ratio}
                      onClick={() => applyPreset(ratio)}
                      className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 hover:border-neon-green/50 hover:text-neon-green transition-colors"
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Width (px)</label>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={handleWidthChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:outline-none focus:border-neon-green/50 transition-colors"
                    min="1"
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Height (px)</label>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={handleHeightChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:outline-none focus:border-neon-green/50 transition-colors"
                    min="1"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="aspectRatio"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-700 text-neon-green focus:ring-neon-green/50 bg-zinc-950"
                />
                <label htmlFor="aspectRatio" className="text-sm text-zinc-400 cursor-pointer">
                  Maintain aspect ratio
                </label>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={resizeImage}
                  disabled={isResizing || targetWidth === '' || targetHeight === ''}
                  className="flex items-center gap-2 px-8 py-3 bg-neon-green text-zinc-950 font-bold rounded-lg hover:bg-neon-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResizing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Resizing...
                    </>
                  ) : (
                    <>
                      <Maximize size={20} />
                      Resize Image
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm w-full text-center">
                Image resized successfully! New dimensions: {targetWidth} × {targetHeight} px.
              </div>
              
              <div className="relative max-w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/50 p-2">
                <img 
                  src={resizedUrl} 
                  alt="Resized preview" 
                  className="max-h-[300px] object-contain mx-auto"
                />
              </div>

              <a
                href={resizedUrl}
                download={`resized_${file.name}`}
                className="flex items-center gap-2 px-8 py-3 bg-neon-green text-zinc-950 font-bold rounded-lg hover:bg-neon-green/90 transition-colors"
                onClick={() => {
                  setTimeout(clearFile, 2000);
                }}
              >
                <Download size={20} />
                Download Resized Image
              </a>
              <p className="text-xs text-zinc-500">
                File will be automatically cleared from memory after download.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
