import React, { useState } from 'react';
import { Download, FileText, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

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
    houseNo: '',
    landmark: '',
    area: '',
    stateCity: '',
    pincode: '',
    phone: '',
    email: '',
    profileTitle: '',
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
    gender: 'Male',
    fatherName: '',
    dob: '',
    languages: '',
    nationality: 'Indian',
    maritalStatus: 'Unmarried'
  });

  const objectives = [
    "To work in a professional environment where I can utilize my skills and knowledge for the growth of the organization.",
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor Side */}
        <div className="space-y-8">
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
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">Enter Full Name *</label>
                <input 
                  type="text" placeholder="Full Name" 
                  value={personalInfo.name} onChange={e => setPersonalInfo({...personalInfo, name: e.target.value})}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">House No. *</label>
                  <input 
                    type="text" placeholder="House No." 
                    value={personalInfo.houseNo} onChange={e => setPersonalInfo({...personalInfo, houseNo: e.target.value})}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Landmark / Near by / Gali no.</label>
                  <input 
                    type="text" placeholder="Landmark" 
                    value={personalInfo.landmark} onChange={e => setPersonalInfo({...personalInfo, landmark: e.target.value})}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Area / Locality *</label>
                  <input 
                    type="text" placeholder="Area" 
                    value={personalInfo.area} onChange={e => setPersonalInfo({...personalInfo, area: e.target.value})}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">State / City *</label>
                  <input 
                    type="text" placeholder="State / City" 
                    value={personalInfo.stateCity} onChange={e => setPersonalInfo({...personalInfo, stateCity: e.target.value})}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Pincode *</label>
                  <input 
                    type="text" placeholder="Pincode" 
                    value={personalInfo.pincode} onChange={e => setPersonalInfo({...personalInfo, pincode: e.target.value})}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Mobile No. *</label>
                  <input 
                    type="text" placeholder="Mobile No." 
                    value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">Email Id</label>
                <input 
                  type="email" placeholder="Email Address" 
                  value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-zinc-400">What is your Profile ?</label>
                <input 
                  type="text" placeholder="Web Designer, Computer Operator" 
                  value={personalInfo.profileTitle} onChange={e => setPersonalInfo({...personalInfo, profileTitle: e.target.value})}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
                    {personalInfo.profilePic ? (
                      <img src={personalInfo.profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <FileText size={24} className="text-zinc-600" />
                    )}
                  </div>
                  <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm transition-colors">
                    Upload Profile Picture
                    <input type="file" className="hidden" accept="image/*" onChange={handleProfilePicChange} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-zinc-100 mb-4">Career Objective</h3>
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
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none resize-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-zinc-100">Qualification</h3>
              <button onClick={addQualification} className="text-neon-blue hover:text-neon-blue/80 flex items-center gap-1 text-sm">
                <Plus size={16} /> Add More
              </button>
            </div>
            <div className="space-y-4">
              {qualifications.map((q, index) => (
                <div key={q.id} className="grid sm:grid-cols-5 gap-2 items-end bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-zinc-500 uppercase">Qualification*</label>
                    <input 
                      type="text" placeholder="10th, 12th, B.Tech" 
                      value={q.name} onChange={e => {
                        const newQ = [...qualifications];
                        newQ[index].name = e.target.value;
                        setQualifications(newQ);
                      }}
                      className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 focus:border-neon-blue focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-zinc-500 uppercase">University / Board*</label>
                    <input 
                      type="text" placeholder="CBSE, UP Board" 
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
                      type="text" placeholder="2018" 
                      value={q.year} onChange={e => {
                        const newQ = [...qualifications];
                        newQ[index].year = e.target.value;
                        setQualifications(newQ);
                      }}
                      className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 focus:border-neon-blue focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-zinc-500 uppercase">Per %*</label>
                    <input 
                      type="text" placeholder="85%" 
                      value={q.percentage} onChange={e => {
                        const newQ = [...qualifications];
                        newQ[index].percentage = e.target.value;
                        setQualifications(newQ);
                      }}
                      className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 focus:border-neon-blue focus:outline-none"
                    />
                  </div>
                  <button onClick={() => removeQualification(q.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
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
                    type="text" placeholder="Worked as Web Designer for 2 years" 
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
            <h3 className="text-xl font-bold text-zinc-100 mb-4">Personal Details</h3>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Gender *</label>
                  <select 
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                    value={personalDetails.gender}
                    onChange={e => setPersonalDetails({...personalDetails, gender: e.target.value})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Father's Name *</label>
                  <input 
                    type="text" placeholder="Father's Name" 
                    value={personalDetails.fatherName} onChange={e => setPersonalDetails({...personalDetails, fatherName: e.target.value})}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Date of Birth *</label>
                  <input 
                    type="date" 
                    value={personalDetails.dob} onChange={e => setPersonalDetails({...personalDetails, dob: e.target.value})}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Language known *</label>
                  <input 
                    type="text" placeholder="Hindi & English" 
                    value={personalDetails.languages} onChange={e => setPersonalDetails({...personalDetails, languages: e.target.value})}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Nationality *</label>
                  <input 
                    type="text" placeholder="Indian" 
                    value={personalDetails.nationality} onChange={e => setPersonalDetails({...personalDetails, nationality: e.target.value})}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-zinc-400">Marital status *</label>
                  <select 
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:border-neon-blue focus:outline-none"
                    value={personalDetails.maritalStatus}
                    onChange={e => setPersonalDetails({...personalDetails, maritalStatus: e.target.value})}
                  >
                    <option value="Unmarried">Unmarried</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
          >
            Create Resume
          </button>
        </div>

        {/* Preview Side */}
        <div className="bg-white text-black p-8 rounded-xl shadow-2xl min-h-[800px] print:m-0 print:p-0 print:shadow-none print:w-full">
          <div className="flex justify-between items-start border-b-2 border-zinc-300 pb-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-zinc-900 uppercase tracking-tight mb-2">
                {personalInfo.name || 'Your Name'}
              </h1>
              <div className="text-sm text-zinc-600 font-medium mb-2">
                {personalInfo.profileTitle || 'Your Profile Title'}
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-zinc-600">
                {personalInfo.houseNo && <span>House No: {personalInfo.houseNo}</span>}
                {personalInfo.landmark && <span>Landmark: {personalInfo.landmark}</span>}
                {personalInfo.area && <span>Area: {personalInfo.area}</span>}
                {personalInfo.stateCity && <span>City: {personalInfo.stateCity}</span>}
                {personalInfo.pincode && <span>Pincode: {personalInfo.pincode}</span>}
                {personalInfo.phone && <span>Mobile: {personalInfo.phone}</span>}
                {personalInfo.email && <span className="col-span-2">Email: {personalInfo.email}</span>}
              </div>
            </div>
            {personalInfo.profilePic && (
              <div className="w-24 h-24 rounded-lg border-2 border-zinc-200 overflow-hidden ml-4">
                <img src={personalInfo.profilePic} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="text-right ml-4">
              <span className="text-2xl font-black text-zinc-300 tracking-widest uppercase">{docTitle}</span>
            </div>
          </div>

          {objective && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1 mb-2">
                Career Objective
              </h2>
              <p className="text-zinc-700 text-xs leading-relaxed">{objective}</p>
            </div>
          )}

          {qualifications.length > 0 && qualifications[0].name && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1 mb-2">
                Qualification
              </h2>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-50">
                    <th className="border p-1">Qualification</th>
                    <th className="border p-1">University / Board</th>
                    <th className="border p-1">Year</th>
                    <th className="border p-1">Per %</th>
                  </tr>
                </thead>
                <tbody>
                  {qualifications.map((q) => (
                    <tr key={q.id}>
                      <td className="border p-1">{q.name}</td>
                      <td className="border p-1">{q.university}</td>
                      <td className="border p-1">{q.year}</td>
                      <td className="border p-1">{q.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {otherQualifications.length > 0 && otherQualifications[0] && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1 mb-2">
                Other Qualification
              </h2>
              <ul className="list-disc list-inside text-xs text-zinc-700 space-y-1">
                {otherQualifications.map((q, i) => q && <li key={i}>{q}</li>)}
              </ul>
            </div>
          )}

          {experiencePoints.length > 0 && experiencePoints[0] && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1 mb-2">
                Work Experience
              </h2>
              <ul className="list-disc list-inside text-xs text-zinc-700 space-y-1">
                {experiencePoints.map((p, i) => p && <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1 mb-2">
              Personal Details
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs text-zinc-700">
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Gender:</span>
                <span>{personalDetails.gender}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Father's Name:</span>
                <span>{personalDetails.fatherName}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Date of Birth:</span>
                <span>{personalDetails.dob}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Language known:</span>
                <span>{personalDetails.languages}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Nationality:</span>
                <span>{personalDetails.nationality}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Marital status:</span>
                <span>{personalDetails.maritalStatus}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-xs text-zinc-500 italic">
            I hereby declare that the above information is true to the best of my knowledge.
          </div>
        </div>
      </div>
    </div>
  );
}
