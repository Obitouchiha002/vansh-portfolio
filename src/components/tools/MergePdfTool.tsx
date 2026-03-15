import React, { useState, useRef } from 'react';
import { FileType2, Download, X, Plus, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PDFDocument } from 'pdf-lib';

export default function MergePdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    const validFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    
    if (validFiles.length !== selectedFiles.length) {
      setError('Some files were ignored because they are not PDF documents.');
    } else {
      setError(null);
    }

    setFiles(prev => [...prev, ...validFiles]);
    setMergedPdfUrl(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const clearAll = () => {
    setFiles([]);
    if (mergedPdfUrl) {
      URL.revokeObjectURL(mergedPdfUrl);
      setMergedPdfUrl(null);
    }
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError('Please select at least two PDF files to merge.');
      return;
    }

    setIsMerging(true);
    setError(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (err) {
      console.error('Error merging PDFs:', err);
      setError('Failed to merge PDF files. Some files might be corrupted or password protected.');
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="space-y-6">
      <div 
        className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-red-500/50 transition-colors cursor-pointer bg-zinc-900/50"
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="application/pdf" 
          multiple 
          className="hidden" 
        />
        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
          <Plus size={32} />
        </div>
        <h3 className="text-xl font-bold text-zinc-200 mb-2">Add PDF Files</h3>
        <p className="text-zinc-500 mb-6">Select multiple PDF files to merge them into one</p>
        <button className="px-6 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors font-medium">
          Browse Files
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-zinc-200">Selected Files ({files.length})</h4>
            <button 
              onClick={clearAll}
              className="text-sm text-zinc-400 hover:text-red-400 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div 
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileType2 size={18} className="text-red-400 shrink-0" />
                    <span className="text-sm text-zinc-300 truncate">{file.name}</span>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className="p-1 text-zinc-500 hover:text-red-400 transition-colors shrink-0"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {!mergedPdfUrl ? (
            <div className="flex justify-center">
              <button
                onClick={mergePdfs}
                disabled={isMerging || files.length < 2}
                className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isMerging ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Merging...
                  </>
                ) : (
                  <>
                    <FileType2 size={20} />
                    Merge PDFs
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm w-full text-center">
                Merge successful! Your combined PDF is ready.
              </div>
              <a
                href={mergedPdfUrl}
                download="merged_document.pdf"
                className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => {
                  setTimeout(clearAll, 2000);
                }}
              >
                <Download size={20} />
                Download Merged PDF
              </a>
              <p className="text-xs text-zinc-500 mt-2">
                Files will be automatically cleared from memory after download.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
