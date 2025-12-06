import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react'; // Added Upload icon for better UI
import { Button, Input, Select } from './UI';

const JobModal = ({ isOpen, onClose, onSave, editingJob }) => {
  const initialForm = {
    title: '', 
    company: '', 
    logo: null, 
    location: '', 
    salary: '',
    jobType: '', 
    employmentType: '', 
    seniority: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [preview, setPreview] = useState(null);

  // Populate form if editing
  useEffect(() => {
    if (editingJob) {
      setFormData(editingJob);
      setPreview(editingJob.logo); // Show existing logo if editing
    } else {
      setFormData(initialForm);
      setPreview(null);
    }
  }, [editingJob, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // New function to handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a fake URL for the uploaded file so we can preview it
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setFormData({ ...formData, logo: objectUrl });
    }
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.title || !formData.company) return alert("Please fill required fields");
    
    onSave({
      ...formData,
      id: editingJob ? editingJob.id : Date.now(),
      date: editingJob ? editingJob.date : new Date().toLocaleDateString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {editingJob ? 'Edit Job' : 'Add Job'}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="text-gray-500" size={24} />
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Job Title *" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior Backend Engineer" />
          <Input label="Company Name *" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Google" />
          
          [cite_start]{/* Custom File Input for Logo [cite: 75] */}
          <div className="flex flex-col gap-1 mb-3">
            <label className="text-sm font-medium text-gray-700">Company Logo</label>
            <div className="flex items-center gap-4 p-2 border border-gray-300 rounded-lg bg-white">
              {/* Image Preview */}
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                {preview ? (
                  <img src={preview} alt="Logo Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload size={18} className="text-gray-400" />
                )}
              </div>
              
              {/* File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
          </div>

          <Select 
            label="Job Type" name="jobType" value={formData.jobType} onChange={handleChange}
            options={["Engineering", "Design", "Marketing", "Developer"]} 
          />
          <Select 
            label="Employment Type" name="employmentType" value={formData.employmentType} onChange={handleChange}
            options={["Full Time", "Part Time", "Contract", "Freelance"]} 
          />
           <Select 
            label="Seniority Level" name="seniority" value={formData.seniority} onChange={handleChange}
            options={["Intern", "Junior", "Mid-level", "Senior"]} 
          />
          <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Remote / New York" />
          <Input label="Salary" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. $120,000" />
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{editingJob ? 'Update Job' : 'Publish Job'}</Button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;