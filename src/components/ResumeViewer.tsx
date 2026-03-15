import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function ResumeViewer() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    const updateWidth = () => {
      setContainerWidth(Math.min(window.innerWidth - 64, 1000));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-neon-green transition-colors mb-4"
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </a>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              My <span className="text-neon-green">Resume</span>
            </h1>
          </div>
          
          <a 
            href="/Vansh_Kashyap_Resume.pdf" 
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-zinc-950 font-bold rounded-full hover:bg-neon-green/90 transition-colors"
          >
            <Download size={18} />
            Download PDF
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center py-8"
          style={{ minHeight: '75vh' }}
        >
          <Document
            file="/Vansh_Kashyap_Resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="text-zinc-400 p-4">Loading PDF...</div>}
            className="max-w-full flex flex-col items-center"
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false} 
              renderAnnotationLayer={false}
              width={containerWidth}
              className="rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-white"
            />
          </Document>
          
          {numPages && numPages > 1 && (
            <div className="flex items-center gap-4 mt-8">
              <button
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber(p => p - 1)}
                className="p-2 rounded-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700 disabled:opacity-50 disabled:hover:bg-zinc-800 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-zinc-400 font-medium">
                Page {pageNumber} of {numPages}
              </span>
              <button
                disabled={pageNumber >= numPages}
                onClick={() => setPageNumber(p => p + 1)}
                className="p-2 rounded-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700 disabled:opacity-50 disabled:hover:bg-zinc-800 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
