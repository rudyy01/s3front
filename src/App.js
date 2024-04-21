// App.tsx
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/submit-form', formData);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully. URL: ' + response.data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return (
    <div>
      <h1>File Upload Example</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default App;
