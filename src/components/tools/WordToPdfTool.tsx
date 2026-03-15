import React, { useState, useRef } from 'react';
import { FileText, Download, X, FileType2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';

export default function WordToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || selectedFile.name.endsWith('.docx')) {
        setFile(selectedFile);
        setPdfUrl(null);
        setError(null);
      } else {
        setError('Please select a valid .docx file.');
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const convertToPdf = async () => {
    if (!file) return;

    setIsConverting(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      const doc = new jsPDF();
      const margin = 15;
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      const maxLineWidth = pageWidth - margin * 2;
      const fontSize = 12;
      const lineHeight = 1.15;

      doc.setFontSize(fontSize);
      
      const splitText = doc.splitTextToSize(text, maxLineWidth);
      
      let cursorY = margin;
      
      for (let i = 0; i < splitText.length; i++) {
        if (cursorY + (fontSize * lineHeight) / doc.internal.scaleFactor > pageHeight - margin) {
          doc.addPage();
          cursorY = margin;
        }
        doc.text(splitText[i], margin, cursorY);
        cursorY += (fontSize * lineHeight) / doc.internal.scaleFactor;
      }

      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    } catch (err) {
      console.error('Error converting Word to PDF:', err);
      setError('Failed to convert the document. Please ensure it is a valid .docx file.');
    } finally {
      setIsConverting(false);
    }
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
            accept=".docx" 
            className="hidden" 
          />
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <FileText size={32} />
          </div>
          <h3 className="text-xl font-bold text-zinc-200 mb-2">Upload Word Document</h3>
          <p className="text-zinc-500 mb-6">Drag and drop your .docx file here or click to browse</p>
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
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-medium text-zinc-200 truncate max-w-[200px] sm:max-w-xs">{file.name}</h4>
                <p className="text-sm text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
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

          {!pdfUrl ? (
            <div className="flex justify-center">
              <button
                onClick={convertToPdf}
                disabled={isConverting}
                className="flex items-center gap-2 px-8 py-3 bg-neon-green text-zinc-950 font-bold rounded-lg hover:bg-neon-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConverting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <FileType2 size={20} />
                    Convert to PDF
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm w-full text-center">
                Conversion successful! Your PDF is ready.
              </div>
              <a
                href={pdfUrl}
                download={file.name.replace(/\.docx?$/i, '.pdf')}
                className="flex items-center gap-2 px-8 py-3 bg-neon-green text-zinc-950 font-bold rounded-lg hover:bg-neon-green/90 transition-colors"
                onClick={() => {
                  // Optional: clear after a short delay to ensure download starts
                  setTimeout(clearFile, 2000);
                }}
              >
                <Download size={20} />
                Download PDF
              </a>
              <p className="text-xs text-zinc-500 mt-2">
                File will be automatically cleared from memory after download.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
