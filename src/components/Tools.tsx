import { motion } from 'motion/react';
import { 
  FileText, 
  Briefcase, 
  Image as ImageIcon, 
  FileImage, 
  Minimize, 
  Maximize,
  FileType2, 
  ArrowRightLeft, 
  Calculator, 
  Type,
  ArrowLeft,
  Wrench,
  AlignLeft,
  Scissors,
  FileDigit
} from 'lucide-react';

const toolCategories = [
  {
    title: "Resume Tools",
    icon: <Briefcase className="text-neon-blue mb-4" size={32} />,
    color: "neon-blue",
    tools: [
      { name: "Resume & CV Maker", icon: <FileText size={18} />, description: "Create a professional resume or CV", href: "#/tools/resume-maker" }
    ]
  },
  {
    title: "File Tools",
    icon: <ImageIcon className="text-neon-green mb-4" size={32} />,
    color: "neon-green",
    tools: [
      { name: "Image to PNG", icon: <FileImage size={18} />, description: "Convert images to PNG format", href: "#/tools/jpg-to-png" },
      { name: "PNG to JPG", icon: <FileImage size={18} />, description: "Convert PNG files to JPG", href: "#/tools/png-to-jpg" },
      { name: "Image Compressor", icon: <Minimize size={18} />, description: "Reduce image file size", href: "#/tools/image-compressor" },
      { name: "Image Resizer", icon: <Maximize size={18} />, description: "Resize image dimensions", href: "#/tools/image-resizer" }
    ]
  },
  {
    title: "PDF Tools",
    icon: <FileType2 className="text-red-500 mb-4" size={32} />,
    color: "red-500",
    tools: [
      { name: "PDF to Word", icon: <ArrowRightLeft size={18} />, description: "Convert PDF documents to Word", href: "#/tools/pdf-to-word" },
      { name: "Word to PDF", icon: <ArrowRightLeft size={18} />, description: "Convert Word documents to PDF", href: "#/tools/word-to-pdf" },
      { name: "Merge PDF", icon: <FileType2 size={18} />, description: "Combine multiple PDFs", href: "#/tools/merge-pdf" },
      { name: "Compress PDF", icon: <Minimize size={18} />, description: "Reduce PDF file size", href: "#/tools/compress-pdf" }
    ]
  },
  {
    title: "Text Tools",
    icon: <Type className="text-purple-500 mb-4" size={32} />,
    color: "purple-500",
    tools: [
      { name: "Word Counter", icon: <Type size={18} />, description: "Count words and characters", href: "#/tools/word-counter" },
      { name: "Text Formatter", icon: <AlignLeft size={18} />, description: "Format text cases", href: "#/tools/text-formatter" }
    ]
  },
  {
    title: "Utility Tools",
    icon: <Wrench className="text-orange-500 mb-4" size={32} />,
    color: "orange-500",
    tools: [
      { name: "Unit Converter", icon: <Calculator size={18} />, description: "Convert between different units", href: "#/tools/unit-converter" },
      { name: "File Size Calculator", icon: <FileDigit size={18} />, description: "Calculate file sizes", href: "#/tools/file-size-calculator" }
    ]
  }
];

export default function Tools() {
  return (
    <section id="tools" className="py-24 relative overflow-hidden bg-zinc-950">
      {/* Background glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full flex-1">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Free <span className="text-neon-blue">Tools</span>
          </h2>
          <div className="w-20 h-1 bg-neon-blue rounded-full mb-6" />
          <p className="text-xl text-zinc-400 max-w-2xl">
            A collection of handy utilities and tools to help you with your daily tasks, from resume building to file conversion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {toolCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-zinc-950 border border-zinc-800 shadow-lg`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-zinc-100">{category.title}</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {category.tools.map((tool, toolIdx) => (
                  <motion.a
                    key={tool.name}
                    href={tool.href}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-start p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-colors text-left group"
                  >
                    <div className={`text-zinc-400 group-hover:text-${category.color} transition-colors mb-3`}>
                      {tool.icon}
                    </div>
                    <h3 className="font-bold text-zinc-200 mb-1 group-hover:text-white transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2">
                      {tool.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
