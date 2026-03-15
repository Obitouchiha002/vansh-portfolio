import ToolLayout from './ToolLayout';
import ImageConverter from './ImageConverter';
import ImageCompressorTool from './ImageCompressorTool';
import ImageResizerTool from './ImageResizerTool';
import PdfToWordTool from './PdfToWordTool';
import WordToPdfTool from './WordToPdfTool';
import MergePdfTool from './MergePdfTool';
import CompressPdfTool from './CompressPdfTool';
import TextTools from './TextTools';
import UtilityTools from './UtilityTools';

interface ToolRouteProps {
  path: string;
}

export default function ToolRoute({ path }: ToolRouteProps) {
  const toolId = path.split('/tools/')[1];

  switch (toolId) {
    // Image Tools
    case 'png-to-jpg':
      return (
        <ToolLayout 
          title="PNG to JPG Converter" 
          description="Convert your PNG images to JPG format instantly without losing quality."
          steps={['Upload your PNG image', 'Click Convert to JPG', 'Download your new JPG file']}
        >
          <ImageConverter fromFormat="PNG" toFormat="JPG" />
        </ToolLayout>
      );
    case 'jpg-to-png':
      return (
        <ToolLayout 
          title="JPG to PNG Converter" 
          description="Convert your JPG images to PNG format instantly."
          steps={['Upload your JPG image', 'Click Convert to PNG', 'Download your new PNG file']}
        >
          <ImageConverter fromFormat="JPG" toFormat="PNG" />
        </ToolLayout>
      );
    case 'image-compressor':
      return (
        <ToolLayout 
          title="Image Compressor" 
          description="Reduce the file size of your images while maintaining quality."
          steps={['Upload your image', 'Click Compress Image', 'Download the compressed file']}
        >
          <ImageCompressorTool />
        </ToolLayout>
      );
    case 'image-resizer':
      return (
        <ToolLayout 
          title="Image Resizer" 
          description="Resize your images to specific dimensions easily."
          steps={['Upload your image', 'Enter new width or height', 'Download the resized image']}
        >
          <ImageResizerTool />
        </ToolLayout>
      );

    // PDF Tools
    case 'pdf-to-word':
      return (
        <ToolLayout 
          title="PDF to Word Converter" 
          description="Extract text from your PDF documents and save them as Word-compatible files."
          steps={['Upload your PDF document', 'Click Extract to Word', 'Download your DOC file']}
        >
          <PdfToWordTool />
        </ToolLayout>
      );
    case 'word-to-pdf':
      return (
        <ToolLayout 
          title="Word to PDF Converter" 
          description="Convert your Word documents (.docx) to PDF format."
          steps={['Upload your Word document', 'Click Convert to PDF', 'Download your new PDF file']}
        >
          <WordToPdfTool />
        </ToolLayout>
      );
    case 'merge-pdf':
      return (
        <ToolLayout 
          title="Merge PDF" 
          description="Combine multiple PDF files into a single document."
          steps={['Upload multiple PDF files', 'Click Merge PDFs', 'Download the combined PDF']}
        >
          <MergePdfTool />
        </ToolLayout>
      );
    case 'compress-pdf':
      return (
        <ToolLayout 
          title="Compress PDF" 
          description="Reduce the file size of your PDF documents."
          steps={['Upload your PDF document', 'Click Compress PDF', 'Download the optimized file']}
        >
          <CompressPdfTool />
        </ToolLayout>
      );

    // Text Tools
    case 'word-counter':
      return (
        <ToolLayout 
          title="Word Counter" 
          description="Count the number of words and characters in your text instantly."
          steps={['Type or paste your text', 'View the word and character count', 'Copy the text if needed']}
        >
          <TextTools toolType="word-counter" />
        </ToolLayout>
      );
    case 'text-formatter':
      return (
        <ToolLayout 
          title="Text Formatter" 
          description="Format your text to uppercase, lowercase, or capitalize."
          steps={['Type or paste your text', 'Choose a formatting option', 'Copy the formatted text']}
        >
          <TextTools toolType="text-formatter" />
        </ToolLayout>
      );
    case 'remove-extra-spaces':
      return (
        <ToolLayout 
          title="Remove Extra Spaces" 
          description="Clean up your text by removing unnecessary spaces and line breaks."
          steps={['Type or paste your text', 'Click Remove Extra Spaces', 'Copy the cleaned text']}
        >
          <TextTools toolType="remove-spaces" />
        </ToolLayout>
      );

    // Utility Tools
    case 'unit-converter':
      return (
        <ToolLayout 
          title="Unit Converter" 
          description="Convert between different units of length, weight, and temperature."
          steps={['Select the units to convert between', 'Enter the value', 'Click Convert to see the result']}
        >
          <UtilityTools toolType="unit-converter" />
        </ToolLayout>
      );
    case 'file-size-calculator':
      return (
        <ToolLayout 
          title="File Size Calculator" 
          description="Convert file sizes between Bytes, KB, MB, and GB."
          steps={['Enter the file size', 'Select the unit', 'Click Calculate to see all conversions']}
        >
          <UtilityTools toolType="file-size" />
        </ToolLayout>
      );

    default:
      return (
        <div className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-zinc-100 mb-4">Tool Not Found</h1>
          <p className="text-zinc-400 mb-8">The tool you are looking for does not exist or is currently under development.</p>
          <a href="#/tools" className="px-6 py-3 bg-neon-green text-zinc-950 font-bold rounded-lg hover:bg-neon-green/90 transition-colors">
            Back to Tools
          </a>
        </div>
      );
  }
}
