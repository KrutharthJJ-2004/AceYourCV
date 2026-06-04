import './Navbar.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Form.css';
import { useState } from 'react';
import './Resume.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    template: 'classic',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadPDF = () => {
    const resume = document.getElementById('resume-preview');
    html2canvas(resume, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('AceYourCV_Resume.pdf');
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      <div className="navbar">
        <span className="logo">AceYourCV</span>
        <span className="tagline">Build your resume in minutes</span>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        <div className="form-panel">
          <label>Choose Template</label>
          <select name="template" onChange={handleChange}>
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
          </select>

          <label>Full Name</label>
          <input name="name" placeholder="John Doe" onChange={handleChange} />

          <label>Email</label>
          <input name="email" placeholder="john@email.com" onChange={handleChange} />

          <label>Phone</label>
          <input name="phone" placeholder="+91 98765 43210" onChange={handleChange} />

          <label>LinkedIn</label>
          <input name="linkedin" placeholder="linkedin.com/in/yourname" onChange={handleChange} />

          <label>Website / Portfolio</label>
          <input name="website" placeholder="yourportfolio.com" onChange={handleChange} />

          <label>Summary</label>
          <textarea name="summary" placeholder="A brief about yourself..." onChange={handleChange} />

          <label>Experience</label>
          <textarea name="experience" placeholder="Company, Role, Year..." onChange={handleChange} />

          <label>Education</label>
          <textarea name="education" placeholder="Degree, College, Year..." onChange={handleChange} />

          <label>Skills</label>
          <textarea name="skills" placeholder="React, Figma, Python..." onChange={handleChange} />

          <button onClick={downloadPDF}>Download PDF</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#f9f6ee' }}>
          <div className={`resume ${formData.template}`} id="resume-preview">
            <h1>{formData.name || 'Your Full Name'}</h1>
            <p className="contact">
              {formData.email || 'your@email.com'}
              {' | '}
              {formData.phone || '+91 00000 00000'}
              {formData.linkedin && ` | ${formData.linkedin}`}
              {formData.website && ` | ${formData.website}`}
            </p>
            <hr/>

            <h3>Summary</h3>
            <p>{formData.summary || 'A brief professional summary about yourself will appear here...'}</p>
            <hr/>

            <h3>Experience</h3>
            <p>{formData.experience || 'Your work experience, company names and roles will appear here...'}</p>
            <hr/>

            <h3>Education</h3>
            <p>{formData.education || 'Your degree, college and graduation year will appear here...'}</p>
            <hr/>

            <h3>Skills</h3>
            <p>{formData.skills || 'Your skills will appear here...'}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;