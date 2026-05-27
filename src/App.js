import './Form.css';
import { useState } from 'react';
import './Resume.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      <div className="form-panel">
      <h2>AceYourCV</h2>
  
      <label>Full Name</label>
      <input name="name" placeholder="John Doe" onChange={handleChange} />
  
      <label>Email</label>
      <input name="email" placeholder="john@email.com" onChange={handleChange} />
  
      <label>Phone</label>
      <input name="phone" placeholder="+91 98765 43210" onChange={handleChange} />
  
      <label>Summary</label>
      <textarea name="summary" placeholder="A brief about yourself..." onChange={handleChange} />
  
      <label>Experience</label>
      <textarea name="experience" placeholder="Company, Role, Year..." onChange={handleChange} />
  
      <label>Education</label>
      <textarea name="education" placeholder="Degree, College, Year..." onChange={handleChange} />
  
      <label>Skills</label>
      <textarea name="skills" placeholder="React, Figma, Python..." onChange={handleChange} />
    </div>

      <div style={{ width: '60%', overflowY: 'auto', padding: '20px', background: '#f9f6ee' }}>
  <div className="resume">
    <h1>{formData.name || 'Your Full Name'}</h1>
    <p className="contact">
      {formData.email || 'your@email.com'} 
      {' | '}
      {formData.phone || '+91 00000 00000'}
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
  );
}

export default App;