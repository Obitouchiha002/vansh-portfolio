import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    const updateWidth = () => {
      setContainerWidth(Math.min(window.innerWidth - 64, 800));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-950/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/50">
              <h3 className="text-xl font-display font-bold text-zinc-100">My Resume</h3>
              <div className="flex items-center gap-4">
                <a
                  href="/Vansh_Kashyap_Resume.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-green text-zinc-950 font-semibold hover:bg-neon-green/90 transition-colors text-sm"
                >
                  <Download size={16} />
                  Download PDF
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-zinc-950 p-4 sm:p-8 overflow-y-auto flex flex-col items-center">
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
                  className="rounded-xl overflow-hidden border border-zinc-800 shadow-2xl"
                />
              </Document>
              
              {numPages && numPages > 1 && (
                <div className="flex items-center gap-4 mt-6">
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
