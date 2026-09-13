import React, { useState, useRef } from 'react';
import * as html2pdfLib from 'html2pdf.js';

export default function App() {
  const resumeRef = useRef();
  const [viewMode, setViewMode] = useState('edit'); // 'edit' | 'preview' | 'final'

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
    // Switch to clean view so placeholders do not print
    setViewMode('final');

    setTimeout(() => {
      const element = resumeRef.current;
      if (!element) return;

      const opt = {
        margin: [0.35, 0.4, 0.35, 0.4],
        filename: `${(formData.name.trim() || 'Resume').replace(/\s+/g, '_')}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Safely access html2pdf whether resolved as ESM or CommonJS
      const generator = html2pdfLib.default || html2pdfLib;
      generator().from(element).set(opt).save();
    }, 150);
  };

  const isPreview = viewMode === 'preview';

  // Helper functions
  const hasText = (val) => Boolean(val && val.trim().length > 0);
  const hasBullets = (arr) => Boolean(arr && arr.some((b) => b && b.trim().length > 0));

  const renderText = (val, placeholder) => {
    if (hasText(val)) return val;
    if (isPreview) return <span className="text-gray-300 italic font-normal">{placeholder}</span>;
    return null;
  };

  // Section visibility checks
  const showHeader = isPreview || hasText(formData.name) || hasText(formData.email) || hasText(formData.phone);
  const showEducation = isPreview || hasText(formData.university) || hasText(formData.degree) || hasText(formData.coursework);
  const showExp1 = isPreview || hasText(formData.exp1Company) || hasText(formData.exp1Role) || hasBullets(formData.exp1Bullets);
  const showExp2 = isPreview || hasText(formData.exp2Company) || hasText(formData.exp2Role) || hasBullets(formData.exp2Bullets);
  const showExperience = isPreview || showExp1 || showExp2;
  const showProj1 = isPreview || hasText(formData.proj1Name) || hasBullets(formData.proj1Bullets);
  const showProj2 = isPreview || hasText(formData.proj2Name) || hasBullets(formData.proj2Bullets);
  const showProj3 = isPreview || hasText(formData.proj3Name) || hasBullets(formData.proj3Bullets);
  const showProjects = isPreview || showProj1 || showProj2 || showProj3;
  const showSkills = isPreview || hasText(formData.skillsLanguages) || hasText(formData.skillsTools) || hasText(formData.skillsTech);
  const showLeadership = isPreview || hasText(formData.leadOrg) || hasText(formData.leadRole) || hasBullets(formData.leadBullets);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center font-sans">
      
      {/* ACTION BAR */}
      <div className="mb-6 flex flex-wrap gap-3 sticky top-4 z-50 bg-white border border-gray-200 p-3 shadow-md rounded-2xl">
        <button
          onClick={() => setViewMode('edit')}
          className={`px-4 py-2 font-semibold rounded-xl text-sm transition ${viewMode === 'edit' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          ✏️ Edit Info
        </button>
        <button
          onClick={() => setViewMode('preview')}
          className={`px-4 py-2 font-semibold rounded-xl text-sm transition ${viewMode === 'preview' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          ✨ Preview Everything
        </button>
        <button
          onClick={() => setViewMode('final')}
          className={`px-4 py-2 font-semibold rounded-xl text-sm transition ${viewMode === 'final' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          📄 Output (Only Filled)
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-5 py-2 bg-emerald-600 text-white font-semibold rounded-xl text-sm hover:bg-emerald-700 transition shadow-sm flex items-center gap-1.5"
        >
          📥 Download PDF
        </button>
      </div>

      {/* FORM MODE */}
      {viewMode === 'edit' ? (
        <div className="w-full max-w-3xl bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">CV Data Entry</h2>
            <p className="text-xs text-gray-500 mt-1">Leave any segment blank if you do not want it to appear on your CV.</p>
          </div>

          {/* Contact Details */}
          <fieldset className="border border-gray-200 p-4 rounded-xl space-y-4">
            <legend className="px-2 text-xs font-bold uppercase text-gray-500 tracking-wider">Contact Basics</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600 font-medium">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Physical Location</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Email Address</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">LinkedIn URL / Username</label>
                <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">GitHub URL / Username</label>
                <input type="text" name="github" value={formData.github} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
            </div>
          </fieldset>

          {/* Education */}
          <fieldset className="border border-gray-200 p-4 rounded-xl space-y-4">
            <legend className="px-2 text-xs font-bold uppercase text-gray-500 tracking-wider">Education</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600 font-medium">University / College</label>
                <input type="text" name="university" value={formData.university} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Date Span</label>
                <input type="text" name="eduDate" value={formData.eduDate} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Degree / Major</label>
                <input type="text" name="degree" value={formData.degree} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Campus Location</label>
                <input type="text" name="eduLocation" value={formData.eduLocation} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium">Relevant Coursework (Comma-separated)</label>
              <input type="text" name="coursework" value={formData.coursework} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
            </div>
          </fieldset>

          {/* Work Experience */}
          <fieldset className="border border-gray-200 p-4 rounded-xl space-y-6">
            <legend className="px-2 text-xs font-bold uppercase text-gray-500 tracking-wider">Experience</legend>
            
            {/* Job 1 */}
            <div className="space-y-3 pb-4 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-700">Role Position 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" name="exp1Company" placeholder="Company Name" value={formData.exp1Company} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp1Date" placeholder="Date Duration (e.g. May 2022 – Aug 2022)" value={formData.exp1Date} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp1Role" placeholder="Job Title" value={formData.exp1Role} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp1Location" placeholder="City, State / Remote" value={formData.exp1Location} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              {formData.exp1Bullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('exp1Bullets', idx, e.target.value)} placeholder={`Bullet point line ${idx + 1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>

            {/* Job 2 */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-700">Role Position 2</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" name="exp2Company" placeholder="Company Name" value={formData.exp2Company} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp2Date" placeholder="Date Duration" value={formData.exp2Date} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp2Role" placeholder="Job Title" value={formData.exp2Role} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="exp2Location" placeholder="City, State / Remote" value={formData.exp2Location} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              {formData.exp2Bullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('exp2Bullets', idx, e.target.value)} placeholder={`Bullet point line ${idx + 1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>
          </fieldset>

          {/* Projects */}
          <fieldset className="border border-gray-200 p-4 rounded-xl space-y-6">
            <legend className="px-2 text-xs font-bold uppercase text-gray-500 tracking-wider">Projects</legend>

            {/* Project 1 */}
            <div className="space-y-3 pb-4 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-700">Project 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" name="proj1Name" placeholder="Project Name" value={formData.proj1Name} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj1Tech" placeholder="Technologies Used" value={formData.proj1Tech} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj1Date" placeholder="Timeline / Date" value={formData.proj1Date} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              {formData.proj1Bullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('proj1Bullets', idx, e.target.value)} placeholder={`Project 1 bullet ${idx + 1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>

            {/* Project 2 */}
            <div className="space-y-3 pb-4 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-700">Project 2</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" name="proj2Name" placeholder="Project Name" value={formData.proj2Name} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj2Tech" placeholder="Technologies Used" value={formData.proj2Tech} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj2Date" placeholder="Timeline / Date" value={formData.proj2Date} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              {formData.proj2Bullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('proj2Bullets', idx, e.target.value)} placeholder={`Project 2 bullet ${idx + 1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>

            {/* Project 3 */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-700">Project 3</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" name="proj3Name" placeholder="Project Name" value={formData.proj3Name} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj3Tech" placeholder="Technologies Used" value={formData.proj3Tech} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
                <input type="text" name="proj3Date" placeholder="Timeline / Date" value={formData.proj3Date} onChange={handleChange} className="border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              {formData.proj3Bullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('proj3Bullets', idx, e.target.value)} placeholder={`Project 3 bullet ${idx + 1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>
          </fieldset>

          {/* Technical Skills */}
          <fieldset className="border border-gray-200 p-4 rounded-xl space-y-4">
            <legend className="px-2 text-xs font-bold uppercase text-gray-500 tracking-wider">Technical Skills</legend>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 font-medium">Programming Languages</label>
                <input type="text" name="skillsLanguages" placeholder="e.g. JavaScript, Python, C++, SQL" value={formData.skillsLanguages} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Developer Tools</label>
                <input type="text" name="skillsTools" placeholder="e.g. Git, Docker, VS Code, Postman" value={formData.skillsTools} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Frameworks & Technologies</label>
                <input type="text" name="skillsTech" placeholder="e.g. React, Node.js, Express, MongoDB, Tailwind CSS" value={formData.skillsTech} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
            </div>
          </fieldset>

          {/* Leadership */}
          <fieldset className="border border-gray-200 p-4 rounded-xl space-y-4">
            <legend className="px-2 text-xs font-bold uppercase text-gray-500 tracking-wider">Leadership / Extracurricular</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600 font-medium">Organization / Society</label>
                <input type="text" name="leadOrg" value={formData.leadOrg} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Date Span</label>
                <input type="text" name="leadDate" value={formData.leadDate} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Role / Title</label>
                <input type="text" name="leadRole" value={formData.leadRole} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
              <div>
                <label className="text-xs text-gray-600 font-medium">Location</label>
                <input type="text" name="leadLocation" value={formData.leadLocation} onChange={handleChange} className="w-full mt-1 border text-sm p-2 rounded-lg bg-gray-50"/>
              </div>
            </div>
            <div className="space-y-2 mt-2">
              <label className="text-xs text-gray-600 font-medium">Bullet Points</label>
              {formData.leadBullets.map((bullet, idx) => (
                <textarea key={idx} value={bullet} onChange={(e) => handleBulletChange('leadBullets', idx, e.target.value)} placeholder={`Leadership description line ${idx + 1}`} className="w-full border text-xs p-2 rounded-lg bg-gray-50 h-12 resize-none"/>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => setViewMode('final')}
            className="w-full py-3 bg-black text-white text-sm font-bold rounded-xl transition shadow-md hover:bg-gray-800"
          >
            Review Output Layout
          </button>
        </div>
      ) : (

        /* RESUME PREVIEW CANVAS */
        <div className="bg-white shadow-2xl border border-gray-200 rounded-sm">
          <div
            ref={resumeRef}
            className="w-[8.5in] min-h-[11in] p-10 bg-white text-black font-serif text-[10.5pt] leading-tight"
            style={{ boxSizing: 'border-box' }}
          >
            {/* HEADER */}
            {showHeader && (
              <header className="text-center mb-3">
                <h1 className="text-3xl uppercase tracking-wide font-normal mb-0.5">
                  {renderText(formData.name, 'FIRST LAST')}
                </h1>
                {(isPreview || hasText(formData.address)) && (
                  <p className="text-[10pt] mb-1">
                    {renderText(formData.address, '123 Street Name, Town, State 12345')}
                  </p>
                )}
                <div className="flex flex-wrap justify-center items-center gap-3 text-[9.5pt]">
                  {(isPreview || hasText(formData.phone)) && <span>📞 {renderText(formData.phone, '123-456-7890')}</span>}
                  {(isPreview || hasText(formData.email)) && <span>✉️ {renderText(formData.email, 'email@gmail.com')}</span>}
                  {(isPreview || hasText(formData.linkedin)) && <span>💼 {renderText(formData.linkedin, 'linkedin.com/in/username')}</span>}
                  {(isPreview || hasText(formData.github)) && <span>💻 {renderText(formData.github, 'github.com/username')}</span>}
                </div>
              </header>
            )}

            {/* EDUCATION */}
            {showEducation && (
              <section className="mb-3">
                <h2 className="text-[11pt] font-bold uppercase border-b border-black tracking-wide mb-1">Education</h2>
                <div className="flex justify-between font-bold">
                  <span>{renderText(formData.university, 'State University')}</span>
                  <span>{renderText(formData.eduDate, 'Sep. 2017 – May 2021')}</span>
                </div>
                <div className="flex justify-between italic text-[10pt] mb-1">
                  <span>{renderText(formData.degree, 'Bachelor of Science in Computer Science')}</span>
                  <span>{renderText(formData.eduLocation, 'City, State')}</span>
                </div>

                {(isPreview || hasText(formData.coursework)) && (
                  <>
                    <h3 className="text-[10pt] font-bold underline mb-0.5">Relevant Coursework</h3>
                    <ul className="grid grid-cols-4 gap-x-2 gap-y-0.5 text-[9.5pt] list-disc pl-4">
                      {(formData.coursework.trim() || 'Data Structures, Algorithms Analysis, Artificial Intelligence')
                        .split(',')
                        .map((course, idx) => {
                          const item = course.trim();
                          return item ? <li key={idx}>{item}</li> : null;
                        })}
                    </ul>
                  </>
                )}
              </section>
            )}

            {/* EXPERIENCE */}
            {showExperience && (
              <section className="mb-3">
                <h2 className="text-[11pt] font-bold uppercase border-b border-black tracking-wide mb-1.5">Experience</h2>

                {/* Job 1 */}
                {showExp1 && (
                  <div className="mb-2">
                    <div className="flex justify-between font-bold">
                      <span>{renderText(formData.exp1Company, 'Electronics Company')}</span>
                      <span>{renderText(formData.exp1Date, 'May 2020 – August 2020')}</span>
                    </div>
                    <div className="flex justify-between italic text-[10pt] mb-0.5">
                      <span>{renderText(formData.exp1Role, 'Software Engineer Intern')}</span>
                      <span>{renderText(formData.exp1Location, 'City, State')}</span>
                    </div>
                    <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                      {hasBullets(formData.exp1Bullets) ? (
                        formData.exp1Bullets.map((b, idx) => b.trim() && <li key={idx}>{b}</li>)
                      ) : (
                        isPreview && (
                          <>
                            <li>Developed a service to automatically perform a set of unit tests daily on a product in development.</li>
                            <li>Incorporated scripts using Python and PowerShell to aggregate XML test results.</li>
                          </>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Job 2 */}
                {showExp2 && (
                  <div className="mb-2">
                    <div className="flex justify-between font-bold">
                      <span>{renderText(formData.exp2Company, 'Startup, Inc')}</span>
                      <span>{renderText(formData.exp2Date, 'May 2019 – August 2019')}</span>
                    </div>
                    <div className="flex justify-between italic text-[10pt] mb-0.5">
                      <span>{renderText(formData.exp2Role, 'Front End Developer Intern')}</span>
                      <span>{renderText(formData.exp2Location, 'City, State')}</span>
                    </div>
                    <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                      {hasBullets(formData.exp2Bullets) ? (
                        formData.exp2Bullets.map((b, idx) => b.trim() && <li key={idx}>{b}</li>)
                      ) : (
                        isPreview && (
                          <>
                            <li>Assisted in development of the front end of a mobile application for iOS/Android using Flutter.</li>
                            <li>Worked with Google Firebase to manage user inputted data across platforms.</li>
                          </>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* PROJECTS */}
            {showProjects && (
              <section className="mb-3">
                <h2 className="text-[11pt] font-bold uppercase border-b border-black tracking-wide mb-1.5">Projects</h2>

                {/* Project 1 */}
                {showProj1 && (
                  <div className="mb-2">
                    <div className="flex justify-between text-[10.5pt] mb-0.5">
                      <span>
                        <strong className="font-bold">{renderText(formData.proj1Name, 'Gym Reservation Bot')}</strong>
                        {(isPreview || hasText(formData.proj1Tech)) && (
                          <> | <span className="italic">{renderText(formData.proj1Tech, 'Python, Selenium')}</span></>
                        )}
                      </span>
                      <span className="font-bold">{renderText(formData.proj1Date, 'January 2021')}</span>
                    </div>
                    <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                      {hasBullets(formData.proj1Bullets) ? (
                        formData.proj1Bullets.map((b, idx) => b.trim() && <li key={idx}>{b}</li>)
                      ) : (
                        isPreview && <li>Developed an automatic bot using Python and Google Cloud Console to register for a gym slot.</li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Project 2 */}
                {showProj2 && (
                  <div className="mb-2">
                    <div className="flex justify-between text-[10.5pt] mb-0.5">
                      <span>
                        <strong className="font-bold">{renderText(formData.proj2Name, 'Ticket Price App')}</strong>
                        {(isPreview || hasText(formData.proj2Tech)) && (
                          <> | <span className="italic">{renderText(formData.proj2Tech, 'Java, Android Studio')}</span></>
                        )}
                      </span>
                      <span className="font-bold">{renderText(formData.proj2Date, 'November 2020')}</span>
                    </div>
                    <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                      {hasBullets(formData.proj2Bullets) ? (
                        formData.proj2Bullets.map((b, idx) => b.trim() && <li key={idx}>{b}</li>)
                      ) : (
                        isPreview && <li>Created an Android application using Java to calculate complex ticket prices.</li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Project 3 */}
                {showProj3 && (
                  <div className="mb-2">
                    <div className="flex justify-between text-[10.5pt] mb-0.5">
                      <span>
                        <strong className="font-bold">{renderText(formData.proj3Name, 'Online Marketplace')}</strong>
                        {(isPreview || hasText(formData.proj3Tech)) && (
                          <> | <span className="italic">{renderText(formData.proj3Tech, 'React, Node.js, Express')}</span></>
                        )}
                      </span>
                      <span className="font-bold">{renderText(formData.proj3Date, 'March 2021')}</span>
                    </div>
                    <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                      {hasBullets(formData.proj3Bullets) ? (
                        formData.proj3Bullets.map((b, idx) => b.trim() && <li key={idx}>{b}</li>)
                      ) : (
                        isPreview && <li>Engineered a full-stack platform with authentication and real-time database updates.</li>
                      )}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* TECHNICAL SKILLS */}
            {showSkills && (
              <section className="mb-3">
                <h2 className="text-[11pt] font-bold uppercase border-b border-black tracking-wide mb-1.5">Technical Skills</h2>
                <div className="text-[9.5pt] space-y-0.5">
                  {(isPreview || hasText(formData.skillsLanguages)) && (
                    <div><strong className="font-bold">Languages:</strong> {renderText(formData.skillsLanguages, 'Python, Java, C, HTML/CSS, JavaScript')}</div>
                  )}
                  {(isPreview || hasText(formData.skillsTools)) && (
                    <div><strong className="font-bold">Developer Tools:</strong> {renderText(formData.skillsTools, 'VS Code, Eclipse, Android Studio, Git')}</div>
                  )}
                  {(isPreview || hasText(formData.skillsTech)) && (
                    <div><strong className="font-bold">Technologies/Frameworks:</strong> {renderText(formData.skillsTech, 'Linux, Jenkins, GitHub, React')}</div>
                  )}
                </div>
              </section>
            )}

            {/* LEADERSHIP */}
            {showLeadership && (
              <section>
                <h2 className="text-[11pt] font-bold uppercase border-b border-black tracking-wide mb-1.5">Leadership / Extracurricular</h2>
                <div className="flex justify-between font-bold">
                  <span>{renderText(formData.leadOrg, 'Fraternity Organization')}</span>
                  <span>{renderText(formData.leadDate, 'Spring 2020 – Present')}</span>
                </div>
                <div className="flex justify-between italic text-[10pt] mb-0.5">
                  <span>{renderText(formData.leadRole, 'President')}</span>
                  <span>{renderText(formData.leadLocation, 'University Name')}</span>
                </div>
                <ul className="list-disc pl-5 text-[9.5pt] space-y-0.5 text-justify">
                  {hasBullets(formData.leadBullets) ? (
                    formData.leadBullets.map((b, idx) => b.trim() && <li key={idx}>{b}</li>)
                  ) : (
                    isPreview && <li>Managed executive board of 5 members and ran weekly alignment meetings.</li>
                  )}
                </ul>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}