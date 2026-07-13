import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function App() {
  const resumeRef = useRef();
  const [isEditing, setIsEditing] = useState(true);
  
  // Entirely dynamic state covering every text block and bullet point—initialized to be empty
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    
    // Education
    university: '',
    eduDate: '',
    degree: '',
    eduLocation: '',
    coursework: '',
    
    // Experience 1
    exp1Company: '',
    exp1Date: '',
    exp1Role: '',
    exp1Location: '',
    exp1Bullets: ['', '', ''],
    
    // Experience 2
    exp2Company: '',
    exp2Date: '',
    exp2Role: '',
    exp2Location: '',
    exp2Bullets: ['', '', ''],
    
    // Project 1
    proj1Name: '',
    proj1Tech: '',
    proj1Date: '',
    proj1Bullets: ['', '', ''],

    // Project 2
    proj2Name: '',
    proj2Tech: '',
    proj2Date: '',
    proj2Bullets: ['', '', ''],

    // Project 3
    proj3Name: '',
    proj3Tech: '',
    proj3Date: '',
    proj3Bullets: ['', '', ''],
    
    // Skills
    skillsLanguages: '',
    skillsTools: '',
    skillsTech: '',
    
    // Leadership
    leadOrg: '',
    leadDate: '',
    leadRole: '',
    leadLocation: '',
    leadBullets: ['', '', '']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBulletChange = (section, index, value) => {
    setFormData((prev) => {
      const updatedBullets = [...prev[section]];
      updatedBullets[index] = value;
      return { ...prev, [section]: updatedBullets };
    });
  };

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0,
      filename: `${formData.name.replace(/\s+/g, '_') || 'My'}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  // Helper function to render text or a clean placeholder preview
  const renderValue = (val, placeholder) => {
    return val ? val : <span className="text-gray-300 italic font-normal">{placeholder}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex flex-col items-center">
      
      {/* CONTROL BUTTONS */}
      <div className="mb-6 flex gap-4 sticky top-4 z-50 bg-white border border-gray-200 p-3 shadow-sm rounded-xl">
        <button
          onClick={() => setIsEditing(true)}
          className={`px-5 py-2 font-semibold rounded-lg text-sm transition ${isEditing ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          ✏️ Edit Info
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className={`px-5 py-2 font-semibold rounded-lg text-sm transition ${!isEditing ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          ✨ Preview Layout
        </button>
        {!isEditing && (
          <button
            onClick={handleDownloadPDF}
            className="px-5 py-2 bg-emerald-600 text-white font-semibold rounded-lg text-sm hover:bg-emerald-700 transition"
          >
            📥 Download PDF
          </button>
        )}
      </div>

      {/* 1. FORM SYSTEM FOR DATA COLLECTION */}
      {isEditing ? (
        <div className="w-full max-w-3xl bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-8 font-sans">
          <div>
            <h2 className="text-xl font-bold text-gray-900">CV Data Entry Form</h2>
            <p className="text-xs text-gray-500 mt-1">Fill out the segments below to build your standard Jake's CV profile.</p>
          </div>
          
          {/* Main Info */}
          <fieldset className="border border-gray-100 p-4 rounded-xl space-y-4">
            <legend className="px-2 text-xs font-bold uppercase text-gray-400 tracking-wider">Contact Basics</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-xs text-gray-600 font-medium">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Physical Location</label><input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Phone String</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Email Account</label><input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">LinkedIn Link</label><input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">GitHub Account</label><input type="text" name="github" value={formData.github} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
            </div>
          </fieldset>

          {/* Education Details */}
          <fieldset className="border border-gray-100 p-4 rounded-xl space-y-4">
            <legend className="px-2 text-xs font-bold uppercase text-gray-400 tracking-wider">Education Track</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-xs text-gray-600 font-medium">Institute Name</label><input type="text" name="university" value={formData.university} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Date Span</label><input type="text" name="eduDate" value={formData.eduDate} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Degree Program</label><input type="text" name="degree" value={formData.degree} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Campus Location</label><input type="text" name="eduLocation" value={formData.eduLocation} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
            </div>
            <div><label className="text-xs text-gray-600 font-medium">Relevant Coursework (Separated via Commas)</label><input type="text" name="coursework" value={formData.coursework} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
          </fieldset>

          {/* Experience Trackers */}
          <fieldset className="border border-gray-100 p-4 rounded-xl space-y-6">
            <legend className="px-2 text-xs font-bold uppercase text-gray-400 tracking-wider">Work Experience (1 & 2)</legend>
            
            {/* Job 1 */}
            <div className="space-y-3 pb-4 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-700">Role Position 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" name="exp1Company" placeholder="Company Name" value={formData.exp1Company} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp1Date" placeholder="Date Duration" value={formData.exp1Date} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp1Role" placeholder="Job Title" value={formData.exp1Role} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp1Location" placeholder="City, State" value={formData.exp1Location} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              {formData.exp1Bullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('exp1Bullets', idx, e.target.value)} placeholder={`Task description line ${idx+1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>

            {/* Job 2 */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-700">Role Position 2</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" name="exp2Company" placeholder="Company Name" value={formData.exp2Company} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp2Date" placeholder="Date Duration" value={formData.exp2Date} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp2Role" placeholder="Job Title" value={formData.exp2Role} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp2Location" placeholder="City, State" value={formData.exp2Location} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              {formData.exp2Bullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('exp2Bullets', idx, e.target.value)} placeholder={`Task description line ${idx+1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>
          </fieldset>

          {/* Projects Trackers */}
          <fieldset className="border border-gray-100 p-4 rounded-xl space-y-6">
            <legend className="px-2 text-xs font-bold uppercase text-gray-400 tracking-wider">Projects (1, 2 & 3)</legend>
            
            {/* Project 1 */}
            <div className="space-y-3 pb-4 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-700">Project 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" name="proj1Name" placeholder="Project Title" value={formData.proj1Name} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj1Tech" placeholder="Technologies" value={formData.proj1Tech} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj1Date" placeholder="Date/Timeline" value={formData.proj1Date} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              {formData.proj1Bullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('proj1Bullets', idx, e.target.value)} placeholder={`Project bullet line ${idx+1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>

            {/* Project 2 */}
            <div className="space-y-3 pb-4 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-700">Project 2</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" name="proj2Name" placeholder="Project Title" value={formData.proj2Name} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj2Tech" placeholder="Technologies" value={formData.proj2Tech} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj2Date" placeholder="Date/Timeline" value={formData.proj2Date} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              {formData.proj2Bullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('proj2Bullets', idx, e.target.value)} placeholder={`Project bullet line ${idx+1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>

            {/* Project 3 */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-700">Project 3</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" name="proj3Name" placeholder="Project Title" value={formData.proj3Name} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj3Tech" placeholder="Technologies" value={formData.proj3Tech} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj3Date" placeholder="Date/Timeline" value={formData.proj3Date} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              {formData.proj3Bullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('proj3Bullets', idx, e.target.value)} placeholder={`Project bullet line ${idx+1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>
          </fieldset>

          {/* Technical Skill Groups */}
          <fieldset className="border border-gray-100 p-4 rounded-xl space-y-4">
            <legend className="px-2 text-xs font-bold uppercase text-gray-400 tracking-wider">Skill Arrays</legend>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-600 font-medium">Programming Languages</label><input type="text" name="skillsLanguages" value={formData.skillsLanguages} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Developer Environments</label><input type="text" name="skillsTools" value={formData.skillsTools} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Frameworks & Infrastructures</label><input type="text" name="skillsTech" value={formData.skillsTech} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
            </div>
          </fieldset>

          {/* Leadership Detail Form */}
          <fieldset className="border border-gray-100 p-4 rounded-xl space-y-4">
            <legend className="px-2 text-xs font-bold uppercase text-gray-400 tracking-wider">Leadership / Extracurricular</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-xs text-gray-600 font-medium">Organization / Fraternity Name</label><input type="text" name="leadOrg" value={formData.leadOrg} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Date / Timeline</label><input type="text" name="leadDate" value={formData.leadDate} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Role Name (e.g. President)</label><input type="text" name="leadRole" value={formData.leadRole} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
              <div><label className="text-xs text-gray-600 font-medium">Location / University Name</label><input type="text" name="leadLocation" value={formData.leadLocation} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/></div>
            </div>
            <div className="space-y-2 mt-2">
              <label className="text-xs text-gray-600 font-medium">Bullet Points</label>
              {formData.leadBullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('leadBullets', idx, e.target.value)} placeholder={`Leadership description line ${idx+1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>
          </fieldset>

          <button 
            type="button" 
            onClick={() => setIsEditing(false)} 
            className="w-full py-3 bg-black text-white text-sm font-bold rounded-xl transition shadow-md hover:bg-gray-800"
          >
            Review Template Layout
          </button>
        </div>
      ) : (
        
        /* 2. EXACT VISUAL CV PREVIEW CANVAS */
        <div className="bg-white shadow-xl border border-gray-200 rounded-sm">
          <div 
            ref={resumeRef} 
            className="w-[8.5in] min-h-[11in] p-10 bg-white text-black font-serif text-[10.5pt] leading-tight"
            style={{ boxSizing: 'border-box' }}
          >
            {/* IDENTITY HEADER */}
            <header className="text-center mb-3">
              <h1 className="text-3xl uppercase tracking-wide font-normal mb-0.5">
                {renderValue(formData.name, 'FIRST LAST')}
              </h1>
              <p className="text-[10pt] mb-1">
                {renderValue(formData.address, '123 Street Name, Town, State 12345')}
              </p>
              <div className="flex justify-center items-center gap-3 text-[9.5pt]">
                <span>📞 {renderValue(formData.phone, '123-456-7890')}</span>
                <span>✉️ {renderValue(formData.email, 'email@gmail.com')}</span>
                <span>💼 {renderValue(formData.linkedin, 'linkedin.com/in/username')}</span>
                <span>💻 {renderValue(formData.github, 'github.com/username')}</span>
              </div>
            </header>

            {/* SECTION: EDUCATION */}
            <section className="mb-3">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black tracking-wide mb-1">Education</h2>
              <div className="flex justify-between font-bold">
                <span>{renderValue(formData.university, 'State University')}</span>
                <span>{renderValue(formData.eduDate, 'Sep. 2017 – May 2021')}</span>
              </div>
              <div className="flex justify-between italic text-[10pt] mb-1">
                <span>{renderValue(formData.degree, 'Bachelor of Science in Computer Science')}</span>
                <span>{renderValue(formData.eduLocation, 'City, State')}</span>
              </div>
              
              <h3 className="text-[10pt] font-bold underline mb-0.5">Relevant Coursework</h3>
              <ul className="grid grid-cols-4 gap-x-2 gap-y-0.5 text-[9.5pt] list-disc pl-4">
                {(formData.coursework || 'Data Structures, Algorithms Analysis, Artificial Intelligence').split(',').map((course, idx) => (
                  <li key={idx}>{course.trim()}</li>
                ))}
              </ul>
            </section>

            {/* SECTION: EXPERIENCE */}
            <section className="mb-3">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black tracking-wide mb-1.5">Experience</h2>
              
              {/* Placement 1 */}
              <div className="mb-2">
                <div className="flex justify-between font-bold">
                  <span>{renderValue(formData.exp1Company, 'Electronics Company')}</span>
                  <span>{renderValue(formData.exp1Date, 'May 2020 – August 2020')}</span>
                </div>
                <div className="flex justify-between italic text-[10pt] mb-0.5">
                  <span>{renderValue(formData.exp1Role, 'Software Engineer Intern')}</span>
                  <span>{renderValue(formData.exp1Location, 'City, State')}</span>
                </div>
                <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                  {formData.exp1Bullets.some(b => b.trim()) ? (
                    formData.exp1Bullets.map((bullet, idx) => bullet.trim() && <li key={idx}>{bullet}</li>)
                  ) : (
                    <>
                      <li>Developed a service to automatically perform a set of unit tests daily on a product in development.</li>
                      <li>Incorporated scripts using Python and PowerShell to aggregate XML test results.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Placement 2 */}
              <div className="mb-2">
                <div className="flex justify-between font-bold">
                  <span>{renderValue(formData.exp2Company, 'Startup, Inc')}</span>
                  <span>{renderValue(formData.exp2Date, 'May 2019 – August 2019')}</span>
                </div>
                <div className="flex justify-between italic text-[10pt] mb-0.5">
                  <span>{renderValue(formData.exp2Role, 'Front End Developer Intern')}</span>
                  <span>{renderValue(formData.exp2Location, 'City, State')}</span>
                </div>
                <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                  {formData.exp2Bullets.some(b => b.trim()) ? (
                    formData.exp2Bullets.map((bullet, idx) => bullet.trim() && <li key={idx}>{bullet}</li>)
                  ) : (
                    <>
                      <li>Assisted in development of the front end of a mobile application for iOS/Android using Flutter.</li>
                      <li>Worked with Google Firebase to manage user inputted data across platforms.</li>
                    </>
                  )}
                </ul>
              </div>
            </section>

            {/* SECTION: PROJECTS */}
            <section className="mb-3">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black tracking-wide mb-1.5">Projects</h2>
              
              <div className="mb-2">
                <div className="flex justify-between text-[10.5pt] mb-0.5">
                  <span>
                    <strong className="font-bold">{renderValue(formData.proj1Name, 'Gym Reservation Bot')}</strong> 
                    {' '}| <span className="italic">{renderValue(formData.proj1Tech, 'Python, Selenium')}</span>
                  </span>
                  <span className="font-bold">{renderValue(formData.proj1Date, 'January 2021')}</span>
                </div>
                <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                  {formData.proj1Bullets.some(b => b.trim()) ? (
                    formData.proj1Bullets.map((bullet, idx) => bullet.trim() && <li key={idx}>{bullet}</li>)
                  ) : (
                    <li>Developed an automatic bot using Python and Google Cloud Console to register for a gym slot.</li>
                  )}
                </ul>
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-[10.5pt] mb-0.5">
                  <span>
                    <strong className="font-bold">{renderValue(formData.proj2Name, 'Ticket Price App')}</strong> 
                    {' '}| <span className="italic">{renderValue(formData.proj2Tech, 'Java, Android Studio')}</span>
                  </span>
                  <span className="font-bold">{renderValue(formData.proj2Date, 'November 2020')}</span>
                </div>
                <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                  {formData.proj2Bullets.some(b => b.trim()) ? (
                    formData.proj2Bullets.map((bullet, idx) => bullet.trim() && <li key={idx}>{bullet}</li>)
                  ) : (
                    <li>Created an Android application using Java to calculate complex ticket prices.</li>
                  )}
                </ul>
              </div>
            </section>

            {/* SECTION: SKILLS */}
            <section className="mb-3">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black tracking-wide mb-1.5">Technical Skills</h2>
              <div className="text-[9.5pt] space-y-0.5">
                <div><strong className="font-bold">Languages:</strong> {renderValue(formData.skillsLanguages, 'Python, Java, C, HTML/CSS, JavaScript')}</div>
                <div><strong className="font-bold">Developer Tools:</strong> {renderValue(formData.skillsTools, 'VS Code, Eclipse, Android Studio')}</div>
                <div><strong className="font-bold">Technologies/Frameworks:</strong> {renderValue(formData.skillsTech, 'Linux, Jenkins, GitHub')}</div>
              </div>
            </section>

            {/* SECTION: LEADERSHIP */}
            <section>
              <h2 className="text-[11pt] font-bold uppercase border-b border-black tracking-wide mb-1.5">Leadership / Extracurricular</h2>
              <div className="flex justify-between font-bold">
                <span>{renderValue(formData.leadOrg, 'Fraternity Organization')}</span>
                <span>{renderValue(formData.leadDate, 'Spring 2020 – Present')}</span>
              </div>
              <div className="flex justify-between italic text-[10pt] mb-0.5">
                <span>{renderValue(formData.leadRole, 'President')}</span>
                <span>{renderValue(formData.leadLocation, 'University Name')}</span>
              </div>
              <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                {formData.leadBullets.some(b => b.trim()) ? (
                  formData.leadBullets.map((bullet, idx) => bullet.trim() && <li key={idx}>{bullet}</li>)
                ) : (
                  <li>Managed executive board of 5 members and ran weekly alignment meetings.</li>
                )}
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}