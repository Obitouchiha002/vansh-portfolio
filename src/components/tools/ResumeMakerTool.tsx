import React, { useState, useRef } from 'react';
import { Download, FileText, Plus, Trash2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import domtoimage from 'dom-to-image-more';
import { jsPDF } from 'jspdf';

interface Qualification {
  id: string;
  name: string;
  university: string;
  year: string;
  percentage: string;
}

export default function ResumeMakerTool() {
  const [docTitle, setDocTitle] = useState('RESUME');
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    profileTitle: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    phone: '',
    email: '',
    profilePic: ''
  });

  const [objective, setObjective] = useState('');
  const [selectedObjective, setSelectedObjective] = useState('');

  const [qualifications, setQualifications] = useState<Qualification[]>([
    { id: '1', name: '', university: '', year: '', percentage: '' }
  ]);

  const [otherQualifications, setOtherQualifications] = useState<string[]>(['']);
  const [experiencePoints, setExperiencePoints] = useState<string[]>(['']);

  const [personalDetails, setPersonalDetails] = useState({
    fatherName: '',
    dob: '',
    languages: '',
    gender: 'Male',
    nationality: 'Indian',
    maritalStatus: 'Unmarried',
    place: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const [scale, setScale] = useState(1);

  const resumeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 32; // 32px for padding
        const a4Width = 794; // 210mm at 96dpi
        if (containerWidth < a4Width) {
          setScale(containerWidth / a4Width);
        } else {
          setScale(1);
        }
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const objectives = [
    "To make contribution in the organization with best of my ability and also to Develop new skills during the interaction to achieve new heights.",
    "Seeking a challenging position in a reputable organization to utilize my technical and management skills.",
    "To obtain a position that will allow me to utilize my technical skills, experience and willingness to learn.",
    "A highly motivated and hardworking individual looking for a responsible role in a dynamic organization."
  ];

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalInfo({ ...personalInfo, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addQualification = () => {
    setQualifications([...qualifications, { id: Date.now().toString(), name: '', university: '', year: '', percentage: '' }]);
  };

  const removeQualification = (id: string) => {
    setQualifications(qualifications.filter(q => q.id !== id));
  };

  const addOtherQual = () => setOtherQualifications([...otherQualifications, '']);
  const removeOtherQual = (index: number) => setOtherQualifications(otherQualifications.filter((_, i) => i !== index));

  const addExpPoint = () => setExperiencePoints([...experiencePoints, '']);
  const removeExpPoint = (index: number) => setExperiencePoints(experiencePoints.filter((_, i) => i !== index));

  const handleNumberInput = (value: string) => value.replace(/[^0-9+]/g, '');
  const handlePercentageInput = (value: string) => value.replace(/[^0-9.%]/g, '');

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!personalInfo.name) newErrors.push('name');
    if (!personalInfo.profileTitle) newErrors.push('profileTitle');
    if (!personalInfo.addressLine1) newErrors.push('addressLine1');
    if (!personalInfo.phone) newErrors.push('phone');
    if (!personalInfo.email) newErrors.push('email');
    if (!objective) newErrors.push('objective');
    
    qualifications.forEach((q, i) => {
      if (!q.name || !q.university || !q.year || !q.percentage) {
        newErrors.push(`qualification-${i}`);
      }
    });

    setErrors(newErrors);

    if (newErrors.length > 0) {
      setShowErrorPopup(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setShowErrorPopup(false), 5000);
      return false;
    }
    return true;
  };

  const handleDownload = async () => {
    if (!validateForm()) return;
    
    const element = resumeRef.current;
    const parent = containerRef.current;
    if (!element || !parent) return;

    setIsGenerating(true);

    try {
      // Temporarily remove scale for perfect capture
      const innerDiv = parent.children[0] as HTMLElement;
      let originalTransform = '';
      if (innerDiv) {
        originalTransform = innerDiv.style.transform;
        innerDiv.style.transform = 'none';
      }

      // Wait a tick for the DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));

      const scale = 2;
      const imgData = await domtoimage.toJpeg(element, {
        quality: 0.98,
        width: 794 * scale,
        height: element.scrollHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '794px',
          height: `${element.scrollHeight}px`
        }
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (element.scrollHeight * pdfWidth) / 794;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${personalInfo.name.replace(/\s+/g, '_') || 'My'}_Resume.pdf`);

      // Restore scale
      if (innerDiv) {
        innerDiv.style.transform = originalTransform;
      }
      setPdfError('');
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      setPdfError(error?.message || "An error occurred while generating the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getInputClass = (fieldName: string) => {
    const baseClass = "w-full bg-zinc-900 border rounded-lg px-4 py-2 text-zinc-100 focus:outline-none transition-colors";
    return `${baseClass} ${errors.includes(fieldName) ? 'border-red-500 focus:border-red-500 bg-red-500/5' : 'border-zinc-700 focus:border-neon-blue'}`;
  };

  return (
    <div className="flex flex-col gap-8 relative">
      <AnimatePresence>
        {showErrorPopup && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-medium print:hidden"
          >
            <AlertCircle size={20} />
            Please fill all the highlighted required fields to generate the resume!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-2 gap-8 print:block print:gap-0">
        {/* Editor Side */}
        <div className="space-y-8 bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800 print:hidden">
          <div>
            <h3 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <FileText className="text-neon-blue" size={20} />
              Personal Info
            </h3>
            <div className="grid gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">Heading *</label>
                <input 
                  type="text" placeholder="RESUME" 
                  value={docTitle} onChange={e => setDocTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">Full Name *</label>
                <input 
                  type="text" placeholder="e.g. Sachin Kumar" 
                  value={personalInfo.name} onChange={e => setPersonalInfo({...personalInfo, name: e.target.value})}
                  className={getInputClass('name')}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">Profile Title *</label>
                <input 
                  type="text" placeholder="e.g. Computer Operator" 
                  value={personalInfo.profileTitle} onChange={e => setPersonalInfo({...personalInfo, profileTitle: e.target.value})}
                  className={getInputClass('profileTitle')}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">Address Line 1 *</label>
                <input 
                  type="text" placeholder="e.g. P - 171 Gali No. 5" 
                  value={personalInfo.addressLine1} onChange={e => setPersonalInfo({...personalInfo, addressLine1: e.target.value})}
                  className={getInputClass('addressLine1')}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">Address Line 2 *</label>
                <input 
                  type="text" placeholder="e.g. Baljeet Nagar, Patel Nagar" 
                  value={personalInfo.addressLine2} onChange={e => setPersonalInfo({...personalInfo, addressLine2: e.target.value})}
                  className={getInputClass('addressLine2')}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">Address Line 3 *</label>
                <input 
                  type="text" placeholder="e.g. New Delhi - 110008" 
                  value={personalInfo.addressLine3} onChange={e => setPersonalInfo({...personalInfo, addressLine3: e.target.value})}
                  className={getInputClass('addressLine3')}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Mobile No. *</label>
                  <input 
                    type="text" placeholder="+91 1234567890" 
                    value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: handleNumberInput(e.target.value)})}
                    className={getInputClass('phone')}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Email Id *</label>
                  <input 
                    type="email" placeholder="example@gmail.com" 
                    value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})}
                    className={getInputClass('email')}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">Profile Picture (Optional)</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-24 rounded bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
                    {personalInfo.profilePic ? (
                      <img src={personalInfo.profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FileText size={24} className="text-zinc-600" />
                    )}
                  </div>
                  <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm transition-colors">
                    Upload Photo
                    <input type="file" className="hidden" accept="image/*" onChange={handleProfilePicChange} />
                  </label>
                  {personalInfo.profilePic && (
                    <button 
                      onClick={() => setPersonalInfo({...personalInfo, profilePic: ''})}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-zinc-100 mb-4">Career Objective *</h3>
            <div className="space-y-4">
              <select 
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                value={selectedObjective}
                onChange={e => {
                  setSelectedObjective(e.target.value);
                  setObjective(e.target.value);
                }}
              >
                <option value="">Select Objective</option>
                {objectives.map((obj, i) => (
                  <option key={i} value={obj}>{obj.substring(0, 50)}...</option>
                ))}
              </select>
              <textarea 
                placeholder="Career Objective" rows={4}
                value={objective} onChange={e => setObjective(e.target.value)}
                className={getInputClass('objective') + " resize-none"}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-zinc-100">Academic Qualification *</h3>
              <button onClick={addQualification} className="text-neon-blue hover:text-neon-blue/80 flex items-center gap-1 text-sm">
                <Plus size={16} /> Add More
              </button>
            </div>
            <div className="space-y-4">
              {qualifications.map((q, index) => {
                const hasError = errors.includes(`qualification-${index}`);
                return (
                  <div key={q.id} className={`grid sm:grid-cols-5 gap-2 items-end bg-zinc-900/50 p-3 rounded-xl border ${hasError ? 'border-red-500 bg-red-500/5' : 'border-zinc-800'}`}>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-zinc-500 uppercase">Qualification*</label>
                      <input 
                        type="text" placeholder="10th, 12th" 
                        value={q.name} onChange={e => {
                          const newQ = [...qualifications];
                          newQ[index].name = e.target.value;
                          setQualifications(newQ);
                        }}
                        className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-zinc-500 uppercase">Board*</label>
                      <input 
                        type="text" placeholder="CBSE Board" 
                        value={q.university} onChange={e => {
                          const newQ = [...qualifications];
                          newQ[index].university = e.target.value;
                          setQualifications(newQ);
                        }}
                        className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-zinc-500 uppercase">Year*</label>
                      <input 
                        type="text" placeholder="2014" 
                        value={q.year} onChange={e => {
                          const newQ = [...qualifications];
                          newQ[index].year = handleNumberInput(e.target.value);
                          setQualifications(newQ);
                        }}
                        className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-zinc-500 uppercase">Per %*</label>
                      <input 
                        type="text" placeholder="82%" 
                        value={q.percentage} onChange={e => {
                          const newQ = [...qualifications];
                          newQ[index].percentage = handlePercentageInput(e.target.value);
                          setQualifications(newQ);
                        }}
                        className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 focus:border-neon-blue focus:outline-none"
                      />
                    </div>
                    <button onClick={() => removeQualification(q.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-zinc-100">Other Qualification</h3>
              <button onClick={addOtherQual} className="text-neon-blue hover:text-neon-blue/80 flex items-center gap-1 text-sm">
                <Plus size={16} /> Add More
              </button>
            </div>
            <div className="space-y-2">
              {otherQualifications.map((q, index) => (
                <div key={index} className="flex gap-2">
                  <input 
                    type="text" placeholder="Basic Knowledge of Computer" 
                    value={q} onChange={e => {
                      const newQ = [...otherQualifications];
                      newQ[index] = e.target.value;
                      setOtherQualifications(newQ);
                    }}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                  <button onClick={() => removeOtherQual(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-zinc-100">Work Experience</h3>
              <button onClick={addExpPoint} className="text-neon-blue hover:text-neon-blue/80 flex items-center gap-1 text-sm">
                <Plus size={16} /> Add Point
              </button>
            </div>
            <div className="space-y-2">
              {experiencePoints.map((p, index) => (
                <div key={index} className="flex gap-2">
                  <input 
                    type="text" placeholder="2 Years of Experience as a Computer Operator" 
                    value={p} onChange={e => {
                      const newP = [...experiencePoints];
                      newP[index] = e.target.value;
                      setExperiencePoints(newP);
                    }}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                  <button onClick={() => removeExpPoint(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-zinc-100 mb-4">Personal Information</h3>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Father's Name *</label>
                  <input 
                    type="text" placeholder="Pramod Kumar" 
                    value={personalDetails.fatherName} onChange={e => setPersonalDetails({...personalDetails, fatherName: e.target.value})}
                    className={getInputClass('fatherName')}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Date of Birth *</label>
                  <input 
                    type="date" 
                    value={personalDetails.dob} onChange={e => setPersonalDetails({...personalDetails, dob: e.target.value})}
                    className={getInputClass('dob')}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Language Known *</label>
                  <input 
                    type="text" placeholder="Hindi And English" 
                    value={personalDetails.languages} onChange={e => setPersonalDetails({...personalDetails, languages: e.target.value})}
                    className={getInputClass('languages')}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Gender *</label>
                  <select 
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                    value={personalDetails.gender}
                    onChange={e => setPersonalDetails({...personalDetails, gender: e.target.value})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Nationality *</label>
                  <input 
                    type="text" placeholder="Indian" 
                    value={personalDetails.nationality} onChange={e => setPersonalDetails({...personalDetails, nationality: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Marital Status *</label>
                  <select 
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                    value={personalDetails.maritalStatus}
                    onChange={e => setPersonalDetails({...personalDetails, maritalStatus: e.target.value})}
                  >
                    <option value="Unmarried">Unmarried</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">Place (For Declaration) *</label>
                <input 
                  type="text" placeholder="New Delhi" 
                  value={personalDetails.place} onChange={e => setPersonalDetails({...personalDetails, place: e.target.value})}
                  className={getInputClass('place')}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-neon-green text-zinc-950 font-bold hover:bg-neon-green/90 transition-colors disabled:opacity-50"
            >
              {isGenerating ? 'Generating PDF...' : 'Download Resume PDF'}
              <Download size={20} />
            </button>
            {pdfError && (
              <div className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded-lg">
                {pdfError}
              </div>
            )}
            <p className="text-xs text-zinc-500 text-center mt-2">
              Note: For the best quality and selectable text, you can also use <kbd className="bg-zinc-800 px-1 rounded">Ctrl+P</kbd> (or <kbd className="bg-zinc-800 px-1 rounded">Cmd+P</kbd>) to print and "Save as PDF".
            </p>
          </div>
        </div>

        {/* Preview Side */}
        <div 
          ref={containerRef} 
          className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex justify-center overflow-hidden print:p-0 print:border-none print:bg-transparent print:!min-h-0 print:!block"
          style={{ minHeight: `${1123 * scale + 32}px` }}
        >
          {/* A4 Size Container (210mm x 297mm aspect ratio) */}
          <div 
            style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: 'top center', 
              width: '794px' 
            }}
            className="print:!transform-none print:!w-full"
          >
            {/* The element to be printed */}
            <div 
              ref={resumeRef} 
              className="bg-white text-black relative print:shadow-none print:!w-full print:!min-h-0 border-none" 
              style={{ 
                width: '794px', 
                minHeight: '1123px', 
                padding: '45px 55px', 
                boxSizing: 'border-box',
                fontFamily: 'Arial, Helvetica, sans-serif' 
              }}
            >
              
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold tracking-widest uppercase">{docTitle}</h1>
              </div>

              <div className="flex justify-between items-start mb-4">
                <div className="text-[13px] leading-snug">
                  <h2 className="text-xl font-bold mb-1">{personalInfo.name || 'Your Name'}</h2>
                  <div className="mb-2 font-medium">{personalInfo.profileTitle || 'Profile Title'}</div>
                  <div>{personalInfo.addressLine1 || 'Address Line 1'}</div>
                  <div>{personalInfo.addressLine2 || 'Address Line 2'}</div>
                  <div>{personalInfo.addressLine3 || 'Address Line 3'}</div>
                  <div>Mob No. : {personalInfo.phone || '+91 XXXXXXXXXX'}</div>
                  <div>Email Id : {personalInfo.email || 'example@email.com'}</div>
                </div>
                <div className="w-[35mm] h-[45mm] bg-zinc-100 flex items-center justify-center overflow-hidden shrink-0">
                  {personalInfo.profilePic ? (
                    <img src={personalInfo.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-zinc-400 text-xs">Photo</span>
                  )}
                </div>
              </div>

              <div className="w-full h-[2px] bg-black mb-4"></div>

              {/* Sections */}
              <div className="space-y-4">
                
                {/* Career Objective */}
                <div>
                  <h3 className="bg-[#e0e0e0] font-bold text-[14px] px-2 py-1 mb-2 uppercase tracking-wide">CAREER OBJECTIVE</h3>
                  <p className="text-[13px] leading-snug text-justify">
                    {objective || 'Your career objective will appear here.'}
                  </p>
                </div>

                {/* Academic Qualification */}
                <div>
                  <h3 className="bg-[#e0e0e0] font-bold text-[14px] px-2 py-1 mb-2 uppercase tracking-wide">ACADEMIC QUALIFICATION</h3>
                  <table className="w-full text-[13px] border-collapse text-center">
                    <thead>
                      <tr className="bg-zinc-50">
                        <th className="p-1.5 font-bold w-12 border-b border-black">S.No.</th>
                        <th className="p-1.5 font-bold text-left border-b border-black">Qualification</th>
                        <th className="p-1.5 font-bold text-left border-b border-black">University / Board</th>
                        <th className="p-1.5 font-bold border-b border-black">Year</th>
                        <th className="p-1.5 font-bold border-b border-black">Per %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {qualifications.map((q, i) => (
                        <tr key={q.id}>
                          <td className="p-1.5 border-b border-zinc-200">{i + 1}</td>
                          <td className="p-1.5 text-left border-b border-zinc-200">{q.name}</td>
                          <td className="p-1.5 text-left border-b border-zinc-200">{q.university}</td>
                          <td className="p-1.5 border-b border-zinc-200">{q.year}</td>
                          <td className="p-1.5 border-b border-zinc-200">{q.percentage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Other Qualification */}
                {otherQualifications.some(q => q.trim() !== '') && (
                  <div>
                    <h3 className="bg-[#e0e0e0] font-bold text-[14px] px-2 py-1 mb-2 uppercase tracking-wide">OTHER QUALIFICATION</h3>
                    <ul className="list-disc list-inside text-[13px] leading-snug space-y-1 ml-2">
                      {otherQualifications.filter(q => q.trim() !== '').map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Work Experience */}
                {experiencePoints.some(p => p.trim() !== '') && (
                  <div>
                    <h3 className="bg-[#e0e0e0] font-bold text-[14px] px-2 py-1 mb-2 uppercase tracking-wide">WORK EXPERIENCE</h3>
                    <ul className="list-disc list-inside text-[13px] leading-snug space-y-1 ml-2">
                      {experiencePoints.filter(p => p.trim() !== '').map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Personal Information */}
                <div>
                  <h3 className="bg-[#e0e0e0] font-bold text-[14px] px-2 py-1 mb-2 uppercase tracking-wide">PERSONAL INFORMATION</h3>
                  <div className="text-[13px] leading-relaxed">
                    <div className="flex">
                      <div className="w-40 font-semibold">Father's Name</div>
                      <div className="w-4 text-center">:</div>
                      <div className="flex-1">{personalDetails.fatherName || '-'}</div>
                    </div>
                    <div className="flex">
                      <div className="w-40 font-semibold">Date of Birth</div>
                      <div className="w-4 text-center">:</div>
                      <div className="flex-1">{personalDetails.dob || '-'}</div>
                    </div>
                    <div className="flex">
                      <div className="w-40 font-semibold">Language Known</div>
                      <div className="w-4 text-center">:</div>
                      <div className="flex-1">{personalDetails.languages || '-'}</div>
                    </div>
                    <div className="flex">
                      <div className="w-40 font-semibold">Gender</div>
                      <div className="w-4 text-center">:</div>
                      <div className="flex-1">{personalDetails.gender || '-'}</div>
                    </div>
                    <div className="flex">
                      <div className="w-40 font-semibold">Nationality</div>
                      <div className="w-4 text-center">:</div>
                      <div className="flex-1">{personalDetails.nationality || '-'}</div>
                    </div>
                    <div className="flex">
                      <div className="w-40 font-semibold">Marital Status</div>
                      <div className="w-4 text-center">:</div>
                      <div className="flex-1">{personalDetails.maritalStatus || '-'}</div>
                    </div>
                  </div>
                </div>

                {/* Declaration */}
                <div>
                  <h3 className="bg-[#e0e0e0] font-bold text-[14px] px-2 py-1 mb-2 uppercase tracking-wide">DECLARATION</h3>
                  <p className="text-[13px] leading-snug">
                    I hereby declared that the above information given by me is true to best of my Knowledge.
                  </p>
                </div>

                {/* Footer Signatures */}
                <div className="mt-8 flex justify-between items-end text-[13px] font-bold">
                  <div>
                    <div>Date :</div>
                    <div>Place : {personalDetails.place || 'New Delhi'}</div>
                  </div>
                  <div>
                    ({personalInfo.name || 'Your Name'})
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
