import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, FileText, ArrowRightLeft } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Use the same worker as ResumeViewer
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PdfToWordTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedText, setConvertedText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setConvertedText(null);
    }
  };

  const convertToWord = async () => {
    if (!file) return;
    setIsConverting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n\n';
      }

      setConvertedText(fullText);
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      alert('Failed to extract text from PDF. The file might be corrupted or protected.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedText && file) {
      // Create a simple HTML document that MS Word can read
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>
        ${convertedText.split('\n').map(line => `<p>${line}</p>`).join('')}
        </body></html>
      `;
      
      const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const originalName = file.name.split('.')[0];
      a.download = `${originalName}-converted.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Auto-clear after download for privacy
      setFile(null);
      setConvertedText(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {!file ? (
        <div 
          className="w-full border-2 border-dashed border-zinc-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-red-500 transition-colors cursor-pointer bg-zinc-950/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={48} className="text-zinc-500 mb-4" />
          <h3 className="text-xl font-bold text-zinc-200 mb-2">Upload PDF Document</h3>
          <p className="text-sm text-zinc-500">Click to browse or drag and drop</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="application/pdf" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-1/2 aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 flex flex-col items-center justify-center p-6 relative">
              <FileText size={48} className="text-red-500 mb-4" />
              <p className="text-zinc-300 font-medium text-center truncate w-full px-4">{file.name}</p>
              <div className="absolute top-2 left-2 bg-zinc-900/80 px-2 py-1 rounded text-xs text-zinc-300 font-mono">Original (PDF)</div>
            </div>
            
            <div className="hidden sm:flex items-center justify-center">
              <ArrowRightLeft size={24} className="text-zinc-600" />
            </div>

            <div className="w-full sm:w-1/2 aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center p-6 relative">
              {convertedText ? (
                <div className="flex flex-col items-center">
                  <FileText size={48} className="text-blue-500 mb-4" />
                  <p className="text-zinc-300 font-medium text-center">Ready to Download</p>
                  <div className="absolute top-2 left-2 bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-mono">Converted (DOC)</div>
                </div>
              ) : (
                <div className="text-zinc-600 flex flex-col items-center">
                  <FileText size={32} className="mb-2 opacity-50" />
                  <span className="text-sm">Ready to extract</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-zinc-800">
            <button 
              onClick={() => {
                setFile(null);
                setConvertedText(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="px-6 py-3 rounded-lg bg-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            
            {!convertedText ? (
              <button 
                onClick={convertToWord}
                disabled={isConverting}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isConverting ? <RefreshCw className="animate-spin" size={20} /> : <RefreshCw size={20} />}
                Extract to Word
              </button>
            ) : (
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
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
