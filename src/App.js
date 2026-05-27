import { useState } from 'react';

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

      <div style={{ width: '40%', padding: '20px', background: '#f0f0f0', overflowY: 'auto' }}>
        <h2>Fill Your Details</h2>
        <input name="name" placeholder="Full Name" onChange={handleChange} /><br/><br/>
        <input name="email" placeholder="Email" onChange={handleChange} /><br/><br/>
        <input name="phone" placeholder="Phone" onChange={handleChange} /><br/><br/>
        <textarea name="summary" placeholder="Summary" onChange={handleChange} /><br/><br/>
        <textarea name="experience" placeholder="Experience" onChange={handleChange} /><br/><br/>
        <textarea name="education" placeholder="Education" onChange={handleChange} /><br/><br/>
        <textarea name="skills" placeholder="Skills" onChange={handleChange} />
      </div>

      <div style={{ width: '60%', padding: '20px', overflowY: 'auto' }}>
        <h2>Preview</h2>
        <h1>{formData.name}</h1>
        <p>{formData.email} | {formData.phone}</p>
        <hr/>
        <h3>Summary</h3>
        <p>{formData.summary}</p>
        <h3>Experience</h3>
        <p>{formData.experience}</p>
        <h3>Education</h3>
        <p>{formData.education}</p>
        <h3>Skills</h3>
        <p>{formData.skills}</p>
      </div>

    </div>
  );
}

export default App;