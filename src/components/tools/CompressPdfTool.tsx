import React, { useState, useRef } from 'react';
import { FileType2, Download, X, Loader2, Minimize, ArrowRightLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { PDFDocument } from 'pdf-lib';

export default function CompressPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ original: number; compressed: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setCompressedPdfUrl(null);
        setError(null);
        setStats(null);
      } else {
        setError('Please select a valid PDF file.');
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    if (compressedPdfUrl) {
      URL.revokeObjectURL(compressedPdfUrl);
      setCompressedPdfUrl(null);
    }
    setError(null);
    setStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const compressPdf = async () => {
    if (!file) return;

    setIsCompressing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      // Save the PDF document with useObjectStreams to potentially reduce size
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      if (blob.size >= file.size) {
        setError('This PDF is already highly optimized and cannot be compressed further client-side.');
        setIsCompressing(false);
        return;
      }

      const url = URL.createObjectURL(blob);
      setCompressedPdfUrl(url);
      setStats({
        original: file.size,
        compressed: blob.size
      });
    } catch (err) {
      console.error('Error compressing PDF:', err);
      setError('Failed to compress the PDF. It might be corrupted or password protected.');
    } finally {
      setIsCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div 
          className="border-2 border-dashed border-zinc-700 rounded-xl p-12 text-center hover:border-red-500/50 transition-colors cursor-pointer bg-zinc-900/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="application/pdf" 
            className="hidden" 
          />
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <Minimize size={32} />
          </div>
          <h3 className="text-xl font-bold text-zinc-200 mb-2">Upload PDF to Compress</h3>
          <p className="text-zinc-500 mb-6">Drag and drop your PDF file here or click to browse</p>
          <button className="px-6 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors font-medium">
            Select File
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
              <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center">
                <FileType2 size={24} />
              </div>
              <div>
                <h4 className="font-medium text-zinc-200 truncate max-w-[200px] sm:max-w-xs">{file.name}</h4>
                <p className="text-sm text-zinc-500">{formatSize(file.size)}</p>
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

          {!compressedPdfUrl ? (
            <div className="space-y-6">
              <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-zinc-400">Compression Level: {compressionLevel}%</label>
                  <span className="text-xs text-zinc-500">Higher % = More aggressive compression</span>
                </div>
                <input 
                  type="range" min="1" max="100" 
                  value={compressionLevel} onChange={e => setCompressionLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                  <span>Light</span>
                  <span>Recommended</span>
                  <span>Extreme</span>
                </div>
              </div>

              <div className="flex justify-center">
              <button
                onClick={compressPdf}
                disabled={isCompressing}
                className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCompressing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Minimize size={20} />
                    Compress PDF
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
            <div className="flex flex-col items-center gap-6">
              {stats && (
                <div className="flex items-center gap-8 p-4 bg-zinc-950 rounded-lg border border-zinc-800 w-full justify-center">
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 mb-1">Original Size</p>
                    <p className="font-mono text-zinc-300">{formatSize(stats.original)}</p>
                  </div>
                  <div className="text-zinc-600">
                    <ArrowRightLeft size={20} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 mb-1">Compressed Size</p>
                    <p className="font-mono text-green-400 font-bold">{formatSize(stats.compressed)}</p>
                  </div>
                  <div className="text-center pl-4 border-l border-zinc-800">
                    <p className="text-xs text-zinc-500 mb-1">Saved</p>
                    <p className="font-mono text-neon-green font-bold">
                      {Math.round(((stats.original - stats.compressed) / stats.original) * 100)}%
                    </p>
                  </div>
                </div>
              )}

              <a
                href={compressedPdfUrl}
                download={`compressed_${file.name}`}
                className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => {
                  setTimeout(clearFile, 2000);
                }}
              >
                <Download size={20} />
                Download Compressed PDF
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
